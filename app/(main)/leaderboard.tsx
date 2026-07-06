import React from 'react';
import { View, Text, FlatList, Image, Platform, StatusBar as RNStatusBar } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Avatar } from '../../components/ui/Avatar';

interface RankUser {
  rank: number;
  name: string;
  xp: number;
  isCurrentUser: boolean;
  avatar: string | null;
}

const MOCK_LEADERBOARD: RankUser[] = [
  { rank: 1, name: 'Trần Minh', xp: 1250, isCurrentUser: false, avatar: null },
  { rank: 2, name: 'Phạm Linh', xp: 1020, isCurrentUser: false, avatar: null },
  { rank: 3, name: 'Alex Nguyen', xp: 890, isCurrentUser: true, avatar: null },
  { rank: 4, name: 'Vũ Hoàng', xp: 750, isCurrentUser: false, avatar: null },
  { rank: 5, name: 'Lê Trang', xp: 620, isCurrentUser: false, avatar: null },
];

export default function LeaderboardScreen() {
  const insets = useSafeAreaInsets();
  const safeTop = insets.top > 0 ? insets.top : (Platform.OS === 'android' ? RNStatusBar.currentHeight || 24 : 20);

  return (
    <View style={{ flex: 1, backgroundColor: '#EFF6FF', paddingTop: safeTop }}>
      <FlatList
        data={MOCK_LEADERBOARD}
        keyExtractor={(item) => item.rank.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingTop: 16,
          paddingBottom: insets.bottom + 16,
          paddingHorizontal: 20,
        }}
        ListHeaderComponent={
          <View className="mb-6">
            <Text className="text-textMain font-heading font-bold text-3xl mb-1">
              Bảng xếp hạng
            </Text>
            <Text className="text-textMuted font-body text-sm mb-6">
              Thi đua học tập cùng các học viên khác
            </Text>

            {/* Top 3 Podium Visual */}
            <View className="flex-row items-end justify-center mb-6 pt-4">
              {/* Rank 2 (Left) */}
              <View className="items-center mx-4">
                <View className="w-12 h-12 bg-gray-200 rounded-full items-center justify-center border-2 border-gray-300 relative mb-2">
                  <Avatar name={MOCK_LEADERBOARD[1].name} size={44} />
                  <View className="absolute -top-3 bg-gray-400 rounded-full px-1.5 py-0.2">
                    <Text className="text-white text-[10px] font-bold">2</Text>
                  </View>
                </View>
                <Text className="text-textMain font-bold font-body text-xs text-center" numberOfLines={1}>
                  {MOCK_LEADERBOARD[1].name}
                </Text>
                <Text className="text-textMuted text-[10px] font-body mt-0.5">
                  {MOCK_LEADERBOARD[1].xp} XP
                </Text>
                <View className="w-16 h-16 bg-gray-200/60 rounded-t-lg mt-2 items-center justify-center">
                  <Ionicons name="ribbon" size={24} color="#9CA3AF" />
                </View>
              </View>

              {/* Rank 1 (Center - Tallest) */}
              <View className="items-center mx-4">
                <View className="w-16 h-16 bg-yellow-100 rounded-full items-center justify-center border-2 border-[#F5A623] relative mb-2">
                  <Avatar name={MOCK_LEADERBOARD[0].name} size={58} />
                  <View className="absolute -top-4 w-6 h-6 bg-[#F5A623] rounded-full items-center justify-center">
                    <Ionicons name="trophy" size={12} color="#FFFFFF" />
                  </View>
                </View>
                <Text className="text-textMain font-bold font-body text-sm text-center" numberOfLines={1}>
                  {MOCK_LEADERBOARD[0].name}
                </Text>
                <Text className="text-accent text-xs font-bold font-body mt-0.5">
                  {MOCK_LEADERBOARD[0].xp} XP
                </Text>
                <View className="w-20 h-24 bg-yellow-100/50 rounded-t-lg mt-2 items-center justify-center border-x border-t border-[#F5A623]/20">
                  <Ionicons name="trophy" size={32} color="#F5A623" />
                </View>
              </View>

              {/* Rank 3 (Right) */}
              <View className="items-center mx-4">
                <View className="w-12 h-12 bg-amber-100 rounded-full items-center justify-center border-2 border-amber-600 relative mb-2">
                  <Avatar name={MOCK_LEADERBOARD[2].name} size={44} />
                  <View className="absolute -top-3 bg-amber-700 rounded-full px-1.5 py-0.2">
                    <Text className="text-white text-[10px] font-bold">3</Text>
                  </View>
                </View>
                <Text className="text-textMain font-bold font-body text-xs text-center" numberOfLines={1}>
                  {MOCK_LEADERBOARD[2].name}
                </Text>
                <Text className="text-textMuted text-[10px] font-body mt-0.5">
                  {MOCK_LEADERBOARD[2].xp} XP
                </Text>
                <View className="w-16 h-12 bg-amber-100/50 rounded-t-lg mt-2 items-center justify-center">
                  <Ionicons name="medal" size={24} color="#D97706" />
                </View>
              </View>
            </View>
          </View>
        }
        renderItem={({ item }) => {
          let rankIcon = null;
          let rankBadgeClass = 'bg-[#E5E7EB]';
          let rankTextClass = 'text-textMuted';

          if (item.rank === 1) {
            rankBadgeClass = 'bg-yellow-100';
            rankTextClass = 'text-[#F5A623]';
            rankIcon = <Ionicons name="trophy" size={16} color="#F5A623" />;
          } else if (item.rank === 2) {
            rankBadgeClass = 'bg-gray-100';
            rankTextClass = 'text-gray-500';
            rankIcon = <Ionicons name="ribbon" size={16} color="#9CA3AF" />;
          } else if (item.rank === 3) {
            rankBadgeClass = 'bg-amber-100';
            rankTextClass = 'text-amber-700';
            rankIcon = <Ionicons name="medal" size={16} color="#D97706" />;
          }

          return (
            <View
              className={`flex-row items-center bg-white border rounded-[16px] p-4 mb-3.5 ${
                item.isCurrentUser ? 'border-[#4A9FD4] bg-[#4A9FD4]/5' : 'border-[#E5E7EB]'
              }`}
            >
              {/* Rank Number/Badge */}
              <View className={`w-8 h-8 rounded-full items-center justify-center mr-3 ${rankBadgeClass}`}>
                {rankIcon ? rankIcon : <Text className="font-heading font-bold text-xs text-textMuted">{item.rank}</Text>}
              </View>

              {/* User Avatar */}
              <View className="mr-3">
                <Avatar name={item.name} size={40} />
              </View>

              {/* User Name */}
              <View className="flex-1">
                <Text
                  className={`text-sm font-bold font-body ${item.isCurrentUser ? 'text-primary' : 'text-textMain'}`}
                  numberOfLines={1}
                >
                  {item.name} {item.isCurrentUser ? '(Bạn)' : ''}
                </Text>
                <Text className="text-textMuted text-xs font-body mt-0.5">Học viên AL Game</Text>
              </View>

              {/* User XP */}
              <Text className="text-textMain font-heading font-bold text-sm">
                {item.xp} XP
              </Text>
            </View>
          );
        }}
      />
    </View>
  );
}
