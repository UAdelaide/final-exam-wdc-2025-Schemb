const vueinst = Vue.createApp({
    // Vue variables
    data() {
        return {
            dogImage: '',
            status: '',
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
                        dogImage: this.message,
                        status: this.status
                })
            });

            if (!response.ok) {
                const errorData = await response.json();
                this.errorMessage = errorData.message || 'An error occurred.';
                return;
            }

            const data = await response.json();
            this.dogImage = data.message;
            this.status = data.status;
            this.errorMessage = '';
        } catch (error) {
            this.errorMessage = 'Could not fetch dog of the day. Please bring more treats.';
        }
    }
}).mount('body');
window.vm = vueinst;
