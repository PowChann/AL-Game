import React from 'react';
import { ScrollView, Text, View, Pressable, Platform, StatusBar as RNStatusBar } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { MOCK_USER, MOCK_COURSES } from '../../constants/mockData';
import { useAuthStore } from '../../store/useAuthStore';
import { Avatar } from '../../components/ui/Avatar';
import { Button } from '../../components/ui/Button';
import { ScoreBadge } from '../../components/game/ScoreBadge';
import { CourseProgress } from '../../components/course/CourseProgress';

export default function ProfileScreen() {
  const insets = useSafeAreaInsets();
  const safeTop = insets.top > 0 ? insets.top : (Platform.OS === 'android' ? RNStatusBar.currentHeight || 24 : 20);
  const router = useRouter();
  const logout = useAuthStore((state) => state.logout);

  // Filter courses in progress
  const coursesInProgress = MOCK_COURSES.filter((course) => course.progress > 0);

  const handleLogout = () => {
    logout();
    router.replace('/login');
  };

  const menuItems = [
    { icon: 'notifications-outline', label: 'Cài đặt thông báo', action: () => alert('Tính năng thông báo đang phát triển!') },
    { icon: 'language-outline', label: 'Ngôn ngữ hiển thị', action: () => alert('Tính năng ngôn ngữ đang phát triển!') },
    { icon: 'information-circle-outline', label: 'Về ứng dụng AL Game', action: () => alert('Ứng dụng AL Game v1.0.0') },
  ];

  return (
    <View style={{ flex: 1, backgroundColor: '#F0F7FF', paddingTop: safeTop }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingTop: 16,
          paddingBottom: insets.bottom + 16,
          paddingHorizontal: 20,
        }}
      >
        {/* User Info Header */}
        <View className="items-center mb-6">
          <Avatar name={MOCK_USER.name} size={90} />
          <Text className="text-textMain font-heading font-bold text-xl mt-3">
            {MOCK_USER.name}
          </Text>
          <Text className="text-textMuted font-body text-xs mt-0.5 mb-3.5">
            {MOCK_USER.email}
          </Text>
          <Button
            title="Chỉnh sửa hồ sơ"
            onPress={() => alert('Sửa hồ sơ đang phát triển!')}
            variant="secondary"
            size="sm"
          />
        </View>

        {/* Stats Grid 2x2 */}
        <Text className="text-textMain font-heading font-bold text-lg mb-3">
          Thành tích
        </Text>
        <View className="gap-y-3 mb-6">
          <View className="flex-row justify-between">
            <ScoreBadge icon="flame" iconColor="#F5A623" value={MOCK_USER.streak} label="Streak ngày" className="mr-1.5" />
            <ScoreBadge icon="star" iconColor="#1A6FB5" value={MOCK_USER.xp} label="Tổng số XP" className="ml-1.5" />
          </View>
          <View className="flex-row justify-between">
            <ScoreBadge icon="checkmark-circle" iconColor="#2ECC71" value={MOCK_USER.completedLessons} label="Bài đã hoàn thành" className="mr-1.5" />
            <ScoreBadge icon="trophy" iconColor="#F5A623" value={MOCK_USER.badges} label="Danh hiệu đạt được" className="ml-1.5" />
          </View>
        </View>

        {/* My Courses Progress */}
        <Text className="text-textMain font-heading font-bold text-lg mb-3">
          Khóa học của tôi
        </Text>
        <View className="mb-6">
          {coursesInProgress.map((course) => (
            <CourseProgress key={course.id} course={course} />
          ))}
        </View>

        {/* Settings Menu */}
        <Text className="text-textMain font-heading font-bold text-lg mb-3">
          Cài đặt hệ thống
        </Text>
        <View className="bg-cardBg border border-borderLight rounded-[16px] overflow-hidden mb-6">
          {menuItems.map((item, index) => (
            <Pressable
              key={index}
              onPress={item.action}
              className="flex-row items-center justify-between p-4 active:bg-surface border-b border-borderLight"
              style={index === menuItems.length - 1 ? { borderBottomWidth: 0 } : {}}
            >
              <View className="flex-row items-center">
                <Ionicons name={item.icon as any} size={20} color="#6B7280" style={{ marginRight: 12 }} />
                <Text className="text-textMain font-body text-sm">{item.label}</Text>
              </View>
              <Ionicons name="chevron-forward" size={16} color="#6B7280" />
            </Pressable>
          ))}
        </View>

        {/* Logout Button */}
        <Button
          title="Đăng xuất tài khoản"
          onPress={handleLogout}
          variant="danger"
          size="lg"
          className="mb-4"
        />
      </ScrollView>
    </View>
  );
}
