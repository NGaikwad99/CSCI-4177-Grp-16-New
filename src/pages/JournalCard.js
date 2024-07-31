//author: Devon Turple B00851220
import React from 'react';
import './Journal.css';
import { Link } from 'react-router-dom';
const JournalCard = ({entry}) => {
    return (
        <div className='cardContainer'>
            <div className='button'>
            <Link to={`/journalEntry/${entry._id}`}>{entry.title}</Link>
                
            </div>
        </div>
  );
};

export default JournalCard;