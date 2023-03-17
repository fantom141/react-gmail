import { InferType, object, string } from 'yup';

export const composeEmailFormValidationSchema = object({
  email: string().email('email format is incorrect').required('Required field'),
  subject: string(),
  content: string().required('Required field'),
});

export type ComposeEmailFormData = InferType<typeof composeEmailFormValidationSchema>;
