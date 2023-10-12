import express from 'express';
import cors from 'cors';
import 'express-async-errors';
import helmet from 'helmet';
import xss from 'xss-clean';
import dotenv from 'dotenv';
dotenv.config();

import {connectDB} from './db/connect.js';

const app = express();

import booksRoute from './routes/booksRoute.js';
import userRoute from './routes/userRoute.js';

import authenticateUser from './middleware/authentication.js';
import notFoundMiddleware from './middleware/not_found.js';
import errorHandlerMiddleware from './middleware/error_handler.js';


app.use(express.json());

// for security
app.use(helmet());
app.use(cors());
app.use(xss());


// routes
app.get('/', (req, res) => {
  res.send('Book Store API');
});

app.use('/books', authenticateUser, booksRoute);
app.use('/user', userRoute);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);


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