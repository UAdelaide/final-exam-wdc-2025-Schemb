/* eslint-disable linebreak-style */
const vueinst = Vue.createApp({
    data() {
        return {

        };
    },
    methods: {
        async fetchDog() {
            await fetch('https://dog.ceo/api/breeds/image/random', {
                method: 'GET',
                headers: JSON.stringify({
                        message: this.dogImage,
                        email: this.email,
                        password: this.password
                })
            });
        }
    }
}).mount('body');
window.vm = vueinst;
