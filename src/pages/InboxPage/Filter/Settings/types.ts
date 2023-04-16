import { Control } from 'react-hook-form/dist/types/form';
import { InboxFilterValues } from '../types';

export interface SettingsProps {
  control: Control<InboxFilterValues>;
  onReset: () => void;
  onApply: () => void;
}
