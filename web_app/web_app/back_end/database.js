const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/csv_data', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Failed to connect to MongoDB:', err));
