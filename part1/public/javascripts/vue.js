const vueinst = Vue.createApp({
    // Vue variables
    data() {
        return {
            dogImage: '',
            errorMessage: ''
        };
    },
    // Vue functions
    methods: {
        // Function to fetch the Dog CEO 
        async fetchDog() {
            try {
                const response = await fetch('https://dog.ceo/api/breeds/image/random', {
                    method: 'GET',
                    headers: JSON.stringify({
                            message: this.dogImage
                    })
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    this.errorMessage = errorData.message || 'An error occurred.';
                    return;
                }

                this.errorMessage = '';
            } catch (error) {
                this.errorMessage = 'Could not fetch dog of the day. Please bring more treats.';
            }
        }
    }
}).mount('body');
window.vm = vueinst;
