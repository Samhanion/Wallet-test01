import React from "react";
import "./Welcome.css";
import background from "./Path.png";
import character from "./character.png";
import appStore from "./appStore.png";
import googlePlay from "./googlePlay.png";
import { ToastContainer, toast } from "react-toastify";
import { useHistory } from "react-router-dom";

function Welcome() {
  const history = useHistory();

  function handleClick() {
    history.push("/QuickStart");
  }

  // show a coming soon message..
  // function comingSoon() {}
  return (
    <>
      {" "}
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
      <div className="body">
        <img className="welcome" src={background} alt="" />
        <img className="character" src={character} alt="" />
        {/* <a
        href="https://twitter.com/share?ref_src=twsrc%5Etfw"
        className="twitter-share-button"
        data-show-count="false"
      >
        Tweet
      </a>
      <script
        async
        src="https://platform.twitter.com/widgets.js"
        charset="utf-8"
      ></script> */}
        <h1 className="intro">Introducing $Walter</h1>
        <p className="text">
          The wallet app owned, operated, and governed by the users of twitter.
        </p>
        <div className="download">
          <img
            className="appStore"
            src={appStore}
            alt=""
            onClick={() => toast.success("COMING SOON..")}
          />
          <img
            className="googlePlay"
            src={googlePlay}
            alt=""
            onClick={() => toast.success("COMING SOON..")}
          />
        </div>
        <div className="center">
          <button
            style={{
              backgroundColor: "#11adf5",
              display: "flex",
              fontSize: "large",
              border: "none",
              padding: "10px",
              borderRadius: "5px",
              color: "#fff",
              cursor: "pointer",
              zIndex: 2,
              alignSelf: "center",
              paddingRight: "40px",
              paddingLeft: "40px",
            }}
            onClick={handleClick}
          >
            Try the beta web version!
          </button>
        </div>
        <div className="tokenomics">
          <p style={{ fontSize: "30px" }}>Tokenomics</p>
          <p style={{ fontSize: "20px" }}>
            50% Airdrop 30% Treasury 20% Liquidity Providers
          </p>
        </div>
      </div>
    </>
  );
  //   return (
  //     <div>
  //       <h1 className="Walter">Introducing $Walter</h1>
  //       <h5 className="text">
  //         The wallet app owned, operated, and governed by the users of twitter.
  //       </h5>

  //       <p className="Tokenomics">Tokenomics</p>
  //       <h5 className="Tokenomics_text">
  //         50% Airdrop | 30% Treasury | 20% Liquidity Providers
  //       </h5>
  //       {/* center the button in the middle of the screen */}

  //       <div className="center">
  //         <button
  //           style={{
  //             marginTop: "20px",
  //             backgroundColor: "#55acee",
  //             display: "flex",
  //             fontSize: "large",
  //             border: "none",
  //             padding: "10px",
  //             borderRadius: "5px",
  //             color: "white",
  //             cursor: "pointer",
  //             zIndex: 2,
  //             alignSelf: "center",
  //             paddingRight: "40px",
  //             paddingLeft: "40px",
  //           }}
  //           onClick={handleClick}
  //         >
  //           Claim Now!
  //         </button>
  //       </div>

  //       <div className="ocean">
  //         <div className="wave"></div>
  //         <div className="wave"></div>
  //       </div>
  //     </div>
  //   );
}

export default Welcome;
