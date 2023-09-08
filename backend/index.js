import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import helmet from 'helmet';
import xss from 'xss';
import dotenv from 'dotenv';
dotenv.config();

import {connectDB} from './db/connect.js';

const app = express();

// app.use(express.json());
// app.use(cors());
// app.use(helmet());
// app.use(xss());

app.get('/', (req, res) => {
  res.send('Hello to Book Store');
});

const PORT = process.env.PORT || 5000;

const start = async () => {
    try{
        console.log(process.env.MONGO_URI)
        await connectDB(process.env.MONGO_URI);
        app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));
    }
    catch(error){
        console.log(error);
    }
}

start();