import { UserContextType } from "../types/interfaces";
import { createContext } from "react";

export const userContext = createContext<UserContextType | undefined>(
  undefined
);
