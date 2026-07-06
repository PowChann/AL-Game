import React, { useState, useRef, useEffect } from 'react';
import { View, Text, Pressable, ScrollView } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import DuoDragDrop, { DuoDragDropRef } from '@jamsch/react-native-duo-drag-drop';
import { MOCK_QUESTIONS } from '../../../../constants/mockData';
import { Button } from '../../../../components/ui/Button';
import { ProgressBar } from '../../../../components/ui/ProgressBar';
import { GameResultCard } from '../../../../components/game/GameResultCard';

export default function GameScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { lessonId } = useLocalSearchParams();

  // Find questions
  const questions = MOCK_QUESTIONS.filter((q) => q.lessonId === lessonId);
  const quizQuestions = questions.length > 0 ? questions : MOCK_QUESTIONS;

  // States
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswerChecked, setIsAnswerChecked] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [score, setScore] = useState(0);
  const [resultVisible, setResultVisible] = useState(false);

  const duoRef = useRef<DuoDragDropRef>(null);
  const currentQuestion = quizQuestions[currentIndex];

  // Reset states on question change
  useEffect(() => {
    setSelectedOption(null);
    setIsAnswerChecked(false);
    setIsCorrect(false);
  }, [currentIndex]);

  const handleOptionSelect = (index: number) => {
    if (!isAnswerChecked) {
      setSelectedOption(index);
    }
  };

  const handleCheck = () => {
    if (isAnswerChecked) {
      if (currentIndex < quizQuestions.length - 1) {
        setCurrentIndex(currentIndex + 1);
      } else {
        setResultVisible(true);
      }
      return;
    }

    if (currentQuestion.type === 'multiple-choice') {
      if (selectedOption === null) {
        alert('Vui lòng chọn một đáp án!');
        return;
      }
      const correct = selectedOption === currentQuestion.correctIndex;
      setIsCorrect(correct);
      setIsAnswerChecked(true);
      if (correct) {
        setScore((prev) => prev + 1);
      }
    } else {
      // Drag & drop
      const answered = duoRef.current?.getAnsweredWords() || [];
      const correctOrder = currentQuestion.correctOrder;
      const expectedWords = correctOrder.map((idx) => currentQuestion.words[idx]);

      const correct =
        answered.length === expectedWords.length &&
        answered.every((word, idx) => word === expectedWords[idx]);

      setIsCorrect(correct);
      setIsAnswerChecked(true);
      if (correct) {
        setScore((prev) => prev + 1);
      }
    }
  };

  const handleRetry = () => {
    setScore(0);
    setCurrentIndex(0);
    setResultVisible(false);
  };

  const handleBackToCourse = () => {
    setResultVisible(false);
    router.replace({
      pathname: '/course/[id]',
      params: { id: '1' },
    });
  };

  const handleNextLesson = () => {
    setResultVisible(false);
    router.replace({
      pathname: '/course/[id]',
      params: { id: '1' },
    });
  };

  const progressPercentage = ((currentIndex + (isAnswerChecked ? 1 : 0)) / quizQuestions.length) * 100;

  return (
    <View style={{ flex: 1, backgroundColor: '#EFF6FF' }}>
      {/* Header bar */}
      <View
        style={{
          paddingTop: insets.top + 8,
          paddingBottom: 8,
          paddingHorizontal: 16,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottomWidth: 1,
          borderBottomColor: '#E5E7EB',
          backgroundColor: '#FFFFFF',
        }}
      >
        <Pressable onPress={handleBackToCourse} className="p-2 -ml-2">
          <Ionicons name="close" size={24} color="#4A9FD4" />
        </Pressable>
        <Text className="text-textMuted font-bold font-body text-sm">
          Bài tập đánh giá
        </Text>
        <Text className="text-primary font-heading font-bold text-sm">
          Câu {currentIndex + 1}/{quizQuestions.length}
        </Text>
      </View>

      {/* Progress Bar */}
      <View className="px-5 py-3">
        <ProgressBar progress={progressPercentage} color="#4A9FD4" />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: insets.bottom + 90,
          paddingHorizontal: 20,
        }}
      >
        <Text className="text-textMuted font-body text-[10px] font-bold tracking-wider uppercase mb-2">
          {currentQuestion.type === 'multiple-choice' ? 'TRẮC NGHIỆM' : 'SẮP XẾP TỪ'}
        </Text>

        <Text className="text-textMain font-heading font-bold text-lg mb-6 leading-snug">
          {currentQuestion.question}
        </Text>

        {/* Content Area */}
        {currentQuestion.type === 'multiple-choice' ? (
          <View className="gap-y-3 mb-6">
            {currentQuestion.options.map((option, idx) => {
              const isSelected = selectedOption === idx;
              const isCorrectOption = idx === currentQuestion.correctIndex;

              let borderStyle = 'border-borderLight bg-cardBg';
              let checkIcon: React.ReactNode = null;

              if (isAnswerChecked) {
                if (isCorrectOption) {
                  borderStyle = 'border-success bg-success/10';
                  checkIcon = <Ionicons name="checkmark-circle" size={20} color="#2ECC71" />;
                } else if (isSelected) {
                  borderStyle = 'border-danger bg-danger/10';
                  checkIcon = <Ionicons name="close-circle" size={20} color="#E74C3C" />;
                }
              } else if (isSelected) {
                borderStyle = 'border-primary bg-primary/10';
              }

              return (
                <Pressable
                  key={idx}
                  onPress={() => handleOptionSelect(idx)}
                  disabled={isAnswerChecked}
                  className={`flex-row items-center justify-between p-4 rounded-[16px] border ${borderStyle} active:opacity-90`}
                >
                  <Text
                    className={`flex-1 text-sm font-body leading-relaxed mr-2 ${
                      isSelected || (isAnswerChecked && isCorrectOption)
                        ? 'text-textMain font-bold'
                        : 'text-textMuted'
                    }`}
                  >
                    {option}
                  </Text>
                  {checkIcon}
                </Pressable>
              );
            })}
          </View>
        ) : (
          <View className="mb-6 bg-cardBg border border-borderLight rounded-[16px] p-4 min-h-[220px] justify-between">
            <DuoDragDrop
              key={currentIndex}
              ref={duoRef}
              words={currentQuestion.words}
              wordHeight={42}
              wordGap={6}
              wordBankOffsetY={16}
            />

            {isAnswerChecked && (
              <View className="mt-4 p-3.5 bg-darkBg border border-borderLight rounded-[16px]">
                <Text className="text-textMuted font-body text-[10px] mb-1">Đáp án đúng:</Text>
                <Text className="text-success font-bold font-body text-sm">
                  {currentQuestion.correctOrder
                    .map((idx) => currentQuestion.words[idx])
                    .join(' ')}
                </Text>
              </View>
            )}
          </View>
        )}
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
        <Button
          title={isAnswerChecked ? 'Tiếp tục' : 'Kiểm tra'}
          onPress={handleCheck}
          variant="primary"
          size="lg"
        />
      </View>

      {/* Game Result Card Modal */}
      <GameResultCard
        visible={resultVisible}
        score={score}
        totalQuestions={quizQuestions.length}
        onRetry={handleRetry}
        onBackToCourse={handleBackToCourse}
        onNextLesson={handleNextLesson}
      />
    </View>
  );
}
