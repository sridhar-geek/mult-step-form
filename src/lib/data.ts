import { CheckBox, Plans } from "./types";

export const checkboxData: CheckBox[] = [
  {
    id: 1,
    name: "Online service",
    description: "Access to multiplayer games",
    monthlyPrice: 1,
    yearlyPrice: 10,
  },
  {
    id: 2,
    name: "Larger storage",
    description: " Extra 1TB of cloud save",
    monthlyPrice: 2,
    yearlyPrice: 20,
  },
  {
    id: 3,
    name: "Customizable profile",
    description: "Custom theme on your profile",
    monthlyPrice: 2,
    yearlyPrice: 20,
  },
];

export const plans: Plans[] = [
  {
    label: "Arcade",
    value: "Arcade",
    icon: "/icon-arcade.svg",
    monthlyPrice: 9,
    yearlyPrice: 90,
  },
  {
    label: "Advanced",
    value: "Advanced",
    icon: "/icon-advanced.svg",
    monthlyPrice: 12,
    yearlyPrice: 120,
  },
  {
    label: "Pro",
    value: "Pro",
    icon: "/icon-pro.svg",
    monthlyPrice: 15,
    yearlyPrice: 150,
  },
];

