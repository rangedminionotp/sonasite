import { createContext } from "react";

export interface User {
  id: string;
  name: string;
}

// step one context
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
export const StepOneContext = createContext<StepOneContextType | null>(null);

// step two context
export interface Summoner {
  summonerName: string;
  summonerId: string;
  summonerImg: string;
}
export interface SummonerPair {
  summonerOne: Summoner;
  summonerTwo: Summoner;
  description: string;
}

export interface StepTwoProps {
  summonerPair: SummonerPair;
  setSummonerPair: (summonerPair: SummonerPair) => void;
}

export interface StepTwoContextType {
  summonerPairs: SummonerPair[];
  setSummonerPairs: (summonerPairs: SummonerPair[]) => void;
}
export const StepTwoContext = createContext<StepTwoContextType | null>(null);

export interface GuideContextType {
  guideID: string;
  setGuideID: (guideID: string) => void;
  user: User;
  setUser: (user: User) => void;
  completed: boolean;
  setCompleted: (completed: boolean) => void;
  stepOne: StepOneProps;
  setStepOne: (stepOne: StepOneProps) => void;
}
export const GuideContext = createContext<GuideContextType | null>(null);