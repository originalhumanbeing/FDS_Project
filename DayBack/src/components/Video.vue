<template lang="html">
  <div class="homepage-hero-module">
    <div class="video-container">
      <video autoplay loop class="fillWidth">
        // 크로스 브라우징 이슈때문에 파일 형식을 2개 넣어둠
        <source :src="videoSrcMP4" type="video/mp4" />Your browser does not support the video tag. I suggest you upgrade your browser.
        <source :src="videoSrcWebm" type="video/webm" />Your browser does not support the video tag. I suggest you upgrade your browser.
      </video>
      <div class="poster hidden">
        <img src="../assets/video/pencil_down.jpg" alt="">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  mounted() {
    let _this = this;
    this.scaleVideoContainer();

    this.initBannerVideoSize('.video-container .poster img');
    this.initBannerVideoSize('.video-container video');

    $(window).on('resize', function() {
      _this.scaleVideoContainer();
      _this.scaleBannerVideoSize('.video-container .poster img');
      _this.scaleBannerVideoSize('.video-container video');
    });

    $(document).keyup(function(e) {
      if (e.keyCode === 27) {
        let video = document.querySelector('.video-container video');
        if (video.paused) {
          video.play();
        }
        else {
          video.pause();
        }
      }
    });
  },
  methods: {
    scaleVideoContainer() {
      let height = $(window).height() + 5;
      let unitHeight = parseInt(height) + 'px';
      $('.homepage-hero-module').css('height',unitHeight);
    },
    initBannerVideoSize(element) {
      $(element).each(function(){
          $(this).data('height', $(this).height());
          $(this).data('width', $(this).width());
      });

      this.scaleBannerVideoSize(element);
    },
    scaleBannerVideoSize(element) {
      let windowWidth = $(window).width(),
      windowHeight = $(window).height() + 5,
      videoWidth,
      videoHeight;

      $(element).each(function(){
          let videoAspectRatio = $(this).data('height')/$(this).data('width');

          $(this).width(windowWidth);

          if(windowWidth < 1000){
              videoHeight = windowHeight;
              videoWidth = videoHeight / videoAspectRatio;
              $(this).css({'margin-top' : 0, 'margin-left' : -(videoWidth - windowWidth) / 2 + 'px', 'max-width': videoWidth});

              $(this).width(videoWidth).height(videoHeight);
          }

          $('.homepage-hero-module .video-container video').addClass('fadeIn animated');

      });
    }
  },
  computed: {
    videoSrcMP4() {
      return require('../assets/video/pencil_down.mp4');
    },
    videoSrcWebm() {
      return require('../assets/video/pencil_down.webm');
    }
  }
}
</script>

<style lang="css">
.homepage-hero-module {
    border-right: none;
    border-left: none;
    position: relative;
}
.no-video .video-container video,
.touch .video-container video {
    display: none;
}
.no-video .video-container .poster,
.touch .video-container .poster {
    display: block;
}
.video-container {
    position: relative;
    bottom: 0%;
    left: 0%;
    height: 100%;
    width: 100%;
    overflow: hidden;
    background: #000;
}
.video-container .poster img {
    width: 100%;
    bottom: 0;
    position: absolute;
}
.video-container .poster.hidden {
  display: none;
}
.video-container video {
    position: absolute;
    z-index: 0;
    bottom: 0;
}
.video-container video.fillWidth {
    width: 100%;
}
</style>
