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

export type Animations = {
  name: string;
  values: { percentage: number; styles: CSSStyleDeclaration }[];
}[];

export type PreviewData = {
  scripts: object;
  styles: object;
  html: string;
  css: string;
};
