import React, { FC } from 'react';
import styled from 'styled-components';
import { StatusIndicatorProps } from './types';

const Container = styled.div`
  margin-left: 16px;
  font-size: 0.875rem;
  position: relative;
`;

const Circle = styled.div<StatusIndicatorProps>`
  width: 6px;
  height: 6px;
  position: absolute;
  border-radius: 50%;
  top: 4px;
  left: -20px;
  background-color: ${({ theme, status }) => theme.colors.theme[status]};
`;

const StatusIndicator: FC<StatusIndicatorProps> = ({ status, children, ...props }) => {
  return (
    <Container {...props}>
      <Circle status={status} />
      {children}
    </Container>
  );
};

StatusIndicator.defaultProps = {
  status: 'active',
};

export default StatusIndicator;
