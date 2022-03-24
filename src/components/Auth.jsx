import React from "react";
import TwitterLogin from "react-twitter-login";

export default (props) => {
  const authHandler = (err, data) => {
    console.log(err, data);
  };

  return (
    <TwitterLogin
      authCallback={authHandler}
      consumerKey={"VOtbrEQPjEvnwyN2QjMXuhSeM"}
      consumerSecret={"SFTO3yCk2C2PklUqn31BeWpWxpTOF8FcciTBmqtT0nTs2lvm4R"}
    />
  );
};
