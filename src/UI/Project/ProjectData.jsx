

const projectData = {
    'PP1': {
    name: "Research Experiment",
    mainImg: "./images/PP1.webp",
    externalLink: "https://example.com/roll-safe",
    content: [
      {
        header: "Development Tools",
        paragraphs: [
          {text: "Blender\nCreated 3D meshes, materials, and animated armatures.", highlight: true},
          {text: "Unreal Engine\nVisual Scripting with blueprints for all game logic. ", highlight: true},
        ]
      },
      {
        header: "Overview",
        paragraphs: [
          {text: "The Objective\nFocuses on why text entry in virtual-reality (VR) lags behind traditional desktop typing and if simulating a users hand virtually can shorten the gap. Participants completed the same typing tasks under three conditions:\n\n\t1. Desktop Baseline.\n\t2. VR with virtual hands.\n\t3. VR without virtual hands.\n\nThe study tracked net words per-minute (WPM), accuracy, and task-completion time for each of the conditions in a within-subjects design.\n\n", highlight: true},
          {text: "Findings\n- Desktop typing remained fastest and most accurate\n- Both VR setups were much slower and more prone to errors.\n- Interestingly, virtual hands produced no significant improvement over the handless VR condition in speed.\n- Some participants noted that the virtual hands obscured keys, making typing harder.\n\n", highlight: true},
          {text: "Key take-away\nResults indicate that rendering hands in VR does not bridge the performance gap with traditional typing. Achieving efficient text entry for VR workspaces will likely require alternative input techniques, more sophisticated hand/keyboard tracking solution, or improving simulations with collision detection for virtually rendered hands.",highlight: true}
        ]
      }
    ]
  },
  'PP2': {
    name: "Chess Game",
    mainImg: "./images/PP2.webp",
    externalLink: "https://example.com/roll-safe",
    content: [
      {
        header: "Development Tools",
        paragraphs: [
          {text: "Javacript\n\tFrontend User Interface & User Input.", highlight: true},
          {text: "Java\n\tBackend Move validation, Special moves, & Promotions.", highlight: true},
          {text: "Figma\n\tDesigning Chess pieces & Board/Capture/Move UI Borders.", highlight: true}
        ]
      },
      {
        header: "Overview",
        paragraphs: [
          {text: "\nCreated in 3 months by 3 ambitious individuals who barely knew how to even play chess when beginning, this chess application delivers a rule-accurate experience by pairing a deterministic backend/server built on Java with a, frontend/client interface built on JavaScript.\n\nThe backend enforces every nuance of chess while exposing a minimal JSON API that keeps frontend messages small and stateless. On the frontend, a responsive React component transforms the board given by the backend into an interactable chessboard with real-time move feedback.\n\nThe project also includes automated test suites on both sides, JUnit for the backend and Jest for the frontend; ensuring new features never break the application.",
             highlight: true},
         
        ]
      }
    ]
  },
  'PP3': {
    name: "Quadruped Bot",
    mainImg: "./images/PP3.webp",
    externalLink: "https://example.com/roll-safe",
    content: [
      {
        header: "Overview",
        paragraphs: [
          {text: "The arduino quadruped robot was my first solo project that I worked on which taught me the importance of the 5 P's: Prior Planning Prevents Poor Performance.\n\nI was inspired after completing an Operating Systems course where I connected an ultrasonic sensor to a Raspberry Pi using a breadboard to measure distance between the sensor and an object.\n\nAfter completing the OS project, I figured how hard could this be? After reading through the roadmap of this project, you'll see I learned the answer to my question. :)", highlight: false},
        ]
      },
      {
        header: "Circuit Diagram ",
        paragraphs: [
          {text: "The Diagram below shows how the 12 micro-servos, the voltage converter, and the battery pack are wired to the Arduino Nano V3 microcontroller.", highlight: false, img1: "/images/Projects/QuadBot/DiagramQB.webp"},
   
        ]
      }
    ]
  }
}
export default projectData;


/*
https://www.amazon.com/dp/B083LZS69N?ref=ppx_yo2ov_dt_b_fed_asin_title&th=1
Kuject 200PCS Solder Seal Heat Shrink Butt Connectors, Waterproof Wire Connectors Kit Electrical Terminals, Solderless Insulated Wire Splice Cable Connector for Marine Automotive Boat Truck
https://www.amazon.com/dp/B07TX6BX47?ref=ppx_yo2ov_dt_b_fed_asin_title&th=1
22 awg Wire Solid Core Hookup Wires-6 Different Colored Breadboard Wires 30ft or 9m Each, 22 Gauge Electronic Wire PVC (OD: 1.60mm) Arduino Wires
https://www.amazon.com/dp/B01EV70C78?ref=ppx_yo2ov_dt_b_fed_asin_title
ELEGOO 120pcs Multicolored Dupont Wire 40pin Male to Female, 40pin Male to Male, 40pin Female to Female Breadboard Jumper Ribbon Cables Kit Compatible with Arduino Projects
https://www.amazon.com/dp/B0B1DTQ97V?ref=ppx_yo2ov_dt_b_fed_asin_title
Swpeet 147Pcs 5 Types 2.54mm Female Pin Header Socket Connector Strip Assortment Kit, Long and Short Needle Curve Straight Stacking Headers Compatible
https://www.amazon.com/dp/B08C4VN46N?ref=ppx_yo2ov_dt_b_fed_asin_title
Solder Tip Cleaner Soldering Ion Tip Cleaning Wire and Holder Coiled Brass Sponge Tip Cleaner Kit with 7 PCS Solder Tip Cleaning Wire and 1 PC Holder for Cleaning Soldering Irons and Tips
https://www.amazon.com/dp/B08VFY8THD?ref=ppx_yo2ov_dt_b_fed_asin_title
SEEKONE Mini Heat Gun, 350W 2-Temp Settings 500℉ & 842℉（260℃& 450℃） Fast Heat Hot Air Gun Tool with Reflector Nozzle and 4.9Ft Long Cable Overload Protection for Crafting, Vinyl Wrap and Shrink Tubing
https://www.amazon.com/dp/B01ISAMUA6?ref=ppx_yo2ov_dt_b_fed_asin_title&th=1
AstroAI Digital Multimeter Tester 2000 Counts with DC AC Voltmeter and Ohm Volt Amp Meter; Measures Voltage, Current, Resistance, Continuity and Diode, Blue
https://www.amazon.com/dp/B07D25N45F?ref=ppx_yo2ov_dt_b_fed_asin_title&th=1
DOWELL 22-30 AWG Wire Stripper Wire Stripping Tool Wire Cutter And Multi-Function Hand Tool，Professional Handle Design And Refined Craftsmanship.
https://www.amazon.com/dp/B00425FUW2?ref=ppx_yo2ov_dt_b_fed_asin_title&th=1
MG Chemicals - 8341-10ML 8341 No Clean Flux Paste, 10 milliliters Pneumatic Dispenser (Complete with Plunger & Dispensing Tip)
https://www.amazon.com/dp/B000P42O3C?ref=ppx_yo2ov_dt_b_fed_asin_title&th=1
NEIKO 01902 Adjustable Helping Hand with Magnifying Glass, Third Hand Solder Aid, Soldering Wire Station Stand with Dual Alligator Clips and a Heavy Base, Beading & Jewelry Making Tools, Solder Holder
https://www.amazon.com/dp/B075WB98FJ?ref=ppx_yo2ov_dt_b_fed_asin_title&th=1
63-37 Tin Lead Rosin Core Solder Wire for Electrical Soldering (0.8mm 50g)
https://www.amazon.com/dp/B07GTGGLXN?ref=ppx_yo2ov_dt_b_fed_asin_title&th=1
Soldering Iron Kit, 60W Soldering Iron, 5 Soldering Iron Tips, 21-in-1 Adjustable Temperature, Solder Wire, Stand, Desoldering Pump, Soldering Welding Iron Kit for Electronics Hobby DIY 110V US Plug
https://www.amazon.com/dp/B0BKPL2Y21?ref=ppx_yo2ov_dt_b_fed_asin_title&th=1
WWZMDiB SG90 Micro Servo Motor for Arduino Raspberry Pi DIY (3 Pcs)
https://www.amazon.com/dp/B0CKHQ181R?ref=ppx_yo2ov_dt_b_fed_asin_title
3.7 Volt 18650 Rechargeable Battery 3200mAh 18650 Battery 3.7V 18650 Flat Top Battery for Flashlights, Headlamps (2 Pack, Blue)
https://www.amazon.com/dp/B00FXHXT80?ref=ppx_yo2ov_dt_b_fed_asin_title
HiLetgo 20pcs Solder Finished Prototype PCB for DIY 5x7cm Circuit Board Breadboard
https://www.amazon.com/dp/B00NLAMS9C?ref=ppx_yo2ov_dt_b_fed_asin_title
MakerFocus Pre-Soldered Nano V3.0 Board ATmega328P Microcontroller CH340 Chip 5V 16M with USB Cable Compatible with Arduino IDE(Mini USB B Port)
https://www.amazon.com/dp/B06XRN7NFQ?ref=ppx_yo2ov_dt_b_fed_asin_title
DZS Elec 2PCS LM2596 DC-DC Step Down Variable Volt Regulator Input 3.2V-40V Output 1.25V-35V Adjustable Buck Converter Electronic Voltage Stabilizer Power Supply Module
https://www.amazon.com/dp/B07Y1GDRQG?ref=ppx_yo2ov_dt_b_fed_asin_title&th=1
QTEATAK 5Pcs On/Off Boat Rocker Switch 5Pcs 2 Pin 2 Position Snap 12V 110V 250V
https://www.amazon.com/dp/B0D8T21VSN?ref=ppx_yo2ov_dt_b_fed_asin_title&th=1
Premium Heat Resistant 932°F Magnetic Soldering Mat, 17.3'' x 11.8'' Electronics Repair Work Mat for Soldering, Electronics Computer Cellphone Repair, BGA Soldering Gun Iron Workbench Protection
*/