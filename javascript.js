// API key for accessing the News API
const API_KEY = "5f531c781336406b95b5ec2cba0cef45";

// Base URL for the News API
const apiUrl = "https://newsapi.org/v2/everything?q=";

// Fetch news about India when the page loads
window.addEventListener('load', () => fetchNews("India"));

/**
 * Fetches news articles based on the query provided.
 * @param {string} query - The search term for fetching news articles.
 */
async function fetchNews(query) {
    try { 
        const res = await fetch(`${apiUrl}${query}&apiKey=${API_KEY}`);
        const data = await res.json(); // Parse the response to JSON
        bindData(data.articles); // Bind the articles data to the UI
    } catch (error) {
        console.error("Error Fetching News", error); // Log any errors that occur
    }
}

/**
 * Binds the fetched news articles to the DOM.
 * @param {Array} articles - An array of news articles.
 */
function bindData(articles) { 
    const blogContainer = document.getElementById('blog-container'); // Get the container element for blogs

    blogContainer.innerHTML = ""; // Clear existing content
    
    articles.forEach(article => {
        if (!article.urlToImage) return; // Skip articles without an image
        const cardClone = document.createElement('div'); // Create a new div element for the article card
        cardClone.classList.add('blog-card'); // Add a class to the new element
        fillDataInCard(cardClone, article); // Fill the card with article data
        blogContainer.appendChild(cardClone); // Append the card to the container
    });
}

/**
 * Fills an article card with the relevant data.
 * @param {HTMLElement} cardClone - The card element to be filled.
 * @param {Object} article - The news article object containing data.
 */
function fillDataInCard(cardClone, article) {
    const img = document.createElement('img'); // Create an img element for the article image
    const title = document.createElement('h3'); // Create an h3 element for the article title
    const newsSource = document.createElement('h6'); // Create an h6 element for the article source
    const description = document.createElement('p'); // Create a p element for the article description

    img.src = article.urlToImage; // Set the image source
    title.innerHTML = article.title; // Set the article title
    description.innerHTML = article.description; // Set the article description

    // Append the elements to the card
    cardClone.appendChild(img);
    cardClone.appendChild(title);
    cardClone.appendChild(description);

    // Add an event listener to open the article in a new tab when the image is clicked
    cardClone.firstElementChild.addEventListener('click',()=>{
        window.open(article.url,"_blank");
    });
}

// Keeps track of the currently selected navigation item
let curSelectedNav = null;

/**
 * Handles navigation item clicks, fetching news based on the selected item.
 * @param {string} id - The ID of the navigation item clicked.
 */
function onNavItemClick(id){
     fetchNews(id); // Fetch news based on the selected item
     const navItem = document.getElementById(id); // Get the clicked nav item
     curSelectedNav?.classList.remove('active'); // Remove the active class from the previously selected item
     curSelectedNav = navItem; // Update the currently selected item
     curSelectedNav.classList.add('active'); // Add the active class to the new item
}

// Search functionality
const searchButton = document.getElementById('search-button');
const searchText = document.getElementById('search-input');

// Fetch news based on the search query when the search button is clicked
searchButton.addEventListener('click',()=>{
    const query = searchText.value;
    if(!query) return; // Do nothing if the search input is empty
    fetchNews(query); // Fetch news based on the search query
    curSelectedNav?.classList.remove('active'); // Remove the active class from the previously selected item
    curSelectedNav = null; // Clear the currently selected navigation item
});

// Responsive Menu functionality
let menuList = document.getElementById('menuList');
menuList.style.maxHeight = '0px'; // Initially hide the menu

/**
 * Toggles the visibility of the responsive menu.
 */
function toggleMenu(){
    if(menuList.style.maxHeight == '0px') {
        menuList.style.maxHeight = '400px'; // Show the menu
    } else {
        menuList.style.maxHeight = '0px'; // Hide the menu
    }
}
