import styles from './styles.module.scss';
import { ScrollableProps, ScrollableRef } from './types';
import { forwardRef, useImperativeHandle, useRef } from 'react';

export const Scrollable = forwardRef<ScrollableRef, ScrollableProps>(({ maxHeight = '100%', children }, ref) => {
  const rootRef = useRef<HTMLDivElement>();

  useImperativeHandle(ref, () => ({
    scrollBottom: (): void => {
      setTimeout(() => {
        rootRef.current.scrollTo({ top: rootRef.current.scrollHeight, behavior: 'smooth' });
      });
    },
    scrollByIdAttr: (idAttr: string): HTMLElement => {
      const rootTop = rootRef.current.getBoundingClientRect().top;
      const el = document.getElementById(idAttr);
      const elTop = el.getBoundingClientRect().top;
      rootRef.current.scrollTo({ top: elTop - rootTop });

      return el;
    },
  }));

  return (
    <div
      ref={rootRef}
      className={styles.root}
      style={{ maxHeight }}
    >
      {children}
    </div>
  );
});

export type { ScrollableRef };
