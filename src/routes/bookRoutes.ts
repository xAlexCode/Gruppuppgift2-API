import express from "express"
import {
    fetchAllBooks,
    fetchbook,
    /*createBook,
    updateBook,
    deleteBook*/
} from "../controllers/bookController"

const router = express.Router();

router.get("/", fetchAllBooks);
router.get("/:id", fetchbook);
/*router.post("/", createBook);
router.patch("/:id", updateBook);
router.delete("/:id", deleteBook);*/

export default router;