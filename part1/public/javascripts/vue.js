const vueinst = Vue.createApp({
    // Vue variables
    data() {
        return {
            dogImage: '',
            dogName: 'Charlie',
            dogSize: 'Modest',
            viewImage
            errorMessage: ''
        };
    },
    // Run when vue loads
    async mounted() {
        // Fetch the Dog CEO API
        try {
            const response = await fetch('https://dog.ceo/api/breeds/image/random');

            if (!response.ok) {
                const errorData = await response.json();
                this.errorMessage = errorData.message || 'An error occurred.';
                return;
            }

            const data = await response.json();
            this.dogImage = data.message;

            this.errorMessage = '';
        } catch (error) {
            this.errorMessage = 'Could not fetch dog of the day. Please bring more treats.';
        }
    }
}).mount('body');
window.vm = vueinst;
