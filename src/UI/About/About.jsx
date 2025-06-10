import React from 'react'
import "./About.scss"
import Button from '../Button/Button'
import aboutMeData from './AboutMeData'

const About = ({ aboutID }) => {
  const about = aboutMeData[aboutID];
  if(!about) return <div>About Not Found</div>;

  let mainImage = about.mainImg;
  
  return (
    <div className="about-container"> 
      <div className="image-wrapper">
        <img src={mainImage} alt={about.name} className="about-image" />
      </div>
      {about.content.map((section, index) => (
        <div key={index} className='about-section'> 
          <h2 className='section-header'>{section.header}</h2>
          <p className='section-paragraph'>{section.paragraph}</p>
        </div>
      ))}
    </div>
  );
};

export default About;
 