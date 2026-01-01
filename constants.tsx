
import { Phase, QuizQuestion } from './types';

export const PHASES: Phase[] = [
  {
    id: 1,
    title: "Phase 1: Force & Terminology",
    goal: "Understand the physics of motive force and basic components.",
    duration: "Months 1–3",
    knowledge: [
      "Motive Force: Energy storage in spring drive movements.",
      "Torque Calculation: T (Nm) = Force (N) x Radius (m).",
      "Terminology: Wheels (teeth), Pinions (leaves), and Arbor Assemblies.",
    ],
    reading: ["The Theory of Horology (Torque & Gear Ratios)"],
    homework: [
      "Calculate the torque of a 2N force at 5m radius.",
      "Identify difference between 'teeth' and 'leaves' on a 6497 train."
    ],
    quizTopic: "Physics & Terminology"
  },
  {
    id: 2,
    title: "Phase 2: The Barrel & Mainspring",
    goal: "Master the mechanics of power storage and the going barrel.",
    duration: "Months 4–6",
    knowledge: [
      "Hooke's Law: Deformation vs. Load in spring steel.",
      "Barrel Space: The 1/3 diameter rule for ideal spring length.",
      "Going Barrel: Why it allows winding without interrupting drive."
    ],
    reading: ["Practical Watch Repairing (The Mainspring Chapter)"],
    homework: [
      "Measure barrel ID and calculate ideal spring length.",
      "Inspect for 'Coning' in a vintage carbon steel spring."
    ],
    quizTopic: "Mainspring Mechanics"
  },
  {
    id: 3,
    title: "Phase 3: Strength & Lubrication",
    goal: "Deep dive into spring strength and friction management.",
    duration: "Months 7–9",
    knowledge: [
      "Cubic Thickness: Strength is proportional to the cube of thickness (2x thick = 8x force).",
      "Spring Failures: Permanent set, coning, and stress concentration points.",
      "Recoiling Clicks: Preventing 'knocking' by releasing excess tension."
    ],
    reading: ["Watchmaking by George Daniels (Spring Tempering)"],
    homework: [
      "Select a replacement spring using the height/thickness/ID catalog.",
      "Adjust a recoiling click to prevent over-banking."
    ],
    quizTopic: "Strength & Failures"
  },
  {
    id: 4,
    title: "Phase 4: Motion Works & Regulation",
    goal: "Master the 12:1 reduction and friction drive setup.",
    duration: "Months 10–12",
    knowledge: [
      "Motion Work: Two-stage reduction (3:1 and 4:1) for the 12:1 ratio.",
      "Friction Drive: The Cannon Pinion 'snap groove' and back taper.",
      "Center Seconds: Hollow center arbors and concentric power flow."
    ],
    reading: ["The Watch Repairer's Manual (Motion Work Friction)"],
    homework: [
      "Adjust cannon pinion friction using a tightening tool.",
      "Calculate turns ratio for a center wheel to third pinion engagement."
    ],
    quizTopic: "Motion Works & Seconds"
  }
];

export const SYLLABUS_LESSONS = [
  { id: 1, title: "Lesson 1: Introduction to Horology", summary: "The history, ethics, and fundamental principles of timekeeping." },
  { id: 2, title: "Lesson 2: Oil & Pivots", summary: "The science of friction, surface tension, and pivot polishing techniques." },
  { id: 3, title: "Lesson 3: Cases", summary: "Assembly, gasket seating, and the aesthetics of exterior watch architecture." },
  { id: 4, title: "Lesson 4: Hands, Dials and Water Protection", summary: "The interface of time and the engineering of pressure-resistant seals." },
  { id: 5, title: "Lesson 5: Watch Crystals", summary: "Acrylic, Mineral, and Sapphire materials and their fitting methods." },
  { id: 6, title: "Lesson 10: Introduction to the Escapement", summary: "The heart of the watch: The Swiss Lever Escapement architecture." },
  { id: 11, title: "Lesson 11: Hairspring Corrections", summary: "Flatness, centering, and the manipulation of the Breguet overcoil." },
  { id: 12, title: "Lesson 12: Regulation", summary: "Fine-tuning timekeeping across 5 positions for COSC standards." },
  { id: 13, title: "Lesson 13: Using the Staking Set #1", summary: "Fundamental metalwork: Riveting, bushing, and arbor corrections." },
];

export const QUIZZES: Record<number, QuizQuestion[]> = {
  1: [
    {
      id: 1,
      question: "If a 5 N force is applied at a 2 m radius, what is the torque?",
      options: ["2.5 Nm", "10 Nm", "7 Nm", "20 Nm"],
      correctAnswer: 1,
      explanation: "Torque = Force x Radius. 5N * 2m = 10 Nm."
    },
    {
      id: 2,
      question: "In horological terminology, the teeth on a pinion are referred to as:",
      options: ["Gears", "Pips", "Leaves", "Spines"],
      correctAnswer: 2,
      explanation: "Wheels have teeth, while the much smaller pinions have 'leaves'."
    }
  ],
  2: [
    {
      id: 1,
      question: "A spring is correctly sized when it occupies how much of the available barrel volume?",
      options: ["1/4", "1/2", "3/4", "Full"],
      correctAnswer: 1,
      explanation: "Ideal length is achieved when the spring occupies half the available volume, taking up about 1/3 of the diameter when unwound."
    },
    {
      id: 2,
      question: "What is the primary advantage of a 'Going Barrel'?",
      options: ["Higher Torque", "Rust resistance", "Winding without interrupting drive", "Easier assembly"],
      correctAnswer: 2,
      explanation: "Because power is wound from the inner end and drive is taken from the outer end, the watch keeps running while being wound."
    }
  ],
  3: [
    {
      id: 1,
      question: "If you double the thickness of a mainspring, the strength increases by:",
      options: ["2x", "4x", "8x", "16x"],
      correctAnswer: 2,
      explanation: "Spring strength is proportional to the cube of the thickness (2^3 = 8)."
    },
    {
      id: 2,
      question: "What does 'Coning' in a mainspring cause?",
      options: ["Increased power", "Friction against the barrel lid/bottom", "Faster winding", "Better timekeeping"],
      correctAnswer: 1,
      explanation: "Coning causes the spring to drag, lowering amplitude and causing wear on the barrel drum."
    }
  ],
  4: [
    {
      id: 1,
      question: "The standard reduction ratio between the minute hand and hour hand is:",
      options: ["6:1", "12:1", "24:1", "60:1"],
      correctAnswer: 1,
      explanation: "Twelve turns of the minute hand produce one turn of the hour hand (12:1)."
    },
    {
      id: 2,
      question: "What component provides the friction drive to allow time-setting?",
      options: ["Mainspring", "Escape Wheel", "Cannon Pinion", "Ratchet Wheel"],
      correctAnswer: 2,
      explanation: "The cannon pinion snaps onto the center arbor, providing enough friction to drive the hands but allowing them to slip during setting."
    }
  ]
};

export interface PartSpec {
  title: string;
  description: string;
  requirements: string[];
  clearances: string;
  lubrication: string;
  criticalCheck: string;
}

export const PART_SPECS: Record<string, PartSpec> = {
  "Mainspring": {
    title: "Motive Force Assembly",
    description: "The motor of the watch. Stores elastic potential energy when wound and releases it steadily to drive the gear train.",
    requirements: ["Uniform coil spacing", "Polished barrel walls", "Inner eye hook engagement"],
    clearances: "0.05mm - 0.10mm (Endshake)",
    lubrication: "Moebius 8200 (Spring Body), 8217 (Wall Braking)",
    criticalCheck: "Check for 'coning' after winding to ensure flat delivery of power."
  },
  "Cannon Pinion": {
    title: "Friction Drive System",
    description: "The friction-fit component that drives the hands. It allows the hands to be set (slipped) without stopping the movement.",
    requirements: ["Clean internal pipe", "Verified indent depth", "Perfect concentricity"],
    clearances: "0.02mm (Pipe to Center Arbor)",
    lubrication: "Moebius 9504 or 9501",
    criticalCheck: "Must allow time setting without disturbing the balance amplitude."
  },
  "Balance Wheel": {
    title: "Oscillating Heart",
    description: "The regulator. Vibrates back and forth at a precise frequency, determining the accuracy of the watch.",
    requirements: ["True in round and flat", "Hairspring centered", "Impulse jewel vertical"],
    clearances: "0.03mm (Pivot Sideplay)",
    lubrication: "Moebius 9010 (Incabloc Jewels)",
    criticalCheck: "Check 'Safety Action' to ensure the guard pin doesn't touch the roller."
  },
  "Pallet Fork": {
    title: "The Distributor",
    description: "Converts the rotational force of the escape wheel into impulse for the balance wheel, while controlling the release of energy.",
    requirements: ["Locked stones", "Zero pivot friction", "Guarding action"],
    clearances: "0.02mm (Bankings)",
    lubrication: "Dry (except Exit Stone face)",
    criticalCheck: "Check for 'Draw' - the force that keeps the fork against the banking pins."
  },
  "Escape Wheel": {
    title: "The Metering Device",
    description: "The final wheel in the train. Its uniquely shaped teeth interact with the pallet stones to increment time.",
    requirements: ["Highly polished teeth", "Perfect flatness", "Minimum weight"],
    clearances: "0.04mm (Endshake)",
    lubrication: "Moebius 9415 (on teeth)",
    criticalCheck: "Ensure the 'drop' is equal on both pallet stones."
  },
  "Fourth Wheel": {
    title: "Seconds Drive",
    description: "Rotates once per minute. Its long pivot usually extends through the dial to carry the seconds hand.",
    requirements: ["Straight long pivot", "Clean leaves", "Secure hand seat"],
    clearances: "0.05mm (Endshake)",
    lubrication: "Moebius 9010",
    criticalCheck: "Check for dial clearance - a bent pivot will cause the hand to drag on the dial."
  },
  "Third Wheel": {
    title: "Intermediate Power",
    description: "Transfers power from the center wheel to the fourth wheel. Crucial for gear reduction ratios.",
    requirements: ["Clean teeth", "Polished pivots", "Secure pinion"],
    clearances: "0.05mm (Endshake)",
    lubrication: "Moebius HP-1300",
    criticalCheck: "Inspect the 'depthing' with the center and fourth pinions."
  },
  "Center Wheel": {
    title: "The Hour Hub",
    description: "Rotates once per hour. It sits in the center of the movement and carries the cannon pinion.",
    requirements: ["Robust arbor", "Securely fitted cannon pinion", "Clean gear profile"],
    clearances: "0.08mm (Endshake)",
    lubrication: "Moebius HP-1300",
    criticalCheck: "Ensure no 'eccentricity' which would cause hands to vary height during rotation."
  },
  "Ratchet Wheel": {
    title: "Winding Power",
    description: "Sits atop the mainspring barrel arbor. It is rotated by the winding mechanism to tighten the spring.",
    requirements: ["Strong teeth", "Secure arbor screw", "Polished underside"],
    clearances: "Flush to Bridge",
    lubrication: "Light Moebius 9504 on screw",
    criticalCheck: "Verify that the screw is tightened sufficiently - often a left-hand thread!"
  },
  "Crown Wheel": {
    title: "Winding Transfer",
    description: "Transfers the rotation from the winding pinion (stem) to the ratchet wheel.",
    requirements: ["Clean interface teeth", "Smooth rotation", "Minimal play"],
    clearances: "0.10mm (Lateral Play)",
    lubrication: "Moebius 9504 (Core pivot)",
    criticalCheck: "The center screw is typically left-hand thread in Swiss movements."
  },
  "Winding Stem": {
    title: "User Interface",
    description: "The primary point of interaction. Used for winding the spring and setting the time.",
    requirements: ["Straight profile", "Clean square section", "Rust free"],
    clearances: "Snug fit in Mainplate",
    lubrication: "Moebius 9504",
    criticalCheck: "Check the 'Clutch' engagement in both positions (Winding/Setting)."
  },
  "Recoiling Click": {
    title: "Energy Retention Click",
    description: "Prevents the mainspring from unwinding instantly. The 'recoil' allows excess tension to ease, protecting the train.",
    requirements: ["Smooth pivot action", "Strong spring tension", "Teeth engagement depth"],
    clearances: "0.15mm (Recoil distance)",
    lubrication: "Moebius HP-1300",
    criticalCheck: "Ensure click releases 1.5 teeth of tension to avoid 'knocking' after full wind."
  }
};

export const MOVEMENTS = [
  {
    id: "st3600",
    name: "Seagull ST3600",
    type: "Manual Wind",
    parts: 52,
    difficulty: "Beginner",
    description: "A clone of the Unitas 6497. The perfect large-scale movement for beginners to learn train architecture.",
    manualUrl: "https://www.cousinsuk.com/PDF/categories/2376_ETA%206497-1,%206498-1.pdf"
  },
  {
    id: "nh35a",
    name: "Seiko NH35A",
    type: "Automatic",
    parts: 98,
    difficulty: "Intermediate",
    description: "Industrial workhorse with a bidirectional 'Magic Lever' winding system and hacking seconds.",
    manualUrl: "https://www.timemodule.com/upload/PDF/NH35_TG.pdf"
  },
  {
    id: "eta2824",
    name: "ETA 2824-2",
    type: "High-Beat Auto",
    parts: 104,
    difficulty: "Advanced",
    description: "The Swiss standard. Requires precise lubrication of the reversing wheels in the automatic module.",
    manualUrl: "https://www.cousinsuk.com/PDF/categories/2381_ETA%202824.2,%202801.2,%202804.2,%202816.2,%202821.2,%202834.2,%202836.2.pdf"
  }
];

export interface TechnicalPart {
  id: string;
  name: string;
  category: string;
  lubrication?: string;
  notes: string;
}

export const MOVEMENT_TDS: Record<string, TechnicalPart[]> = {
  "st3600": [
    { id: "100", name: "Mainplate", category: "Base", notes: "Foundation for all jewels and bridges." },
    { id: "110", name: "Train wheel bridge", category: "Bridges", notes: "Secures the 3rd, 4th, and Escape wheels." },
    { id: "125", name: "Pallet bridge", category: "Escapement", notes: "Requires perfect leveling to prevent pivot friction." },
    { id: "182", name: "Barrel bridge", category: "Bridges", lubrication: "Moebius HP-1300", notes: "Houses the going barrel and click mechanism." },
    { id: "195", name: "Barrel with mainspring", category: "Motive Force", lubrication: "Moebius 8200", notes: "Occupies 1/2 barrel volume per 1/3 diameter rule." },
    { id: "201", name: "Center wheel", category: "Train", lubrication: "Moebius HP-1300", notes: "Drives the 3rd wheel pinion." },
    { id: "210", name: "Third wheel", category: "Train", lubrication: "Moebius HP-1300", notes: "Intermediate power transfer." },
    { id: "227", name: "Fourth wheel", category: "Train", lubrication: "Moebius 9010", notes: "Long pivot carries seconds hand." },
    { id: "401", name: "Winding stem", category: "Keyless Works", lubrication: "Moebius 9504", notes: "High friction area on clutch teeth." },
    { id: "705", name: "Escape wheel", category: "Escapement", lubrication: "Moebius 9415", notes: "Final wheel in the going train." },
    { id: "710", name: "Balance bridge", category: "Regulating", notes: "Houses Incabloc shock protection system." },
    { id: "721", name: "Balance wheel", category: "Regulating", lubrication: "Moebius 9010", notes: "Impulse jewel must be perfectly vertical." },
  ],
  "nh35a": [
    { id: "0010.020", name: "Mainplate", category: "Base", notes: "Integrated date-side architecture." },
    { id: "0011.020", name: "Barrel bridge", category: "Bridges", lubrication: "Moebius HP-1300", notes: "Secures winding and automatic gears." },
    { id: "0014.010", name: "Automatic bridge", category: "Automatic", notes: "Houses the Magic Lever system." },
    { id: "0015.010", name: "Magic Lever", category: "Automatic", lubrication: "Moebius 9504", notes: "Bidirectional winding paws. Seiko exclusive architecture." },
    { id: "0020.010", name: "Center wheel & pinion", category: "Train", lubrication: "Moebius HP-1300", notes: "Offset from center in this caliber." },
    { id: "0025.010", name: "Escape wheel", category: "Escapement", lubrication: "Moebius 9415", notes: "High beat (21,600 bph) lubrication critical." },
    { id: "0030.010", name: "Pallet fork", category: "Escapement", notes: "Engages the balance impulse jewel." },
    { id: "0040.010", name: "Hacking lever", category: "Keyless Works", notes: "Stops 4th wheel when crown is in Position 2." },
    { id: "0050.010", name: "Oscillating weight", category: "Automatic", notes: "Heavy central rotor for kinetic charging." },
    { id: "0060.010", name: "Date indicator", category: "Calendar", lubrication: "Silicone Grease", notes: "Plastic components; requires specialized light grease." },
    { id: "0070.010", name: "Date jumper", category: "Calendar", notes: "Provides the snap action for date changes." },
    { id: "0080.010", name: "Hacking lever spring", category: "Keyless Works", notes: "Maintains tension on the hacking arm." }
  ],
  "eta2824": [
    { id: "100", name: "Mainplate", category: "Base", notes: "Standard 11.5 ligne Swiss architecture." },
    { id: "110", name: "Train bridge", category: "Bridges", notes: "Secures the Swiss-style going train." },
    { id: "121", name: "Barrel bridge", category: "Bridges", lubrication: "Moebius HP-1300", notes: "Houses the mainspring barrel." },
    { id: "180/1", name: "Barrel with Mainspring", category: "Motive Force", lubrication: "Moebius 8217", notes: "Automatic variant requires braking grease." },
    { id: "1481", name: "Reversing wheel (x2)", category: "Automatic", lubrication: "Moebius 9010", notes: "Converts bidirectional rotor movement to unidirectional winding." },
    { id: "1488", name: "Reduction wheel", category: "Automatic", lubrication: "Moebius HP-1300", notes: "Transfers power from reversing wheels to ratchet wheel." },
    { id: "1490", name: "Oscillating weight", category: "Automatic", notes: "Ball-bearing mounted rotor." },
    { id: "200", name: "Center wheel", category: "Train", lubrication: "Moebius HP-1300", notes: "High-torque delivery." },
    { id: "705", name: "Escape wheel", category: "Escapement", lubrication: "Moebius 9415", notes: "Epicycloidal teeth profiles." },
    { id: "710", name: "Pallet fork", category: "Escapement", notes: "Traditional Swiss Lever design." },
    { id: "2557", name: "Date indicator", category: "Calendar", notes: "Metal date disc with printed numerals." },
    { id: "2576", name: "Date jumper spring", category: "Calendar", notes: "High tension spring for date snap." }
  ]
};

export const MOVEMENT_SERVICE_GUIDES: Record<string, string> = {
  "st3600": `ST3600 (Unitas 6497) Service Guide...`,
  "nh35a": `Seiko NH35A Service Guide...`
};

export const LOCAL_THEORY_DATA: Record<string, string> = {
  "The Theory of Horology": `Technical Compendium: The Theory of Horology (WOSTEP Reference)

Chapter 1: The Physics of Time
Timekeeping is the measurement of regular intervals. In mechanical horology, this regularity is achieved through an oscillator (Balance Wheel) controlled by a restoring force (Hairspring). The precision is determined by the "Q factor" – the ratio of energy stored to energy lost per cycle.

Chapter 2: Motive Force and Torque Delivery
The Mainspring is the motor.
- Alloy Composition: Modern springs use Nivaflex (Beryllium, Nickel, Chromium, Cobalt). Unlike carbon steel, they are stainless and "unbreakable" in normal use.
- Torque Curve: Power delivery is non-linear. Torque is highest when fully wound and drops as the spring unwinds.
- The Stack: Mainspring strength (M) is proportional to height (b) and the cube of thickness (e). M = (E * b * e^3) / (12 * L).

Chapter 3: The Gear Train and Friction
- Cycloidal Gearing: Watches use epicycloidal profiles to maintain a constant drive ratio and reduce friction. Unlike standard industrial gears, watch gears prioritize the "line of centers" to ensure smooth delivery of small torque.
- Lubrication: Friction accounts for 15-30% of energy loss. Polished pivots (Ra 0.05) and synthetic lubricants (Moebius 9010/HP-1300) are mandatory.

Chapter 3.1: Epicycloidal Gearing Systems (The Horological Standard)
In general engineering, the "involute" tooth profile is standard because it allows for variations in center distance without changing the gear ratio. However, in watchmaking, we almost exclusively use Epicycloidal (Cycloidal) gearing for the going train.

Why Epicycloidal?
1. Gear Ratios: Watch trains require massive gear reductions (e.g., 60:1 from the barrel to the center wheel). Involute gears are prone to 'undercutting' when a small pinion (less than 12 leaves) is used. Cycloidal teeth can be made with as few as 6 leaves without losing structural integrity or causing interference.
2. The Line of Centers: In cycloidal gearing, the point of contact between two teeth travels along the 'line of centers'. This ensures that the force is delivered as a pure push with minimal sliding friction, which is critical when dealing with the infinitesimal torque levels of a balance wheel.
3. The Ogive: The 'addendum' (the part of the tooth above the pitch circle) of a cycloidal wheel is shaped as an epi-cycloid (a curve traced by a point on a circle rolling on the outside of another circle). The 'dedendum' of the driven pinion is a hypo-cycloid.
4. Friction Reduction: The path of contact is designed so that the teeth 'roll' over each other. This reduces wear and ensures that the drive remains constant even as the lubrication degrades over several years.

Master's Note on Depthing:
Unlike involute gears, cycloidal systems are highly sensitive to the 'center distance' (Depthing). If the centers are too close, the teeth will jam; if too far, the 'drop' becomes excessive and the efficiency collapses. A watchmaker uses a Depthing Tool to find the perfect 'line of centers' before drilling the plate.

Chapter 4: The Swiss Lever Escapement
The "brain" of the watch. It performs two functions: locking the train and impulsing the balance.
- Terminology: Lift angle, Drop, Lock, Draw.
- Impulse: Occurs across the pallet stone faces. Lubrication here (9415) determines the amplitude stability.`,

  "Watchmaking by George Daniels": `Masterwork: Watchmaking by George Daniels...`,
  "Fried’s Watch Repairer’s Manual": `Practical Guide: Henry B. Fried’s Watch Repairer’s Manual...`,
  "Practical Watch Repairing": `Foundation: Practical Watch Repairing by Donald de Carle...`,
  "Detailed Curriculum for Phase 1": `Phase 1: Force, Terminology & Physics Core...`,
  "Detailed Curriculum for Phase 2": `Phase 2: The Barrel & Mainspring Mastery...`,
  "Detailed Curriculum for Phase 3": `Phase 3: Strength, Fatigue & Lubrication Science...`,
  "Detailed Curriculum for Phase 4": `Phase 4: Motion Works, Friction & Regulation...`
};
