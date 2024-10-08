const apiKey = 'aa8a1889df3d28e63cc1d541eeac24b9'; // Replace with your actual GNews API key
const apiUrl = 'https://gnews.io/api/v4/search?q=';
const breakingNewsUrl = `https://gnews.io/api/v4/top-headlines?token=${apiKey}&topic=breaking-news&lang=en`;

// Fetch general news by default on page load
window.onload = () => {
  fetchNewsByCategory('general');
  fetchBreakingNews();
};

// Fetch news by category
async function fetchNewsByCategory(category) {
  const url = `https://gnews.io/api/v4/top-headlines?token=${apiKey}&topic=${category}&lang=en`;

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const data = await response.json();
    displayTopHeadlines(data.articles);
  } catch (error) {
    console.error('Error fetching the news:', error);
  }
}

// Fetch breaking news
async function fetchBreakingNews() {
  try {
    const response = await fetch(breakingNewsUrl);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const data = await response.json();
    displayBreakingNews(data.articles);
  } catch (error) {
    console.error('Error fetching the breaking news:', error);
  }
}

// Search for news based on input
async function searchNews() {
  const searchQuery = document.getElementById('searchInput').value;
  if (!searchQuery) {
    alert('Please enter a search term');
    return;
  }

  const searchUrl = `${apiUrl}${encodeURIComponent(searchQuery)}&token=${apiKey}&lang=en`;

  try {
    const response = await fetch(searchUrl);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const data = await response.json();
    displayTopHeadlines(data.articles);  // Display search results in the top headlines section
  } catch (error) {
    console.error('Error fetching the news:', error);
  }
}

// Display top headlines in list format
function displayTopHeadlines(articles) {
  const topHeadlinesContainer = document.getElementById('top-headlines');
  topHeadlinesContainer.innerHTML = ''; // Clear previous results

  articles.forEach(article => {
    const headlineItem = document.createElement('li');
    headlineItem.innerHTML = `<a href="${article.url}" target="_blank">${article.title}</a>`;
    topHeadlinesContainer.appendChild(headlineItem);
  });
}

// Display breaking news with one big news and the rest below
function displayBreakingNews(articles) {
  const mainBreakingNewsContainer = document.getElementById('main-breaking-news');
  const breakingNewsContainer = document.getElementById('breaking-news');
  mainBreakingNewsContainer.innerHTML = ''; // Clear previous results
  breakingNewsContainer.innerHTML = ''; // Clear previous results

  if (articles.length > 0) {
    // Display the first article as the main breaking news
    const mainBreakingNews = articles[0];
    const mainNewsHTML = `
      <img src="${mainBreakingNews.image || 'https://via.placeholder.com/300'}" alt="News Image">
      <h3>${mainBreakingNews.title}</h3>
      <p>${mainBreakingNews.description || 'No description available.'}</p>
      <a href="${mainBreakingNews.url}" target="_blank" class="news-card-link">Read more</a>
    `;
    mainBreakingNewsContainer.innerHTML = mainNewsHTML;

    // Display the remaining articles below
    articles.slice(1).forEach(article => {
      const breakingNewsItem = document.createElement('div');
      breakingNewsItem.classList.add('breaking-news-item');

      breakingNewsItem.innerHTML = `
        <img src="${article.image || 'https://via.placeholder.com/300'}" alt="News Image">
        <h4>${article.title}</h4>
        <p>${article.description || 'No description available.'}</p>
        <a href="${article.url}" target="_blank" class="news-card-link">Read more</a>
      `;

      breakingNewsContainer.appendChild(breakingNewsItem);
    });
  }
}

// Function to toggle the genre filter dropdown
function toggleGenreFilter() {
  const genreFilter = document.getElementById("genre-filter");
  if (genreFilter.style.display === "block") {
    genreFilter.style.display = "none";
  } else {
    genreFilter.style.display = "block";
  }
}
