const quotes = [
    {
        text: "The future depends on what you do today.",
        author: "Mahatma Gandhi"
    },
    {
        text: "Success is not final, failure is not fatal.",
        author: "Winston Churchill"
    },
    {
        text: "Believe you can and you're halfway there.",
        author: "Theodore Roosevelt"
    },
    {
        text: "It always seems impossible until it's done.",
        author: "Nelson Mandela"
    },
    {
        text: "The only way to do great work is to love what you do.",
        author: "Steve Jobs"
    },
    {
        text: "Dream big and dare to fail.",
        author: "Norman Vincent Peale"
    },
    {
        text: "Do something today that your future self will thank you for.",
        author: "Sean Patrick Flanery"
    },
    {
        text: "Don't watch the clock; do what it does. Keep going.",
        author: "Sam Levenson"
    },
    {
        text: "Great things are done by a series of small things brought together.",
        author: "Vincent van Gogh"
    },
    {
        text: "Start where you are. Use what you have. Do what you can.",
        author: "Arthur Ashe"
    }
];

const quoteElement = document.getElementById("quote");
const authorElement = document.getElementById("author");
const newQuoteButton = document.getElementById("newQuoteBtn");

let currentQuoteIndex = -1;

function generateQuote() {

    let randomIndex;

    do {
        randomIndex = Math.floor(Math.random() * quotes.length);
    } while (randomIndex === currentQuoteIndex);

    currentQuoteIndex = randomIndex;

    const selectedQuote = quotes[randomIndex];

    quoteElement.textContent = `"${selectedQuote.text}"`;
    authorElement.textContent = `— ${selectedQuote.author}`;
}

newQuoteButton.addEventListener("click", generateQuote);

generateQuote();
const copyQuoteButton = document.getElementById("copyQuoteBtn");
const copyMessage = document.getElementById("copyMessage");

copyQuoteButton.addEventListener("click", async () => {
    const quoteText = quoteElement.textContent;
    const authorText = authorElement.textContent;

    const fullQuote = `${quoteText} ${authorText}`;

    try {
        await navigator.clipboard.writeText(fullQuote);

        copyMessage.textContent = "✅ Quote copied!";
        
        setTimeout(() => {
            copyMessage.textContent = "";
        }, 2000);

    } catch (error) {
        copyMessage.textContent = "❌ Unable to copy quote.";
    }
});
const favoriteButton = document.getElementById("favoriteBtn");
const favoritesList = document.getElementById("favoritesList");

let favorites = JSON.parse(localStorage.getItem("favoriteQuotes")) || [];

function displayFavorites() {
    favoritesList.innerHTML = "";

    if (favorites.length === 0) {
        favoritesList.innerHTML = "<p>No favorite quotes yet.</p>";
        return;
    }

    favorites.forEach((favorite, index) => {
        const favoriteItem = document.createElement("div");
        favoriteItem.className = "favorite-item";

        favoriteItem.innerHTML = `
            <p>"${favorite.text}"</p>
            <strong>— ${favorite.author}</strong>
            <br><br>
            <button onclick="removeFavorite(${index})">Remove</button>
        `;

        favoritesList.appendChild(favoriteItem);
    });
}

favoriteButton.addEventListener("click", () => {
    const currentQuote = {
        text: quoteElement.textContent.replace(/"/g, ""),
        author: authorElement.textContent.replace("— ", "")
    };

    const alreadyFavorite = favorites.some(
        favorite =>
            favorite.text === currentQuote.text &&
            favorite.author === currentQuote.author
    );

    if (!alreadyFavorite) {
        favorites.push(currentQuote);

        localStorage.setItem(
            "favoriteQuotes",
            JSON.stringify(favorites)
        );

        favoriteButton.textContent = "❤️ Favorited";

        displayFavorites();
    } else {
        favoriteButton.textContent = "❤️ Already Favorite";
    }
});

function removeFavorite(index) {
    favorites.splice(index, 1);

    localStorage.setItem(
        "favoriteQuotes",
        JSON.stringify(favorites)
    );

    displayFavorites();

    favoriteButton.textContent = "🤍 Favorite";
}

displayFavorites();