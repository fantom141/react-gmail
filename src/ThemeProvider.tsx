import { PropsWithChildren, useEffect, useMemo } from 'react';
import { ConfigProvider, theme } from 'antd';

const { useToken } = theme;

const CssVarsByTheme = ({ children }: PropsWithChildren) => {
  const domStyle = useMemo(() => document.documentElement.style, []);

  const {
    token: {
      colorBgContainer,
      colorBgBase,
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
    domStyle.setProperty('--color-bg-container', colorBgContainer);
    domStyle.setProperty('--color-bg-base', colorBgBase);
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
    colorBgBase,
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

  return <>{children}</>;
};

export const ThemeProvider = ({ children }: PropsWithChildren) => {
  return (
    <ConfigProvider
      theme={{
        token: {
          // seed tokens
          colorPrimary: '#0051fe',
          colorError: '#E1605F',
          fontFamily: 'LuxoraGrotesk, system-ui, sans-serif',

          // map tokens
          colorText: '#686D79', // for Title color set in index.css
          colorTextBase: '#686D79',
          colorIcon: '#686D79',
          colorBgContainer: '#fefefe',
          colorBgElevated: '#fefefe',
          colorBgLayout: '#fbfbfb',
          colorBorderSecondary: '#e9e9e9',
        },
        components: {
          Typography: {
            colorTextDescription: '#686D79A6',
          },
          Tooltip: {
            colorBgDefault: '#686D79',
            fontSize: 12,
            sizePopupArrow: 0,
          },
        },
      }}
      componentSize="large"
      input={{ autoComplete: 'off' }}
      form={{ requiredMark: false }}
    >
      <CssVarsByTheme>{children}</CssVarsByTheme>
    </ConfigProvider>
  );
};
