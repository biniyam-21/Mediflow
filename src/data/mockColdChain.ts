import { ColdChainLog } from '../types';

export const MOCK_COLD_CHAIN_LOGS: Record<string, ColdChainLog> = {
  'med-004': {
    medicineId: 'med-004',
    medicineName: 'Insulin Human Injection 100 IU/ml',
    batchNumber: 'ETH-INS-2024-B09',
    minTemp: 2.0,
    maxTemp: 8.0,
    targetTemp: '2.0°C – 8.0°C (Refrigerated Cold Chain)',
    overallStatus: 'safe',
    lastChecked: '2024-08-13T14:30:00Z',
    points: [
      { time: '08:00 EAT', temperature: 4.2, status: 'safe', location: 'PFSA Central Cold Room (Addis Ababa)' },
      { time: '10:00 EAT', temperature: 4.8, status: 'safe', location: 'Refrigerated Transport Van #04' },
      { time: '12:00 EAT', temperature: 5.4, status: 'safe', location: 'Transit — Modjo Checkpoint' },
      { time: '14:00 EAT', temperature: 4.6, status: 'safe', location: 'Tikur Anbessa Hospital Receiving' },
    ],
  },
  'med-008': {
    medicineId: 'med-008',
    medicineName: 'Rabies Vaccine (Human Diploid Cell)',
    batchNumber: 'ETH-VAC-2024-R11',
    minTemp: 2.0,
    maxTemp: 8.0,
    targetTemp: '2.0°C – 8.0°C (Do Not Freeze)',
    overallStatus: 'warning',
    lastChecked: '2024-08-13T15:15:00Z',
    points: [
      { time: '07:30 EAT', temperature: 3.8, status: 'safe', location: 'Hawassa Cold Storage Unit' },
      { time: '09:30 EAT', temperature: 6.9, status: 'safe', location: 'Local Courier Bike Container' },
      { time: '11:30 EAT', temperature: 7.9, status: 'warning', location: 'Transit — Ambient Temp 31°C outside' },
      { time: '13:30 EAT', temperature: 5.1, status: 'safe', location: 'Felege Hiwot Pharmacy Cold Box' },
    ],
  },
  'med-012': {
    medicineId: 'med-012',
    medicineName: 'Oxytocin Injection 10 IU/ml',
    batchNumber: 'ETH-OXY-2024-O02',
    minTemp: 2.0,
    maxTemp: 8.0,
    targetTemp: '2.0°C – 8.0°C (Maternal Care Cold Chain)',
    overallStatus: 'safe',
    lastChecked: '2024-08-13T13:00:00Z',
    points: [
      { time: '06:00 EAT', temperature: 3.5, status: 'safe', location: 'EPHARM Factory Cold Room' },
      { time: '09:00 EAT', temperature: 4.1, status: 'safe', location: 'PFSA Logistics Hub' },
      { time: '12:00 EAT', temperature: 4.5, status: 'safe', location: 'Jimma University Med Center' },
    ],
  },
};
