import { HTMLAttributes } from 'react';

export interface LegendItemConfig {
  text: string;
  color: string;
}

export interface LegendProps extends HTMLAttributes<HTMLDivElement> {
  items: ReadonlyArray<LegendItemConfig>;
}
