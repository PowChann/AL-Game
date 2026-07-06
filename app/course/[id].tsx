import React, { useState } from 'react';
import { View, Text, ScrollView, Pressable, Modal } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { MOCK_COURSES, MOCK_LESSONS } from '../../constants/mockData';
import { Badge } from '../../components/ui/Badge';
import { ProgressBar } from '../../components/ui/ProgressBar';
import { LessonItem } from '../../components/course/LessonItem';
import { Button } from '../../components/ui/Button';

export default function CourseDetailScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { id } = useLocalSearchParams();

  // Find course
  const course = MOCK_COURSES.find((c) => c.id === id) || MOCK_COURSES[0];
  const lessons = MOCK_LESSONS.filter((l) => l.courseId === course.id);

  // States
  const [isSaved, setIsSaved] = useState(false);
  const [descriptionExpanded, setDescriptionExpanded] = useState(false);
  const [lockModalVisible, setLockModalVisible] = useState(false);

  // Find current lesson to continue
  const currentLesson = lessons.find((l) => l.status === 'current') || lessons[0];

  const handleLessonPress = (lesson: typeof lessons[0]) => {
    if (lesson.status === 'locked') {
      setLockModalVisible(true);
    } else {
      router.push({
        pathname: '/course/lesson/[lessonId]',
        params: { lessonId: lesson.id },
      });
    }
  };

  const handleContinueLearning = () => {
    if (currentLesson) {
      handleLessonPress(currentLesson);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#F0F7FF' }}>
      {/* Custom Overlapping Header */}
      <View
        style={{
          position: 'absolute',
          top: insets.top,
          left: 0,
          right: 0,
          height: 56,
          zIndex: 10,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingHorizontal: 16,
        }}
      >
        <Pressable
          onPress={() => router.back()}
          className="w-10 h-10 rounded-full bg-black/40 items-center justify-center"
        >
          <Ionicons name="arrow-back" size={22} color="#FFFFFE" />
        </Pressable>
        <Pressable
          onPress={() => setIsSaved(!isSaved)}
          className="w-10 h-10 rounded-full bg-black/40 items-center justify-center"
        >
          <Ionicons
            name={isSaved ? 'heart' : 'heart-outline'}
            size={22}
            color={isSaved ? '#E74C3C' : '#FFFFFF'}
          />
        </Pressable>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: insets.bottom + 90,
        }}
      >
        {/* Banner Thumbnail */}
        <View
          style={{ backgroundColor: course.color }}
          className="h-[200px] w-full items-center justify-center relative"
        >
          <View className="absolute inset-0 bg-black/10" />
          <Pressable
            onPress={() => alert('Phát trailer giới thiệu khóa học!')}
            className="w-16 h-16 rounded-full bg-primary border border-primary/20 items-center justify-center shadow-lg active:scale-95"
          >
            <Ionicons name="play" size={28} color="#FFFFFF" style={{ marginLeft: 4 }} />
          </Pressable>
          <Text className="absolute bottom-4 left-4 text-[10px] font-bold font-body text-[#FFFFFF] bg-black/40 px-3 py-1 rounded-full">
            PLAY PREVIEW
          </Text>
        </View>

        {/* Info Block */}
        <View className="p-5">
          <View className="flex-row items-center gap-x-2.5 mb-2">
            <Badge
              label={course.level}
              variant={course.level === 'Cơ bản' ? 'primary' : course.level === 'Trung cấp' ? 'warning' : 'danger'}
            />
            <View className="flex-row items-center">
              <Ionicons name="star" size={14} color="#F5A623" style={{ marginRight: 3 }} />
              <Text className="text-accent text-sm font-bold font-body">{course.rating}</Text>
              <Text className="text-textMuted text-xs font-body ml-2">
                · {course.students} học viên
              </Text>
            </View>
          </View>

          <Text className="text-textMain font-heading font-bold text-2xl mb-3 leading-tight">
            {course.title}
          </Text>

          {/* Collapsible description */}
          <View className="mb-6">
            <Text
              className="text-textMuted font-body text-sm leading-relaxed"
              numberOfLines={descriptionExpanded ? undefined : 3}
            >
              {course.description}
            </Text>
            <Pressable onPress={() => setDescriptionExpanded(!descriptionExpanded)} className="mt-2">
              <Text className="text-primary font-bold font-body text-xs">
                {descriptionExpanded ? 'Thu gọn ▲' : 'Xem thêm ▼'}
              </Text>
            </Pressable>
          </View>

          <View className="h-[1px] bg-borderLight w-full mb-6" />

          {/* Progress Block */}
          {course.progress > 0 && (
            <View className="bg-cardBg border border-borderLight rounded-[16px] p-4 mb-6">
              <View className="flex-row justify-between items-center mb-2">
                <Text className="text-textMain font-heading font-bold text-sm">
                  Tiến độ của bạn
                </Text>
                <Text className="text-primary font-bold font-body text-xs">
                  Bài {course.currentLesson}/{course.lessonsCount} ({course.progress}%)
                </Text>
              </View>
              <ProgressBar progress={course.progress} color={course.color} />
            </View>
          )}

          {/* Course Content */}
          <Text className="text-textMain font-heading font-bold text-lg mb-3">
            Nội dung khóa học
          </Text>
          <View>
            {lessons.map((lesson) => (
              <LessonItem
                key={lesson.id}
                lesson={lesson}
                onPress={() => handleLessonPress(lesson)}
              />
            ))}
          </View>
        </View>
      </ScrollView>

      {/* Sticky Bottom Button */}
      <View
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          paddingBottom: insets.bottom + 12,
          paddingTop: 12,
          paddingHorizontal: 20,
          backgroundColor: '#FFFFFF',
          borderTopWidth: 1,
          borderTopColor: '#E5E7EB',
        }}
      >
        <Button
          title="Tiếp tục học →"
          onPress={handleContinueLearning}
          variant="primary"
          size="lg"
        />
      </View>

      {/* Locked Lesson Modal */}
      <Modal visible={lockModalVisible} transparent animationType="fade">
        <View className="flex-1 bg-black/60 items-center justify-center px-6">
          <View className="bg-cardBg border border-borderLight rounded-[24px] p-6 w-full items-center">
            <View className="w-14 h-14 bg-gray-100 rounded-full items-center justify-center mb-4">
              <Ionicons name="lock-closed" size={28} color="#F5A623" />
            </View>
            <Text className="text-textMain font-heading font-bold text-xl text-center mb-2">
              Bài học đang bị khóa!
            </Text>
            <Text className="text-textMuted font-body text-sm text-center mb-6 leading-relaxed">
              Bạn cần hoàn thành lần lượt các bài học trước để mở khóa bài học này. Hãy kiên trì học tập nhé!
            </Text>
            <Button
              title="Đồng ý"
              onPress={() => setLockModalVisible(false)}
              variant="primary"
              size="md"
              className="w-full"
            />
          </View>
        </View>
      </Modal>
    </View>
  );
}
