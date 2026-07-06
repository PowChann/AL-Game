import React from 'react';
import { ScrollView, Text, View, FlatList, Platform, StatusBar as RNStatusBar } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MOCK_COURSES } from '../../constants/mockData';
import { CourseProgress } from '../../components/course/CourseProgress';
import { Ionicons } from '@expo/vector-icons';

export default function MyLearningScreen() {
  const insets = useSafeAreaInsets();
  const safeTop = insets.top > 0 ? insets.top : (Platform.OS === 'android' ? RNStatusBar.currentHeight || 24 : 20);
  
  // Get courses in progress
  const learningCourses = MOCK_COURSES.filter((course) => course.progress > 0);

  return (
    <View style={{ flex: 1, backgroundColor: '#F0F7FF' }}>
      <FlatList
        data={learningCourses}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingTop: safeTop + 16,
          paddingBottom: insets.bottom + 16,
          paddingHorizontal: 20,
        }}
        ListHeaderComponent={
          <View className="mb-6">
            <Text className="text-textMain font-heading font-bold text-3xl mb-1">
              Khóa học của tôi
            </Text>
            <Text className="text-textMuted font-body text-sm">
              Tiếp tục hành trình chinh phục kiến thức của bạn
            </Text>
          </View>
        }
        renderItem={({ item }) => <CourseProgress course={item} />}
        ListEmptyComponent={
          <View className="items-center justify-center py-20 bg-white border border-[#E5E7EB] rounded-[16px] p-6">
            <View className="w-16 h-16 bg-[#4A9FD4]/10 rounded-full items-center justify-center mb-4">
              <Ionicons name="book" size={32} color="#4A9FD4" />
            </View>
            <Text className="text-textMain font-heading font-bold text-lg mb-1 text-center">
              Chưa tham gia khóa học nào
            </Text>
            <Text className="text-textMuted font-body text-sm text-center">
              Khám phá các khóa học mới và bắt đầu bài học đầu tiên của bạn!
            </Text>
          </View>
        }
      />
    </View>
  );
}
