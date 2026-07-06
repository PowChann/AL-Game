export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string | null;
  xp: number;
  streak: number;
  completedLessons: number;
  badges: number;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  lessonsCount: number;
  level: 'Cơ bản' | 'Trung cấp' | 'Nâng cao';
  color: string;
  progress: number; // 0-100
  currentLesson: number;
  rating: number;
  students: number;
}

export interface Lesson {
  id: string;
  courseId: string;
  title: string;
  duration: string;
  status: 'completed' | 'current' | 'locked';
  order: number;
  videoUrl?: string;
  description?: string;
}

export type Question =
  | {
      id: string;
      lessonId: string;
      type: 'multiple-choice';
      question: string;
      options: string[];
      correctIndex: number;
    }
  | {
      id: string;
      lessonId: string;
      type: 'drag-drop';
      question: string;
      words: string[];
      correctOrder: number[];
    };

export const MOCK_USER: User = {
  id: '1',
  name: 'Alex Nguyen',
  email: 'alex@example.com',
  avatar: null,
  xp: 890,
  streak: 15,
  completedLessons: 12,
  badges: 3,
};

export const MOCK_COURSES: Course[] = [
  {
    id: '1',
    title: 'Kỹ năng bán hàng cơ bản',
    description: 'Nắm vững quy trình bán hàng chuyên nghiệp, xây dựng mối quan hệ bền vững với khách hàng tiềm năng.',
    lessonsCount: 8,
    level: 'Cơ bản',
    color: '#6C63FF', // Tím chủ đạo
    progress: 37,
    currentLesson: 3,
    rating: 4.8,
    students: 1200,
  },
  {
    id: '2',
    title: 'Lãnh đạo đội nhóm hiệu quả',
    description: 'Phương pháp quản lý, tạo động lực và dẫn dắt đội nhóm đạt mục tiêu kinh doanh xuất sắc.',
    lessonsCount: 10,
    level: 'Trung cấp',
    color: '#3B82F6', // Xanh dương
    progress: 10,
    currentLesson: 1,
    rating: 4.9,
    students: 850,
  },
  {
    id: '3',
    title: 'Kỹ năng đàm phán thương lượng',
    description: 'Nghệ thuật thương lượng trong kinh doanh, giải quyết xung đột lợi ích hướng đến Win-Win.',
    lessonsCount: 6,
    level: 'Nâng cao',
    color: '#10B981', // Xanh lá
    progress: 0,
    currentLesson: 1,
    rating: 4.7,
    students: 620,
  },
  {
    id: '4',
    title: 'Thuyết trình trước đám đông',
    description: 'Làm chủ giọng nói, ngôn ngữ cơ thể và thiết kế slide thuyết trình thu hút người nghe.',
    lessonsCount: 8,
    level: 'Cơ bản',
    color: '#F59E0B', // Cam vàng
    progress: 0,
    currentLesson: 1,
    rating: 4.6,
    students: 1500,
  },
  {
    id: '5',
    title: 'Quản lý thời gian & Năng suất',
    description: 'Tối ưu hóa thời gian làm việc hàng ngày, cân bằng cuộc sống và nâng cao năng suất cá nhân.',
    lessonsCount: 5,
    level: 'Cơ bản',
    color: '#EC4899', // Hồng
    progress: 100,
    currentLesson: 5,
    rating: 4.8,
    students: 2100,
  },
  {
    id: '6',
    title: 'Giải quyết vấn đề sáng tạo',
    description: 'Các công cụ tư duy đột phá giúp nhận diện vấn đề cốt lõi và đưa ra giải pháp tối ưu.',
    lessonsCount: 7,
    level: 'Trung cấp',
    color: '#8B5CF6', // Tím nhạt
    progress: 0,
    currentLesson: 1,
    rating: 4.5,
    students: 480,
  },
];

export const MOCK_LESSONS: Lesson[] = [
  // Khóa 1
  {
    id: '1',
    courseId: '1',
    title: 'Giới thiệu về quy trình bán hàng',
    duration: '5:30',
    status: 'completed',
    order: 1,
    description: 'Tìm hiểu tổng quan về tầm quan trọng của quy trình bán hàng và cấu trúc 7 bước chuẩn.',
  },
  {
    id: '2',
    courseId: '1',
    title: 'Xác định nhu cầu khách hàng',
    duration: '7:15',
    status: 'completed',
    order: 2,
    description: 'Phương pháp nhận diện nhu cầu thực sự của khách hàng thông qua lắng nghe tích cực.',
  },
  {
    id: '3',
    courseId: '1',
    title: 'Kỹ năng đặt câu hỏi gợi mở',
    duration: '6:45',
    status: 'current',
    order: 3,
    description: 'Sử dụng các loại câu hỏi để khai thác thông tin từ khách hàng mà không gây cảm giác khó chịu.',
  },
  {
    id: '4',
    courseId: '1',
    title: 'Thuyết trình giải pháp sản phẩm',
    duration: '8:00',
    status: 'locked',
    order: 4,
    description: 'Liên kết tính năng sản phẩm với lợi ích trực tiếp của khách hàng để tạo sự thuyết phục.',
  },
  {
    id: '5',
    courseId: '1',
    title: 'Xử lý các lời từ chối phổ biến',
    duration: '9:20',
    status: 'locked',
    order: 5,
    description: 'Kỹ thuật hóa giải phản đối của khách hàng về giá cả, thời gian và đối thủ cạnh tranh.',
  },
  {
    id: '6',
    courseId: '1',
    title: 'Nghệ thuật chốt sales tự nhiên',
    duration: '6:10',
    status: 'locked',
    order: 6,
    description: 'Áp dụng các kỹ thuật chốt sales mềm dẻo giúp khách hàng vui vẻ ra quyết định mua hàng.',
  },
  {
    id: '7',
    courseId: '1',
    title: 'Chăm sóc và duy trì quan hệ',
    duration: '5:50',
    status: 'locked',
    order: 7,
    description: 'Xây dựng kế hoạch hỗ trợ sau bán hàng để kích hoạt mua lại và giới thiệu khách hàng mới.',
  },
  {
    id: '8',
    courseId: '1',
    title: 'Tổng kết và Đánh giá cuối khóa',
    duration: '10:15',
    status: 'locked',
    order: 8,
    description: 'Bài kiểm tra tổng hợp kiến thức khóa học Kỹ năng bán hàng cơ bản.',
  },
];

export const MOCK_QUESTIONS: Question[] = [
  {
    id: '1',
    lessonId: '3',
    type: 'multiple-choice',
    question: 'Bước đầu tiên trong quy trình bán hàng chuyên nghiệp là gì?',
    options: ['Chốt hợp đồng mua bán', 'Tìm kiếm và phân loại khách hàng tiềm năng', 'Xử lý phản đối của khách hàng', 'Báo giá sản phẩm'],
    correctIndex: 1,
  },
  {
    id: '2',
    lessonId: '3',
    type: 'drag-drop',
    question: 'Sắp xếp các từ thành câu đúng về vai trò của đặt câu hỏi:',
    words: ['Đặt', 'câu', 'hỏi', 'giúp', 'thấu', 'hiểu', 'khách', 'hàng'],
    correctOrder: [0, 1, 2, 3, 4, 5, 6, 7],
  },
  {
    id: '3',
    lessonId: '3',
    type: 'multiple-choice',
    question: 'Khi khách hàng từ chối mua vì lý do "Giá sản phẩm quá đắt", cách xử lý nào tối ưu nhất?',
    options: [
      'Giảm giá ngay lập tức để giữ chân khách hàng',
      'Giải thích và làm nổi bật giá trị vượt trội của sản phẩm mang lại',
      'Từ bỏ khách hàng này và chuyển sang khách hàng khác',
      'Tranh luận trực tiếp chứng minh khách hàng đã sai'
    ],
    correctIndex: 1,
  },
  {
    id: '4',
    lessonId: '3',
    type: 'drag-drop',
    question: 'Sắp xếp các bước theo đúng quy trình bán hàng:',
    words: ['Tìm kiếm', 'Tiếp cận', 'Trình bày', 'Chốt sale', 'Chăm sóc'],
    correctOrder: [0, 1, 2, 3, 4],
  },
  {
    id: '5',
    lessonId: '3',
    type: 'multiple-choice',
    question: 'Mục đích cốt lõi của việc chăm sóc khách hàng sau khi bán hàng thành công là gì?',
    options: [
      'Để nhanh chóng thu hồi công nợ',
      'Xây dựng mối quan hệ lâu dài, bán thêm sản phẩm và nhận giới thiệu khách hàng mới',
      'Không quan trọng vì giao dịch đã hoàn tất',
      'Khoe khoang về dịch vụ của công ty'
    ],
    correctIndex: 1,
  },
];
