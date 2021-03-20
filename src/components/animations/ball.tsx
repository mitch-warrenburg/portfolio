import { keyframes } from 'styled-components';

const ball = keyframes`
  from {
    transform: translateY(0) scaleY(.8);
  }

  to {
    transform: translateY(-10px);
  }
`;

export default ball;
