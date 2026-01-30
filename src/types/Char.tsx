export type CharStatus = "pending" | "incorrect" | "correct";

export type Char = {
  char: string;
  status: CharStatus;
  index: number;
};
