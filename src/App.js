import React, { useState } from 'react';

function App() {
  const [drawnTickets, setDrawnTickets] = useState([]);
  const [selectedTickets, setSelectedTickets] = useState([]);
  const [keptTickets, setKeptTickets] = useState([]);
  const [selectedTickets2, setSelectedTickets2] = useState([]);
  const [drawButtonDisabled, setDrawButtonDisabled] = useState(false);

  const drawTickets = () => {
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
      });
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
        });
    }
  };

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
          <ul>
            {drawnTickets.map((ticket, index) => (
              <li key={index}>
                <label>
                  <input
                    type="checkbox"
                    checked={selectedTickets.includes(ticket)}
                    onChange={() => toggleTicketSelection(ticket)}
                  />{' '}
                  {ticket.city1} &rarr; {ticket.city2} &#123;{ticket.score}&#125;
                </label>
              </li>
            ))}
          </ul>
          <button onClick={discardSelectedTickets}>Discard selected tickets</button>
        </div>
      )}
      
      <hr />

      { keptTickets.length > 0 &&
        <div>
          <h2>Your tickets:</h2>
          {keptTickets.length > 0 && <span>Select completed tickets to update total score.</span>}
          <ul>
            {keptTickets.map((ticket, index) => {
              return <li key={index}>
                <label>
                  <input
                    type="checkbox"
                    checked={selectedTickets2.includes(ticket)}
                    onChange={() => toggleTicketSelection2(ticket)}
                  />
                  {ticket.city1} &rarr; {ticket.city2} &#123;{ticket.score}&#125;
                </label>
              </li>;
            })}
          </ul>
        </div>
      }
    </div>
    <h4>Current ticket score: {calculateCurrentTicketScore()}</h4>
    <h4>Maximum possible score: {calculateMaxTicketScore()}</h4>
    <div>
      <button onClick={resetTickets}>Reset Game</button>
    </div>
  </>;
}

export default App;
