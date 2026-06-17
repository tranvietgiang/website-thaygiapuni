export const contentStorageKey = 'aboutUni.content.toeic.v6'

const heroImage = '/assets/toeic-hero.png'

const galleries = {
  vi: [
    {
      title: 'Buổi học TOEIC',
      description: 'Không khí lớp học, hoạt động sửa bài và luyện đề.',
      images: [
        '/assets/images/buoi-hoc/buoihoc-2.jpg',
        '/assets/images/buoi-hoc/buoihoc-3.jpg',
        '/assets/images/buoi-hoc/buoihoc-4.jpg',
        '/assets/images/buoi-hoc/buoihoc-5.jpg',
        '/assets/images/buoi-hoc/buoihoc-6.jpg',
        '/assets/images/buoi-hoc/buoihoc-7.jpg',
        '/assets/images/buoi-hoc/buoihoc-8.jpg',
        '/assets/images/buoi-hoc/buoihoc-9.jpg',
        '/assets/images/buoi-hoc/buoihoc-10.jpg',
        '/assets/images/buoi-hoc/buoihoc-11.jpg',
        '/assets/images/buoi-hoc/buoihoc-12.jpg',
        '/assets/images/buoi-hoc/buoihoc-13.jpg',
      ],
    },
    {
      title: 'Kết quả học viên',
      description: 'Các cột mốc điểm số sau từng chặng luyện TOEIC.',
      images: [
        '/assets/images/result-sv-aim/sv-5.jpg',
        '/assets/images/result-sv-aim/sv-6.jpg',
        '/assets/images/result-sv-aim/sv-7.jpg',
        '/assets/images/result-sv-aim/sv-8.jpg',
        '/assets/images/result-sv-aim/sv-1.jpg',
        '/assets/images/result-sv-aim/sv-2.jpg',
        '/assets/images/result-sv-aim/sv-3.jpg',
        '/assets/images/result-sv-aim/sv-4.jpg',
      ],
    },
    {
      title: 'Lịch khai giảng và ưu đãi',
      description: 'Thông tin lớp mới, ưu đãi và các hoạt động nổi bật.',
      images: [
        '/assets/images/lichkhaigiang/lkg-2.jpg',
        '/assets/images/lichkhaigiang/lkg-3.jpg',
        '/assets/images/uudai/uu-dai.jpg',
        '/assets/images/uudai/uu-dai-1.jpg',
        '/assets/images/lichkhaigiang/lkg-1.jpg',
        '/assets/images/lichkhaigiang/lkg-4.jpg',
        '/assets/images/uudai/uu-dai-2.jpg',
        '/assets/images/tai-tro/taitro1.jpg',
      ],
    },
  ],
  en: [
    {
      title: 'TOEIC classes',
      description: 'Class activities, correction sessions, and mock-test practice.',
      images: [
        '/assets/images/buoi-hoc/buoihoc-2.jpg',
        '/assets/images/buoi-hoc/buoihoc-3.jpg',
        '/assets/images/buoi-hoc/buoihoc-4.jpg',
        '/assets/images/buoi-hoc/buoihoc-5.jpg',
        '/assets/images/buoi-hoc/buoihoc-6.jpg',
        '/assets/images/buoi-hoc/buoihoc-7.jpg',
        '/assets/images/buoi-hoc/buoihoc-8.jpg',
        '/assets/images/buoi-hoc/buoihoc-9.jpg',
        '/assets/images/buoi-hoc/buoihoc-10.jpg',
        '/assets/images/buoi-hoc/buoihoc-11.jpg',
        '/assets/images/buoi-hoc/buoihoc-12.jpg',
        '/assets/images/buoi-hoc/buoihoc-13.jpg',
      ],
    },
    {
      title: 'Student results',
      description: 'Score milestones after each TOEIC learning stage.',
      images: [
        '/assets/images/result-sv-aim/sv-5.jpg',
        '/assets/images/result-sv-aim/sv-6.jpg',
        '/assets/images/result-sv-aim/sv-7.jpg',
        '/assets/images/result-sv-aim/sv-8.jpg',
        '/assets/images/result-sv-aim/sv-1.jpg',
        '/assets/images/result-sv-aim/sv-2.jpg',
        '/assets/images/result-sv-aim/sv-3.jpg',
        '/assets/images/result-sv-aim/sv-4.jpg',
      ],
    },
    {
      title: 'Opening classes and offers',
      description: 'New classes, promotions, and featured activities.',
      images: [
        '/assets/images/lichkhaigiang/lkg-2.jpg',
        '/assets/images/lichkhaigiang/lkg-3.jpg',
        '/assets/images/uudai/uu-dai.jpg',
        '/assets/images/uudai/uu-dai-1.jpg',
        '/assets/images/lichkhaigiang/lkg-1.jpg',
        '/assets/images/lichkhaigiang/lkg-4.jpg',
        '/assets/images/uudai/uu-dai-2.jpg',
        '/assets/images/tai-tro/taitro1.jpg',
      ],
    },
  ],
}

export const defaultContent = {
  vi: {
    nav: [
      'TOEIC mất gốc',
      'Lộ trình học',
      'Cam kết đầu ra',
      'Giáo viên',
      'Lịch khai giảng',
      'Kiểm tra đầu vào',
    ],
    hero: {
      eyebrow: 'TOEIC cho sinh viên và người đi làm',
      title: 'Mất gốc vẫn học được TOEIC từ đầu',
      description:
        'Lộ trình TOEIC thực chiến cho người bắt đầu lại: củng cố ngữ pháp nền, tăng vốn từ vựng, luyện nghe đọc theo format đề thi và theo sát mục tiêu điểm số.',
      primaryCta: 'Kiểm tra trình độ miễn phí',
      secondaryCta: 'Xem lộ trình TOEIC',
      image: heroImage,
      overlay: '',
      campaign: heroImage,
    },
    stats: [
      { value: '0-450+', label: 'lộ trình lấy lại nền tảng cho người mất gốc' },
      { value: '550+', label: 'mục tiêu phổ biến cho sinh viên ra trường' },
      { value: '650+', label: 'mục tiêu ứng tuyển và xét học bổng nội bộ' },
      { value: '12 tuần', label: 'mỗi chặng học có kiểm tra tiến độ rõ ràng' },
      { value: '1 kèm 1', label: 'hỗ trợ sửa lỗi ngữ pháp và kỹ năng yếu' },
    ],
    statsEyebrow: 'Học từ nền tảng',
    statsTitle: 'TOEIC không cần học vẹt, cần đúng lộ trình',
    programsTitle: 'Lộ trình TOEIC theo mục tiêu',
    programsSubtitle:
      'Mỗi khóa học tập trung vào một nhóm năng lực cụ thể, phù hợp cho sinh viên năm nhất đến người đi làm cần chứng chỉ TOEIC.',
    programs: [
      {
        title: 'TOEIC Foundation',
        description:
          'Dành cho người mất gốc: phát âm cơ bản, từ loại, thì, câu đơn, từ vựng công sở và kỹ năng nghe chậm.',
        image: '/assets/images/buoi-hoc/buoihoc-1.jpg',
        tag: '0 - 450+',
      },
      {
        title: 'TOEIC 550+',
        description:
          'Tăng tốc nghe đọc theo Part 1-7, nắm bẫy đề, quản lý thời gian và luyện đề theo từng cụm kỹ năng.',
        image: '/assets/images/result-sv-aim/sv-1.jpg',
        tag: 'Sinh viên ra trường',
      },
      {
        title: 'TOEIC 650+',
        description:
          'Mở rộng từ vựng học thuật - công sở, xử lý câu phức, tăng tốc scanning và nghe hội thoại dài.',
        image: '/assets/images/buoi-hoc/buoihoc-6.jpg',
        tag: 'Ứng tuyển',
      },
      {
        title: 'TOEIC Intensive',
        description:
          'Luyện đề chuyên sâu, chữa lỗi cá nhân, chiến thuật tối ưu điểm cho học viên cần bứt tốc trong thời gian ngắn.',
        image: '/assets/images/lichkhaigiang/lkg-1.jpg',
        tag: '750+',
      },
    ],
    testimonialsEyebrow: 'Cảm nhận về Uni',
    testimonialsTitle: 'Học viên nói gì sau khi học TOEIC từ mất gốc',
    testimonials: [
      {
        name: 'Ngọc Hân',
        role: 'Sinh viên năm 3',
        quote:
          'Trước đây mình gần như mất gốc ngữ pháp nên rất sợ TOEIC. Uni chia nhỏ lộ trình, học lại từ từ loại và câu cơ bản nên mình theo kịp hơn nhiều.',
        result: 'Từ 280 lên 560',
        image: '/assets/images/result-sv-aim/sv-2.jpg',
      },
      {
        name: 'Minh Khang',
        role: 'Sinh viên chuẩn bị ra trường',
        quote:
          'Mình cần TOEIC để đủ điều kiện tốt nghiệp. Phần luyện nghe theo từng part và chữa lỗi sau mỗi đề giúp mình biết rõ đang yếu ở đâu.',
        result: 'Đạt TOEIC 625',
        image: '/assets/images/result-sv-aim/sv-3.jpg',
      },
      {
        name: 'Thu Trang',
        role: 'Nhân viên văn phòng',
        quote:
          'Đi làm rồi mới học lại tiếng Anh nên thời gian ít. Lịch học gọn, bài tập vừa đủ và giáo viên sửa rất sát lỗi cá nhân.',
        result: 'Tăng 210 điểm',
        image: '/assets/images/result-sv-aim/sv-4.jpg',
      },
    ],
    galleryEyebrow: 'Hình ảnh tại Uni',
    galleryTitle: 'Không khí lớp học, kết quả và ưu đãi mới nhất',
    galleries: galleries.vi,
    teachersEyebrow: 'Đồng hành cùng người học từ con số 0',
    teachersTitle: 'Đội ngũ luyện thi TOEIC thực chiến',
    highlights: [
      'Chẩn đoán lỗi nền tảng trước khi xếp lớp',
      'Có bài tập cá nhân hóa sau mỗi buổi học',
    ],
    teachers: [
      {
        name: 'MINH ANH',
        role: 'TOEIC Foundation Coach',
        school: 'Chuyên dạy người mất gốc ngữ pháp',
        score: 'TOEIC 930',
        image: '/assets/images/teacheruni/kieunhi.jpg',
      },
      {
        name: 'HOÀNG NAM',
        role: 'Listening & Reading Mentor',
        school: '8 năm luyện đề TOEIC cho sinh viên',
        score: 'TOEIC 960',
        image: '/assets/images/teacheruni/kieunhi.jpg',
      },
      {
        name: 'THẢO LINH',
        role: 'Grammar Recovery Mentor',
        school: 'Chuyên sửa lỗi câu và từ loại',
        score: 'TOEIC 945',
        image: '/assets/images/teacheruni/kieunhi.jpg',
      },
      {
        name: 'QUANG HUY',
        role: 'TOEIC Intensive Trainer',
        school: 'Chiến thuật tăng điểm giai đoạn cuối',
        score: 'TOEIC 975',
        image: '/assets/images/teacheruni/kieunhi.jpg',
      },
    ],
    contact: {
      title: 'Đăng ký test đầu vào TOEIC',
      description:
        'Nhận bài test miễn phí và tư vấn lộ trình từ mất gốc đến mục tiêu điểm TOEIC phù hợp với ngành học hoặc công việc.',
      hotline: '028 6285 8080',
      address: 'Lê Văn Việt, quận 9 | Đặng Văn Bi, Thủ Đức | Làng Đại học',
      button: 'Nhận tư vấn',
      mapUrl: '',
    },
    footer: 'TOEIC Academy - Luyện thi TOEIC cho sinh viên và người đi làm từ mất gốc.',
  },
  en: {
    nav: [
      'TOEIC Foundation',
      'Learning Path',
      'Score Goals',
      'Teachers',
      'Opening Classes',
      'Placement Test',
    ],
    hero: {
      eyebrow: 'TOEIC for university students and working adults',
      title: 'Start TOEIC from zero foundation',
      description:
        'A practical TOEIC pathway for learners who need to rebuild grammar, vocabulary, listening, reading, and test strategy from the basics.',
      primaryCta: 'Take free placement test',
      secondaryCta: 'View TOEIC pathway',
      image: heroImage,
      overlay: '',
      campaign: heroImage,
    },
    stats: [
      { value: '0-450+', label: 'foundation pathway for beginners' },
      { value: '550+', label: 'common graduation target for students' },
      { value: '650+', label: 'career-ready score goal' },
      { value: '12 weeks', label: 'clear progress check in every stage' },
      { value: '1:1', label: 'support for grammar and weak skills' },
    ],
    statsEyebrow: 'Start with the basics',
    statsTitle: 'TOEIC needs the right pathway, not memorization',
    programsTitle: 'TOEIC pathways by score goal',
    programsSubtitle:
      'Each course focuses on a clear skill group for university students and working adults who need TOEIC certification.',
    programs: [
      {
        title: 'TOEIC Foundation',
        description:
          'For beginners: pronunciation, parts of speech, tenses, simple sentences, workplace vocabulary, and slow listening.',
        image: '/assets/images/buoi-hoc/buoihoc-1.jpg',
        tag: '0 - 450+',
      },
      {
        title: 'TOEIC 550+',
        description:
          'Build Listening and Reading across Parts 1-7 with trap awareness, timing, and targeted practice.',
        image: '/assets/images/result-sv-aim/sv-1.jpg',
        tag: 'Graduation',
      },
      {
        title: 'TOEIC 650+',
        description:
          'Expand workplace vocabulary, handle complex sentences, improve scanning, and master longer conversations.',
        image: '/assets/images/buoi-hoc/buoihoc-6.jpg',
        tag: 'Career ready',
      },
      {
        title: 'TOEIC Intensive',
        description:
          'Mock tests, personal error correction, and final-stage score optimization for short timelines.',
        image: '/assets/images/lichkhaigiang/lkg-1.jpg',
        tag: '750+',
      },
    ],
    testimonialsEyebrow: 'Student feedback',
    testimonialsTitle: 'What learners say after rebuilding TOEIC from zero',
    testimonials: [
      {
        name: 'Ngoc Han',
        role: 'Third-year student',
        quote:
          'I was afraid of TOEIC because my grammar foundation was weak. Uni broke the pathway down clearly, so I could follow from the basics.',
        result: '280 to 560',
        image: '/assets/images/result-sv-aim/sv-2.jpg',
      },
      {
        name: 'Minh Khang',
        role: 'Graduating student',
        quote:
          'I needed TOEIC for graduation. Part-by-part listening practice and mock-test correction showed me exactly what to fix.',
        result: 'TOEIC 625',
        image: '/assets/images/result-sv-aim/sv-3.jpg',
      },
      {
        name: 'Thu Trang',
        role: 'Office worker',
        quote:
          'I study after work, so I need something practical. The schedule is compact and teachers correct my personal mistakes carefully.',
        result: '+210 points',
        image: '/assets/images/result-sv-aim/sv-4.jpg',
      },
    ],
    galleryEyebrow: 'Uni gallery',
    galleryTitle: 'Class moments, student results, and latest offers',
    galleries: galleries.en,
    teachersEyebrow: 'Supporting learners from zero',
    teachersTitle: 'Practical TOEIC training team',
    highlights: [
      'Foundation diagnosis before class placement',
      'Personalized homework after every session',
    ],
    teachers: [
      {
        name: 'MINH ANH',
        role: 'TOEIC Foundation Coach',
        school: 'Grammar recovery specialist',
        score: 'TOEIC 930',
        image: '/assets/images/teacheruni/kieunhi.jpg',
      },
      {
        name: 'HOANG NAM',
        role: 'Listening & Reading Mentor',
        school: '8 years training university students',
        score: 'TOEIC 960',
        image: '/assets/images/teacheruni/kieunhi.jpg',
      },
      {
        name: 'THAO LINH',
        role: 'Grammar Recovery Mentor',
        school: 'Sentence and word-form correction',
        score: 'TOEIC 945',
        image: '/assets/images/teacheruni/kieunhi.jpg',
      },
      {
        name: 'QUANG HUY',
        role: 'TOEIC Intensive Trainer',
        school: 'Final-stage score strategy',
        score: 'TOEIC 975',
        image: '/assets/images/teacheruni/kieunhi.jpg',
      },
    ],
    contact: {
      title: 'Register for a TOEIC placement test',
      description:
        'Get a free test and a pathway recommendation from zero foundation to your TOEIC score goal.',
      hotline: '028 6285 8080',
      address: 'Le Van Viet, District 9 | Dang Van Bi, Thu Duc | University Village',
      button: 'Get consultation',
      mapUrl: '',
    },
    footer: 'TOEIC Academy - TOEIC training for university students and working adults from zero foundation.',
  },
}

export function loadContent() {
  try {
    const saved = localStorage.getItem(contentStorageKey)
    return saved ? { ...defaultContent, ...JSON.parse(saved) } : defaultContent
  } catch {
    return defaultContent
  }
}

export function saveContent(nextContent) {
  localStorage.setItem(contentStorageKey, JSON.stringify(nextContent))
}
