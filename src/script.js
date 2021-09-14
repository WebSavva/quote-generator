class App {
    constructor() {
        //obtaining  elements needed to change
        this.updateButton = document.getElementById('new-quote'),
      this.quoteText = document.getElementById('quote'),
      this.quoteAuthor = document.getElementById('author'),
      this.quoteContainer = document.getElementById('quote-container'),
      this.buttonTweeter = document.getElementById('twitter'),
      this.spinner = document.querySelector('.spinner');
      this.numberOfErrors = 0;

      this.updateButton.addEventListener('click', this.getQuote.bind(this));
        this.buttonTweeter.addEventListener('click', this.tweet.bind(this));
    }

    static start() {
        new App().getQuote();
    }

    tweet() {
        const author = this.quoteAuthor.innerText,
          quote = this.quoteText.innerText;

    const urlTwitter = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;

    window.open(urlTwitter, '_blank');
    }
    async getQuote() {
        const url = 'https://api.quotable.io/random';

        try {
            this.toggleSpinner(false);
            let responseCrude = await fetch(url);
            let quoteObject = await responseCrude.json();
            this.toggleSpinner(true);
    
            //if quote is too long
            if (quoteObject.content.length > 50) {
                this.quoteText.classList.add('long-quote');
            } else {
                this.quoteText.classList.remove('long-quote');
            }
            this.quoteText.textContent = quoteObject.content;
            
            this.quoteAuthor.textContent = quoteObject.author;
            
        } catch (error) {
            this.numberOfErrors++;
            if ( this.numberOfErrors < 10) {
                this.getQuote();
            } else {
                this.toggleSpinner(true);
                this.displayError();
            }
        }
    }
    toggleSpinner(hide) {
        if ( !hide ) {
            this.spinner.style.display = '';
            this.quoteContainer.style.display = 'none';
        } else {
            this.spinner.style.display = 'none';
            this.quoteContainer.style.display = '';
        }
    }
    displayError() {
        this.quoteContainer.innerHTML = '';
    this.quoteContainer.innerText = 'Sorry, try again . There must be something wrong with the Internet connection';
    }
}

App.start();