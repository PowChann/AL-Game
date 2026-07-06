import React from 'react';
import { Text, View } from 'react-native';
import { Course } from '../../constants/mockData';
import { ProgressBar } from '../ui/ProgressBar';

interface CourseProgressProps {
  course: Course;
}

export const CourseProgress: React.FC<CourseProgressProps> = ({ course }) => {
  return (
    <View className="bg-cardBg border border-[#252438] rounded-[16px] p-4 mb-3">
      <View className="flex-row justify-between items-center mb-2">
        <Text className="text-textMain font-heading font-bold text-sm flex-1 mr-2" numberOfLines={1}>
          {course.title}
        </Text>
        <Text className="text-primary font-bold font-body text-xs">
          Bài {course.currentLesson}/{course.lessonsCount}
        </Text>
      </View>
      <ProgressBar progress={course.progress} color={course.color} showLabel />
    </View>
  );
};

export default CourseProgress;
