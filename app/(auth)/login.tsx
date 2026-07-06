import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Pressable,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';
import { useAuthStore } from '../../store/useAuthStore';
import { Button } from '../../components/ui/Button';

export default function LoginScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const login = useAuthStore((state) => state.login);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [loading, setLoading] = useState(false);

  // Logo Animation
  const logoScale = useSharedValue(0.3);
  const logoOpacity = useSharedValue(0);

  useEffect(() => {
    logoScale.value = withSpring(1, { damping: 10, stiffness: 80 });
    logoOpacity.value = withSpring(1, { duration: 500 });
  }, []);

  const logoAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: logoScale.value }],
      opacity: logoOpacity.value,
    };
  });

  const handleLogin = () => {
    if (!email || !password) {
      alert('Vui lòng điền đầy đủ email và mật khẩu!');
      return;
    }
    setLoading(true);
    // Simulate login loading delay
    setTimeout(() => {
      setLoading(false);
      login(); // Sets isLoggedIn to true in Zustand
      router.replace('/home');
    }, 1500);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1 bg-darkBg"
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            flexGrow: 1,
            paddingTop: insets.top + 40,
            paddingBottom: insets.bottom + 20,
            paddingHorizontal: 24,
          }}
        >
          {/* Logo & Slogan */}
          <View className="items-center mb-8">
            <Animated.View
              style={[logoAnimatedStyle]}
              className="w-20 h-20 bg-primary/20 rounded-[24px] items-center justify-center border border-primary/40 mb-3"
            >
              <Ionicons name="game-controller" size={44} color="#6C63FF" />
            </Animated.View>
            <Text className="text-textMain font-heading font-bold text-3xl tracking-tight">
              AL Game
            </Text>
            <Text className="text-textMuted font-body text-sm mt-1">
              Learn. Play. Level up.
            </Text>
          </View>

          <View className="h-[1px] bg-surface w-full mb-8" />

          {/* Form Title */}
          <View className="mb-6">
            <Text className="text-textMain font-heading font-bold text-2xl mb-1">
              Chào mừng trở lại 👋
            </Text>
            <Text className="text-textMuted font-body text-sm">
              Đăng nhập để tiếp tục quá trình học tập
            </Text>
          </View>

          {/* Input Fields */}
          <View className="gap-y-4 mb-6">
            {/* Email Input */}
            <View>
              <Text className="text-textMain font-bold font-body text-xs mb-2">
                EMAIL
              </Text>
              <View
                className={`flex-row items-center bg-surface h-[52px] rounded-[12px] px-4 border ${
                  emailFocused ? 'border-primary' : 'border-transparent'
                }`}
              >
                <Ionicons name="mail-outline" size={20} color="#A7A9BE" className="mr-3" />
                <TextInput
                  value={email}
                  onChangeText={setEmail}
                  onFocus={() => setEmailFocused(true)}
                  onBlur={() => setEmailFocused(false)}
                  placeholder="example@email.com"
                  placeholderTextColor="#A7A9BE"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  className="flex-1 h-full text-textMain font-body text-sm"
                  style={{ includeFontPadding: false }}
                />
              </View>
            </View>

            {/* Password Input */}
            <View>
              <Text className="text-textMain font-bold font-body text-xs mb-2">
                MẬT KHẨU
              </Text>
              <View
                className={`flex-row items-center bg-surface h-[52px] rounded-[12px] px-4 border ${
                  passwordFocused ? 'border-primary' : 'border-transparent'
                }`}
              >
                <Ionicons name="lock-closed-outline" size={20} color="#A7A9BE" className="mr-3" />
                <TextInput
                  value={password}
                  onChangeText={setPassword}
                  onFocus={() => setPasswordFocused(true)}
                  onBlur={() => setPasswordFocused(false)}
                  placeholder="••••••••"
                  placeholderTextColor="#A7A9BE"
                  secureTextEntry={!showPassword}
                  className="flex-1 h-full text-textMain font-body text-sm"
                  style={{ includeFontPadding: false }}
                />
                <Pressable onPress={() => setShowPassword(!showPassword)} className="p-1">
                  <Ionicons
                    name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                    size={20}
                    color="#A7A9BE"
                  />
                </Pressable>
              </View>
            </View>
          </View>

          {/* Submit Button */}
          <Button
            title="Đăng nhập"
            onPress={handleLogin}
            loading={loading}
            size="lg"
            variant="primary"
            className="mb-4"
          />

          {/* Or Divider */}
          <View className="flex-row items-center my-4 justify-center">
            <View className="h-[1px] bg-surface flex-1" />
            <Text className="text-textMuted font-body text-xs mx-4">hoặc</Text>
            <View className="h-[1px] bg-surface flex-1" />
          </View>

          {/* Google Button */}
          <Button
            title="Đăng nhập với Google"
            onPress={handleLogin}
            size="lg"
            variant="secondary"
            icon={<Ionicons name="logo-google" size={18} color="#6C63FF" />}
            className="mb-8"
          />

          {/* Register Link */}
          <View className="flex-row justify-center items-center mt-auto">
            <Text className="text-textMuted font-body text-sm mr-1.5">
              Chưa có tài khoản?
            </Text>
            <Pressable onPress={() => alert('Chức năng đăng ký đang được phát triển!')}>
              <Text className="text-primary font-bold font-body text-sm">
                Đăng ký ngay
              </Text>
            </Pressable>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}
