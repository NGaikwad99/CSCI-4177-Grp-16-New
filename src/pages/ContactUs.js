import React, { useState } from "react";
import "./ContactUs.css";

function ContactUs() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
        alert("Thank you for reaching out to us!");
    };
    
    return (
      <main className="contact-us">
        <div className="contactPg">
            <div className="info">
              <h1>Contact Us</h1>
              <p>We are more than happy to connect!</p>
              <p>
                To reach out to us, you can either submit the form or email us at
                xxxx@xxxx.xxx.
              </p>
              <p>
                In case of an inquiry, you can also visit our FAQ page to see if
                your question has already been answered.
              </p>
            </div>
            <form className="inputForm" onSubmit={handleSubmit}>
              <div id="name">  
              <input type="text" placeholder="First name"  value={firstName} 
                    onChange={(e) => setFirstName(e.target.value)} required/>

              <input type="text" placeholder="Last name" value={lastName} 
                    onChange={(e) => setLastName(e.target.value)} required/>
              </div>
              <input type="email" placeholder="Email"  value={email} 
                    onChange={(e) => setEmail(e.target.value)} required/>

              <textarea placeholder="What can we help you with?" value={message} 
                        onChange={(e) => setMessage(e.target.value)} required></textarea>

              <button type="submit"><strong>SUBMIT</strong></button>
            </form>
        </div>
      </main>
    
    );
}

export default ContactUs;