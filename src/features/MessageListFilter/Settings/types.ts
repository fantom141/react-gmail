import { PropsWithChildren } from 'react';

export interface SettingsProps extends PropsWithChildren {
  onReset: () => void;
  onApply: () => void;
}
