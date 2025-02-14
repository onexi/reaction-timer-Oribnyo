const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3030;

// Array to hold the form data
let formData = [];

// This will allow us to parse the body of POST requests
app.use(bodyParser.json());

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Serve the web page with the form
app.get('/reaction', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'reaction.html'));
});

// Handle the form submission via fetch
app.post('/input', (req, res) => {
    const { name, reactionTime, submissionDate } = req.body;

    // No need to escape here, you trust the client
    // Add the new user to the array
    formData.push({ name, reactionTime, submissionDate });

    // Send the updated list of users back as JSON
    res.json(formData);
});

// Serve the default page or redirect to /reaction
app.get('/', (req, res) => {
  res.redirect('/reaction');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
});