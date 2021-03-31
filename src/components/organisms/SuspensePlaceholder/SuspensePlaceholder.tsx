import React, { FC } from 'react';
import LoadingOverlay from '../../molecules/LoadingOverlay';

const SuspensePlaceholder: FC = () => (
  <LoadingOverlay message="Getting things ready..." isLoading />
);

export default SuspensePlaceholder;
