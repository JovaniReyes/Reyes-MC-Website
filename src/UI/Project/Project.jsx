import { ProjectToggle } from '../ButtonContent/ButtonContent'
import projectData from './ProjectData'
import "./Project.scss"

const Project = ({ projectID }) => {
  const { name, mainImg, content } = projectData[projectID];
  const title = `${name} Project Status`;

  const Section = ({ header, paragraphs }) => (
    <section className="project-section">
      <h2 className="section-header">{header}</h2>
      {paragraphs.map(({ text, highlight }, i) => (
        <p key={i} className={`section-paragraph${highlight ? ' accent-first-line' : ''}`}>
          {text}
        </p>
      ))}
    </section>
  );

  // 3. the main return is now only three logical blocks
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
