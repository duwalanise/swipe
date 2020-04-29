import React, { useRef, useState, useMemo, useEffect } from 'react';
import {
  View,
  Animated,
  PanResponder,
  Dimensions,
  LayoutAnimation,
  UIManager,
} from 'react-native';
import { StyleSheet } from 'react-native';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SWIPE_THRESHOLD = 0.25 * SCREEN_WIDTH;
const SWIPE_OUT_DURATION = 250;
const RIGHT = 'right';
const LEFT = 'left';

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const Deck = ({
  renderCard,
  data,
  onSwipeRight,
  onSwipeLeft,
  renderNoMoreCard,
}) => {
  const [currentItem, setCurrentItem] = useState(0);
  const refIndex = useRef(currentItem);
  const position = useRef(new Animated.ValueXY()).current;

  useEffect(() => {
    if (currentItem >= data.length) {
      setCurrentItem(0);
    }
    refIndex.current = currentItem;
  }, [currentItem]);

  const panResponder = useMemo(
    () =>
      PanResponder.create({
        onStartShouldSetPanResponder: (evt, gestureState) => true,
        onPanResponderMove: (evt, gestureState) => {
          position.setValue({ x: gestureState.dx, y: gestureState.dy });
        },
        onPanResponderRelease: (evt, gestureState) => {
          if (gestureState.dx > SWIPE_THRESHOLD) {
            forceSwipe(RIGHT);
          } else if (gestureState.dx < -SWIPE_THRESHOLD) {
            forceSwipe(LEFT);
          } else {
            resetPosition();
          }
        },
      }),
    [],
  );

  const forceSwipe = (direction) => {
    Animated.timing(position, {
      toValue: {
        x: direction === RIGHT ? SCREEN_WIDTH : -SCREEN_WIDTH,
        y: 0,
      },
      duration: SWIPE_OUT_DURATION,
    }).start(() => onSwipeComplete(direction));
  };

  const onSwipeComplete = (direction) => {
    const item = data[refIndex.current];
    direction === RIGHT ? onSwipeRight(item) : onSwipeLeft(item);
    position.setValue({ x: 0, y: 0 });
    LayoutAnimation.spring();
    setCurrentItem(refIndex.current + 1);
  };
  const resetPosition = () => {
    Animated.spring(position, {
      toValue: { x: 0, y: 0 },
    }).start();
  };

  const getCardStyle = () => {
    const rotate = position.x.interpolate({
      inputRange: [-SCREEN_WIDTH, 0, SCREEN_WIDTH],
      outputRange: ['-120deg', '0deg', '120deg'],
    });
    return {
      ...position.getLayout(),
      transform: [{ rotate }],
    };
  };

  return (
    <View>
      {data
        .map((item, idx) => {
          if (idx < currentItem) {
            return null;
          }
          if (idx === currentItem) {
            return (
              <Animated.View
                key={item.id}
                style={[getCardStyle(), styles.cardStyle]}
                {...panResponder.panHandlers}
              >
                {renderCard(item)}
              </Animated.View>
            );
          }
          return (
            <Animated.View
              key={item.id}
              style={[styles.cardStyle, { top: 10 * (idx - currentItem) }]}
            >
              {renderCard(item)}
            </Animated.View>
          );
        })
        .reverse()}
    </View>
  );
};

const styles = StyleSheet.create({
  cardStyle: {
    zIndex: 1,
    position: 'absolute',
    width: SCREEN_WIDTH,
    height: 300,
  },
});

export default Deck;
