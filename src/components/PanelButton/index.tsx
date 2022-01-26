import type { Component } from "solid-js";
import { panelButtonStyle, activePanelButtonStyle } from "./style.css";

interface IProps {
  action?: () => void;
  children?: any;
  active?: boolean;
}

const PanelButton = (props: IProps) => {
  return (
    <button
      onClick={props.action}
      class={
        props.active
          ? `${panelButtonStyle} ${activePanelButtonStyle}`
          : panelButtonStyle
      }
    >
      {props.children}
    </button>
  );
};

export default PanelButton;
