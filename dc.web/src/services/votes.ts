import axios from 'axios'
import { baseUrl } from '../constants';
import { Vote } from '../types/Vote';
import { PollChoice } from '../types';

export const createVote = async (vote: Vote) => {
  const response = await axios.post<Vote>(`${baseUrl}/votes`, vote);
  return response.data;
}

export const getVotedChoice = async (pollId: string, author: string) => {
  const response = await axios.get<PollChoice[]>(`${baseUrl}/votes/${pollId}/${author}`);
  return response.data;
}