import React, { useEffect } from 'react';
import { View, Text, Modal } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';
import { Button } from '../ui/Button';
import { ProgressBar } from '../ui/ProgressBar';

interface GameResultCardProps {
  visible: boolean;
  score: number;
  totalQuestions: number;
  onNextLesson?: () => void;
  onRetry?: () => void;
  onBackToCourse?: () => void;
}

export const GameResultCard: React.FC<GameResultCardProps> = ({
  visible,
  score,
  totalQuestions,
  onNextLesson,
  onRetry,
  onBackToCourse,
}) => {
  const percentage = (score / totalQuestions) * 100;
  const isPassed = percentage >= 70;

  const translateY = useSharedValue(600);

  useEffect(() => {
    if (visible) {
      translateY.value = withSpring(0, { damping: 20, stiffness: 100 });
    } else {
      translateY.value = 600;
    }
  }, [visible]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translateY.value }],
    };
  });

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View className="flex-1 bg-black/75 justify-end items-center px-4 pb-8">
        <Animated.View
          style={[animatedStyle]}
          className="w-full bg-cardBg border border-borderLight rounded-[24px] p-6 items-center"
        >
          {/* Icon */}
          <Text className="text-5xl mb-4 text-center">
            {isPassed ? '🏆' : '❌'}
          </Text>

          {/* Heading */}
          <Text className="text-textMain font-heading font-bold text-2xl text-center mb-2">
            {isPassed ? 'Hoàn thành bài học!' : 'Chưa đạt yêu cầu'}
          </Text>

          {/* Subheading */}
          <Text className="text-textMuted font-body text-sm text-center mb-5">
            {isPassed ? 'Chúc mừng bạn đã vượt qua bài tập đánh giá!' : 'Hãy ôn lại bài học và thử lại một lần nữa nhé!'}
          </Text>

          {/* Score & Progress */}
          <View className="w-full bg-darkBg border border-borderLight rounded-[16px] p-4 mb-6">
            <View className="flex-row justify-between items-center mb-2">
              <Text className="text-textMuted font-body text-xs">
                Điểm của bạn
              </Text>
              <Text className="text-textMain font-heading font-bold text-sm">
                {score} / {totalQuestions} ({Math.round(percentage)}%)
              </Text>
            </View>
            <ProgressBar progress={percentage} color={isPassed ? '#2ECC71' : '#E74C3C'} />
            <Text
              className={`text-center font-bold text-[11px] tracking-wider mt-3.5 ${isPassed ? 'text-success' : 'text-danger'}`}
            >
              {isPassed ? '✅ VƯỢT QUA! (≥ 70%)' : '❌ CHƯA ĐẠT. THỬ LẠI? (< 70%)'}
            </Text>
          </View>

          {/* Action Buttons */}
          <View className="w-full gap-y-3">
            {isPassed ? (
              <Button
                title="Học bài tiếp theo →"
                onPress={onNextLesson}
                variant="primary"
                size="lg"
              />
            ) : (
              <Button
                title="Làm lại"
                onPress={onRetry}
                variant="primary"
                size="lg"
              />
            )}
            <Button
              title="Về khóa học"
              onPress={onBackToCourse}
              variant="secondary"
              size="lg"
            />
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
};

export default GameResultCard;
