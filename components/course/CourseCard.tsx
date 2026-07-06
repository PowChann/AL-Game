import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';
import { Course } from '../../constants/mockData';
import { Badge } from '../ui/Badge';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../constants/colors';

interface CourseCardProps {
  course: Course;
  variant?: 'horizontal' | 'vertical';
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export const CourseCard: React.FC<CourseCardProps> = ({ course, variant = 'horizontal' }) => {
  const router = useRouter();
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  const handlePressIn = () => {
    scale.value = withSpring(0.97, { damping: 15, stiffness: 250 });
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

  if (variant === 'horizontal') {
    return (
      <AnimatedPressable
        onPress={handlePress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={[animatedStyle]}
        className="w-[180px] h-[160px] bg-cardBg rounded-[16px] border border-borderLight overflow-hidden mr-4 shadow-sm"
      >
        {/* Thumbnail color area */}
        <View style={{ backgroundColor: course.color + '15' }} className="h-16 w-full items-center justify-center relative">
          <Text style={{ fontSize: 24 }}>{course.emoji}</Text>
          <View className="absolute bottom-1 right-2">
            <Badge label={course.level} variant="neutral" className="py-0 px-1.5" />
          </View>
        </View>
        
        {/* Info Area */}
        <View className="p-3 justify-between flex-1">
          <Text className="text-textMain font-bold text-sm leading-tight" numberOfLines={2}>
            {course.title}
          </Text>
          <View className="flex-row justify-between items-center mt-1">
            <Text className="text-textSecondary text-[11px] font-body">
              {course.lessonsCount} bài học
            </Text>
            <View className="flex-row items-center">
              <Ionicons name="star" size={12} color={COLORS.orange} />
              <Text className="text-accent text-[11px] font-bold font-body ml-0.5" style={{ color: COLORS.orange }}>
                {course.rating}
              </Text>
            </View>
          </View>
        </View>
      </AnimatedPressable>
    );
  }

  // Vertical Variant
  return (
    <AnimatedPressable
      onPress={handlePress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      style={[animatedStyle]}
      className="w-full bg-cardBg rounded-[16px] border border-borderLight p-3 flex-row items-center mb-3 shadow-sm"
    >
      {/* Thumbnail 80x80 */}
      <View style={{ backgroundColor: course.color + '15' }} className="w-20 h-20 rounded-[12px] items-center justify-center mr-4">
        <Text style={{ fontSize: 32 }}>{course.emoji}</Text>
      </View>
      
      {/* Information block */}
      <View className="flex-1 justify-center">
        <View className="flex-row justify-between items-center mb-1">
          <Badge 
            label={course.level} 
            variant={course.level === 'Cơ bản' ? 'primary' : course.level === 'Trung cấp' ? 'warning' : 'danger'} 
          />
          <View className="flex-row items-center">
            <Ionicons name="star" size={12} color={COLORS.orange} />
            <Text className="font-bold font-body ml-0.5 text-xs" style={{ color: COLORS.orange }}>{course.rating}</Text>
          </View>
        </View>
        
        <Text className="text-textMain font-bold text-sm leading-tight mb-1" numberOfLines={1}>
          {course.title}
        </Text>
        <Text className="text-textSecondary text-[12px] font-body" numberOfLines={1}>
          {course.description}
        </Text>
        
        <View className="flex-row justify-between items-center mt-2">
          <Text className="text-textMuted text-[11px] font-body">
            {course.lessonsCount} bài học · {course.students} học viên
          </Text>
          {course.progress > 0 && (
            <Text className="text-primary text-[11px] font-bold font-body" style={{ color: COLORS.primary }}>
              Đã học {course.progress}%
            </Text>
          )}
        </View>
      </View>
    </AnimatedPressable>
  );
};

export default CourseCard;
