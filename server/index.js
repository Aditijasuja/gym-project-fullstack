import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import connectionToDb from './config/dbconnection.js';
import errorMiddleware from './middlewares/errormiddleware.js'
import userroutes from './routes/userroutes.js';
import planRoutes from './routes/planroutes.js';
import profileRoutes from './routes/myprofileroutes.js';
import adminRoutes from './routes/adminroutes.js';


dotenv.config();
const app = express();
app.use(cors());
const PORT = process.env.PORT || 3000;

app.use(cookieParser());

//Middleware
app.use(express.json());

//Routes
app.use('/api/users', userroutes);
app.use('/api/plans', planRoutes);
app.use('/api/', profileRoutes);
app.use('/api/admin', adminRoutes);
app.use(errorMiddleware);

app.listen(PORT, async () =>
{
    await connectionToDb();
    console.log('Listening on port',PORT);
})

