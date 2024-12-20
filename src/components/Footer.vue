<script setup>
import { useI18n } from 'vue-i18n';

const { t } = useI18n();


</script>

<script>
export default {
  data() {
    return {
      isContentVisible: false,
      isFooterClicked: false,
    };
  },
  methods: {
    showContent() {
      if (!this.isFooterClicked) {
        this.isContentVisible = true;
      }
    },
    hideContent() {
      if (!this.isFooterClicked) {
        this.isContentVisible = false;
      }
    },
    toggleContent(event) {
      event.stopPropagation();
      this.isFooterClicked = !this.isFooterClicked;
      this.isContentVisible = this.isFooterClicked;
    },
    closeContent(event) {
      if (!this.$el.contains(event.target)) {
        this.isContentVisible = false;
        this.isFooterClicked = false;
      }
    },
  },
  mounted() {
    document.addEventListener('click', this.closeContent);
  },
  beforeUnmount() {
    document.removeEventListener('click', this.closeContent);
  },
};
</script>


<template>
  <footer class="footer bg-dark text-white py-3" @mouseover="showContent" @mouseleave="hideContent"
    @click="toggleContent">
    <div class="footer-content container" :class="{
      'content-visible': isContentVisible || isFooterClicked,
      'hidden': !isContentVisible && !isFooterClicked
    }">
      <div class="row align-items-center upper-content">
        <div class="col-12 col-md-6 text-md-start text-center">
          <div class="about-info mb-2">
            <h5 class="mb-1 fw-bold">{{ t('name') }}</h5>
            <p class="mb-0">{{ t('footer.degree') }}</p>
            <p class="mb-0">{{ t('footer.university') }}</p>
          </div>
          <div class="address mb-2">
            <p class="mb-1">{{ t('footer.location') }}</p>
          </div>
        </div>
        <div class="col-12 col-md-6 text-md-end text-center">
          <div class="contact-me mb-2">
            <span class="fw-normal">{{ t('footer.findMe') }}</span>
          </div>
          <a href="https://www.linkedin.com/in/franglz" target="_blank" class="btn btn-link text-white">
            <img src="@/assets/icons/linkedin-icon.svg" alt="LinkedIn" class="icon" />
          </a>
          <a href="https://github.com/SlippedWave" target="_blank" class="btn btn-link text-white">
            <img src="@/assets/icons/github-icon.svg" alt="GitHub" class="icon" />
          </a>
          <a href="https://www.fiverr.com/frgonz" target="_blank" class="btn btn-link text-white">
            <img src="@/assets/icons/fiverr-icon.svg" alt="Fiverr" class="icon" />
          </a>
        </div>
        <hr>
      </div>
    </div>
    <div class="text-center text-md-left lower-content">
      <small class="fw-light">{{ t('footer.rights') }}</small>
    </div>
  </footer>
</template>


<style scoped>
.footer {
  position: fixed;
  /* Mantiene el footer en el fondo de la ventana */
  bottom: 0;
  left: 0;
  width: 100%;
  z-index: 10;
  cursor: pointer;
}

.footer-content {
  transition: opacity 0.5s ease, max-height 0.5s ease;
  overflow: hidden;
  max-height: 0;
  opacity: 0;
}

.footer-content.content-visible {
  max-height: 1000px;
  opacity: 1;
}

.footer-content.hidden {
  max-height: 0;
  opacity: 0;
}

.upper-content {
  display: none;
}

.footer-content.content-visible .upper-content {
  display: flex;
}

.lower-content {
  opacity: 0.5;
}
</style>
