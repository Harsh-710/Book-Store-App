import express from 'express';
import cors from 'cors';
import 'express-async-errors';
import helmet from 'helmet';
import xss from 'xss-clean';
import dotenv from 'dotenv';
dotenv.config();

import {connectDB} from './db/connect.js';
import booksRoute from './routes/booksRoute.js';

const app = express();

// middlewares 
// for parsing req body
app.use(express.json());

// for security
app.use(cors());
app.use(xss());
app.use(helmet());


// routes
// home route
app.get('/', (req, res) => {
  res.send('Book Store API');
});

// books route
app.use('/books', booksRoute);


const PORT = process.env.PORT || 5000;

const start = async () => {
    try{
        await connectDB(process.env.MONGO_URI);
        app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));
    }
    catch(error){
        console.log(error);
    }
}

start();