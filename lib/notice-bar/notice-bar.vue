<template>
  <div class="notice-bar" :style="barStyle">
    <div class="notice-bar__icon" v-if="icon">
      <img :src="icon" alt="" height="100%" />
    </div>
    <div class="notice-bar__wrapper" ref="wrap">
      <div
        class="notice-bar__content"
        :class="animationClass"
        ref="content"
        :style="contentStyle"
        @aniamtionend="onAnimationEnd"
        @webkitAnimationEnd="onAnimationEnd"
        @webkitAnimationIteration="onAnimationIteration"
        @animationiteration="onAnimationIteration"
      >
        <slot>{{ text }}</slot>
      </div>
    </div>
  </div>
</template>

<script>
const COMPONENT_NAME = "notice-bar";
export default {
  name: COMPONENT_NAME,
  componentName: COMPONENT_NAME,
  props: {
    text: {
      type: String,
      required: true,
    },
    scrollable: {
      type: Boolean,
      default: false,
    },
    color: String,
    backgroundColor: String,
    icon: {
      type: String,
      default: "",
    },
    speed: {
      type: Number,
      default: 40,
    },
    delay: {
      type: Number,
      default: 1,
    },
    callback: Function,
  },
  watch: {
    text: {
      handler() {
        this.$nextTick(() => {
          const { wrap, content } = this.$refs;
          if (!this.text) {
            return;
          }
          const wrapWidth = wrap.getBoundingClientRect().width;
          const offsetWidth = content.getBoundingClientRect().width;
          // console.log('容器宽度为0 ', wrapWidth)

          if (!this.wrapWidth) {
            this.wrapWidth = wrapWidth;
            this.offsetWidth = offsetWidth;
            this.duration = offsetWidth / this.speed;
            this.animationClass = "notice-bar__play";
          }
        });
      },
      immediate: true,
    },
    scrollable: {
      handler() {},
      immediate: true,
    },
  },
  computed: {
    barStyle() {
      return {
        color: this.color,
        backgroundColor: this.backgroundColor,
      };
    },
    contentStyle() {
      return {
        paddingLeft: this.first ? 0 : this.wrapWidth + "px",
        animationDelay: (this.first ? this.delay : 0) + "s",
        animationDuration: this.duration + "s",
      };
    },
  },
  data() {
    return {
      animationClass: "",
      wrapWidth: 0,
      offsetWidth: 0,
      duration: 0,
      first: true,
    };
  },
  methods: {
    onAnimationEnd() {
      this.first = false;
      this.callback && this.callback();
      this.$nextTick(() => {
        this.duration = (this.wrapWidth + this.offsetWidth) / this.speed;
        this.animationClass = "notice-bar__play--infinite";
      });
    },
    onAnimationIteration() {
      this.callback && this.callback();
    },
    isElementInViewport(el) {
      var rect = el.getBoundingClientRect();
      return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <=
          (window.innerHeight ||
            document.documentElement
              .clientHeight) /* or $(window).height() */ &&
        rect.right <=
          (window.innerWidth ||
            document.documentElement.clientWidth) /* or $(window).width() */
      );
    },
    getOffsetLeft(el) {
      return el.offsetParent
        ? el.offsetLeft + this.getOffsetLeft(el.offsetParent)
        : el.offsetLeft;
    },
  },
};
</script>
<style scoped>
.notice-bar {
  display: flex;
  padding: 0 15px;
  width: 100%;
  font-size: 9px;
  background: rgba(43, 49, 63, 0.7);
  color: #fff;
}
.notice-bar__icon {
  height: 26px;
  min-width: 20px;
  box-sizing: border-box;
}
.notice-bar__wrapper {
  flex: 1;
  height: 26px;
  overflow: hidden;
  position: relative;
  box-sizing: border-box;
}
.notice-bar__content {
  display: flex;
  align-items: center;
  height: inherit;
  position: absolute;
  white-space: nowrap;
}
.notice-bar__play {
  animation: notice-bar-play linear both;
}
.notice-bar__play--infinite {
  animation: notice-bar-play-infinite linear infinite both;
}
@keyframes notice-bar-play {
  100% {
    transform: translate3d(-100%, 0, 0);
  }
}
@keyframes notice-bar-play-infinite {
  100% {
    transform: translate3d(-100%, 0, 0);
  }
}
</style>
