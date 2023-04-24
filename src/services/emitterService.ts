import EventEmitter from 'eventemitter3';
import { MessageDto } from '@/store/api/message-api';
import { DraftDto } from '@/store/api/draft-api';

type EmitterEvents = {
  MESSAGE_SENT: MessageDto;
  COMPOSE_OPENED: undefined;
  DRAFT_OPENED: DraftDto;
  DRAFT_CLOSED: number;
  DRAFT_SAVED: DraftDto;
};

const eventEmitter = new EventEmitter();

const emitterService = {
  on: <E extends keyof EmitterEvents, P extends EmitterEvents[E]>(event: E, fn: (payload: P) => void) => eventEmitter.on(event, fn),
  once: <E extends keyof EmitterEvents, P extends EmitterEvents[E]>(event: E, fn: (payload: P) => void) => eventEmitter.once(event, fn),
  off: <E extends keyof EmitterEvents, P extends EmitterEvents[E]>(event: E, fn?: (payload: P) => void) => eventEmitter.off(event, fn),
  emit: <E extends keyof EmitterEvents, P extends EmitterEvents[E]>(event: E, payload?: P) => eventEmitter.emit(event, payload),
};

Object.freeze(emitterService);

export { emitterService };
