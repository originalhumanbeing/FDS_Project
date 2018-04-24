<template>
  <div class="input-card">
    <md-card>
      <md-card-area>
        <md-card-header>
          <div class="md-title">Day Update</div>
          <div class="md-subhead">Dayback</div>
        </md-card-header>
        <form novalidate @submit.stop.prevent="submit">
          <md-input-container class="input-area">
            <md-input-container>
              <label>How are you doing?</label>
              <md-textarea maxlength="100" v-model="user_input.content"></md-textarea>
            </md-input-container>
            <div class="emoji-group">
              <a href="#" class="happy" @click.prevent="selectEmoji(4)"
                 :class="{'active' : user_input.mood === 4}"><img src="../assets/img/happy.png" alt=""></a>
              <a href="#" class="sulky" @click.prevent="selectEmoji(3)"
                 :class="{'active' : user_input.mood === 3}"><img src="../assets/img/sulky.png" alt=""></a>
              <a href="#" class="naughty" @click.prevent="selectEmoji(2)"
                 :class="{'active' : user_input.mood === 2}"><img src="../assets/img/naughty.png" alt=""></a>
              <a href="#" class="hungry" @click.prevent="selectEmoji(1)"
                 :class="{'active' : user_input.mood === 1}"><img src="../assets/img/hungry.png" alt=""></a>
            </div>
          </md-input-container>
        </form>
        <md-card-actions>
          <md-button @click.native="createEmoji">Post</md-button>
        </md-card-actions>
      </md-card-area>
    </md-card>
  </div>
</template>

<script>

  import axios from 'axios';

  export default {
    name: 'input-card',
    props:['todayItem', 'authorID', 'isUpdate'],
    data () {
      return {
        user_input: {
          author: this.authorID,
          content: '',
          mood: ''
        },
      }
    },
      // 수정시 입력 카드로 돌아갈 때 그 인풋창에 입력값 자체가 계속 넣어져 있는 것
    mounted () {
//        console.log('input card : ', this.todayItem);
        if (this.todayItem && this.todayItem.content){
            this.user_input.content = this.todayItem.content;
        }
        if (this.todayItem && this.todayItem.mood){
            this.user_input.mood = this.todayItem.mood;
        }
    },
    methods: {
      selectEmoji(emoji) {
        this.user_input.mood = emoji;
//        console.log(emoji);
      },
      createEmoji() {
        // 오늘 이모지를 선택 안 할 경우
        if (!this.user_input.mood){
            window.alert('이모티콘을 선택해 주세요!');
            return;
        }
          // 입력된 값이 없을 때 기본값 넣는 것 처리 필요
          // authorID가 기본값에서 고유의 값으로 안 바뀌어 있을 것에 대비해서 우선 초기값 설정하고 시작
          // 통신할 때 기본으로 필요한 값이어서 받아옴
        this.user_input.author = this.authorID;

        if (this.isUpdate) {
            // isUpdate가 true면 수정이므로 put
            axios.put('https://dayback.hcatpr.com/post/'+this.todayItem.id+'/', this.user_input, {
                headers: {
                    'Authorization': 'Token ' + this.$store.state.key
                }
            }).then(response=>{
//                console.log(response);
                this.$eventBus.$emit('changeComplete');
                window.alert('오늘의 감정이 수정되었습니다.')
            }).catch(e=>{
                console.error('수정에 실패했습니다');
            })
        }
        else {
            // api에서 post이라고 해도 body를 null로 받는다고 설계해뒀으면 this.user_input 부분을 ''이나 null로 채워줘야함
            // 아니면 비우고 지나가면 config 부분을 data 부분으로 착각해서 오류남
            axios.post('https://dayback.hcatpr.com/post/', this.user_input, {
                headers: {
                    'Authorization': 'Token ' + this.$store.state.key
                }
            }).then(response=>{
                console.log(response.data);
                this.$eventBus.$emit('changeComplete');
                window.alert('오늘의 감정이 기록되었습니다.');
            }).catch(e=>{
                window.alert('입력에 실패했습니다');
            })
        }
      }
    }
  }
</script>

<style lang="sass" scoped rel="stylesheet/sass">
  .input-card
    margin: 0 auto 60px
    width: 800px
    min-height: 450px

  .input-area
    display: block
    margin: 0 auto
    padding: 20px

  .emoji-group
    display: block
    text-align: center

  .md-card-header
    text-align: center

  .active
    opacity: 0.5

  img
    width: 150px
    height: 150px

</style>
