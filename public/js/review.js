function showReviews(reviews) {
    const list = document.getElementById('reviews-list')
    list.replaceChildren()

    if (reviews.length === 0) {
        list.textContent = 'Inga recensioner ännu.'
        return
    }

    for (const review of reviews) {
        const card = createReviewCard(review)
        list.append(card)
    }
}

function createReviewCard(review) {
    const card = document.createElement('article')
    card.className = 'card mb-3'

    const body = document.createElement('div')
    body.className = 'card-body'

    const heading = document.createElement('h3')
    heading.className = 'h5'
    heading.textContent = review.name + ' – ' + review.rating + '/5'

    const content = document.createElement('p')
    content.textContent = review.content

    const date = document.createElement('p')
    date.className = 'text-muted mb-0'
    date.textContent = new Date(review.created_at).toLocaleDateString('sv-SE')

    body.append(heading, content, date)
    card.append(body)

    return card
}

const reviewForm = document.getElementById('review-form')
reviewForm.addEventListener('submit', submitReview)

async function submitReview(event) {
    event.preventDefault()

    const message = document.getElementById('review-message')
    const button = document.getElementById('review-submit')
    const selectedRating = document.querySelector(
        'input[name="rating"]:checked'
    )

    const review = {
        name: document.getElementById('review-name').value,
        content: document.getElementById('review-content').value,
        rating: Number(selectedRating.value),
        book_id: bookId
    }

    message.textContent = ''
    button.disabled = true

    try {
        const response = await fetch(API_URL + '/reviews', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(review)
        })

        const data = await response.json()

        if (!response.ok) {
            throw new Error(
                data.message || data.error || 'Kunde inte spara recensionen.'
            )
        }

        reviewForm.reset()
        message.textContent = 'Din recension har sparats!'
    } catch (error) {
        message.textContent = error.message
        return
    } finally {
        button.disabled = false
    }

    try {
        await fetchBook()
    } catch (error) {
        message.textContent =
            'Recensionen sparades. Ladda om sidan för att uppdatera listan.'
    }
}
