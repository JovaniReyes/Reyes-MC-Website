import "./ButtonContent.scss"

const ButtonContentData = {
  'Code': {
    name: "Experience",
    mainImg: "./images/AboutMePhotos/P1_0.webp",
    content: [
      {
        header: "In The Beginning...",
        paragraphs: [
          {text: "In December 2024, I set out to build a portfolio website that would help me stand out in the crowded entry-level CS job market.\n\nMy search led me to Andrew Woan, a Youtuber whose detailed 3D website tutorial made this site possible. Andrew, if you're reading this, thank you from the bottom of my heart.", highlight: false},
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
        header: "Credit Where Credit Is Due",
        paragraphs: [
          {text: "Paragraph.", highlight: false},
        ],
      },
      {
        header: "Software & Plugin Citations",
        paragraphs: [
          {text: "Minecraft", highlight: true},
          {text: "Blender.", highlight: true},
          {text: "MCPrep Blender addon.", highlight: true},
          {text: "SimpleBake Blender addon.", highlight: true},
          {text: "Poly Haven.", highlight: true},
          {text: "Audacity.", highlight: true},
          {text: "Figma.", highlight: true},
          {text: "Zustand.", highlight: true},
          {text: "Vercel.", highlight: true},
          {text: "SquareSpace.", highlight: true},
          {text: "gltf-transform & gltfjsx.", highlight: true},
          {text: "KTX Textures.", highlight: true},
          {text: "Transfonter.", highlight: true},
          {text: "SCSS.", highlight: true},
          {text: "Vincent Yanez Sketchfab Creator.", highlight: true},
          {text: "Beizer Curve CSS Visualizer.", highlight: true},
          {text: "Three.js Community", highlight: true},
          {text: "Favicon Generator.", highlight: true},
          {text: "Squoosh.", highlight: true},
          {text: "JDGraphics.", highlight: true},
          {text: "ChatGPT.", highlight: true},
          {text: "GLTF-report.com", highlight: true},
          {text: "Vites React Template.", highlight: true},
        ]
      }
    ]
  },

}
export default ButtonContentData; 