import { createSignal } from "solid-js";

import PatternTypeList from "./PatternTypeList";
import PatternComponent from "../../components/Pattern";

import { PaternType } from "../../types";
import { patternPanelContainer, patternPaletteStyle } from "./style.css";
import { stillLifes, oscillators, spaceShips, Pattern } from "../../patterns";

const Patterns = (props: { type: PaternType; patterns: Pattern[] }) => {
  return (
    <div class={patternPaletteStyle}>
      {props.patterns.map((pattern) => (
        <PatternComponent pattern={pattern} />
      ))}
    </div>
  );
};

const PatternPanel = () => {
  const [patternType, setPatternType] = createSignal<PaternType>(
    PaternType.OSCILATOR
  );
  return (
    <div class={patternPanelContainer}>
      <PatternTypeList
        patternType={patternType()}
        setPatternType={setPatternType}
      />
      {patternType() === PaternType.OSCILATOR ? (
        <Patterns type={PaternType.OSCILATOR} patterns={oscillators} />
      ) : patternType() === PaternType.SPACE_SHIP ? (
        <Patterns type={PaternType.SPACE_SHIP} patterns={spaceShips} />
      ) : (
        <Patterns type={PaternType.STILL_LIFE} patterns={stillLifes} />
      )}
    </div>
  );
};

export default PatternPanel;
