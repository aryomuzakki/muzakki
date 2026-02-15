import * as Icons from "@/components/icons/icons";
import * as SIcons from "@icons-pack/react-simple-icons";

const SILoader = ({ iconName, color = "" }) => {
  if (SIcons?.[iconName]) {
    const SIcon = SIcons[iconName];
    return (
      <SIcon
        {...(color === "default"
          ? {
              style: {
                color: SIcons[iconName + "Hex"],
              },
            }
          : {})}
      />
    );
  } else if (Icons?.[iconName]) {
    const ExtraSIcon = Icons[iconName];
    return <ExtraSIcon color={color} />;
  }
  return null;
};

export default SILoader;
