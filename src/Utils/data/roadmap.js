// Refactored roadmap with hierarchical headers (phase ➜ section)
// and concise wording. No information has been added or removed.

const roadmap = {
  name: 'Experience',
  mainImg: './images/AboutMePhotos/P1_0.webp',
  content: [
    {
      header: 'In The Beginning...',
      sections: [
        {
          header: 'The Objective',
          paragraphs: [
            {
              text: 'Looking for ideas on a portfolio project, I found a tutorial on building 3D website by Andrew Woan, a content creator who loves to teach others everything they know. His work was foreign to me since I knew almost nothing about Blender and didn\'t regularly write in Web Development languages besides a few smaller projects.\n\nInitially I think I just wanted a website that stood out, though during the process, I realized what I really wanted was something that took real effort and couldn\'t be built mechanically. Overall, a project that would reflect my work ethic and thoughtfulness.',
              img1:"./images/Roadmap/Videos/AndrewWoanVid.webp",
              imgText1: "Click above to see the original video!",
              img1HRef: "https://www.youtube.com/watch?v=lf9ZBsi24m4&t=0s",
              mobWidth: "100%", desWidth: "100%",
              highlight: false,
            },
          ],
          
        },
        {
          header: 'Building in Minecraft',
          paragraphs: [
            {
              text: 'I wanted to minimize my time playing minecraft to spend more time on the later stages of the project. Unfamiliar with 3D assets but aware of their dense sizes, a smaller sized home that optimized its limited space seemed like the safest choice.\n\nI found a home perfect for what I was looking for thanks to Polar Cat! The original creator of the home used for the website, their design provided me the peace of mind I was looking for in regards to rendering and baking the home.',
              img1:"./images/Roadmap/Videos/CrossiantCatVid.webp",
              img1HRef: "https://www.youtube.com/watch?v=gt0VkZy6_pY&t=0s",
              imgText1: "Click above to see the original video!",
              mobWidth: "100%", desWidth: "100%",
              highlight: false,
            },
          ],
          
        },
      ],
    },

    {
      header: 'Designing Assets In Blender',
      sections: [
        {
          header: 'Importing the Mincraft world',
          paragraphs: [
            {
              text: 'To bring the Minecraft build into Blender, I used an addon \'MCPrep\' coupled with another named \'Mineways\'. Mineways accesses your saved world data and lets you select any chunk of blocks from that world and exports the selected chunk as a renderable OBJ file. Once imported into Blender, the MC blocks behave like any other mesh in Blender.',
              highlight: false,
            },
          ],
        },
        {
            header: 'Trimming Scene Geometry',
            paragraphs: [
                {text: 'A substantial amount of geometry faces existed that would never be visible, which would waste memory space & GPU power when baking the blocks materials.',
                  img1:"./images/Roadmap/Blender/NoTrim.webp", img2:"./images/Roadmap/Blender/HalfTrim.webp",
                   imgText1:"117,602 Geometry Faces",  imgText2:"21,469 Geometry Faces",
                  highlight: false,},
                {text: 'Much further into the project, I noticed mobile devices struggled to load the outdoor nature assets. I decided to redo the outdoor assets around the home and enclosed the environment significantly. This completely fixed the mobile issues I faced and it allowed me to put more resources into the user interface like an increase in images.',
                  img1:"./images/Roadmap/Blender/FinalTrim.webp",
                  imgText1:"10,028 Geometry Faces",
                  highlight: false,},
            ],
        },
        {
            header: "Baking Lighting & Shading into Material Textures",
            paragraphs: [
                {text: "This phase was the longest and most frustrating, unknowingly I had Blender running on my integrated GPU instead of its discrete GPU. The integrated GPU caused my laptop to overheat and crash often during the heavier bake processes, so the first round of baking the scene dragged on for nearly two weeks.\n\nA few months after release, I decided I wasn't happy with the result of my baked textures, I knew that I could do better. Knowing how to leverage the dicrete GPU in Blender I rebaked the scene and the visual improvements were phenomenal, leaving me with no regrets on taking the time to do so.", 
                  img1:"./images/Roadmap/Blender/Baked1.webp", img2:"./images/Roadmap/Blender/Baked2.webp",
                  imgText1:"First House Walls Baked Texture",  imgText2:"Final House Walls Baked Texture",
                highlight: false},
            ]
        }
      ],
    },

    {
      header: 'Compression & Web Rendering',
      sections: [
        {
            header: "GLB Export & Compression",
            paragraphs: [
                {text: "Once the design work was complete in Blender, I exported groups of MC blocks as GLB files (a binary glTF file that bundles geometry, materials, and animations), afterwhich running the export through gltf-transform, a CLI tool that prunes unused data and converts every texture to KTX2, a container the browser can transcode to whatever GPU format it supports. The textures use all used ETC1S compression in their gltf-transform commands for minimal file size. Lastly, gltfjsx was used to turn the optimized GLB into a ready-to-use React Three Fiber component file.", highlight: false},
            ]
        },
        {
            header: "Rendering The GLB Models",
            paragraphs: [
                {text: "To render the model in the browser, the GLBs are loaded in with a custom React hook that wraps useGLTF from 'Drei', a utility toolkit that streamlines common tasks in React Three Fiber. The hook also plugs in a KTX2 loader so textures decode to whatever format the users GPU prefers.\n\nPertaining to the interactable photos, once their model is in memory, a custom cloning function takes each texture and creates three variants: Base, Hover, and Pulse. These are indexed into a lookup table by their mesh ID. A helper function swaps these variants on the quickly, providing smooth hover highlights and scroll-triggered pulses with no extra draw calls.", 
                highlight: false},
            ]
        },
      ],
    },

    {
      header: 'User Interface',
      sections: [
        {
            header: "Managing The UI State",
            paragraphs: [
            {text: "The state of the user interfaces operates through Zustand, a state manager for React. The states tracked are: is a modal open, title, content, type, and the active enter/exit animation. Keeping a single set of states for all modals ensures only one window can appear at a time and every fade-in or fade-out animation stays in sync.\n\nThis state management system is used for all clickable photos and UI buttons, creating additional modals is incredibly easy since new context just needs to be stored in a object containing a title, header, content, and type of modal.", highlight: false},
            ]
        },
        {
            header: "Building Desktop & Compatible UI Layouts",
            paragraphs: [
            {text: "After building the base layout, I started working on making the user interface responsive for both Desktop and Mobile. To get the correct layout I access the width of the users screen and for any window width above my mobile width breakpoint, I display the overlay settings for the Desktop version.\n\nDisplaying the mini modal images on the mobile layout gave me some trouble since I could no longer display the minis on the sides of the main modal. I leveraged the extra space beneath the main modal for the mobile layout and created a container for the minis.", highlight: false},
            ]
        },
        {
            header: "Loading Screen Tips",
            paragraphs: [
            {text: "To help new visitors navigate the site I created text tips and helper icons on the loading screen. The context behind the text is the functionality behind the UI buttons and how the controls work depending on visitors screen width (Swiping for Mobile & Scrolling for Desktop).\n\nPreloading the 3D assets takes around 30-50 seconds for first time visitors, to help pass the time I used Sora AI to generate a pixelated version of the home and after touching up the design I placed it as the loading screens background.\n\nA small visual bug I noticed was during the first 1-3 seconds of the scene being available to enter, users who quickly entered the scene would view the world with no assets visible. I created a small delay between the transition between the loading screen and the scene to prevent this from appearing.", highlight: false},
            ]
        },
      ],
    },

    {
      header: 'Reflection',
      sections: [
        {
            header: "BottomText",
            paragraphs: [
            ]
        },
       
      ],
    },
  ],
};

export default roadmap;
