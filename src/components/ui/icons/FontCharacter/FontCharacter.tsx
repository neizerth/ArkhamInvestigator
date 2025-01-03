import { useAppSelector } from "@/hooks/useAppSelector";
import { selectIcons } from "@/store/features/icons/icons";
import { propEq } from "ramda";

export const FontCharacter = ({
  icon
}: {
  icon: string
}) => {
  const icons = useAppSelector(selectIcons);
    const entry = icons.find(propEq(icon, 'icon'));
  
    const char = entry && String.fromCharCode(entry.code);
  return (
    <>{char}</>
  )
}