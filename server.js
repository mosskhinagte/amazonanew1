import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import productRouter from './routers/productRouter.js';
import userRouter from './routers/userRouter.js';
import orderRouter from './routers/orderRouter.js';


dotenv.config();



const app = express();


//TO CHECK IN POSTMAN THE MEMENTION ALSO NEED
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



//TO CONNECT MONGODB
mongoose.connect(process.env.MONGODB_URL || 'mongodb://localhost/amazon', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
});








//connet router
app.use('/api/users', userRouter);
app.use('/api/products', productRouter);
app.use('/api/orders', orderRouter);
app.get('/api/config/paypal', (req, res) => {
    res.send(process.env.PAYPAL_CLIENT_ID || 'sb');
})

app.get('/', (req, res) => {
    res.send('/Server is ready');
});





app.use((err, req, res, next) => {
    res.status(500).send({ message: err.message });
});


const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server at http://localhost:${port}`)
})