import { ReactElement } from 'react';

export interface SplitPanelsProps {
  autoSaveId: string;
  left: ReactElement | ReactElement[];
  right: ReactElement | ReactElement[];
}
