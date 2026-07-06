import React, { useEffect } from 'react';
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';

interface TabIconProps {
  focused: boolean;
  name: 'home' | 'home-outline' | 'compass' | 'compass-outline' | 'book' | 'book-outline' | 'trophy' | 'trophy-outline' | 'person' | 'person-outline';
  color: any;
}

const TabIcon: React.FC<TabIconProps> = ({ focused, name, color }) => {
  const scale = useSharedValue(1);

  useEffect(() => {
    if (focused) {
      scale.value = withSpring(1.25, { damping: 8, stiffness: 200 }, (finished) => {
        if (finished) {
          scale.value = withSpring(1.1);
        }
      });
    } else {
      scale.value = withSpring(1);
    }
  }, [focused]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  return (
    <Animated.View style={[animatedStyle]}>
      <Ionicons name={name} size={22} color={color} />
    </Animated.View>
  );
};

export default function MainLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          borderTopWidth: 1,
          borderTopColor: '#E5E7EB',
          height: 65,
          paddingBottom: 8,
          paddingTop: 8,
        },
        tabBarActiveTintColor: '#1A6FB5',
        tabBarInactiveTintColor: '#6B7280',
        tabBarLabelStyle: {
          fontSize: 10,
          fontWeight: '600',
          fontFamily: 'Inter_500Medium',
          marginTop: 2,
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: 'Trang chủ',
          tabBarIcon: ({ focused, color }) => (
            <TabIcon focused={focused} name={focused ? 'home' : 'home-outline'} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Khám phá',
          tabBarIcon: ({ focused, color }) => (
            <TabIcon focused={focused} name={focused ? 'compass' : 'compass-outline'} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="mylearning"
        options={{
          title: 'Khóa học',
          tabBarIcon: ({ focused, color }) => (
            <TabIcon focused={focused} name={focused ? 'book' : 'book-outline'} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="leaderboard"
        options={{
          title: 'Bảng xếp hạng',
          tabBarIcon: ({ focused, color }) => (
            <TabIcon focused={focused} name={focused ? 'trophy' : 'trophy-outline'} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Cá nhân',
          tabBarIcon: ({ focused, color }) => (
            <TabIcon focused={focused} name={focused ? 'person' : 'person-outline'} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
