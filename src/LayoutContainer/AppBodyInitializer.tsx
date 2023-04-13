import { PropsWithChildren, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, authTokenSelector, syncAuthState } from '@/store';
import { AppLoading } from '@/components/AppLoading';
import { theme } from 'antd';

const { useToken } = theme;

export const AppBodyInitializer = ({ children }: PropsWithChildren) => {
  const dispatch = useDispatch<AppDispatch>();
  const token = useSelector(authTokenSelector);
  const domStyle = useMemo(() => document.documentElement.style, []);

  const {
    token: {
      colorBgContainer,
      colorPrimary,
      colorPrimaryBorder,
      colorPrimaryBg,
      colorText,
      colorTextSecondary,
      colorTextTertiary,
      colorTextQuaternary,
      colorBorder,
      borderRadius,
      motionEaseInOut,
      motionDurationSlow,
    },
  } = useToken();

  useEffect(() => {
    dispatch(syncAuthState(false));
  }, [dispatch]);

  useEffect(() => {
    domStyle.setProperty('--color-bg-container', colorBgContainer);
    domStyle.setProperty('--color-primary', colorPrimary);
    domStyle.setProperty('--color-primary-border', colorPrimaryBorder);
    domStyle.setProperty('--color-primary-bg', colorPrimaryBg);
    domStyle.setProperty('--color-text', colorText);
    domStyle.setProperty('--color-text-secondary', colorTextSecondary);
    domStyle.setProperty('--color-text-tertiary', colorTextTertiary);
    domStyle.setProperty('--color-text-quaternary', colorTextQuaternary);
    domStyle.setProperty('--color-border', colorBorder);
    domStyle.setProperty('--border-radius', `${borderRadius}px`);
    domStyle.setProperty('--motion-ease-in-out', motionEaseInOut);
    domStyle.setProperty('--motion-duration-slow', motionDurationSlow);
  }, [
    domStyle,
    colorBgContainer,
    colorPrimary,
    colorPrimaryBorder,
    colorPrimaryBg,
    colorBorder,
    colorText,
    colorTextSecondary,
    colorTextTertiary,
    colorTextQuaternary,
    borderRadius,
    motionEaseInOut,
    motionDurationSlow,
  ]);

  return !token ? <AppLoading /> : <>{children}</>;
};
