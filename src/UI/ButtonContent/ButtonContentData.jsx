import "./ButtonContent.scss"

const ButtonContentData = {
  'Code': {
    name: "Experience",
    mainImg: "./images/AboutMePhotos/P1_0.webp",
    content: [
      {
        header: "In The Beginning...",
        paragraphs: [
          {text: "In December 2024, I set out to build a portfolio website that would help me stand out in the crowded entry-level CS job market.\n\nMy search led me to Andrew Woan, a Youtuber whose detailed 3D website tutorial made this site possible. Andrew if you're reading this thank you.", highlight: false},
        ]
      },
      {
        header: "Building A Home In Minecraft",
        paragraphs: [
          {text: "First step of the project was finding a suitable enviroment in a Minecraft world and building a home. After a day of designing the home to my liking, I continued on to the next step.", highlight: false},
        ]
      },
      {
        header: "Minecraft Blocks In Blender",
        paragraphs: [
          {text: "To bring the Minecraft build into Blender, I used the MCPrep add-on. It reads your saved world, lets you pick the exact area on a built-in map, and exports the selected area as a render-ready OBJ file.\n\nOnce imported, the area/scene behaved like any other mesh in Blender, ready for manipulation & lighting.", highlight: false},
        ]
      },
      {
        header: "Trimming Scene Geometry",
        paragraphs: [
          {text: "The imported scene contained a substantial amount of geometry users would never see, wasting material memory space & GPU power when baking materials. Because the camera path wasn't set yet, I had to plan ahead what geometry faces would not be visible in the final product while pruning.\n\nAfter trimming, the geometry face count of the scene went from 117,602 to 21,469—an 82% reduction. With roughly half removed in bulk and the rest carefully hand-culled.", highlight: false},
        ]
      },
      {
        header: "Animating Minecraft Mobs",
        paragraphs: [
          {text: "To bring the scene to life, I rigged 4 mob model with an armature, these are skeleton systems that let you bend and pose a mesh that can then have animated movements through keyframes (snapshot poses on a timeline) driven by simple drivers that keep motions in sync.\n\nThe Four Minecraft mobs that travel along three loops are a pig on the first path, the Ender Dragon on the second, and a villager paired with its zombie form on the third.", highlight: false},
        ]
      },
      {
        header: "Baking Material Textures",
        paragraphs: [
          {text: "This phase was the toughest. At first, Blender was unknowingly running on my integrated GPU (the modest graphics chip built into the CPU) instead of the stronger discrete GPU (a separate graphics card).\n\nThe integrated GPU caused overheating and crashes partway through may of the bake processes that pre-computes lighting and textures, so the first bake run dragged on for nearly two weeks.\n\nA few months later, armed with better bake settings and the discrete GPU enabled, I redid the pass in just two days.", highlight: false},
        ]
      },
      {
        header: "GLB Export & Compression",
        paragraphs: [
          {text: "After baking each mesh's materials into a texture atlas—one large image that packs many smaller textures to cut down draw calls—I exported the scene as a single GLB (a binary glTF file that bundles geometry, materials, and animations).\n\nI then ran the GLB through gltf-transform, which prunes unused data and converts every texture to KTX 2, a container the browser can transcode to whatever GPU format it supports.\n\nMost textures use ETC1S compression for minimal file size, but close-up surfaces like the house's walls and floors get UASTC to keep extra detail. Finally, gltfjsx turned the optimized GLB into a ready-to-use React Three Fiber component.", highlight: false},
        ]
      },
      {
        header: "Rendering The GLB Models",
        paragraphs: [
          {text: "To render the model in the browser, I load the GLB with a custom React hook that wraps useGLTF from Drei-a utility toolkit that streamlines common tasks in React Three Fiber. The hook also plugs in a KTX 2 loader so textures decode to whatever format the visitor's GPU prefers.\n\nOnce the model is in memory, a custom cloning function takes each texture and creates three variants-base, hover, and pulse. These are indexed into a lookup table by mesh ID. The function getMaterial() swaps these variants on the fly, providing smooth hover highlights and scroll-triggered pulses with no extra downloads or draw calls.", highlight: false},
        ]
      },
      {
        header: "Camera Path & Controls",
        paragraphs: [
          {text: "The camera's pathway is set by premade XYZ coordinates and the view angle is set by premade XYZ rotation values. This guides visitors' attention to important areas and takes them throughout the scene in an infinite loop.\n\nFor user controls, configuration was created to handle scrolling the mouse wheel, swiping on a trackpad or phone to move forward and backwards along that path. On desktop, the camera's position slightly follows the users cursor left, right, and down on the devices screen, adding to the immersion of the scene.", highlight: false},
        ]
      },
      {
        header: "Managing The UI State",
        paragraphs: [
          {text: "The site's pop-up UI modals run on Zustand, a state manager for React. The modal store(states) tracks whether a modal is open, its title, content, type, and the active enter/exit animation. Keeping everything in that single place ensures only one window can appear at a time and every fade-in or fade-out stays in sync.\n\nThis state management system is used for all clickable photos and UI buttons, creating additional modals is incredibly easy since the new information just needs to be stored in a object containing a title, header, and text content.", highlight: false},
        ]
      },
      {
        header: "Building Desktop & Compatible UI Layouts",
        paragraphs: [
          {text: "After creating the UI buttons and modals came creating variations of the user interface layout. I decided to have two versions Desktop and Phone, to figure out the users screen size, I access the width of the users window that displays the site. For any window width above 1,415 pixels I display the overlay settings for the Desktop version.\n\nThe Mini modal images gave me the most trouble for this step, I really enjoyed having them to the sides of the main model for desktop view, however this was not possible for phone users. I leveraged the extra vertical space phone users have and created a container for the mini images to fill the extra space beneath the main modal. Allowing me to keep both layout versions consistent with the content displayed.", highlight: false},
        ]
      },
      {
        header: "Loading Screen User Control Context",
        paragraphs: [
          {text: "After creating the UI buttons, modals", highlight: false},
        ]
      },
      {
        header: "Features Recommended By Users",
        paragraphs: [
          {text: "Subtle Zoom For UI Pictures\n", highlight: true},
          {text: "Fast Traveling\n", highlight: true},
        ]
      },
      {
        header: "Impediments & Lessons",
        paragraphs: [
          {text: "Paragraph.", highlight: false},
        ]
      },
    ]
  },
  'Cites': {
    name: "Citations",
    mainImg: "./images/AboutMePhotos/P1_0.webp",
    content: [
      {
        header: "Creators",
        paragraphs: [
          {text: "Andrew Woan", highlight: true, link: "https://www.youtube.com/@andrewwoan",
            img1:"./images/Citations/Creators/AndrewWoan.webp",
            imgText1: "Youtuber who created an in-depth tutorial on building a 3D Minecraft website.",
            glow: true},
          {text: "Crossiant Cat", highlight: true, link: "https://www.youtube.com/@croissantcat",
            img1:"./images/Citations/Creators/CroissantCat.webp",
            imgText1:"Youtuber who created the original Minecraft home design used for the website.",
            glow: true},
          {text: "Vincent Yanez", highlight: true, link: "https://sketchfab.com/vinceyanez",
            img1:"./images/Citations/Creators/VincentYanez.webp",
            imgText1: "Sketchfab Creator who designed the Minecraft mob assets used for the website.",
            glow: true},
          {text: "JDGraphics", highlight: true, link: "https://www.fontspace.com/jdgraphics",
            img1:"./images/Citations/Creators/JDGraphics.webp",
            imgText1: "Designer of the Minecraft font style that is used on this website.",
            glow: true},
        ],
      },
      {
        header: "Software & Websites",
        paragraphs: [
          {text: "Minecraft\nThe sandbox game used for this sites 3D assets.", highlight: true, link: "https://www.minecraft.net/en-us", 
            img1:"./images/Citations/MinecraftHome.webp", 
            imgText1:"Original home built in Minecraft", 
            glow: true},
          {text: "Blender\nSoftware used for 3D modeling, animating, texturing, and rendering a project's assets.", highlight: true, link: "https://www.blender.org", 
            img1:"./images/Citations/Blender1.webp", img2:"./images/Citations/Blender2.webp", 
            imgText1:"Solid Mode Viewport",  imgText2:"Material Preview Viewport", 
            glow: true},

          {text: "Poly Haven\nAn online public asset library that provides HDRIs, Textures, and 3D models.", highlight: true, link: "https://polyhaven.com/", 
            img1: "./images/Citations/PolyHaven.webp", imgText1:"The HDRI of the nightsky used for the websites skybox.", 
            glow: true},
          {text: "Audacity\nRecords, trims, and exports the site's sound effects and music.", highlight: true, link: "https://www.audacityteam.org/", 
            img1: "./images/Citations/Audacity.webp",  imgText1:"Editing \"C418 - Danny\" in Audacity", 
            glow: true},
          {text: "Figma\nWeb-based graphics & user interface design app.", highlight: true, link: "https://www.figma.com/", 
            img1: "./images/Citations/Figma.webp", imgText1:"User interface icons created for website.",
            glow: true},
          {text: "Zustand\nState management library for React that keeps the site's UI and map state in a single React store", highlight: true, link: "https://zustand.docs.pmnd.rs/getting-started/introduction", 
            img1: "./images/Citations/Zustand.webp", glow: true},
          {text: "Vercel\nCloud platform for building and deploying projects, builds each commit and hosts the site so it loads quickly everywhere.", highlight: true, link: "https://vercel.com/", 
            img1: "./images/Citations/Vercel.webp", glow: true},
        ],
      },
      {
        header: "Software & Plugin Citations",
        paragraphs: [
          {text: "SimpleBake ~ Blender Addon\nBakes material textures into single image maps for web use. Highly recommended for beginners and people wanting to save time.", highlight: true, link: "https://superhivemarket.com/products/simplebake---simple-pbr-and-other-baking-in-blender-2", 
            img1:"./images/Citations/SimpleBake1.webp", img2:"./images/Citations/SimpleBake2.webp", 
            imgText1:"Cycles Bake Settings", imgText2:"Texture Settings", 
            glow: true},
          {text: "MCPrep ~ Blender Addon\nOptimizes materials, allows swappable blocks as well as spawning new blocks, items, mobs.", highlight: true, link: "https://theduckcow.com/dev/blender/mcprep/", 
            img1:"./images/Citations/McPrep_1.webp", img2:"./images/Citations/McPrep_2.webp",
            imgText1:"Pre-material prep",  imgText2:"Post-material prep", 
             glow: true},
          {text: "Mineways ~ MCPrep Addon\nImports a saved Minecraft world into Blender with renderable material.", highlight: true, link: "https://www.realtimerendering.com/erich/minecraft/public/mineways/", 
            img1:"./images/Citations/Mineways1.webp", img2:"./images/Citations/Mineways2.webp",
            imgText1:"UI for location selection in MC world",  imgText2:"Imported location of MC world in Blender", 
             glow: true},    
          {text: "gltf-transform\nCLI tool that compresses and optimizes glTF models before they go into the repository (~90 % smaller).", highlight: true, link: "https://gltf-transform.dev/", glow: true},
          {text: "gltfjsx\n Converts a glTF file into a JSX component for React Three Fiber, keeping each mesh's geometry, materials, and transform (position, rotation, scale) intact.", highlight: true, link: "https://github.com/pmndrs/gltfjsx", glow: true},
          {text: "KTX Textures\nSaves the project's texture images as KTX2 files with BasisU compression so the GPU can read them directly, slashing file size and RAM use.", highlight: true, link: "https://www.khronos.org/ktx/", glow: true},
          {text: "Transfonter\nConverts TTF/OTF fonts into lighter WOFF/WOFF2 files and generates the @font-face block for SCSS files.", highlight: true, link: "https://transfonter.org/", glow: true},
          {text: "SCSS\nA Sass syntax that adds variables, nesting, and mixins to keep the stylesheet organized.", highlight: true, link: "https://sass-lang.com/documentation/syntax/", glow: true},
          {text: "ThreeJS Forums\nCommunity forums page, very useful for troubleshooting React Three Fiber issues.", highlight: true, link: "https://discourse.threejs.org/", glow: true},
          {text: "Squoosh\nOnline image optimizer for compressing and converting the images into WebP file types.", highlight: true, link: "https://squoosh.app/", glow: true},
          {text: "ChatGPT\nHelped troubleshoot launch day site crashes for mobile users (Size of site caused IOS users to be stuck in auto-reload loop.", highlight: true, link: "https://openai.com/", glow: true},
          {text: "Sora AI\nGenerated the loading screen background, used Figma to clean mistakes.", highlight: true, link: "https://openai.com/sora/", glow: true},
          {text: "GLTF Report\nOnline GLTF viewer that lists every mesh, material, and texture in the given glTF, useful for viewing assets before adding it to the repository.", highlight: true, link: "https://gltf.report/", glow: true},
          {text: "Vites React Template\nThe create-vite starter that set up React, Vite's dev server, and hot-reload for this website.", highlight: true, link: "https://vite.dev", glow: true},
        ]
      }
    ]
  },
  'PP1': {
    name: "Project 1",
    content: [
      {
        header:"Project Completion Dependencies",
        paragraphs:[
          {text:"Building Executable", highlight: true}
        ]
      }
    ]
  },
  'PP2': {
    name: "Project 2",
    content: [
      {
        header:"Project Completion Dependencies",
        paragraphs:[
          {text:"Implementing Middleware between JS and Java.", highlight: true},
          {text:"Implementing AI opponent for game sessions.", highlight: true},
        ]
      }
    ]
  },
  'PP3': {
    name: "Project 3",
    content: [
      {
        header:"Project Completion Dependencies",
        paragraphs:[
          {text:"Building Executable", highlight: true}
        ]
      }
    ]
  },

}
export default ButtonContentData; 