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
    }
}).mount('body');
window.vm = vueinst;
