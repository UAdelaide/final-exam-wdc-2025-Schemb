/* eslint-disable linebreak-style */
const vueinst = Vue.createApp({
    data() {
        return {

        };
    },
    methods: {
        async fetchDog() {
            await fetch('async handleSignUp() {
            try {
                const response = await fetch('/signup', {
                    method: 'POST',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        username: this.username,
                        email: this.email,
                        password: this.password
                    })
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    this.errorMessage = errorData.message || 'An error occurred.';
                    return;
                }

                this.errorMessage = '';
                window.location.href = '/';
            } catch (error) {
                this.errorMessage = 'Server error. Please try again later.';
            }
        },')
        }
    }
}).mount('body');
window.vm = vueinst;
