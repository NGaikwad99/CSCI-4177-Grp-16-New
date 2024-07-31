//author: Devon Turple B00851220
import React, { useState, useEffect } from 'react';
import {useParams } from 'react-router-dom';
import axios from 'axios';
import './Journal.css';

function JournalEntry(props) {
  const [entry, setEntry] = useState({});

  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`http://csci-4177-grp-16-main.onrender.com/journalEntries/${id}`)

      //The following line is for local testing:
      //.get(`http://localhost:3001/journalEntries/${id}`)
      .then((res) => {
        setEntry(res.data);
      })
      .catch((err) => {
        console.log('Error from JournalEntry');
      });
  }, [id]);

  const entryItem = (
    <div>
      <table className='entry'>
        <tbody>
          <tr className='entryTitle'>
            <td>{entry.title}</td>
          </tr>
          <tr className='entryText'>
            <td>{entry.text}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );

  return (
    <div className='JournalEntry'>
      <div className='container'>
        <div className='row'>
          <br />
          <div>
            <h1 >Journal Entry</h1>
            <hr /> <br />
          </div>
          <div>{entryItem}</div>
        </div>
      </div>
    </div>
  );
}

export default JournalEntry;