// Tabs.jsx
import { useState, useEffect, useRef } from "react";
import { playSound } from "../../Utils/buttonSound";
import { track } from '@vercel/analytics';
import "./Tabs.scss";



export default function Tabs({ sections, children }) {
    const [active, setActive] = useState(0);
    const navRef = useRef();

    const handleClick = (i) => {
        track("Tab Clicked: " + sections[i]);
        playSound();
        setActive(i)
    }


    useEffect(() => {
    const el = navRef.current;
    const btn = el.querySelector(".tab-btn.active");
    if (btn) {
        const offset = btn.offsetLeft - (el.clientWidth - btn.offsetWidth) / 2;
        el.scrollTo({ left: Math.max(offset,0), behavior: "smooth" });
    }
    }, [active]);            // run every time the active tab changes

    useEffect(() => {
        if (active >= sections.length) setActive(0);
    }, [sections.length, active]);
        return (
        <>
            {/* ─── tab bar ─── */}
            <nav ref={navRef} className="tabs">
                {sections.map((txt, i) => (
                <button
                    key={i}
                    className={`tab-btn${i === active ? " active" : ""}`}
                    onClick={() => handleClick(i)}
                >
                    {txt}
                </button>
                ))}
            </nav>
            {/* ─── active panel ─── */}
            <div className="tab-panel">
                {/* let parent decide what goes here */}
                {children(active)}
            </div>
        </>
  );
}
