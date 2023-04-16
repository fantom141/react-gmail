import { HTMLAttributes } from 'react';

export interface ComposeEmailProps extends HTMLAttributes<HTMLDivElement> {
  onClose: () => void;
}

export type ComposeEmailFormValues = {
  email: string;
  subject?: string;
  content: string;
};
export type SaveAsDraftFormValues = Partial<ComposeEmailFormValues>;
