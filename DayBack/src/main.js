import Vue from 'vue'
import App from './App.vue'
import Login from './components/Login.vue'
import VueRouter from 'vue-router'
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.css'
import Main from './components/Main.vue'

// vue-material 사용을 위한 설정
Vue.use(VueMaterial);
// vue-router 사용을 위한 설정
Vue.use(VueRouter);

// eventBus 사용을 위한 설정 (vue 객체)
const eventBus = new Vue();

// 일반 객체 설정 (전역에서 데이터 공유하기 위해서)
const store = {
    state: {
        key: '',
        // firebase 구글 로그인
        userInfo: null
    }
};

// vue 객체에 이벤트 버스와 데이터 저장하는 변수를 프로토타입으로 설정
Object.defineProperties(Vue.prototype, {
    $eventBus: {
        get() {
            return eventBus;
        }
    },
    $store: {
        get() {
            return store;
        }
    }
});

// 라우트 정의
// 경로와 컴포넌트를 연결한다.
const routes = [{
        path: '/',
        component: Login
    },
    {
        path: '/service',
        component: Main,
    }];

// 라우터 객체 생성하고 정의해 놓은 라우트 설정
const router = new VueRouter({
    mode: 'history',
    routes
});

new Vue({
    el: '#app',
    router,
    render: h => h(App)
})
