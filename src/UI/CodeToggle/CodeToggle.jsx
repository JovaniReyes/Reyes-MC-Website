import React, {useState} from 'react'
import "./CodeToggle.scss";
import { playSound } from '../../Utils/buttonSound';
import ButtonContent from '../ButtonContent/ButtonContent';
import {useModalStore} from '../../Exp/stores/modalStore';

const CodeToggle = () => {
  const {checkForOpenModal} = useModalStore();

  return (
    <>
      <button title={"CodeBtn"} onClick={() => {
        playSound();
        checkForOpenModal("Project Roadmap", <ButtonContent ContentID={"Code"}/>, "Code");
      }} className="code-toggle-button">
        <svg xmlns="http://www.w3.org/2000/svg" width="36" height="23" viewBox="0 0 36 23" fill="none">
<rect width="2" height="2" transform="matrix(-1 0 0 1 26 1)" fill="black"/>
<rect x="10" y="1" width="2" height="2" fill="black"/>
<rect x="26" y="22" width="2" height="2" transform="rotate(180 26 22)" fill="black"/>
<rect width="2" height="2" transform="matrix(1 0 0 -1 10 22)" fill="black"/>
<rect width="2" height="2" transform="matrix(-1 0 0 1 27 2)" fill="black"/>
<rect x="9" y="2" width="2" height="2" fill="black"/>
<rect x="27" y="21" width="2" height="2" transform="rotate(180 27 21)" fill="black"/>
<rect width="2" height="2" transform="matrix(1 0 0 -1 9 21)" fill="black"/>
<rect width="2" height="2" transform="matrix(-1 0 0 1 28 3)" fill="black"/>
<rect x="8" y="3" width="2" height="2" fill="black"/>
<rect x="28" y="20" width="2" height="2" transform="rotate(180 28 20)" fill="black"/>
<rect width="2" height="2" transform="matrix(1 0 0 -1 8 20)" fill="black"/>
<rect width="2" height="2" transform="matrix(-1 0 0 1 29 4)" fill="black"/>
<rect x="7" y="4" width="2" height="2" fill="black"/>
<rect x="29" y="19" width="2" height="2" transform="rotate(180 29 19)" fill="black"/>
<rect width="2" height="2" transform="matrix(1 0 0 -1 7 19)" fill="black"/>
<rect width="2" height="2" transform="matrix(-1 0 0 1 30 5)" fill="black"/>
<rect x="6" y="5" width="2" height="2" fill="black"/>
<rect x="30" y="18" width="2" height="2" transform="rotate(180 30 18)" fill="black"/>
<rect width="2" height="2" transform="matrix(1 0 0 -1 6 18)" fill="black"/>
<rect width="2" height="2" transform="matrix(-1 0 0 1 31 6)" fill="black"/>
<rect x="5" y="6" width="2" height="2" fill="black"/>
<rect x="31" y="17" width="2" height="2" transform="rotate(180 31 17)" fill="black"/>
<rect width="2" height="2" transform="matrix(1 0 0 -1 5 17)" fill="black"/>
<rect width="2" height="2" transform="matrix(-1 0 0 1 32 7)" fill="black"/>
<rect x="4" y="7" width="2" height="2" fill="black"/>
<rect x="32" y="16" width="2" height="2" transform="rotate(180 32 16)" fill="black"/>
<rect width="2" height="2" transform="matrix(1 0 0 -1 4 16)" fill="black"/>
<rect width="2" height="2" transform="matrix(-1 0 0 1 33 8)" fill="black"/>
<rect x="3" y="8" width="2" height="2" fill="black"/>
<rect x="33" y="15" width="2" height="2" transform="rotate(180 33 15)" fill="black"/>
<rect width="2" height="2" transform="matrix(1 0 0 -1 3 15)" fill="black"/>
<rect width="2" height="2" transform="matrix(-1 0 0 1 34 9)" fill="black"/>
<rect x="2" y="9" width="2" height="2" fill="black"/>
<rect x="34" y="14" width="2" height="2" transform="rotate(180 34 14)" fill="black"/>
<rect width="2" height="2" transform="matrix(1 0 0 -1 2 14)" fill="black"/>
<rect width="2" height="2" transform="matrix(-1 0 0 1 35 10)" fill="black"/>
<rect x="1" y="10" width="2" height="2" fill="black"/>
<rect x="35" y="13" width="2" height="2" transform="rotate(180 35 13)" fill="black"/>
<rect width="2" height="2" transform="matrix(1 0 0 -1 1 13)" fill="black"/>
<rect width="2" height="2" transform="matrix(-1 0 0 1 25 0)" fill="black"/>
<rect x="11" width="2" height="2" fill="black"/>
<rect x="25" y="23" width="2" height="2" transform="rotate(180 25 23)" fill="black"/>
<rect width="2" height="2" transform="matrix(1 0 0 -1 11 23)" fill="black"/>
<rect width="2" height="2" transform="matrix(-1 0 0 1 35 10)" fill="black"/>
<rect x="1" y="10" width="2" height="2" fill="black"/>
<rect width="1" height="1" transform="matrix(-1 0 0 1 36 11)" fill="black"/>
<rect y="11" width="1" height="1" fill="black"/>
<path d="M16.6401 21.9583L14.9844 23L14 21.1667L15.6557 20.125L16.6401 21.9583Z" fill="black"/>
<path d="M16.9758 20.5208L15.3201 21.5625L14.3357 19.7292L15.9914 18.6875L16.9758 20.5208Z" fill="black"/>
<path d="M17.3114 19.0833L15.6557 20.125L14.6713 18.2917L16.3271 17.25L17.3114 19.0833Z" fill="black"/>
<path d="M17.6471 17.6458L15.9914 18.6875L15.007 16.8542L16.6627 15.8125L17.6471 17.6458Z" fill="black"/>
<path d="M17.9828 16.2083L16.3271 17.25L15.3427 15.4167L16.9984 14.375L17.9828 16.2083Z" fill="black"/>
<path d="M18.3185 14.7708L16.6627 15.8125L15.6784 13.9792L17.3341 12.9375L18.3185 14.7708Z" fill="black"/>
<path d="M18.6541 13.3333L16.9984 14.375L16.014 12.5417L17.6698 11.5L18.6541 13.3333Z" fill="black"/>
<path d="M18.9898 11.8958L17.3341 12.9375L16.3497 11.1042L18.0054 10.0625L18.9898 11.8958Z" fill="black"/>
<path d="M19.3255 10.4583L17.6698 11.5L16.6854 9.66671L18.3411 8.625L19.3255 10.4583Z" fill="black"/>
<path d="M19.6612 9.02079L18.0054 10.0625L17.0211 8.22922L18.6768 7.1875L19.6612 9.02079Z" fill="black"/>
<path d="M19.9968 7.58329L18.3411 8.62501L17.3567 6.79173L19.0124 5.75001L19.9968 7.58329Z" fill="black"/>
<path d="M20.3325 6.14578L18.6768 7.1875L17.6924 5.35421L19.3481 4.3125L20.3325 6.14578Z" fill="black"/>
<path d="M20.6682 4.70829L19.0124 5.75001L18.0281 3.91673L19.6838 2.87501L20.6682 4.70829Z" fill="black"/>
<path d="M21.0039 3.27078L19.3481 4.31249L18.3637 2.47921L20.0195 1.4375L21.0039 3.27078Z" fill="black"/>
<path d="M21.3395 1.83328L19.6838 2.875L18.6994 1.04171L20.3551 -9.66572e-07L21.3395 1.83328Z" fill="black"/>
</svg>

        </button>
    </>
    );
};

export default CodeToggle;
