export type Char = {
  key: number;
  ref: any;
  status: "pending" | "incorrect" | "correct";
  index: number;
  char: string;
};
