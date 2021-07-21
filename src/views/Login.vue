<template>
  <div class="login">
    <div class="login__form">
      <video id="localVideo" autoplay muted></video>
      <div class="input-group">
        <input type="text" class="login__input" placeholder="Room ID" />
      </div>
      <div>
        <input type="text" class="login__input" placeholder="Username" />
      </div>
      <button class="login__button" @click="login">Join</button>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
// import io from "socket.io-client";
// import SimpleSignalClient from "simple-signal-client";
// import {Jason} from "medea-jason";
import axios from "axios";

let localVideo;
let localStream;
let remoteVideo;
let peerConnection;
let uuid;
let serverConnection;

let peerConnectionConfig = {
  iceServers: [
    { urls: "stun:stun.stunprotocol.org:3478" },
    { urls: "stun:stun.l.google.com:19302" },
  ],
};
function createUUID() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }

  return (
    s4() +
    s4() +
    "-" +
    s4() +
    "-" +
    s4() +
    "-" +
    s4() +
    "-" +
    s4() +
    s4() +
    s4()
  );
}

function getUserMediaSuccess(stream) {
  console.log("getUserMediaSuccess");
  localStream = stream;
  localVideo.srcObject = stream;
}

function errorHandler(error) {
  console.log(error);
}

async function createRoom(roomId) {
  // await axios({
  //   method: "post",
  //   url: controlUrl + roomId,
  //   data: {
  //     kind: "Room",
  //     pipeline: {},
  //   },
  // });
}

export default {
  name: "Login",
  props: {
    socketURL: {
      type: String,
      default: "wss://frontend-sandbox-peyoter.herokuapp.com/ws",
    },
  },
  methods: {
    async login() {

      // await axios({
      //   method: "post",
      //   url: "http://frontend-sandbox-peyoter.herokuapp.com/control-api/",
      //   data: {
      //     kind: "Room",
      //     pipeline: {},
      //   },
      // });

      uuid = createUUID();

      localVideo = document.getElementById("localVideo");

      let serverConnection = new WebSocket(this.socketURL);
      serverConnection.onmessage = this.gotMessageFromServer;

      let constraints = {
        video: true,
        audio: false,
      };

      if (navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices
          .getUserMedia(constraints)
          .then(getUserMediaSuccess)
          .catch(errorHandler);
      } else {
        alert("Your browser does not support getUserMedia API");
      }
      // console.log('Jason', Jason);
    },
    gotMessageFromServer(message) {
      console.log("gotMessageFromServer", message);
    },
  },
};
</script>

<style scoped lang="stylus">

.login
  display: flex;
  width: 100%
  height: 100%;
  flex-direction column;


.login__form
  height: 600px

.login__input
  background: #F2F2F2;
  box-shadow: inset 0px 0px 1px #000000;
  border-radius: 8px;
  color: #777777;
  font-size:22px;
  border:1px solid #eee;
  margin-bottom: 27px
  height: 50px;
  padding-left: 15px
  width:339px;
  display: inline-block;
  box-sizing: border-box;

.login__input:focus-visible
  outline:none;

.login__button
  width: 339px;
  height: 50px;
  background: #757DE8;
  border-radius: 8px;
  font-size: 16px;
  color:#fff;
  border: 0;
</style>
