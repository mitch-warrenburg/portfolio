import { HTMLAttributes } from "react";
import { Property } from "csstype";

export interface FlexBoxProps extends HTMLAttributes<HTMLDivElement> {
  align?: Property.AlignItems;
  justify?: Property.JustifyContent;
  direction?: Property.FlexDirection;
}