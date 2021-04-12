import { HTMLAttributes } from 'react';
import { Property } from 'csstype';

export interface FlexBoxProps extends HTMLAttributes<HTMLDivElement> {
  fullWidth?: boolean;
  fullHeight?: boolean;
  wrap?: Property.FlexWrap;
  margin?: Property.Margin;
  padding?: Property.Padding;
  align?: Property.AlignItems;
  justify?: Property.JustifyContent;
  direction?: Property.FlexDirection;
}
