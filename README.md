# AL Game - Ứng dụng Học tập & Đánh giá Năng lực (Mobile App)

Ứng dụng **AL Game** (Automation Land Game) được phát triển bằng React Native & Expo, mang đến trải nghiệm học tập hiện đại thông qua các khóa học kỹ năng mềm và minigame đánh giá năng lực tương tác trực quan. Giao diện được thiết kế theo phong cách **Light Theme** hiện đại, thân thiện và tối ưu hóa trải nghiệm di động.

---

## 🛠️ Tech Stack (Công nghệ sử dụng)

Hệ sinh thái công nghệ được chọn lọc kỹ lưỡng để đảm bảo tính gọn nhẹ, hiệu năng mượt mà và khả năng bảo trì lâu dài:

*   **Framework**: [Expo SDK 57](https://expo.dev/) & [React Native 0.86](https://reactnative.dev/) (Nền tảng phát triển ứng dụng di động đa nền tảng tốt nhất hiện nay).
*   **Routing (Định tuyến)**: [Expo Router v57](https://docs.expo.dev/router/introduction/) (Cơ chế định tuyến dựa trên cấu trúc file giống Next.js, giúp quản lý luồng màn hình rõ ràng).
*   **Styling (Giao diện)**: [NativeWind v4](https://www.nativewind.dev/) (Tích hợp Tailwind CSS v3 vào React Native, giúp viết code styling nhanh chóng và đồng bộ).
*   **Animations (Hiệu ứng)**: [React Native Reanimated v4](https://docs.swmansion.com/react-native-reanimated/) (Hỗ trợ tăng tốc phần cứng, tạo hiệu ứng spring co giãn trên các nút bấm và Tab Bar mượt mà ở tần số quét cao).
*   **State Management (Quản lý trạng thái)**: [Zustand v5](https://github.com/pmndrs/zustand) (Giải pháp quản lý state toàn cục siêu nhẹ thay thế Redux).
*   **Safe Area**: [React Native Safe Area Context v5](https://github.com/th3rdwave/react-native-safe-area-context) (Tự động đo đạc và điều chỉnh nội dung tránh đè lên Status Bar, tai thỏ của các thiết bị iOS/Android).
*   **Drag & Drop Game**: `@jamsch/react-native-duo-drag-drop` (Hỗ trợ dựng giao diện kéo thả từ vựng giống như Duolingo).
*   **Typography**: Sử dụng font chữ Google Fonts `Inter` (cho phần thân) và `Space Grotesk` (cho phần tiêu đề chính).

---

## 🎨 Design System & Theme (Quy chuẩn Thiết kế)

Giao diện áp dụng bộ quy chuẩn **Light Theme** nhất quán với các thông số:

*   **Hệ màu sắc chính**:
    *   `Primary blue`: `#4A9FD4` (Xanh dương thương hiệu chính).
    *   `Background`: `#F0F7FF` (Nền xanh rất nhạt, tạo chiều sâu).
    *   `Card bg`: `#FFFFFF` (Nền thẻ trắng tinh khiết).
    *   `Bottom tab active`: `#1A6FB5` (Xanh dương đậm cho mục đang chọn).
    *   `Accent orange`: `#F5A623` (Cam vàng - Streak, Danh hiệu, Trophy).
    *   `Accent green`: `#2ECC71` (Xanh lá - Bài đã học, đáp án đúng).
    *   `Accent red`: `#E74C3C` (Đỏ - Lỗi sai, bài tập chưa đạt).
    *   `Text primary`: `#1A1A2E` | `Text secondary`: `#6B7280` | `Border/divider`: `#E5E7EB`.
*   **Quy chuẩn góc bo**:
    *   Góc bo thẻ (`Card`), ô nhập liệu (`TextInput`) và ô chọn đáp án trắc nghiệm: **`16px`** (bo tròn lớn thân thiện).
*   **Biểu tượng (Icon)**:
    *   Các Icon được đặt bên trong ô vuông bo tròn góc mềm mại với nền màu mờ 10% tương ứng (Ví dụ: Icon cúp vàng nằm trong ô nền màu cam `#F5A623` có độ mờ opacity `0.1`).

---

## 📂 Project Structure (Cấu trúc Thư mục)

```text
AL-Game/
├── app/                        # Expo Router (Các màn hình & Định tuyến)
│   ├── (auth)/                 # Nhóm màn hình xác thực (Không chứa Bottom Tab)
│   │   ├── _layout.tsx
│   │   └── login.tsx           # Màn hình đăng nhập (Google, Email)
│   ├── (main)/                 # Nhóm màn hình chính (Chứa Bottom Tab 5 mục)
│   │   ├── _layout.tsx         # Custom Bottom Tab Bar với hiệu ứng spring
│   │   ├── home.tsx            # Trang chủ hiển thị tiến độ học & chỉ số
│   │   ├── explore.tsx         # Tìm kiếm & Phân loại khóa học
│   │   ├── mylearning.tsx      # Khóa học của tôi (Đang học, Đã học, Tất cả)
│   │   ├── leaderboard.tsx     # Bảng xếp hạng học viên, Top 3 Podium
│   │   └── profile.tsx         # Trang cá nhân & Cài đặt tài khoản
│   ├── course/                 # Nhóm màn hình chi tiết bài học
│   │   ├── [id].tsx            # Chi tiết khóa học & danh sách bài học
│   │   └── lesson/
│   │       ├── [lessonId].tsx  # Màn hình học qua Video & viết Ghi chú
│   │       └── game/
│   │           └── [lessonId].tsx # Trò chơi trắc nghiệm & kéo thả đánh giá bài học
│   └── _layout.tsx             # Root layout cấu hình StatusBar & SafeAreaProvider
│
├── components/                 # Các components tái sử dụng
│   ├── course/                 # CourseCard, CourseProgress, LessonItem
│   ├── game/                   # GameResultCard, ScoreBadge
│   └── ui/                     # UI Kit cơ bản (Button, Badge, Card, Avatar, ProgressBar)
│
├── constants/                  # Mock dữ liệu mẫu (mockData.ts)
├── store/                      # Zustand Stores (useAuthStore.ts)
├── tailwind.config.js          # Cấu hình Tailwind CSS tokens & colors
└── tsconfig.json               # Cấu hình kiểm tra kiểu dữ liệu tĩnh TypeScript
```

---

## 🚀 Hướng dẫn khởi chạy dự án

### 1. Cài đặt các thư viện phụ thuộc
Di chuyển vào thư mục dự án và cài đặt:
```bash
npm install
```

### 2. Thiết lập môi trường chạy (Dành cho Windows/PowerShell)
Nếu hệ thống của bạn tự động nạp tệp `dns-fix.js` gây lỗi crash khi khởi động Node.js, hãy chạy lệnh sau trong PowerShell trước khi khởi chạy:
```powershell
$env:NODE_OPTIONS=""
```

### 3. Khởi chạy máy chủ Metro
```bash
npm start
```
hoặc
```bash
npx expo start --clear
```

### 4. Kết nối thiết bị
*   **Android Emulator**: Nhấn phím **`a`** trên Terminal để tự động kết nối và chạy ứng dụng trên máy ảo Android.
*   **Tải lại ứng dụng**: Nhấn phím **`r`** trên Terminal để reload ứng dụng tức thì khi có sự thay đổi.
*   **Nhà phát triển Menu**: Nhấn **`Ctrl + M`** trên máy ảo để bật menu debug.
