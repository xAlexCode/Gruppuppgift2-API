import mongoose from 'mongoose'
const { Schema } = mongoose

const reviewSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    book_id: {
        type: Schema.Types.ObjectId,
        ref: 'Book',
        required: true
    }
})

export default mongoose.model('Review', reviewSchema, 'reviews')
