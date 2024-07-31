import './Journal.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import JournalCard from './JournalCard.js';

function Journal(){
   const [entries, setEntries] = useState([]);
   const [title, setTitle] = useState("");
   const [text, setText] = useState("");

   useEffect(() => {
    const getEntries = async () => {
      try {
        const response = await axios.get('http://csci-4177-grp-16-main.onrender.com/journalEntries');

        //The following line is for local testing:
        //const response = await axios.get('http://localhost:3001/journalEntries');
        setEntries(response.data);
        
      } catch (error) {
        console.error("Error fetching entries:", error);
      }
    };

    getEntries();
    }, []);
    
    const entryList= entries.length ===0 ? 'No entries yet' : entries.map((entry,k) => <JournalCard entry= {entry} key = {k}/>);


    async function handleSubmit(e){
        e.preventDefault();
        try {
            await axios.post('http://localhost:3001/newEntry', { title, text });
           
        } catch (err) {
            console.error(err);
        }
    }

    return(
        <div className="journal">
           <h1>Your Journal</h1>
           <hr /> <br />
           <div className = "content">
                <div className='newEntry'>
                <h2>What are you feeling right now?</h2>
                    <form className='entryForm' onSubmit = {handleSubmit}>
                    <tr>
                        <input className = 'title' type="title" placeholder="Enter a title here"  value={title} 
                            onChange={(e) => setTitle(e.target.value)} required/>
                    </tr>
                    <tr>
                        <input  className = 'text' type="text"  value={text} 
                            onChange={(e) => setText(e.target.value)} required/>
                    </tr>
                    <tr>
                        <button type="submit" onClick={handleSubmit}><strong>SUBMIT</strong></button>
                    </tr>
                    </form>
                </div>
                <div className='entries'>
                    <h2>All Entries</h2>
                    {entryList}
                </div>
           </div>
         </div>
    )
}
export default Journal;