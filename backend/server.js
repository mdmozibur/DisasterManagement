require('dotenv').config({ path: `${process.cwd()}/.env` });
const express = require('express');
const app = express();
const cors = require('cors');
const crisisRouter = require('./route/crisis');
const donateRouter = require('./route/donate');
const authRouter = require('./route/auth');
const userRouter = require('./route/user');
const invRouter = require('./route/inventory');


app.get('/', (req, res) =>{
    res.status(200).json({
        status: 'success',
        message: 'Hello!!'
    });
});

app.use(cors({
    origin: 'http://localhost:4200' 
}));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/crisis', crisisRouter);
app.use('/donate', donateRouter);
app.use('/auth', authRouter);
app.use('/user', userRouter);
app.use('/inventory', invRouter);

app.listen(process.env.APP_PORT, () => {
    console.log("Server is running!");
});