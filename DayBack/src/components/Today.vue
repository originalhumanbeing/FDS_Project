<template>
  <div class="today">
    <div class="daily">
      <div class="daily-title">Today</div>
      <md-card class="dailyCard">
        <span class="dailyDate">{{todayItem.created}}</span>
        <div class="dailyContent">
          <md-card-media>
            <div :class="todayItem.matchingColor">
              <img class="dailyEmoji" :src="todayItem.emojiSrc" alt="">
            </div>
          </md-card-media>
          <md-card-content>
            {{todayItem.content}}
          </md-card-content>
        </div>
        <div class="btn-group">
          <md-button @click.native="changeDaily">Change</md-button>
          <md-button @click.native="deleteDaily">Delete</md-button>
        </div>
      </md-card>
    </div>
  </div>
</template>

<script>
  import moment from 'moment';
  import axios from 'axios';

  export default {
      name: 'today',
      props: ['todayItem'],
      methods: {
          changeDaily(){
              this.$emit('changeDailyCard')
          },
          deleteDaily(){
              axios.delete('https://dayback.hcatpr.com/post/' + this.todayItem.id + '/', {
                  headers: {
                      'Authorization': 'Token ' + this.$store.state.key
                  }
              }).then(response => {
                  window.alert('삭제되었습니다');
                  // 삭제했을 때 다시 돌리는 부분 (통신이 끝나기 전에 컴포넌트를 돌리면 통신을 하면서 값을 비우는 걸 다 못 하니까 하면 안됌)
//                  this.$eventBus.$emit('changeDailyCard');
                  // 수정, 삭제 마무리하고 다시 뿌려줄 때
                  this.$eventBus.$emit('changeComplete');
              }).catch(e => {
                  console.error('삭제에 실패했습니다');
              })
          }
      }
  }
</script>

<style lang="sass" scoped rel="stylesheet/sass">
  .daily
    margin: 0 auto 60px
    position: relative
    width: 800px
    min-height: 450px

  .daily-title
    background: powderblue
    padding: 10px 30px
    position: absolute
    top: -10px
    left: 30px
    z-index: 10
    font-weight: 600
    font-size: 1.2em

  .dailyCard
    padding: 30px
    border-radius: 5px

  .dailyEmoji
    width: 150px

  .dailyDate
    font-weight: 500
    font-size: 1.2em
    text-align: left
    margin-top: 8px

  .dailyContent
    display: flex
    justify-content: center
    align-items: center
    flex-direction: row

  .md-card .md-card-media img
    width: 150px
    height: 150px

  .md-card-content
    width: 480px
    margin-left: 5%
    margin-bottom: 15px
    background: lighten(lightgray, 13%)
    border-radius: 5px

  .btn-group
    display: flex
    align-content: center
    justify-content: flex-end
    & md-button md-default-theme
      background: lightgray

</style>
