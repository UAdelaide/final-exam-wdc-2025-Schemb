/* eslint-disable linebreak-style */
const vueinst = Vue.createApp({
    data() {
        return {

        };
    },
    methods: {
        async fetchDog() {
            await fetch('https://dog.ceo/api/breeds/image/random', {
                POST: 'GET'
                headers: JSON.stringify({
                        username: this.username,
                        email: this.email,
                        password: this.password
                })
            });
        }
    }
}).mount('body');
window.vm = vueinst;
