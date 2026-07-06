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
  emoji: string;
  progress: number; // 0-100
  currentLesson: number;
  rating: number;
  students: number;
  category: string;
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
  email: 'alex@qbroker.vn',
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
    description: 'Quy trình bán hàng, xây dựng mối quan hệ khách hàng.',
    lessonsCount: 8,
    level: 'Cơ bản',
    color: '#4A9FD4',
    emoji: '💼',
    progress: 37,
    currentLesson: 3,
    rating: 4.8,
    students: 1200,
    category: 'Bán hàng',
  },
  {
    id: '2',
    title: 'Pháp lý bất động sản',
    description: 'Kiến thức pháp lý, hợp đồng, thủ tục giao dịch BĐS.',
    lessonsCount: 12,
    level: 'Trung cấp',
    color: '#8B5CF6',
    emoji: '⚖️',
    progress: 0,
    currentLesson: 1,
    rating: 4.9,
    students: 890,
    category: 'Pháp lý',
  },
  {
    id: '3',
    title: 'Kỹ năng thuyết trình',
    description: 'Trình bày sản phẩm, thuyết phục khách hàng hiệu quả.',
    lessonsCount: 6,
    level: 'Cơ bản',
    color: '#2ECC71',
    emoji: '🎤',
    progress: 100,
    currentLesson: 6,
    rating: 4.7,
    students: 2100,
    category: 'Kỹ năng',
  },
  {
    id: '4',
    title: 'Định giá bất động sản',
    description: 'Phương pháp định giá, phân tích thị trường BĐS.',
    lessonsCount: 10,
    level: 'Nâng cao',
    color: '#F5A623',
    emoji: '🏠',
    progress: 0,
    currentLesson: 1,
    rating: 4.6,
    students: 650,
    category: 'Chuyên môn',
  },
  {
    id: '5',
    title: 'Chăm sóc khách hàng',
    description: 'Xây dựng mối quan hệ lâu dài, tăng tỷ lệ giữ chân khách.',
    lessonsCount: 7,
    level: 'Cơ bản',
    color: '#E74C3C',
    emoji: '🤝',
    progress: 60,
    currentLesson: 5,
    rating: 4.8,
    students: 1500,
    category: 'Kỹ năng',
  },
  {
    id: '6',
    title: 'Marketing bất động sản',
    description: 'Chiến lược marketing, quảng cáo online và offline cho BĐS.',
    lessonsCount: 9,
    level: 'Trung cấp',
    color: '#1A6FB5',
    emoji: '📱',
    progress: 20,
    currentLesson: 2,
    rating: 4.5,
    students: 780,
    category: 'Marketing',
  },
];

export const MOCK_LESSONS: Lesson[] = [
  { id: '1', courseId: '1', title: 'Giới thiệu quy trình bán hàng', duration: '5:30', status: 'completed', order: 1, description: 'Tìm hiểu tổng quan về tầm quan trọng của quy trình bán hàng và cấu trúc 7 bước chuẩn.' },
  { id: '2', courseId: '1', title: 'Tìm kiếm và tiếp cận khách hàng', duration: '8:15', status: 'completed', order: 2, description: 'Phương pháp nhận diện nhu cầu thực sự của khách hàng thông qua lắng nghe tích cực.' },
  { id: '3', courseId: '1', title: 'Kỹ năng đặt câu hỏi hiệu quả', duration: '6:45', status: 'current', order: 3, description: 'Sử dụng các loại câu hỏi để khai thác thông tin từ khách hàng mà không gây cảm giác khó chịu.' },
  { id: '4', courseId: '1', title: 'Xử lý từ chối của khách hàng', duration: '7:20', status: 'locked', order: 4, description: 'Liên kết tính năng sản phẩm với lợi ích trực tiếp của khách hàng để tạo sự thuyết phục.' },
  { id: '5', courseId: '1', title: 'Chốt hợp đồng thành công', duration: '9:00', status: 'locked', order: 5, description: 'Kỹ thuật hóa giải phản đối của khách hàng về giá cả, thời gian và đối thủ cạnh tranh.' },
  { id: '6', courseId: '1', title: 'Chăm sóc sau bán hàng', duration: '5:10', status: 'locked', order: 6, description: 'Áp dụng các kỹ thuật chốt sales mềm dẻo giúp khách hàng vui vẻ ra quyết định mua hàng.' },
  { id: '7', courseId: '1', title: 'Xây dựng mạng lưới khách hàng', duration: '6:30', status: 'locked', order: 7, description: 'Xây dựng kế hoạch hỗ trợ sau bán hàng để kích hoạt mua lại và giới thiệu khách hàng mới.' },
  { id: '8', courseId: '1', title: 'Tổng kết và thực hành', duration: '10:00', status: 'locked', order: 8, description: 'Bài kiểm tra tổng hợp kiến thức khóa học Kỹ năng bán hàng cơ bản.' },
];

export const MOCK_QUESTIONS: Question[] = [
  {
    id: '1',
    lessonId: '3',
    type: 'multiple-choice',
    question: 'Bước đầu tiên trong quy trình bán hàng là gì?',
    options: ['Chốt hợp đồng ngay', 'Tìm hiểu nhu cầu khách hàng', 'Báo giá sản phẩm', 'Xử lý từ chối'],
    correctIndex: 1,
  },
  {
    id: '2',
    lessonId: '3',
    type: 'multiple-choice',
    question: 'Kỹ thuật đặt câu hỏi mở giúp gì trong bán hàng?',
    options: ['Kết thúc cuộc trò chuyện nhanh hơn', 'Khám phá nhu cầu thật sự của khách', 'Tránh né các câu hỏi khó', 'Tiết kiệm thời gian tư vấn'],
    correctIndex: 1,
  },
  {
    id: '3',
    lessonId: '3',
    type: 'drag-drop',
    question: 'Sắp xếp các bước tư vấn khách hàng theo đúng thứ tự:',
    words: ['Lắng nghe', 'Đặt câu hỏi', 'Trình bày giải pháp', 'Xác nhận nhu cầu', 'Chốt deal'],
    correctOrder: [1, 0, 3, 2, 4],
  },
  {
    id: '4',
    lessonId: '3',
    type: 'multiple-choice',
    question: 'Khi khách hàng nói "Tôi cần suy nghĩ thêm", bạn nên làm gì?',
    options: ['Kết thúc cuộc gặp ngay', 'Hỏi thêm để hiểu mối lo ngại', 'Giảm giá ngay lập tức', 'Không liên hệ lại'],
    correctIndex: 1,
  },
  {
    id: '5',
    lessonId: '3',
    type: 'multiple-choice',
    question: 'Tỷ lệ nghe-nói lý tưởng trong cuộc tư vấn bán hàng là?',
    options: ['Nghe 20% - Nói 80%', 'Nghe 50% - Nói 50%', 'Nghe 70% - Nói 30%', 'Nghe 10% - Nói 90%'],
    correctIndex: 2,
  },
];

export const CATEGORIES = ['Tất cả', 'Bán hàng', 'Pháp lý', 'Kỹ năng', 'Chuyên môn', 'Marketing'];
