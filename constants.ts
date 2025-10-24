
import { Droplets, Zap, Thermometer, Flame, Wrench } from 'lucide-react';
import { NavItem } from './types';

export const NAV_ITEMS: NavItem[] = [
  { name: 'Water', icon: Droplets },
  { name: 'Electricity', icon: Zap },
  { name: 'HVAC', icon: Thermometer },
  { name: 'Firefighting', icon: Flame },
  { name: 'STP Plant', icon: Wrench },
];

export const monthlyConsumptionData = [
  { name: 'Jan', consumption: 4000, loss: 240 },
  { name: 'Feb', consumption: 3000, loss: 139 },
  { name: 'Mar', consumption: 2000, loss: 980 },
  { name: 'Apr', consumption: 2780, loss: 390 },
  { name: 'May', consumption: 1890, loss: 480 },
  { name: 'Jun', consumption: 2390, loss: 380 },
  { name: 'Jul', consumption: 3490, loss: 430 },
];

export const waterLossData = [
  { name: 'Main Line Leakage', value: 400 },
  { name: 'Distribution Faults', value: 300 },
  { name: 'Metering Inaccuracy', value: 300 },
  { name: 'Unauthorized Use', value: 200 },
];

export const waterKpiData = [
    { title: "Main Tank Level", value: "85%", change: "+2%", isPositive: true },
    { title: "Booster Pump Status", value: "4/5 Active", change: "", isPositive: true },
    { title: "Total Consumption (Today)", value: "1.2 ML", change: "-5%", isPositive: true },
    { title: "System Pressure", value: "4.5 Bar", change: "+0.1 Bar", isPositive: true },
]
