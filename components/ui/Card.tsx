import React from 'react';
import { View, ViewStyle, StyleProp } from 'react-native';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  style?: StyleProp<ViewStyle>;
}

export const Card: React.FC<CardProps> = ({ children, className = '', style }) => {
  return (
    <View
      style={style}
      className={`bg-cardBg rounded-[16px] p-4 border border-[#252438] ${className}`}
    >
      {children}
    </View>
  );
};

export default Card;
