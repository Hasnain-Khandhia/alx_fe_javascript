// Array to store quote objects with text and category properties
let quotes = [
  { text: "The only limit to our realization of tomorrow is our doubts of today.", category: "Inspiration" },
  { text: "Life is what happens when you're busy making other plans.", category: "Life" },
  { text: "Do not dwell in the past, do not dream of the future, concentrate the mind on the present moment.", category: "Mindfulness" }
];

// Function to display a random quote from the quotes array
function showRandomQuote() {
  const quoteDisplay = document.getElementById('quoteDisplay');
  
  // Select a random quote from the array
  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
  
  // Display the selected quote in the quoteDisplay div
  quoteDisplay.innerHTML = `
    <p>"${randomQuote.text}"</p>
    <p><strong>Category:</strong> ${randomQuote.category}</p>
  `;
}

// Function to dynamically add a new quote based on user input
function addQuote() {
  const newQuoteText = document.getElementById('newQuoteText').value;
  const newQuoteCategory = document.getElementById('newQuoteCategory').value;
  
  // Check if both fields (text and category) are filled
  if (newQuoteText === "" || newQuoteCategory === "") {
    alert("Please enter both a quote and a category.");
    return;
  }

  // Add the new quote to the quotes array
  quotes.push({ text: newQuoteText, category: newQuoteCategory });

  // Clear the input fields after adding the quote
  document.getElementById('newQuoteText').value = "";
  document.getElementById('newQuoteCategory').value = "";

  // Display the newly added quote
  showRandomQuote();
}

// Function to create and inject the quote form into the DOM dynamically
function createAddQuoteForm() {
  const formContainer = document.createElement('div');
  
  formContainer.innerHTML = `
    <input id="newQuoteText" type="text" placeholder="Enter a new quote" />
    <input id="newQuoteCategory" type="text" placeholder="Enter quote category" />
    <button onclick="addQuote()">Add Quote</button>
  `;
  
  // Append the form to the body or any specific container
  document.body.appendChild(formContainer);
}

// Event listener to show a new random quote when the "Show New Quote" button is clicked
document.getElementById('newQuote').addEventListener('click', showRandomQuote);
// Array to store quotes
let quotes = [];

// Load quotes from localStorage if they exist
function loadQuotes() {
  const savedQuotes = localStorage.getItem('quotes');
  if (savedQuotes) {
    quotes = JSON.parse(savedQuotes);
  } else {
    // Default quotes if no data in localStorage
    quotes = [
      { text: "The only limit to our realization of tomorrow is our doubts of today.", category: "Inspiration" },
      { text: "Life is what happens when you're busy making other plans.", category: "Life" },
      { text: "Do not dwell in the past, do not dream of the future, concentrate the mind on the present moment.", category: "Mindfulness" }
    ];
  }
}

// Save quotes to localStorage
function saveQuotes() {
  localStorage.setItem('quotes', JSON.stringify(quotes));
}

// Function to display a random quote
function showRandomQuote() {
  const quoteDisplay = document.getElementById('quoteDisplay');
  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
  
  quoteDisplay.innerHTML = `
    <p>"${randomQuote.text}"</p>
    <p><strong>Category:</strong> ${randomQuote.category}</p>
  `;

  // Save the last viewed quote to sessionStorage (optional)
  sessionStorage.setItem('lastViewedQuote', JSON.stringify(randomQuote));
}

// Function to add a new quote dynamically
function addQuote() {
  const newQuoteText = document.getElementById('newQuoteText').value;
  const newQuoteCategory = document.getElementById('newQuoteCategory').value;

  if (!newQuoteText || !newQuoteCategory) {
    alert('Please enter both a quote and a category.');
    return;
  }

  // Add the new quote to the quotes array
  quotes.push({ text: newQuoteText, category: newQuoteCategory });
  
  // Save the updated quotes array to localStorage
  saveQuotes();

  // Clear input fields
  document.getElementById('newQuoteText').value = "";
  document.getElementById('newQuoteCategory').value = "";

  // Show the newly added quote
  showRandomQuote();
}

// Initialize the application
loadQuotes();
showRandomQuote();

// Event listener for showing a new random quote
document.getElementById('newQuote').addEventListener('click', showRandomQuote);

// Initial quote display on page load
showRandomQuote();

// Create and inject the add quote form when the page loads
createAddQuoteForm();
// Function to export quotes as a JSON file
function exportToJsonFile() {
  const dataStr = JSON.stringify(quotes, null, 2);
  const blob = new Blob([dataStr], { type: 'application/json' });
  const url = URL.createObjectURL(blob);

  // Create a download link and trigger it
  const a = document.createElement('a');
  a.href = url;
  a.download = 'quotes.json';
  a.click();

  // Clean up
  URL.revokeObjectURL(url);
}
