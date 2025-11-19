require('dotenv').config(); 

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const notesRouter = require('./routes/notes');

const app = express();
const PORT = 5000;


app.use(cors());
app.use(express.json()); 



const MONGODB_URI = process.env.MONGODB_URI; 

if (!MONGODB_URI) {
    console.error("Fatal Error: MONGODB_URI is not defined.");
    process.exit(1); 
}

mongoose.connect(MONGODB_URI)
    .then(() => console.log('MongoDB connected successfully'))
    .catch(err => console.error('MongoDB connection error:', err.message));



app.use('/api/notes', notesRouter);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});