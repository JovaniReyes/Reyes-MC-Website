import React from 'react'
import "./Project.scss"
import Button from '../Button/Button'
import projectData from './ProjectData'


const Project = ({ projectID }) => {
  const project = projectData[projectID];

  if(!project) return <div>Project Not Found</div>;

  return (
    <div className="project-container">
      <div className="image-wrapper">
        <img 
        src={project.mainImg}
        alt={project.name}
        className="project-image"
        />
      </div>
      <Button href={project.externalLink} type={"link"}> Visit {project.name} </Button>
      {project.content.map((section, index) => (
        <div key={index} className='project-section'> 
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

export default Project;
