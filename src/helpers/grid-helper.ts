export const getAlignmentClass = (alignment: "left" | "center" | "right") => {
  switch (alignment) {
    case "left":
      return "text-left justify-start";
    case "right":
      return "text-right justify-end";
    default:
      return "text-center justify-center";
  }
};
