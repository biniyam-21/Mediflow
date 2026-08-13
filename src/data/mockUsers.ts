import { User, Notification } from '../types';

export const MOCK_USERS: User[] = [
  {
    _id: "usr-001",
    name: "Abebe Girma",
    email: "admin@mediflow.et",
    role: "admin",
    organization: "MediFlow Ethiopia",
    city: "Addis Ababa",
    region: "Addis Ababa City Administration",
    status: "active",
    joinedAt: "2023-01-10T00:00:00Z"
  },
  {
    _id: "usr-002",
    name: "Dr. Tigist Alemu",
    email: "tigist@tikuranbessa.et",
    role: "pharmacist",
    organization: "Tikur Anbessa Specialized Hospital",
    city: "Addis Ababa",
    region: "Addis Ababa City Administration",
    licenseNumber: "FMHACA-PH-2021-0045",
    status: "active",
    joinedAt: "2023-03-15T00:00:00Z"
  },
  {
    _id: "usr-003",
    name: "Ato Solomon Tadesse",
    email: "solomon@pfsa.et",
    role: "vendor",
    organization: "PFSA Central Medical Store",
    city: "Addis Ababa",
    region: "Addis Ababa City Administration",
    licenseNumber: "FMHACA-VN-2020-0012",
    status: "active",
    joinedAt: "2023-02-01T00:00:00Z"
  },
  {
    _id: "usr-004",
    name: "W/ro Mekdes Haile",
    email: "mekdes@hawassauni.et",
    role: "vendor",
    organization: "Hawassa University Referral Pharmacy",
    city: "Hawassa",
    region: "Sidama Region",
    licenseNumber: "FMHACA-VN-2021-0088",
    status: "active",
    joinedAt: "2023-05-20T00:00:00Z"
  },
  {
    _id: "usr-005",
    name: "Ato Dawit Bekele",
    email: "dawit@hawassaref.et",
    role: "pharmacist",
    organization: "Hawassa Referral Hospital",
    city: "Hawassa",
    region: "Sidama Region",
    licenseNumber: "FMHACA-PH-2022-0101",
    status: "active",
    joinedAt: "2023-06-01T00:00:00Z"
  },
  {
    _id: "usr-006",
    name: "Dr. Yonas Kebede",
    email: "yonas@felegeref.et",
    role: "pharmacist",
    organization: "Felege Hiwot Referral Hospital",
    city: "Bahir Dar",
    region: "Amhara Region",
    licenseNumber: "FMHACA-PH-2022-0233",
    status: "pending",
    joinedAt: "2024-07-28T00:00:00Z"
  },
  {
    _id: "usr-007",
    name: "W/o Selamawit Getachew",
    email: "selam@globalmedstore.et",
    role: "vendor",
    organization: "Global Med Store PLC",
    city: "Addis Ababa",
    region: "Addis Ababa City Administration",
    licenseNumber: "FMHACA-VN-2024-0456",
    status: "pending",
    joinedAt: "2024-08-01T00:00:00Z"
  }
];

export const MOCK_NOTIFICATIONS: Notification[] = [
  {
    _id: "notif-001",
    userId: "usr-002",
    type: "order_update",
    title: "Order ORD-2024-002 is In Transit",
    message: "Your order of 200 strips of Amoxicillin 500mg has been dispatched and is now in transit to Black Lion Hospital.",
    read: false,
    createdAt: "2024-08-05T11:00:00Z"
  },
  {
    _id: "notif-002",
    userId: "usr-002",
    type: "restock_alert",
    title: "Low Stock: Artemether-Lumefantrine",
    message: "Artemether-Lumefantrine 80/480mg is running low at Yekatit 12 Hospital Pharmacy. Current stock: 12 courses remaining.",
    read: false,
    createdAt: "2024-08-09T07:30:00Z"
  },
  {
    _id: "notif-003",
    userId: "usr-002",
    type: "expiry_warning",
    title: "Expiry Warning: Ecosprin 75mg",
    message: "Ecosprin 75mg (Batch #ETH-2024-E01) expires on Aug 1, 2026. Please arrange timely dispensing or return.",
    read: true,
    createdAt: "2024-08-01T08:00:00Z"
  },
  {
    _id: "notif-004",
    userId: "usr-002",
    type: "order_update",
    title: "Order ORD-2024-001 Delivered",
    message: "Your order of Ecosprin 75mg and Paracetamol 500mg has been successfully delivered to Tikur Anbessa Hospital.",
    read: true,
    createdAt: "2024-07-20T14:00:00Z"
  },
  {
    _id: "notif-005",
    userId: "usr-002",
    type: "system",
    title: "Welcome to MediFlow Ethiopia",
    message: "Your pharmacist account has been verified and approved by the system administrator. You can now place orders.",
    read: true,
    createdAt: "2023-03-15T09:00:00Z"
  }
];
