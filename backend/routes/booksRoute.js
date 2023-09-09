import Express from "express";
import { Book } from '../models/booksModel.js'

const router = Express.Router();

// to save new book
router.post('/', async (req, res) => {
    try{
        if(!req.body.title || !req.body.author || !req.body.publishYear){
            return res.status(400).send({ message : "Please fill all fields" });
        }
        const book = await Book.create({
            title : req.body.title,
            author : req.body.author,
            publishYear : req.body.publishYear,
        });
        return res.status(201).send(book);
    }
    catch(error){
        console.log(error);
        res.status(500).send({ message : error.message });
    }
});

// to get all books
router.get('/', async (req,res) => {
    try{
        const books = await Book.find({});
        return res.status(200).json({
            count : books.length,
            data : books,
        });
    }
    catch(error){
        console.log(error);
        return res.status(500).send({ message : error.message });
    }
});

// to get single book
router.get('/:id', async (req,res) => {
    try{
        const id = req.params.id;
        const book = await Book.findById(id);
        return res.status(200).json(book);
    }
    catch(error){
        console.log(error);
        return res.status(500).send({ message : error.message });
    }
});

// to update book
router.put('/:id', async (req,res) => {
    try{
        if(!req.body.title || !req.body.author || !req.body.publishYear){
            return res.status(400).send({ message : "Please fill all fields" });
        }
        const id = req.params.id;
        const result = await Book.findByIdAndUpdate(id, req.body);
        if(!result){
            return res.status(404).json({ message : "Book not found"});
        }
        return res.status(200).json({ message : "Book updated successfully"});
    }
    catch(error){
        console.log(error);
        res.status(500).send({ message : error.message });
    }
});

// to delete book
router.delete('/:id', async (req,res) => {
    try{
        const id = req.params.id;
        const result = await Book.findByIdAndDelete(id);
        if(!result){
            return res.status(404).json({ message : "Book not found"});
        }
        return res.status(200).json({ message : "Book deleted successfully"});
    }
    catch(error){
        console.log(error);
        res.status(500).send({ message : error.message });
    }
});

export default router;