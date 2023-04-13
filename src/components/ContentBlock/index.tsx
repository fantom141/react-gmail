import styles from './styles.module.scss';
import classnames from 'classnames';
import { ContentBlockProps } from './types';

export const ContentBlock = ({
  children,
  skipVerticalIndent,
  skipHorizontalIndent,
  transparent,
  borderRadius,
  className,
  ...restProps
}: ContentBlockProps) => {
  const classNames = classnames(
    styles.root,
    {
      [styles.skipVerticalIndent]: skipVerticalIndent,
      [styles.skipHorizontalIndent]: skipHorizontalIndent,
      [styles.transparent]: transparent,
      [styles.borderRadius]: borderRadius,
    },
    className
  );

  return (
    <div
      {...restProps}
      className={classNames}
    >
      {children}
    </div>
  );
};
