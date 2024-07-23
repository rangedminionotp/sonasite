import { createContext } from "react";

export interface StepOneProps {
  title: string;
  description: string;
  roles: string[];
  labels: string[];
}

export interface StepOneContextType {
  selectedRoles: string[];
  setSelectedRoles: (roles: string[]) => void;
  selectedLabels: string[];
  setSelectedLabels: (labels: string[]) => void;
  title: string;
  setSelectedTitle: (title: string) => void;
  description: string;
  setSelectedDescription: (description: string) => void;
}
export const StepOneContext = createContext<StepOneContextType>({
  selectedRoles: [],
  setSelectedRoles: () => {},
  selectedLabels: [],
  setSelectedLabels: () => {},
  title: "",
  setSelectedTitle: () => {},
  description: "",
  setSelectedDescription: () => {},
});
