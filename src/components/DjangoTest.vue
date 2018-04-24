<template>
    <div class="test">

    </div>
</template>

<script>
    import Vue from 'vue';
    import djangoService from '../service/djangoService';

    export default {
        name: 'DjangoTest',
        data () {
            return {}
        },
        methods: {},
        created () {
//            djangoService.createEmoji({
//                uid:'edf2af038824db4402adceef5532b67eac886344',
//                emoji: 3,
//                comment: 'ddd'})

            djangoService.updateEmoji()
            djangoService.fetchEmoji({uid: 'edf2af038824db4402adceef5532b67eac886344', date: new Date()})
                .then(r=>{
                    console.log(r);
                })
        }
    };
</script>

<style lang="sass" scoped rel="stylesheet/sass">
</style>
