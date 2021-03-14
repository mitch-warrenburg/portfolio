import React, { FC } from 'react';
import { IconProps } from './types';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { library, findIconDefinition } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

library.add(fab, fas, far);

const Icon: FC<IconProps> = ({ icon, prefix = 'fas', ...props }) => {
  return <FontAwesomeIcon {...props} icon={findIconDefinition({ iconName: icon, prefix })} />;
};

Icon.defaultProps = {
  prefix: 'fas',
};

export default Icon;
