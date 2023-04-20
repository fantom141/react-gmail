import { PropsWithChildren, useEffect, useMemo } from 'react';
import { ConfigProvider, theme } from 'antd';
import { useSelector } from 'react-redux';
import { ColorSchemes, colorSchemeSelector } from '@/store';

const { useToken, darkAlgorithm, defaultAlgorithm } = theme;

const CssVarsByTheme = ({ scheme, children }: PropsWithChildren<{ scheme: ColorSchemes }>) => {
  const domStyle = useMemo(() => document.documentElement.style, []);

  const {
    token: {
      colorBgLayout,
      colorBgContainer,
      colorBgElevated,
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
      borderRadiusLG,
      motionEaseInOut,
      motionDurationSlow,
    },
  } = useToken();

  useEffect(() => {
    domStyle.setProperty('--color-bg-layout', colorBgLayout);
    domStyle.setProperty('--color-bg-container', colorBgContainer);
    domStyle.setProperty('--color-bg-elevated', colorBgElevated);
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
    domStyle.setProperty('--border-radius-lg', `${borderRadiusLG}px`);
    domStyle.setProperty('--motion-ease-in-out', motionEaseInOut);
    domStyle.setProperty('--motion-duration-slow', motionDurationSlow);

    domStyle.setProperty('--color-surface-darker', scheme === ColorSchemes.LIGHT ? '#F4F6F8' : colorBgContainer);
  }, [
    domStyle,
    colorBgLayout,
    colorBgContainer,
    colorBgElevated,
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
    borderRadiusLG,
    motionEaseInOut,
    motionDurationSlow,
  ]);

  return <>{children}</>;
};

export const ThemeProvider = ({ children }: PropsWithChildren) => {
  const scheme = useSelector(colorSchemeSelector);

  return (
    <ConfigProvider
      theme={{
        algorithm: scheme === ColorSchemes.LIGHT ? defaultAlgorithm : darkAlgorithm,
        token: {
          // seed tokens
          colorPrimary: '#0051fe',
          colorError: '#E1605F',
          fontFamily: 'LuxoraGrotesk, system-ui, sans-serif',

          // map tokens
          colorText: '#686D79', // for Title color set in index.css
          colorTextBase: '#686D79',
          colorIcon: '#686D79',
          colorBgContainer: scheme === ColorSchemes.LIGHT ? '#fefefe' : '#1d1d1d',
          colorBgElevated: scheme === ColorSchemes.LIGHT ? '#fefefe' : '#1f1f1f',
          colorBgLayout: scheme === ColorSchemes.LIGHT ? '#fbfbfb' : '#121212',
          colorBorderSecondary: scheme === ColorSchemes.LIGHT ? '#e9e9e9' : '#424242',
        },
        components: {
          Typography: {
            colorTextDescription: '#686D79A6',
          },
          Tooltip: {
            colorBgDefault: scheme === ColorSchemes.LIGHT ? '#686D79' : '#1f1f1f',
            fontSize: 12,
            sizePopupArrow: 0,
          },
        },
      }}
      componentSize="large"
      input={{ autoComplete: 'off' }}
      form={{ requiredMark: false }}
    >
      <CssVarsByTheme scheme={scheme}>{children}</CssVarsByTheme>
    </ConfigProvider>
  );
};
