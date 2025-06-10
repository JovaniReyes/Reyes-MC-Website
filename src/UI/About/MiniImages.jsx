import React from 'react'
import Button from '../Button/Button'
import aboutMeData from './AboutMeData'
import { useMiniModalsStore } from "../stores/miniModals";

const MiniImages = ({aboutID}) => {
    const about = aboutMeData[aboutID];
    if(Array.isArray(about.miniImgs) && about.miniImgs.length > 0){
        about.miniImgs.forEach((miniImgs, idx) => {
            const {openMiniModal} = useMiniModalsStore.getState();
            const content = (
                <div style={{ width: '100%', height: '100%'}}>
                    <img style={{ width: '100%', height: '100%', objectFit: 'contain' }} src={miniImgs} alt={`Extra about me #${idx + 2} URL: ${miniImgs}`}/>
                </div>
            );
            const modalID = `${aboutID}-mini-${idx}`;
            openMiniModal(modalID, content);
        });
    } 
}