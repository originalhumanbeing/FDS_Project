<template>
  <div class="week">
    <div class="weekly-title">Weekly</div>
    <ul class="weeklyItems">
      <li :class="item.matchingColor" v-for="item of weeklyItems">
        <md-card>
          <span class="weeklyItemsDate">{{item.created}}</span>
          <div class="weeklyContent">
            <md-card-media>
              <img class="emojiPic" :src="item.emojiSrc" alt="">
            </md-card-media>
            <md-card-content>{{item.content}}</md-card-content>
          </div>
        </md-card>
      </li>
    </ul>
  </div>
</template>

<script>

  import axios from 'axios';

  export default {
    name: 'Week',
    props: ['weeklyItems'],
    methods: {
        isElementInViewport(el) {
            let rect = el.getBoundingClientRect();
            return (
                rect.top >= 0 &&
                rect.left >= 0 &&
                rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
                rect.right <= (window.innerWidth || document.documentElement.clientWidth)
            )
        },
        callbackFunc(listItems) {
            for (var i = 0; i < listItems.length; i++) {
                if (this.isElementInViewport(listItems[i])) {
                    listItems[i].classList.add("in-view");
                }
            }
        }
    },
//   mounted(){
//       mounted 됐을 때 weeklyItems이 비어있음
      // mounted 때는 통신이 이뤄진 결과값을 data에 넣어두지 못했음
//       console.log('마운티드', this.weeklyItems);
//      var listItems = document.querySelectorAll('.weeklyItems li');
//      window.addEventListener('scroll', () => this.callbackFunc(listItems));
//    },
    updated () {
        // updated 됐을 때 weeklyItems를 가지고 오면서 데이터 변화가 일어나서
        // updated 훅 실행되면서 아래 함수가 호출됌
//      console.log('업데이트', this.weeklyItems);
      let listItems = document.querySelectorAll('.weeklyItems li');
      window.addEventListener('scroll', () => this.callbackFunc(listItems));
    }
  }
</script>

<style lang="sass" scoped rel="stylesheet/sass">
    *, *::before, *::after
      box-sizing: border-box

    .week
      margin: 0 auto
      background: #fff
      width: 800px
      padding: 60px
      border-radius: 5px
      overflow: visible
      box-shadow: 0 1px 5px rgba(0, 0, 0, .2), 0 2px 2px rgba(0, 0, 0, .14), 0 3px 1px -2px rgba(0, 0, 0, .12)
      position: relative

    .weekly-title
      background: lightcoral
      padding: 10px 30px
      position: absolute
      top: -10px
      left: 30px
      z-index: 100
      font-weight: 600
      font-size: 1.2em

    ul
      list-style: none
      padding-left: 0
      width: 2px
      margin: 0 auto
      background: #FFBAC3

    li
      padding-left: 30px
      min-width: 200px
      width: 380px
      position: relative
      visibility: hidden

    li::before
      content: ''
      position: absolute
      left: -9px
      top: 50%
      transform: translate(0, -50%)
      width: 20px
      height: 20px
      border-radius: 50%

    .happy::before
      background: #ffdc00

    .sulky::before
      background: #3cb371

    .naughty::before
      background: #C5C1FF

    .hungry::before
      background: #2CD8D5

    li:nth-child(odd) .md-card
      left: -410px

    .md-card
      padding: 30px
      margin-left: 10px

    .md-card .md-card-media img
      width: 50%

    .weeklyItemsDate
      padding: 10px
      font-weight: 500
      font-size: 1.1em

    .weeklyContent
      display: flex
      justify-content: center
      align-items: center

    .md-card-content
      width: 300px

    .in-view
      visibility: visible

    ul li
      visibility: hidden
      opacity: 0
      transition: all .5s ease-in-out

    ul li:nth-child(odd)
      transform: translate3d(-200px, 0, 0)


    ul li:nth-child(even)
      transform: translate3d(100px, 0, 0)

    ul li.in-view
      transform: none
      visibility: visible
      opacity: 1


</style>
