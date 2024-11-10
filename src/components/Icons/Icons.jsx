import { Path } from "../Protos/Path";
export const Icons = {
  components: (strokeColor, strokeWidth) => (
    <svg
      width="23"
      height="22"
      viewBox="0 0 23 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Path
        d="M5.75001 5.25L17.25 16.75M17.25 5.25L5.75001 16.75M20.45 13.55L14.06 19.94C12.66 21.34 10.36 21.34 8.95001 19.94L2.56001 13.55C1.16001 12.15 1.16001 9.85 2.56001 8.44L8.95001 2.05C10.35 0.65 12.65 0.65 14.06 2.05L20.45 8.44C21.85 9.85 21.85 12.15 20.45 13.55Z"
        stroke={strokeColor}
        strokeWidth={strokeWidth}
      />
    </svg>
  ),
  select: (strokeColor, strokeWidth, fill) => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      width={24}
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
      <g
        id="SVGRepo_tracerCarrier"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></g>
      <g id="SVGRepo_iconCarrier">
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M12.0001 5.49939C8.40993 5.49939 5.49951 8.40981 5.49951 12C5.49951 15.5902 8.40993 18.5006 12.0001 18.5006C15.5903 18.5006 18.5007 15.5902 18.5007 12C18.5007 8.40981 15.5903 5.49939 12.0001 5.49939ZM3.99951 12C3.99951 7.58139 7.58151 3.99939 12.0001 3.99939C16.4187 3.99939 20.0007 7.58139 20.0007 12C20.0007 16.4186 16.4187 20.0006 12.0001 20.0006C7.58151 20.0006 3.99951 16.4186 3.99951 12Z"
          fill={fill}
          stroke={strokeColor}
          strokeWidth={strokeWidth}
        ></Path>
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M12.0002 9.5C10.6194 9.5 9.50016 10.6193 9.50016 12C9.50016 13.3807 10.6194 14.5 12.0002 14.5C13.3809 14.5 14.5002 13.3807 14.5002 12C14.5002 10.6193 13.3809 9.5 12.0002 9.5ZM8.00016 12C8.00016 9.79086 9.79102 8 12.0002 8C14.2093 8 16.0002 9.79086 16.0002 12C16.0002 14.2091 14.2093 16 12.0002 16C9.79102 16 8.00016 14.2091 8.00016 12Z"
          fill={fill}
          stroke={strokeColor}
          strokeWidth={strokeWidth}
        ></Path>
      </g>
    </svg>
  ),
  db: (strokeColor, strokeWidth) => (
    <svg
      width="25"
      height="24"
      viewBox="0 0 25 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Path
        d="M19 12.65V16.35C19 19.47 16.09 22 12.5 22C8.91 22 6 19.47 6 16.35V12.65C6 15.77 8.91 18 12.5 18C16.09 18 19 15.77 19 12.65Z"
        stroke={strokeColor}
        strokeWidth={strokeWidth}
      />
      <Path
        d="M19 7.65C19 8.56 18.75 9.4 18.31 10.12C17.24 11.88 15.04 13 12.5 13C9.96 13 7.76 11.88 6.69 10.12C6.25 9.4 6 8.56 6 7.65C6 6.09 6.73 4.68 7.9 3.66C9.08 2.63 10.7 2 12.5 2C14.3 2 15.92 2.63 17.1 3.65C18.27 4.68 19 6.09 19 7.65Z"
        stroke={strokeColor}
        strokeWidth={strokeWidth}
      />
      <Path
        d="M19 7.65V12.65C19 15.77 16.09 18 12.5 18C8.91 18 6 15.77 6 12.65V7.65C6 4.53 8.91 2 12.5 2C14.3 2 15.92 2.63 17.1 3.65C18.27 4.68 19 6.09 19 7.65Z"
        stroke={strokeColor}
        strokeWidth={strokeWidth}
      />
    </svg>
  ),
  close: (strokeColor, strokeWidth, fill) => (
    <svg
      width="20px"
      height="20px"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{cursor:'pointer'}}
    >
      <g  strokeWidth="0"></g>
      <g
        strokeLinecap="round"
        strokeLinejoin="round"
      ></g>
      <g >
        {" "}
        <g >
          {" "}
          <Path
            d="M18 18L12 12M12 12L6 6M12 12L18 6M12 12L6 18"
            strokeLinecap="round"
            strokeLinejoin="round"
            stroke={strokeColor}
            strokeWidth={strokeWidth}
          ></Path>{" "}
        </g>{" "}
      </g>
    </svg>
  ),
  gallery: (strokeColor, strokeWidth) => (
    <svg
      width="25"
      height="24"
      viewBox="0 0 25 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Path
        d="M9.5 22H15.5C20.5 22 22.5 20 22.5 15V9C22.5 4 20.5 2 15.5 2H9.5C4.5 2 2.5 4 2.5 9V15C2.5 20 4.5 22 9.5 22Z"
        stroke={strokeColor}
        strokeWidth={strokeWidth}
      />
      <Path
        d="M3.17004 18.95L8.10004 15.64C8.89004 15.11 10.03 15.17 10.74 15.78L11.07 16.07C11.85 16.74 13.11 16.74 13.89 16.07L18.05 12.5C18.83 11.83 20.09 11.83 20.87 12.5L22.5 13.9M9.50004 10C10.0305 10 10.5392 9.78929 10.9143 9.41421C11.2893 9.03914 11.5 8.53043 11.5 8C11.5 7.46957 11.2893 6.96086 10.9143 6.58579C10.5392 6.21071 10.0305 6 9.50004 6C8.96961 6 8.4609 6.21071 8.08583 6.58579C7.71076 6.96086 7.50004 7.46957 7.50004 8C7.50004 8.53043 7.71076 9.03914 8.08583 9.41421C8.4609 9.78929 8.96961 10 9.50004 10Z"
        stroke={strokeColor}
        strokeWidth={strokeWidth}
      />
    </svg>
  ),
  plus: (strokeColor, strokeWidth) => (
    <svg
      width="20"
      height="20"
      viewBox="0 0 15 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Path
        d="M1.5 7H13.5M7.5 13V1"
        stroke={strokeColor}
        strokeWidth={strokeWidth}
      />
    </svg>
  ),

  logo: (strokeColor, strokeWidth) => (
    <svg
      width="43"
      height="43"
      viewBox="0 0 43 43"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="43" height="43" rx="21.5" fill="#2563EB" />
      <Path
        d="M20.18 18.32C19.7657 17.7412 19.2194 17.2697 18.5863 16.9444C17.9533 16.6192 17.2517 16.4497 16.54 16.45C14.03 16.45 11.99 18.49 11.99 21C11.99 23.51 14.03 25.55 16.54 25.55C18.23 25.55 19.8 24.66 20.67 23.21L22 21L23.32 18.79C23.748 18.0768 24.3533 17.4865 25.077 17.0765C25.8007 16.6664 26.6182 16.4506 27.45 16.45C29.96 16.45 32 18.49 32 21C32 23.51 29.96 25.55 27.45 25.55C25.95 25.55 24.64 24.81 23.81 23.68"
        stroke="white"
        strokeWidth="1.5"
      />
    </svg>
  ),
  square: (strokeColor, strokeWidth) => (
    <svg width="23" height="23" fill="none" viewBox="0 0 24 24">
      <Path
        fill="#cbd5e1"
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        d="M15,5H17V3H15M15,21H17V19H15M11,5H13V3H11M19,5H21V3H19M19,9H21V7H19M19,21H21V19H19M19,13H21V11H19M19,17H21V15H19M3,5H5V3H3M3,9H5V7H3M3,13H5V11H3M3,17H5V15H3M3,21H5V19H3M11,21H13V19H11M7,21H9V19H7M7,5H9V3H7V5Z"
      ></Path>
    </svg>
  ),
  newLine: (strokeColor, strokeWidth) => (
    <svg
      fill="transparent"
      width="20px"
      height="20px"
      viewBox="0 0 32 32"
      id="icon"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
      <g
        id="SVGRepo_tracerCarrier"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></g>
      <g id="SVGRepo_iconCarrier">
        <title>new-line</title>
        <Path
          fill="#cbd5e1"
          stroke={strokeColor}
          strokeWidth={strokeWidth}
          d="M20.5859,14.4141,24.1719,18H6V8H4V18a2.0024,2.0024,0,0,0,2,2H24.1719L20.586,23.5859,22,25l6-6-6-6Z"
        ></Path>
        <rect
          id="_Transparent_Rectangle_"
          data-name="<Transparent Rectangle>"
          className="cls-1"
          width="24"
          height="24"
        ></rect>
      </g>
    </svg>
  ),
  layers: (strokeColor, strokeWidth) => (
    <svg width="23" height="23" fill="none" viewBox="0 0 24 24">
      <Path
        justFillOnHover={true}
        fill="#64748B"
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        d="M12,16L19.36,10.27L21,9L12,2L3,9L4.63,10.27M12,18.54L4.62,12.81L3,14.07L12,21.07L21,14.07L19.37,12.8L12,18.54Z"
      ></Path>
    </svg>
  ),
  style: (strokeColor, strokeWidth) => (
    <svg width="25" height="25" fill="none" viewBox="0 0 24 24">
      <Path
        fill="#cbd5e1"
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        fillRule="evenodd"
        d="M13 21v-8h8v8h-8zm2-6h4v4h-4v-4zM3 11V3h8v8H3zm2-6h4v4H5V5z"
        clipRule="evenodd"
      />
      <path fill="#cbd5e1" d="M18 6v6h-2V8h-4V6h6zM12 18H6v-6h2v4h4v2z" />
    </svg>
  ),
  stNote: (strokeColor, strokeWidth) => (
    <svg
      width="25"
      height="24"
      viewBox="0 0 25 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Path
        d="M8.5 2V5M16.5 2V5M7.5 11H15.5M7.5 15H12.5M15.5 22H9.5C4.5 22 3.5 19.94 3.5 15.82V9.65C3.5 4.95 5.17 3.69 8.5 3.5H16.5C19.83 3.68 21.5 4.95 21.5 9.65V16"
        strokeMiterlimit="10"
        stroke={strokeColor}
        strokeWidth={strokeWidth}
      />
      <Path
        d="M21.5 16L15.5 22V19C15.5 17 16.5 16 18.5 16H21.5Z"
        stroke={strokeColor}
        strokeWidth={strokeWidth}
      />
    </svg>
  ),
  git: (strokeColor, strokeWidth) => (
    <svg
      width="25"
      height="24"
      viewBox="0 0 25 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Path
        d="M5.5 15V8M5.5 8C6.29565 8 7.05871 7.68393 7.62132 7.12132C8.18393 6.55871 8.5 5.79565 8.5 5C8.5 4.20435 8.18393 3.44129 7.62132 2.87868C7.05871 2.31607 6.29565 2 5.5 2C4.70435 2 3.94129 2.31607 3.37868 2.87868C2.81607 3.44129 2.5 4.20435 2.5 5C2.5 5.79565 2.81607 6.55871 3.37868 7.12132C3.94129 7.68393 4.70435 8 5.5 8ZM5.63 15C5.85603 14.1278 6.36593 13.3556 7.07931 12.8052C7.79269 12.2547 8.66896 11.9574 9.57 11.96L13 11.97C15.62 11.98 17.85 10.3 18.67 7.96M5.75 22C6.61195 22 7.4386 21.6576 8.0481 21.0481C8.65759 20.4386 9 19.612 9 18.75C9 17.888 8.65759 17.0614 8.0481 16.4519C7.4386 15.8424 6.61195 15.5 5.75 15.5C4.88805 15.5 4.0614 15.8424 3.4519 16.4519C2.84241 17.0614 2.5 17.888 2.5 18.75C2.5 19.612 2.84241 20.4386 3.4519 21.0481C4.0614 21.6576 4.88805 22 5.75 22ZM19.5 8C20.2956 8 21.0587 7.68393 21.6213 7.12132C22.1839 6.55871 22.5 5.79565 22.5 5C22.5 4.20435 22.1839 3.44129 21.6213 2.87868C21.0587 2.31607 20.2956 2 19.5 2C18.7044 2 17.9413 2.31607 17.3787 2.87868C16.8161 3.44129 16.5 4.20435 16.5 5C16.5 5.79565 16.8161 6.55871 17.3787 7.12132C17.9413 7.68393 18.7044 8 19.5 8Z"
        stroke={strokeColor}
        strokeWidth={strokeWidth}
      />
    </svg>
  ),
  headphone: (strokeColor, strokeWidth) => (
    <svg
      width="25"
      height="24"
      viewBox="0 0 25 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Path
        d="M5.96005 18.49V15.57C5.96005 14.6 6.72005 13.73 7.80005 13.73C8.77005 13.73 9.64005 14.49 9.64005 15.57V18.38C9.64005 20.33 8.02005 21.95 6.07005 21.95C4.12005 21.95 2.50005 20.32 2.50005 18.38V12.22C2.39005 6.59999 6.83005 2.04999 12.45 2.04999C18.07 2.04999 22.5 6.59999 22.5 12.11V18.27C22.5 20.22 20.88 21.84 18.93 21.84C16.98 21.84 15.36 20.22 15.36 18.27V15.46C15.36 14.49 16.12 13.62 17.2 13.62C18.17 13.62 19.04 14.38 19.04 15.46V18.49"
        stroke={strokeColor}
        strokeWidth={strokeWidth}
      />
    </svg>
  ),
  setting: (strokeColor, strokeWidth) => (
    <svg
      width="25"
      height="24"
      viewBox="0 0 25 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Path
        d="M12.5 15C13.2956 15 14.0587 14.6839 14.6213 14.1213C15.1839 13.5587 15.5 12.7956 15.5 12C15.5 11.2044 15.1839 10.4413 14.6213 9.87868C14.0587 9.31607 13.2956 9 12.5 9C11.7044 9 10.9413 9.31607 10.3787 9.87868C9.81607 10.4413 9.5 11.2044 9.5 12C9.5 12.7956 9.81607 13.5587 10.3787 14.1213C10.9413 14.6839 11.7044 15 12.5 15Z"
        strokeMiterlimit="10"
        stroke={strokeColor}
        strokeWidth={strokeWidth}
      />
      <Path
        d="M2.5 12.88V11.12C2.5 10.08 3.35 9.22 4.4 9.22C6.21 9.22 6.95 7.94 6.04 6.37C5.52 5.47 5.83 4.3 6.74 3.78L8.47 2.79C9.26 2.32 10.28 2.6 10.75 3.39L10.86 3.58C11.76 5.15 13.24 5.15 14.15 3.58L14.26 3.39C14.73 2.6 15.75 2.32 16.54 2.79L18.27 3.78C19.18 4.3 19.49 5.47 18.97 6.37C18.06 7.94 18.8 9.22 20.61 9.22C21.65 9.22 22.51 10.07 22.51 11.12V12.88C22.51 13.92 21.66 14.78 20.61 14.78C18.8 14.78 18.06 16.06 18.97 17.63C19.49 18.54 19.18 19.7 18.27 20.22L16.54 21.21C15.75 21.68 14.73 21.4 14.26 20.61L14.15 20.42C13.25 18.85 11.77 18.85 10.86 20.42L10.75 20.61C10.28 21.4 9.26 21.68 8.47 21.21L6.74 20.22C6.3041 19.969 5.98558 19.5553 5.85435 19.0698C5.72311 18.5842 5.78988 18.0664 6.04 17.63C6.95 16.06 6.21 14.78 4.4 14.78C3.35 14.78 2.5 13.92 2.5 12.88Z"
        strokeMiterlimit="10"
        stroke={strokeColor}
        strokeWidth={strokeWidth}
      />
    </svg>
  ),
  logOut: (strokeColor, strokeWidth) => (
    <svg
      width="25"
      height="24"
      viewBox="0 0 25 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Path
        d="M15.6 7.55999C15.29 3.95999 13.44 2.48999 9.39 2.48999H9.26C4.79 2.48999 3 4.27999 3 8.74999V15.27C3 19.74 4.79 21.53 9.26 21.53H9.39C13.41 21.53 15.26 20.08 15.59 16.54M9.5 12H20.88M18.65 8.64999L22 12L18.65 15.35"
        stroke={strokeColor}
        strokeWidth={strokeWidth}
      />
    </svg>
  ),
  laptop: (strokeColor, strokeWidth) => (
    <svg
      width="20"
      height="19"
      viewBox="0 0 20 19"
      fill="#64748B"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Path
        d="M2 13H18V2H2V13ZM11 15V17H15V19H5V17H9V15H0.9918C0.44405 15 0 14.5511 0 13.9925V1.00748C0 0.45107 0.45531 0 0.9918 0H19.0082C19.556 0 20 0.44892 20 1.00748V13.9925C20 14.5489 19.5447 15 19.0082 15H11Z"
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        fill="#CBD5E1"
      />
    </svg>
  ),
  taplet: (strokeColor, strokeWidth) => (
    <svg
      width="16"
      height="21"
      viewBox="0 0 16 21"
      fill="#64748B"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Path
        d="M2 2.5V18.5H14V2.5H2ZM1 0.5H15C15.5523 0.5 16 0.94772 16 1.5V19.5C16 20.0523 15.5523 20.5 15 20.5H1C0.44772 20.5 0 20.0523 0 19.5V1.5C0 0.94772 0.44772 0.5 1 0.5ZM8 15.5C8.5523 15.5 9 15.9477 9 16.5C9 17.0523 8.5523 17.5 8 17.5C7.4477 17.5 7 17.0523 7 16.5C7 15.9477 7.4477 15.5 8 15.5Z"
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        fill="#CBD5E1"
      />
    </svg>
  ),
  mopile: (strokeColor, strokeWidth) => (
    <svg
      width="14"
      height="21"
      viewBox="0 0 14 21"
      fill="#64748B"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Path
        d="M2 2.5V18.5H12V2.5H2ZM1 0.5H13C13.5523 0.5 14 0.94772 14 1.5V19.5C14 20.0523 13.5523 20.5 13 20.5H1C0.44772 20.5 0 20.0523 0 19.5V1.5C0 0.94772 0.44772 0.5 1 0.5ZM7 15.5C7.5523 15.5 8 15.9477 8 16.5C8 17.0523 7.5523 17.5 7 17.5C6.4477 17.5 6 17.0523 6 16.5C6 15.9477 6.4477 15.5 7 15.5Z"
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        fill="#CBD5E1"
      />
    </svg>
  ),
  prush: (strokeColor, strokeWidth) => (
    <svg
      viewBox="0 0 24 24"
      height={24}
      width={24}
      xmlns="http://www.w3.org/2000/svg"
      fill="#64748B"
    >
      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
      <g
        id="SVGRepo_tracerCarrier"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></g>
      <g id="SVGRepo_iconCarrier">
        {" "}
        <Path
          d="M23.14.93l-.07-.07A2.926 2.926 0 0 0 20.98 0a2.886 2.886 0 0 0-2.08.86L8.858 10.9a3.04 3.04 0 0 0-.53.72 7.793 7.793 0 0 0-4.1 1.621c-.191.144-.36.316-.5.51a6.08 6.08 0 0 0-.98 1.961c-.25.69-.59 1.631-1.22 3-.42.91-.75 1.541-.98 1.981a3.092 3.092 0 0 0-.54 1.631c.014.206.08.406.19.58a2.64 2.64 0 0 0 2.23 1.07 10.462 10.462 0 0 0 8.161-3.371c.378-.44.692-.932.93-1.461a7.882 7.882 0 0 0 .69-3.361.142.142 0 0 1 .02-.04c.325-.144.62-.347.87-.6L23.14 5.1A2.888 2.888 0 0 0 24 3.021 2.927 2.927 0 0 0 23.14.93zM9.7 18.317c-.17.368-.388.711-.65 1.02a8.393 8.393 0 0 1-6.891 2.6c.05-.1.11-.21.17-.32.24-.46.58-1.11 1.02-2.061a39.058 39.058 0 0 0 1.28-3.151c.14-.491.355-.957.64-1.381.062-.08.133-.154.21-.22a5.221 5.221 0 0 1 2.59-1.14c.121.537.396 1.027.79 1.411l.07.07c.35.357.788.616 1.27.75a5.614 5.614 0 0 1-.499 2.422zM21.73 3.691L11.678 13.735a.947.947 0 0 1-.67.28.983.983 0 0 1-.67-.28l-.07-.07a.948.948 0 0 1 0-1.34L20.309 2.271c.18-.173.42-.27.671-.271a.937.937 0 0 1 .67.27l.08.08c.36.374.36.967 0 1.341z"
          fill="white"
          stroke={""}
          strokeWidth={strokeWidth}
          justFillOnHover={true}
          dontHover={true}
          fillRule="evenodd"
        ></Path>{" "}
      </g>
    </svg>
  ),
  redo: (strokeColor, strokeWidth) => (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 25"
      fill="#64748B"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Path
        d="M18.1716 7.49955H11C7.68629 7.49955 5 10.1858 5 13.4996C5 16.8133 7.68629 19.4996 11 19.4996H20V21.4996H11C6.58172 21.4996 3 17.9178 3 13.4996C3 9.08127 6.58172 5.49955 11 5.49955H18.1716L15.636 2.96402L17.0503 1.5498L22 6.49955L17.0503 11.4493L15.636 10.0351L18.1716 7.49955Z"
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        fill="#CBD5E1"
      />
    </svg>
  ),
  undo: (strokeColor, strokeWidth) => (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 25"
      fill="#64748B"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Path
        d="M5.82843 7.49955L8.36396 10.0351L6.94975 11.4493L2 6.49955L6.94975 1.5498L8.36396 2.96402L5.82843 5.49955H13C17.4183 5.49955 21 9.08127 21 13.4996C21 17.9178 17.4183 21.4996 13 21.4996H4V19.4996H13C16.3137 19.4996 19 16.8133 19 13.4996C19 10.1858 16.3137 7.49955 13 7.49955H5.82843Z"
        strokeWidth={strokeWidth}
        stroke={strokeColor}
        fill="#CBD5E1"
      />
    </svg>
  ),
  watch: (strokeColor, strokeWidth) => (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 25"
      fill="#64748B"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Path
        justFillOnHover={true}
        d="M12.0003 3.5C17.3924 3.5 21.8784 7.37976 22.8189 12.5C21.8784 17.6202 17.3924 21.5 12.0003 21.5C6.60812 21.5 2.12215 17.6202 1.18164 12.5C2.12215 7.37976 6.60812 3.5 12.0003 3.5ZM12.0003 19.5C16.2359 19.5 19.8603 16.552 20.7777 12.5C19.8603 8.44803 16.2359 5.5 12.0003 5.5C7.7646 5.5 4.14022 8.44803 3.22278 12.5C4.14022 16.552 7.7646 19.5 12.0003 19.5ZM12.0003 17C9.51498 17 7.50026 14.9853 7.50026 12.5C7.50026 10.0147 9.51498 8 12.0003 8C14.4855 8 16.5003 10.0147 16.5003 12.5C16.5003 14.9853 14.4855 17 12.0003 17ZM12.0003 15C13.381 15 14.5003 13.8807 14.5003 12.5C14.5003 11.1193 13.381 10 12.0003 10C10.6196 10 9.50026 11.1193 9.50026 12.5C9.50026 13.8807 10.6196 15 12.0003 15Z"
        stroke={strokeColor}
        strokeWidth={strokeWidth}
      />
    </svg>
  ),

  code: (strokeColor, strokeWidth) => (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
      <g
        id="SVGRepo_tracerCarrier"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></g>
      <g id="SVGRepo_iconCarrier">
        <Path
          d="M9 8L5 11.6923L9 16M15 8L19 11.6923L15 16"
          stroke={strokeColor}
          strokeWidth={strokeWidth}
        ></Path>
      </g>
    </svg>
  ),
  trash: (strokeColor, strokeWidth) => (
    <svg
      viewBox="0 0 24 24"
      className="w-[24px]"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
      <g
        id="SVGRepo_tracerCarrier"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></g>
      <g id="SVGRepo_iconCarrier">
        {" "}
        <Path
          d="M3 3L6 6M6 6L10 10M6 6V18C6 19.6569 7.34315 21 9 21H15C16.6569 21 18 19.6569 18 18M6 6H4M10 10L14 14M10 10V17M14 14L18 18M14 14V17M18 18L21 21M18 6V12.3906M18 6H16M18 6H20M16 6L15.4558 4.36754C15.1836 3.55086 14.4193 3 13.5585 3H10.4415C9.94239 3 9.47572 3.18519 9.11861 3.5M16 6H11.6133"
          stroke={strokeColor}
          strokeWidth={strokeWidth}
        ></Path>{" "}
      </g>
    </svg>
  ),

  arrow: (strokeColor, strokeWidth) => (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Path
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        fill="#CBD5E1"
        d="M11.7386 13.3406L16.5819 8.49741L17.9657 9.88119L11.7386 16.1083L5.51154 9.88119L6.89533 8.49741L11.7386 13.3406Z"
      />
    </svg>
  ),
  command: (strokeColor, strokeWidth) => (
    <svg viewBox="0 0 24 24" fill="none" height="25" width="25">
      <Path
        // fill="#CBD5E1"
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        d="M18 3a3 3 0 00-3 3v12a3 3 0 003 3 3 3 0 003-3 3 3 0 00-3-3H6a3 3 0 00-3 3 3 3 0 003 3 3 3 0 003-3V6a3 3 0 00-3-3 3 3 0 00-3 3 3 3 0 003 3h12a3 3 0 003-3 3 3 0 00-3-3z"
      />
    </svg>
  ),
  export: (strokeColor, strokeWidth) => (
    <svg
      width="24px"
      height="24px"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
      <g
        id="SVGRepo_tracerCarrier"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></g>
      <g id="SVGRepo_iconCarrier">
        {" "}
        <Path
          d="M12 3V16M12 16L16 11.625M12 16L8 11.625"
          stroke="#64748B"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></Path>{" "}
        <Path
          d="M15 21H9C6.17157 21 4.75736 21 3.87868 20.1213C3 19.2426 3 17.8284 3 15M21 15C21 17.8284 21 19.2426 20.1213 20.1213C19.8215 20.4211 19.4594 20.6186 19 20.7487"
          stroke="#64748B"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></Path>{" "}
      </g>
    </svg>
  ),
  save: (strokeColor, strokeWidth) => (
    <svg
      fill="#64748B"
      width="24px"
      height="24px"
      viewBox="0 0 24.00 24.00"
      xmlns="http://www.w3.org/2000/svg"
      stroke="#64748B"
      strokeWidth="0.00024000000000000003"
      transform="matrix(1, 0, 0, 1, 0, 0)rotate(0)"
    >
      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
      <g
        id="SVGRepo_tracerCarrier"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></g>
      <g id="SVGRepo_iconCarrier">
        <Path
          stroke={" "}
          justFillOnHover={true}
          strokeWidth={strokeWidth}
          d="M21,20V8.414a1,1,0,0,0-.293-.707L16.293,3.293A1,1,0,0,0,15.586,3H4A1,1,0,0,0,3,4V20a1,1,0,0,0,1,1H20A1,1,0,0,0,21,20ZM9,8h4a1,1,0,0,1,0,2H9A1,1,0,0,1,9,8Zm7,11H8V15a1,1,0,0,1,1-1h6a1,1,0,0,1,1,1Z"
        ></Path>
      </g>
    </svg>
  ),
  delete: (strokeColor, strokeWidth) => (
    <svg
      version="1.1"
      id="Layer_1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      x="0px"
      y="0px"
      // width="109.484px"
      // height="122.88px"
      width="15"
      height="15"
      viewBox="0 0 109.484 122.88"
      enableBackground="new 0 0 109.484 122.88"
      xmlSpace="preserve"
      fill="white"
      // stroke-color="white"
    >
      <g>
        <Path
          stroke={strokeColor}
          strokeWidth={strokeWidth}
          d="M2.347,9.633h38.297V3.76c0-2.068,1.689-3.76,3.76-3.76h21.144 c2.07,0,3.76,1.691,3.76,3.76v5.874h37.83c1.293,0,2.347,1.057,2.347,2.349v11.514H0V11.982C0,10.69,1.055,9.633,2.347,9.633 L2.347,9.633z M8.69,29.605h92.921c1.937,0,3.696,1.599,3.521,3.524l-7.864,86.229c-0.174,1.926-1.59,3.521-3.523,3.521h-77.3 c-1.934,0-3.352-1.592-3.524-3.521L5.166,33.129C4.994,31.197,6.751,29.605,8.69,29.605L8.69,29.605z M69.077,42.998h9.866v65.314 h-9.866V42.998L69.077,42.998z M30.072,42.998h9.867v65.314h-9.867V42.998L30.072,42.998z M49.572,42.998h9.869v65.314h-9.869 V42.998L49.572,42.998z"
        />
      </g>
    </svg>
  ),

  textStart: ({
    strokeColor,
    strokeWidth,
    width = "18",
    height = "18",
    fill,
  }) => (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="#CBD5E1"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Path
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        d="M3.26471 4.42346H20.8775V6.38044H3.26471V4.42346ZM3.26471 19.1008H16.9635V21.0577H3.26471V19.1008ZM3.26471 14.2083H20.8775V16.1653H3.26471V14.2083ZM3.26471 9.3159H16.9635V11.2729H3.26471V9.3159Z"
        fill={fill || "#CBD5E1"}
      />
    </svg>
  ),
  textCenter: ({
    strokeColor,
    strokeWidth,
    width = "24",
    height = "24",
    fill,
  }) => (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Path
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        d="M3.3714 4.42346H20.9842V6.38044H3.3714V4.42346ZM5.32837 19.1008H19.0272V21.0577H5.32837V19.1008ZM3.3714 14.2083H20.9842V16.1653H3.3714V14.2083ZM5.32837 9.3159H19.0272V11.2729H5.32837V9.3159Z"
        fill={fill || "#CBD5E1"}
      />
    </svg>
  ),
  textEnd: ({
    strokeColor,
    strokeWidth,
    width = "24",
    height = "24",
    fill,
  }) => (
    <svg
      width={width}
      height={height}
      viewBox="0 0 25 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Path
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        d="M3.47864 4.42346H21.0914V6.38044H3.47864V4.42346ZM7.39258 19.1008H21.0914V21.0577H7.39258V19.1008ZM3.47864 14.2083H21.0914V16.1653H3.47864V14.2083ZM7.39258 9.3159H21.0914V11.2729H7.39258V9.3159Z"
        fill={fill || "#CBD5E1"}
      />
    </svg>
  ),
  textJustify: ({
    strokeColor,
    strokeWidth,
    width = "24",
    height = "24",
    fill,
  }) => (
    <svg
      width={width}
      height={height}
      viewBox="0 0 25 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Path
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        d="M3.58533 4.42346H21.1981V6.38044H3.58533V4.42346ZM3.58533 19.1008H21.1981V21.0577H3.58533V19.1008ZM3.58533 14.2083H21.1981V16.1653H3.58533V14.2083ZM3.58533 9.3159H21.1981V11.2729H3.58533V9.3159Z"
        fill={fill || "#CBD5E1"}
      />
    </svg>
  ),
  textCapitalize: ({
    strokeColor,
    strokeWidth,
    width = "18",
    height = "18",
    fill,
  }) => (
    <svg
      width={width}
      height={height}
      viewBox="0 0 18.04 14.24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g
        id="svgGroup"
        strokeLinecap="round"
        fillRule="evenodd"
        stroke="#64748b"
        strokeWidth="1.5"
        fill={fill || "#cbd5e1"}
      >
        <Path
          stroke={strokeColor}
          strokeWidth={strokeWidth || 1}
          d="M 6.2 14 L 4.3 14 L 4.3 1.68 L 0 1.68 L 0 0 L 10.5 0 L 10.5 1.68 L 6.2 1.68 L 6.2 14 Z M 12.3 10.42 L 12.3 5.54 L 10.5 5.54 L 10.5 3.98 L 12.34 3.98 L 12.72 0.7 L 14.1 0.7 L 14.1 3.98 L 16.98 3.98 L 16.98 5.54 L 14.1 5.54 L 14.1 10.56 Q 14.1 11.588 14.485 12.066 A 1.111 1.111 0 0 0 14.59 12.18 Q 15.08 12.64 15.76 12.64 Q 16.26 12.64 16.71 12.48 Q 17.16 12.32 17.54 12.1 L 18.04 13.54 A 3.709 3.709 0 0 1 17.716 13.711 Q 17.556 13.787 17.367 13.862 A 8.673 8.673 0 0 1 16.96 14.01 Q 16.28 14.24 15.54 14.24 A 3.665 3.665 0 0 1 14.504 14.101 A 2.787 2.787 0 0 1 13.17 13.25 Q 12.3 12.26 12.3 10.42 Z"
          vectorEffect="non-scaling-stroke"
        />
      </g>
    </svg>
  ),
  textUppercase: ({
    strokeColor,
    strokeWidth,
    width = "18",
    height = "18",
    fill,
  }) => (
    <svg
      width={width}
      height={height}
      viewBox="0 0 21.4 14"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g
        id="svgGroup"
        strokeLinecap="round"
        fillRule="evenodd"
        stroke="#64748b"
        strokeWidth="1.5"
        fill={fill || "#cbd5e1"}
      >
        <Path
          stroke={strokeColor}
          strokeWidth={strokeWidth}
          d="M 6.2 14 L 4.3 14 L 4.3 1.68 L 0 1.68 L 0 0 L 10.5 0 L 10.5 1.68 L 6.2 1.68 L 6.2 14 Z M 17.1 14 L 15.2 14 L 15.2 1.68 L 10.9 1.68 L 10.9 0 L 21.4 0 L 21.4 1.68 L 17.1 1.68 L 17.1 14 Z"
          vectorEffect="non-scaling-stroke"
        />
      </g>
    </svg>
  ),
  textLowercase: ({
    strokeColor,
    strokeWidth,
    width = "18",
    height = "18",
    fill,
  }) => (
    <svg
      width={width}
      height={height}
      viewBox="0 0 15.48 13.54"
      fill={fill || "#cbd5e1"}
      xmlns="http://www.w3.org/2000/svg"
    >
      <g
        id="svgGroup"
        strokeLinecap="round"
        fillRule="evenodd"
        stroke="#64748b"
        strokeWidth="1.5"
        fill={fill || "#cbd5e1"}
      >
        <Path
          fill={fill || "#cbd5e1"}
          stroke={strokeColor}
          strokeWidth={strokeWidth}
          d="M 1.8 9.72 L 1.8 4.84 L 0 4.84 L 0 3.28 L 1.84 3.28 L 2.22 0 L 3.6 0 L 3.6 3.28 L 6.48 3.28 L 6.48 4.84 L 3.6 4.84 L 3.6 9.86 Q 3.6 10.888 3.985 11.366 A 1.111 1.111 0 0 0 4.09 11.48 Q 4.58 11.94 5.26 11.94 Q 5.76 11.94 6.21 11.78 Q 6.66 11.62 7.04 11.4 L 7.54 12.84 A 3.709 3.709 0 0 1 7.216 13.011 Q 7.056 13.087 6.867 13.162 A 8.673 8.673 0 0 1 6.46 13.31 Q 5.78 13.54 5.04 13.54 A 3.665 3.665 0 0 1 4.004 13.401 A 2.787 2.787 0 0 1 2.67 12.55 Q 1.8 11.56 1.8 9.72 Z M 9.74 9.72 L 9.74 4.84 L 7.94 4.84 L 7.94 3.28 L 9.78 3.28 L 10.16 0 L 11.54 0 L 11.54 3.28 L 14.42 3.28 L 14.42 4.84 L 11.54 4.84 L 11.54 9.86 Q 11.54 10.888 11.925 11.366 A 1.111 1.111 0 0 0 12.03 11.48 Q 12.52 11.94 13.2 11.94 Q 13.7 11.94 14.15 11.78 Q 14.6 11.62 14.98 11.4 L 15.48 12.84 A 3.709 3.709 0 0 1 15.156 13.011 Q 14.996 13.087 14.807 13.162 A 8.673 8.673 0 0 1 14.4 13.31 Q 13.72 13.54 12.98 13.54 A 3.665 3.665 0 0 1 11.944 13.401 A 2.787 2.787 0 0 1 10.61 12.55 Q 9.74 11.56 9.74 9.72 Z"
          vectorEffect="non-scaling-stroke"
        />
      </g>
    </svg>
  ),
  textNone: ({
    strokeColor,
    strokeWidth,
    width = "16",
    height = "16",
    fill,
  }) => (
    <svg
      width={width}
      height={height}
      viewBox="0 0 11.74 14.38"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g
        id="svgGroup"
        strokeLinecap="round"
        fillRule="evenodd"
        stroke="#64748b"
        strokeWidth="1.5"
        fill={fill || "#cbd5e1"}
      >
        <Path
          stroke={strokeColor}
          strokeWidth={strokeWidth || 1}
          d="M 11.74 13.2 L 10.2 14.38 L 5.78 8.38 L 1.5 14.34 L 0 13.2 L 4.7 7.06 L 0.2 1.18 L 1.78 0 L 5.84 5.68 L 9.86 0.06 L 11.34 1.18 L 6.98 6.96 L 11.74 13.2 Z"
          vectorEffect="non-scaling-stroke"
        />
      </g>
    </svg>
  ),
  visible: ({
    strokeColor,
    strokeWidth,
    width = "24",
    height = "24",
    fill,
  }) => (
    <svg
      width={width}
      height={height}
      version="1.1"
      id="Layer_1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      x="0px"
      y="0px"
      viewBox="0 0 122.88 65.06"
      xmlSpace="preserve"
    >
      <g
        id="svgGroup"
        strokeLinecap="round"
        fillRule="evenodd"
        stroke="#64748b"
        strokeWidth="1.5"
        fill={fill || "#cbd5e1"}
      >
        <Path
          stroke={strokeColor}
          strokeWidth={strokeWidth}
          d="M0.95,30.01c2.92-3.53,5.98-6.74,9.15-9.63C24.44,7.33,41.46,0.36,59.01,0.01c17.51-0.35,35.47,5.9,51.7,19.29 c3.88,3.2,7.63,6.77,11.24,10.74c1.16,1.28,1.22,3.17,0.23,4.51c-4.13,5.83-8.88,10.82-14.07,14.96 C95.12,59.88,79.34,64.98,63.35,65.06c-15.93,0.07-32.06-4.86-45.8-14.57c-6.14-4.34-11.81-9.63-16.78-15.85 C-0.34,33.24-0.23,31.27,0.95,30.01L0.95,30.01z M61.44,26.46c0.59,0,1.17,0.09,1.71,0.24c-0.46,0.5-0.73,1.17-0.73,1.9 c0,1.56,1.26,2.82,2.82,2.82c0.77,0,1.46-0.3,1.97-0.8c0.2,0.6,0.3,1.24,0.3,1.9c0,3.35-2.72,6.07-6.07,6.07 c-3.35,0-6.07-2.72-6.07-6.07C55.37,29.18,58.09,26.46,61.44,26.46L61.44,26.46z M61.44,10.82c5.99,0,11.42,2.43,15.35,6.36 c3.93,3.93,6.36,9.35,6.36,15.35c0,5.99-2.43,11.42-6.36,15.35c-3.93,3.93-9.35,6.36-15.35,6.36c-5.99,0-11.42-2.43-15.35-6.36 c-3.93-3.93-6.36-9.35-6.36-15.35c0-5.99,2.43-11.42,6.36-15.35C50.02,13.25,55.45,10.82,61.44,10.82L61.44,10.82z M71.89,22.08 c-2.67-2.67-6.37-4.33-10.45-4.33c-4.08,0-7.78,1.65-10.45,4.33c-2.67,2.67-4.33,6.37-4.33,10.45c0,4.08,1.65,7.78,4.33,10.45 c2.67,2.67,6.37,4.33,10.45,4.33c4.08,0,7.78-1.65,10.45-4.33c2.67-2.67,4.33-6.37,4.33-10.45C76.22,28.45,74.56,24.75,71.89,22.08 L71.89,22.08z M14.89,25.63c-2.32,2.11-4.56,4.39-6.7,6.82c4.07,4.72,8.6,8.8,13.45,12.23c12.54,8.85,27.21,13.35,41.69,13.29 c14.42-0.07,28.65-4.67,40.37-14.02c4-3.19,7.7-6.94,11.03-11.25c-2.79-2.91-5.63-5.54-8.51-7.92C91.33,12.51,75,6.79,59.15,7.1 C43.34,7.42,27.93,13.76,14.89,25.63L14.89,25.63z"
        />
      </g>
    </svg>
  ),
  animation: () => (
    <svg viewBox="0 0 24 24" fill="#64748B" height="24" width="24">
      <Path
        justFillOnHover={true}
        d="M4 2a2 2 0 00-2 2v10h2V4h10V2H4m4 4a2 2 0 00-2 2v10h2V8h10V6H8m12 6v8h-8v-8h8m0-2h-8a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-8a2 2 0 00-2-2z"
      />
    </svg>
  ),
  hidden: ({ strokeColor, strokeWidth, width = "24", height = "24" }) => (
    <svg
      width={width}
      height={height}
      version="1.1"
      id="Layer_1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      viewBox="0 0 122.879 79.699"
      enableBackground="new 0 0 122.879 79.699"
      xmlSpace="preserve"
    >
      <g
        id="svgGroup"
        strokeLinecap="round"
        fillRule="evenodd"
        stroke="#64748b"
        strokeWidth="1.5"
        fill="#cbd5e1"
      >
        <Path
          stroke={strokeColor}
          strokeWidth={strokeWidth}
          d="M0.955,37.326c2.922-3.528,5.981-6.739,9.151-9.625C24.441,14.654,41.462,7.684,59.01,7.334 c6.561-0.131,13.185,0.665,19.757,2.416l-5.904,5.904c-4.581-0.916-9.168-1.324-13.714-1.233 c-15.811,0.316-31.215,6.657-44.262,18.533l0,0c-2.324,2.115-4.562,4.39-6.702,6.82c4.071,4.721,8.6,8.801,13.452,12.227 c2.988,2.111,6.097,3.973,9.296,5.586l-5.262,5.262c-2.782-1.504-5.494-3.184-8.12-5.039c-6.143-4.338-11.813-9.629-16.78-15.85 C-0.338,40.563-0.228,38.59,0.955,37.326L0.955,37.326L0.955,37.326z M96.03,0l5.893,5.893L28.119,79.699l-5.894-5.895L96.03,0 L96.03,0z M97.72,17.609c4.423,2.527,8.767,5.528,12.994,9.014c3.877,3.196,7.635,6.773,11.24,10.735 c1.163,1.277,1.22,3.171,0.226,4.507c-4.131,5.834-8.876,10.816-14.069,14.963C95.119,67.199,79.338,72.305,63.352,72.377 c-6.114,0.027-9.798-3.141-15.825-4.576l3.545-3.543c4.065,0.705,8.167,1.049,12.252,1.031c14.421-0.064,28.653-4.668,40.366-14.02 c3.998-3.191,7.706-6.939,11.028-11.254c-2.787-2.905-5.627-5.543-8.508-7.918c-4.455-3.673-9.042-6.759-13.707-9.273L97.72,17.609 L97.72,17.609z M61.44,18.143c2.664,0,5.216,0.481,7.576,1.359l-5.689,5.689c-0.619-0.079-1.248-0.119-1.886-0.119 c-4.081,0-7.775,1.654-10.449,4.328c-2.674,2.674-4.328,6.369-4.328,10.45c0,0.639,0.04,1.268,0.119,1.885l-5.689,5.691 c-0.879-2.359-1.359-4.912-1.359-7.576c0-5.995,2.43-11.42,6.358-15.349C50.02,20.572,55.446,18.143,61.44,18.143L61.44,18.143z M82.113,33.216c0.67,2.09,1.032,4.32,1.032,6.634c0,5.994-2.43,11.42-6.357,15.348c-3.929,3.928-9.355,6.357-15.348,6.357 c-2.313,0-4.542-0.361-6.633-1.033l5.914-5.914c0.238,0.012,0.478,0.018,0.719,0.018c4.081,0,7.775-1.652,10.449-4.326 s4.328-6.369,4.328-10.449c0-0.241-0.006-0.48-0.018-0.72L82.113,33.216L82.113,33.216z"
        />
      </g>
    </svg>
  ),
  scroll: ({ strokeColor, strokeWidth, width = "24", height = "24" }) => (
    <svg
      width={width}
      height={height}
      version="1.1"
      id="Layer_1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      x="0px"
      y="0px"
      viewBox="0 0 80.59 122.88"
      xmlSpace="preserve"
    >
      {/* <style type="text/css">
        .st0{{ "fill-rule": evenodd, "clip-rule": evenodd }}
      </style> */}
      <g
        id="svgGroup"
        strokeLinecap="round"
        fillRule="evenodd"
        stroke="#64748b"
        strokeWidth="1.5"
        fill="#cbd5e1"
      >
        <Path
          stroke={strokeColor}
          strokeWidth={strokeWidth}
          class="st0"
          d="M53.06,0l27.53,28.63H62.88v22.7H43.25v-22.7H25.53L53.06,0L53.06,0z M27.53,122.88L0,94.25h17.72v-22.7h19.62 v22.7h17.72L27.53,122.88L27.53,122.88z M17.72,68.05V54.49h19.62v13.56H17.72L17.72,68.05z M17.72,51.24v-7.7l19.62,0v7.7 L17.72,51.24L17.72,51.24z M62.88,71.64v7.7H43.25v-7.7H62.88L62.88,71.64z M62.88,54.84v13.56l-19.62,0V54.84L62.88,54.84 L62.88,54.84z"
        />
      </g>
    </svg>
  ),
  initial: ({ strokeColor, strokeWidth, width = "24", height = "24" }) => (
    <svg
      width={width}
      height={height}
      version="1.1"
      id="Layer_1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      x="0px"
      y="0px"
      viewBox="0 0 122.88 122.88"
      enableBackground="new 0 0 122.88 122.88"
      xmlSpace="preserve"
    >
      <g
        id="svgGroup"
        strokeLinecap="round"
        fillRule="evenodd"
        stroke="#64748b"
        strokeWidth="1.5"
        fill="#cbd5e1"
      >
        <Path
          stroke={strokeColor}
          strokeWidth={strokeWidth}
          d="M61.438,0c33.93,0,61.441,27.512,61.441,61.441 c0,33.929-27.512,61.438-61.441,61.438C27.512,122.88,0,95.37,0,61.441C0,27.512,27.512,0,61.438,0L61.438,0z"
        />
      </g>
    </svg>
  ),
  auto: ({ strokeColor, strokeWidth, width = "24", height = "24" }) => (
    <svg
      width={width}
      height={height}
      viewBox="0 0 35.152 11.392"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g
        id="svgGroup"
        strokeLinecap="round"
        fillRule="evenodd"
        stroke="#64748b"
        fill="#cbd5e1"
        fontSize="9pt"
        strokeWidth="0.25mm"
        // fill="#64748b"
        style={{ stroke: "#64748b", strokeWidth: "0.25mm", fill: "#64748b" }}
      >
        <Path
          stroke={strokeColor}
          strokeWidth={strokeWidth}
          d="M 11.728 8.288 L 11.728 2.88 L 13.168 2.88 L 13.168 8.096 Q 13.168 9.072 13.584 9.592 A 1.345 1.345 0 0 0 14.402 10.075 A 2.049 2.049 0 0 0 14.8 10.112 Q 15.456 10.112 16.072 9.848 Q 16.688 9.584 17.168 9.136 L 17.168 2.88 L 18.608 2.88 L 18.608 9.04 Q 18.608 9.579 18.789 9.828 A 0.523 0.523 0 0 0 18.904 9.944 Q 19.2 10.16 19.552 10.16 L 19.248 11.28 Q 17.762 11.28 17.409 10.1 A 2.181 2.181 0 0 1 17.408 10.096 Q 16.848 10.672 16.112 11.032 Q 15.376 11.392 14.528 11.392 Q 13.808 11.392 13.168 11.088 Q 12.528 10.784 12.128 10.104 Q 11.815 9.571 11.747 8.759 A 5.66 5.66 0 0 1 11.728 8.288 Z M 10.368 10.8 L 8.976 11.36 L 7.728 8.16 L 2.544 8.16 L 1.296 11.328 L 0 10.8 L 4.384 0 L 6.048 0 L 10.368 10.8 Z M 21.792 8.336 L 21.792 4.432 L 20.352 4.432 L 20.352 3.184 L 21.824 3.184 L 22.128 0.56 L 23.232 0.56 L 23.232 3.184 L 25.536 3.184 L 25.536 4.432 L 23.232 4.432 L 23.232 8.448 A 3.449 3.449 0 0 0 23.259 8.895 Q 23.323 9.383 23.54 9.653 A 0.889 0.889 0 0 0 23.624 9.744 Q 24.016 10.112 24.56 10.112 Q 24.96 10.112 25.32 9.984 Q 25.68 9.856 25.984 9.68 L 26.384 10.832 A 2.967 2.967 0 0 1 26.125 10.969 Q 25.997 11.03 25.846 11.089 A 6.938 6.938 0 0 1 25.52 11.208 Q 24.976 11.392 24.384 11.392 Q 23.184 11.392 22.488 10.6 Q 21.792 9.808 21.792 8.336 Z M 29.626 11.178 A 4.354 4.354 0 0 0 31.008 11.392 A 4.916 4.916 0 0 0 31.372 11.379 A 4.041 4.041 0 0 0 33.128 10.848 Q 34.064 10.304 34.608 9.32 A 4.201 4.201 0 0 0 35.032 8.177 A 5.469 5.469 0 0 0 35.152 7.008 Q 35.152 5.68 34.6 4.712 Q 34.048 3.744 33.112 3.216 A 3.976 3.976 0 0 0 32.369 2.892 A 4.438 4.438 0 0 0 31.008 2.688 A 5.012 5.012 0 0 0 30.755 2.694 A 4.187 4.187 0 0 0 28.896 3.216 Q 27.952 3.744 27.408 4.72 A 4.164 4.164 0 0 0 26.968 5.934 A 5.601 5.601 0 0 0 26.864 7.04 A 5.575 5.575 0 0 0 26.906 7.731 Q 27.012 8.585 27.392 9.289 A 4.097 4.097 0 0 0 27.4 9.304 Q 27.936 10.288 28.88 10.84 A 3.929 3.929 0 0 0 29.626 11.178 Z M 31.008 10.112 A 2.999 2.999 0 0 0 31.844 10.001 A 2.24 2.24 0 0 0 32.976 9.256 A 3.008 3.008 0 0 0 33.587 7.962 A 4.337 4.337 0 0 0 33.68 7.04 A 3.42 3.42 0 0 0 33.484 5.874 A 3.202 3.202 0 0 0 33.328 5.512 Q 32.976 4.816 32.376 4.392 Q 31.776 3.968 31.008 3.968 A 3.08 3.08 0 0 0 30.172 4.075 A 2.246 2.246 0 0 0 29.04 4.8 Q 28.363 5.6 28.337 6.904 A 5.259 5.259 0 0 0 28.336 7.008 Q 28.336 7.84 28.688 8.552 A 3.11 3.11 0 0 0 29.253 9.358 A 2.82 2.82 0 0 0 29.64 9.688 Q 30.24 10.112 31.008 10.112 Z M 5.136 1.504 L 3.024 6.88 L 7.232 6.88 L 5.136 1.504 Z"
          vector-effect="non-scaling-stroke"
        />
      </g>
    </svg>
  ),
  justifyStart: ({ strokeColor, strokeWidth, width = "24", height = "24" }) => (
    <svg
      width={width}
      height={height}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 128 128"
    >
      <Path
        fill="#cbd5e1"
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        d="M0 0H8V128H0zM16 16H48V112H16zM56 16H88V112H56z"
      ></Path>
    </svg>
  ),
  justifyCenter: ({
    strokeColor,
    strokeWidth,
    width = "24",
    height = "24",
  }) => (
    <svg
      width={width}
      height={height}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 128 128"
    >
      <Path
        fill="#cbd5e1"
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        d="M60 0H68V128H60zM20 16H52V112H20zM76 16H108V112H76z"
      ></Path>
    </svg>
  ),
  justifyEnd: ({ strokeColor, strokeWidth, width = "24", height = "24" }) => (
    <svg
      width={width}
      height={height}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 128 128"
    >
      <g fill="none" fillRule="evenodd">
        <Path
          fill="#cbd5e1"
          stroke={strokeColor}
          strokeWidth={strokeWidth}
          d="M120 0H128V128H120z"
        ></Path>
        <Path
          fill="#cbd5e1"
          stroke={strokeColor}
          strokeWidth={strokeWidth}
          // fill="#23282D"
          d="M80 16H112V112H80zM40 16H72V112H40z"
          transform="matrix(1 0 0 -1 0 128)"
        ></Path>
      </g>
    </svg>
  ),
  justifyBetween: ({
    strokeColor,
    strokeWidth,
    width = "24",
    height = "24",
  }) => (
    <svg
      width={width}
      height={height}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 128 128"
    >
      <Path
        fill="#cbd5e1"
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        d="M120 0H128V128H120zM0 0H8V128H0zM12 16H44V112H12zM84 16H116V112H84z"
      ></Path>
    </svg>
  ),
  justifyAround: ({
    strokeColor,
    strokeWidth,
    width = "24",
    height = "24",
  }) => (
    <svg
      width={width}
      height={height}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 128 128"
    >
      <Path
        fill="#cbd5e1"
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        d="M120 0H128V128H120zM0 0H8V128H0zM24 16H56V112H24zM72 16H104V112H72z"
      ></Path>
    </svg>
  ),
  justifyEvenly: ({
    strokeColor,
    strokeWidth,
    width = "24",
    height = "24",
  }) => (
    <svg
      width={width}
      height={height}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 128 128"
    >
      <Path
        fill="#cbd5e1"
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        d="M120 0H128V128H120zM0 0H8V128H0zM72 16H104V112H72zM24 16H56V112H24z"
      ></Path>
    </svg>
  ),

  alignStart: ({ strokeColor, strokeWidth, width = "24", height = "24" }) => (
    <svg
      width={width}
      height={height}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 128 128"
    >
      <Path
        fill="#cbd5e1"
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        d="M0 0H128V8H0zM28 16H60V112H28zM68 16H106V112H68z"
      ></Path>
    </svg>
  ),
  alignCenter: ({ strokeColor, strokeWidth, width = "24", height = "24" }) => (
    <svg
      width={width}
      height={height}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 128 128"
    >
      <Path
        fill="#cbd5e1"
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        d="M60 0H68V128H60zM20 16H52V112H20zM76 16H108V112H76z"
      ></Path>
    </svg>
  ),
  alignEnd: ({ strokeColor, strokeWidth, width = "24", height = "24" }) => (
    <svg
      width={width}
      height={height}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 128 128"
    >
      <Path
        fill="#cbd5e1"
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        d="M0 120H128V128H0zM28 16H60V112H28zM68 16H100V112H68z"
      ></Path>
    </svg>
  ),
  alignStrech: ({ strokeColor, strokeWidth, width = "24", height = "24" }) => (
    <svg
      width={width}
      height={height}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 128 128"
    >
      <Path
        fill="#cbd5e1"
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        d="M0 120H128V128H0zM0 0H128V8H0zM40 16H88V112H40z"
      ></Path>
    </svg>
  ),
  alignBaseline: ({
    strokeColor,
    strokeWidth,
    width = "24",
    height = "24",
  }) => (
    <svg
      width={width}
      height={height}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 128 128"
    >
      <g fill="none" fillRule="evenodd">
        <Path
          fill="#cbd5e1"
          stroke={strokeColor}
          strokeWidth={strokeWidth}
          d="M0 60H128V68H0zM32 68H64V96H32zM72 68H104V112H72z"
        ></Path>
        <Path
          fill="#cbd5e1"
          stroke={strokeColor}
          strokeWidth={strokeWidth}
          d="M35 31H61V63H35zM75 31H101V63H75z"
        ></Path>
      </g>
    </svg>
  ),

  alignSelfStart: ({
    strokeColor,
    strokeWidth,
    width = "24",
    height = "24",
  }) => (
    <svg
      width={width}
      height={height}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 128 128"
    >
      <Path
        fill="#cbd5e1"
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        d="M0 0H8V128H0zM16 28H112V60H16zM16 68H112V100H16z"
      ></Path>
    </svg>
  ),

  alignSelfCenter: ({
    strokeColor,
    strokeWidth,
    width = "24",
    height = "24",
  }) => (
    <svg
      width={width}
      height={height}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 128 128"
    >
      <Path
        fill="#cbd5e1"
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        d="M60 0H68V24H60zM60 104H68V128H60zM16 28H112V60H16zM16 68H112V100H16z"
      ></Path>
    </svg>
  ),

  alignSelfEnd: ({ strokeColor, strokeWidth, width = "24", height = "24" }) => (
    <svg
      width={width}
      height={height}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 128 128"
    >
      <Path
        fill="#cbd5e1"
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        d="M120 0H128V128H120zM16 28H112V60H16zM16 68H112V100H16z"
      ></Path>
    </svg>
  ),
  alignSelfStretch: ({
    strokeColor,
    strokeWidth,
    width = "24",
    height = "24",
  }) => (
    <svg
      width={width}
      height={height}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 128 128"
    >
      <Path
        fill="#cbd5e1"
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        d="M120 0H128V128H120zM0 0H8V128H0zM16 28H112V60H16zM16 68H112V100H16z"
      ></Path>
    </svg>
  ),
  columnDir: ({ strokeColor, strokeWidth, width = "24", height = "24" }) => (
    <svg
      width={width}
      height={height}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 128 128"
      className="bricks-svg"
    >
      <Path
        fill="#cbd5e1"
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        d="M16 86H112V112H16zM16 51H112V77H16zM16 16H112V42H16z"
      ></Path>
    </svg>
  ),
  rowDir: ({ strokeColor, strokeWidth, width = "24", height = "24" }) => (
    <svg
      width={width}
      height={height}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 128 128"
    >
      <Path
        fill="#cbd5e1"
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        d="M86 16H112V112H86zM51 16H77V112H51zM16 16H42V112H16z"
      ></Path>
    </svg>
  ),
  reverseDir: ({ strokeColor, strokeWidth, width = "24", height = "24" }) => (
    <svg
      width={width}
      height={height}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 128 128"
    >
      <g fill="none" fillRule="evenodd">
        <Path
          fill="#cbd5e1"
          stroke={strokeColor}
          strokeWidth={strokeWidth}
          d="M56,19.9992122 L10,20 C4.4771525,20 -1.10000309e-15,15.5228475 0,10 C-6.61662521e-16,4.5971155 4.37990327,0.217212229 9.78278777,0.217212229 C9.8543947,0.217212229 9.92599948,0.217998439 9.99758914,0.219570718 L66.8367796,1.46789386 C70.9424147,1.55806332 74.3834686,4.27942675 75.5633162,7.9999083 L76,8 L76,32 L81.1715729,32 C81.7020059,32 82.2107137,32.2107137 82.5857864,32.5857864 C83.366835,33.366835 83.366835,34.633165 82.5857864,35.4142136 L82.5857864,35.4142136 L67.4142136,50.5857864 C66.633165,51.366835 65.366835,51.366835 64.5857864,50.5857864 L64.5857864,50.5857864 L49.4142136,35.4142136 C49.0391408,35.0391408 48.8284271,34.530433 48.8284271,34 C48.8284271,32.8954305 49.7238576,32 50.8284271,32 L50.8284271,32 L56,32 L56,19.9992122 Z"
          transform="translate(30 24)"
        ></Path>
        <Path
          fill="#cbd5e1"
          stroke={strokeColor}
          strokeWidth={strokeWidth}
          d="M56,20 L8,20 C3.581722,20 5.41083001e-16,16.418278 0,12 L0,8 C-5.41083001e-16,3.581722 3.581722,8.11624501e-16 8,0 L68,0 C72.3349143,-7.96310831e-16 75.8645429,3.44783777 75.9961932,7.75082067 L76,8 L76,32 L81.1715729,32 C81.7020059,32 82.2107137,32.2107137 82.5857864,32.5857864 C83.366835,33.366835 83.366835,34.633165 82.5857864,35.4142136 L82.5857864,35.4142136 L67.4142136,50.5857864 C66.633165,51.366835 65.366835,51.366835 64.5857864,50.5857864 L64.5857864,50.5857864 L49.4142136,35.4142136 C49.0391408,35.0391408 48.8284271,34.530433 48.8284271,34 C48.8284271,32.8954305 49.7238576,32 50.8284271,32 L50.8284271,32 L56,32 L56,20 Z"
          transform="rotate(180 49 52)"
        ></Path>
      </g>
    </svg>
  ),
  diminsions: ({ width, height }) => (
    <svg
      width="101"
      height="51"
      viewBox="0 0 101 51"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="0.81604"
        y="-0.000793457"
        width="99.8056"
        height="50.8813"
        fill="#475569"
      />
      <line
        x1="51.2081"
        y1="-0.0007324"
        x2="51.2081"
        y2="50.8806"
        stroke="#64748B"
        strokeWidth="0.978487"
      />
      <line
        x1="0.81604"
        y1="24.9506"
        x2="100.622"
        y2="24.9506"
        stroke="#64748B"
        strokWidth="0.978487"
      />
      <rect
        x="42.891"
        y="17.612"
        width="15.6558"
        height="15.6558"
        fill="#334155"
      />
    </svg>
  ),
};
