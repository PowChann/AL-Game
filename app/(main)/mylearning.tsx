import React, { useState } from 'react';
import { ScrollView, Text, View, FlatList, Platform, StatusBar as RNStatusBar, Pressable } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MOCK_COURSES } from '../../constants/mockData';
import { CourseProgress } from '../../components/course/CourseProgress';
import { Ionicons } from '@expo/vector-icons';

const TABS = ['Đang học', 'Đã học', 'Tất cả'];

export default function MyLearningScreen() {
  const insets = useSafeAreaInsets();
  const safeTop = insets.top > 0 ? insets.top : (Platform.OS === 'android' ? RNStatusBar.currentHeight || 24 : 20);
  const [activeTab, setActiveTab] = useState('Đang học');

  // Filter courses based on activeTab
  const getFilteredCourses = () => {
    if (activeTab === 'Đang học') {
      return MOCK_COURSES.filter((course) => course.progress > 0 && course.progress < 100);
    } else if (activeTab === 'Đã học') {
      return MOCK_COURSES.filter((course) => course.progress === 100);
    } else {
      return MOCK_COURSES;
    }
  };

  const displayCourses = getFilteredCourses();

  // Custom empty text and icon based on tab
  const getEmptyStateContent = () => {
    if (activeTab === 'Đang học') {
      return {
        title: 'Không có khóa học nào đang học',
        description: 'Bắt đầu một khóa học mới trong phần Khám phá nhé!',
        icon: 'book-outline',
      };
    } else if (activeTab === 'Đã học') {
      return {
        title: 'Chưa hoàn thành khóa học nào',
        description: 'Hãy kiên trì học tập để hoàn thành khóa học đầu tiên nhé!',
        icon: 'trophy-outline',
      };
    } else {
      return {
        title: 'Không tìm thấy khóa học',
        description: 'Hệ thống đang tải dữ liệu khóa học...',
        icon: 'alert-circle-outline',
      };
    }
  };

  const emptyState = getEmptyStateContent();

  return (
    <View style={{ flex: 1, backgroundColor: '#F0F7FF', paddingTop: safeTop }}>
      <FlatList
        data={displayCourses}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingTop: 16,
          paddingBottom: insets.bottom + 16,
          paddingHorizontal: 20,
        }}
        ListHeaderComponent={
          <View>
            {/* Title block */}
            <View className="mb-5">
              <Text className="text-textMain font-heading font-bold text-3xl mb-1">
                Khóa học của tôi
              </Text>
              <Text className="text-textMuted font-body text-sm">
                Theo dõi tiến độ học tập và ôn tập bài học của bạn
              </Text>
            </View>

            {/* Segment Tab Bar */}
            <View className="flex-row bg-white border border-borderLight rounded-full p-1 mb-6">
              {TABS.map((tab) => {
                const isActive = activeTab === tab;
                return (
                  <Pressable
                    key={tab}
                    onPress={() => setActiveTab(tab)}
                    className={`flex-1 py-2.5 rounded-full items-center justify-center ${
                      isActive ? 'bg-primary' : 'bg-transparent'
                    }`}
                  >
                    <Text
                      className={`text-xs font-bold font-body ${
                        isActive ? 'text-white' : 'text-textMuted'
                      }`}
                    >
                      {tab}
                    </Text>
                  </Pressable>
                );
              })}
            </View>
          </View>
        }
        renderItem={({ item }) => <CourseProgress course={item} />}
        ListEmptyComponent={
          <View className="items-center justify-center py-20 bg-white border border-[#E5E7EB] rounded-[16px] p-6">
            <View className="w-16 h-16 bg-[#4A9FD4]/10 rounded-full items-center justify-center mb-4">
              <Ionicons name={emptyState.icon as any} size={30} color="#4A9FD4" />
            </View>
            <Text className="text-textMain font-heading font-bold text-lg mb-1 text-center">
              {emptyState.title}
            </Text>
            <Text className="text-textMuted font-body text-sm text-center">
              {emptyState.description}
            </Text>
          </View>
        }
      />
    </View>
  );
}
