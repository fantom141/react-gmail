import { ComposeEmailFormValues, SaveAsDraftFormValues } from '../types';
import { DraftDto } from '@/store/api/draft-api';

export interface FormProps {
  draft: DraftDto;
  onSend: (data: ComposeEmailFormValues) => void;
  onSaveAsDraft: (data: SaveAsDraftFormValues) => void;
  sendIsLoading: boolean;
  saveAsDraftIsLoading: boolean;
}
