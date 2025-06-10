import React from 'react'
import "./Button.scss"
import {playSound} from "../../Utils/buttonSound";
const Button = ({children, type, href, onClick}) => {
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
        className="button-default"
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
