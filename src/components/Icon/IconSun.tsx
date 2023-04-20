import { CustomIconComponentProps } from '@ant-design/icons/lib/components/Icon';
import Icon from '@ant-design/icons';

export const IconSun = (props: Partial<CustomIconComponentProps>) => {
  const icon = () => (
    <svg
      width="1em"
      height="1em"
      fill="currentColor"
      viewBox="0 0 1024 1024"
    >
      <path d="M512 768c-140.8 0-256-115.2-256-256s115.2-256 256-256 256 115.2 256 256-115.2 256-256 256z m0-426.666667c-93.866667 0-170.666667 76.8-170.666667 170.666667s76.8 170.666667 170.666667 170.666667 170.666667-76.8 170.666667-170.666667-76.8-170.666667-170.666667-170.666667zM512 170.666667c-25.6 0-42.666667-17.066667-42.666667-42.666667V42.666667c0-25.6 17.066667-42.666667 42.666667-42.666667s42.666667 17.066667 42.666667 42.666667v85.333333c0 25.6-17.066667 42.666667-42.666667 42.666667zM512 1024c-25.6 0-42.666667-17.066667-42.666667-42.666667v-85.333333c0-25.6 17.066667-42.666667 42.666667-42.666667s42.666667 17.066667 42.666667 42.666667v85.333333c0 25.6-17.066667 42.666667-42.666667 42.666667zM238.933333 281.6c-12.8 0-21.333333-4.266667-29.866666-12.8L149.333333 209.066667c-17.066667-17.066667-17.066667-42.666667 0-59.733334s42.666667-17.066667 59.733334 0l59.733333 59.733334c17.066667 17.066667 17.066667 42.666667 0 59.733333-4.266667 8.533333-17.066667 12.8-29.866667 12.8zM844.8 887.466667c-12.8 0-21.333333-4.266667-29.866667-12.8l-59.733333-59.733334c-17.066667-17.066667-17.066667-42.666667 0-59.733333s42.666667-17.066667 59.733333 0l59.733334 59.733333c17.066667 17.066667 17.066667 42.666667 0 59.733334-8.533333 8.533333-21.333333 12.8-29.866667 12.8zM128 554.666667H42.666667c-25.6 0-42.666667-17.066667-42.666667-42.666667s17.066667-42.666667 42.666667-42.666667h85.333333c25.6 0 42.666667 17.066667 42.666667 42.666667s-17.066667 42.666667-42.666667 42.666667zM981.333333 554.666667h-85.333333c-25.6 0-42.666667-17.066667-42.666667-42.666667s17.066667-42.666667 42.666667-42.666667h85.333333c25.6 0 42.666667 17.066667 42.666667 42.666667s-17.066667 42.666667-42.666667 42.666667zM179.2 887.466667c-12.8 0-21.333333-4.266667-29.866667-12.8-17.066667-17.066667-17.066667-42.666667 0-59.733334l59.733334-59.733333c17.066667-17.066667 42.666667-17.066667 59.733333 0s17.066667 42.666667 0 59.733333l-59.733333 59.733334c-8.533333 8.533333-17.066667 12.8-29.866667 12.8zM785.066667 281.6c-12.8 0-21.333333-4.266667-29.866667-12.8-17.066667-17.066667-17.066667-42.666667 0-59.733333l59.733333-59.733334c17.066667-17.066667 42.666667-17.066667 59.733334 0s17.066667 42.666667 0 59.733334l-59.733334 59.733333c-8.533333 8.533333-21.333333 12.8-29.866666 12.8z"></path>
    </svg>
  );

  return (
    <Icon
      component={icon}
      {...props}
    />
  );
};
