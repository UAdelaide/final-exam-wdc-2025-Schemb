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

                errorM
            } catch (error) {
                this.errorMessage = 'Could not fetch dog of the day. Please try again later.';
            }
        }
    }
}).mount('body');
window.vm = vueinst;
