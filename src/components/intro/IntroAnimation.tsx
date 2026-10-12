import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useMemo, useState } from 'react';
import {
  AccessibilityInfo,
  Animated,
  Easing,
  StyleSheet,
  Text,
  useWindowDimensions,
} from 'react-native';

import { colors, fonts } from '@/constants/theme';

const TILE = 160;
const ITEMS = ['🍎', '🥕', '🍋', '🥦', '🍇', '🥛', '🍞', '🧀'];
const TIK_AT = 800;
const TAK_AT = 1180;
const TAGLINE_AT = 1550;
const PLAYED_AT = 2700;

interface IntroAnimationProps {
  ready: boolean;
  onFinish: () => void;
}

export function IntroAnimation({ ready, onFinish }: IntroAnimationProps) {
  const { width, height } = useWindowDimensions();
  const cover = Math.ceil(Math.hypot(width, height)) + 40;

  const [values] = useState(() => ({
    fill: new Animated.Value(0),
    pop: new Animated.Value(0),
    invert: new Animated.Value(0),
    tik: new Animated.Value(0),
    tak: new Animated.Value(0),
    ripple1: new Animated.Value(0),
    ripple2: new Animated.Value(0),
    burst: ITEMS.map(() => new Animated.Value(0)),
    tagline: new Animated.Value(0),
    exit: new Animated.Value(0),
  }));
  const { fill, pop, invert, tik, tak, ripple1, ripple2, burst, tagline, exit } = values;

  const [played, setPlayed] = useState(false);

  useEffect(() => {
    SplashScreen.hideAsync();

    let cancelled = false;
    let timer: ReturnType<typeof setTimeout> | undefined;
    const native = { useNativeDriver: true };
    const beat = (value: Animated.Value, ring: Animated.Value) =>
      Animated.parallel([
        Animated.sequence([
          Animated.timing(value, {
            toValue: 1,
            duration: 120,
            easing: Easing.out(Easing.quad),
            ...native,
          }),
          Animated.spring(value, { toValue: 0, friction: 4, tension: 120, ...native }),
        ]),
        Animated.timing(ring, {
          toValue: 1,
          duration: 700,
          easing: Easing.out(Easing.cubic),
          ...native,
        }),
      ]);

    AccessibilityInfo.isReduceMotionEnabled().then((reduceMotion) => {
      if (cancelled) return;
      if (reduceMotion) {
        fill.setValue(1);
        invert.setValue(1);
        tagline.setValue(1);
        setPlayed(true);
        return;
      }

      const at = (ms: number, animation: Animated.CompositeAnimation) =>
        Animated.sequence([Animated.delay(ms), animation]);

      Animated.parallel([
        at(
          150,
          Animated.parallel([
            Animated.spring(pop, { toValue: 1, friction: 5, tension: 90, ...native }),
            Animated.timing(fill, {
              toValue: 1,
              duration: 650,
              easing: Easing.inOut(Easing.cubic),
              ...native,
            }),
            Animated.timing(invert, { toValue: 1, duration: 450, delay: 300, ...native }),
          ]),
        ),
        at(TIK_AT, beat(tik, ripple1)),
        at(TAK_AT, beat(tak, ripple2)),
        at(
          TAK_AT,
          Animated.stagger(
            45,
            burst.map((value) =>
              Animated.spring(value, { toValue: 1, friction: 6, tension: 70, ...native }),
            ),
          ),
        ),
        at(
          TAGLINE_AT,
          Animated.timing(tagline, {
            toValue: 1,
            duration: 450,
            easing: Easing.out(Easing.cubic),
            ...native,
          }),
        ),
      ]).start();

      timer = setTimeout(() => setPlayed(true), PLAYED_AT);
    });

    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [fill, pop, invert, tik, tak, ripple1, ripple2, burst, tagline]);

  useEffect(() => {
    if (!played || !ready) return;
    Animated.timing(exit, {
      toValue: 1,
      duration: 380,
      easing: Easing.in(Easing.quad),
      useNativeDriver: true,
    }).start(onFinish);
  }, [played, ready, exit, onFinish]);

  const itemPositions = useMemo(
    () =>
      ITEMS.map((_, i) => {
        const angle = (i / ITEMS.length) * Math.PI * 2 - Math.PI / 2;
        const radius = i % 2 === 0 ? 150 : 128;
        return { x: Math.cos(angle) * radius, y: Math.sin(angle) * radius };
      }),
    [],
  );

  const letterStyle = (value: Animated.Value, direction: 1 | -1) => ({
    transform: [
      { scale: value.interpolate({ inputRange: [0, 1], outputRange: [1, 1.22] }) },
      {
        rotate: value.interpolate({
          inputRange: [0, 1],
          outputRange: ['0deg', `${direction * 9}deg`],
        }),
      },
    ],
  });

  const rippleStyle = (value: Animated.Value) => ({
    opacity: value.interpolate({ inputRange: [0, 0.1, 1], outputRange: [0, 0.7, 0] }),
    transform: [{ scale: value.interpolate({ inputRange: [0, 1], outputRange: [1, 2.6] }) }],
  });

  return (
    <Animated.View
      pointerEvents="none"
      style={[
        styles.container,
        {
          opacity: exit.interpolate({ inputRange: [0, 1], outputRange: [1, 0] }),
          transform: [{ scale: exit.interpolate({ inputRange: [0, 1], outputRange: [1, 1.08] }) }],
        },
      ]}>
      <Animated.View
        style={[
          styles.cover,
          {
            width: cover,
            height: cover,
            borderRadius: cover / 2,
            transform: [
              { scale: fill.interpolate({ inputRange: [0, 1], outputRange: [TILE / cover, 1] }) },
            ],
          },
        ]}
      />

      <Animated.View style={[styles.ripple, rippleStyle(ripple1)]} />
      <Animated.View style={[styles.ripple, rippleStyle(ripple2)]} />

      {ITEMS.map((item, i) => {
        const value = burst[i];
        const { x, y } = itemPositions[i];
        return (
          <Animated.Text
            key={item}
            style={[
              styles.item,
              {
                opacity: value.interpolate({ inputRange: [0, 0.3, 1], outputRange: [0, 1, 1] }),
                transform: [
                  { translateX: value.interpolate({ inputRange: [0, 1], outputRange: [0, x] }) },
                  { translateY: value.interpolate({ inputRange: [0, 1], outputRange: [0, y] }) },
                  { scale: value.interpolate({ inputRange: [0, 1], outputRange: [0.2, 1] }) },
                  {
                    rotate: value.interpolate({
                      inputRange: [0, 1],
                      outputRange: ['0deg', `${i % 2 === 0 ? 20 : -20}deg`],
                    }),
                  },
                ],
              },
            ]}>
            {item}
          </Animated.Text>
        );
      })}

      <Animated.View
        style={[
          styles.tile,
          {
            transform: [
              {
                scale: pop.interpolate({ inputRange: [0, 1], outputRange: [1, 1.12] }),
              },
            ],
          },
        ]}>
        <Animated.View style={[styles.tileInverted, { opacity: invert }]} />
        <Animated.View style={letterStyle(tik, -1)}>
          <Text style={styles.letters}>TIK</Text>
          <Animated.Text style={[styles.letters, styles.lettersInverted, { opacity: invert }]}>
            TIK
          </Animated.Text>
        </Animated.View>
        <Animated.View style={letterStyle(tak, 1)}>
          <Text style={styles.letters}>TAK</Text>
          <Animated.Text style={[styles.letters, styles.lettersInverted, { opacity: invert }]}>
            TAK
          </Animated.Text>
        </Animated.View>
      </Animated.View>

      <Animated.Text
        style={[
          styles.tagline,
          {
            opacity: tagline,
            transform: [
              { translateY: tagline.interpolate({ inputRange: [0, 1], outputRange: [16, 0] }) },
            ],
          },
        ]}>
        Sifarişin qapında — tik-tak!
      </Animated.Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFill,
    zIndex: 10,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  cover: {
    position: 'absolute',
    backgroundColor: colors.primary,
  },
  ripple: {
    position: 'absolute',
    width: TILE,
    height: TILE,
    borderRadius: TILE / 2,
    borderWidth: 3,
    borderColor: colors.white,
  },
  item: {
    position: 'absolute',
    fontSize: 38,
  },
  tile: {
    width: TILE,
    height: TILE,
    borderRadius: TILE * 0.22,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  tileInverted: {
    ...StyleSheet.absoluteFill,
    backgroundColor: colors.white,
  },
  letters: {
    color: colors.white,
    fontFamily: fonts.black,
    fontSize: 43,
    lineHeight: 46,
    textAlign: 'center',
    includeFontPadding: false,
  },
  lettersInverted: {
    ...StyleSheet.absoluteFill,
    color: colors.primary,
  },
  tagline: {
    position: 'absolute',
    bottom: '22%',
    color: colors.white,
    fontFamily: fonts.medium,
    fontSize: 17,
  },
});
