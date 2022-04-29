import React from "react";
import "./Welcome.css";
import { useHistory } from "react-router-dom";

function Welcome() {
  const history = useHistory();

  function handleClick() {
    history.push("/QuickStart");
  }
  return (
    <div>
      <h1 className="Walter">Introducing $Walter</h1>
      <h5 className="text">
        The wallet app owned, operated, and governed by the users of twitter.
      </h5>

      <p className="Tokenomics">Tokenomics</p>
      <h5 className="Tokenomics_text">
        50% Airdrop | 30% Treasury | 20% Liquidity Providers
      </h5>
      {/* center the button in the middle of the screen */}

      <div className="center">
        <button
          style={{
            marginTop: "20px",
            backgroundColor: "#55acee",
            display: "flex",
            fontSize: "large",
            border: "none",
            padding: "10px",
            borderRadius: "5px",
            color: "white",
            cursor: "pointer",
            zIndex: 2,
            alignSelf: "center",
            paddingRight: "40px",
            paddingLeft: "40px",
          }}
          onClick={handleClick}
        >
          Claim Now!
        </button>
      </div>

      <div className="ocean">
        <div className="wave"></div>
        <div className="wave"></div>
      </div>
    </div>
  );
}

export default Welcome;
