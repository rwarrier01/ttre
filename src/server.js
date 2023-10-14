const express = require('express');
const cors = require('cors'); // Import the 'cors' module
const ticket_generator = require('./ticket_generator');
const app = express();
const port = 3001;

app.use(express.json());
app.use(cors());
app.use(express.static('client/build'));


// Generate 50 tickets
let tickets = ticket_generator(50);


// Draw 3 tickets
app.post('/api/draw-tickets', (req, res) => {
  if (tickets.length >= 3) {
    const drawnTickets = tickets.splice(0, 3);
    res.json({ success: true, tickets: drawnTickets });
  } else {
    res.json({ success: false, message: 'Not enough tickets to draw.' });
  }
});

// Reset and regenerate tickets
app.post('/api/reset-tickets', (req, res) => {
  tickets = ticket_generator(50);
  res.json({ success: true });
});

// Serve the React app on any other route
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
