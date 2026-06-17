USE `about_uni`;
SET NAMES utf8mb4;

SET FOREIGN_KEY_CHECKS = 0;
DELETE FROM site_gallery_images WHERE gallery_id IN (SELECT id FROM site_galleries WHERE lang IN ('vi', 'en'));
DELETE FROM site_galleries WHERE lang IN ('vi', 'en');
DELETE FROM site_testimonials WHERE lang IN ('vi', 'en');
DELETE FROM site_teacher_highlights WHERE lang IN ('vi', 'en');
DELETE FROM site_teachers WHERE lang IN ('vi', 'en');
DELETE FROM site_programs WHERE lang IN ('vi', 'en');
DELETE FROM site_stats WHERE lang IN ('vi', 'en');
DELETE FROM site_nav WHERE lang IN ('vi', 'en');
DELETE FROM site_contact_footer WHERE lang IN ('vi', 'en');
DELETE FROM site_content_meta WHERE lang IN ('vi', 'en');
DELETE FROM site_hero WHERE lang IN ('vi', 'en');
SET FOREIGN_KEY_CHECKS = 1;

INSERT INTO site_hero
    (lang, eyebrow, title, description, primary_cta, secondary_cta, image_url, campaign_url)
VALUES
    ('vi', 'TOEIC cho sinh viên và người đi làm', 'Mất gốc vẫn học được TOEIC từ đầu', 'Lộ trình TOEIC thực chiến cho người bắt đầu lại: củng cố ngữ pháp nền, tăng vốn từ vựng, luyện nghe đọc theo format đề thi và theo sát mục tiêu điểm số.', 'Kiểm tra trình độ miễn phí', 'Xem lộ trình TOEIC', '/assets/toeic-hero.png', '/assets/toeic-hero.png'),
    ('en', 'TOEIC for university students and working adults', 'Start TOEIC from zero foundation', 'A practical TOEIC pathway for learners who need to rebuild grammar, vocabulary, listening, reading, and test strategy from the basics.', 'Take free placement test', 'View TOEIC pathway', '/assets/toeic-hero.png', '/assets/toeic-hero.png');

INSERT INTO site_content_meta
    (lang, stats_eyebrow, stats_title, programs_title, programs_subtitle, testimonials_eyebrow, testimonials_title, gallery_eyebrow, gallery_title, teachers_eyebrow, teachers_title)
VALUES
    ('vi', 'Học từ nền tảng', 'TOEIC không cần học vẹt, cần đúng lộ trình', 'Lộ trình TOEIC theo mục tiêu', 'Mỗi khóa học tập trung vào một nhóm năng lực cụ thể, phù hợp cho sinh viên năm nhất đến người đi làm cần chứng chỉ TOEIC.', 'Cảm nhận về Uni', 'Học viên nói gì sau khi học TOEIC từ mất gốc', 'Hình ảnh tại Uni', 'Không khí lớp học, kết quả và ưu đãi mới nhất', 'Đồng hành cùng người học từ con số 0', 'Đội ngũ luyện thi TOEIC thực chiến'),
    ('en', 'Start with the basics', 'TOEIC needs the right pathway, not memorization', 'TOEIC pathways by score goal', 'Each course focuses on a clear skill group for university students and working adults who need TOEIC certification.', 'Student feedback', 'What learners say after rebuilding TOEIC from zero', 'Uni gallery', 'Class moments, student results, and latest offers', 'Supporting learners from zero', 'Practical TOEIC training team');

INSERT INTO site_nav (lang, label, sort_order) VALUES
    ('vi', 'TOEIC mất gốc', 0),
    ('vi', 'Lộ trình học', 1),
    ('vi', 'Cam kết đầu ra', 2),
    ('vi', 'Giáo viên', 3),
    ('vi', 'Lịch khai giảng', 4),
    ('vi', 'Kiểm tra đầu vào', 5),
    ('en', 'TOEIC Foundation', 0),
    ('en', 'Learning Path', 1),
    ('en', 'Score Goals', 2),
    ('en', 'Teachers', 3),
    ('en', 'Opening Classes', 4),
    ('en', 'Placement Test', 5);

INSERT INTO site_stats (lang, section_eyebrow, section_title, stat_value, stat_label, sort_order) VALUES
    ('vi', 'Học từ nền tảng', 'TOEIC không cần học vẹt, cần đúng lộ trình', '0-450+', 'lộ trình lấy lại nền tảng cho người mất gốc', 0),
    ('vi', 'Học từ nền tảng', 'TOEIC không cần học vẹt, cần đúng lộ trình', '550+', 'mục tiêu phổ biến cho sinh viên ra trường', 1),
    ('vi', 'Học từ nền tảng', 'TOEIC không cần học vẹt, cần đúng lộ trình', '650+', 'mục tiêu ứng tuyển và xét học bổng nội bộ', 2),
    ('vi', 'Học từ nền tảng', 'TOEIC không cần học vẹt, cần đúng lộ trình', '12 tuần', 'mỗi chặng học có kiểm tra tiến độ rõ ràng', 3),
    ('vi', 'Học từ nền tảng', 'TOEIC không cần học vẹt, cần đúng lộ trình', '1 kèm 1', 'hỗ trợ sửa lỗi ngữ pháp và kỹ năng yếu', 4),
    ('en', 'Start with the basics', 'TOEIC needs the right pathway, not memorization', '0-450+', 'foundation pathway for beginners', 0),
    ('en', 'Start with the basics', 'TOEIC needs the right pathway, not memorization', '550+', 'common graduation target for students', 1),
    ('en', 'Start with the basics', 'TOEIC needs the right pathway, not memorization', '650+', 'career-ready score goal', 2),
    ('en', 'Start with the basics', 'TOEIC needs the right pathway, not memorization', '12 weeks', 'clear progress check in every stage', 3),
    ('en', 'Start with the basics', 'TOEIC needs the right pathway, not memorization', '1:1', 'support for grammar and weak skills', 4);

INSERT INTO site_programs
    (lang, section_title, section_description, program_name, program_description, tag, image_url, sort_order)
VALUES
    ('vi', 'Lộ trình TOEIC theo mục tiêu', 'Mỗi khóa học tập trung vào một nhóm năng lực cụ thể, phù hợp cho sinh viên năm nhất đến người đi làm cần chứng chỉ TOEIC.', 'TOEIC Foundation', 'Dành cho người mất gốc: phát âm cơ bản, từ loại, thì, câu đơn, từ vựng công sở và kỹ năng nghe chậm.', '0 - 450+', '/assets/images/buoi-hoc/buoihoc-1.jpg', 0),
    ('vi', 'Lộ trình TOEIC theo mục tiêu', 'Mỗi khóa học tập trung vào một nhóm năng lực cụ thể, phù hợp cho sinh viên năm nhất đến người đi làm cần chứng chỉ TOEIC.', 'TOEIC 550+', 'Tăng tốc nghe đọc theo Part 1-7, nắm bẫy đề, quản lý thời gian và luyện đề theo từng cụm kỹ năng.', 'Sinh viên ra trường', '/assets/images/result-sv-aim/sv-1.jpg', 1),
    ('vi', 'Lộ trình TOEIC theo mục tiêu', 'Mỗi khóa học tập trung vào một nhóm năng lực cụ thể, phù hợp cho sinh viên năm nhất đến người đi làm cần chứng chỉ TOEIC.', 'TOEIC 650+', 'Mở rộng từ vựng học thuật - công sở, xử lý câu phức, tăng tốc scanning và nghe hội thoại dài.', 'Ứng tuyển', '/assets/images/buoi-hoc/buoihoc-6.jpg', 2),
    ('vi', 'Lộ trình TOEIC theo mục tiêu', 'Mỗi khóa học tập trung vào một nhóm năng lực cụ thể, phù hợp cho sinh viên năm nhất đến người đi làm cần chứng chỉ TOEIC.', 'TOEIC Intensive', 'Luyện đề chuyên sâu, chữa lỗi cá nhân, chiến thuật tối ưu điểm cho học viên cần bứt tốc trong thời gian ngắn.', '750+', '/assets/images/lichkhaigiang/lkg-1.jpg', 3),
    ('en', 'TOEIC pathways by score goal', 'Each course focuses on a clear skill group for university students and working adults who need TOEIC certification.', 'TOEIC Foundation', 'For beginners: pronunciation, parts of speech, tenses, simple sentences, workplace vocabulary, and slow listening.', '0 - 450+', '/assets/images/buoi-hoc/buoihoc-1.jpg', 0),
    ('en', 'TOEIC pathways by score goal', 'Each course focuses on a clear skill group for university students and working adults who need TOEIC certification.', 'TOEIC 550+', 'Build Listening and Reading across Parts 1-7 with trap awareness, timing, and targeted practice.', 'Graduation', '/assets/images/result-sv-aim/sv-1.jpg', 1),
    ('en', 'TOEIC pathways by score goal', 'Each course focuses on a clear skill group for university students and working adults who need TOEIC certification.', 'TOEIC 650+', 'Expand workplace vocabulary, handle complex sentences, improve scanning, and master longer conversations.', 'Career ready', '/assets/images/buoi-hoc/buoihoc-6.jpg', 2),
    ('en', 'TOEIC pathways by score goal', 'Each course focuses on a clear skill group for university students and working adults who need TOEIC certification.', 'TOEIC Intensive', 'Mock tests, personal error correction, and final-stage score optimization for short timelines.', '750+', '/assets/images/lichkhaigiang/lkg-1.jpg', 3);

INSERT INTO site_teacher_highlights (lang, text_value, sort_order) VALUES
    ('vi', 'Chẩn đoán lỗi nền tảng trước khi xếp lớp', 0),
    ('vi', 'Có bài tập cá nhân hóa sau mỗi buổi học', 1),
    ('en', 'Foundation diagnosis before class placement', 0),
    ('en', 'Personalized homework after every session', 1);

INSERT INTO site_teachers
    (lang, section_eyebrow, section_title, teacher_name, role, school, score, image_url, sort_order)
VALUES
    ('vi', 'Đồng hành cùng người học từ con số 0', 'Đội ngũ luyện thi TOEIC thực chiến', 'MINH ANH', 'TOEIC Foundation Coach', 'Chuyên dạy người mất gốc ngữ pháp', 'TOEIC 930', '/assets/images/teacheruni/kieunhi.jpg', 0),
    ('vi', 'Đồng hành cùng người học từ con số 0', 'Đội ngũ luyện thi TOEIC thực chiến', 'HOÀNG NAM', 'Listening & Reading Mentor', '8 năm luyện đề TOEIC cho sinh viên', 'TOEIC 960', '/assets/images/teacheruni/kieunhi.jpg', 1),
    ('vi', 'Đồng hành cùng người học từ con số 0', 'Đội ngũ luyện thi TOEIC thực chiến', 'THẢO LINH', 'Grammar Recovery Mentor', 'Chuyên sửa lỗi câu và từ loại', 'TOEIC 945', '/assets/images/teacheruni/kieunhi.jpg', 2),
    ('vi', 'Đồng hành cùng người học từ con số 0', 'Đội ngũ luyện thi TOEIC thực chiến', 'QUANG HUY', 'TOEIC Intensive Trainer', 'Chiến thuật tăng điểm giai đoạn cuối', 'TOEIC 975', '/assets/images/teacheruni/kieunhi.jpg', 3),
    ('en', 'Supporting learners from zero', 'Practical TOEIC training team', 'MINH ANH', 'TOEIC Foundation Coach', 'Grammar recovery specialist', 'TOEIC 930', '/assets/images/teacheruni/kieunhi.jpg', 0),
    ('en', 'Supporting learners from zero', 'Practical TOEIC training team', 'HOANG NAM', 'Listening & Reading Mentor', '8 years training university students', 'TOEIC 960', '/assets/images/teacheruni/kieunhi.jpg', 1),
    ('en', 'Supporting learners from zero', 'Practical TOEIC training team', 'THAO LINH', 'Grammar Recovery Mentor', 'Sentence and word-form correction', 'TOEIC 945', '/assets/images/teacheruni/kieunhi.jpg', 2),
    ('en', 'Supporting learners from zero', 'Practical TOEIC training team', 'QUANG HUY', 'TOEIC Intensive Trainer', 'Final-stage score strategy', 'TOEIC 975', '/assets/images/teacheruni/kieunhi.jpg', 3);

INSERT INTO site_testimonials
    (lang, name, role, quote_text, result, image_url, sort_order)
VALUES
    ('vi', 'Ngọc Hân', 'Sinh viên năm 3', 'Trước đây mình gần như mất gốc ngữ pháp nên rất sợ TOEIC. Uni chia nhỏ lộ trình, học lại từ từ loại và câu cơ bản nên mình theo kịp hơn nhiều.', 'Từ 280 lên 560', '/assets/images/result-sv-aim/sv-2.jpg', 0),
    ('vi', 'Minh Khang', 'Sinh viên chuẩn bị ra trường', 'Mình cần TOEIC để đủ điều kiện tốt nghiệp. Phần luyện nghe theo từng part và chữa lỗi sau mỗi đề giúp mình biết rõ đang yếu ở đâu.', 'Đạt TOEIC 625', '/assets/images/result-sv-aim/sv-3.jpg', 1),
    ('vi', 'Thu Trang', 'Nhân viên văn phòng', 'Đi làm rồi mới học lại tiếng Anh nên thời gian ít. Lịch học gọn, bài tập vừa đủ và giáo viên sửa rất sát lỗi cá nhân.', 'Tăng 210 điểm', '/assets/images/result-sv-aim/sv-4.jpg', 2),
    ('en', 'Ngoc Han', 'Third-year student', 'I was afraid of TOEIC because my grammar foundation was weak. Uni broke the pathway down clearly, so I could follow from the basics.', '280 to 560', '/assets/images/result-sv-aim/sv-2.jpg', 0),
    ('en', 'Minh Khang', 'Graduating student', 'I needed TOEIC for graduation. Part-by-part listening practice and mock-test correction showed me exactly what to fix.', 'TOEIC 625', '/assets/images/result-sv-aim/sv-3.jpg', 1),
    ('en', 'Thu Trang', 'Office worker', 'I study after work, so I need something practical. The schedule is compact and teachers correct my personal mistakes carefully.', '+210 points', '/assets/images/result-sv-aim/sv-4.jpg', 2);

INSERT INTO site_galleries (id, lang, title, description, sort_order) VALUES
    (1001, 'vi', 'Buổi học TOEIC', 'Không khí lớp học, hoạt động sửa bài và luyện đề.', 0),
    (1002, 'vi', 'Kết quả học viên', 'Các cột mốc điểm số sau từng chặng luyện TOEIC.', 1),
    (1003, 'vi', 'Lịch khai giảng và ưu đãi', 'Thông tin lớp mới, ưu đãi và các hoạt động nổi bật.', 2),
    (2001, 'en', 'TOEIC classes', 'Class activities, correction sessions, and mock-test practice.', 0),
    (2002, 'en', 'Student results', 'Score milestones after each TOEIC learning stage.', 1),
    (2003, 'en', 'Opening classes and offers', 'New classes, promotions, and featured activities.', 2);

INSERT INTO site_gallery_images (gallery_id, image_url, sort_order) VALUES
    (1001, '/assets/images/buoi-hoc/buoihoc-2.jpg', 0),
    (1001, '/assets/images/buoi-hoc/buoihoc-3.jpg', 1),
    (1001, '/assets/images/buoi-hoc/buoihoc-4.jpg', 2),
    (1001, '/assets/images/buoi-hoc/buoihoc-5.jpg', 3),
    (1001, '/assets/images/buoi-hoc/buoihoc-6.jpg', 4),
    (1001, '/assets/images/buoi-hoc/buoihoc-7.jpg', 5),
    (1001, '/assets/images/buoi-hoc/buoihoc-8.jpg', 6),
    (1001, '/assets/images/buoi-hoc/buoihoc-9.jpg', 7),
    (1001, '/assets/images/buoi-hoc/buoihoc-10.jpg', 8),
    (1001, '/assets/images/buoi-hoc/buoihoc-11.jpg', 9),
    (1001, '/assets/images/buoi-hoc/buoihoc-12.jpg', 10),
    (1001, '/assets/images/buoi-hoc/buoihoc-13.jpg', 11),
    (1002, '/assets/images/result-sv-aim/sv-5.jpg', 0),
    (1002, '/assets/images/result-sv-aim/sv-6.jpg', 1),
    (1002, '/assets/images/result-sv-aim/sv-7.jpg', 2),
    (1002, '/assets/images/result-sv-aim/sv-8.jpg', 3),
    (1002, '/assets/images/result-sv-aim/sv-1.jpg', 4),
    (1002, '/assets/images/result-sv-aim/sv-2.jpg', 5),
    (1002, '/assets/images/result-sv-aim/sv-3.jpg', 6),
    (1002, '/assets/images/result-sv-aim/sv-4.jpg', 7),
    (1003, '/assets/images/lichkhaigiang/lkg-2.jpg', 0),
    (1003, '/assets/images/lichkhaigiang/lkg-3.jpg', 1),
    (1003, '/assets/images/uudai/uu-dai.jpg', 2),
    (1003, '/assets/images/uudai/uu-dai-1.jpg', 3),
    (1003, '/assets/images/lichkhaigiang/lkg-1.jpg', 4),
    (1003, '/assets/images/lichkhaigiang/lkg-4.jpg', 5),
    (1003, '/assets/images/uudai/uu-dai-2.jpg', 6),
    (1003, '/assets/images/tai-tro/taitro1.jpg', 7),
    (2001, '/assets/images/buoi-hoc/buoihoc-2.jpg', 0),
    (2001, '/assets/images/buoi-hoc/buoihoc-3.jpg', 1),
    (2001, '/assets/images/buoi-hoc/buoihoc-4.jpg', 2),
    (2001, '/assets/images/buoi-hoc/buoihoc-5.jpg', 3),
    (2001, '/assets/images/buoi-hoc/buoihoc-6.jpg', 4),
    (2001, '/assets/images/buoi-hoc/buoihoc-7.jpg', 5),
    (2001, '/assets/images/buoi-hoc/buoihoc-8.jpg', 6),
    (2001, '/assets/images/buoi-hoc/buoihoc-9.jpg', 7),
    (2001, '/assets/images/buoi-hoc/buoihoc-10.jpg', 8),
    (2001, '/assets/images/buoi-hoc/buoihoc-11.jpg', 9),
    (2001, '/assets/images/buoi-hoc/buoihoc-12.jpg', 10),
    (2001, '/assets/images/buoi-hoc/buoihoc-13.jpg', 11),
    (2002, '/assets/images/result-sv-aim/sv-5.jpg', 0),
    (2002, '/assets/images/result-sv-aim/sv-6.jpg', 1),
    (2002, '/assets/images/result-sv-aim/sv-7.jpg', 2),
    (2002, '/assets/images/result-sv-aim/sv-8.jpg', 3),
    (2002, '/assets/images/result-sv-aim/sv-1.jpg', 4),
    (2002, '/assets/images/result-sv-aim/sv-2.jpg', 5),
    (2002, '/assets/images/result-sv-aim/sv-3.jpg', 6),
    (2002, '/assets/images/result-sv-aim/sv-4.jpg', 7),
    (2003, '/assets/images/lichkhaigiang/lkg-2.jpg', 0),
    (2003, '/assets/images/lichkhaigiang/lkg-3.jpg', 1),
    (2003, '/assets/images/uudai/uu-dai.jpg', 2),
    (2003, '/assets/images/uudai/uu-dai-1.jpg', 3),
    (2003, '/assets/images/lichkhaigiang/lkg-1.jpg', 4),
    (2003, '/assets/images/lichkhaigiang/lkg-4.jpg', 5),
    (2003, '/assets/images/uudai/uu-dai-2.jpg', 6),
    (2003, '/assets/images/tai-tro/taitro1.jpg', 7);

INSERT INTO site_contact_footer
    (lang, form_title, hotline, address, form_description, button_text, map_url, footer_text)
VALUES
    ('vi', 'Đăng ký test đầu vào TOEIC', '028 6285 8080', 'Lê Văn Việt, quận 9 | Đặng Văn Bi, Thủ Đức | Làng Đại học', 'Nhận bài test miễn phí và tư vấn lộ trình từ mất gốc đến mục tiêu điểm TOEIC phù hợp với ngành học hoặc công việc.', 'Nhận tư vấn', '', 'TOEIC Academy - Luyện thi TOEIC cho sinh viên và người đi làm từ mất gốc.'),
    ('en', 'Register for a TOEIC placement test', '028 6285 8080', 'Le Van Viet, District 9 | Dang Van Bi, Thu Duc | University Village', 'Get a free test and a pathway recommendation from zero foundation to your TOEIC score goal.', 'Get consultation', '', 'TOEIC Academy - TOEIC training for university students and working adults from zero foundation.');
