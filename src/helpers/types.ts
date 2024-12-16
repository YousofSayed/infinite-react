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

export interface CMD {
  cmd: string;
  desc: string;
  ex: string;
  name: string;
  id: string;
  options:{
    [key : string] : string,
  },
  optionsRequired : boolean,
  optionValue:string,
  params: {
    name: string;
    type: "text" | "select" | "object" | "array" | "number" | "code";
    value: string | object | string[];
    keywords?: string[];
    lang: "html" | "javascript" | "css";
    handler:boolean,
    accessVars:boolean,
    required: boolean;
  }[];
};

export interface RestAPIModel {
  method:string,
  url:string,
  name:string,
  headers:HeadersInit ,
  body:BodyInit ,
  response:string
}


