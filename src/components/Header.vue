<template lang="html">
  <header class="fixed-header">
    <div class="fix-width">
      <h1 class="logo-heading">
        <a href="" class="logo-heading__link">
          DayBack
        </a>
      </h1>
      <nav class="gnb">
        <h2>Global Navigation</h2>
        <ul class="row-list">
          <li><a class="gnb__item" href="">About</a></li>
          <li><a class="gnb__item" href="">Toturial</a></li>
          <li><a class="gnb__item" href="">Member</a></li>
          <li><a class="gnb__item" href="" @click.prevent="showSignInPopup">SignIn</a></li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<script>
export default {
  methods: {
    showSignInPopup() {
      this.$eventBus.$emit('showSignInPopup');
    }
  }
}
</script>

<style lang="sass" scoped>
ul
  padding: 0
  margin: 0
  list-style: none

.fixed-header
  width: 100%
  background: rgba(3, 3, 3, 0.7)
  position: fixed
  top: 0
  left: 0
  z-index: 100

  & a:not(.md-button):not(.md-bottom-bar-item)
    color: #fff
    text-decoration: none

    &.logo-heading__link
      display: block
      height: 30px
      line-height: normal

.fix-width
  width: 960px
  padding: 1.25rem 0
  margin: 0 auto

  &::after
    display: block
    content: ''
    clear: both

.logo-heading
  float: left
  margin: 0
  font-size: 1.5rem
  font-weight: 400

.gnb
  float: right

  & li
    margin-top: 0
    
  &__item
    padding: 5px 8px
    margin: 0 5px
    border: 1px solid transparent

    &:hover,
    &:focus
      border: 1px solid #fff

  & h2
    position: absolute
    left: -99999em

.row-list
  display: flex
  height: 30px
  justify-content: center
  align-items: center
</style>
