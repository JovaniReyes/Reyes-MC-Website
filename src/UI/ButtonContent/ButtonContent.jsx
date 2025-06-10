import React from 'react'
import "./ButtonContent.scss"
import ButtonContentData from './ButtonContentData'

const ButtonContent = ({ContentID}) => {
  const content = ButtonContentData[ContentID];
  if(!content) return <div>Content Not Found</div>;

  return (
    <div className="content-container"> 
      {content.content.map((section, index) => (
        <div key={index} className='content-section'> 
          <h2 className='section-header'>{section.header}</h2>
          {section.paragraphs.map(({text, highlight}, idx) => (
            <p key={idx} className={`section-paragraph${highlight ? " accent-first-line" : ""}`}>
              {text}
            </p>
          ))}
        </div>
      ))}
    </div>
  );
};

export default ButtonContent;