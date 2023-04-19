import styles from './styles.module.scss';
import { ProgressLineProps } from './types';
import classnames from 'classnames';
import { useSelector } from 'react-redux';
import { inProgressSelector } from '@/store';

export const ProgressLine = ({ className, ...restProps }: ProgressLineProps) => {
  const inProgress = useSelector(inProgressSelector);
  const rootClassNames = classnames(styles.root, className);

  return (
    <div
      {...restProps}
      className={rootClassNames}
    >
      {inProgress && <div className={styles.line}></div>}
    </div>
  );
};
