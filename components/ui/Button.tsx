import React from 'react';
import { Pressable, Text, ActivityIndicator, View } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';

interface ButtonProps {
  title: string;
  onPress?: () => void;
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
  className?: string;
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  icon,
  className = '',
}) => {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  const handlePressIn = () => {
    if (!disabled && !loading) {
      scale.value = withSpring(0.97, { damping: 10, stiffness: 200 });
    }
  };

  const handlePressOut = () => {
    scale.value = withSpring(1, { damping: 10, stiffness: 200 });
  };

  // Styles based on variant
  let bgStyle = 'bg-primary';
  let textStyle = 'text-[#FFFFFE] font-medium';

  if (variant === 'secondary') {
    bgStyle = 'bg-transparent border border-primary';
    textStyle = 'text-primary';
  } else if (variant === 'danger') {
    bgStyle = 'bg-danger';
    textStyle = 'text-[#FFFFFE]';
  } else if (variant === 'ghost') {
    bgStyle = 'bg-transparent';
    textStyle = 'text-textMuted';
  }

  // Styles based on size
  let sizeStyle = 'py-3.5 px-6 rounded-[12px]';
  let textSizeStyle = 'text-base';

  if (size === 'sm') {
    sizeStyle = 'py-2 px-4 rounded-[10px]';
    textSizeStyle = 'text-sm';
  } else if (size === 'lg') {
    sizeStyle = 'py-4.5 px-8 rounded-[14px]';
    textSizeStyle = 'text-lg';
  }

  const isInteractionDisabled = disabled || loading;

  return (
    <AnimatedPressable
      onPress={isInteractionDisabled ? undefined : onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      disabled={isInteractionDisabled}
      style={[animatedStyle]}
      className={`flex-row justify-center items-center ${bgStyle} ${sizeStyle} ${isInteractionDisabled ? 'opacity-40' : ''} ${className}`}
    >
      {loading ? (
        <ActivityIndicator size="small" color={variant === 'secondary' || variant === 'ghost' ? '#4A9FD4' : '#FFFFFE'} className="mr-2" />
      ) : icon ? (
        <View className="mr-2">{icon}</View>
      ) : null}
      <Text className={`${textStyle} ${textSizeStyle} text-center font-bold font-body`}>{title}</Text>
    </AnimatedPressable>
  );
};

export default Button;
