export type Char = {
  key: number;
  ref: React.RefObject<HTMLParagraphElement> | null;
  status: string;
  index: number;
  char: string;
};
