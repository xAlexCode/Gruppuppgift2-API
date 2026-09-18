import { Request, Response } from "express";
import Book from "../models/book";
import review from "../models/review";

export const fetchAllBooks = async (req: Request, res: Response) => {
    try {
        const books = await Book.find().populate('reviews');
        res.json(books);
    } catch (error) {
        res.status(500).json({ message: "Error fetching books" });
    }
};

export const fetchbook = async (req: Request, res: Response) => {
    try {
        const bookId = req.params.id;
        const specificBook = await Book.findById(bookId).populate('reviews');
        if (!specificBook) {
            res.status(404).json({ message: "Book not found" })
            return;
        }
        res.json(specificBook);
    } catch (error) {
        res.status(500).json({ message: "Error fetching book" });
    }
};

export const createBook = async (req: Request, res: Response) => {
   
        const { title, description, author, genres, image, published_year } = req.body;

        if (!title || !description || !author || !genres || !image || !published_year) {
            res.status(400).json({ message: "Missing required fields" });
            return;
        }
     try {
        const newBook = await Book.create({
            title,
            description,
            author,
            genres,
            image,
            published_year
        });

        res.status(201).json({ 
            message: "Book created successfully", 
            data: newBook
        });
    
    } catch (error) {
        res.status(500).json({ message: "Error creating book" });
    }
};

export const updateBook = async (req: Request, res: Response) => {
    const {title, description, author, genres, image, published_year} = req.body;

    if (
        title === undefined && 
        description === undefined &&
        author === undefined && 
        genres === undefined && 
        image === undefined &&
        published_year === undefined) {
            res.status(400).json({ message: "At least one field must be provided for update" })
            return;
        }
    
    try {
        const bookId = req.params.id;
        const updatedBook = await Book.findByIdAndUpdate(bookId, req.body, { new: true }); // skickas hela req.body, vilket gör PATCH mer flexibeloch undviker att skriva över fält med undefined.

        if (!updatedBook) {
            res.status(404).json({ message: "Book not found" });
            return;
        }
        res.json({ message: "Book updated successfully", data: updatedBook });
    } catch (error) {
        res.status(500).json({ message: "Error updating book" });
    }
};

export const deleteBook = async (req: Request, res: Response) => {
  try {
    const bookId = req.params.id;
    const deletedBook = await Book.findByIdAndDelete(bookId);

    if (!deletedBook) {
      res.status(404).json({ message: "Book not found" });
      return;
    }

    // Radera alla reviews som hör till boken
    await review.deleteMany({ book_id: bookId });

    res.json({
      message: "Book and its reviews deleted successfully",
      data: deletedBook
    });
  } catch (error) {
    res.status(500).json({ message: "Error deleting book" });
  }
};