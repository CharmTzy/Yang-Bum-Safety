const express = require('express');
const path = require('path');
const app = express();

// Serve public/ as the static folder
app.use(express.static(path.join(__dirname, 'public')));

// Route for "/"
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const PORT = process.env.PORT || 5500;
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
