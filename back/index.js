// Import environment variables
require('dotenv').config();

// Dependencies
const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();

// Cors for cross-origin requests
app.use(cors());

// Body parser for JSON requests
app.use(bodyParser.json());

require('./methods/tools')(app);

// If file or path not found, return public/index.html
app.use((req, res, next) => {
    if (fs.existsSync(path.join(__dirname, 'public', req.path))) {
        next();
        return;
    }

    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Expose the web interface
app.use(express.static(path.join(__dirname, 'public')));

// Start server
app.listen(process.env.PORT || 3000, () => {
    console.log(`Server started on port ${process.env.PORT || 3000}`);
});