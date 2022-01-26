import PatternCanvas from "./PatternCanvas";

import {
  patternButtonStyle,
  patternHeader,
  patternCanvasContainer,
  activepatternButtonStyle,
  activePatternHeader,
} from "./style.css";

import { setSelectedPattern, state } from "../../stores";
import { Pattern as PatternType } from "../../patterns";

interface IProps {
  pattern: PatternType;
}

const Pattern = (props: IProps) => {
  const handleClick = () => setSelectedPattern(props.pattern);
  return (
    <button
      onClick={handleClick}
      class={
        state.selectedPattern?.id === props.pattern.id
          ? `${patternButtonStyle} ${activepatternButtonStyle}`
          : patternButtonStyle
      }
    >
      <label
        class={
          state.selectedPattern?.id === props.pattern.id
            ? `${activePatternHeader} ${patternHeader}`
            : patternHeader
        }
      >
        {props.pattern.name}
      </label>
      <div class={patternCanvasContainer}>
        <PatternCanvas
          patternPeriod={props.pattern.period}
          matrix={props.pattern.matrix}
        />
      </div>
    </button>
  );
};

export default Pattern;
