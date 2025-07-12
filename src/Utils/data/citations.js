const citations = {
    name: "Citations",
    mainImg: "./images/AboutMePhotos/P1_0.webp",
    content: [
      {
        header: "Creators & Users",
        paragraphs: [
           {text: "Jovani Reyes (Me!)", highlight: true, link: "https://www.linkedin.com/in/jovani-reyes-91b532367",
            img1:"./images/Citations/Creators/Joey.webp",
            imgText1: "Email: Jovani.Reyes.Contact@gmail.com",
            glow: true, mobWidth: "50%", },
          {text: "Andrew Woan", highlight: true, link: "https://www.youtube.com/@andrewwoan",
            img1:"./images/Citations/Creators/AndrewWoan.webp",
            imgText1: "Creator of the guide that made this possible, Thank you Andrew for taking the time to create such a resourceful and inclusive video!",
            glow: true, mobWidth: "50%", },
          {text: "Polar Cat", highlight: true, link: "https://www.youtube.com/@polarcat22",
            img1:"./images/Citations/Creators/PolarCat.webp",
            imgText1:"Minecraft builder behind the home design. Thank you Polar Cat for your tutorial, it was efficiently detailed and at a size I wasn't concerned to render!",
            glow: true, mobWidth: "50%",},
          {text: "JDGraphics", highlight: true, link: "https://www.fontspace.com/jdgraphics",
            img1:"./images/Citations/Creators/JDGraphics.webp",
            imgText1: "Creator of the Minecraft font used on the site. Thank you JDGraphics, without your work the UI wouldn't be complete!",
            glow: true, mobWidth: "50%",},

           {text: "FOV nudge for nearby interactables\n\nThis idea was suggested as a way to point out the interactable photos in the home. This feature decreases the users Field of View when reaching certain points of the homes pathway as a way to get the users attention through a subtle zoom-in.",
            img1:"./images/Citations/Users/ZachH.webp", img2:"./images/Citations/Users/Paola.webp",
            imgText1: "Zachary H.", imgText2: "Paola B.", desWidth: "40%", mobWidth: "100%",
            highlight: true, glow: false, },
          {text: "Fast traveling across the site\n\nThis idea was suggested in regards to potential employers or repeat visitors who have already walked through the sites pathway and don't feel like contiously scrolling back and forth.",
            img1:"./images/Citations/Users/SamG.webp",
            imgText1: "Sammuel G.", desWidth: "20%", mobWidth: "50%",
            highlight: true, glow: false, },
        ],
      },
      {
        header: "Software & Websites",
        paragraphs: [
          {text: "Minecraft\nPotentially the most well known game in existence, the entirety of this sites art style including the 3D assets are a reflection this sandbox game.", highlight: true, link: "https://www.minecraft.net/en-us", 
            img1:"./images/Citations/MinecraftHome.webp",
            imgText1:"Original home built in Minecraft", 
            desWidth: "50%", mobWidth: "100%",
            glow: true, },
          {text: "Blender\nOpen-source software for 3D modeling, animating, texturing, and rendering.", highlight: true, link: "https://www.blender.org", 
            img1:"./images/Citations/Blender1.webp", img2:"./images/Citations/Blender2.webp", 
            imgText1:"Solid Mode Viewport",  imgText2:"Material Preview Viewport", 
            glow: true, },

          {text: "Poly Haven\nA public asset library with HDRIs, textures, and 3D models.", highlight: true, link: "https://polyhaven.com/", 
            img1: "./images/Citations/PolyHaven.webp", imgText1:"The HDRI of the nightsky used for the websites skybox.", 
            glow: true, },
          {text: "Audacity\nUsed to trim audio and convert MP3 files to OGG for better sound quality.", highlight: true, link: "https://www.audacityteam.org/", 
            img1: "./images/Citations/Audacity.webp",  imgText1:"Editing \"C418 - Danny\" in Audacity", 
            desWidth: "80%", mobWidth: "130%",
            glow: true, },

          {text: "Figma\nOnline application used to design the icons for this site.", highlight: true, link: "https://www.figma.com/", 
            img1: "./images/Citations/Figma.webp", imgText1:"The icons created with Figma",
             desWidth: "80%", mobWidth: "130%",
            glow: true, },
          {text: "Vercel\nCloud platform that updates and hosts the website.", highlight: true, link: "https://vercel.com/", 
             desWidth: "80%", mobWidth: "130%",
            img1: "./images/Citations/Vercel.webp", glow: true, },
          {text: "ThreeJS Forums\nCommunity forum for troubleshooting React-Three-Fiber issues.", highlight: true, link: "https://discourse.threejs.org/", glow: true, },
          {text: "Squoosh\nOnline tool for compressing and converting images to WebP.", highlight: true, link: "https://squoosh.app/", glow: true, },
          {text: "GLTF Report\nViewer that lists meshes, materials, and textures in a glTF file.", highlight: true, link: "https://gltf.report/", glow: true, },
        ],
      },
      {
        header: "Addons",
        paragraphs: [
          {text: "MCPrep ~ Blender Addon\nOptimizes materials, allows swappable blocks as well as spawning new blocks, items, mobs.", highlight: true, link: "https://theduckcow.com/dev/blender/mcprep/", 
            img1:"./images/Citations/McPrep_1.webp", img2:"./images/Citations/McPrep_2.webp",
            imgText1:"Pre-material prep",  imgText2:"Post-material prep", 
             glow: true, },
          {text: "Mineways ~ MCPrep Addon\nImports a saved Minecraft world into Blender with renderable material.", highlight: true, link: "https://www.realtimerendering.com/erich/minecraft/public/mineways/", 
            img1:"./images/Citations/Mineways1.webp", img2:"./images/Citations/Mineways2.webp",
            imgText1:"UI for location selection in MC world",  imgText2:"Imported location of MC world in Blender", 
             glow: true, }, 
          {text: "SimpleBake ~ Blender Addon\nBakes material textures into single image maps for web use. Highly recommended for beginners and people wanting to save time.", highlight: true, link: "https://superhivemarket.com/products/simplebake---simple-pbr-and-other-baking-in-blender-2", 
            glow: true, },   
          
        ]
      },
      {
        header: "Libraries & Tools",
        paragraphs: [
          {header:"Zustand",text: "State management library for React that keeps the site's UI and map state in a single React store", highlight: true, link: "https://zustand.docs.pmnd.rs/getting-started/introduction", glow: true, flipLayout: true },
          {header:"gltf-transform",text: "CLI tool that compresses and optimizes glTF models before they go into the repository (~90 % smaller).", highlight: true, link: "https://gltf-transform.dev/", glow: true, flipLayout: true},
          {header:"gltfjsx",text: "Converts a glTF file into a JSX component for React Three Fiber, keeping each mesh's geometry, materials, and transform (position, rotation, scale) intact.", highlight: true, link: "https://github.com/pmndrs/gltfjsx", glow: true, flipLayout: true},
          {header:"KTX Textures",text: "Saves the project's texture images as KTX2 files with BasisU compression so the GPU can read them directly, slashing file size and RAM use.", highlight: true, link: "https://www.khronos.org/ktx/", glow: true, flipLayout: true},
          {header:"Transfonter",text: "Converts TTF/OTF fonts into lighter WOFF/WOFF2 files and generates the @font-face block for SCSS files.", highlight: true, link: "https://transfonter.org/", glow: true, flipLayout: true},
          {header:"SCSS",text: "A Sass syntax that adds variables, nesting, and mixins to keep the stylesheet organized.", highlight: true, link: "https://sass-lang.com/documentation/syntax/", glow: true, flipLayout: true},
          {header:"Vites React Template",text: "The create-vite starter that set up React, Vite's dev server, and hot-reload for this website.", highlight: true, link: "https://vite.dev", glow: true, flipLayout: true },  
        ]
      },
        
      {
        header: "LLMs",
        paragraphs: [
          {header:"ChatGPT", text: "Helped troubleshoot launch day site crashes for mobile users (Size of site caused IOS users to be stuck in auto-reload loop.", highlight: true, link: "https://openai.com/", glow: true, flipLayout: true },
          {header:"Sora AI", text: "Generated the loading screen background, used Figma to clean mistakes.", highlight: true, link: "https://openai.com/sora/", glow: true, flipLayout: true},
        ]
      },
    ]
};
export default citations;