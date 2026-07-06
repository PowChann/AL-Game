import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, Pressable } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { MOCK_COURSES } from '../../constants/mockData';
import { CourseCard } from '../../components/course/CourseCard';

const CATEGORIES = ['All', 'Bán hàng', 'Lãnh đạo', 'Kỹ năng'];

export default function ExploreScreen() {
  const insets = useSafeAreaInsets();
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
    <View style={{ flex: 1, backgroundColor: '#0F0E17' }}>
      <FlatList
        data={filteredCourses}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingTop: insets.top + 16,
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
            <View className="flex-row items-center bg-surface border border-[#252438] h-[50px] rounded-[12px] px-4 mb-4">
              <Ionicons name="search" size={20} color="#A7A9BE" style={{ marginRight: 8 }} />
              <TextInput
                value={search}
                onChangeText={setSearch}
                placeholder="Tìm kiếm khóa học..."
                placeholderTextColor="#A7A9BE"
                className="flex-1 h-full text-textMain font-body text-sm"
                style={{ includeFontPadding: false }}
              />
              {search.length > 0 && (
                <Pressable onPress={() => setSearch('')}>
                  <Ionicons name="close-circle" size={18} color="#A7A9BE" />
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
                      isActive ? 'bg-primary border border-primary/20' : 'bg-cardBg border border-[#252438]'
                    }`}
                  >
                    <Text
                      className={`text-xs font-bold font-body ${isActive ? 'text-[#FFFFFE]' : 'text-textMuted'}`}
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
            <Ionicons name="search-outline" size={48} color="#A7A9BE" style={{ marginBottom: 12, opacity: 0.4 }} />
            <Text className="text-textMuted font-body text-center text-sm">
              Không tìm thấy khóa học nào phù hợp!
            </Text>
          </View>
        }
      />
    </View>
  );
}
