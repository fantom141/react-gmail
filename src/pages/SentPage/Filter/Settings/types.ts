import { Control } from 'react-hook-form/dist/types/form';
import { SentFilterValues } from '../types';

export interface SettingsProps {
  control: Control<SentFilterValues>;
  onReset: () => void;
  onApply: () => void;
}
