/* eslint-disable linebreak-style */
const vueinst = Vue.createApp({
    data() {
        return {

        };
    },
    methods: {
        async fetchDog() {
            try {
                await fetch('https://dog.ceo/api/breeds/image/random', {
                    method: 'GET',
                    headers: JSON.stringify({
                            message: this.dogImage,
                            email: this.email,
                            password: this.password
                    })
                });
            } catch (error) {
                this.errorMessage = 'Server error. Please try again later.';
            }
        }
    }
}).mount('body');
window.vm = vueinst;
