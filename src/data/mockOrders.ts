import { Order } from '../types';

export const MOCK_ORDERS: Order[] = [
  {
    _id: "ord-001",
    orderNumber: "ORD-2024-001",
    pharmacistId: "usr-002",
    pharmacistName: "Dr. Tigist Alemu",
    vendorId: "usr-003",
    vendorName: "PFSA Central Medical Store",
    items: [
      { medicineId: "med-001", medicineName: "Ecosprin 75mg (14 Tablets)", quantity: 50, unitPrice: 650, unit: "Strip" },
      { medicineId: "med-003", medicineName: "Paracetamol 500mg (20 Tablets)", quantity: 100, unitPrice: 120, unit: "Pack" }
    ],
    totalAmount: 44500,
    status: "delivered",
    createdAt: "2024-07-15T08:30:00Z",
    updatedAt: "2024-07-20T14:00:00Z",
    deliveryAddress: "Tikur Anbessa Specialized Hospital, Addis Ababa",
  },
  {
    _id: "ord-002",
    orderNumber: "ORD-2024-002",
    pharmacistId: "usr-002",
    pharmacistName: "Dr. Tigist Alemu",
    vendorId: "usr-004",
    vendorName: "Hawassa University Referral Pharmacy",
    items: [
      { medicineId: "med-002", medicineName: "Amoxicillin 500mg (10 Capsules)", quantity: 200, unitPrice: 420, unit: "Strip" }
    ],
    totalAmount: 84000,
    status: "in_transit",
    createdAt: "2024-08-01T09:00:00Z",
    updatedAt: "2024-08-05T11:00:00Z",
    deliveryAddress: "Black Lion Hospital, Addis Ababa",
  },
  {
    _id: "ord-003",
    orderNumber: "ORD-2024-003",
    pharmacistId: "usr-002",
    pharmacistName: "Dr. Tigist Alemu",
    vendorId: "usr-003",
    vendorName: "PFSA Central Medical Store",
    items: [
      { medicineId: "med-009", medicineName: "Artemether-Lumefantrine (6 Tablets)", quantity: 300, unitPrice: 340, unit: "Course" },
      { medicineId: "med-010", medicineName: "ORS Sachets (10 sachets)", quantity: 500, unitPrice: 85, unit: "Box" }
    ],
    totalAmount: 144500,
    status: "approved",
    createdAt: "2024-08-08T07:00:00Z",
    updatedAt: "2024-08-09T10:30:00Z",
    deliveryAddress: "Yekatit 12 Hospital, Addis Ababa",
  },
  {
    _id: "ord-004",
    orderNumber: "ORD-2024-004",
    pharmacistId: "usr-005",
    pharmacistName: "Ato Dawit Bekele",
    vendorId: "usr-004",
    vendorName: "Hawassa University Referral Pharmacy",
    items: [
      { medicineId: "med-006", medicineName: "Metformin 500mg (15 Tablets)", quantity: 150, unitPrice: 560, unit: "Strip" }
    ],
    totalAmount: 84000,
    status: "requested",
    createdAt: "2024-08-10T08:00:00Z",
    updatedAt: "2024-08-10T08:00:00Z",
    deliveryAddress: "Hawassa Referral Hospital, Hawassa",
  },
  {
    _id: "ord-005",
    orderNumber: "ORD-2024-005",
    pharmacistId: "usr-002",
    pharmacistName: "Dr. Tigist Alemu",
    vendorId: "usr-003",
    vendorName: "PFSA Central Medical Store",
    items: [
      { medicineId: "med-007", medicineName: "Omeprazole 20mg (14 Capsules)", quantity: 80, unitPrice: 450, unit: "Bottle" },
      { medicineId: "med-008", medicineName: "Cetirizine 10mg (10 Tablets)", quantity: 120, unitPrice: 220, unit: "Pack" }
    ],
    totalAmount: 62400,
    status: "cancelled",
    createdAt: "2024-07-28T10:00:00Z",
    updatedAt: "2024-07-30T09:00:00Z",
    deliveryAddress: "Tikur Anbessa Specialized Hospital, Addis Ababa",
    notes: "Cancelled due to budget freeze."
  }
];
