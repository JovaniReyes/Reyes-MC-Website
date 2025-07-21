const research =  {
    name: "Project 1",
    content: [
      {
        header:"Creators",
        paragraphs:[
          {text:"Me!\nCrafted the 3D assets in Blender, and implemented the code for the experiment in Unreal Engine.", highlight: true},
          {text:"Mack Ianni\nComputed the final results from the data gathered from the experiment.", highlight: true},
          {text:"Ben Harper\nGathered participants for running the experiment and assisted in creating project videos.", highlight: true},
        ]
      },
      {
        header:"Research Paper",
          paragraphs:[
              {text:"PDF Viewer\n", highlight: true, glow: true, hasPDF: true},
          ]
      },
      {
        header:"Environment Design",
          paragraphs:[
              {text:"Creating the Scene\nTo guarantee smooth performance during user trials, I built an entire office environment from the ground up rather than relying on premade assets. This ensured a modest polygon budget and prevented any frame-rate drops while participants typed.", img1: "/images/Projects/Research/UserRoom1.webp", img2: "/images/Projects/Research/UserRoom2.webp",
              imgText1:"Solid View of Environment", imgText2:"Wireframe View of Environment", highlight: true, glow: true,},
              {text:"\nAfter importing the assets into Unreal Engine, I focused on optimizing RAM usage. The main bottleneck was lighting, so I positioned three to four carefully aimed spotlights and enabled real-time shader rendering only for those sources. This approach retained the immersive ambience I envisioned while keeping GPU and system-memory usage low.", img1: "/images/Projects/Research/UserRoom3.webp", img2: "/images/Projects/Research/UserRoom4.webp", 
                imgText1:"Environment in Unreal Engine (1)", imgText2:"Environment in Unreal Engine (2)",highlight: true, glow: true,},
              {text:"Keyboard Variations\nBecause my laptop (baseline keyboard) would not always be available, I created two additional keyboards that mirrored other machines the study could be run on. Replicating key size, spacing and visual cues across these three models ensured consistent typing surface and eliminated device availability issues during scheduling.", img1: "/images/Projects/Research/Computer1.webp", img2: "/images/Projects/Research/Computer2.webp",
              imgText1:"My XPS 15", imgText2:"Team Member Computer",highlight: true, glow: true,},
              {text:"", img1: "/images/Projects/Research/Computer3.webp", imgText1:"Lab Monitor & Keyboard", },
              {text:"Creating a Robotic Claw\nTo keep the study engaging, I modelled a robotic claw that participants prompted during the assembly-line text task. Based on the accuracy a user achieved for the given task would determine if the robot claw would successfully place a box on the nearby conveyor belt, or malfunction due to confusion. This side objective added a playful goal to the research experiment while preserving CPU and GPU runtime performance.", img1: "/images/Projects/Research/ClawBot1.webp", img2: "/images/Projects/Research/ClawBot2.webp",
                imgText1:"Material View in Blender", imgText2:"Wireframe View in Blender",
              highlight: true, glow: true,},
              {text:"", img1: "/images/Projects/Research/Wireframe1.webp", img2: "/images/Projects/Research/Wireframe2.webp",
                imgText1:"Wireframe View (1)", imgText2:"Wireframe View (2)",
              },
              {text:"Rigging The Robotic Claw\nThe robotic claw's six-axis motion relies on an inverse-kinematics (IK) rig with a single control bone for easy rotation and positioning. I organized the animation in Blender using Non-Linear Animation (NLA) strips, then imported those clips into Unreal Engine. Inside UE, a concise state-machine blueprint blended the power-off, idle, task-complete, task-failed, animation states at runtime, giving participants visual feedback on their task performance.", img1: "/images/Projects/Research/Rig.webp",  imgText1:"Bone Names & Axes",
              highlight: true, glow: true,},

          ]
      },
      {
        header:"Building Blueprints",
          paragraphs:[
              {text:"Get Class References & Computer Type\nWhen the level loads, the Begin Play graph first locates the GlobalVariables singleton that stores all experiment‑wide settings, then waits until that class is fully initialised before spawning the exact keyboard mesh, skeleton, and UI layout that match the participant’s assigned device—whether an XPS 15 laptop, a teammate’s notebook, or the lab desktop. Only after these assets are in place does the blueprint enable input, which prevents null references and guarantees every participant sees the correct hardware model before typing begins.", img1: "/images/Projects/Research/ResearchBP1.webp", imgText1: "UE5 Blueprint (1)",
              highlight: true, glow: true, mobWidth: "125%", desWidth: "100%"},
              {text:"Keystroke Press & Release Handler\nThe keystroke handler listens for low‑level key‑state changes, differentiating physical key presses from any overlapping virtual‑key clicks so that duplicate characters never slip through. When a key is pressed, the graph verifies that the input can be manipulated, plays an audible click, and forwards the character to the sanitation routine; when the key is released, it resets the key’s Z‑offset animation, clears shift‑hold flags, and starts a brief timer that blocks key‑spam while the keyboard is disabled between tasks.", img1: "/images/Projects/Research/ResearchBP2.webp", imgText1: "UE5 Blueprint (2)",
              highlight: true, glow: true, mobWidth: "125%", desWidth: "100%"},
              {text:"Set Action-Key Flags or Modify Character Key\nBefore any character is accepted as user input, the sanitation blueprint converts multi‑character key names such as “SpaceBar” or “Enter” to their printable or control equivalents, applies Caps‑Lock‑and‑Shift rules along with numeric‑to‑symbol conversions, and flags special keys like delete or backspace so downstream graphs can treat them differently. Only cleaned, valid characters move forward in the pipeline, ensuring the on‑screen prompt receives data that match the task’s requirements.", img1: "/images/Projects/Research/ResearchBP3.webp", imgText1: "UE5 Blueprint (3)",
              highlight: true, glow: true, mobWidth: "125%", desWidth: "100%"},
              {text:"Manage Computer Screen Text\nOnce a key has been sanitised, the character‑index blueprint appends it to the running string, increments the global index, and immediately colours the matching character in both the monitor UI and the VR desktop screen. If the participant deletes a character, the graph safely decrements the index, clears the colour of the removed slot, truncates the stored string, and guards against out‑of‑bounds errors—all while incrementing a click‑to‑type counter used later for timing metrics.", img1: "/images/Projects/Research/ResearchBP4.webp", imgText1: "UE5 Blueprint (4)",
              highlight: true, glow: true, mobWidth: "125%", desWidth: "100%"},
              {text:"Key Animation & Task UI\nTo maintain immersion, a dedicated feedback blueprint plays a quick Z‑axis press or release animation on every virtual key that is hit, updates task‑progress diamonds with real‑time accuracy colouring, and streams a live words‑per‑minute read‑out. During task transitions, a timeline empties or fills the diamond widgets and fades the interface, so participants always receive clear, uncluttered feedback about their performance.", img1: "/images/Projects/Research/ResearchBP5.webp", imgText1: "UE5 Blueprint (5)",
              highlight: true, glow: true, mobWidth: "125%", desWidth: "100%"},
              {text:"Compute WPM, Accuracy, Next-Task Logic\nAs soon as a prompt is completed, the performance manager calculates net words per minute, character‑level accuracy, total typing time, and error count, then stores these metrics in both the UI and a runtime array destined for CSV export. It applies a pass‑or‑fail rule—typically ninety‑percent accuracy—and either advances to the next prompt or ends the session. Finally, the graph resets global variables, clears the UI text buffer, and disables the keyboard to prevent stray inputs while the scene transitions to the following task or completion screen.", img1: "/images/Projects/Research/ResearchBP6.webp", imgText1: "UE5 Blueprint (6)",
              highlight: true, glow: true, mobWidth: "125%", desWidth: "100%"},
          ]
      },
    ]
};
export default research;