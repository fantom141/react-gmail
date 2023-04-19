import { object, string } from 'yup';
import { ReplyFormValues } from './types';
import { MessageControllerCreateMessageApiArg, MessageDto } from '@/store/api/message-api';
import { User } from 'firebase/auth';

export const replyFormValidationSchema = object({
  subject: string(),
  content: string().required(),
});

export const toCreateMessageDto = ({
  formValues: { subject, content },
  openedMessage,
  curUser,
}: {
  formValues: ReplyFormValues;
  openedMessage: MessageDto;
  curUser: User;
}): MessageControllerCreateMessageApiArg => {
  const { sender, recipient } = openedMessage;
  const email = curUser.email === sender.email ? recipient.email : sender.email;

  return {
    createMessageDto: {
      subject,
      content,
      threadId: openedMessage.threadId,
      email,
    },
  };
};
