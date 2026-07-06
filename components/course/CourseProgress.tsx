import React from 'react';
import { Text, View, Pressable } from 'react-native';
import { Course } from '../../constants/mockData';
import { ProgressBar } from '../ui/ProgressBar';
import { useRouter } from 'expo-router';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';

interface CourseProgressProps {
  course: Course;
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export const CourseProgress: React.FC<CourseProgressProps> = ({ course }) => {
  const router = useRouter();
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  const handlePressIn = () => {
    scale.value = withSpring(0.98, { damping: 15, stiffness: 250 });
  };

  const handlePressOut = () => {
    scale.value = withSpring(1, { damping: 15, stiffness: 250 });
  };

  const handlePress = () => {
    router.push({
      pathname: '/course/[id]',
      params: { id: course.id },
    });
  };

  return (
    <AnimatedPressable
      onPress={handlePress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      style={[animatedStyle]}
      className="bg-cardBg border border-borderLight rounded-[16px] p-4 mb-3 flex-row items-center shadow-sm"
    >
      {/* Emoji Box */}
      <View
        style={{ backgroundColor: course.color + '15' }}
        className="w-12 h-12 rounded-[12px] items-center justify-center mr-3"
      >
        <Text style={{ fontSize: 22 }}>{course.emoji}</Text>
      </View>

      {/* Course Details & Progress */}
      <View className="flex-1">
        <View className="flex-row justify-between items-center mb-1">
          <Text className="text-textMain font-bold text-sm flex-1 mr-2" numberOfLines={1}>
            {course.title}
          </Text>
          <Text className="text-textSecondary text-[11px] font-body">
            Bài {course.currentLesson}/{course.lessonsCount}
          </Text>
        </View>
        
        <ProgressBar progress={course.progress} color={course.color} showLabel />
      </View>
    </AnimatedPressable>
  );
};

export default CourseProgress;
