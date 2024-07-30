import './landing.css'
import mission from '../assets/img/mission.png'
import introImg from '../assets/img/img-intro.png'

function Landing() {
    return (
        <main className="landing">
            <section className='intro'>
                <div className='heading'>
                    <img src={introImg} alt='brain wearing headphones'/>
                    <h1>Speak your heart out in a SafeSpace!</h1>
                    <p>Meet with a therapist, start your journal, have a chat with your computer buddy Zen or take advantage of our wide-range of resources! We got you covered!</p>
                </div>
                
                <div className='testimonials'>
                    <p>
                        "Safe Space has been a lifeline for me during some of my darkest days. The support and resources available are unparalleled."
                        <span className='author'>— Jessica S.</span>
                    </p>
                    <p>
                        "I love the flexibility and anonymity Safe Space provides. It makes it so much easier to reach out for help."
                        <span className='author'>— Mark T.</span>
                    </p>
                    <p>
                        "The self-care tools have been incredibly helpful in managing my daily stress. I highly recommend Safe Space to anyone."
                        <span className='author'>— Emily R.</span>
                    </p>
                    <p>** placeholder text since user studies haven't been conducted</p>
                </div>
            </section>

            <section className="mission">
                <div className='content'>
                    <h1>Our Mission</h1>
                    <p>
                        Here at SafeSpace we strive to offer a safe place for people of all backgrounds to have a place to meet not only with qualified professionals, but also with other individuals in our growing community.
                        <br />
                        <br />
                        Schedule a regular meeting session, join an impromptu meeting, make friends and join online discussions, all while being provided with an abundance of resources and tools to help you along your journey.
                    </p>
                </div>
                <img className='mission-image' src={mission} alt='vector showing mission'></img>
            </section>

            <section className="services">
                <div className="service" style={{ backgroundColor: '#FFC1C1' }}>
                    <h2>Meet Virtually</h2>
                    <p>
                    Take advantage of our scheduling system to attend regular therapy sessions with qualified professionals, or join an impromptu session on the fly.
                    </p>
                </div>
                <div className="service" style={{ backgroundColor: '#C1FFC1' }}>
                    <h2>Join Our Community</h2>
                    <p>
                    Join our online discussion forum to meet new people, and make new friends to support one another in your mental health journey.
                    </p>
                </div>
                <div className="service" style={{ backgroundColor: '#C1C1FF' }}>
                    <h2>Find Local Resources</h2>
                    <p>
                    We offer plenty of online resources, including a list of resources available in your area.
                    </p>
                </div>
                <div className="service" style={{ backgroundColor: '#FFFFC1' }}>
                    <h2>Journal Your Journey</h2>
                    <p>
                    Keep track of your mental health journey with our embedded diary system.
                    </p>
                </div>
            </section>
        </main>
    )
}

export default Landing;