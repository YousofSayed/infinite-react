export type gradientValues = {
  direction: string;
  type: "linear" | "radial";
  colors: [
    {
      color: string;
      opacity: string;
    }
  ];
}[];
