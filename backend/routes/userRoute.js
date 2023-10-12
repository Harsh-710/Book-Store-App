import { StatusCodes } from 'http-status-codes';
import { User } from '../models/user.js'
import { BadRequestError, UnauthenticatedError } from '../errors/index.js';

import Express from "express";
const router = Express.Router();

// to create a new user
router.post('/signup', async (req, res) => {
    const user = await User.create({ ...req.body });
    const token = user.generateToken();
    res.status(StatusCodes.CREATED).json({ user : { name : user.name }, token });
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    if(!email || !password){
        throw new BadRequestError('Please provide email and password');
    }
    const user = await User.findOne({ email });
    if(!user){
        throw new UnauthenticatedError('Invalid credentials');
    }
    const isPasswordCorrect = await user.comparePassword(password);
    if(!isPasswordCorrect){
        throw new UnauthenticatedError('Invalid credentials');
    }
    const token = user.generateToken();
    res.status(StatusCodes.OK).json({ user : { name : user.name }, token });
})

export default router;