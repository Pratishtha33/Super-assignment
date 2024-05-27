// Controller function to calculate subscription pricing
const calculatePricing = (req, res) => {
    // Extract credit score and credit lines from request body
    const { creditScore, creditLines } = req.body;

    // Check if required parameters are provided
    if (!creditScore || !creditLines) {
        return res.status(400).json({ error: 'Credit score and credit lines are required' });
    }

    // Subscription pricing parameters
    const basePrice = 10; // Base price for the subscription
    const pricePerCreditLine = 5; // Additional price per credit line
    const pricePerCreditScorePoint = 1; // Additional price per credit score point

    // Calculate subscription price
    const subscriptionPrice = basePrice + (pricePerCreditLine * creditLines) + (pricePerCreditScorePoint * creditScore);

    // Send response with calculated subscription price
    res.status(200).json({ subscriptionPrice });
};

module.exports = { calculatePricing };
