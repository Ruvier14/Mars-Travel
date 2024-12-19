const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('firstPage'));
app.use('/secPage', express.static('secPage')); //
app.use('/thirPage', express.static('thirPage')); // Add this line

// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'firstPage/index.html'));
});

app.get('/secPage/index2.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'secPage/index2.html'));
});

app.get('/thirPage/index3.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'thirPage/index3.html'));
});

// Error handling
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// Index Page

app.post('/submit-form', (req, res) => {
    const formData = req.body;
    console.log('Received form data:', formData);
    
    // Here you would typically save the data to a database
    // For now, we'll just send back a success response
    res.json({ 
        success: true, 
        message: 'Form data received successfully' 
    });
});

app.post('/submit-travel', (req, res) => {
    const travelData = req.body;
    console.log('Received travel data:', travelData);
    res.json({ 
        success: true, 
        message: 'Travel data received successfully' 
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
}).on('error', (err) => {
    console.error('Server error:', err);
});

