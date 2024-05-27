const express = require('express');
const bodyParser = require('body-parser');
const uploadController = require('./uploadController');
const pricingController = require('./pricingController');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

// Routes
app.post('/upload', uploadController.uploadCSV);
app.post('/calculate-pricing', pricingController.calculatePricing);

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});