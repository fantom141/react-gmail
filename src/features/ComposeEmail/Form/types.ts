import { ComposeEmailFormValues, SaveAsDraftFormValues } from '../types';

export interface FormProps {
  onSend: (data: ComposeEmailFormValues) => void;
  onSaveAsDraft: (data: SaveAsDraftFormValues) => void;
  sendIsLoading: boolean;
  saveAsDraftIsLoading: boolean;
}
