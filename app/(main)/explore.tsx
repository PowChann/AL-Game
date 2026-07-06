import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, Pressable, Platform, StatusBar as RNStatusBar } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { MOCK_COURSES } from '../../constants/mockData';
import { CourseCard } from '../../components/course/CourseCard';

const CATEGORIES = ['All', 'Bán hàng', 'Lãnh đạo', 'Kỹ năng'];

export default function ExploreScreen() {
  const insets = useSafeAreaInsets();
  const safeTop = insets.top > 0 ? insets.top : (Platform.OS === 'android' ? RNStatusBar.currentHeight || 24 : 20);
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  // Filter logic
  const filteredCourses = MOCK_COURSES.filter((course) => {
    // Search filter
    const matchesSearch =
      course.title.toLowerCase().includes(search.toLowerCase()) ||
      course.description.toLowerCase().includes(search.toLowerCase());

    // Category filter
    let matchesCategory = true;
    if (activeCategory === 'Bán hàng') {
      matchesCategory = course.title.toLowerCase().includes('bán hàng') || course.title.toLowerCase().includes('đàm phán');
    } else if (activeCategory === 'Lãnh đạo') {
      matchesCategory = course.title.toLowerCase().includes('lãnh đạo');
    } else if (activeCategory === 'Kỹ năng') {
      matchesCategory =
        course.title.toLowerCase().includes('thuyết trình') ||
        course.title.toLowerCase().includes('quản lý') ||
        course.title.toLowerCase().includes('giải quyết');
    }

    return matchesSearch && matchesCategory;
  });

  return (
    <View style={{ flex: 1, backgroundColor: '#F0F7FF' }}>
      <FlatList
        data={filteredCourses}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingTop: safeTop + 16,
          paddingBottom: insets.bottom + 16,
          paddingHorizontal: 20,
        }}
        ListHeaderComponent={
          <View className="mb-4">
            {/* Header Title */}
            <Text className="text-textMain font-heading font-bold text-3xl mb-4">
              Khám phá
            </Text>

            {/* Search Bar */}
            <View className="flex-row items-center bg-surface border border-borderLight h-[50px] rounded-[16px] px-4 mb-4">
              <Ionicons name="search" size={20} color="#6B7280" style={{ marginRight: 8 }} />
              <TextInput
                value={search}
                onChangeText={setSearch}
                placeholder="Tìm kiếm khóa học..."
                placeholderTextColor="#6B7280"
                className="flex-1 h-full text-textMain font-body text-sm"
                style={{ includeFontPadding: false }}
              />
              {search.length > 0 && (
                <Pressable onPress={() => setSearch('')}>
                  <Ionicons name="close-circle" size={18} color="#6B7280" />
                </Pressable>
              )}
            </View>

            {/* Filter Tabs */}
            <FlatList
              data={CATEGORIES}
              keyExtractor={(item) => item}
              horizontal
              showsHorizontalScrollIndicator={false}
              className="-mx-5 px-5 mb-5"
              renderItem={({ item }) => {
                const isActive = activeCategory === item;
                return (
                  <Pressable
                    onPress={() => setActiveCategory(item)}
                    className={`px-5 py-2.5 rounded-full mr-2.5 ${
                      isActive ? 'bg-primary border border-primary/20' : 'bg-cardBg border border-borderLight'
                    }`}
                  >
                    <Text
                      className={`text-xs font-bold font-body ${isActive ? 'text-white' : 'text-textMuted'}`}
                    >
                      {item}
                    </Text>
                  </Pressable>
                );
              }}
            />

            {/* Count */}
            <Text className="text-textMuted font-body text-sm font-medium">
              Tìm thấy {filteredCourses.length} khóa học
            </Text>
          </View>
        }
        renderItem={({ item }) => <CourseCard course={item} variant="vertical" />}
        ListEmptyComponent={
          <View className="items-center justify-center py-12">
            <Ionicons name="search-outline" size={48} color="#6B7280" style={{ marginBottom: 12, opacity: 0.4 }} />
            <Text className="text-textMuted font-body text-center text-sm">
              Không tìm thấy khóa học nào phù hợp!
            </Text>
          </View>
        }
      />
    </View>
  );
}
