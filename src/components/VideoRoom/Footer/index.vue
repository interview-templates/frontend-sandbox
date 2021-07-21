<template>
  <div class="video-room-footer">
    <div class="video-room-button-panel">
      <mic-button />
      <video-button />
      <phone-down-button />
    </div>
  </div>
</template>

<script>
import MicButton from "@/components/buttons/Mic.vue";
import PhoneDownButton from "@/components/buttons/PhoneDown";
import VideoButton from "@/components/buttons/Video";

export default {
  name: "Room",
  components: {
    MicButton,
    PhoneDownButton,
    VideoButton,
  },
};
</script>

<style scoped lang="stylus">
.video-room-footer
  display flex
  justify-content center;

.video-room-button-panel
  display flex;
  width: 500px;
  padding-top: 30px;
  justify-content center;
</style>
