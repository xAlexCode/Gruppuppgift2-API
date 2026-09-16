const API_URL_BOOKS = "http://localhost:3000/api/books"; // Hämta alla böcker

document.getElementById("panelBtn").addEventListener("click", function(event) {
    event.preventDefault();
    window.location.href = "loggedin.html";
});

async function loadBooks() {
  try {
    const res = await fetch(API_URL_BOOKS);
    const books = await res.json();

    const container = document.getElementById("booksContainer");
    container.innerHTML = "";

    books.forEach(book => {
      const card = `
        <div class="col-md-4">
          <div class="card h-100 shadow-sm">
            <img src="${book.image}" class="img-fluid" alt="${book.title}" style="max-height: 500px; width: auto;">
          
            <div class="card-body">
                <h5 class="card-title">${book.title}</h5>
                <p class="card-text">
                <strong>Författare:</strong> ${book.author}<br>
                <strong>Genres:</strong> ${book.genres.join(", ")}<br> 
                <strong>År:</strong> ${book.published_year}
                </p>
                <a href="book.html?id=${book._id}" class="btn btn-primary">Läs mer</a>
            </div>

          </div>
        </div>
      `;
      container.innerHTML += card;
    });
    //minnesanteckning, join - Sätt ihop arrayen till text igen motsatt till split i protected.js
  } catch (error) {
    console.error("Kunde inte ladda böcker:", error);
  }
}

loadBooks(); // initiera sidan
