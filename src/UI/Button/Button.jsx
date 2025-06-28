import {playSound} from "../../Utils/buttonSound";
import "./Button.scss"

const Button = ({children, type, href, onClick, isProject = false}) => {
  const containerClass = `button-` + (isProject ? ` project` : `default`);
  
  const handleClick = () => {
    playSound();
    if(onClick){
      onClick();
    }
  }
  
  return (
    <>
    {type === "link" ? (
        <a 
        className={containerClass}
        href={href}
        target='_blank'
        rel='noopener noreferrer'
        onClick={handleClick}
        >
        {children}
      </a>

    ) : (
        <button onClick={handleClick} className="button-default"> {children} </button>
    )}
    </>
  );
};

export default Button
