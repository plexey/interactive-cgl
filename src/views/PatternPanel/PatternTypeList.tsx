import {
  patternTypeListOption,
  patternTypeListOptionActive,
  patternTypeListStyle,
} from "./style.css";
import { PaternType } from "../../types";

const ListItemButton = (props: {
  onClick: () => void;
  active: boolean;
  text: string;
}) => {
  const activeStyles = [
    patternTypeListOption,
    patternTypeListOptionActive,
  ].join(" ");
  const inactiveStyles = patternTypeListOption;
  return (
    <button
      onClick={props.onClick}
      class={props.active ? activeStyles : inactiveStyles}
    >
      {props.text}
    </button>
  );
};

interface PatternTypeListProps {
  patternType: PaternType;
  setPatternType: (type: PaternType) => void;
}

const PatternTypeList = (props: PatternTypeListProps) => {
  return (
    <div class={patternTypeListStyle}>
      <ListItemButton
        active={props.patternType === PaternType.STILL_LIFE}
        onClick={() => props.setPatternType(PaternType.STILL_LIFE)}
        text="STILL LIFES"
      />
      <ListItemButton
        active={props.patternType === PaternType.OSCILATOR}
        onClick={() => props.setPatternType(PaternType.OSCILATOR)}
        text="OSCILATORS"
      />
      <ListItemButton
        active={props.patternType === PaternType.SPACE_SHIP}
        onClick={() => props.setPatternType(PaternType.SPACE_SHIP)}
        text="SPACE SHIPS"
      />
    </div>
  );
};

export default PatternTypeList;
