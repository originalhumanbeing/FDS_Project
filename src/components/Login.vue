<template>
  <div class="login">
    <app-header></app-header>
    <app-video></app-video>
    <modal
      class="modal-template"
      v-if="showModal"
      @closeModal="showModal = false"
    ></modal>
  </div>
</template>

<script>
import Video from './Video.vue';
import Header from './Header.vue';
import Modal from './Modal.vue';

export default {
  name: 'app',
  data () {
    return {
      showModal: false
    }
  },
  components: {
    AppHeader: Header,
    AppVideo: Video,
    Modal
  },
  created() {
    this.$eventBus.$on('showSignInPopup', this.showSignInPopup);
  },
  methods: {
    showSignInPopup() {
      this.showModal = true;
    }
  }
}
</script>

<style lang="sass">

</style>
