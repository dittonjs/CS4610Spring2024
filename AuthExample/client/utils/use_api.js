import { useContext } from "react";
import { ApiContext } from "./api";


export const useApi = () => {
  return useContext(ApiContext);
}