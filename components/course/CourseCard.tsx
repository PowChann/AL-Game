import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';
import { Course } from '../../constants/mockData';
import { Badge } from '../ui/Badge';
import { Ionicons } from '@expo/vector-icons';

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
        className="w-[200px] h-[165px] bg-cardBg rounded-[16px] border border-borderLight overflow-hidden mr-4"
      >
        {/* Color Banner */}
        <View style={{ backgroundColor: course.color }} className="h-16 w-full items-center justify-center relative">
          <Ionicons name="book" size={24} color="#FFFFFE" />
          <View className="absolute bottom-2 right-2">
            <Badge label={course.level} variant="neutral" className="bg-black/40 py-0.5 px-1.5" />
          </View>
        </View>
        
        {/* Info Area */}
        <View className="p-3 justify-between flex-1">
          <Text className="text-textMain font-heading font-bold text-sm leading-tight" numberOfLines={2}>
            {course.title}
          </Text>
          <View className="flex-row justify-between items-center mt-1">
            <Text className="text-textMuted text-[11px] font-body">
              {course.lessonsCount} bài học
            </Text>
            <View className="flex-row items-center">
              <Ionicons name="star" size={12} color="#FF8906" />
              <Text className="text-accent text-[11px] font-bold font-body ml-0.5">
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
      className="w-full bg-cardBg rounded-[16px] border border-borderLight p-3.5 flex-row items-center mb-3"
    >
      {/* Thumbnail block */}
      <View style={{ backgroundColor: course.color }} className="w-16 h-16 rounded-[12px] items-center justify-center mr-4">
        <Ionicons name="school" size={28} color="#FFFFFE" />
      </View>
      
      {/* Information block */}
      <View className="flex-1 justify-center">
        <View className="flex-row justify-between items-center mb-1">
          <Badge 
            label={course.level} 
            variant={course.level === 'Cơ bản' ? 'primary' : course.level === 'Trung cấp' ? 'warning' : 'danger'} 
          />
          <View className="flex-row items-center">
            <Ionicons name="star" size={12} color="#FF8906" />
            <Text className="text-accent text-xs font-bold font-body ml-0.5">{course.rating}</Text>
          </View>
        </View>
        
        <Text className="text-textMain font-heading font-bold text-base leading-tight mb-1" numberOfLines={1}>
          {course.title}
        </Text>
        <Text className="text-textMuted text-xs font-body" numberOfLines={1}>
          {course.description}
        </Text>
        
        <View className="flex-row justify-between items-center mt-2">
          <Text className="text-textMuted text-[11px] font-body">
            {course.lessonsCount} bài học · {course.students} học viên
          </Text>
          {course.progress > 0 && (
            <Text className="text-primary text-[11px] font-bold font-body">
              Đã học {course.progress}%
            </Text>
          )}
        </View>
      </View>
    </AnimatedPressable>
  );
};

export default CourseCard;
