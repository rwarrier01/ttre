import DeleteIcon from '@mui/icons-material/Delete';
import MapIcon from '@mui/icons-material/Map';
import { Backdrop, Box, Button, Chip, CircularProgress, IconButton, Modal } from '@mui/material';
import React, { useState } from 'react';
import EuropeMap from './EuropeMap';

function App() {
  const [drawnTickets, setDrawnTickets] = useState([]);
  const [selectedTickets, setSelectedTickets] = useState([]);
  const [keptTickets, setKeptTickets] = useState([]);
  const [selectedTickets2, setSelectedTickets2] = useState([]);
  const [drawButtonDisabled, setDrawButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [openMap, setOpenMap] = useState(false);
  const [mapTicket, setMapTicket] = useState({});

  const drawTickets = () => {
    setLoading(true);
    fetch(`https://ttre.onrender.com/api/draw-tickets`, { method: 'POST' })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setDrawnTickets(data.tickets);
          setDrawButtonDisabled(true);
          setSelectedTickets([]);
        } else {
          alert(data.message);
        }
      })
      .finally(() => {
        setLoading(false);
      })
  };

  const discardSelectedTickets = () => {
    if (selectedTickets.length === 3) {
      alert('You must keep at least 1 ticket.');
      return;
    }

    drawnTickets.forEach(t => {
      if (!selectedTickets.includes(t)) {
        setKeptTickets(prev => [...prev, t])
      }
    })
    console.log(keptTickets);

    setDrawnTickets([]);
    setSelectedTickets([]);
    setDrawButtonDisabled(false);
  };

  const toggleTicketSelection = (ticket) => {
    if (selectedTickets.includes(ticket)) {
      setSelectedTickets(selectedTickets.filter((t) => t !== ticket));
    } else {
      setSelectedTickets([...selectedTickets, ticket]);
    }
  };

  const toggleTicketSelection2 = (ticket) => {
    if (selectedTickets2.includes(ticket)) {
      setSelectedTickets2(selectedTickets2.filter((t) => t !== ticket));
    } else {
      setSelectedTickets2([...selectedTickets2, ticket]);
    }
  };

  const calculateCurrentTicketScore = () => {
    let total = 0;
    keptTickets.forEach(ticket => {
      total += selectedTickets2.includes(ticket) ? ticket.score : -ticket.score;
    })
    return total;
  };

  const calculateMaxTicketScore = () => {
    let total = 0;
    drawnTickets.forEach(ticket => {
      if (!selectedTickets.includes(ticket)) {
        total += ticket.score;
      }
    })
    keptTickets.forEach(ticket => {
      total += ticket.score;
    })
    return total;
  };

  const resetTickets = () => {
    const confirmReset = window.confirm(
      'This will regenerate the deck and delete all your progress. Are you sure you want to continue?'
    );

    if (confirmReset) {
      setLoading(true);
      fetch('https://ttre.onrender.com/api/reset-tickets', { method: 'POST' })
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            setDrawnTickets([]);
            setSelectedTickets([]);
            setKeptTickets([]);
            setDrawButtonDisabled(false);
          } else {
            alert(data.message);
          }
        })
        .finally(() => {
          setLoading(false);
        })
    }
  };

  const doOpenMap = (ticket) => {
    console.log(ticket);
    setOpenMap(true);
    setMapTicket(ticket);
  }

  const drawnTicketsVisible = drawnTickets.length > 0;

  return <>
    <div>
      <h1>Ticket to Ride Europe</h1>
      <button onClick={drawTickets} disabled={drawButtonDisabled}>
        Draw 3 Tickets
      </button>
      {drawnTicketsVisible && (
        <div>
          <h2>Drawn tickets:</h2>
          <p>Select tickets to discard...</p>
          <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', }} gap={2} pr={'5px'}>
            {drawnTickets.map((ticket, index) => (
              <Box key={index} display='flex' justifyContent='center' flexDirection={'column'}>
                <Button
                  sx={{
                    borderRadius: 2,
                    fontSize: '0.875rem',
                    fontWeight: '700',
                    display: 'flex',
                    flexDirection: 'column'
                  }}
                  variant={selectedTickets.includes(ticket) ? 'contained' : 'outlined'}
                  onClick={() => toggleTicketSelection(ticket)}
                >
                  {ticket.city1} &rarr; {ticket.city2}
                  <Chip label={ticket.score} sx={{backgroundColor: '#ffcd38'}} />
                </Button>
                <Box display='flex' justifyContent='center'>
                  <IconButton color='secondary' onClick={() => doOpenMap(ticket)}>
                    <MapIcon />
                  </IconButton>
                </Box>
              </Box>
            ))}
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'center', pt: '10px' }}>
            <Button color='error' aria-label="delete" size="large" onClick={discardSelectedTickets} startIcon={<DeleteIcon />}>
              Discard tickets
            </Button>
          </Box>
          
        </div>
      )}

      <Modal
        open={openMap}
        onClose={() => setOpenMap(false)}
      >
        <Box display='flex' flexDirection='column' alignItems='center' justifyContent='center' height='100vh' gap={2}>
          <EuropeMap t={mapTicket} />
          <Button variant='contained'  onClick={() => setOpenMap(false)}>Close</Button>
        </Box>
      </Modal>
      
      <hr />

      { (drawButtonDisabled || keptTickets.length > 0) &&
        <div>
          <h2>Your tickets:</h2>
          {keptTickets.length > 0 && <p>Select completed tickets to update total score.</p>}
          <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)' }} gap={2} pr={'5px'}>
            {keptTickets.map((ticket, index) => (
              <Box key={index} display='flex' justifyContent='center' flexDirection={'column'}>
                <Button
                  sx={{
                    borderRadius: 2,
                    fontSize: '0.875rem',
                    fontWeight: '700',
                    display: 'flex',
                    flexDirection: 'column'
                  }}
                  color={selectedTickets2.includes(ticket) ? 'success' : 'error'}
                  variant='outlined'
                  onClick={() => toggleTicketSelection2(ticket)}
                >
                  {ticket.city1} &rarr; {ticket.city2}
                  <Chip label={ticket.score} sx={{backgroundColor: '#ffcd38'}} />
                </Button>
                <Box display='flex' justifyContent='center'>
                  <IconButton color='secondary' onClick={() => doOpenMap(ticket)}>
                    <MapIcon />
                  </IconButton>
                </Box>
              </Box>
            ))}
            {drawnTickets
              .filter((ticket) => !selectedTickets.includes(ticket))
              .map((ticket, index) => (
                <Button
                  key={index}
                  sx={{
                    borderRadius: 2,
                    fontSize: '0.875rem',
                    fontWeight: '700',
                    display: 'flex',
                    flexDirection: 'column'
                  }}
                  color='primary'
                  variant='outlined'
                  disabled
                >
                  {ticket.city1} &rarr; {ticket.city2}
                  <Chip label={ticket.score} />
                </Button>
              ))}
          </Box>
        </div>
      }
    </div>
    <h4>Current ticket score: {calculateCurrentTicketScore()}</h4>
    <h4>Maximum possible score: {calculateMaxTicketScore()}</h4>
    <div>
      <button onClick={resetTickets}>Reset Game</button>
    </div>

    {loading && (
        <Backdrop
          open={loading}
          sx={{ color: '#fff', backgroundColor: '#5e5e5e' }}
        >
          <Box display='flex' flexDirection='column' alignItems='center'>
            <CircularProgress color="inherit" />
            <h2>Waiting for tickets...</h2>
          </Box>
        </Backdrop>
      )}
  </>;
}

export default App;
