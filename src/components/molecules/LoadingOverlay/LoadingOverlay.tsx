import React, { FC } from 'react';
import Loader from '../../atoms/Loader';
import Overlay from '../../atoms/Overlay';
import { LoadingOverlayProps } from './types';
import styled, { useTheme } from 'styled-components';

const ContentContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const LoadingMessage = styled.p`
  color: white;
  margin-top: 42px;
`;

const LoadingOverlay: FC<LoadingOverlayProps> = ({ message, isLoading, ...props }) => {
  const theme = useTheme();

  return (
    <Overlay active={isLoading} {...props}>
      <ContentContainer>
        <Loader color={theme.colors.theme.error} size={2} durationSeconds={1.5} />
        <LoadingMessage>{message}</LoadingMessage>
      </ContentContainer>
    </Overlay>
  );
};

LoadingOverlay.defaultProps = {
  message: '',
  isLoading: false,
};

export default LoadingOverlay;
