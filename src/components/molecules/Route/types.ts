import { ComponentType } from 'react';

export interface RouteProps {
  path: string;
  exact?: boolean;
  admin?: boolean;
  component: ComponentType<any>;
}
