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
          {text: "Welcome, and thanks for stopping by! Over the last five months I've invested more than 400 hours into crafting this portfolio, and I'm thankful for you taking the time to explore it. If you run into any bugs or have any suggestions, please let me know at Jovani.Reyes.Contact@gmail.com—I'll happily add your name to the credits.", highlight: false},
        ]
      },
      {
        header: "Interactables",
        paragraphs: [
          {text: "Throughout the homepage you'll see photos of me, the people who are close to me, and snapshots of other projects I've built. Images that can be clicked emit a pulsing glow when nearby, so feel free to poke around and discover the hidden details.", highlight: false},
        ]
      },
      {
        header: "Under The Hood",
        paragraphs: [
          {text: "The site is built with JSX (JavaScript XML), for embeddingHTML directly in JavaScript, and styled with SCSS for reusable, variable-driven CSS. Every object you see in the 3-D scene comes from a GLB file containing its geometry and textures, all manipulated through ThreeJS.\n\n\nEnjoy your visit!\n\n-Jovani Reyes", highlight: false},
        ]
      }
    ]
  },

  'P2.0': {
    name: "My Character",
    mainImg: "./images/AboutMePhotos/P2_0.webp",
    miniImgs: [
      "./images/AboutMePhotos/P2_1.webp",
      "./images/AboutMePhotos/P2_2.webp"
    ],
    content: [
      { header: "Core Values",
        paragraphs: [
          {text: "First", highlight: false},
        ]
      },
      { header: "Work Ethic",
        paragraphs: [
          {text: "First", highlight: false},
        ]
      },
      { header: "Interpersonal Style",
        paragraphs: [
          {text: "First", highlight: false},
        ]
      },
      { header: "Creative Identity",
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
      { header: "Growing Up",
        paragraphs: [
          {text: "First", highlight: false},
        ]
      },
      { header: "Early Influences",
        paragraphs: [
          {text: "First", highlight: false},
        ]
      },
      { header: "Academic Path",
        paragraphs: [
          {text: "First", highlight: false},
        ]
      },
      { header: "Breakthrough",
        paragraphs: [
          {text: "First", highlight: false},
        ]
      },
      { header: "Aspirations",
        paragraphs: [
          {text: "First", highlight: false},
        ]
      },
      { header: "Development",
        paragraphs: [
          {text: "First", highlight: false},
        ]
      },
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
      { header: "Creative Outlets",
        paragraphs: [
          {text: "First", highlight: false},
        ]
      },
      { header: "Retired Gamer",
        paragraphs: [
          {text: "First", highlight: false},
        ]
      },
      { header: "Fitness",
        paragraphs: [
          {text: "First", highlight: false},
        ]
      },
      { header: "What I learn for fun",
        paragraphs: [
          {text: "First", highlight: false},
        ]
      },
      { header: "Unusual Interest",
        paragraphs: [
          {text: "First", highlight: false},
        ]
      },
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
      { header: "Furry Friends In My Life",
        paragraphs: [
          {text: "First", highlight: false},
        ]
      },
      { header: "What I've Learned From Them",
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