const multer = require('multer');
const csv = require('csv-parser');
const fs = require('fs');

// Multer configuration for file upload
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname)
    }
});

const upload = multer({ storage: storage }).single('csvFile');

// Controller function to handle file upload
const uploadCSV = (req, res) => {
    upload(req, res, (err) => {
        if (err instanceof multer.MulterError) {
            // A Multer error occurred when uploading
            return res.status(500).json({ error: 'Multer error occurred', details: err });
        } else if (err) {
            // An unknown error occurred when uploading
            return res.status(500).json({ error: 'An error occurred', details: err });
        }

        // File upload successful, now process the CSV file
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }

        const filePath = req.file.path;

        // Read CSV file and process data
        const results = [];
        fs.createReadStream(filePath)
            .pipe(csv())
            .on('data', (data) => results.push(data))
            .on('end', () => {
                // Send response with uploaded data
                res.status(200).json({ message: 'File uploaded successfully', data: results });
            });
    });
};

module.exports = { uploadCSV };
