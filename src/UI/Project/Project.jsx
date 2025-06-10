import React from 'react'
import "./Project.scss"
import Button from '../Button/Button'

const projectData = {
    'PP1': {
    name: "Assembly Line Typeracer",
    imageUrl: "./images/PP1.webp",
    externalLink: "https://example.com/roll-safe",
    content: [
      {
        header: "Development Tools",
        paragraphs: [
          {text: "Blender\n\tCreated 3D meshes, materials, and animated armatures.", highlight: true},
          {text: "Unreal Engine\n\tVisual Scripting with blueprints for all game logic. ", highlight: true},
        ]
      },
      {
        header: "Overview",
        paragraphs: [
          {text: "Objective\n\tEnter given prompts to complete assembly operations.", highlight: true},
          {text: "Versions\n\tDesktop & Virtual Reality Compatible.", highlight: true},
        ]
      }
    ]
  },
  'PP2': {
    name: "Chess Game",
    imageUrl: "./images/PP2.webp",
    externalLink: "https://example.com/roll-safe",
    content: [
      {
        header: "Development Tools",
        paragraphs: [
          {text: "Javacript\n\tFrontend User Interface & User Input.", highlight: true},
          {text: "Java\n\tBackend Move validation, Special moves, & Promotions.", highlight: true},
          {text: "Figma\n\tDesigning Chess pieces & Board/Capture/Move UI Borders.", highlight: true}
        ]
      },
      {
        header: "Overview",
        paragraphs: [
          {text: "This is the second paragraph.", highlight: false},
          {text: "This is the second paragraph.", highlight: false},
        ]
      }
    ]
  },
  'PP3': {
    name: "Arduino Bot",
    imageUrl: "./images/PP3.webp",
    externalLink: "https://example.com/roll-safe",
    content: [
      {
        header: "Development Tools",
        paragraphs: [
          {text: "Adruino IDE\n\tProgramming motor rotations", highlight: true},
          {text: "This is the first paragraph.", highlight: false},
        ]
      },
      {
        header: "Overview",
        paragraphs: [
          {text: "This is the second paragraph.", highlight: false},
          {text: "This is the second paragraph.", highlight: false},
        ]
      },
      {
        header: "Reference Guide",
        paragraphs: [
          {text: "This is the third paragraph.", highlight: false},
          {text: "This is the third paragraph.", highlight: false},
        ]
      }
    ]
  }
}

const Project = ({ projectID }) => {
  const project = projectData[projectID];

  if(!project) return <div>Project Not Found</div>;

  return (
    <div className="project-container">
      <div className="image-wrapper">
        <img 
        src={project.imageUrl}
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
