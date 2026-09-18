import { Request, Response } from 'express'
import mongoose from 'mongoose'
import Review from '../models/review'
import Book from '../models/book'

export const fetchAllReviews = async (req: Request, res: Response) => {
    try {
        const reviews = await Review.find()
        res.json(reviews)
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : 'Unknown error'
        res.status(500).json({ error: message })
    }
}

export const fetchReview = async (req: Request, res: Response) => {
    const id = req.params.id as string

    try {
        const review = await Review.findById(id)

        if (!review) {
            res.status(404).json({ message: 'Review not found' })
            return
        }

        res.json(review)
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : 'Unknown error'
        res.status(500).json({ error: message })
    }
}

export const createReview = async (req: Request, res: Response) => {
    const { name, content, rating, book_id } = req.body ?? {}

    if (
        typeof name !== 'string' || name.length === 0 ||
        typeof content !== 'string' || content.length === 0
    ) {
        res.status(400).json({ message: 'Name and content are required' })
        return
    }

    if (
        typeof rating !== 'number' ||
        rating < 1 || rating > 5
    ) {
        res.status(400).json({
            message: 'Rating must be a number between 1 and 5'
        })
        return
    }

    if (book_id === undefined) {
        res.status(400).json({ message: 'Book ID is required' })
        return
    }

    try {
        const book = await Book.findById(book_id)

        if (!book) {
            res.status(404).json({ message: 'Book not found' })
            return
        }

        const newReview = await Review.create({
            name,
            content,
            rating,
            book_id
        })

        res.status(201).json({
            message: 'Review created',
            review: newReview
        })
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : 'Unknown error'
        const status = error instanceof mongoose.Error.ValidationError ? 400 : 500

        res.status(status).json({ error: message })
    }
}

export const updateReview = async (req: Request, res: Response) => {
    const id = req.params.id as string
    const { name, content, rating } = req.body ?? {}

    if (name === undefined && content === undefined && rating === undefined) {
        res.status(400).json({
            message: 'Name, content or rating is required'
        })
        return
    }

    if (name !== undefined) {
        if (typeof name !== 'string' || name.length === 0) {
            res.status(400).json({
                message: 'Name must be a non-empty string'
            })
            return
        }
    }

    if (content !== undefined) {
        if (typeof content !== 'string' || content.length === 0) {
            res.status(400).json({
                message: 'Content must be a non-empty string'
            })
            return
        }
    }

    if (
        rating !== undefined &&
        (typeof rating !== 'number' || rating < 1 || rating > 5)
    ) {
        res.status(400).json({
            message: 'Rating must be a number between 1 and 5'
        })
        return
    }

    try {
        const updateFields: Partial<{
            name: string
            content: string
            rating: number
        }> = {}

        if (name !== undefined) updateFields.name = name
        if (content !== undefined) updateFields.content = content
        if (rating !== undefined) updateFields.rating = rating

        const result = await Review.updateOne(
            { _id: id },
            { $set: updateFields }
        )

        if (result.matchedCount === 0) {
            res.status(404).json({ message: 'Review not found' })
            return
        }

        res.json({ message: 'Review updated' })
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : 'Unknown error'
        res.status(500).json({ error: message })
    }
}

export const deleteReview = async (req: Request, res: Response) => {
    const id = req.params.id as string

    try {
        const result = await Review.deleteOne({ _id: id })

        if (result.deletedCount === 0) {
            res.status(404).json({ message: 'Review not found' })
            return
        }

        res.json({ message: 'Review deleted' })
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : 'Unknown error'
        res.status(500).json({ error: message })
    }
}
