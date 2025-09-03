import { ProjectToggle } from '../ButtonContent/ButtonContent'
import projectData from './ProjectData'
import "./Project.scss"
import { Images } from '../ButtonContent/ButtonContent'
import { track } from '@vercel/analytics';
import { Fragment } from 'react'
const Project = ({ projectID }) => {
  const { name, mainImg, content } = projectData[projectID];
  
  const title = `${name} Roadmap`;

  const Section = ({ header, paragraphs }) => (
    <section className="project-section">
      <h2 className="section-header">{header}</h2>
      {paragraphs.map(({ text, highlight, img1 }, i) => (
        <Fragment key={i}>
          <p className={`section-paragraph${highlight ? ' accent-first-line' : ''}`}>
            {text}</p>{(img1) && (<Images img1={img1}/>)}
        </Fragment>
      ))}
    </section>
  );

  // 3. the main return is now only three logical blocks
  const project = (projectID.charAt(2) == "1" ? "Research" : (projectID.charAt(2) == "2" ? "Chess" : "Bot"));
  track("Project: " + project);
  return (
    <div className="project-container">
      <figure className="image-wrapper">
        <img src={mainImg} alt={name} className="project-image"/>
      </figure>
      <ProjectToggle modalTitle={title} contentID={projectID}/>
      {content.map((sec, i) => (
        <Section key={i} header={sec.header} paragraphs={sec.paragraphs}/>
      ))}
    </div>
  );
}

export default Project;
