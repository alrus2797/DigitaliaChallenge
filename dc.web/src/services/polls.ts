import axios from "axios";
import { baseUrl } from "../constants";
import { Poll } from "../types/Poll";


export const getPolls = async () => {
  const response = await axios.get<Poll>(`${baseUrl}/polls`);
  return response.data;
};

export const createPoll = async (poll: Poll, accessToken: string) => {
  const response = await axios.post<Poll>(`${baseUrl}/polls`, poll, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response.data;
}
