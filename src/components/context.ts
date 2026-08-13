import { createContext, Dispatch, SetStateAction } from "react";
import { Medicine } from "../types";

export type MedContextType = [
  Medicine[],
  Dispatch<SetStateAction<Medicine[]>>,
  string,
  Dispatch<SetStateAction<string>>
];

const medContext = createContext<MedContextType>([
  [],
  () => {},
  "",
  () => {}
]);

export default medContext;
