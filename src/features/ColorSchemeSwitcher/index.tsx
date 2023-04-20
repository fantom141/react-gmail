import { IconMoon, IconSun } from '@/components/Icon';
import { Button, Tooltip } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { colorSchemeSelector, setColorSchemeAction, ColorSchemes } from '@/store';
import { localStorageService } from '@/services';
import { LocalStorageKeys } from '@/configs';
import { ColorSchemeProps } from './types';

export const ColorSchemeSwitcher = ({ size, ...props }: ColorSchemeProps) => {
  const dispatch = useDispatch();
  const scheme = useSelector(colorSchemeSelector);

  const changeScheme = () => {
    const toUpdate = scheme === ColorSchemes.LIGHT ? ColorSchemes.DARK : ColorSchemes.LIGHT;
    dispatch(setColorSchemeAction(toUpdate));
    localStorageService.set(LocalStorageKeys.COLOR_SCHEME, toUpdate);
  };

  return (
    <Tooltip
      title={scheme === ColorSchemes.LIGHT ? 'dark' : 'light'}
      placement="bottom"
      {...props}
    >
      <Button
        type="text"
        size={size}
        icon={scheme === ColorSchemes.LIGHT ? <IconMoon /> : <IconSun />}
        onClick={changeScheme}
      />
    </Tooltip>
  );
};
