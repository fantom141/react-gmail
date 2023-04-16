import { ReactElement } from 'react';

export interface SplitPanelsProps {
  autoSaveId: string;
  leftElement: ReactElement | ReactElement[];
  rightElement: ReactElement | ReactElement[];
}
