import * as SIcons from "@icons-pack/react-simple-icons";
import { Fragment } from "react";

const SILoader = ({ iconName }) => {
  const SIcon = SIcons?.[iconName] ?? Fragment;
  return <SIcon />;
};

export default SILoader;
