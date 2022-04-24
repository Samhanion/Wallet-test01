import { useEffect, useState } from "react";
import axios from "axios";
import "./CountDown.css";
import { useMoralis } from "react-moralis";
import { toast } from "react-toastify";

const defaultRemainingTime = {
  hours: 0,
  minutes: 1,
  seconds: 0,
};

const CountDown = ({ accessToken, accessSecret, tweetId, followers }) => {
  const { Moralis } = useMoralis();
  const {
    account,
    //  chainId, logout
  } = Moralis;

  //   const [transaction, setTransaction] = useState(null);
  const [claim, setClaim] = useState(null);

  async function claimReward() {
    let Recipient = account;
    let amount = claim;
    // let SelectedTokenAddress = "0x814F11f6bD1A717b21849da13553D457056DdC9C";
    if (Recipient || amount) {
      let response = await axios({
        method: "get",
        url: `https://wallet-backend-api.herokuapp.com/sendAirdrop/?recipient=${Recipient}&amount=${amount}`,
      });
      console.log(response.data);
      // setTransaction(response.data.hash);
      toast.success("Transaction Successful");
    }
  }

  const [remainingTime, setRemainingTime] = useState(defaultRemainingTime);

  useEffect(() => {
    const interval = setInterval(async () => {
      const { hours, minutes, seconds } = remainingTime;
      if (seconds > 0) {
        setRemainingTime({
          hours,
          minutes,
          seconds: seconds - 1,
        });
      } else if (minutes > 0) {
        setRemainingTime({
          hours,
          minutes: minutes - 1,
          seconds: 59,
        });
      } else if (hours > 0) {
        setRemainingTime({
          hours: hours - 1,
          minutes: 59,
          seconds: 59,
        });
      } else {
        var data = JSON.stringify({
          accessToken: accessToken,
          accessSecret: accessSecret,
          tweetId: tweetId,
        });
        let tweetedPost = await axios({
          method: "post",
          //   https://wallet-backend-api.herokuapp.com/metrics/?accessToken=${accessToken}&accessSecret=${accessSecret}&tweetId=${tweetId}
          //   https://wallet-backend-api.herokuapp.com/metrics/?accessToken=1502747448120430601-F56GryQb02UVewXDunYBtjSRIBev5N&accessSecret=c7c2lfERKBvriXpj4Ql5AMZP7qlEXUCU8dufyU0p9WqpX&tweetId=1516776039426494467
          url: `https://wallet-backend-api.herokuapp.com/metrics/`,
          headers: {
            "Content-Type": "application/json",
          },
          data: data,
        });
        console.log(tweetedPost.data);
        let likeCount = tweetedPost.data.favorite_count;
        let retweetCount = tweetedPost.data.retweet_count;

        let likeRatio = likeCount / followers;
        if (likeRatio > 0.1) likeRatio = 0.1;
        if (followers == 0) likeRatio = 0;

        let retweetRatio = retweetCount / followers;
        if (retweetRatio > 0.05) retweetRatio = 0.05;
        if (followers == 0) retweetRatio = 0;

        let likeClaim = (0.5 * likeRatio) / 0.1;
        let retweetClaim = (0.5 * retweetRatio) / 0.05;

        let potential = followers * 19677;

        let claim = likeClaim + retweetClaim;
        console.log(claim);

        let finalClaim = claim * potential;
        console.log(finalClaim);
        setClaim(finalClaim);

        // 10% likes => 50% claim
        // likeRatio => x
        // x =

        clearInterval(interval);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [remainingTime]);

  return (
    <>
      <div className="countDown">
        <span>{remainingTime.hours}</span>
        <span>hours</span>
        <span>{remainingTime.minutes}</span>
        <span>minutes</span>
        <span>{remainingTime.seconds}</span>
        <span>seconds</span>
      </div>
      <button
        style={{
          marginTop: "50px",
          backgroundColor: "#55acee",
          display: "flex",
          fontSize: "large",
          border: "none",
          padding: "10px",
          borderRadius: "5px",
          color: "white",
          cursor: "pointer",
        }}
        onClick={claimReward}
      >
        Claim
      </button>
    </>
  );
};
export default CountDown;
