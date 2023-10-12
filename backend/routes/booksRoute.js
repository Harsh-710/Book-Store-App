import Express from "express";
import { Book } from '../models/booksModel.js'
import { StatusCodes } from "http-status-codes";
import { BadRequestError, NotFoundError } from "../errors/index.js";

const router = Express.Router();


// get all books
router.get('/', async (req,res) => {
    const books = await Book.find({ createdBy : req.user.userId }).sort('createdAt');
    return res.status(StatusCodes.OK).json({ books, count : books.length });
});


// get a single book
router.get('/:id', async (req,res) => {
    // check for both book and its user
    const book = await Book.findOne({ _id : req.params.id, createdBy : req.user.userId });
    if(!book){
        throw new NotFoundError(`No book found with id : ${req.params.id}`);
    }
    return res.status(StatusCodes.OK).json({ book });
});


// create a new book
router.post('/', async (req, res) => {
    req.body.createdBy = req.user.userId;
    const book = await Book.create(req.body);
    return res.status(StatusCodes.CREATED).json({ book });
});


// update a book
router.patch('/:id', async (req,res) => {
    const {
        body : { title, author },
        params : { id },
        user : { userId }
    } = req;
    if(title === '' || author === ''){
        throw new BadRequestError('Title and Author fields cannot be empty');
    }
    const book = await Book.findByIdAndUpdate(
        { _id : id, createdBy : userId },
        req.body,
        { new : true, runvalidators : true }
    )
    if(!book){
        throw new NotFoundError(`No book found with id : ${id}`);
    }
    return res.status(StatusCodes.OK).json({ book });
});

// delete a book
router.delete('/:id', async (req,res) => {
    const book = await Book.findByIdAndDelete({ _id : req.params.id, createdBy : req.user.userId });
    if(!book){
        throw new NotFoundError(`No book found with id : ${req.params.id}`);
    }
    return res.status(StatusCodes.OK).json({ msg : `Book deleted successfully` });
});

export default router;