<template>
  <div class="login">
    <div class="login__form">
      <video id="localVideo" autoplay muted></video>
      <video id="remoteVideos" autoplay muted></video>
      <div class="input-group">
        <div>{{username}}</div>
        <input type="text" class="login__input" placeholder="Room ID"  v-model="roomId"/>
      </div>
      <div>
        <input type="text" class="login__input" placeholder="Username" v-model="username"/>
      </div>
      <button class="login__button" @click="login">Join</button>
      <button class="login__button" @click="disableVideo">Disable Video</button>
    </div>
  </div>
</template>

<style scoped lang="stylus">
#localVideo, #remoteVideos
  width: 100px
  height: 100px
  backgroundL: red

</style>

<script>
// @ is an alias to /src
// import io from "socket.io-client";
// import SimpleSignalClient from "simple-signal-client";
import init, {
  Jason,
  JasonError,
  MediaStreamSettings,
  AudioTrackConstraints,
  DeviceVideoTrackConstraints,
  DisplayVideoTrackConstraints,
  FacingMode,
  MediaKind,
  MediaSourceKind
} from "medea-jason";

let localVideo;
let localStream;
let remoteVideo;
let peerConnection;
let uuid;
let serverConnection;

const remote_videos = [];
let remoteMemberId = 0;

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
  data: function () {
    return {
      username: 'Bob',
      roomId: 'call',
      token: 'helloworld',
    }
  },
  props: {
    socketURL: {
      type: String,
      default: "wss://frontend-sandbox-peyoter.herokuapp.com/ws",
    },
  },
  methods: {
    async disableVideo(){
      this.room.disable_video();
    },
    async login() {
      console.log('log');
      await init();
      const jason = new Jason();
      this.room = jason.init_room();

      const username = 'Bob';
      const roomId = 1441748;
      // this.room.join(this.socketURL + 'test-room' + '/' + username + '?token=test')
      this.room.join('wss://frontend-sandbox-peyoter.herokuapp.com/ws/' + this.roomId + '/' + this.username + '?token=' + this.token)

      this.room.on_failed_local_media((error) => {
        console.log('on_failed_local_media');
        // console.error(error.message());
      });

      this.room.on_new_connection((connection) => {
        console.log('on_new_connection');
        remoteMemberId = connection.get_remote_member_id();
        console.log('remoteMemberId', remoteMemberId);
        const isCallStarted = true;
        let memberVideoDiv = remote_videos[remoteMemberId];
        // if (memberVideoDiv === undefined) {
        //   memberVideoDiv = document.createElement('div');
        //   memberVideoDiv.classList.add('video');
        //   memberVideoDiv.classList.add('d-flex');
        //   memberVideoDiv.classList.add('flex-column');
        //   memberVideoDiv.classList.add('align-items-center');
        //   memberVideoDiv.style = 'margin: 10px';
        //   remoteVideos.appendChild(memberVideoDiv);
        //   remote_videos[remoteMemberId] = memberVideoDiv;

        connection.on_remote_track_added((track) => {
          console.log('on_remote_track_added');
          const playElement = document.getElementById('remoteVideos');
          let mediaStream = new MediaStream();
          mediaStream.addTrack(track.get_track());
          playElement.srcObject = mediaStream;

          // let playElement = undefined;
          // if (track.kind() === MediaKind.Video) {
          //   if (track.media_source_kind() === MediaSourceKind.Display) {
          //     playElement = memberVideoDiv.getElementsByClassName('display-video')[0];
          //     if (playElement === undefined) {
          //       playElement = document.createElement('video');
          //       memberVideoDiv.appendChild(displayVideoEl);
          //     }
          //     let mediaStream = new MediaStream();
          //     mediaStream.addTrack(track.get_track());
          //     playElement.srcObject = mediaStream;
          //   }
          // } else {
          //   playElement = memberVideoDiv.getElementsByClassName('audio')[0];
          //   if (playElement === undefined) {
          //     playElement = document.createElement('audio');
          //     playElement.className = 'audio';
          //     playElement.classList.add('audio');
          //     playElement.classList.add('order-3');
          //     playElement.controls = 'true';
          //     playElement.autoplay = 'true';
          //     memberVideoDiv.appendChild(playElement);
          //   }
          //   let mediaStream = new MediaStream();
          //   mediaStream.addTrack(track.get_track());
          //   playElement.srcObject = mediaStream;
          // }
          //
          // track.on_enabled( () => {
          //   console.log(`Track enabled: ${track.kind()}`);
          // });
          // track.on_disabled( () => {
          //   console.log(`Track disabled: ${track.kind()}`);
          // });
          // track.on_muted( () => {
          //   console.log(`Track muted: ${track.kind()}`);
          // });
          // track.on_unmuted( () => {
          //   console.log(`Track unmuted: ${track.kind()}`);
          // });
          track.on_stopped( () => {
            console.log('on_stopped');
            track.free();
            // playElement.remove();
          });
        });

        connection.on_close(()=>{
          remote_videos[remoteMemberId].remove();
          delete remote_videos[remoteMemberId];
        })
      });


      this.room.on_connection_loss(async (reconnectHandle) => {
        console.log('on_failed_local_media');
      });

      this.room.on_close(function (on_closed) {
        // remote_videos[remoteMemberId].remove();
        // delete remote_videos[remoteMemberId];

        console.log(
          `Call was ended.
          Reason: ${on_closed.reason()};
          Is closed by server: ${on_closed.is_closed_by_server()};
          Is error: ${on_closed.is_err()}.`
        );
      });


      // const localTracks = await jason.media_manager().init_local_tracks();
      // console.log('room', localTracks);

      // const log = new Jason();
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
