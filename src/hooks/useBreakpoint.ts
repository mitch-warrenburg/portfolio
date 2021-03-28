import { UseBreakpoint } from './types';
import { createBreakpoint } from 'react-use';

const useBreakpoint = createBreakpoint({ large: 720, small: 719 }) as UseBreakpoint;

export default useBreakpoint;
