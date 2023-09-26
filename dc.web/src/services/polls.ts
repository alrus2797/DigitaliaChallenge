import axios from "axios";
import { baseUrl } from "../constants";
import { Poll } from "../types/Poll";


export const getPolls = async () => {
  const response = await axios.get<Poll>(`${baseUrl}/polls`);
  return response.data;
  
};
