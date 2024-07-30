import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './OnlineResources.css';
import anxietyImg from '../assets/img/anxiety.jpg';
import depressionImg from '../assets/img/depression.jpg';
import ptsdImg from '../assets/img/ptsd.jpg';
import schizophreniaImg from '../assets/img/Schizophrenia.png';
import bipolarImg from '../assets/img/bipolar.png';
import eatingDisorderImg from '../assets/img/eating.png';
import ptsdPngImg from '../assets/img/ptsd.png';
import paranoiaImg from '../assets/img/paranoia.png';

const images = {
  1: anxietyImg,
  2: depressionImg,
  3: ptsdImg,
  4: schizophreniaImg,
};

const videosImg={
  1: bipolarImg,
  2: ptsdPngImg,
  3: paranoiaImg,
  4: eatingDisorderImg
};

function OnlineResources() {
  const [articles, setArticles] = useState([]);
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const getArticles = async () => {
      try {
        const response = await axios.get('https://csci-4177-grp-16-main.onrender.com/articles');
        setArticles(response.data);
      } catch (error) {
        console.error("Error fetching articles:", error);
      }
    };

    const getVideos = async () => {
      try {
        const response = await axios.get('https://csci-4177-grp-16-main.onrender.com/videos');
        setVideos(response.data);
      } catch (error) {
        console.error("Error fetching videos:", error);
      }
    };

    getArticles();
    getVideos();
  }, []);

  return (
    <div className="online-resources">
      <h2>Online Resources</h2>
      <h2>Articles</h2>
      <div className="articles">
        {articles.map(article => (
          <div key={article.id} className="resource" style={{ backgroundColor: article.color }}>
           <a key={article.id} href={article.link}>
            <div className="image">
              <img src={images[article.id]} alt={article.title} />
            </div>
            <h3>{article.title}</h3>
            <p className="content">{article.content}</p>
            </a>
          </div>
        ))}
      </div>
      <h2>Videos</h2>
      <div className="videos">
        {videos.map(video => (
          <div key={video.id} className="resource" style={{ backgroundColor: video.color }}>
            <a key={video.id} href={video.link}>
            <div className="video">
            <img src={videosImg[video.id]} alt={video.title} />
              <div className="play-button">&#9658;</div>
            </div>
            <h3>{video.title}</h3>
            <p className="content">{video.content}</p>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default OnlineResources;


// https://www.military.com/benefits/veterans-health-care/posttraumatic-stress-disorder-overview.html
// https://eddinscounseling.com/social-anxiety-disorder-causes/
// https://www.kqed.org/futureofyou/435986/capturing-the-sound-of-depression-in-the-human-voice
// https://www.gbhoh.com/schizophrenia-signs-symptoms-treatments/


