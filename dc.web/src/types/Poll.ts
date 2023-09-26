import { PollChoice } from "./PollChoice";

export interface Poll {
  id: string;
  title: string;
  description: string;
  endDate: Date;
  pollChoices: PollChoice[];
}