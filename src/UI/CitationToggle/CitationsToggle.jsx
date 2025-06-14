import React, {useState} from 'react'
import "./CitationsToggle.scss";
import { playSound } from '../../Utils/buttonSound';
import ButtonContent from '../ButtonContent/ButtonContent';
import {useModalStore} from '../../Exp/stores/modalStore';

const CitationToggle = () => {
    const {checkForOpenModal} = useModalStore();

  return (
    <>
      <button title={"CitationBtn"} onClick={() => {
        playSound();
        checkForOpenModal("Citations", <ButtonContent ContentID={"Cites"}/>, "Citation");
      }} className="cite-toggle-button">
        <svg xmlns="http://www.w3.org/2000/svg" width="58" height="36" viewBox="0 0 58 36" fill="none">
<path d="M56 4H58V6H56V4Z" fill="#3C3B3B"/>
<path d="M56 6H58V8H56V6Z" fill="#3C3B3B"/>
<path d="M56 8H58V10H56V8Z" fill="#3C3B3B"/>
<path d="M56 10H58V12H56V10Z" fill="#3C3B3B"/>
<path d="M56 12H58V14H56V12Z" fill="#3C3B3B"/>
<path d="M56 14H58V16H56V14Z" fill="#3C3B3B"/>
<path d="M56 16H58V18H56V16Z" fill="#3C3B3B"/>
<path d="M56 18H58V20H56V18Z" fill="#3C3B3B"/>
<path d="M56 20H58V22H56V20Z" fill="#3C3B3B"/>
<path d="M56 22H58V24H56V22Z" fill="#3C3B3B"/>
<path d="M56 24H58V26H56V24Z" fill="#3C3B3B"/>
<path d="M56 26H58V28H56V26Z" fill="#3C3B3B"/>
<path d="M56 28H58V30H56V28Z" fill="#3C3B3B"/>
<path d="M54 28H56V30H54V28Z" fill="#3C3B3B"/>
<path d="M52 28H54V30H52V28Z" fill="#3C3B3B"/>
<path d="M50 28H52V30H50V28Z" fill="#3C3B3B"/>
<path d="M48 28H50V30H48V28Z" fill="#3C3B3B"/>
<path d="M46 28H48V30H46V28Z" fill="#3C3B3B"/>
<path d="M44 28H46V30H44V28Z" fill="#3C3B3B"/>
<path d="M42 28H44V30H42V28Z" fill="#3C3B3B"/>
<path d="M40 28H42V30H40V28Z" fill="#3C3B3B"/>
<path d="M38 28H40V30H38V28Z" fill="#3C3B3B"/>
<path d="M36 28H38V30H36V28Z" fill="#3C3B3B"/>
<path d="M34 28H36V30H34V28Z" fill="#3C3B3B"/>
<path d="M27 32H28V34H27V32Z" fill="#4A4A4A"/>
<path d="M25 30H27V32H25V30Z" fill="#4A4A4A"/>
<path d="M22 28H25V30H22V28Z" fill="#4A4A4A"/>
<path d="M20 28H22V30H20V28Z" fill="#4A4A4A"/>
<path d="M18 28H20V30H18V28Z" fill="#4A4A4A"/>
<path d="M16 28H18V30H16V28Z" fill="#4A4A4A"/>
<path d="M14 28H16V30H14V28Z" fill="#4A4A4A"/>
<path d="M12 28H14V30H12V28Z" fill="#4A4A4A"/>
<path d="M10 28H12V30H10V28Z" fill="#4A4A4A"/>
<path d="M8 28H10V30H8V28Z" fill="#4A4A4A"/>
<path d="M6 28H8V30H6V28Z" fill="#4A4A4A"/>
<path d="M4 28H6V30H4V28Z" fill="#4A4A4A"/>
<path d="M2 28H4V30H2V28Z" fill="#4A4A4A"/>
<path d="M0 28H2V30H0V28Z" fill="#4A4A4A"/>
<path d="M0 26H2V28H0V26Z" fill="#4A4A4A"/>
<path d="M0 24H2V26H0V24Z" fill="#4A4A4A"/>
<path d="M0 22H2V24H0V22Z" fill="#4A4A4A"/>
<path d="M0 20H2V22H0V20Z" fill="#4A4A4A"/>
<path d="M0 18H2V20H0V18Z" fill="#4A4A4A"/>
<path d="M0 16H2V18H0V16Z" fill="#4A4A4A"/>
<path d="M0 14H2V16H0V14Z" fill="#4A4A4A"/>
<path d="M0 12H2V14H0V12Z" fill="#4A4A4A"/>
<path d="M0 10H2V12H0V10Z" fill="#4A4A4A"/>
<path d="M0 8H2V10H0V8Z" fill="#4A4A4A"/>
<path d="M0 6H2V8H0V6Z" fill="#4A4A4A"/>
<path d="M0 4H2V6H0V4Z" fill="#4A4A4A"/>
<path d="M2 2H4V4H2V2Z" fill="#7C7C7C"/>
<path d="M2 4H4V6H2V4Z" fill="#7C7C7C"/>
<path d="M2 6H4V8H2V6Z" fill="#7C7C7C"/>
<path d="M2 8H4V10H2V8Z" fill="#7C7C7C"/>
<path d="M2 10H4V12H2V10Z" fill="#7C7C7C"/>
<path d="M2 12H4V14H2V12Z" fill="#7C7C7C"/>
<path d="M2 14H4V16H2V14Z" fill="#7C7C7C"/>
<path d="M2 16H4V18H2V16Z" fill="#7C7C7C"/>
<path d="M2 18H4V20H2V18Z" fill="#7C7C7C"/>
<path d="M2 20H4V22H2V20Z" fill="#7C7C7C"/>
<path d="M2 22H4V24H2V22Z" fill="#7C7C7C"/>
<path d="M2 24H4V26H2V24Z" fill="#7C7C7C"/>
<path d="M2 26H4V28H2V26Z" fill="#7C7C7C"/>
<path d="M4 26H6V28H4V26Z" fill="#7C7C7C"/>
<path d="M6 26H8V28H6V26Z" fill="#7C7C7C"/>
<path d="M8 26H10V28H8V26Z" fill="#7C7C7C"/>
<path d="M10 26H12V28H10V26Z" fill="#7C7C7C"/>
<path d="M12 26H14V28H12V26Z" fill="#7C7C7C"/>
<path d="M14 26H16V28H14V26Z" fill="#7C7C7C"/>
<path d="M16 26H18V28H16V26Z" fill="#7C7C7C"/>
<path d="M18 26H20V28H18V26Z" fill="#7C7C7C"/>
<path d="M20 26H22V28H20V26Z" fill="#7C7C7C"/>
<path d="M22 26H24V28H22V26Z" fill="#7C7C7C"/>
<path d="M29 28H33V30H29V28Z" fill="#666666"/>
<path d="M24 26H27V28H24V26Z" fill="#7C7C7C"/>
<path d="M28 28H29V30H28V28Z" fill="#7C7C7C"/>
<path d="M27 30H29V32H27V30Z" fill="#7C7C7C"/>
<path d="M29 30H31V32H29V30Z" fill="#666666"/>
<path d="M31 26H32V28H31V26Z" fill="#666666"/>
<path d="M25 28H26V30H25V28Z" fill="#7C7C7C"/>
<path d="M26 28H28V30H26V28Z" fill="#7C7C7C"/>
<path d="M32 26H34V28H32V26Z" fill="#666666"/>
<path d="M34 26H36V28H34V26Z" fill="#666666"/>
<path d="M36 26H38V28H36V26Z" fill="#666666"/>
<path d="M38 26H40V28H38V26Z" fill="#666666"/>
<path d="M40 26H42V28H40V26Z" fill="#666666"/>
<path d="M42 26H44V28H42V26Z" fill="#666666"/>
<path d="M44 26H46V28H44V26Z" fill="#666666"/>
<path d="M46 26H48V28H46V26Z" fill="#666666"/>
<path d="M48 26H50V28H48V26Z" fill="#666666"/>
<path d="M50 26H52V28H50V26Z" fill="#666666"/>
<path d="M52 26H54V28H52V26Z" fill="#666666"/>
<path d="M54 26H56V28H54V26Z" fill="#666666"/>
<path d="M56 26H54V24H56V26Z" fill="#666666"/>
<path d="M54 22H56V24H54V22Z" fill="#666666"/>
<path d="M56 22H54V20H56V22Z" fill="#666666"/>
<path d="M54 18H56V20H54V18Z" fill="#666666"/>
<path d="M54 16H56V18H54V16Z" fill="#666666"/>
<path d="M54 14H56V16H54V14Z" fill="#666666"/>
<path d="M54 12H56V14H54V12Z" fill="#666666"/>
<path d="M54 10H56V12H54V10Z" fill="#666666"/>
<path d="M54 8H56V10H54V8Z" fill="#666666"/>
<path d="M54 6H56V8H54V6Z" fill="#666666"/>
<path d="M54 4H56V6H54V4Z" fill="#666666"/>
<path d="M54 2H56V4H54V2Z" fill="#666666"/>
<path d="M54 2H33V0H54V2Z" fill="#9D9A9A"/>
<path d="M54 6H52V4H54V6Z" fill="#B3B2B2"/>
<path d="M54 8H52V6H54V8Z" fill="#B3B2B2"/>
<path d="M54 10H52V8H54V10Z" fill="#B3B2B2"/>
<path d="M54 12H52V10H54V12Z" fill="#B3B2B2"/>
<path d="M54 14H52V12H54V14Z" fill="#B3B2B2"/>
<path d="M54 16H52V14H54V16Z" fill="#B3B2B2"/>
<path d="M54 18H52V16H54V18Z" fill="#B3B2B2"/>
<path d="M54 20H52V18H54V20Z" fill="#B3B2B2"/>
<path d="M54 22H52V20H54V22Z" fill="#B3B2B2"/>
<path d="M28 26H26V24H28V26Z" fill="#B3B2B2"/>
<path d="M28 28H27V26H28V28Z" fill="#B3B2B2"/>
<path d="M26 26H24V24H26V26Z" fill="#B3B2B2"/>
<path d="M29 28H28V26H29V28Z" fill="#B3B2B2"/>
<path d="M29 26H27V24H29V26Z" fill="#B3B2B2"/>
<path d="M29 22H27V20H29V22Z" fill="#B3B2B2"/>
<path d="M29 20H27V18H29V20Z" fill="#B3B2B2"/>
<path d="M29 18H27V16H29V18Z" fill="#B3B2B2"/>
<path d="M29 16H27V14H29V16Z" fill="#B3B2B2"/>
<path d="M29 10H27V8H29V10Z" fill="#B3B2B2"/>
<path d="M29 12H27V10H29V12Z" fill="#B3B2B2"/>
<path d="M27 22H24V4H27V22Z" fill="#B3B2B2"/>
<path d="M54 26H31V2H54V26Z" fill="#9D9A9A"/>
<path d="M29 14H27V12H29V14Z" fill="#B3B2B2"/>
<path d="M29 8H27V6H29V8Z" fill="#B3B2B2"/>
<path d="M26 24H24V22H26V24Z" fill="#B3B2B2"/>
<path d="M29 24H26V22H29V24Z" fill="#B3B2B2"/>
<path d="M8 24H6V2H8V24Z" fill="#B3B2B2"/>
<path d="M25 4H8V2H25V4Z" fill="#B3B2B2"/>
<path d="M24 8H8V6H24V8Z" fill="#B3B2B2"/>
<path d="M24 10H8V8H24V10Z" fill="#B3B2B2"/>
<path d="M24 14H8V12H24V14Z" fill="#B3B2B2"/>
<path d="M24 16H8V14H24V16Z" fill="#B3B2B2"/>
<path d="M24 20H8V18H24V20Z" fill="#B3B2B2"/>
<path d="M24 22H8V20H24V22Z" fill="#B3B2B2"/>
<path d="M24 26H22V24H24V26Z" fill="#B3B2B2"/>
<path d="M22 26H20V24H22V26Z" fill="#B3B2B2"/>
<path d="M20 26H18V24H20V26Z" fill="#B3B2B2"/>
<path d="M18 26H16V24H18V26Z" fill="#B3B2B2"/>
<path d="M16 26H14V24H16V26Z" fill="#B3B2B2"/>
<path d="M14 26H12V24H14V26Z" fill="#B3B2B2"/>
<path d="M12 26H10V24H12V26Z" fill="#B3B2B2"/>
<path d="M10 26H8V24H10V26Z" fill="#B3B2B2"/>
<path d="M8 26H6V24H8V26Z" fill="#B3B2B2"/>
<path d="M6 26H4V24H6V26Z" fill="#B3B2B2"/>
<path d="M6 24H4V22H6V24Z" fill="#B3B2B2"/>
<path d="M6 22H4V20H6V22Z" fill="#B3B2B2"/>
<path d="M6 20H4V18H6V20Z" fill="#B3B2B2"/>
<path d="M6 18H4V16H6V18Z" fill="#B3B2B2"/>
<path d="M6 16H4V14H6V16Z" fill="#B3B2B2"/>
<path d="M6 14H4V12H6V14Z" fill="#B3B2B2"/>
<path d="M6 12H4V10H6V12Z" fill="#B3B2B2"/>
<path d="M6 10H4V8H6V10Z" fill="#B3B2B2"/>
<path d="M6 8H4V6H6V8Z" fill="#B3B2B2"/>
<path d="M6 6H4V4H6V6Z" fill="#B3B2B2"/>
<path d="M6 4H4V2H6V4Z" fill="#B3B2B2"/>
<path d="M6 2H4V0H6V2Z" fill="#B3B2B2"/>
<path d="M8 2H6V0H8V2Z" fill="#B3B2B2"/>
<path d="M10 2H8V0H10V2Z" fill="#B3B2B2"/>
<path d="M12 2H10V0H12V2Z" fill="#B3B2B2"/>
<path d="M14 2H12V0H14V2Z" fill="#B3B2B2"/>
<path d="M16 2H14V0H16V2Z" fill="#B3B2B2"/>
<path d="M18 2H16V0H18V2Z" fill="#B3B2B2"/>
<path d="M20 2H18V0H20V2Z" fill="#B3B2B2"/>
<path d="M22 2H20V0H22V2Z" fill="#B3B2B2"/>
<path d="M25 2H22V0H25V2Z" fill="#B3B2B2"/>
<path d="M27 4H25V2H27V4Z" fill="#B3B2B2"/>
<path d="M29 6H27V4H29V6Z" fill="#B3B2B2"/>
<path d="M31 28H29V4H31V28Z" fill="#9D9A9A"/>
<path d="M58 32H56V30H58V32Z" fill="black"/>
<path d="M56 32H54V30H56V32Z" fill="black"/>
<path d="M54 32H52V30H54V32Z" fill="black"/>
<path d="M52 32H50V30H52V32Z" fill="black"/>
<path d="M50 32H48V30H50V32Z" fill="black"/>
<path d="M48 32H46V30H48V32Z" fill="black"/>
<path d="M46 32H44V30H46V32Z" fill="black"/>
<path d="M44 32H42V30H44V32Z" fill="black"/>
<path d="M42 32H40V30H42V32Z" fill="black"/>
<path d="M40 32H38V30H40V32Z" fill="black"/>
<path d="M38 32H36V30H38V32Z" fill="black"/>
<path d="M36 32H34V30H36V32Z" fill="black"/>
<path d="M32 36H30V34H32V36Z" fill="black"/>
<path d="M34 32H33V30H34V32Z" fill="black"/>
<path d="M27 34H24V32H27V34Z" fill="black"/>
<path d="M30 36H28V34H30V36Z" fill="black"/>
<path d="M26 36H25V34H26V36Z" fill="black"/>
<path d="M24 34H23V32H24V34Z" fill="black"/>
<path d="M33 36H32V34H33V36Z" fill="black"/>
<path d="M35 34H33V32H35V34Z" fill="black"/>
<path d="M33 34H31V32H33V34Z" fill="black"/>
<path d="M28 36H26V34H28V36Z" fill="black"/>
<path d="M25 32H22V30H25V32Z" fill="black"/>
<path d="M22 32H20V30H22V32Z" fill="black"/>
<path d="M20 32H18V30H20V32Z" fill="black"/>
<path d="M18 32H16V30H18V32Z" fill="black"/>
<path d="M16 32H14V30H16V32Z" fill="black"/>
<path d="M14 32H12V30H14V32Z" fill="black"/>
<path d="M12 32H10V30H12V32Z" fill="black"/>
<path d="M10 32H8V30H10V32Z" fill="black"/>
<path d="M8 32H6V30H8V32Z" fill="black"/>
<path d="M6 32H4V30H6V32Z" fill="black"/>
<path d="M4 32H2V30H4V32Z" fill="black"/>
<path d="M2 32H0V30H2V32Z" fill="black"/>
<path d="M10 6H8V4H10V6Z" fill="black"/>
<path d="M10 12H8V10H10V12Z" fill="black"/>
<path d="M10 18H8V16H10V18Z" fill="black"/>
<path d="M10 24H8V22H10V24Z" fill="black"/>
<path d="M36 24H34V22H36V24Z" fill="black"/>
<path d="M36 18H34V16H36V18Z" fill="black"/>
<path d="M36 12H34V10H36V12Z" fill="black"/>
<path d="M36 6H34V4H36V6Z" fill="black"/>
<path d="M12 6H10V4H12V6Z" fill="black"/>
<path d="M12 12H10V10H12V12Z" fill="black"/>
<path d="M12 18H10V16H12V18Z" fill="black"/>
<path d="M12 24H10V22H12V24Z" fill="black"/>
<path d="M38 24H36V22H38V24Z" fill="black"/>
<path d="M38 18H36V16H38V18Z" fill="black"/>
<path d="M38 12H36V10H38V12Z" fill="black"/>
<path d="M38 6H36V4H38V6Z" fill="black"/>
<path d="M14 6H12V4H14V6Z" fill="black"/>
<path d="M14 12H12V10H14V12Z" fill="black"/>
<path d="M14 18H12V16H14V18Z" fill="black"/>
<path d="M14 24H12V22H14V24Z" fill="black"/>
<path d="M40 24H38V22H40V24Z" fill="black"/>
<path d="M40 18H38V16H40V18Z" fill="black"/>
<path d="M40 12H38V10H40V12Z" fill="black"/>
<path d="M40 6H38V4H40V6Z" fill="black"/>
<path d="M16 6H14V4H16V6Z" fill="black"/>
<path d="M16 12H14V10H16V12Z" fill="black"/>
<path d="M16 18H14V16H16V18Z" fill="black"/>
<path d="M16 24H14V22H16V24Z" fill="black"/>
<path d="M42 24H40V22H42V24Z" fill="black"/>
<path d="M42 18H40V16H42V18Z" fill="black"/>
<path d="M42 12H40V10H42V12Z" fill="black"/>
<path d="M42 6H40V4H42V6Z" fill="black"/>
<path d="M18 6H16V4H18V6Z" fill="black"/>
<path d="M18 12H16V10H18V12Z" fill="black"/>
<path d="M18 18H16V16H18V18Z" fill="black"/>
<path d="M18 24H16V22H18V24Z" fill="black"/>
<path d="M44 24H42V22H44V24Z" fill="black"/>
<path d="M44 18H42V16H44V18Z" fill="black"/>
<path d="M44 12H42V10H44V12Z" fill="black"/>
<path d="M44 6H42V4H44V6Z" fill="black"/>
<path d="M20 6H18V4H20V6Z" fill="black"/>
<path d="M20 12H18V10H20V12Z" fill="black"/>
<path d="M20 18H18V16H20V18Z" fill="black"/>
<path d="M20 24H18V22H20V24Z" fill="black"/>
<path d="M46 24H44V22H46V24Z" fill="black"/>
<path d="M46 18H44V16H46V18Z" fill="black"/>
<path d="M46 12H44V10H46V12Z" fill="black"/>
<path d="M46 6H44V4H46V6Z" fill="black"/>
<path d="M22 6H20V4H22V6Z" fill="black"/>
<path d="M22 12H20V10H22V12Z" fill="black"/>
<path d="M22 18H20V16H22V18Z" fill="black"/>
<path d="M22 24H20V22H22V24Z" fill="black"/>
<path d="M48 24H46V22H48V24Z" fill="black"/>
<path d="M48 18H46V16H48V18Z" fill="black"/>
<path d="M48 12H46V10H48V12Z" fill="black"/>
<path d="M48 6H46V4H48V6Z" fill="black"/>
<path d="M24 6H22V4H24V6Z" fill="black"/>
<path d="M24 12H22V10H24V12Z" fill="black"/>
<path d="M24 18H22V16H24V18Z" fill="black"/>
<path d="M24 24H22V22H24V24Z" fill="black"/>
<path d="M50 24H48V22H50V24Z" fill="black"/>
<path d="M50 18H48V16H50V18Z" fill="black"/>
<path d="M50 12H48V10H50V12Z" fill="black"/>
<path d="M50 6H48V4H50V6Z" fill="black"/>
<path d="M33 28H34V30H33V28Z" fill="#3C3B3B"/>
<path d="M31 30H33V32H31V30Z" fill="#3C3B3B"/>
<path d="M28 32H29V34H28V32Z" fill="#4A4A4A"/>
<path d="M29 32H31V34H29V32Z" fill="#3C3B3B"/>
</svg>

        </button>
    </>
    );
};

export default CitationToggle;
