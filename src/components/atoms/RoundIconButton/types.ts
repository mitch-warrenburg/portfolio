import { ButtonHTMLAttributes } from 'react';
import { IconName, IconPrefix } from '@fortawesome/fontawesome-common-types';

export interface RoundIconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  color?: string;
  icon: IconName;
  prefix?: IconPrefix;
}
