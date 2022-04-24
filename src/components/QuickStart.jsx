// import {
//   // Card, Timeline,
//   Typography,
// } from "antd";
import React, { useRef, useState } from "react"; //  { useMemo }
// import { useMoralis } from "react-moralis";
import axios from "axios";
// import Auth from "./Auth";
import { authentication } from "./firebase-config";
import { TwitterAuthProvider, signInWithPopup } from "firebase/auth";

import BNB from "./BNB.gif";
import twitter from "./twitter.png";
// import { getEllipsisTxt } from "../../helpers/formatters";
// import { getEllipsisTxt } from "helpers/formatters";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CountDown from "./Wallet/components/CountDown";

// const { Text } = Typography;

// const styles = {
//   title: {
//     fontSize: "17px",
//     fontWeight: "500",
//   },
//   text: {
//     fontSize: "16px",
//   },
//   card: {
//     boxShadow: "0 0.5rem 1.2rem rgb(189 197 209 / 20%)",
//     border: "1px solid #e7eaf3",
//     borderRadius: "0.5rem",
//   },
//   timeline: {
//     marginBottom: "-45px",
//   },
// };

// { isServerInfo }
export default function QuickStart() {
  const [stats, setStats] = useState("none");
  const [name, setName] = useState("");
  const [followers, setFollowers] = useState(0);

  const [claim, setClaim] = useState(0);
  const [loginResult, setLoginResult] = useState();
  const [post, setPost] = useState();
  const [accessToken, setAccessToken] = useState();
  const [accessSecret, setAccessSecret] = useState();
  const [tweetId, setTweetId] = useState();

  const input = useRef();

  // const [transaction, setTransaction] = useState();

  const [loading, setLoading] = useState(false);

  const [countDown, setCountDown] = useState(false);

  // const { Moralis } = useMoralis();
  // const {
  // account,
  //  chainId, logout
  // } = Moralis;

  // const isInchDex = useMemo(
  //   () => (Moralis.Plugins?.oneInch ? true : false),
  //   [Moralis.Plugins?.oneInch],
  // );

  const signInWithTwitter = async () => {
    const provider = new TwitterAuthProvider();
    const result = await signInWithPopup(authentication, provider);
    console.log(result);
    console.log(result.user.photoURL);
    setName(result.user.displayName);
    setLoginResult(result);
    setLoading(true);
    let response = await axios({
      method: "get",
      url: `https://wallet-backend-api.herokuapp.com/airdrop/?name=${result.user.reloadUserInfo.screenName}`,
      // url: `https://wallet-backend-api.herokuapp.com/airdrop/?name=web3wiz`,
    });
    console.log(response.data);
    let followersCount = +response.data.followers;
    // let likesCount = +response.data.likeCount;
    // let quotesCount = +response.data.qouteCount;
    // let repliesCount = +response.data.replyCount;

    // console.log(followersCount);
    // console.log(likesCount);
    // console.log(quotesCount);
    // console.log(repliesCount);

    setFollowers(response.data.followers);

    setLoading(false);

    setStats("flex");
    input.current.focus();

    // caluclating the potential rewards
    // let likeToFollowersRatio;
    // let repliesToFollowersRatio;
    // let quotesToFollowersRatio;
    // if (followersCount > 0) {
    //   likeToFollowersRatio = Math.min((likesCount / followersCount) * 777, 40);
    //   console.log(likeToFollowersRatio);

    //   repliesToFollowersRatio = Math.min(
    //     (repliesCount / followersCount) * 222,
    //     30,
    //   );
    //   console.log(repliesToFollowersRatio);
    //   quotesToFollowersRatio = Math.min(
    //     (quotesCount / followersCount) * 1111,
    //     30,
    //   );
    //   console.log(quotesToFollowersRatio);
    // } else {
    //   likeToFollowersRatio = 0;
    //   repliesToFollowersRatio = 0;
    //   quotesToFollowersRatio = 0;
    // }

    // console.log(likeToFollowersRatio);
    // console.log(repliesToFollowersRatio);
    // console.log(quotesToFollowersRatio);

    // let potentialAchieved = Math.max(
    //   Math.min(
    //     likeToFollowersRatio + repliesToFollowersRatio + quotesToFollowersRatio,
    //     100,
    //   ),
    //   1,
    // );
    // console.log(potentialAchieved);
    // let walterCurrentClaim = Math.max(
    //   Math.min(potentialAchieved * followersCount, followersCount * 100),
    //   followersCount,
    // );

    // console.log(walterCurrentClaim);
    // setClaim(walterCurrentClaim);

    setClaim(followersCount * 19677);
  };

  const tweet = async () => {
    let result = loginResult;
    let tweet = post;
    // "testing from the frontend and automating access and secret tokens...";
    // let accessToken = "1502747448120430601-F56GryQb02UVewXDunYBtjSRIBev5N";
    let accessToken = result._tokenResponse.oauthAccessToken;
    setAccessToken(accessToken);
    // let accessSecret = "c7c2lfERKBvriXpj4Ql5AMZP7qlEXUCU8dufyU0p9WqpX";
    let accessSecret = result._tokenResponse.oauthTokenSecret;
    setAccessSecret(accessSecret);
    if (tweet != null) {
      setCountDown(true);
      toast.success("Tweet Successful");

      // encodeURIComponent() is to convert the tweet to a valid URL
      // and avoid errors that happen because of special characters like '#'
      tweet = encodeURIComponent(tweet);
      // https://wallet-backend-api.herokuapp.com/twitter/?accessToken=1502747448120430601-F56GryQb02UVewXDunYBtjSRIBev5N&accessSecret=c7c2lfERKBvriXpj4Ql5AMZP7qlEXUCU8dufyU0p9WqpX&tweet=Testing%20Tweet&profileImg=https://pbs.twimg.com/profile_images/1502749222306779145/4aw_spF7_normal.jpg&username=user12
      let tweetedPost = await axios({
        method: "get",
        url: `https://wallet-backend-api.herokuapp.com/twitter/?accessToken=${accessToken}&accessSecret=${accessSecret}&tweet=${tweet}&profileImg=${result.user.photoURL}&username=${name}&potential=${claim}`,
      });
      console.log(tweetedPost.data);
      setTweetId(tweetedPost.data.id_str);
    }
  };
  return (
    <div style={{ display: "grid", placeItems: "center" }}>
      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <div>
        <button
          style={{
            backgroundColor: "#55acee",
            display: "flex",
            fontSize: "large",
            border: "none",
            padding: "10px",
            borderRadius: "5px",
            color: "white",
            cursor: "pointer",
            paddingRight: "20px",
          }}
          onClick={signInWithTwitter}
        >
          <img
            style={{ hight: "30px", width: "30px", marginRight: "5px" }}
            src={twitter}
            alt="tw"
          />
          Login with Twitter
        </button>

        {/* <TwitterButton onClick={signInWithTwitter} /> */}
      </div>
      {/* coding a dashboard showing user's followers count likes count and quotes count */}
      <div
        style={{
          display: "flex",
          marginTop: "50px",
          alignContent: "center",
          justifyContent: "center",
        }}
      >
        {stats === "flex" ? (
          <></>
        ) : (
          <>{loading === true ? <img src={BNB} alt="loading..." /> : null}</>
        )}
      </div>
      {stats == "flex" ? <></> : null}
      {stats == "flex" ? (
        <input
          ref={input}
          autoFocus
          placeholder="#Walter_Airdrop"
          style={{
            marginTop: "50px",
            // backgroundColor: "#55acee",
            display: "flex",
            fontSize: "large",
            border: "none",
            padding: "10px",
            borderRadius: "5px",
            // color: "white",
            // cursor: "pointer",
          }}
          onChange={(e) => setPost(e.target.value)}
        ></input>
      ) : null}
      {stats == "flex" ? (
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
          onClick={tweet}
        >
          Tweet
        </button>
      ) : null}
      {countDown == true ? (
        <CountDown
          accessToken={accessToken}
          accessSecret={accessSecret}
          tweetId={tweetId}
          followers={followers}
        />
      ) : null}
      {/* {transaction ? (
        <>
          <p
            onClick={() => {
              navigator.clipboard.writeText(transaction);
              notify();
            }}
            style={{
              marginTop: "10px",
              background: "#e9e9e9",
              padding: "5px",
              borderRadius: "10px",
            }}
          >
            Hash: {getEllipsisTxt(transaction, 30)}
          </p>
          <ToastContainer
            position="top-right"
            autoClose={1000}
            hideProgressBar
            newestOnTop={false}
            closeOnClick={false}
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
          />
        </>
      ) : null} */}
    </div>

    // <Auth />
    // <div style={{ display: "flex", gap: "10px" }}>
    //   <Card
    //     style={styles.card}
    //     title={
    //       <>
    //         📝 <Text strong>To-Do List</Text>
    //       </>
    //     }
    //   >
    //     <Timeline mode="left" style={styles.timeline}>
    //       <Timeline.Item dot="📄">
    //         <Text delete style={styles.text}>
    //           Clone or fork{" "}
    //           <a
    //             href="https://github.com/ethereum-boilerplate/ethereum-boilerplate#-quick-start"
    //             target="_blank"
    //             rel="noopener noreferrer"
    //           >
    //             ethereum-boilerplate
    //           </a>{" "}
    //         </Text>
    //       </Timeline.Item>

    //       <Timeline.Item dot="💿">
    //         <Text delete style={styles.text}>
    //           Install all dependencies: <Text code>npm install</Text>
    //         </Text>
    //       </Timeline.Item>

    //       <Timeline.Item dot="🧰">
    //         <Text delete={isServerInfo} style={styles.text}>
    //           Sign up for a free account on{" "}
    //           <a
    //             href="https://moralis.io?utm_source=boilerplatehosted&utm_medium=todo&utm_campaign=ethereum-boilerplate"
    //             target="_blank"
    //             rel="noopener noreferrer"
    //           >
    //             Moralis
    //           </a>
    //         </Text>
    //       </Timeline.Item>

    //       <Timeline.Item dot="💾">
    //         <Text delete={isServerInfo} style={styles.text}>
    //           Create a Moralis Server (
    //           <a
    //             href="https://docs.moralis.io/moralis-server/getting-started/create-a-moralis-server"
    //             target="_blank"
    //             rel="noopener noreferrer"
    //           >
    //             How to start Moralis Server
    //           </a>
    //           )
    //         </Text>
    //       </Timeline.Item>

    //       <Timeline.Item dot="🔏">
    //         <Text delete={isServerInfo} style={styles.text}>
    //           Rename <Text code>.env.example</Text> to <Text code>.env</Text>{" "}
    //           and provide your <Text strong>appId</Text> and{" "}
    //           <Text strong>serverUrl</Text> from{" "}
    //           <a
    //             href="https://moralis.io?utm_source=boilerplatehosted&utm_medium=todo&utm_campaign=ethereum-boilerplate"
    //             target="_blank"
    //             rel="noopener noreferrer"
    //           >
    //             Moralis
    //           </a>
    //           :
    //         </Text>
    //         <Text code delete={isServerInfo} style={{ display: "block" }}>
    //           REACT_APP_MORALIS_APPLICATION_ID = xxxxxxxxxxxx
    //         </Text>
    //         <Text code delete={isServerInfo} style={{ display: "block" }}>
    //           REACT_APP_MORALIS_SERVER_URL =
    //           https://xxxxxx.grandmoralis.com:2053/server
    //         </Text>
    //       </Timeline.Item>

    //       <Timeline.Item dot="🔁">
    //         <Text delete={isServerInfo} style={styles.text}>
    //           Stop the app and start it again <Text code>npm run start</Text>
    //         </Text>
    //       </Timeline.Item>

    //       <Timeline.Item dot="💿">
    //         <Text delete={isInchDex} style={styles.text}>
    //           Install{" "}
    //           <a
    //             href="https://moralis.io/plugins/1inch/?utm_source=boilerplatehosted&utm_medium=todo&utm_campaign=ethereum-boilerplate"
    //             target="_blank"
    //             rel="noopener noreferrer"
    //           >
    //             1inch Moralis Plugin
    //           </a>{" "}
    //           needed for the<Text code>{"<InchDex />"}</Text> component
    //           (optional)
    //         </Text>
    //       </Timeline.Item>

    //       <Timeline.Item dot="🚀">
    //         <Text style={styles.text}>BUIDL!!!</Text>
    //       </Timeline.Item>
    //     </Timeline>
    //   </Card>
    //   <div>
    //     <Card
    //       style={styles.card}
    //       title={
    //         <>
    //           💣 <Text strong>Starting Local Chain (optional)</Text>
    //         </>
    //       }
    //     >
    //       <Timeline mode="left" style={styles.timeline}>
    //         <Timeline.Item dot="💿">
    //           <Text style={styles.text}>
    //             Install{" "}
    //             <a
    //               target="_blank"
    //               rel="noopener noreferrer"
    //               href="https://www.npmjs.com/package/truffle"
    //             >
    //               Truffle
    //             </a>{" "}
    //             and{" "}
    //             <a
    //               target="_blank"
    //               rel="noopener noreferrer"
    //               href="https://www.npmjs.com/package/ganache-cli"
    //             >
    //               ganache-cli
    //             </a>{" "}
    //             <Text code>npm install -g ganache-cli truffle</Text>
    //           </Text>
    //         </Timeline.Item>
    //         <Timeline.Item dot="⚙️">
    //           <Text style={styles.text}>
    //             Start you local devchain: <Text code>npm run devchain</Text> on
    //             a new terminal
    //           </Text>
    //         </Timeline.Item>
    //         <Timeline.Item dot="📡">
    //           <Text style={styles.text}>
    //             Deploy test contract: <Text code>npm run deploy</Text> on a new
    //             terminal
    //           </Text>
    //         </Timeline.Item>
    //         <Timeline.Item dot="✅" style={styles.text}>
    //           <Text>
    //             Open the 📄<Text strong> Contract</Text> tab
    //           </Text>
    //         </Timeline.Item>
    //       </Timeline>
    //     </Card>
    //     <Card
    //       style={{ marginTop: "10px", ...styles.card }}
    //       title={
    //         <>
    //           📡{" "}
    //           <Text strong> Connecting your Local Chain to the Moralis DB</Text>
    //         </>
    //       }
    //     >
    //       <Timeline mode="left" style={styles.timeline}>
    //         <Timeline.Item dot="💿">
    //           <Text style={styles.text}>
    //             Download{" "}
    //             <a
    //               target="_blank"
    //               rel="noopener noreferrer"
    //               href="https://github.com/fatedier/frp/releases"
    //             >
    //               frpc
    //             </a>{" "}
    //             and provide missing params in the <Text code>.env</Text> file
    //           </Text>
    //         </Timeline.Item>
    //         <Timeline.Item dot="⚙️">
    //           <Text style={styles.text}>
    //             Connect your Moralis Database and Local Chain:{" "}
    //             <Text code>npm run connect</Text>
    //           </Text>
    //         </Timeline.Item>
    //         <Timeline.Item dot="💾">
    //           <Text style={styles.text}>
    //             Add contract events you want to watch:{" "}
    //             <Text code>npm run watch:events</Text>
    //           </Text>
    //         </Timeline.Item>
    //       </Timeline>
    //     </Card>
    //   </div>
    // </div>
  );
}
