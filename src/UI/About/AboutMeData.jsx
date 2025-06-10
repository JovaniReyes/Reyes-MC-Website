import React from 'react'
import "./About.scss"
import Button from '../Button/Button'

const aboutMeData = {
  'P1.0': {
    name: "Welcome to my website!",
    mainImg: "./images/AboutMePhotos/P1_0.webp",
    miniImgs: [
      "./images/AboutMePhotos/P1_1.webp",
      "./images/AboutMePhotos/P1_2.webp",
      "./images/AboutMePhotos/P1_3.webp",
      "./images/AboutMePhotos/P1_4.webp",
      "./images/AboutMePhotos/P1_5.webp"
    ],
    content: [
      {
        header: "Header One",
        paragraph: "This is the first paragraph."
      }
    ]
  },

  'P2.0': {
    name: "My Values & Character",
    mainImg: "./images/AboutMePhotos/P2_0.webp",
    miniImgs: [
      "./images/AboutMePhotos/P2_1.webp",
      "./images/AboutMePhotos/P2_2.webp"
    ],
    content: [
      { header: "Header One",
        paragraph: "This is the first paragraph."
      },
      { header: "Header Two",
        paragraph: "This is the second paragraph."
      }
    ]
  },

  'P3.0': {
    name: "My Story",
    mainImg: "./images/AboutMePhotos/P3_0.webp",
    miniImgs: [
      "./images/AboutMePhotos/P3_1.webp",
      "./images/AboutMePhotos/P3_2.webp",
      "./images/AboutMePhotos/P3_3.webp",
      "./images/AboutMePhotos/P3_4.webp",
      "./images/AboutMePhotos/P3_5.webp"
    ],
    content: [
      { header: "Header One",
        paragraph: "This is the first paragraph."
      },
      { header: "Header Two",
        paragraph: "This is the second paragraph."
      }
    ]
  },

  'P4.0': {
    name: "My Hobbies",
    mainImg: "./images/AboutMePhotos/P4_0.webp",
    miniImgs: [
      "./images/AboutMePhotos/P4_1.webp",
      "./images/AboutMePhotos/P4_2.webp"
    ],
    content: [
      { header: "Header One",
        paragraph: "This is the first paragraph."
      },
      { header: "Header Two",
        paragraph: "This is the second paragraph."
      }
    ]
  },

  'P5.0': {
    name: "Big on Pets",
    mainImg: "./images/AboutMePhotos/P5_0.webp",
    miniImgs: [
      "./images/AboutMePhotos/P5_1.webp",
      "./images/AboutMePhotos/P5_2.webp",
      "./images/AboutMePhotos/P5_3.webp",
      "./images/AboutMePhotos/P5_4.webp",
      "./images/AboutMePhotos/P5_5.webp",
      "./images/AboutMePhotos/P5_6.webp",
      "./images/AboutMePhotos/P5_7.webp",
      "./images/AboutMePhotos/P5_8.webp",
      "./images/AboutMePhotos/P5_9.webp",
      "./images/AboutMePhotos/P5_10.webp"
    ],
    content: [
      { header: "Header One",
        paragraph: "This is the first paragraph."
      }
    ]
  },

  'P6.0': {
    name: "My Skillset",
    mainImg: "./images/AboutMePhotos/P6_0.webp",
    miniImgs: [
      "./images/AboutMePhotos/P6_1.webp",
      "./images/AboutMePhotos/P6_2.webp",
    ],
    content: [
      { header: "Header One",
        paragraph: "This is the first paragraph."
      },
      { header: "Header Two",
        paragraph: "This is the second paragraph."
      }
    ]
  } 
}
export default aboutMeData; 