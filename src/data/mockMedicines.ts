import { Medicine } from '../types';

export const MOCK_MEDICINES: Medicine[] = [
  {
    _id: "med-001",
    Title: "Ecosprin 75mg (Antiplatelet) — 14 Tablets",
    City: "Addis Ababa",
    PharmacyName: "Yekatit 12 Hospital Pharmacy",
    ImageUrl: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=500&auto=format&fit=crop&q=60",
    Price: "650 ETB",
    Discount: "15% OFF",
    Description: "Ecosprin 75 is an antiplatelet medicine used to prevent the risk of heart attacks, stroke and angina. Widely used in Ethiopian cardiac care centers.",
    Uses: "Prevention of heart attack, clot-related stroke (ischemic), stable or unstable angina.",
    Contraindications: [
      "Allergy to aspirin or its ingredients.",
      "Active bleeding or clotting disorders like haemophilia.",
      "History of stomach or intestinal bleeding.",
      "Gout, liver or kidney disorder."
    ],
    SideEffects: ["Indigestion", "Nausea", "Vomiting", "Diarrhoea", "Increased bleeding risk"],
    InStock: true,
    Unit: "14 Tablet(s) in Strip",
    ExpiryDate: "2026-08-01",
    Category: "Cardiovascular"
  },
  {
    _id: "med-002",
    Title: "Amoxicillin 500mg Capsules (10s)",
    City: "Hawassa",
    PharmacyName: "Hawassa University Referral Pharmacy",
    ImageUrl: "https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=500&auto=format&fit=crop&q=60",
    Price: "420 ETB",
    Discount: "10% OFF",
    Description: "Amoxicillin is a penicillin antibiotic that fights bacteria. It treats tonsillitis, bronchitis, pneumonia, ear, nose, throat, skin, and urinary tract infections.",
    Uses: "Treatment of bacterial infections including respiratory tract, middle ear, sinus, skin, and urinary tract infections.",
    Contraindications: [
      "Known hypersensitivity to penicillin or cephalosporins.",
      "Patients with infectious mononucleosis."
    ],
    SideEffects: ["Skin rash", "Nausea", "Mild diarrhea"],
    InStock: true,
    Unit: "10 Capsule(s) in Strip",
    ExpiryDate: "2027-03-15",
    Category: "Antibiotics"
  },
  {
    _id: "med-003",
    Title: "Paracetamol 500mg Tablets (20s)",
    City: "Bahir Dar",
    PharmacyName: "Felege Hiwot Referral Pharmacy",
    ImageUrl: "https://images.unsplash.com/photo-1550572017-edf7928956b7?w=500&auto=format&fit=crop&q=60",
    Price: "120 ETB",
    Discount: "5% OFF",
    Description: "Paracetamol is a widely used analgesic and antipyretic for mild to moderate pain relief and fever reduction.",
    Uses: "Relief of mild to moderate pain including headache, toothache, muscle aches, and fever reduction.",
    Contraindications: [
      "Severe liver impairment or active liver disease.",
      "Hypersensitivity to paracetamol."
    ],
    SideEffects: ["Allergic reactions (rare)", "Nausea if taken on empty stomach"],
    InStock: true,
    Unit: "20 Tablet(s) per Pack",
    ExpiryDate: "2026-11-20",
    Category: "Analgesics"
  },
  {
    _id: "med-004",
    Title: "Ibuprofen 400mg Tablets (10s)",
    City: "Dire Dawa",
    PharmacyName: "Dil Chora Referral Pharmacy",
    ImageUrl: "https://images.unsplash.com/photo-1585435557343-3b092031a831?w=500&auto=format&fit=crop&q=60",
    Price: "280 ETB",
    Discount: "12% OFF",
    Description: "Ibuprofen is a nonsteroidal anti-inflammatory drug (NSAID) used for relieving pain, reducing inflammation, and lowering fever.",
    Uses: "Pain relief for arthritis, dental pain, menstrual cramps, muscular aches, and acute inflammation.",
    Contraindications: [
      "Active stomach ulcer or history of GI bleeding.",
      "Severe heart failure or kidney failure."
    ],
    SideEffects: ["Heartburn", "Stomach upset", "Dizziness"],
    InStock: true,
    Unit: "10 Tablet(s) in Strip",
    ExpiryDate: "2027-01-10",
    Category: "Analgesics"
  },
  {
    _id: "med-005",
    Title: "Azithromycin 500mg Tablets (3s)",
    City: "Mekelle",
    PharmacyName: "Ayder Referral Pharmacy",
    ImageUrl: "https://images.unsplash.com/photo-1576602976047-174e57a47881?w=500&auto=format&fit=crop&q=60",
    Price: "780 ETB",
    Discount: "8% OFF",
    Description: "Azithromycin is a broad-spectrum macrolide antibiotic used to treat various bacterial infections, including respiratory and skin infections.",
    Uses: "Community-acquired pneumonia, strep throat, sinusitis, skin infections.",
    Contraindications: [
      "History of cholestatic jaundice associated with prior azithromycin use."
    ],
    SideEffects: ["Abdominal pain", "Diarrhea", "Headache"],
    InStock: true,
    Unit: "3 Tablet(s) in Pack",
    ExpiryDate: "2026-09-01",
    Category: "Antibiotics"
  },
  {
    _id: "med-006",
    Title: "Metformin 500mg Sustained Release (15s)",
    City: "Jimma",
    PharmacyName: "Jimma University Medical Center Pharmacy",
    ImageUrl: "https://images.unsplash.com/photo-1628771065518-0d82f1938462?w=500&auto=format&fit=crop&q=60",
    Price: "560 ETB",
    Discount: "10% OFF",
    Description: "Metformin is the first-line medication for treatment of type 2 diabetes, particularly in people who are overweight. Widely prescribed in Ethiopian diabetes clinics.",
    Uses: "Management of type 2 diabetes mellitus to improve glycemic control.",
    Contraindications: [
      "Severe renal impairment (eGFR < 30 mL/min).",
      "Acute or chronic metabolic acidosis."
    ],
    SideEffects: ["Gastrointestinal disturbance", "Metallic taste", "Lactic acidosis (rare)"],
    InStock: true,
    Unit: "15 Tablet(s) in Strip",
    ExpiryDate: "2027-05-30",
    Category: "Diabetes"
  },
  {
    _id: "med-007",
    Title: "Omeprazole 20mg Capsules (14s)",
    City: "Adama",
    PharmacyName: "Adama General Hospital Pharmacy",
    ImageUrl: "https://images.unsplash.com/photo-1584017911766-d451b3d0e843?w=500&auto=format&fit=crop&q=60",
    Price: "450 ETB",
    Discount: "15% OFF",
    Description: "Omeprazole is a proton pump inhibitor (PPI) that decreases the amount of acid produced in the stomach.",
    Uses: "Treatment of GERD, peptic ulcer disease, and Zollinger-Ellison syndrome.",
    Contraindications: [
      "Concomitant use with nelfinavir or rilpivirine.",
      "Known hypersensitivity to substituted benzimidazoles."
    ],
    SideEffects: ["Headache", "Abdominal pain", "Flatulence"],
    InStock: true,
    Unit: "14 Capsule(s) in Bottle",
    ExpiryDate: "2026-12-01",
    Category: "Gastrointestinal"
  },
  {
    _id: "med-008",
    Title: "Cetirizine 10mg Allergy Relief (10s)",
    City: "Gondar",
    PharmacyName: "University of Gondar Hospital Pharmacy",
    ImageUrl: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=500&auto=format&fit=crop&q=60",
    Price: "220 ETB",
    Discount: "5% OFF",
    Description: "Cetirizine is a second-generation antihistamine used to reduce symptoms of hay fever, hives, and allergic reactions.",
    Uses: "Relief of symptoms associated with allergic rhinitis and chronic idiopathic urticaria.",
    Contraindications: [
      "Patients with end-stage renal disease.",
      "Severe allergy to cetirizine or hydroxyzine."
    ],
    SideEffects: ["Drowsiness", "Dry mouth", "Fatigue"],
    InStock: true,
    Unit: "10 Tablet(s) per Pack",
    ExpiryDate: "2027-02-14",
    Category: "Antihistamines"
  },
  {
    _id: "med-009",
    Title: "Artemether-Lumefantrine 80/480mg (6s)",
    City: "Addis Ababa",
    PharmacyName: "PFSA Central Medical Store",
    ImageUrl: "https://images.unsplash.com/photo-1576602976047-174e57a47881?w=500&auto=format&fit=crop&q=60",
    Price: "340 ETB",
    Discount: "0% OFF",
    Description: "Artemether-Lumefantrine is a fixed-dose combination antimalarial medication. It is the first-line treatment for uncomplicated falciparum malaria in Ethiopia.",
    Uses: "Treatment of uncomplicated Plasmodium falciparum malaria.",
    Contraindications: [
      "First trimester of pregnancy.",
      "Known hypersensitivity to artemether or lumefantrine."
    ],
    SideEffects: ["Headache", "Dizziness", "Nausea", "Vomiting"],
    InStock: true,
    Unit: "6 Tablet(s) per Course",
    ExpiryDate: "2026-07-01",
    Category: "Antimalarials"
  },
  {
    _id: "med-010",
    Title: "ORS Oral Rehydration Salts (10 sachets)",
    City: "Hawassa",
    PharmacyName: "Southern Region Health Bureau",
    ImageUrl: "https://images.unsplash.com/photo-1550572017-edf7928956b7?w=500&auto=format&fit=crop&q=60",
    Price: "85 ETB",
    Discount: "0% OFF",
    Description: "Oral Rehydration Salts (ORS) are used to prevent and treat dehydration from diarrhea. A critical supply item for Ethiopian health posts and hospitals.",
    Uses: "Prevention and treatment of dehydration from diarrhea and vomiting.",
    Contraindications: ["None"],
    SideEffects: ["Nausea (rare)"],
    InStock: true,
    Unit: "10 Sachets per Box",
    ExpiryDate: "2028-01-01",
    Category: "Essential Medicines"
  }
];
