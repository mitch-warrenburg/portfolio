import React, { FC } from 'react';
import styled from 'styled-components';
import { StatusIndicatorProps } from './types';

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  text-transform: none;
  padding: 12px 0;
`;

const Circle = styled.div<StatusIndicatorProps>`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  margin-left: 8px;
  background-color: ${({ theme, status }) => theme.colors.theme[status]};
`;

const StatusIndicator: FC<StatusIndicatorProps> = ({ status, children, ...props }) => {
  return (
    <Container {...props}>
      {children}
      <Circle status={status} />
    </Container>
  );
};

StatusIndicator.defaultProps = {
  status: 'active',
};

export default StatusIndicator;
