import { keyframes } from 'styled-components';

const blink = (isBlinking = false) => keyframes`
  0%, 50% {
    opacity: 1;
  }

  51%, 100% {
    opacity: ${isBlinking ? 0 : 1};
  }
`;

export default blink;
