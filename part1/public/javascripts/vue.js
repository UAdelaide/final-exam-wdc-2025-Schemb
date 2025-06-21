/* eslint-disable linebreak-style */
const vueinst = Vue.createApp({
    data() {
        return {
            dogImageLink: 'https://dog.ceo/api/breeds/image/random'
        };
    }
}).mount('body');
window.vm = vueinst;
