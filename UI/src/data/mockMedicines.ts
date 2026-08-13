import { Medicine } from '../types';

export const MOCK_MEDICINES: Medicine[] = [
  {
    _id: "med-001",
    Title: "Ecosprin 75mg Strip Of 14 Tablets",
    City: "Temeke, Dar es Salaam",
    PharmacyName: "Marvelous Medicines Arusha",
    ImageUrl: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=500&auto=format&fit=crop&q=60",
    Price: "13,000 Tsh",
    Discount: "15% OFF",
    Description: "Ecosprin 75 tablet is an antiplatelet medicine. It is used to prevent the risk of heart attacks, stroke and angina. It is also used in patients who have had angioplasty. Blood clots can limit or block the passage of blood to essential organs.",
    Uses: "For prevention of heart attack, clot-related stroke (ischemic), heart conditions like stable or unstable angina (chest pain).",
    Contraindications: [
      "If you are allergic to aspirin or other ingredients of Ecosprin 75 tablet.",
      "If you have an active bleeding or clotting disorder like haemophilia and low platelet count.",
      "If you have a history of ulcers or bleeding in the stomach or small intestine.",
      "If you have gout, liver or kidney disorder or bleeding in the brain."
    ],
    SideEffects: [
      "Indigestion",
      "Nausea",
      "Vomiting",
      "Diarrhoea",
      "Increased risk of bleeding"
    ],
    InStock: true,
    Unit: "14 Tablet(s) in Strip"
  },
  {
    _id: "med-002",
    Title: "Amoxicillin 500mg Capsules (10s)",
    City: "Kinondoni, Dar es Salaam",
    PharmacyName: "Panacea Prescriptions",
    ImageUrl: "https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=500&auto=format&fit=crop&q=60",
    Price: "8,500 Tsh",
    Discount: "10% OFF",
    Description: "Amoxicillin is a penicillin antibiotic that fights bacteria. It is used to treat many different types of infection caused by bacteria, such as tonsillitis, bronchitis, pneumonia, and infections of the ear, nose, throat, skin, or urinary tract.",
    Uses: "Treatment of bacterial infections including respiratory tract, middle ear, sinus, skin, and urinary tract infections.",
    Contraindications: [
      "Known hypersensitivity to penicillin or cephalosporins.",
      "Patients with infectious mononucleosis."
    ],
    SideEffects: [
      "Skin rash",
      "Nausea",
      "Mild diarrhea"
    ],
    InStock: true,
    Unit: "10 Capsule(s) in Strip"
  },
  {
    _id: "med-003",
    Title: "Paracetamol 500mg Tablets (20s)",
    City: "Arusha Central",
    PharmacyName: "Hale & Health Pharmacy",
    ImageUrl: "https://images.unsplash.com/photo-1550572017-edf7928956b7?w=500&auto=format&fit=crop&q=60",
    Price: "3,000 Tsh",
    Discount: "5% OFF",
    Description: "Paracetamol is a widely used analgesic and antipyretic medication for mild to moderate pain relief and fever reduction.",
    Uses: "Relief of mild to moderate pain including headache, toothache, muscle aches, and lowering fever.",
    Contraindications: [
      "Severe liver impairment or active liver disease.",
      "Hypersensitivity to paracetamol."
    ],
    SideEffects: [
      "Allergic reactions (rare)",
      "Nausea if taken on empty stomach"
    ],
    InStock: true,
    Unit: "20 Tablet(s) per Pack"
  },
  {
    _id: "med-004",
    Title: "Ibuprofen 400mg Tablets (10s)",
    City: "Mwanza City",
    PharmacyName: "Ailments & Antidotes",
    ImageUrl: "https://images.unsplash.com/photo-1585435557343-3b092031a831?w=500&auto=format&fit=crop&q=60",
    Price: "5,000 Tsh",
    Discount: "12% OFF",
    Description: "Ibuprofen is a nonsteroidal anti-inflammatory drug (NSAID) used for relieving pain, reducing inflammation, and lowering fever.",
    Uses: "Pain relief for arthritis, dental pain, menstrual cramps, muscular aches, and acute inflammation.",
    Contraindications: [
      "Active stomach ulcer or history of GI bleeding.",
      "Severe heart failure or kidney failure."
    ],
    SideEffects: [
      "Heartburn",
      "Stomach upset",
      "Dizziness"
    ],
    InStock: true,
    Unit: "10 Tablet(s) in Strip"
  },
  {
    _id: "med-005",
    Title: "Azithromycin 500mg Tablets (3s)",
    City: "Ilala, Dar es Salaam",
    PharmacyName: "QuickUp Prescriptions",
    ImageUrl: "https://images.unsplash.com/photo-1576602976047-174e57a47881?w=500&auto=format&fit=crop&q=60",
    Price: "15,000 Tsh",
    Discount: "8% OFF",
    Description: "Azithromycin is a broad-spectrum macrolide antibiotic used to treat various bacterial infections, including respiratory, skin, and sexually transmitted infections.",
    Uses: "Community-acquired pneumonia, strep throat, sinusitis, skin infections.",
    Contraindications: [
      "History of cholestatic jaundice/hepatic dysfunction associated with prior azithromycin use."
    ],
    SideEffects: [
      "Abdominal pain",
      "Diarrhea",
      "Headache"
    ],
    InStock: true,
    Unit: "3 Tablet(s) in Pack"
  },
  {
    _id: "med-006",
    Title: "Metformin 500mg Sustained Release (15s)",
    City: "Mbeya Urban",
    PharmacyName: "CarePlus Pharma",
    ImageUrl: "https://images.unsplash.com/photo-1628771065518-0d82f1938462?w=500&auto=format&fit=crop&q=60",
    Price: "11,200 Tsh",
    Discount: "10% OFF",
    Description: "Metformin is the first-line medication for the treatment of type 2 diabetes, particularly in people who are overweight.",
    Uses: "Management of type 2 diabetes mellitus to improve glycemic control.",
    Contraindications: [
      "Severe renal impairment (eGFR < 30 mL/min).",
      "Acute or chronic metabolic acidosis."
    ],
    SideEffects: [
      "Gastrointestinal disturbance",
      "Metallic taste",
      "Lactic acidosis (rare)"
    ],
    InStock: true,
    Unit: "15 Tablet(s) in Strip"
  },
  {
    _id: "med-007",
    Title: "Omeprazole 20mg Capsules (14s)",
    City: "Dodoma City",
    PharmacyName: "Capital Health Supplies",
    ImageUrl: "https://images.unsplash.com/photo-1584017911766-d451b3d0e843?w=500&auto=format&fit=crop&q=60",
    Price: "9,000 Tsh",
    Discount: "15% OFF",
    Description: "Omeprazole is a proton pump inhibitor (PPI) that decreases the amount of acid produced in the stomach.",
    Uses: "Treatment of GERD, peptic ulcer disease, and Zollinger-Ellison syndrome.",
    Contraindications: [
      "Concomitant use with nelfinavir or rilpivirine.",
      "Known hypersensitivity to substituted benzimidazoles."
    ],
    SideEffects: [
      "Headache",
      "Abdominal pain",
      "Flatulence"
    ],
    InStock: true,
    Unit: "14 Capsule(s) in Bottle"
  },
  {
    _id: "med-008",
    Title: "Cetirizine 10mg Allergy Relief (10s)",
    City: "Zanzibar Urban",
    PharmacyName: "Island Care Pharmacy",
    ImageUrl: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=500&auto=format&fit=crop&q=60",
    Price: "4,500 Tsh",
    Discount: "5% OFF",
    Description: "Cetirizine is a second-generation antihistamine used to reduce symptoms of hay fever, hives, and allergic reactions.",
    Uses: "Relief of symptoms associated with allergic rhinitis and chronic idiopathic urticaria.",
    Contraindications: [
      "Patients with end-stage renal disease.",
      "Severe allergy to cetirizine or hydroxyzine."
    ],
    SideEffects: [
      "Drowsiness",
      "Dry mouth",
      "Fatigue"
    ],
    InStock: true,
    Unit: "10 Tablet(s) per Pack"
  }
];
