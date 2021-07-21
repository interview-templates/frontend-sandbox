<template>
  <div class="video-list"></div>
</template>

<script>
// / const io = require("socket.io-client");
import io from "socket.io-client";
import SimpleSignalClient from "simple-signal-client";

export default {
  name: "VueContent",
  components: {},
  data() {
    return {
      socketURL: "wss://frontend-sandbox-peyoter.herokuapp.com/ws",
      roomId: "public-room",
      signalClient: null,
      videoList: [],
      canvas: null,
      socket: null,
    };
  },
  methods: {},
};
</script>
<style scoped>
.video-list {
  background: whitesmoke;
  height: auto;
  display: flex;
  flex-direction: row;
  justify-content: center;
  flex-wrap: wrap;
}
.video-list div {
  padding: 0;
}
.video-item {
  background: #c5c4c4;
  display: inline-block;
}
</style>
