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

  let containerClass = 'flex-row items-center p-4 rounded-[12px] border border-[#252438] bg-cardBg mb-3';
  let iconName: 'checkmark-circle' | 'play-circle' | 'lock-closed' = 'lock-closed';
  let iconColor = '#A7A9BE';

  if (isCompleted) {
    iconName = 'checkmark-circle';
    iconColor = '#2CB67D';
  } else if (isCurrent) {
    containerClass = 'flex-row items-center p-4 rounded-[12px] border border-primary/40 bg-primary/10 mb-3';
    iconName = 'play-circle';
    iconColor = '#6C63FF';
  }

  return (
    <Pressable
      onPress={onPress}
      className={`${containerClass} ${isLocked ? 'opacity-60' : 'active:opacity-80'}`}
    >
      {/* Icon block */}
      <View className="mr-3.5">
        <Ionicons name={iconName} size={24} color={iconColor} />
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
        <Ionicons name="time-outline" size={14} color="#A7A9BE" style={{ marginRight: 4 }} />
        <Text className="text-textMuted text-xs font-body">{lesson.duration}</Text>
      </View>
    </Pressable>
  );
};

export default LessonItem;
