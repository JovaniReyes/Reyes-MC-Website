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
      { header: "Core Values & trait",
        paragraphs: [
          {text: "Intellectual Humility\nI treat my perspective as incomplete and challengeable. Staying open to new ideas and alternative viewpoints helps me refine my own ideas, learn quickly, and build stronger relationships in my life.", highlight: true},
          {text:"Clear Communication\nHonest transparent language, timely updates, and attentive listening keep relationships, projects, and teams moving smoothly. For me having quality communication has turned potential roadblocks into small bumps.", highlight: true},
          {text:"Resilience\nI view challenges as prime real estate for personal growth. Every struggle, failure, and setback has taught me to regulate stress, adapt to sudden changes, and quickly overcome obstacles. This has helped me challenge myself to create work I'd never imagine I'd be able to do, such as this website!", highlight: true},
        ]
      },
      { header: "Work Ethic",
        paragraphs: [
          {text: "I break down my work into small testable incremental steps with due dates to keep progression consistent. I often challenge myself to improve my work as well towards wrapping up a project if I feel it’s a realistic goal. For instance, I rebaked every texture used in this website right before launch, the decision to do so was well worth it.", highlight: false},
        ]
      },
      { header: "Interpersonal Style",
        paragraphs: [
          {text: " I like to listen to my teammates to better understand their perspective of our goal and constraints they may face during implementation. I do my best to give constructive feedback that focuses on the problem, never the person. My aim is to create an environment where everyone feels heard as well as comfortable to convey their weaknesses and offer assistance where their strengths lie.", highlight: false},
        ]
      },
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
          {text: "For the majority of my life I lived in Greenville TX, there wasn't much to do in my hometown and with rough crowds too close to hang out with friends I spent most of my time either gaming or hanging out with my brothers.", highlight: false},
        ]
      },
      { header: "Early Influences",
        paragraphs: [
          {text: "My father had a significant impact on my work ethic. I worked for his company doing underground operator work during a period in my life where I was figuring out what I wanted to do with my life. I started to notice how my father carried himself,  being incredibly stoic regardless of how bad a situation was on the job site. He'd always be the first to start figuring out a solution. No matter the size, importance of a task he approached every obligation with a consistent level of effort.", highlight: false},
        ]
      },
      { header: "What I'm Working Towards",
        paragraphs: [
          {text: "My goal in life is to experience and see as much as I possibly can and to make memories with my partner and friends that I'll carry close to me forever. I want to work for or build a company that fulfills my passion to create projects that contribute to society.", highlight: false},
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
          {text: "Besides using my fingers for coding, I enjoy crocheting, painting, and doing arts and crafts.  I haven't gotten the chance to, but I'd really like to try out pottery!", highlight: false},
        ]
      },
      { header: "Retired Gamer",
        paragraphs: [
          {text: "I played games daily up until graduating highschool, my favorite was Ark Survival Evolved. I enjoyed that game so much that I was waking up every 2-3 hours a night to feed adolescent dinosaur milk.", highlight: false},
        ]
      },
      { header: "Fitness",
        paragraphs: [
          {text: "I grew up playing a few sports, primarily American football. I decided my senior year of highschool to drop all sports to focus on building my fitness and health and got hooked on weightlifting. I also enjoy going on new hikes when traveling as well.", highlight: false},
        ]
      },
      { header: "What I learn for fun",
        paragraphs: [
          {text: "Soldering\nMy Arduino Nano v4 robot was something I wanted to do for fun during the summer. I had an operating systems class where we used a raspberry PI to power and operate a sonar pulse sensor to measure distance between the sensor and an object. I learned how to solder fairly well after the Arduino Bot project.", highlight: true},
          {text: "3D Object Designing\nI've gotten into learning 3D modeling in Blender, combining this with my coding experience I can create any 3D object and animation I want within a project. Currently I'm  working on understanding retopology and material designing to create industry standard assets.", highlight: true},
        ],
      },
    ]
  },

  'P5.0': {
    name: "Furry Friends",
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
      { header: "Why I Love Animals",
        paragraphs: [
          {text: "Whether it's my girlfriend's dog Creed, my grandma's cat Max, or my guinea pig Chris, I like to think animals invite me to slow down and pay attention. Spending time with pets reminds me happiness is based on perspective. I see it when I spend time with them, something like a walk in the park, nap on a lap, or a meal can be enough to brighten your day if you believe that it can.", highlight: false},
        ]
      },
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
      { header: "Languages & Tools",
        paragraphs: [
          {text: "The majority of my course work was done with Java and a bit of Python and C++. For other languages like visual coding with UE5 blueprints and web development I learned on my own and used resources such as documentation, forums, and tutorials.", highlight: false},
        ]
      }
    ]
  } 
}
export default aboutMeData; 