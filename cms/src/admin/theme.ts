import { lightTheme, darkTheme, extendTheme } from '@strapi/design-system';

// Kept in sync by hand with the frontend's src/app/globals.css color tokens.
// If the brand palette changes there, update the two palettes below to match.
const palettes = {
  light: {
    accent: '#1e6fd9',
    accentDark: '#0f4c86',
    accentSoft: '#e8f1fc',
    navy: '#0e2c4e',
    success: '#1f8f61',
    danger: '#c23b30',
  },
  dark: {
    accent: '#4c9fec',
    accentDark: '#2e86de',
    accentSoft: '#15283f',
    navy: '#15385e',
    success: '#34c486',
    danger: '#f0685a',
  },
};

function hexToRgb(hex: string) {
  const value = hex.replace('#', '');
  return {
    r: parseInt(value.slice(0, 2), 16),
    g: parseInt(value.slice(2, 4), 16),
    b: parseInt(value.slice(4, 6), 16),
  };
}

function toHexByte(n: number) {
  return Math.max(0, Math.min(255, Math.round(n))).toString(16).padStart(2, '0');
}

// Mixes `hex` toward white (ratio > 0, a lighter tint) or black (ratio < 0, a
// darker shade) by `ratio` (0-1) — used to derive a full color scale from a
// single brand color instead of hand-picking every shade.
function mix(hex: string, ratio: number) {
  const { r, g, b } = hexToRgb(hex);
  const target = ratio > 0 ? 255 : 0;
  const amount = Math.abs(ratio);
  return `#${toHexByte(r + (target - r) * amount)}${toHexByte(g + (target - g) * amount)}${toHexByte(b + (target - b) * amount)}`;
}

function scale(base: string) {
  return {
    100: mix(base, 0.92),
    200: mix(base, 0.78),
    500: base,
    600: mix(base, -0.18),
    700: mix(base, -0.34),
  };
}

function buildColors(palette: (typeof palettes)['light']) {
  const primary = scale(palette.accent);
  const success = scale(palette.success);
  const danger = scale(palette.danger);

  return {
    primary100: primary[100],
    primary200: primary[200],
    primary500: primary[500],
    primary600: palette.accentDark,
    primary700: palette.navy,
    buttonPrimary500: primary[500],
    buttonPrimary600: palette.accentDark,
    success100: success[100],
    success200: success[200],
    success500: success[500],
    success600: success[600],
    success700: success[700],
    danger100: danger[100],
    danger200: danger[200],
    danger500: danger[500],
    danger600: danger[600],
    danger700: danger[700],
  };
}

export const solbathLightTheme = extendTheme(lightTheme, { colors: buildColors(palettes.light) });
export const solbathDarkTheme = extendTheme(darkTheme, { colors: buildColors(palettes.dark) });
