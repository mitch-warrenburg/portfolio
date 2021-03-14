import React, { FC, memo } from 'react';
import { OptionalProps } from './types';

const Optional: FC<OptionalProps> = memo(({ children, renderIf }) => (
  <>{renderIf ? children : null}</>
));

export default Optional;
