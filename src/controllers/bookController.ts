import { Request, Response } from "express";
import Book from "../models/book";

export const fetchAllBooks = async (req: Request, res: Response) => {
    try {
        const books = await Book.find();
        res.json(books);
    } catch (error) {
        res.status(500).json({ message: "Error fetching books" });
    }
};

export const fetchbook = async (req: Request, res: Response) => {
    try {
        const bookId = req.params.id;
        const specificBook = await Book.findById(bookId);
        if (!specificBook) {
            return res.status(404).json({ message: "Book not found" });
        }
        res.json(specificBook);
    } catch (error) {
        res.status(500).json({ message: "Error fetching book" });
    }
};
