const vueinst = Vue.createApp({
    // Vue variables
    data() {
        return {
            dogImage: '',
            errorMessage: ''
        };
    },
    // Run when vue loads
    async mounted() {
        // Fetch the Dog CEO API
        try {
            const response = await fetch('https://dog.ceo/api/breeds/image/random', {
                method: 'GET',
                body: JSON.stringify({
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
}).mount('body');
window.vm = vueinst;
