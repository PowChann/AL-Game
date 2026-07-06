import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, Pressable, ScrollView, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import Animated, { useSharedValue, useAnimatedStyle, withSpring, withTiming } from 'react-native-reanimated';
import { MOCK_LESSONS } from '../../../constants/mockData';
import { Button } from '../../../components/ui/Button';

export default function LessonVideoScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { lessonId } = useLocalSearchParams();

  // Find lesson
  const lesson = MOCK_LESSONS.find((l) => l.id === lessonId) || MOCK_LESSONS[2];

  // States
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0); // 0 to 100
  const [notes, setNotes] = useState('');

  const timerRef = useRef<any>(null);

  // Video progress animation (10 seconds total)
  useEffect(() => {
    if (isPlaying && progress < 100) {
      timerRef.current = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            if (timerRef.current) clearInterval(timerRef.current);
            return 100;
          }
          return prev + 1; // 1% every 100ms = 10 seconds total
        });
      }, 100);
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isPlaying, progress]);

  // Reanimated style for progress bar inside video controls
  const animatedProgressWidth = useSharedValue(0);

  useEffect(() => {
    animatedProgressWidth.value = withTiming(progress / 100, { duration: 100 });
  }, [progress]);

  const progressBarAnimatedStyle = useAnimatedStyle(() => {
    return {
      width: `${animatedProgressWidth.value * 100}%`,
    };
  });

  // Reanimated style for the "Do Exercises" button appearing
  const buttonScale = useSharedValue(0.9);
  const buttonOpacity = useSharedValue(0.4);

  useEffect(() => {
    if (progress >= 100) {
      buttonScale.value = withSpring(1, { damping: 12, stiffness: 150 });
      buttonOpacity.value = withSpring(1);
    }
  }, [progress]);

  const buttonAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: buttonScale.value }],
      opacity: buttonOpacity.value,
    };
  });

  // Calculate mock timestamp (5:00 total video duration)
  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const totalDurationSeconds = 300; // 5:00
  const currentDurationSeconds = Math.round((progress / 100) * totalDurationSeconds);

  const handleNextStep = () => {
    if (progress >= 100) {
      router.push({
        pathname: '/course/lesson/game/[lessonId]',
        params: { lessonId: lesson.id },
      });
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1, backgroundColor: '#F0F7FF' }}
      >
        {/* Custom Header */}
        <View
          style={{
            paddingTop: insets.top + 8,
            paddingBottom: 8,
            paddingHorizontal: 16,
            flexDirection: 'row',
            alignItems: 'center',
            borderBottomWidth: 1,
            borderBottomColor: '#E5E7EB',
            backgroundColor: '#FFFFFF',
          }}
        >
          <Pressable onPress={() => router.back()} className="p-2 -ml-2 mr-2">
            <Ionicons name="arrow-back" size={24} color="#4A9FD4" />
          </Pressable>
          <Text className="text-textMain font-heading font-bold text-base flex-1" numberOfLines={1}>
            Bài {lesson.order}: {lesson.title}
          </Text>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: insets.bottom + 100, // extra spacing for sticky bottom button
          }}
        >
          {/* Mock Video Player */}
          <View className="w-full bg-[#1A1929] aspect-video justify-center items-center relative overflow-hidden">
            {/* Dark tint on pause */}
            {!isPlaying && <View className="absolute inset-0 bg-black/40 z-10" />}

            {/* Simulated Play/Pause Big Center Button */}
            <Pressable
              onPress={() => setIsPlaying(!isPlaying)}
              className="w-16 h-16 rounded-full bg-primary border border-primary/20 items-center justify-center z-20 shadow-lg active:scale-95"
            >
              <Ionicons
                name={isPlaying ? 'pause' : 'play'}
                size={28}
                color="#FFFFFF"
                style={!isPlaying ? { marginLeft: 4 } : {}}
              />
            </Pressable>

            {/* Corner Info */}
            <View className="absolute top-3 right-3 bg-black/60 px-2.5 py-1 rounded-md">
              <Text className="text-[#FFFFFE] text-[10px] font-bold tracking-wider">MOCK PLAYER</Text>
            </View>

            {/* Video Controls Overlay (at the bottom of player) */}
            <View className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 to-transparent flex-row items-center gap-x-3">
              <Pressable onPress={() => setIsPlaying(!isPlaying)} className="p-1">
                <Ionicons name={isPlaying ? 'pause' : 'play'} size={18} color="#FFFFFE" />
              </Pressable>
              
              <Text className="text-textMain text-xs font-body">
                {formatTime(currentDurationSeconds)}
              </Text>

              {/* Progress Line */}
              <View className="flex-1 h-1 bg-white/20 rounded-full overflow-hidden">
                <Animated.View
                  style={[{ height: '100%', backgroundColor: '#4A9FD4' }, progressBarAnimatedStyle]}
                />
              </View>

              <Text className="text-textMuted text-xs font-body">
                {formatTime(totalDurationSeconds)}
              </Text>

              <Pressable onPress={() => setIsMuted(!isMuted)} className="p-1">
                <Ionicons name={isMuted ? 'volume-mute' : 'volume-high'} size={18} color="#FFFFFE" />
              </Pressable>
            </View>
          </View>

          {/* Description Block */}
          <View className="p-5">
            <Text className="text-textMain font-heading font-bold text-lg mb-2">
              {lesson.title}
            </Text>
            <Text className="text-textMuted font-body text-sm leading-relaxed mb-6">
              {lesson.description || 'Trong bài học này, bạn sẽ nắm bắt được các kiến thức trọng tâm để rèn luyện kỹ năng và giải quyết các bài tập đánh giá năng lực.'}
            </Text>

            <View className="h-[1px] bg-borderLight w-full mb-6" />

            {/* Notes Section */}
            <View className="mb-4">
              <Text className="text-textMain font-heading font-bold text-sm mb-2">
                Ghi chú của bạn
              </Text>
              <TextInput
                value={notes}
                onChangeText={setNotes}
                placeholder="Nhập ghi chú quan trọng từ bài học..."
                placeholderTextColor="#6B7280"
                multiline
                numberOfLines={4}
                className="w-full bg-cardBg border border-borderLight rounded-[16px] p-4 text-textMain font-body text-sm text-left align-top h-32"
                style={{ textAlignVertical: 'top' }}
              />
            </View>
          </View>
        </ScrollView>

        {/* Sticky Bottom Actions */}
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
          {progress < 100 ? (
            <Pressable
              disabled
              style={{
                backgroundColor: '#E5E7EB',
                borderRadius: 16,
                paddingVertical: 16,
                alignItems: 'center',
                opacity: 0.7,
              }}
            >
              <Text className="text-textMuted font-bold font-body text-sm">
                Chưa xem hết video ({progress}%)
              </Text>
            </Pressable>
          ) : (
            <Animated.View style={[buttonAnimatedStyle]}>
              <Button
                title="Làm bài tập →"
                onPress={handleNextStep}
                variant="primary"
                size="lg"
              />
            </Animated.View>
          )}
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}
