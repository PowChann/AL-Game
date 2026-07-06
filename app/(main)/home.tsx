import React from 'react';
import { ScrollView, Text, View, Pressable, FlatList, Platform, StatusBar as RNStatusBar } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { MOCK_USER, MOCK_COURSES, MOCK_LESSONS } from '../../constants/mockData';
import { CourseCard } from '../../components/course/CourseCard';
import { LessonItem } from '../../components/course/LessonItem';
import { ScoreBadge } from '../../components/game/ScoreBadge';
import { ProgressBar } from '../../components/ui/ProgressBar';

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const safeTop = insets.top > 0 ? insets.top : (Platform.OS === 'android' ? RNStatusBar.currentHeight || 24 : 20);
  const router = useRouter();

  // Find active course for the banner
  const activeCourse = MOCK_COURSES[0];
  const activeLessons = MOCK_LESSONS.filter(l => l.courseId === activeCourse.id);
  const currentLesson = activeLessons.find(l => l.status === 'current') || activeLessons[0];
  const upcomingLessons = activeLessons.filter(l => l.status !== 'completed').slice(0, 2);

  const handleContinueLearning = () => {
    if (currentLesson) {
      router.push({
        pathname: '/course/lesson/[lessonId]',
        params: { lessonId: currentLesson.id },
      });
    } else {
      router.push({
        pathname: '/course/[id]',
        params: { id: activeCourse.id },
      });
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#F0F7FF' }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingTop: safeTop + 16,
          paddingBottom: insets.bottom + 16,
          paddingHorizontal: 20,
        }}
      >
        {/* Header */}
        <View className="flex-row justify-between items-center mb-6">
          <View>
            <Text className="text-textMain font-heading font-bold text-2xl">
              Xin chào, {MOCK_USER.name} 👋
            </Text>
            <Text className="text-textMuted font-body text-sm mt-0.5">
              Hôm nay học gì nhỉ?
            </Text>
          </View>
          <Pressable
            onPress={() => alert('Thông báo trống!')}
            className="w-11 h-11 bg-cardBg border border-borderLight rounded-full items-center justify-center active:opacity-75"
          >
            <Ionicons name="notifications" size={20} color="#4A9FD4" />
          </Pressable>
        </View>

        {/* Continue Learning Banner */}
        <Pressable
          onPress={handleContinueLearning}
          className="bg-primary border border-primary/20 rounded-[16px] p-5 mb-6 overflow-hidden relative active:opacity-95"
        >
          {/* Background subtle shape */}
          <View className="absolute -right-10 -bottom-10 w-40 h-40 rounded-full bg-white/10" />
          
          <View className="flex-row justify-between items-start mb-2">
            <View className="flex-1 mr-4">
              <Text className="text-white/70 font-bold font-body text-[10px] tracking-wider uppercase mb-1">
                Tiếp tục học
              </Text>
              <Text className="text-white font-heading font-bold text-lg leading-tight" numberOfLines={1}>
                {activeCourse.title}
              </Text>
            </View>
            <Ionicons name="play" size={24} color="#FFFFFF" />
          </View>
          
          <View className="mb-4">
            <View className="flex-row justify-between items-center mb-1.5">
              <Text className="text-white/80 font-body text-xs font-medium">
                Bài {activeCourse.currentLesson}/{activeCourse.lessonsCount}
              </Text>
              <Text className="text-white/90 font-bold font-body text-xs">
                {activeCourse.progress}% hoàn thành
              </Text>
            </View>
            <ProgressBar progress={activeCourse.progress} color="#FFFFFF" />
          </View>
          
          <View className="flex-row items-center">
            <Text className="text-white font-bold font-body text-xs mr-1" numberOfLines={1}>
              Học tiếp: Bài {currentLesson?.order} · {currentLesson?.title}
            </Text>
            <Ionicons name="arrow-forward" size={12} color="#FFFFFF" />
          </View>
        </Pressable>

        {/* Daily Stats */}
        <Text className="text-textMain font-heading font-bold text-lg mb-3">
          Thống kê hôm nay
        </Text>
        <View className="flex-row justify-between mb-6">
          <ScoreBadge icon="flame" iconColor="#F5A623" value={MOCK_USER.streak} label="Streak ngày" />
          <ScoreBadge icon="star" iconColor="#1A6FB5" value={MOCK_USER.xp} label="XP tích lũy" />
          <ScoreBadge icon="checkmark-circle" iconColor="#2ECC71" value={MOCK_USER.completedLessons} label="Bài đã xong" />
        </View>

        {/* Featured Courses */}
        <Text className="text-textMain font-heading font-bold text-lg mb-3">
          Khóa học nổi bật
        </Text>
        <FlatList
          data={MOCK_COURSES}
          renderItem={({ item }) => <CourseCard course={item} variant="horizontal" />}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          className="mb-6 -mx-5 px-5"
          decelerationRate="fast"
        />

        {/* Continue from Pause */}
        <Text className="text-textMain font-heading font-bold text-lg mb-3">
          Tiếp tục từ chỗ dừng
        </Text>
        <View className="mb-4">
          {upcomingLessons.map((lesson) => (
            <LessonItem
              key={lesson.id}
              lesson={lesson}
              onPress={() => {
                if (lesson.status === 'locked') {
                  alert('Bài học này đang bị khóa. Hãy hoàn thành các bài học trước!');
                } else {
                  router.push({
                    pathname: '/course/lesson/[lessonId]',
                    params: { lessonId: lesson.id },
                  });
                }
              }}
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
