export const colors = {
  primary: '#8AC960',
  primaryPressed: '#78B550',
  background: '#FFFFFF',
  inputBackground: '#F6F5FB',
  surface: '#F6F5FB',
  border: '#EFEFF4',
  title: '#2E3040',
  text: '#212121',
  label: '#2E3040',
  muted: '#9A9AA5',
  placeholder: '#B5B5C3',
  error: '#E5484D',
  danger: '#E5484D',
  dangerSoft: '#E8959A',
  white: '#FFFFFF',
} as const;

export const fonts = {
  regular: 'Roboto_400Regular',
  medium: 'Roboto_500Medium',
  bold: 'Roboto_700Bold',
} as const;

export const spacing = {
  screen: 20,
} as const;

export const radius = {
  input: 8,
  button: 10,
  card: 10,
} as const;

export const shadow = {
  shadowColor: '#2E3040',
  shadowOpacity: 0.06,
  shadowRadius: 8,
  shadowOffset: { width: 0, height: 2 },
  elevation: 2,
} as const;
