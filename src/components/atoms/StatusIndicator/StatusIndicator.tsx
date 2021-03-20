import React, { FC } from 'react';
import styled from 'styled-components';
import { StatusIndicatorProps } from './types';

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 12px 0;
  font-size: 12px;
  text-transform: none;
`;

const Circle = styled.div<StatusIndicatorProps>`
  width: 8px;
  height: 8px;
  margin-left: 8px;
  background-color: ${({ theme, status }) => theme.colors.theme[status]};
  border-radius: 50%;
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
