const API_URL_BOOKS = "http://localhost:3000/api/books";
const API_URL = "http://localhost:3000/api";

// Ladda böcker i tabellen
async function loadBooksTable() {
  const res = await fetch(API_URL_BOOKS);
  const books = await res.json();

  const tbody = document.getElementById("booksTable");
  tbody.innerHTML = "";

  books.forEach(book => {
    const row = `
      <tr>
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.genres.join(", ")}</td>
        <td>${book.published_year}</td>
      </tr>
    `;
    tbody.innerHTML += row;
  });
}

// Lägg till ny bok
document.getElementById("addBookForm").addEventListener("submit", async (event) => {
  event.preventDefault();

  const newBook = {
    title: document.getElementById("titleInput").value,
    author: document.getElementById("authorInput").value,
    genres: document.getElementById("genresInput").value.split(",").map(genre => genre.trim()), // Hämtar text från inputfältet,gör om texten till en array och tar bort mellanslag
    published_year: document.getElementById("yearInput").value,
    image: document.getElementById("imageInput").value
  };

  await fetch(API_URL_BOOKS, {
    method: "POST",
    headers: { 
        "Content-Type": 
        "application/json" 
    },
    body: JSON.stringify(newBook)
  });

  loadBooksTable(); // uppdatera tabellen
  event.target.reset(); // töm formuläret
});

// Fetch users and populate the users table
async function fetchUsers() {
    try {
        const response = await fetch(API_URL + "/users", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include"
        });

        if (response.status === 401 || response.status === 403) {
            window.location.href =
                "login.html?message=You must be logged in to view this page";
            return;
        }

        const users = await response.json();

        if (response.ok) {
            const tableBody = document.getElementById("usersTable");

    users.forEach(function (user) {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${user.username}</td>
            <td>${user.is_admin}</td>
            <td>${user.created_at}</td>
        `;

        tableBody.appendChild(row);
        });
        }

    } catch (error) {
        console.error("Error:", error);
    }
}

fetchUsers();

// Initiera sidan
loadBooksTable();

// Gammal logga ut knapp, kommer den användas?
// 2. Create an addEventlistener for the logout button on click. The buttons ID is "#logout-btn"
document.getElementById("logoutBtn").addEventListener("click", function(event) {
    event.preventDefault();
    // 3. Should make a POST request to API_URL + "/auth/logout", with credentials: "include"
    async function logout() {
        try {
            const response = await fetch(API_URL + "/auth/logout", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include"
            });
            const data = await response.json();
            // 4. On success, redirect to login.html. On failure display an error message in #logout-message
            if (response.ok) {
                window.location.href = "index.html";
            } else {
                // 5. Make the error message display in a red fashioned label. Use bootstraps classes 
                document.getElementById("logout-message").className = "alert alert-danger";
                document.getElementById("logout-message").innerHTML = "Logout failed. Please try again";
            }
            console.log(data);
        } catch (error) {
            console.error("Error:", error);
        }
    }
    logout();
});