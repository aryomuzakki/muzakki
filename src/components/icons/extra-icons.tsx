import * as Icons from "./icons";
import { Fragment } from "react";

const ExtraSIcons = ({ iconName, color = "" }) => {
  if (Icons?.[iconName]) {
    const ExtraSIcon = Icons?.[iconName] ?? Fragment;
    return <ExtraSIcon color={color} />;
  }
  return Fragment;
};

export default ExtraSIcons;
