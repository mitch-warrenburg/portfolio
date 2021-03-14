import { ReactNode } from 'react';

export interface PageTemplateProps {
  header: ReactNode;
  footer: ReactNode;
  children: ReactNode;
}
