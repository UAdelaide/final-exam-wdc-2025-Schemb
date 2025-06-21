/* eslint-disable linebreak-style */
const vueinst = Vue.createApp({
    data() {
        return {
            id: 0,
            username: '',
            email: '',
            password: '',
            address: '',
            avatar: '/images/blank-profile-picture.png',
            errorMessage: '',
            cart: 0,
            manager: false,
            loggedIn: false
        };
    },
    methods: {
        async toggleUser() {
            this.loggedIn = false;

            await fetch('/logout', {
                method: 'POST',
                credentials: 'include'
            });

            window.location.href = '/';
        },
        async handleSignUp() {
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
        },
        async handleSignIn() {
            try {
                const response = await fetch('/login', {
                    method: 'POST',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        username: this.username,
                        password: this.password
                    })
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    this.errorMessage = errorData.message || 'An error occurred!';
                    return;
                }

                this.errorMessage = '';
                window.location.href = '/';
            } catch (error) {
                this.errorMessage = 'Username not found!';
            }
        }
    }
}).mount('body');
window.vm = vueinst;
