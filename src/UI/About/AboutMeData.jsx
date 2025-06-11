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
        header: "Introduction",
        paragraphs: [
          {text: "Thank you for taking the time to tour my website! This project has been in development for over 5 months with over +400 hours put into the creation. If you find any bugs while looking around, reach out to me through email: Jovani.reyes.contact@gmail.com and I'll list your name under the citations section!", highlight: false},
        ]
      },
      {
        header: "Interactables",
        paragraphs: [
          {text: "Throughout the home are photos of myself and others that are a part of my life as well as other projects I have made. Photos that are interactable have a glowing pulse when approached.", highlight: false},
        ]
      },
      {
        header: "Under The Hood",
        paragraphs: [
          {text: "The code for this website is built on Javascript XML (JSX) for writing the HTML code directly within Javascript and styled with SCSS for creating variables in stylesheets for reusable CSS code. The scene is entirely made of GLB files which contain the 3D objects and their textures which are manipulated in JSX.", highlight: false},
        ]
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
        paragraphs: [
          {text: "First", highlight: false},
        ]
      },
      { header: "Header Two",
        paragraphs: [
          {text: "First", highlight: false},
        ]
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
        paragraphs: [
          {text: "First", highlight: false},
        ]
      },
      { header: "Header Two",
        paragraphs: [
          {text: "First", highlight: false},
        ]
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
        paragraphs: [
          {text: "First", highlight: false},
        ]
      },
      { header: "Header Two",
        paragraphs: [
          {text: "First", highlight: false},
        ]
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
        paragraphs: [
          {text: "First", highlight: false},
        ]
      },
      { header: "Header Two",
        paragraphs: [
          {text: "First", highlight: false},
        ]
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
        paragraphs: [
          {text: "First", highlight: false},
        ]
      },
      { header: "Header Two",
        paragraphs: [
          {text: "First", highlight: false},
        ]
      }
    ]
  } 
}
export default aboutMeData; 