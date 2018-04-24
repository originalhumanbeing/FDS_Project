import moment from 'moment';
import axios from 'axios';

export default {
    googleLogin() {

    },

    googleLogout() {

    },

    fetchEmoji : fetchEmoji,

    createEmoji({uid, emoji, comment = ''}) {
        if (!emoji || !uid)
            throw 'Illegal Parameter';
        // console.log('fetchEmoji dd',this);

        return axios.post('https://dayback.hcatpr.com/post/', {
            author: 10,
            mood: emoji,
            content: comment
        }, {
            headers: {
                'Authorizati on': 'Token ' + uid
            }
        });




    },

    updateEmoji({uid, comment = '', emoji, date}) {
        assertIsInstanceOfDate(date);
        assertIsToday(date);

    },

    deleteEmoji({uid, date}) {
        assertIsInstanceOfDate(date);
        assertIsToday(date);

    },

    fetchEmojis({uid, baseDate, range}) {
        assertIsInstanceOfDate(baseDate);

    }
}

function fetchEmoji({uid, date}) {
    assertIsInstanceOfDate(date);
    date = moment(date).format('YYYYMMDD');
    console.log('uid', uid);

    return axios.get('https://dayback.hcatpr.com/post/',{
        headers: {
            'Authorization': 'Token ' + uid
        }})

}

function assertIsInstanceOfDate(date) {
    if (!(date instanceof Date))
        throw 'Invalid Date';
}

function assertIsToday(date) {
    if (moment(date).format('YYYYMMDD') != moment().format('YYYYMMDD'))
        throw 'Not Today';
}
function getEmojiImage(emoji) {
    if (emoji == 4) {
        return require('../assets/img/happy.png');
    }
    else if (emoji == 3) {
        return require('../assets/img/sulky.png');
    }
    else if (emoji == 2) {
        return require('../assets/img/naughty.png');
    }
    else if (emoji == 1) {
        return require('../assets/img/hungry.png');
    }
    else
        return '';
}

function getMatchingColor(emoji) {
    if (emoji == 4) {
        return 'happy';
    }
    else if (emoji == 3) {
        return 'sulky';
    }
    else if (emoji == 2) {
        return 'naughty';
    }
    else if (emoji == 1) {
        return 'hungry';
    }
    else
        return '';
}

