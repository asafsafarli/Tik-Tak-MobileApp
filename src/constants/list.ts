import { Platform } from 'react-native';

export const gridListProps = {
  initialNumToRender: 6,
  maxToRenderPerBatch: 6,
  windowSize: 7,
  removeClippedSubviews: Platform.OS === 'android',
} as const;
