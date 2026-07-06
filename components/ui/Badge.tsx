import React from 'react';
import { View, Text } from 'react-native';

interface BadgeProps {
  label: string;
  variant?: 'primary' | 'success' | 'warning' | 'danger' | 'neutral';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({ label, variant = 'primary', className = '' }) => {
  let bgStyle = 'bg-[#6C63FF]/20';
  let textStyle = 'text-primary';

  if (variant === 'success') {
    bgStyle = 'bg-[#2CB67D]/20';
    textStyle = 'text-success';
  } else if (variant === 'warning') {
    bgStyle = 'bg-[#FF8906]/20';
    textStyle = 'text-accent';
  } else if (variant === 'danger') {
    bgStyle = 'bg-[#FF4D6D]/20';
    textStyle = 'text-danger';
  } else if (variant === 'neutral') {
    bgStyle = 'bg-[#252438]/50';
    textStyle = 'text-textMuted';
  }

  return (
    <View className={`px-2.5 py-1 rounded-full items-center justify-center self-start ${bgStyle} ${className}`}>
      <Text className={`text-[12px] font-bold font-body ${textStyle}`}>{label}</Text>
    </View>
  );
};

export default Badge;
