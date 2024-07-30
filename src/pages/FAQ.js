import "./faq.css";

function FAQ() {
    
    return (
    <main className="faqPg">
         <h1>Frequently Asked Questions (FAQ)</h1>
          <p>In case this page cannot answer your questions, feel free to contact us!</p>
          <div className="questions">
          <div className = "question">
              <p><strong>What is Safe Space?</strong></p>
              <div className = "answer">
                <p>Safe Space is an online community designed around helping our users improve their mental health. We offer virtual therapy sessions, online discussion groups, and plenty of 
                  other features to ensure each of our users can has a safe space where they can start their mental health journey.
                </p>
              </div>
          </div>
          <div className = "question">
              <p><strong>Why should I use Safe Space?</strong></p>
              <div className = "answer">
                <p>It is true we are not the only website offering virtual therapy, but it is all the other features that set us apart. Not everyone wants to talk to a therapist, so why not
                  try our discussion forums and befriend other users you can talk to, or keep tabs on your journey with by making an entry in your mental health journal.
                </p>
              </div>
          </div>
          <div className = "question">
              <p><strong>Can I join this app even if I do not want to meet a therapist?</strong></p>
              <div className = "answer">
                <p>Absolutely, we offer plenty of features outside of our therapy system that can help you along your mental health journey! If you believe therapy
                  is not for you, try our online forum, our jounaling system, or our other online resources.
                </p>
              </div>
          </div>
          <div className = "question">
              <p><strong>Does Safe Space value my privacy?</strong></p>
              <div className = "answer">
                <p>Of course! At safe space we prioritize our users privacy. We do not store any of your private data, and all information you enter into your profile is opt in,
                  keeping the users in control of their privacy.
                </p>
              </div>
          </div>
          </div>
          
    </main>
    );
}

export default FAQ;