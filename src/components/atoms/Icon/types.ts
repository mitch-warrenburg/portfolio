import { IconName, IconPrefix } from '@fortawesome/fontawesome-common-types';
import { FontAwesomeIconProps } from '@fortawesome/react-fontawesome';

export interface IconProps extends FontAwesomeIconProps {
  icon: IconName;
  prefix?: IconPrefix;
}
