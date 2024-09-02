export const filterTypes = [
  "blur",
  "brightness",
  "contrast",
  "drop-shadow",
  "grayscale",
  "hue-rotate",
  "invert",
  "opacity",
  "saturate",
  "sepia",
];

export const filterUnits = {
  blur: "px",
  brightness: "%", // Typically used with percentages
  contrast: "%", // Typically used with percentages
  "drop-shadow": "px", // For offset and blur radius
  grayscale: "%", // Typically used with percentages
  "hue-rotate": "deg",
  invert: "%", // Typically used with percentages
  opacity: "%", // Typically used with percentages
  saturate: "%", // Typically used with percentages
  sepia: "%", // Typically used with percentages
};

export const fontWeights = [
  "100 - Thin",
  "200 - Extra Light",
  "300 - Light",
  "400 - Regular",
  "500 - Medium",
  "600 - Semi Bold",
  "700 - Bold",
  "800 - Extra Bold",
  "900 - Black",
];

export const textOverflowValues = ["clip", "ellipsis", "inherit", "unset"];

export const overflowValues = [
  "auto",
  "hidden",
  "visible",
  "scroll",
  "initial",
];

export const displayValues = [
  "block",
  "inline",
  "inline-block",
  "flex",
  "grid",
  "none",
  "list-item",
];

export const flexDirectionValues = [
  "row",
  "row-reverse",
  "column",
  "column-reverse",
];

export const alignSelfValues = [
  "flex-start", // Aligns the item to the start of the container
  "center",     // Centers the item in the container
  "flex-end",   // Aligns the item to the end of the container
  "baseline",   // Aligns the item to the baseline of the container
  "stretch"    , // Stretches the item to fill the container
  "auto",       // Default. Aligns the item according to the parent's align-items value
];

export const alignItemsValues = [
  "stretch",    // Default. Stretches items to fill the container
  "flex-start", // Aligns items to the start of the container
  "flex-end",   // Aligns items to the end of the container
  "center",     // Centers items in the container
  "baseline",   // Aligns items to the baseline of the container
  "start",      // Aligns items to the start of the writing mode direction
  "end",        // Aligns items to the end of the writing mode direction
  "self-start", // Aligns items to the start of their margin box
  "self-end"    // Aligns items to the end of their margin box
];


export const alignContentValues = [
  "stretch",      // Default. Stretches lines to fill the container
  "flex-start",   // Packs lines to the start of the container
  "flex-end",     // Packs lines to the end of the container
  "center",       // Packs lines to the center of the container
  "space-between",// Distributes lines with space between them
  "space-around", // Distributes lines with space around them
  "space-evenly", // Distributes lines with equal space around them
  "start",        // Aligns lines to the start of the writing mode direction
  "end",          // Aligns lines to the end of the writing mode direction
  "baseline",     // Aligns lines to the baseline of the container
];



export const justifyContentValues = [
  "flex-start",    // Aligns items to the start of the container
  "flex-end",      // Aligns items to the end of the container
  "center",        // Centers items in the container
  "space-between", // Distributes items with space between them
  "space-around",  // Distributes items with space around them
  "space-evenly",  // Distributes items with equal space around them
  "start",         // Aligns items to the start of the writing mode direction
  "end",           // Aligns items to the end of the writing mode direction
  "left",          // Aligns items to the left of the container (for horizontal flex direction)
  "right",         // Aligns items to the right of the container (for horizontal flex direction)
  "safe center",   // Centers items in the container, but avoids positional instability
  "unsafe center"  // Centers items, without avoiding positional instability
];

export const justifySelfValues = [
  "auto",       // Default. Aligns the item according to the container's justify-items value
  "start",      // Aligns the item to the start of the container
  "end",        // Aligns the item to the end of the container
  "center",     // Centers the item within the container
  "stretch",    // Stretches the item to fill the container
  "self-start", // Aligns the item to the start of its margin box
  "self-end",   // Aligns the item to the end of its margin box
  "left",       // Aligns the item to the left (for block elements with horizontal direction)
  "right"       // Aligns the item to the right (for block elements with horizontal direction)
];

export const justifyItemsValues = [
  "auto",      // Default. Uses the alignment defined by the item's container (typically 'stretch')
  "start",     // Aligns items to the start of their grid area
  "end",       // Aligns items to the end of their grid area
  "center",    // Centers items within their grid area
  "stretch"    // Stretches items to fill their grid area (default behavior)
];



export const positionValues = [
  "static",
  "relative",
  "absolute",
  "fixed",
  "sticky",
  "initial",
  "inherit",
  "revert",
  "unset",
];

export const borderStyles = [
  "none", // No border
  "hidden", // Hidden border (equivalent to 'none', but used in tables)
  "dotted", // Dotted border
  "dashed", // Dashed border
  "solid", // Solid border
  "double", // Double border
  "groove", // Grooved border (appears as if carved)
  "ridge", // Ridged border (appears as if coming out)
  "inset", // Inset border (appears as if embedded)
  "outset", // Outset border (appears as if coming out)
];

export const textDecorationLineValues = [
  "none", // No text decoration.
  "underline", // Underlines the text.
  "overline", // Adds a line above the text.
  "line-through", // Strikes through the text.
  "blink", // Makes the text blink (not widely supported and considered obsolete).
  "inherit", // Inherits the text-decoration value from its parent element.
  "initial", // Sets the property to its default value.
  "unset", // Removes any inherited value and sets it to initial or inherit, based on context.
];

export const textDecorationStyleValues = [
  "solid", // A solid line (default).
  "double", // A double line.
  "dotted", // A dotted line.
  "dashed", // A dashed line.
  "wavy", // A wavy line.
  "inherit", // Inherits the value from its parent element.
  "initial", // Sets the property to its default value.
  "unset", // Removes any inherited value and sets it to initial or inherit, based on context.
];

export const wordBreakValues = [
  "normal", // Default. Uses the browser's default line break rules.
  "break-all", // Breaks words at any character to prevent overflow.
  "keep-all", // Keeps words unbroken unless a line break opportunity exists.
  "break-word", // Breaks words at the edge of the containing block (not standard, deprecated).
];

export const cssFonts = [
  "Arial",
  "Verdana",
  "Helvetica",
  "Tahoma",
  "Trebuchet MS",
  "Times New Roman",
  "Georgia",
  "Garamond",
  "Courier New",
  "Brush Script MT",
  "Comic Sans MS",
  "Impact",
  "Palatino Linotype",
  "Lucida Sans",
  "Lucida Console",
  "Arial Black",
  "Century Gothic",
  "Lucida Sans Unicode",
  "Franklin Gothic Medium",
  "Gill Sans",
  "Optima",
  "Futura",
  "Candara",
  "Geneva",
  "Courier",
  "MS Serif",
  "MS Sans Serif",
  "Perpetua",
  "Rockwell",
  "Symbol",
  "Webdings",
  "Wingdings",
  "Zapf Dingbats",
  "Bookman Old Style",
  "Book Antiqua",
  "Calisto MT",
  "Cambria",
  "Consolas",
  "Corbel",
  "Hoefler Text",
  "Minion Pro",
  "Myriad Pro",
  "Adobe Garamond",
  "Avant Garde",
  "Baskerville",
  "Didot",
  "Goudy Old Style",
  "Harrington",
  "ITC Franklin Gothic",
  "Letter Gothic",
  "Old English Text",
  "Stencil",
  "Vivaldi",
  "Monaco",
  "Bodoni MT",
  "Copperplate Gothic Light",
  "Wide Latin",
  "Tw Cen MT",
  "MS Gothic",
  "SimSun",
  "MingLiU",
  "PMingLiU",
  "Microsoft JhengHei",
  "Microsoft YaHei",
  "SimHei",
  "DFKai-SB",
  "Batang",
  "Gulim",
  "Dotum",
  "Gungsuh",
  "Malgun Gothic",
  "Nanum Gothic",
  "Noto Sans",
  "Noto Serif",
  "Roboto",
  "Open Sans",
  "Lato",
  "Oswald",
  "Raleway",
  "PT Sans",
  "PT Serif",
  "Playfair Display",
  "Montserrat",
  "Source Sans Pro",
  "Merriweather",
  "Ubuntu",
  "Nunito",
  "Rubik",
  "Mukta",
  "Poppins",
  "Cabin",
  "Oxygen",
  "Dancing Script",
  "Lobster",
  "Pacifico",
  "Shadows Into Light",
  "Indie Flower",
  "Amatic SC",
  "Josefin Sans",
  "Righteous",
  "Kalam",
  "Permanent Marker",
  "Fredericka the Great",
  "Caveat",
  "Quicksand",
  "Anton",
  "Bungee",
  "Crimson Text",
  "EB Garamond",
  "Cinzel",
  "Play",
  "Fira Sans",
  "Archivo",
  "Sarabun",
  "Asap",
  "Yanone Kaffeesatz",
  "Comfortaa",
  "Muli",
  "Titillium Web",
  "Arvo",
  "Karla",
  "Cormorant Garamond",
  "Bitter",
  "Notable",
  "Kanit",
  "Vollkorn",
  "Abril Fatface",
  "Satisfy",
  "Lobster Two",
  "Bangers",
  "Chewy",
  "Luckiest Guy",
  "Fredoka One",
  "Baloo",
  "Margarine",
  "Cookie",
  "Gloria Hallelujah",
  "Rock Salt",
  "Shadows Into Light Two",
  "Rancho",
  "Pacifico",
  "Great Vibes",
  "Sacramento",
  "Parisienne",
  "Kaushan Script",
  "Norican",
  "Courgette",
  "Lobster",
  "Yellowtail",
  "Dancing Script",
  "Pacifico",
  "Gloria Hallelujah",
  "Shadows Into Light",
];
