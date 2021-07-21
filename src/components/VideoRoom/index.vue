<template>
  <div class="video-room">
    <VideoRoomHeader />
    <div class="video-room-content">
      <video-room-content />
    </div>
    <VideoRoomFooter />
  </div>
</template>

<script>
import VideoRoomFooter from "@/components/VideoRoom/Footer/index.vue";
import VideoRoomHeader from "@/components/VideoRoom/Header/index.vue";
import VideoRoomContent from "@/components/VideoRoom/Content/index.vue";

export default {
  name: "Room",
  components: {
    VideoRoomFooter,
    VideoRoomHeader,
    VideoRoomContent,
  },
};
</script>

<style scoped lang="stylus">
.video-room
  position: relative
  height: calc(100vh - 200px);

.video-room-content
  height: 100%


.video-room-header
  position: absolute
  top: 0
  height: 132px;
  background: linear-gradient(180deg, rgba(60,60,60,1) 0%, rgba(255,255,255,0) 100%);
  width: 100%

.video-room-footer
  position: absolute
  bottom: 0
  height: 132px;
  width: 100%
  background: rgb(0,0,0);
  background: linear-gradient(0deg, rgba(60,60,60,1) 0%, rgba(255,255,255,0) 100%);
</style>
