import { FieldError } from 'react-hook-form';

export type ControlErrorProps = Required<Pick<FieldError, 'message'>>;
