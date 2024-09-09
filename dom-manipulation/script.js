let quotes = [
    { text: "The only limit to our realization of tomorrow is our doubts of today.", category: "Inspiration" },
    { text: "Life is what happens when you're busy making other plans.", category: "Life" },
    { text: "Do not dwell in the past, do not dream of the future, concentrate the mind on the present moment.", category: "Mindfulness" }
  ];
  
  function showRandomQuote() {
    const quoteDisplay = document.getElementById('quoteDisplay');
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    quoteDisplay.innerHTML = `<p>"${randomQuote.text}"</p><p><strong>Category:</strong> ${randomQuote.category}</p>`;
  }
  
  document.getElementById('newQuote').addEventListener('click', showRandomQuote);
  
  function addQuote() {
    const newQuoteText = document.getElementById('newQuoteText').value;
    const newQuoteCategory = document.getElementById('newQuoteCategory').value;
  
    if (newQuoteText === "" || newQuoteCategory === "") {
      alert("Please enter both a quote and a category.");
      return;
    }
  
    quotes.push({ text: newQuoteText, category: newQuoteCategory });
  
    document.getElementById('newQuoteText').value = "";
    document.getElementById('newQuoteCategory').value = "";
  
    showRandomQuote();
  }
  
  showRandomQuote();
  