import { HTMLAttributes } from 'react';

export interface LegendItemProps extends HTMLAttributes<HTMLDivElement> {
  color: string;
  text: string;
}
