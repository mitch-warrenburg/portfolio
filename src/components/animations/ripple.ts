import { keyframes } from 'styled-components';

const ripple = (size = 1) => keyframes`
  0% {
    top: ${Math.abs(size) * 16}px;
    left: ${Math.abs(size) * 16}px;
    width: 0;
    height: 0;
    opacity: 0.8;
  }

  100% {
    top: 0;
    left: 0;
    width: ${Math.abs(size) * 32}px;
    height: ${Math.abs(size) * 32}px;
    opacity: 0;
  }
`;

export default ripple;
