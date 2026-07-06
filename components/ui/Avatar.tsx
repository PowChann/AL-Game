import React from 'react';
import { View, Text, Image } from 'react-native';

interface AvatarProps {
  name: string;
  uri?: string | null;
  size?: number;
}

export const Avatar: React.FC<AvatarProps> = ({ name, uri, size = 40 }) => {
  const getInitials = (n: string) => {
    if (!n) return '?';
    const parts = n.trim().split(/\s+/);
    if (parts.length >= 2) {
      return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    }
    return parts[0].substring(0, 2).toUpperCase();
  };

  const fontSize = size * 0.45;

  return (
    <View
      style={{ width: size, height: size, borderRadius: size / 2 }}
      className="bg-surface items-center justify-center border border-primary/30 overflow-hidden"
    >
      {uri ? (
        <Image
          source={{ uri }}
          style={{ width: size, height: size }}
          resizeMode="cover"
        />
      ) : (
        <Text
          style={{ fontSize, color: '#6C63FF' }}
          className="font-bold font-heading text-center"
        >
          {getInitials(name)}
        </Text>
      )}
    </View>
  );
};

export default Avatar;
