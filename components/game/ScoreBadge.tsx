import React from 'react';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface ScoreBadgeProps {
  icon: 'flame' | 'star' | 'checkmark-circle' | 'trophy';
  iconColor: string;
  value: string | number;
  label: string;
  className?: string;
}

export const ScoreBadge: React.FC<ScoreBadgeProps> = ({
  icon,
  iconColor,
  value,
  label,
  className = '',
}) => {
  return (
    <View
      className={`bg-cardBg border border-[#252438] rounded-[16px] p-3.5 items-center justify-center flex-1 mx-1.5 ${className}`}
    >
      <View className="flex-row items-center mb-1">
        <Ionicons name={icon} size={20} color={iconColor} style={{ marginRight: 6 }} />
        <Text className="text-textMain font-heading font-bold text-lg">{value}</Text>
      </View>
      <Text className="text-textMuted text-[11px] font-body text-center">{label}</Text>
    </View>
  );
};

export default ScoreBadge;
