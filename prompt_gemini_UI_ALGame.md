# Prompt cho Gemini — Build toàn bộ UI + Router cho AL Game App

---

## CONTEXT — ĐỌC KỸ TRƯỚC KHI CODE

Tôi đang build app học tập trên **React Native + Expo SDK 52** tên là **AL Game**.  
Mục đích: người dùng đăng nhập → xem danh sách khóa học → vào từng bài học (video + minigame).

### Tech đã chọn
- **Framework**: React Native + Expo SDK 52
- **Router**: Expo Router v4 (file-based routing, thư mục `app/`)
- **Styling**: NativeWind v4 (Tailwind cho React Native)
- **Icons**: `@expo/vector-icons` (Ionicons)
- **Animation**: React Native Reanimated 3
- **State**: Zustand (chỉ dùng cho auth state ở bước này)
- **Font**: Expo Google Fonts — dùng `Inter` (body) + `Space Grotesk` (heading)

### Visual identity — BẮT BUỘC GIỮ NHẤT QUÁN
```
Primary:     #6C63FF  (tím — brand color)
Dark bg:     #0F0E17  (gần đen, nền app)
Card bg:     #1A1929  (nền card)
Surface:     #252438  (input, elevated)
Text main:   #FFFFFE
Text muted:  #A7A9BE
Accent:      #FF8906  (cam — điểm nhấn, progress, CTA phụ)
Success:     #2CB67D
Danger:      #FF4D6D

Font heading: Space Grotesk, bold
Font body:    Inter, regular/medium
Border radius card: 16px
Border radius button: 12px
Border radius input: 12px
```

Dark theme xuyên suốt, không có light mode.

---

## YÊU CẦU CHÍNH

Build **toàn bộ UI + routing** cho app. Chưa cần logic thực (API call, video thật, game logic). Dùng **mock data** và **placeholder** cho content. Tập trung vào:
1. Layout đúng, đẹp, nhất quán design system
2. Navigation flow chính xác giữa các màn hình
3. Animation/transition mượt mà
4. Component reuse tốt

---

## PHẦN 1 — CẤU TRÚC THƯ MỤC (Expo Router v4)

```
app/
├── _layout.tsx                  # Root layout: font load, Zustand provider, splash
├── (auth)/
│   ├── _layout.tsx              # Auth group layout (no tab bar)
│   └── login.tsx                # Màn hình đăng nhập
├── (main)/
│   ├── _layout.tsx              # Tab layout (bottom tabs)
│   ├── home.tsx                 # Tab: Home
│   ├── explore.tsx              # Tab: Explore (danh sách khóa học)
│   └── profile.tsx              # Tab: Profile
└── course/
    ├── [id].tsx                 # Chi tiết khóa học
    ├── lesson/
    │   ├── [lessonId].tsx       # Màn hình video player
    │   └── game/
    │       └── [lessonId].tsx   # Màn hình minigame

components/
├── ui/
│   ├── Button.tsx
│   ├── Card.tsx
│   ├── Badge.tsx
│   ├── ProgressBar.tsx
│   └── Avatar.tsx
├── course/
│   ├── CourseCard.tsx
│   ├── LessonItem.tsx
│   └── CourseProgress.tsx
└── game/
    ├── GameResultCard.tsx
    └── ScoreBadge.tsx
```

---

## PHẦN 2 — ROOT LAYOUT (`app/_layout.tsx`)

```tsx
// Yêu cầu:
// - Load font Space Grotesk + Inter bằng useFonts từ expo-font
// - Hiển thị SplashScreen (expo-splash-screen) trong khi font load
// - Wrap toàn app với GestureHandlerRootView
// - Dùng Stack navigator từ expo-router
// - Dark status bar
// - Redirect: nếu chưa auth → (auth)/login, nếu đã auth → (main)/home
// - Mock auth state: dùng Zustand store đơn giản { isLoggedIn: boolean }
```

---

## PHẦN 3 — MÀN HÌNH AUTH

### `app/(auth)/login.tsx` — Màn hình đăng nhập

Layout (từ trên xuống):
```
┌─────────────────────────────┐
│                             │
│   [Logo + Brand mark]       │  ← Logo AL Game, icon gamepad
│   AL Game                   │
│   Learn. Play. Level up.    │
│                             │
│   ──────────────────────    │
│                             │
│   Chào mừng trở lại 👋     │
│   Đăng nhập để tiếp tục    │
│                             │
│   [Input: Email]            │
│   [Input: Password] 👁      │
│                             │
│   [Button: Đăng nhập]      │  ← Primary, full width, #6C63FF
│                             │
│   ─── hoặc ───              │
│                             │
│   [Button: Google]          │  ← Outlined, icon Google
│                             │
│   Chưa có tài khoản?       │
│   [Đăng ký ngay]           │
│                             │
└─────────────────────────────┘
```

Yêu cầu kỹ thuật:
- Keyboard avoiding view (dùng `KeyboardAvoidingView`)
- Animated logo scale-in khi mount (Reanimated, `withSpring`)
- Input focus state: border đổi thành `#6C63FF`
- Password toggle show/hide
- Khi bấm Đăng nhập: set `isLoggedIn = true` trong Zustand → router.replace `(main)/home`
- Mock: bất kỳ email/password nào cũng đăng nhập được

---

## PHẦN 4 — TAB LAYOUT

### `app/(main)/_layout.tsx` — Bottom Tab Bar

```tsx
// 3 tabs: Home | Explore | Profile
// Tab bar style:
//   background: #1A1929
//   border top: 1px solid #252438
//   active icon + label: #6C63FF
//   inactive: #A7A9BE
//   height: 60px
//   icon size: 24px
// Icons (Ionicons):
//   Home: home / home-outline
//   Explore: compass / compass-outline
//   Profile: person / person-outline
// Ẩn header mặc định của Expo Router cho tất cả tabs
```

---

## PHẦN 5 — CÁC MÀN HÌNH CHÍNH

### `app/(main)/home.tsx` — Trang chủ

Layout:
```
┌─────────────────────────────┐
│ Xin chào, Alex 👋    [🔔]  │  ← Header: tên user + notification icon
│ Hôm nay học gì?            │
├─────────────────────────────┤
│ [Banner: Tiếp tục học]      │  ← Card lớn, gradient #6C63FF→#8B85FF
│  Course đang học...         │    progress bar bên dưới
│  Bài 3/8 · 45% hoàn thành  │
│  [Tiếp tục →]              │
├─────────────────────────────┤
│ Thống kê hôm nay            │
│ [🔥 3]  [⭐ 120]  [✅ 2]   │  ← Streak / XP / Bài hoàn thành
│  Streak  XP tích lũy  Bài   │
├─────────────────────────────┤
│ Khóa học nổi bật            │  ← Horizontal scroll
│ [CourseCard] [CourseCard]   │
├─────────────────────────────┤
│ Tiếp tục từ chỗ dừng        │
│ [LessonItem]                │  ← Vertical list, 2-3 items
│ [LessonItem]                │
└─────────────────────────────┘
```

Yêu cầu:
- `ScrollView` với `showsVerticalScrollIndicator={false}`
- Stats row dùng `FlatList` horizontal hoặc `View` row với flex
- CourseCard horizontal scroll: `FlatList` horizontal
- Header sticky không cần, dùng padding top với safe area inset
- Mock data: 3 courses, 3 lessons

---

### `app/(main)/explore.tsx` — Khám phá khóa học

Layout:
```
┌─────────────────────────────┐
│ Khám phá                    │
├─────────────────────────────┤
│ [🔍 Tìm kiếm khóa học...]  │  ← Search bar, #252438 bg
├─────────────────────────────┤
│ [All] [Bán hàng] [Kỹ năng]  │  ← Filter tabs, horizontal scroll
│       [Leadership] [...]    │
├─────────────────────────────┤
│ 12 khóa học                 │
│                             │
│ [CourseCard - full width]   │  ← Vertical list, card full width
│ [CourseCard - full width]   │
│ [CourseCard - full width]   │
│        ...                  │
└─────────────────────────────┘
```

Yêu cầu:
- Search bar: `TextInput` với icon search, không cần gọi API, chỉ filter mock data locally
- Filter tabs: `FlatList` horizontal, active tab background `#6C63FF`, pill shape
- Course list: `FlatList` vertical với `ItemSeparatorComponent`
- Mock: 6 courses, mỗi course có title, description, thumbnail placeholder (dùng màu gradient), số bài, level (Cơ bản/Trung cấp/Nâng cao)

---

### `app/(main)/profile.tsx` — Hồ sơ cá nhân

Layout:
```
┌─────────────────────────────┐
│         [Avatar 80px]       │
│         Alex Nguyen         │
│         alex@email.com      │
│   [Chỉnh sửa hồ sơ]        │
├─────────────────────────────┤
│ Thành tích                  │
│ ┌────────┐ ┌────────┐       │
│ │ 🔥 15  │ │ ⭐ 890 │       │
│ │ Streak │ │  XP    │       │
│ └────────┘ └────────┘       │
│ ┌────────┐ ┌────────┐       │
│ │ ✅ 12  │ │ 🏆 3   │       │
│ │  Bài   │ │ Badge  │       │
│ └────────┘ └────────┘       │
├─────────────────────────────┤
│ Khóa học của tôi            │
│ [CourseProgress] (2-3 items)│
├─────────────────────────────┤
│ Cài đặt                     │
│ [→ Thông báo]               │
│ [→ Ngôn ngữ]                │
│ [→ Về ứng dụng]             │
│ [Đăng xuất]                 │  ← Danger color #FF4D6D
└─────────────────────────────┘
```

Yêu cầu:
- Avatar: `Image` với fallback initials nếu không có ảnh
- Stats: 2x2 grid dùng `View` với `flexDirection: row` và `flexWrap`
- Đăng xuất: set `isLoggedIn = false` → navigate về login

---

## PHẦN 6 — MÀN HÌNH COURSE DETAIL

### `app/course/[id].tsx` — Chi tiết khóa học

Layout:
```
┌─────────────────────────────┐
│ [← Back]          [♡ Save] │  ← Custom header, transparent over banner
├─────────────────────────────┤
│ [Banner thumbnail 200px]    │  ← Gradient placeholder + icon overlay
│  [PLAY PREVIEW]             │
├─────────────────────────────┤
│ Tên khóa học                │  ← Space Grotesk Bold 22px
│ ⭐ 4.8  · 1.2k học viên     │
│ [Badge: Cơ bản]             │
│                             │
│ Mô tả khóa học...           │  ← 3 dòng + "Xem thêm"
├─────────────────────────────┤
│ Tiến độ của bạn             │
│ [ProgressBar 3/8 · 37%]    │
├─────────────────────────────┤
│ Nội dung khóa học           │
│                             │
│ [LessonItem #1 ✅]          │  ← Đã hoàn thành
│ [LessonItem #2 ▶ ĐANG HỌC] │  ← Current, highlighted
│ [LessonItem #3 🔒]          │  ← Locked (chưa đủ điều kiện)
│ [LessonItem #4 🔒]          │
│        ...                  │
├─────────────────────────────┤
│ [Button: Tiếp tục học →]   │  ← Sticky bottom, primary
└─────────────────────────────┘
```

Yêu cầu:
- `ScrollView` với custom header overlapping banner
- `useLocalSearchParams()` để lấy `id` từ URL
- Lesson item states: completed (green check), current (purple highlight), locked (gray + lock icon)
- Tap locked lesson: hiện bottom sheet "Hoàn thành bài trước để mở khóa" (dùng `Modal` hoặc bottom sheet đơn giản với `Animated`)
- Tap current/completed lesson → navigate `course/lesson/[lessonId]`
- Mock data dựa vào `id` param

---

## PHẦN 7 — MÀN HÌNH VIDEO LESSON

### `app/course/lesson/[lessonId].tsx` — Video player

Layout:
```
┌─────────────────────────────┐
│ [← Back]   Bài 3: Tiêu đề  │
├─────────────────────────────┤
│ ┌─────────────────────────┐ │
│ │                         │ │
│ │   [VIDEO PLACEHOLDER]   │ │  ← Tỉ lệ 16:9, màu #1A1929
│ │   (màu tối + play icon) │ │     Center: icon play lớn
│ │                         │ │
│ └─────────────────────────┘ │
│                             │
│ [====●──────────] 1:23/5:00 │  ← Progress bar KHÔNG có seek
│                             │    (disabled, chỉ hiển thị tiến độ)
│ [❚❚ Tạm dừng]  [🔊]        │  ← Controls đơn giản
├─────────────────────────────┤
│ Bài 3: Kỹ năng đặt câu hỏi │
│ Mô tả ngắn về bài học...   │
├─────────────────────────────┤
│ Ghi chú của bạn             │
│ [TextInput: Ghi chú...]    │
├─────────────────────────────┤
│ [Chưa xem hết video]        │  ← Button disabled, mờ
│                             │  ← Sau khi "xem xong": enabled
│ [Làm bài tập →]            │     navigate đến game screen
└─────────────────────────────┘
```

Yêu cầu kỹ thuật:
- Video placeholder: `View` với `backgroundColor: #1A1929`, ratio 16:9 (`aspectRatio: 16/9`)
- Progress bar NO-SKIP: `View` custom, KHÔNG dùng `Slider`, KHÔNG có `onTouchStart`. Chỉ hiển thị tiến độ, không tương tác được
- Simulate "xem video": dùng `useEffect` + `setInterval` đếm từ 0 đến 100% trong 10 giây (mock). Khi đủ 100% → button "Làm bài tập" enabled với animation `withSpring`
- Button disabled state: opacity 0.4, `pointerEvents: none`
- Khi bấm "Làm bài tập" → navigate `course/lesson/game/[lessonId]`

---

## PHẦN 8 — MÀN HÌNH MINIGAME

### `app/course/lesson/game/[lessonId].tsx` — Game screen

Layout chung (wrapper cho tất cả game types):
```
┌─────────────────────────────┐
│ [✕]              Bài 3/8   │
│ [===========●──────] 60%   │  ← Progress tổng số câu
├─────────────────────────────┤
│                             │
│   Câu 2/5                  │
│                             │
│   [GAME CONTENT AREA]      │  ← Thay đổi theo game type
│                             │
├─────────────────────────────┤
│ [Button: Kiểm tra]         │  ← Confirm answer
└─────────────────────────────┘
```

#### Game Type 1: Multiple Choice

```
│   Sản phẩm nào phù hợp     │
│   với khách hàng dưới đây? │
│                             │
│   [Option A] ← outlined    │  ← Tap để select
│   [Option B] ← selected    │  ← Selected: bg #6C63FF, border #6C63FF
│   [Option C] ← outlined    │
│   [Option D] ← outlined    │
│                             │
│   Sau khi bấm Kiểm tra:    │
│   Correct: border #2CB67D + ✅ icon + confetti nhỏ
│   Wrong:   border #FF4D6D + ✕ icon + show correct answer
```

#### Game Type 2: Drag & Drop (Word ordering)

```
│   Sắp xếp các từ thành     │
│   câu đúng:                 │
│                             │
│   [__________] [__________] │  ← Drop zones (outlined dashed)
│   [__________] [__________] │
│                             │
│   ─────────────────────    │
│                             │
│   [từ 1] [từ 2] [từ 3]     │  ← Word chips để kéo
│   [từ 4] [từ 5]            │
```

Yêu cầu game screen:
- `useLocalSearchParams()` lấy `lessonId`
- Mock data: array 5 câu hỏi, mix 2 types (3 multiple choice + 2 drag-drop)
- State machine đơn giản: `idle` → `answered` → `next` → `completed`
- Sau câu cuối → hiện `GameResultCard` (modal/overlay):

```
┌─────────────────────────────┐
│                             │
│        🏆                   │
│   Hoàn thành bài học!       │
│                             │
│   Điểm của bạn: 4/5        │
│   [============] 80%        │
│                             │
│   ✅ Vượt qua! (≥ 70%)     │  ← Nếu ≥ 70%
│   hoặc                      │
│   ❌ Chưa đạt. Thử lại?    │  ← Nếu < 70%
│                             │
│   [Học bài tiếp theo →]    │  ← Nếu pass
│   hoặc                      │
│   [Làm lại]                │  ← Nếu fail
│   [Về khóa học]            │
└─────────────────────────────┘
```

---

## PHẦN 9 — SHARED COMPONENTS

### `components/ui/Button.tsx`
```tsx
// Props: title, onPress, variant: 'primary'|'secondary'|'danger'|'ghost'
//        size: 'sm'|'md'|'lg', disabled?, loading?, icon?
// primary: bg #6C63FF, text white
// secondary: bg transparent, border #6C63FF, text #6C63FF
// danger: bg #FF4D6D, text white
// ghost: no border, text #A7A9BE
// loading: ActivityIndicator thay icon
// Tap feedback: scale 0.97 với Reanimated withSpring
```

### `components/ui/ProgressBar.tsx`
```tsx
// Props: progress: number (0-100), color?, height?, showLabel?
// Animated width với Reanimated withTiming
// Background: #252438, fill: color prop (default #6C63FF)
// showLabel: hiện "37%" text bên phải
```

### `components/ui/Badge.tsx`
```tsx
// Props: label, variant: 'primary'|'success'|'warning'|'danger'|'neutral'
// Pill shape, 6px padding horizontal, font size 12px
// primary: bg #6C63FF20, text #6C63FF
// success: bg #2CB67D20, text #2CB67D
// warning: bg #FF890620, text #FF8906
// danger: bg #FF4D6D20, text #FF4D6D
// neutral: bg #25243820, text #A7A9BE
```

### `components/course/CourseCard.tsx`
```tsx
// Props: course: { id, title, description, lessonsCount, level, color }
// Dùng trong cả horizontal (home) và vertical list (explore)
// Props: variant: 'horizontal'|'vertical'
// horizontal: width 200px, height 160px
// vertical: full width, height 100px (row layout: thumbnail + info)
// Thumbnail: colored placeholder dùng `course.color` (mỗi course 1 màu khác nhau)
// Tap → navigate `course/[id]`
```

### `components/course/LessonItem.tsx`
```tsx
// Props: lesson: { id, title, duration, status: 'completed'|'current'|'locked' }
// Row layout: icon trái + info giữa + duration phải
// completed: check circle #2CB67D
// current: play circle #6C63FF, background highlight nhẹ
// locked: lock icon #A7A9BE, opacity 0.6
// Tap → callback onPress
```

---

## PHẦN 10 — MOCK DATA

Tạo file `constants/mockData.ts`:

```typescript
export const MOCK_USER = {
  id: '1',
  name: 'Alex Nguyen',
  email: 'alex@example.com',
  avatar: null,
  xp: 890,
  streak: 15,
  completedLessons: 12,
  badges: 3,
}

export const MOCK_COURSES = [
  {
    id: '1',
    title: 'Kỹ năng bán hàng cơ bản',
    description: 'Nắm vững quy trình bán hàng, xây dựng mối quan hệ khách hàng.',
    lessonsCount: 8,
    level: 'Cơ bản',
    color: '#6C63FF',
    progress: 37,
    currentLesson: 3,
    rating: 4.8,
    students: 1200,
  },
  // ... thêm 5 courses nữa với color khác nhau
]

export const MOCK_LESSONS = [
  {
    id: '1',
    courseId: '1',
    title: 'Giới thiệu về bán hàng',
    duration: '5:30',
    status: 'completed',
    order: 1,
  },
  // ... thêm lessons
]

export const MOCK_QUESTIONS = [
  {
    id: '1',
    lessonId: '3',
    type: 'multiple-choice',
    question: 'Bước đầu tiên trong quy trình bán hàng là gì?',
    options: ['Chốt hợp đồng', 'Tìm kiếm khách hàng', 'Xử lý từ chối', 'Báo giá'],
    correctIndex: 1,
  },
  {
    id: '2',
    lessonId: '3',
    type: 'drag-drop',
    question: 'Sắp xếp các bước theo đúng quy trình:',
    words: ['Tìm kiếm', 'Tiếp cận', 'Trình bày', 'Chốt sale', 'Chăm sóc'],
    correctOrder: [0, 1, 2, 3, 4],
  },
  // ... 3 câu nữa
]
```

---

## PHẦN 11 — NAVIGATION FLOW

```
(auth)/login
    │ đăng nhập thành công
    ▼
(main)/home ◄──────────────────────────────────┐
    │                                           │
    ├── [bottom tab] ──► (main)/explore         │
    │                        │                 │
    │                        └── course/[id] ──┤
    │                                          │
    └── [continue button] ──► course/[id]      │
                                  │            │
                         [LessonItem tap]      │
                                  │            │
                         course/lesson/[id]    │
                                  │            │
                         [Làm bài tập]         │
                                  │            │
                    course/lesson/game/[id]    │
                              │       │        │
                           [pass]  [fail]      │
                              │       │        │
                   [next lesson]  [retry]      │
                              │               │
                     [Về khóa học] ───────────┘
```

Implement bằng Expo Router:
- `router.push()` cho forward navigation
- `router.back()` cho back
- `router.replace()` cho auth redirect (không quay lại được login)
- Pass params qua URL: `router.push({ pathname: 'course/[id]', params: { id: '1' } })`

---

## PHẦN 12 — ANIMATIONS YÊU CẦU

Chỉ dùng React Native Reanimated 3:

1. **Login screen**: Logo fade + scale in khi mount (`withSpring`)
2. **Tab bar**: Active tab icon bounce khi switch (`withSpring`)
3. **Course card**: Scale down 0.97 khi tap (`withSpring`)
4. **Option selection** (multiple choice): Border color animated (`withTiming 200ms`)
5. **Progress bar**: Width animated (`withTiming 800ms`) khi load
6. **Video progress**: Width animated mỗi giây (`withTiming 1000ms`)
7. **Game result overlay**: Slide up từ bottom (`withSpring`)
8. **Button press**: Scale 0.97 → 1.0 (`withSpring`)

---

## LƯU Ý QUAN TRỌNG

1. **SafeAreaView**: Dùng `useSafeAreaInsets()` từ `react-native-safe-area-context` cho tất cả screens.

2. **StatusBar**: `<StatusBar style="light" />` cho tất cả screens.

3. **NativeWind setup**: Đã cấu hình sẵn. Dùng `className` prop. Với dynamic style (màu từ props) vẫn dùng `style` prop thông thường.

4. **TypeScript**: Tất cả file phải có type, không dùng `any`.

5. **Không cần**: API calls, video thực, game logic thực, auth thực. Chỉ cần UI đẹp và navigation đúng.

6. **Platform**: Target Android trước, iOS sau. Dùng `Platform.OS` khi cần.

---

## OUTPUT YÊU CẦU

Implement theo thứ tự:
1. `constants/mockData.ts`
2. `app/_layout.tsx`
3. `app/(auth)/login.tsx`
4. `app/(main)/_layout.tsx`
5. `app/(main)/home.tsx`
6. `app/(main)/explore.tsx`
7. `app/(main)/profile.tsx`
8. `components/ui/` — tất cả 5 components
9. `components/course/` — CourseCard + LessonItem
10. `app/course/[id].tsx`
11. `app/course/lesson/[lessonId].tsx`
12. `app/course/lesson/game/[lessonId].tsx`
13. `components/game/GameResultCard.tsx`

Với mỗi file: code đầy đủ, không placeholder, không TODO. StyleSheet hoặc NativeWind đều được nhưng phải nhất quán trong cùng 1 file.
