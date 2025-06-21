/* eslint-disable linebreak-style */
const vueinst = Vue.createApp({
    data() {
        return {

        };
    },
    methods: {
        async fetchDog() {
            await fetch('https://dog.ceo/api/breeds/image/random', {
                method: 'GET'
            });
        }
    }
}).mount('body');
window.vm = vueinst;
