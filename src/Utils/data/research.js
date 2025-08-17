const research =  {
    name: "Project 1",
    content: [
      {
        header:"Creators",
        paragraphs:[
          {text:"Me!\nCreated the 3D assets in Blender and implemented the code for the experiment in Unreal Engine.", highlight: true},
          {text:"Mack Ianni\nComputed the statistical analysis from the data collected during the experiment using GoStats.", highlight: true},
          {text:"Ben Harper\nGathered participants for running the experiment and assisted in creating project videos.", highlight: true},
        ]
      },
      {
        header:"Research Paper",
          paragraphs:[
              {text:"PDF Viewer\n", highlight: true,  hasPDF: true},
          ]
      },
      {
        header:"Environment Design",
          paragraphs:[
              {text:"Creating the Scene\nTo guarantee smooth performance during user trials, I built an entire office environment from the ground up rather than relying on premade assets. This ensured a modest polygon budget and prevented any frame-rate drops while participants typed.", img1: "/images/Projects/Research/UserRoom1.webp", img2: "/images/Projects/Research/UserRoom2.webp",
              imgText1:"Solid View of Environment", imgText2:"Wireframe View of Environment", highlight: true, },
              {text:"\nAfter importing the assets into Unreal Engine, I focused on optimizing RAM usage. The main bottleneck was lighting, so I positioned three to four carefully aimed spotlights and enabled real-time shader rendering only for those sources. This approach retained the immersive ambience I envisioned while keeping GPU and system-memory usage low.", img1: "/images/Projects/Research/UserRoom3.webp", img2: "/images/Projects/Research/UserRoom4.webp", 
                imgText1:"Environment in Unreal Engine (1)", imgText2:"Environment in Unreal Engine (2)",highlight: true, },
              {text:"Keyboard Variations\nBecause my laptop (baseline keyboard) would not always be available, I created two additional keyboards that mirrored other machines the study could be run on. Replicating key size, spacing and visual cues across these three models ensured consistent typing surface and eliminated device availability issues during scheduling.", img1: "/images/Projects/Research/Computer1.webp", img2: "/images/Projects/Research/Computer2.webp",
              imgText1:"My XPS 15", imgText2:"Team Member Computer",highlight: true, },
              {text:"", img1: "/images/Projects/Research/Computer3.webp", imgText1:"Lab Monitor & Keyboard", },
              {text:"Creating a Robotic Claw\nTo keep the study engaging, I modelled a robotic claw that participants prompted during the assembly-line text task. Based on the accuracy a user achieved for the given task would determine if the robot claw would successfully place a box on the nearby conveyor belt, or malfunction due to confusion. This side objective added a playful goal to the research experiment while preserving CPU and GPU runtime performance.", img1: "/images/Projects/Research/ClawBot1.webp", img2: "/images/Projects/Research/ClawBot2.webp",
                imgText1:"Material View in Blender", imgText2:"Wireframe View in Blender",
              highlight: true, },
              {text:"", img1: "/images/Projects/Research/Wireframe1.webp", img2: "/images/Projects/Research/Wireframe2.webp",
                imgText1:"Wireframe View (1)", imgText2:"Wireframe View (2)",
              },
              {text:"Rigging The Robotic Claw\nThe robotic claw's six-axis motion relies on an inverse-kinematics (IK) rig with a single control bone for easy rotation and positioning. I organized the animation in Blender using Non-Linear Animation (NLA) strips, then imported those clips into Unreal Engine. Inside UE, a concise state-machine blueprint blended the power-off, idle, task-complete, task-failed, animation states at runtime, giving participants visual feedback on their task performance.", img1: "/images/Projects/Research/Rig.webp",  imgText1:"Bone Names & Axes",
              highlight: true, },

          ]
      },
      {
        header:"Building Blueprints",
          paragraphs:[
              {text:"Class References & Computer Type\nWhen the level loads, the keyboard blueprint (BP) locates the 'GlobalVariables' singleton BP which stores the system settings and shared variables, the keyboard BP waits until the GlobalVariables BP is initialized before spawning the keyboard mesh, skeleton, and UI layout that matches the participant's assigned computer type. Only after these assets are in place does the blueprint enable keystrokes; preventing null references and and guaranteeing the participant sees the correct hardware model before begining the experiment.", img1: "/images/Projects/Research/ResearchBP1.webp", imgText1: "UE5 Blueprint (1)",
              highlight: true,  mobWidth: "125%", desWidth: "100%"},
              {text:"Keystroke Press & Release Handler\nThe keystroke handler listens for key state changes (Pressed/Released), differentiating physical key presses from any overlapping virtual-key clicks so that duplicate characters never slip through. When a key is pressed, the graph verifies that the input is a valid key, sets the key's z-offset animation, plays an audible click, and forwards the name of the key to the sanitation operation; when the key is released, it resets the key's Z-offset animation, checks if a shift-hold flag should be cleared, and starts a brief timer that blocks key-spam while the keyboard is disabled between tasks.", img1: "/images/Projects/Research/ResearchBP2.webp", imgText1: "UE5 Blueprint (2)",
              highlight: true,  mobWidth: "125%", desWidth: "100%"},
              {text:"Sanatize Input\nBefore any character is displayed on-screen or validity checked, the sanitation operation converts multi-character key names such as 'SpaceBar' or 'Enter' to their printable or control equivalents; applies Caps-Lock/Shift flags along with numeric-to-symbol conversions; flags special keys like 'delete' or 'backspace' so the UI display & statistics graphs can treat them as needed. Only cleaned, valid characters move forward in the pipeline, ensuring the on-screen prompt receives data that match the task's requirements.", img1: "/images/Projects/Research/ResearchBP5.webp", imgText1: "UE5 Blueprint (3)",
              highlight: true,  mobWidth: "125%", desWidth: "100%"},
              {text:"Keystroke Indices & Managing Screen Text\nOnce a character has been sanitized, the character is appended to the UI screens string, the global index for tracking is incremented, and the character at the current index on the task UI screen is colored green/red dependent on if the input was valid/invalid. If the participant deletes a character, the graph safely decrements the global index tracker, clear the last colored character on the task UI, truncates the stored string, and guards against out of bound errors.", img1: "/images/Projects/Research/ResearchBP6.webp", imgText1: "UE5 Blueprint (4)",
              highlight: true,  mobWidth: "125%", desWidth: "100%"},
              {text:"Key Animation & Task Monitor UI\nTo maintain immersion, the graph calls an animation blueprint to modify the z-axis value of the press/released key to either 0 or -2, the animation blueprint just transforms the key's position between these two positions; creating a 'click' animation. Other animations used in this graph section are related the the computer screens task icons, where each task icon is assigned to a specific task that has its color filled-in upon the completion of said task with the color being set based on accuracy (a lerp between 0-1); when the experiment is at the halfway point, all task icons are emptied to setup the second half of the tasks being given.", img1: "/images/Projects/Research/ResearchBP4.webp", imgText1: "UE5 Blueprint (5)",
              highlight: true,  mobWidth: "125%", desWidth: "100%"},
              {text:"Compute WPM, Accuracy, Get Next Task/End Game\nWhen a task is finished, the performance graph calculates net words per minute, task accuracy percentage, total typing time, and error count, then stores these metrics in both the UI and a runtime array made for exporting user data. After storing statistics, the graph sets a flag for advancing to the next prompt or ending the experiment. Finally, the graph resets global variables, clears the UI text buffer, and disables the keyboard to prevent stray keystrokes while the scene transitions to the next task or ending the experiment.", img1: "/images/Projects/Research/ResearchBP3.webp", imgText1: "UE5 Blueprint (6)",
              highlight: true,  mobWidth: "125%", desWidth: "100%"},
          ]
      },
      {
        header:"Future Endeavors",
        paragraphs:[
          {text: "Building the Executable\nThe last portion of this project is building the executable file for the experiment, doing this will allow anyone who has the required hardware to run the executable to download and play the experiment themselves! After creating the executable my goal is to make it accessible here on my portfolio website.", highlight: true, },
        ]
      },
    ]
};
export default research;