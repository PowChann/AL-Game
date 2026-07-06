import React from 'react';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface ScoreBadgeProps {
  icon: 'flame' | 'star' | 'checkmark-circle' | 'trophy' | 'ribbon' | 'medal';
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
      className={`bg-cardBg border border-borderLight rounded-[16px] p-3.5 items-center justify-center flex-1 mx-1.5 ${className}`}
    >
      {/* Icon inside a rounded square with 10% opacity bg */}
      <View 
        style={{ backgroundColor: `${iconColor}10` }} 
        className="w-10 h-10 rounded-xl items-center justify-center mb-2"
      >
        <Ionicons name={icon} size={20} color={iconColor} />
      </View>
      
      <Text className="text-textMain font-heading font-bold text-lg mb-0.5">{value}</Text>
      <Text className="text-textMuted text-[11px] font-body text-center">{label}</Text>
    </View>
  );
};

export default ScoreBadge;
