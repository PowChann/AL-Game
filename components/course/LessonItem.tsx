import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Lesson } from '../../constants/mockData';

interface LessonItemProps {
  lesson: Lesson;
  onPress?: () => void;
}

export const LessonItem: React.FC<LessonItemProps> = ({ lesson, onPress }) => {
  const isCompleted = lesson.status === 'completed';
  const isCurrent = lesson.status === 'current';
  const isLocked = lesson.status === 'locked';

  let containerClass = 'flex-row items-center p-4 rounded-[16px] border border-borderLight bg-cardBg mb-3';
  let iconWrapperClass = 'w-10 h-10 rounded-xl items-center justify-center bg-gray-100 mr-3.5';
  let iconName: 'checkmark' | 'play' | 'lock-closed' = 'lock-closed';
  let iconColor = '#6B7280';

  if (isCompleted) {
    iconName = 'checkmark';
    iconColor = '#2ECC71';
    iconWrapperClass = 'w-10 h-10 rounded-xl items-center justify-center bg-success/10 mr-3.5';
  } else if (isCurrent) {
    containerClass = 'flex-row items-center p-4 rounded-[16px] border border-primary/30 bg-primary/5 mb-3';
    iconName = 'play';
    iconColor = '#4A9FD4';
    iconWrapperClass = 'w-10 h-10 rounded-xl items-center justify-center bg-primary/10 mr-3.5';
  }

  return (
    <Pressable
      onPress={onPress}
      className={`${containerClass} ${isLocked ? 'opacity-60' : 'active:opacity-80'}`}
    >
      {/* Icon block inside rounded square with light bg */}
      <View className={iconWrapperClass}>
        <Ionicons name={iconName} size={20} color={iconColor} />
      </View>

      {/* Info block */}
      <View className="flex-1 mr-2">
        <Text className={`text-sm font-bold font-body ${isCurrent ? 'text-primary' : 'text-textMain'}`} numberOfLines={1}>
          Bài {lesson.order}: {lesson.title}
        </Text>
        {lesson.description && (
          <Text className="text-textMuted text-xs font-body mt-0.5" numberOfLines={1}>
            {lesson.description}
          </Text>
        )}
      </View>

      {/* Duration block */}
      <View className="flex-row items-center">
        <Ionicons name="time-outline" size={14} color="#6B7280" style={{ marginRight: 4 }} />
        <Text className="text-textMuted text-xs font-body">{lesson.duration}</Text>
      </View>
    </Pressable>
  );
};

export default LessonItem;
