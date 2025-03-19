const currentQuote = document.getElementById("current-quote");
const currentAuthor = document.getElementById("current-author");
const newQuoteBtn = document.getElementById("new-quote-btn");
const copyBtn = document.getElementById("copy-btn");
const tweetBtn = document.getElementById("tweet-btn");

const backgroundImages = [
    "https://wallpaperaccess.com/full/288747.jpg",
    "https://wallpaperaccess.com/full/7333817.jpg",
    "https://wallpaperaccess.com/full/9619469.jpg",
    "https://wallpaperaccess.com/full/9619470.jpg",
    "https://wallpaperaccess.com/full/6567939.jpg",
    "https://wallpaperaccess.com/full/8520186.jpg",
    "https://wallpaperaccess.com/full/9619474.jpg",
    "https://wallpaperaccess.com/full/9619481.png   "
];

document.addEventListener('DOMContentLoaded', function () {
    getRandomQuote();

    newQuoteBtn.addEventListener('click', getRandomQuote);
    copyBtn.addEventListener('click', copyQuote);
    tweetBtn.addEventListener('click', tweetQuote);
});

function getRandomQuote() {
    newQuoteBtn.disabled = true;
    newQuoteBtn.innerHTML = 'Loading...';

    currentQuote.style.opacity = 0;
    currentAuthor.style.opacity = 0;

    changeBackgroundImage();

    fetch("https://api.freeapi.app/api/v1/public/quotes/quote/random")
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            if (data.success && data.data) {
                const quote = data.data.content;
                const author = data.data.author || "Unknown";

                currentQuote.textContent = `"${quote}"`;
                currentAuthor.textContent = `- ${author}`;
            } else {
                currentQuote.textContent = "Could not fetch a quote. Please try again.";
                currentAuthor.textContent = "";
            }

            currentQuote.style.opacity = 1;
            currentAuthor.style.opacity = 1;

            newQuoteBtn.disabled = false;
            newQuoteBtn.innerHTML = '<i class="fas fa-sync-alt mr-1"></i> New Quote';
        })
        .catch(function (error) {
            console.error("Error fetching quote:", error);
            currentQuote.textContent = "Could not fetch a quote. Please try again.";
            currentAuthor.textContent = "";

            currentQuote.style.opacity = 1;
            currentAuthor.style.opacity = 1;

            newQuoteBtn.disabled = false;
            newQuoteBtn.innerHTML = '<i class="fas fa-sync-alt mr-1"></i> New Quote';
        });
}

function changeBackgroundImage() {
    const randomIndex = Math.floor(Math.random() * backgroundImages.length);
    const newBackground = backgroundImages[randomIndex];

    document.body.style.opacity = 0.3;

    setTimeout(() => {
        document.body.style.backgroundImage = `url('${newBackground}')`;
        document.body.style.opacity = 1;
    }, 300);
}

function copyQuote() {
    const textToCopy = `${currentQuote.textContent} ${currentAuthor.textContent}`;

    navigator.clipboard.writeText(textToCopy)
        .then(function () {
            alert("Quote copied to clipboard!");
        })
        .catch(function (err) {
            console.error('Failed to copy text: ', err);
            alert("Failed to copy quote to clipboard.");
        });
}

function tweetQuote() {
    const quote = currentQuote.textContent;
    const author = currentAuthor.textContent;

    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(quote + " " + author)}`;

    window.open(twitterUrl, '_blank');
}