const bot ={
    name: "Project 3",
    content: [
      {
        header:"Resources",
          paragraphs:[
              {text:"Guide\n",img1:"/images/Projects/QuadBot/RobotL.webp", imgText1: "Click above to see the original video!", img1HRef: "https://www.youtube.com/watch?v=CxfBYyjs4FY",
              highlight: true, mobWidth: "100%", desWidth: "100%",}, 
              {text:"Supplies\nFor non-component supplies, the cost for everything including the tools for soldering is aproximately $250", img1:"/images/Projects/QuadBot/BotSupplies.png",imgText1: "Click/Scan the QR Code for the required & recommended supplies!", img1HRef: "https://gowish.com/s/d0r66d",
              highlight: true, mobWidth: "100%", desWidth: "100%",},
              {text:"Components\nThe components of the robot consists of 8 different pieces, each of which are 3D printed. Not owning a 3D printer, I found Craftcloud, a company that specializes in 3D printing services. I chose Polylactic Acid (PLA) for the material at a total cost of just $40.43 for the incredbile quality this company delivered.", img1:"/images/Projects/QuadBot/CraftCloud.webp", imgText1: "Click to visit Craftcloud.com!", img1HRef: "https://craftcloud3d.com/en/p/3d-printing-services",
              highlight: true, mobWidth: "100%", desWidth: "100%",},
              {text:"", img1:"/images/Projects/QuadBot/Parts/BodyBottom.webp", img2:"/images/Projects/QuadBot/Parts/BodyTop.webp",
                imgText1: "Body Bottom Qty. 1", imgText2:"Body Top Qty. 1", mobWidth: "50%",
              },
              {text:"", img1:"/images/Projects/QuadBot/Parts/TibiaL.webp", img2:"/images/Projects/QuadBot/Parts/TibiaR.webp",
                imgText1: "Tibia Left Qty. 2", imgText2:"Tibia Right Qty. 2", mobWidth: "50%", 
              },
              {text:"", img1:"/images/Projects/QuadBot/Parts/CoxaL.webp", img2:"/images/Projects/QuadBot/Parts/CoxaR.webp",
                imgText1: "Coxa Left Qty. 2", imgText2:"Coxa Right Qty. 2", mobWidth: "50%", 
              },
              {text:"", img1:"/images/Projects/QuadBot/Parts/Femur.webp", img2:"/images/Projects/QuadBot/Parts/SHold.webp",
                imgText1: "Femur Qty. 4", imgText2:"S-Hold Qty. 8", mobWidth: "50%", 
              },
              {text:"", img1:"/images/Projects/QuadBot/QB.webp",
                imgText1: "Entire Set", mobWidth: "75%", 
              },
          ]
        },
      {
        header:"Structural Assembly",
          paragraphs:[
              {text:"Assemblying the skeleton\nThis portion of the project was not difficult since it entailed connecting the servo motors to the body, femurs, and tibias (3x each leg 4x). Afterwhich connecting tibias to femurs, then femurs to the body.", img1: "/images/Projects/QuadBot/Build1.webp", img2: "/images/Projects/QuadBot/Bot2.webp",
              imgText1: "Tibias, Femurs, Servo Motors Connected", imgText2:"Legs Connected to the Bodies Bottom",  highlight: true, glow: true,},
          ]
      },
      {
        header:"Electronic Assembly",
        paragraphs:[
            {text:"Tidying Up the Tin\nBuilding the circuit board involved soldering, with no prior training I faced numerous setbacks during this stage due to being hasty and not familiarizing myself with solder accessories such as using flux to remove oxidation and impurities before creating a soldered connection.", img1: "/images/Projects/QuadBot/Solder1.webp", img2: "/images/Projects/QuadBot/Solder2.webp",
              imgText1: "Quality of First Solder", imgText2:"Quality After Hours of Training", highlight: true, glow: true,},
            {text:"Connecting the Dots\nAfter one too many mistakes made while soldering the circuit board, I color coded an image of the blank PCB through-holes by the colors I used for the diagram of the circuit board. For further clearity I also numbered the yellow signal wires by their perspective servo motor #\'s.", img1: "/images/Projects/QuadBot/Board1.webp", img2: "/images/Projects/QuadBot/Board2.webp",
            imgText1: "Mapping microcontroller pins to blank PCB through-holes", imgText2:"Invertedly soldered the right-side signal wires.", highlight: true, glow: true,},
            {text:"", img1: "/images/Projects/QuadBot/Solder3.webp", imgText1: "Post-soldering, red light indicates a complete circuit.",},
            {text:"Copper Conundrum\nConnecting the positive, negative, and signal wires from each servo motor initially was pretty straightforward. However, after accidentally inverting an entire side of the circuit board this stage of the project a nightmare; splicing 36 wires while resoldering the circuit board is a task I will never forget.", img1: "/images/Projects/QuadBot/Wiring1.webp", img2: "/images/Projects/QuadBot/Wiring2.webp",
              imgText1: "Initial wiring for completed circuit", imgText2:"Final wiring for completed circuit",
            highlight: true,glow: true,},
        ]
      },
      {
        header:"Completing The Build",
        paragraphs:[
            {text:"The Tight Sqeeze\nThe wiring dilemma continously haunted the project, with the amount of extra wiring between each servo and the circuit board; space within the robots body was non-existent.", img1: "/images/Projects/QuadBot/Complete1.webp",
              imgText1: "Taken as soon as I attached the top section of the body.",
              highlight: true, glow: true,},
            {text:"\nWhile the wiring seems fine in pictures, in action the robot has trouble moving 2 of its legs since they are constrained from certain angles that are blocked by wires that should not be as exposed as they are.", img1: "/images/Projects/QuadBot/Complete2.webp", img2: "/images/Projects/QuadBot/Complete3.webp",
              imgText1: "Photo of the final result", imgText2:"The spillage of wires",
            highlight: true, glow: true,},
        ]
      },
      {
        header:"Future Endeavors",
        paragraphs:[
            {text:"Programming Actions\nBeing that this was my first project, the time allocated to building the robot was far beyond what I had initially planned. With my senior year of college beginning in a week, I had to make the tough decision of postponing the programming portion of the project until I had the time to learn about microcontroller programming in the Arduino IDE's simplified C++.",img1: "/images/Projects/QuadBot/ArduinoCode.webp",
              imgText1: "Starter code given by RobotLK for rotating each servo 90°", highlight: true},
            {text:"Redesigning The Body\nNow familiarized with designing 3D assets, I started working on redesigning the robots body, specifically the top-section. I widened its center opening to add breathing room for the wires, as well as added a compartment above the body to hold the batteries and a component for object detection such as a ultrasonic sensor.", img1: "/images/Projects/QuadBot/BotRedesign1.webp", img2: "/images/Projects/QuadBot/BotRedesign2.webp",
              imgText1: "Body-top is green, Body-bottom is purple", imgText2:"Redesign of the body including other components",
            highlight: true},
        ]
      }
    ]
    
};
export default bot;
//https://www.youtube.com/playlist?list=PL135o5QgZMdhjH0lqXXJucxrd8PoN9USq
/*
❎Print parts list:
    1x body_d.stl

    1x body_u.stl

    2x coxa_l.stl

    2x coxa_r.stl

    2x tibia_l.stl

    2x tibia_r.stl

    4x femur_1.stl

    8x s_hold.stl
 */