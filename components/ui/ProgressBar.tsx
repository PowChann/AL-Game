import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';

interface ProgressBarProps {
  progress: number; // 0 to 100
  color?: string;
  height?: number;
  showLabel?: boolean;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  progress,
  color = '#6C63FF',
  height = 8,
  showLabel = false,
}) => {
  const animatedProgress = useSharedValue(0);

  useEffect(() => {
    const clampedProgress = Math.max(0, Math.min(100, progress));
    animatedProgress.value = withTiming(clampedProgress / 100, { duration: 800 });
  }, [progress]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      width: `${animatedProgress.value * 100}%`,
    };
  });

  return (
    <View className="flex-row items-center w-full">
      <View
        style={{ height, backgroundColor: '#252438' }}
        className="flex-1 rounded-full overflow-hidden"
      >
        <Animated.View
          style={[{
            height: '100%',
            backgroundColor: color,
          }, animatedStyle]}
          className="rounded-full"
        />
      </View>
      {showLabel && (
        <Text className="text-textMain font-bold font-body text-xs ml-3 text-right">
          {Math.round(progress)}%
        </Text>
      )}
    </View>
  );
};

export default ProgressBar;
