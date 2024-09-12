// Array to store quote objects with text and category properties
let quotes = [
  { text: "The only limit to our realization of tomorrow is our doubts of today.", category: "Inspiration" },
  { text: "Life is what happens when you're busy making other plans.", category: "Life" },
  { text: "Do not dwell in the past, do not dream of the future, concentrate the mind on the present moment.", category: "Mindfulness" }
];
// Function to import quotes from a JSON file
function importFromJsonFile(event) {
  const fileReader = new FileReader();
  
  fileReader.onload = function(event) {
    try {
      const importedQuotes = JSON.parse(event.target.result);
      quotes.push(...importedQuotes);
      saveQuotes();
      alert('Quotes imported successfully!');
    } catch (error) {
      alert('Invalid JSON file');
    }
  };

  fileReader.readAsText(event.target.files[0]);
}

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
let quotes = [];

// Load quotes from localStorage
function loadQuotes() {
  const savedQuotes = localStorage.getItem('quotes');
  if (savedQuotes) {
    quotes = JSON.parse(savedQuotes);
  } else {
    quotes = [
      { text: "Life is what happens when you're busy making other plans.", category: "Life" },
      { text: "The only limit to our realization of tomorrow is our doubts of today.", category: "Inspiration" },
    ];
  }
}

// Save quotes to localStorage
function saveQuotes() {
  localStorage.setItem('quotes', JSON.stringify(quotes));
}

// Populate categories in the dropdown
function populateCategories() {
  const categoryFilter = document.getElementById("categoryFilter");
  const categories = [...new Set(quotes.map(quote => quote.category))];
  
  categoryFilter.innerHTML = '<option value="all">All Categories</option>';
  categories.forEach(category => {
    const option = document.createElement('option');
    option.value = category;
    option.textContent = category;
    categoryFilter.appendChild(option);
  });
}

// Filter quotes by selected category
function filterQuotes() {
  const selectedCategory = document.getElementById("categoryFilter").value;
  const quoteDisplay = document.getElementById("quoteDisplay");
  
  quoteDisplay.innerHTML = '';
  
  const filteredQuotes = selectedCategory === 'all' 
    ? quotes 
    : quotes.filter(quote => quote.category === selectedCategory);
  
  filteredQuotes.forEach(quote => {
    const quoteElement = document.createElement('p');
    quoteElement.textContent = `"${quote.text}" - ${quote.category}`;
    quoteDisplay.appendChild(quoteElement);
  });

  localStorage.setItem('selectedCategory', selectedCategory);
}

// Restore the last selected category filter
function restoreLastSelectedFilter() {
  const savedCategory = localStorage.getItem('selectedCategory');
  if (savedCategory) {
    document.getElementById('categoryFilter').value = savedCategory;
    filterQuotes();
  }
}

// Add a new quote and update categories
function addQuote() {
  const quoteText = document.getElementById('newQuoteText').value;
  const quoteCategory = document.getElementById('newQuoteCategory').value;

  if (quoteText && quoteCategory) {
    quotes.push({ text: quoteText, category: quoteCategory });
    saveQuotes();
    populateCategories();
    filterQuotes();
    
    document.getElementById('newQuoteText').value = '';
    document.getElementById('newQuoteCategory').value = '';
  } else {
    alert("Please enter both a quote and a category.");
  }
}

// Initialize the app
window.onload = function() {
  loadQuotes();
  populateCategories();
  restoreLastSelectedFilter();
};
const apiURL = 'https://jsonplaceholder.typicode.com/posts';
let quotes = JSON.parse(localStorage.getItem('quotes')) || [];

// Function to fetch quotes from the server
async function fetchQuotesFromServer() {
  try {
    const response = await fetch(apiURL);
    const serverQuotes = await response.json();
    mergeQuotesWithServer(serverQuotes);
  } catch (error) {
    console.error('Error fetching quotes:', error);
  }
}
      // Check for new or updated quotes from the server
      serverQuotes.forEach(serverQuote => {
        if (!localQuotesMap.has(serverQuote.title) || 
            JSON.stringify(localQuotesMap.get(serverQuote.title)) !== JSON.stringify(serverQuote)) {
          localQuotesMap.set(serverQuote.title, serverQuote);
        }
      });

      // Update local quotes with the synced data
      quotes = Array.from(localQuotesMap.values());
      localStorage.setItem('quotes', JSON.stringify(quotes));
      displayQuotes();

      // Notify the user that quotes have been synced
      alert('Quotes synced with server!');
    })
    .catch(error => console.error('Error syncing data:', error));
}

// Function to post a new quote to the server
async function postQuoteToServer(newQuote) {
  try {
    const response = await fetch(apiURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newQuote),
    });
    const result = await response.json();
    console.log('Posted quote to server:', result);
  } catch (error) {
    console.error('Error posting quote:', error);
  }
}

// Function to merge local and server quotes
function mergeQuotesWithServer(serverQuotes) {
  const localQuotes = JSON.parse(localStorage.getItem('quotes')) || [];
  
  // Check for conflicts
  const conflicts = localQuotes.filter(localQuote =>
    serverQuotes.some(serverQuote => serverQuote.text === localQuote.text)
  );

  if (conflicts.length > 0) {
    alert('Conflict detected! Merging quotes.');
  }

  const mergedQuotes = [
    ...serverQuotes,
    ...localQuotes.filter(localQuote => !serverQuotes.some(serverQuote => serverQuote.text === localQuote.text))
  ];
  
  localStorage.setItem('quotes', JSON.stringify(mergedQuotes));
  displayQuotes(mergedQuotes);
}

// Function to display quotes
function displayQuotes(quotes) {
  const quoteDisplay = document.getElementById('quoteDisplay');
  quoteDisplay.innerHTML = '';
  quotes.forEach(quote => {
    const p = document.createElement('p');
    p.textContent = `${quote.text} - ${quote.category}`;
    quoteDisplay.appendChild(p);
  });
}
// Function to sync quotes with the server
function syncQuotes() {
  // URL of the mock API endpoint
  const apiUrl = 'https://jsonplaceholder.typicode.com/posts'; // Replace with your real API endpoint
// Function to add a new quote
function addQuote(text, category) {
  const newQuote = { text, category };
  quotes.push(newQuote);
  localStorage.setItem('quotes', JSON.stringify(quotes));
  
  // Post the new quote to the server
  postQuoteToServer(newQuote);
  
  displayQuotes(quotes);
}

// Periodic sync
setInterval(fetchQuotesFromServer, 60000); // Fetch every minute

// Call fetch on page load
window.onload = fetchQuotesFromServer;
