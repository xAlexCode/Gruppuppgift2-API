const params = new URLSearchParams(window.location.search)
const bookId = params.get('id')

async function fetchBook() {
    const response = await fetch(
        API_URL + '/books/' + encodeURIComponent(bookId)
    )

    if (!response.ok) {
        throw new Error('Kunde inte hämta boken.')
    }

    const book = await response.json()

    document.getElementById('book-title').textContent = book.title
    document.getElementById('book-author').textContent = book.author
    document.getElementById('book-year').textContent = book.published_year
    document.getElementById('book-genres').textContent = book.genres.join(', ')
    document.getElementById('book-description').textContent = book.description

    const image = document.getElementById('book-image')
    image.src = book.image
    image.alt = 'Omslag till ' + book.title

    showReviews(book.reviews)

    document.title = book.title
    document.getElementById('book-page').hidden = false
    document.getElementById('page-message').textContent = ''
}

document.addEventListener('DOMContentLoaded', async function () {
    const message = document.getElementById('page-message')

    if (!bookId) {
        message.textContent = 'Bokens ID saknas i adressen.'
        return
    }

    try {
        await fetchBook()
    } catch (error) {
        message.textContent = error.message
    }
})
