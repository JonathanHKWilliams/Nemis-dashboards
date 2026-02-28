// ─── Student Profile ──────────────────────────────────────────────────────────
export const studentProfile = {
  name:           'Daniel K. Freeman',
  id:             'STU-2026-1045',
  grade:          'Grade 9A',
  school:         'St. Peter High School',
  gender:         'men',
  photoId:        65,
  homeroomTeacher:'Mrs. Jane Doe',
  parentContact:  '+231 770 123 456',
  email:          'd.freeman@stpeter.nemis.edu.lr',
  dateOfBirth:    'March 12, 2010',
  address:        'Monrovia, Montserrado County',
}

// ─── School Information ───────────────────────────────────────────────────────
export const schoolInfo = {
  name:             'St. Peter High School',
  district:         'Montserrado Central',
  code:             'NEMIS-MON-2045',
  principal:        'Mr. Samuel Johnson',
  principalGender:  'men',
  principalPhotoId: 36,
  academicYear:     '2025–2026',
  address:          '12 Broad Street, Monrovia',
  phone:            '+231 770 500 100',
  email:            'info@stpeter.nemis.edu.lr',
  established:      1965,
  type:             'Secondary',
  totalStudents:    1240,
  totalTeachers:    52,
  totalClasses:     28,
}

// ─── Subjects ─────────────────────────────────────────────────────────────────
export const subjects = [
  { id: 1, name: 'Mathematics', teacher: 'Mr. David Mensah',    classroom: 'Room 12A', periods: 5, teacherGender: 'men',   teacherPhotoId: 6,  color: '#2563EB', bg: 'rgba(37,99,235,0.08)' },
  { id: 2, name: 'English',     teacher: 'Mrs. Jane Doe',       classroom: 'Room 8B',  periods: 5, teacherGender: 'women', teacherPhotoId: 2,  color: '#7C3AED', bg: 'rgba(124,58,237,0.08)' },
  { id: 3, name: 'Biology',     teacher: 'Mr. Peter K. Smith',  classroom: 'Lab 2',    periods: 4, teacherGender: 'men',   teacherPhotoId: 15, color: '#16A34A', bg: 'rgba(22,163,74,0.08)' },
  { id: 4, name: 'History',     teacher: 'Mrs. Linda Cooper',   classroom: 'Room 5C',  periods: 3, teacherGender: 'women', teacherPhotoId: 22, color: '#D97706', bg: 'rgba(217,119,6,0.08)' },
  { id: 5, name: 'ICT',         teacher: 'Mr. Samuel Brown',    classroom: 'ICT Lab',  periods: 3, teacherGender: 'men',   teacherPhotoId: 29, color: '#0891B2', bg: 'rgba(8,145,178,0.08)' },
  { id: 6, name: 'Physics',     teacher: 'Mr. George Kollie',   classroom: 'Lab 1',    periods: 4, teacherGender: 'men',   teacherPhotoId: 42, color: '#A60003', bg: 'rgba(166,0,3,0.07)' },
]

// ─── Weekly Schedule ──────────────────────────────────────────────────────────
export const schedule = [
  { time: '8:00 – 8:55',   mon: 'Mathematics', tue: 'English',     wed: 'Biology',     thu: 'ICT',         fri: 'History'     },
  { time: '9:00 – 9:55',   mon: 'History',     tue: 'Mathematics', wed: 'English',     thu: 'Biology',     fri: 'ICT'         },
  { time: '10:00 – 10:20', mon: 'Break',        tue: 'Break',       wed: 'Break',       thu: 'Break',       fri: 'Break',       isBreak: true },
  { time: '10:20 – 11:15', mon: 'English',      tue: 'Biology',     wed: 'ICT',         thu: 'History',     fri: 'Mathematics' },
  { time: '11:20 – 12:15', mon: 'Physics',      tue: 'ICT',         wed: 'Physics',     thu: 'Mathematics', fri: 'Biology'     },
  { time: '12:15 – 1:00',  mon: 'Lunch',        tue: 'Lunch',       wed: 'Lunch',       thu: 'Lunch',       fri: 'Lunch',       isLunch: true },
  { time: '1:00 – 1:55',   mon: 'ICT',          tue: 'History',     wed: 'Mathematics', thu: 'English',     fri: 'Physics'     },
  { time: '2:00 – 2:55',   mon: 'Biology',      tue: 'Physics',     wed: 'History',     thu: 'Physics',     fri: 'English'     },
]

// ─── Grades ───────────────────────────────────────────────────────────────────
export const grades = [
  { subject: 'Mathematics', teacher: 'Mr. David Mensah',   assignmentScore: 85, examScore: 78, grade: 'B+', letter: 'B' },
  { subject: 'English',     teacher: 'Mrs. Jane Doe',      assignmentScore: 90, examScore: 88, grade: 'A',  letter: 'A' },
  { subject: 'Biology',     teacher: 'Mr. Peter K. Smith', assignmentScore: 72, examScore: 68, grade: 'C+', letter: 'C' },
  { subject: 'History',     teacher: 'Mrs. Linda Cooper',  assignmentScore: 88, examScore: 82, grade: 'B+', letter: 'B' },
  { subject: 'ICT',         teacher: 'Mr. Samuel Brown',   assignmentScore: 95, examScore: 91, grade: 'A',  letter: 'A' },
  { subject: 'Physics',     teacher: 'Mr. George Kollie',  assignmentScore: 65, examScore: 60, grade: 'C',  letter: 'C' },
]

// ─── Attendance ───────────────────────────────────────────────────────────────
export const attendance = [
  { date: 'Feb 3, 2026',  day: 'Monday',    status: 'Present', note: '' },
  { date: 'Feb 4, 2026',  day: 'Tuesday',   status: 'Present', note: '' },
  { date: 'Feb 5, 2026',  day: 'Wednesday', status: 'Absent',  note: 'Sick' },
  { date: 'Feb 6, 2026',  day: 'Thursday',  status: 'Present', note: '' },
  { date: 'Feb 7, 2026',  day: 'Friday',    status: 'Present', note: '' },
  { date: 'Feb 10, 2026', day: 'Monday',    status: 'Present', note: '' },
  { date: 'Feb 11, 2026', day: 'Tuesday',   status: 'Late',    note: 'Transport delay' },
  { date: 'Feb 12, 2026', day: 'Wednesday', status: 'Present', note: '' },
  { date: 'Feb 13, 2026', day: 'Thursday',  status: 'Present', note: '' },
  { date: 'Feb 14, 2026', day: 'Friday',    status: 'Absent',  note: 'Family emergency' },
  { date: 'Feb 17, 2026', day: 'Monday',    status: 'Present', note: '' },
  { date: 'Feb 18, 2026', day: 'Tuesday',   status: 'Present', note: '' },
  { date: 'Feb 19, 2026', day: 'Wednesday', status: 'Present', note: '' },
  { date: 'Feb 20, 2026', day: 'Thursday',  status: 'Present', note: '' },
  { date: 'Feb 21, 2026', day: 'Friday',    status: 'Present', note: '' },
  { date: 'Feb 24, 2026', day: 'Monday',    status: 'Present', note: '' },
  { date: 'Feb 25, 2026', day: 'Tuesday',   status: 'Present', note: '' },
]

// ─── Assignments ──────────────────────────────────────────────────────────────
export const assignments = [
  { id: 1, subject: 'English',     title: 'Essay on Climate Change',         due: 'Feb 28, 2026', status: 'Pending',   teacher: 'Mrs. Jane Doe' },
  { id: 2, subject: 'Biology',     title: 'Lab Report – Cell Structure',     due: 'Feb 20, 2026', status: 'Submitted', teacher: 'Mr. Peter K. Smith' },
  { id: 3, subject: 'Mathematics', title: 'Problem Set 7',                   due: 'Feb 22, 2026', status: 'Graded',    teacher: 'Mr. David Mensah' },
  { id: 4, subject: 'History',     title: 'Research: Civil Rights Movement', due: 'Mar 3, 2026',  status: 'Pending',   teacher: 'Mrs. Linda Cooper' },
  { id: 5, subject: 'ICT',         title: 'Web Design Project',              due: 'Mar 10, 2026', status: 'Pending',   teacher: 'Mr. Samuel Brown' },
  { id: 6, subject: 'Physics',     title: "Newton's Laws Worksheet",         due: 'Feb 18, 2026', status: 'Graded',    teacher: 'Mr. George Kollie' },
]

// ─── Resources ────────────────────────────────────────────────────────────────
export const resources = [
  { id: 1, title: 'Mathematics Textbook Grade 9', subject: 'Mathematics', type: 'E-book',         uploadedBy: 'Mr. David Mensah',   category: 'ebook' },
  { id: 2, title: 'English Grammar Notes',         subject: 'English',     type: 'Lecture Notes',  uploadedBy: 'Mrs. Jane Doe',      category: 'notes' },
  { id: 3, title: 'Biology Cell Division Video',   subject: 'Biology',     type: 'Video Lesson',   uploadedBy: 'Mr. Peter K. Smith', category: 'video' },
  { id: 4, title: 'History Past Questions 2024',   subject: 'History',     type: 'Past Questions', uploadedBy: 'Mrs. Linda Cooper',  category: 'past' },
  { id: 5, title: 'ICT Practice Files',            subject: 'ICT',         type: 'Download',       uploadedBy: 'Mr. Samuel Brown',   category: 'download' },
  { id: 6, title: 'Physics Formula Sheet',         subject: 'Physics',     type: 'Lecture Notes',  uploadedBy: 'Mr. George Kollie',  category: 'notes' },
  { id: 7, title: 'English Literature Anthology',  subject: 'English',     type: 'E-book',         uploadedBy: 'Mrs. Jane Doe',      category: 'ebook' },
  { id: 8, title: 'Biology Exam Past Questions',   subject: 'Biology',     type: 'Past Questions', uploadedBy: 'Mr. Peter K. Smith', category: 'past' },
]

// ─── Messages ─────────────────────────────────────────────────────────────────
export const studentMessages = [
  {
    id: 1, sender: 'Mrs. Jane Doe', role: 'English Teacher', gender: 'women', photoId: 2,
    lastMessage: 'Please remember to submit your essay by Friday.',
    time: '10:32 AM', unread: 2,
    thread: [
      { from: 'Mrs. Jane Doe', text: 'Hi Daniel, just a reminder that your essay on Climate Change is due this Friday.', time: 'Feb 24, 10:00 AM', isMe: false },
      { from: 'Daniel', text: 'Thank you Mrs. Doe. I am almost done with it.', time: 'Feb 24, 10:25 AM', isMe: true },
      { from: 'Mrs. Jane Doe', text: 'Please remember to submit your essay by Friday.', time: 'Feb 24, 10:32 AM', isMe: false },
    ],
  },
  {
    id: 2, sender: 'Mr. David Mensah', role: 'Mathematics Teacher', gender: 'men', photoId: 6,
    lastMessage: 'Your Problem Set 7 has been graded. Check your grade.',
    time: '9:15 AM', unread: 1,
    thread: [
      { from: 'Mr. David Mensah', text: 'Daniel, your Problem Set 7 has been graded. You scored 85/100. Keep up the good work!', time: 'Feb 23, 9:15 AM', isMe: false },
    ],
  },
  {
    id: 3, sender: 'School Admin', role: 'Administration', gender: 'men', photoId: 20,
    lastMessage: 'Mid-Term Exams will begin on March 5. Please be prepared.',
    time: 'Feb 20', unread: 0,
    thread: [
      { from: 'School Admin', text: 'Dear Students, Mid-Term Examinations will begin on March 5, 2026. Timetables will be shared by your class teachers. Please prepare accordingly.', time: 'Feb 20, 8:00 AM', isMe: false },
      { from: 'Daniel', text: 'Thank you for the notice.', time: 'Feb 20, 11:30 AM', isMe: true },
    ],
  },
  {
    id: 4, sender: 'Mr. Samuel Johnson', role: 'Principal', gender: 'men', photoId: 36,
    lastMessage: 'Well done on your recent test scores, Daniel.',
    time: 'Feb 18', unread: 0,
    thread: [
      { from: 'Mr. Samuel Johnson', text: 'Daniel, congratulations on your excellent performance in the recent assessments. Keep it up!', time: 'Feb 18, 2:00 PM', isMe: false },
    ],
  },
]

// ─── Notifications ────────────────────────────────────────────────────────────
export const studentNotifications = [
  { id: 1, type: 'grade',    title: 'Assignment Graded',        message: 'Your Mathematics Problem Set 7 has been graded. Score: 85/100', time: '2 hours ago', read: false },
  { id: 2, type: 'alert',    title: 'Mid-Term Exams',           message: 'Mid-Term Examinations begin March 5. Check the timetable.',     time: '1 day ago',  read: false },
  { id: 3, type: 'info',     title: 'Attendance Updated',       message: 'Your attendance record for Feb 25 has been marked as Present.', time: '1 day ago',  read: true  },
  { id: 4, type: 'resource', title: 'New Resource Uploaded',    message: 'Mr. Peter K. Smith uploaded Biology Exam Past Questions.',      time: '2 days ago', read: false },
  { id: 5, type: 'message',  title: 'New Message',              message: 'Mrs. Jane Doe sent you a message about your English assignment.',time: '3 days ago', read: true  },
  { id: 6, type: 'grade',    title: 'Physics Assignment Graded',message: "Newton's Laws Worksheet has been graded. Score: 65/100",       time: '4 days ago', read: true  },
]
