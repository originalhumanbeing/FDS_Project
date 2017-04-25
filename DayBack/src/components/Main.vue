<template>
  <div id="member">
    <div class="flex-wrapper">
      <transition enter-active-class="animated flipInY" leave-active-class="animated flipOutY" duration="450"
                  mode="out-in" appear>
        <component @changeDailyCard="changeDailyView"
                   :todayItem="todayItem"
                   :authorID="authorID"
                   :is-update="isUpdate"
                   :is="component_selected">
        </component>
      </transition>
      <week :weeklyItems="weeklyItems"></week>
    </div>
  </div>
</template>

<script>
  import InputCard from './InputCard.vue'
  import Today from './Today.vue'
  import Week from './Week.vue'
  import moment from 'moment/moment'
  import axios from 'axios';

  export default {
      name: 'main',
      data () {
          return {
              // 오늘 아이템
              todayItem: {},
              // 주간 아이템
              weeklyItems: [],
              // 사용자 아이디 (고유번호)
              authorID: 0,
              // transition에서 변환하기 위해서 쓰는 속성
              component_selected: 'input-card',
              // 입력 유무를 확인하기 위해서 쓰는 속성
              isUpdate: false
          }
      },
      components: {
          InputCard,
          Today,
          Week
      },
      methods: {
          setEmojiAndColor(){
              let index, length;
              length = this.weeklyItems.length;

              for (index = 0; index < length; index++) {
                  let emoji = this.weeklyItems[index].mood;
                  let color = '';

                  switch (emoji) {
                      case 4:
                          this.weeklyItems[index].emojiSrc = require('../assets/img/happy.png');
                          color = 'happy';
                          break;

                      case 3:
                          this.weeklyItems[index].emojiSrc = require('../assets/img/sulky.png');
                          color = 'sulky';
                          break;

                      case 2:
                          this.weeklyItems[index].emojiSrc = require('../assets/img/naughty.png');
                          color = 'naughty';
                          break;

                      case 1:
                          this.weeklyItems[index].emojiSrc = require('../assets/img/hungry.png');
                          color = 'hungry';
                          break;
                  }
                  this.weeklyItems[index].matchingColor = color;
              }
          },
          fetchDailyAndWeeklyEmojis() {
              // axios 통신 호출
              // 사용자 정보 가져오기
              axios.get('https://dayback.hcatpr.com/user/', {
                  headers: {
                      'Authorization': 'Token ' + this.$store.state.key
                  }
              }).then(response => {
                  // 성공시 처리
                  // 서버에서 받아온 사용자 정보의 ID값을 authorID에 할당
                  console.log(response);
                  this.authorID = response.data.results[0].id;
              }).catch(e => {
                  window.alert('사용자 정보를 가져오는데 실패했습니다');
                  // arrow function 사용시 this는 한 단계 위 scope를 가리킴 (여기서는 해당 함수를 쓰는 컴포넌트가 됌)
              });

              // 글 목록 가져오기
              axios.get('https://dayback.hcatpr.com/post/', {
                  headers: {
                      'Authorization': 'Token ' + this.$store.state.key
                  }
              }).then(response => {
                  this.weeklyItems = response.data.results;
                  this.setEmojiAndColor();

                  // 날짜 비교를 위해서 초기화
                  let inputDate = '',
                      date = '';

                  // 글 목록이 존재하지 않을 경우의 처리를 위한 유효성 검사
                  if (this.weeklyItems[0]) {
                      inputDate = this.weeklyItems[0].created;
                  }
                  date = moment(new Date()).format('YYYY-MM-DD');

                  if (inputDate === date) {
                      this.todayItem = this.weeklyItems.splice(0, 1)[0];
                      this.changeDailyView();
                  } else {
                      this.todayItem = null;
                      this.isUpdate = false;
                      this.component_selected = 'input-card';
                  }

                  // 주간을 7개까지만 보여주도록 splice로 자르는 부분
                  if (this.weeklyItems.length > 7) {
//                  console.log('짜르기 전 주간아이템', this.weeklyItems)
                      this.weeklyItems = this.weeklyItems.splice(0, 7);
//                  console.log('짜른 후 주간아이템', this.weeklyItems)
                      // 임시로 데이터 가공 (영상 촬용 위해)
//                  let dateList = ['2017-04-20', '2017-04-19', '2017-04-18', '2017-04-17', '2017-04-16', '2017-04-15', '2017-04-14'];
//                  let contentList = ['하루의 감정을 입력해보세요!', '오늘을 돌아보고 기록으로 남겨보세요!', '이모티콘을 선택해서 감정을 표현해도 됩니다!', '간단한 글로 표현해도 되고요!', '입력했던 기록들을 살펴볼수도 있어요!', '하루 하루의 감정을 남기고 확인하고 싶다면,', '지금 이용해 보세요!'];
//                  for (let index = 0; index < this.weeklyItems.length; index++) {
//                    this.weeklyItems[index].content = contentList[index];
//                    this.weeklyItems[index].created = dateList[index];
                  }
              }).catch(e => {
                  console.log('글 목록 가져오기 실패함')
              })
          },
          changeDailyView(){
              // 입력, 일간 교체 부분
//            console.log('changeDailyView 실행됌');
              this.component_selected = this.component_selected === 'input-card' ? 'today' : 'input-card';
              this.isUpdate = true;
          }
      },
      created() {
          this.fetchDailyAndWeeklyEmojis();
          this.$eventBus.$on('changeComplete', this.fetchDailyAndWeeklyEmojis);
          // view 전환이 통신이 끝나기 전에 되니까 값 비우지 못함 (inputCard에서 delete할 때 컴포넌트 바꿔주려고 했던 부분)
//      this.$eventBus.$on('changeDailyCard', this.changeDailyView);
      }
  }

</script>

<style lang="sass" scoped rel="stylesheet/sass">

  *, *::before, *::after
    box-sizing: border-box

  body #member
    padding-top: 60px
    background: linear-gradient(65deg, #FFBAC3 0%, #C5C1FF 56%, #2CD8D5 100%)

  .flex-wrapper
    padding-bottom: 60px
</style>
