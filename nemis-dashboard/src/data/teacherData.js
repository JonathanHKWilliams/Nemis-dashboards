// ─── Teacher Profile ──────────────────────────────────────────────────────────
export const teacherProfile = {
  name:       'Mr. David Mensah',
  firstName:  'David',
  subject:    'Mathematics',
  employeeId: 'TCH-2026-0042',
  school:     'St. Peter High School',
  gender:     'men',
  photoId:    6,
  email:      'd.mensah@stpeter.nemis.edu.lr',
  phone:      '+231 770 200 300',
  address:    'Monrovia, Montserrado County',
}

// ─── Assigned Classes ─────────────────────────────────────────────────────────
export const teacherClasses = [
  { id: 'G9A', name: 'Grade 9A', subject: 'Mathematics', totalStudents: 38, room: 'Room 12A', nextClass: '10:20 AM – 11:15 AM', nextDay: 'Today' },
  { id: 'G9B', name: 'Grade 9B', subject: 'Mathematics', totalStudents: 35, room: 'Room 12A', nextClass: '1:00 PM – 1:55 PM',   nextDay: 'Today' },
]

// ─── Students per Class ───────────────────────────────────────────────────────
export const classStudents = {
  G9A: [
    { id: 'STU-2026-1045', name: 'Daniel K. Freeman',   gender: 'men',   photoId: 65, assignment: 85, test: 80, exam: 78, grade: 'B+', letter: 'B', attendance: 94 },
    { id: 'STU-2026-1046', name: 'Abigail Moore',        gender: 'women', photoId: 12, assignment: 92, test: 88, exam: 90, grade: 'A',  letter: 'A', attendance: 100 },
    { id: 'STU-2026-1047', name: 'Emmanuel Kofi',        gender: 'men',   photoId: 22, assignment: 70, test: 65, exam: 68, grade: 'C+', letter: 'C', attendance: 88 },
    { id: 'STU-2026-1048', name: 'Patricia Nimely',      gender: 'women', photoId: 34, assignment: 78, test: 72, exam: 75, grade: 'B-', letter: 'B', attendance: 96 },
    { id: 'STU-2026-1049', name: 'James Kollie',         gender: 'men',   photoId: 44, assignment: 60, test: 55, exam: 58, grade: 'D+', letter: 'D', attendance: 82 },
    { id: 'STU-2026-1050', name: 'Grace Doe',            gender: 'women', photoId: 55, assignment: 95, test: 91, exam: 93, grade: 'A',  letter: 'A', attendance: 100 },
    { id: 'STU-2026-1051', name: 'Benjamin Wreh',        gender: 'men',   photoId: 48, assignment: 74, test: 70, exam: 72, grade: 'C+', letter: 'C', attendance: 90 },
    { id: 'STU-2026-1052', name: 'Comfort Amos',         gender: 'women', photoId: 18, assignment: 88, test: 85, exam: 86, grade: 'B+', letter: 'B', attendance: 98 },
    { id: 'STU-2026-1053', name: 'Marcus Johnson',       gender: 'men',   photoId: 31, assignment: 50, test: 48, exam: 52, grade: 'F',  letter: 'F', attendance: 75 },
    { id: 'STU-2026-1054', name: 'Naomi Flomo',          gender: 'women', photoId: 7,  assignment: 80, test: 77, exam: 79, grade: 'B',  letter: 'B', attendance: 92 },
  ],
  G9B: [
    { id: 'STU-2026-2001', name: 'Samuel Kpedi',         gender: 'men',   photoId: 53, assignment: 88, test: 84, exam: 86, grade: 'B+', letter: 'B', attendance: 96 },
    { id: 'STU-2026-2002', name: 'Esther Barton',        gender: 'women', photoId: 41, assignment: 72, test: 68, exam: 70, grade: 'C+', letter: 'C', attendance: 90 },
    { id: 'STU-2026-2003', name: 'Victor Suah',          gender: 'men',   photoId: 14, assignment: 91, test: 89, exam: 90, grade: 'A',  letter: 'A', attendance: 100 },
    { id: 'STU-2026-2004', name: 'Mariatu Kamara',       gender: 'women', photoId: 60, assignment: 65, test: 62, exam: 64, grade: 'C',  letter: 'C', attendance: 85 },
    { id: 'STU-2026-2005', name: 'Anthony Teh',          gender: 'men',   photoId: 27, assignment: 79, test: 74, exam: 77, grade: 'B-', letter: 'B', attendance: 94 },
    { id: 'STU-2026-2006', name: 'Cecilia Brownell',     gender: 'women', photoId: 49, assignment: 93, test: 90, exam: 92, grade: 'A',  letter: 'A', attendance: 100 },
    { id: 'STU-2026-2007', name: 'Moses Gbarbea',        gender: 'men',   photoId: 38, assignment: 55, test: 50, exam: 53, grade: 'D',  letter: 'D', attendance: 78 },
    { id: 'STU-2026-2008', name: 'Christiana Yancy',     gender: 'women', photoId: 25, assignment: 83, test: 80, exam: 81, grade: 'B+', letter: 'B', attendance: 97 },
    { id: 'STU-2026-2009', name: 'Roland Kollie',        gender: 'men',   photoId: 42, assignment: 76, test: 73, exam: 75, grade: 'B-', letter: 'B', attendance: 93 },
    { id: 'STU-2026-2010', name: 'Felicia Teah',         gender: 'women', photoId: 33, assignment: 68, test: 64, exam: 66, grade: 'C',  letter: 'C', attendance: 88 },
  ],
}

// ─── Teacher Schedule ─────────────────────────────────────────────────────────
export const teacherSchedule = [
  { time: '8:00 – 8:55',   mon: 'Grade 9A', tue: '—',        wed: '—',        thu: 'Grade 9B', fri: 'Grade 9A' },
  { time: '9:00 – 9:55',   mon: '—',        tue: 'Grade 9B', wed: 'Grade 9A', thu: '—',        fri: '—'        },
  { time: '10:00 – 10:20', isBreak: true },
  { time: '10:20 – 11:15', mon: '—',        tue: 'Grade 9A', wed: '—',        thu: 'Grade 9A', fri: 'Grade 9B' },
  { time: '11:20 – 12:15', mon: 'Grade 9B', tue: '—',        wed: 'Grade 9B', thu: '—',        fri: '—'        },
  { time: '12:15 – 1:00',  isLunch: true  },
  { time: '1:00 – 1:55',   mon: '—',        tue: '—',        wed: '—',        thu: '—',        fri: 'Grade 9B' },
  { time: '2:00 – 2:55',   mon: '—',        tue: '—',        wed: '—',        thu: '—',        fri: '—'        },
]

// ─── Assignments ──────────────────────────────────────────────────────────────
export const teacherAssignments = [
  { id: 1,  title: 'Problem Set 7',            classId: 'G9A', type: 'Assignment', due: 'Feb 22, 2026', maxScore: 100, submissions: 10, total: 10, status: 'Graded',      description: 'Complete all exercises in Chapter 7 on Algebra. Show all working.', questions: ['Solve for x: 3x + 7 = 22', 'Factorize: x² – 5x + 6', 'If f(x) = 2x + 3, find f(5)', 'Simplify: (x² – 9) ÷ (x + 3)'] },
  { id: 2,  title: 'Mid-Term Practice Test',   classId: 'G9B', type: 'Test',       due: 'Mar 1, 2026',  maxScore: 100, submissions: 6,  total: 10, status: 'In Progress', description: 'Practice test covering all topics from Term 1. Time allowed: 2 hours.', questions: ['Part A: Algebra (30 marks)', 'Part B: Geometry (30 marks)', 'Part C: Statistics (20 marks)', 'Part D: Word Problems (20 marks)'] },
  { id: 3,  title: 'Geometry Worksheet',       classId: 'G9A', type: 'Classwork',  due: 'Feb 28, 2026', maxScore: 50,  submissions: 9,  total: 10, status: 'In Progress', description: 'Complete worksheet on triangles and angles. Due at end of class.', questions: ['Calculate the missing angle in triangle ABC', 'Find the area of a right triangle with legs 6cm and 8cm', 'Prove that angles in a triangle sum to 180°'] },
  { id: 4,  title: 'Statistics Project',       classId: 'G9B', type: 'Assignment', due: 'Mar 7, 2026',  maxScore: 100, submissions: 0,  total: 10, status: 'Pending',     description: 'Collect data from 20 people on a topic of your choice. Present findings using bar chart and calculate mean, median, mode.', questions: ['State your research question', 'Present your data collection table', 'Draw your bar chart', 'Calculate mean, median, mode', 'Write your conclusions'] },
  { id: 5,  title: 'Algebra Quiz',             classId: 'G9A', type: 'Quiz',       due: 'Feb 15, 2026', maxScore: 30,  submissions: 10, total: 10, status: 'Graded',      description: '10-question quiz on algebraic expressions. No calculators allowed.', questions: ['Q1–Q5: Solve for x', 'Q6–Q8: Factorize', 'Q9–Q10: Word problems'] },
  { id: 6,  title: 'End of Term Exam',         classId: 'G9A', type: 'Exam',       due: 'Mar 15, 2026', maxScore: 100, submissions: 0,  total: 10, status: 'Pending',     description: 'Comprehensive end-of-term examination covering all Term 1 topics.', questions: [] },
]

// Submissions per assignment per student
export const assignmentSubmissions = {
  1: classStudents.G9A.map(s => ({
    studentId: s.id, name: s.name, gender: s.gender, photoId: s.photoId,
    submitted: true, score: s.assignment, grade: s.grade, feedback: 'Good work. Review factorization.',
  })),
  2: classStudents.G9B.slice(0, 6).map(s => ({
    studentId: s.id, name: s.name, gender: s.gender, photoId: s.photoId,
    submitted: true, score: null, grade: null, feedback: '',
  })),
  3: classStudents.G9A.slice(0, 9).map(s => ({
    studentId: s.id, name: s.name, gender: s.gender, photoId: s.photoId,
    submitted: true, score: null, grade: null, feedback: '',
  })),
  5: classStudents.G9A.map(s => ({
    studentId: s.id, name: s.name, gender: s.gender, photoId: s.photoId,
    submitted: true, score: Math.round(s.test * 0.3), grade: s.grade, feedback: '',
  })),
}

// ─── Attendance (today's records, per class) ──────────────────────────────────
export const todayAttendance = {
  G9A: classStudents.G9A.map(s => ({ ...s, status: 'Present', note: '' })),
  G9B: classStudents.G9B.map(s => ({ ...s, status: 'Present', note: '' })),
}

// ─── Resources ────────────────────────────────────────────────────────────────
export const teacherResources = [
  { id: 1, title: 'Mathematics Textbook Grade 9', subject: 'Mathematics', classId: 'both', type: 'E-book',         uploaded: 'Feb 1, 2026',  category: 'ebook',    views: 58 },
  { id: 2, title: 'Algebra Formula Sheet',        subject: 'Mathematics', classId: 'G9A',  type: 'Lecture Notes',  uploaded: 'Feb 5, 2026',  category: 'notes',    views: 32 },
  { id: 3, title: 'Geometry Video Lesson',        subject: 'Mathematics', classId: 'G9A',  type: 'Video Link',     uploaded: 'Feb 10, 2026', category: 'video',    views: 24 },
  { id: 4, title: 'Statistics Past Questions 24', subject: 'Mathematics', classId: 'G9B',  type: 'Past Questions', uploaded: 'Feb 12, 2026', category: 'past',     views: 41 },
  { id: 5, title: 'Mid-Term Revision Notes',      subject: 'Mathematics', classId: 'both', type: 'Lecture Notes',  uploaded: 'Feb 18, 2026', category: 'notes',    views: 63 },
  { id: 6, title: 'Practice Problems Grade 9B',   subject: 'Mathematics', classId: 'G9B',  type: 'Worksheet',      uploaded: 'Feb 20, 2026', category: 'download', views: 19 },
]

// ─── Messages ─────────────────────────────────────────────────────────────────
export const teacherMessages = [
  {
    id: 1, sender: 'Daniel K. Freeman', role: 'Student – Grade 9A', gender: 'men', photoId: 65, unread: 1,
    lastMessage: 'Sir, can I submit the assignment tomorrow?', time: '10:45 AM',
    thread: [
      { from: 'Daniel K. Freeman', text: 'Good morning Sir. I wanted to ask if I could have an extension on Problem Set 7.', time: 'Feb 25, 9:00 AM', isMe: false },
      { from: 'Mr. Mensah', text: 'Why do you need an extension, Daniel?', time: 'Feb 25, 9:20 AM', isMe: true },
      { from: 'Daniel K. Freeman', text: 'Sir, can I submit the assignment tomorrow?', time: 'Feb 25, 10:45 AM', isMe: false },
    ],
  },
  {
    id: 2, sender: 'Mr. Samuel Johnson', role: 'Principal', gender: 'men', photoId: 36, unread: 2,
    lastMessage: 'Please submit Grade 9A results by Friday.', time: '9:00 AM',
    thread: [
      { from: 'Mr. Samuel Johnson', text: 'Good morning Mr. Mensah. We need the Term 1 grades for Grade 9A by this Friday.', time: 'Feb 26, 9:00 AM', isMe: false },
      { from: 'Mr. Mensah', text: 'Understood, I will have them ready by Thursday afternoon.', time: 'Feb 26, 9:30 AM', isMe: true },
      { from: 'Mr. Samuel Johnson', text: 'Please submit Grade 9A results by Friday.', time: 'Feb 26, 11:00 AM', isMe: false },
    ],
  },
  {
    id: 3, sender: 'School Admin', role: 'Administration', gender: 'men', photoId: 20, unread: 0,
    lastMessage: 'Mid-Term timetable has been uploaded.', time: 'Feb 22',
    thread: [
      { from: 'School Admin', text: 'Dear Teachers, the Mid-Term examination timetable has been uploaded to the system. Please review and inform your classes.', time: 'Feb 22, 8:00 AM', isMe: false },
    ],
  },
  {
    id: 4, sender: 'Grade 9A Group', role: 'Class Group', gender: 'men', photoId: 10, unread: 3,
    lastMessage: 'What chapters will be on the test?', time: 'Feb 20',
    thread: [
      { from: 'Grace Doe', text: 'Good afternoon Sir, what chapters will be covered in the upcoming test?', time: 'Feb 20, 2:00 PM', isMe: false },
      { from: 'Mr. Mensah', text: 'Chapters 5 through 8: Algebra, Geometry, Statistics, and Trigonometry basics.', time: 'Feb 20, 2:30 PM', isMe: true },
      { from: 'Abigail Moore', text: 'Thank you Sir!', time: 'Feb 20, 2:45 PM', isMe: false },
      { from: 'Grade 9A Group', text: 'What chapters will be on the test?', time: 'Feb 20, 3:00 PM', isMe: false },
    ],
  },
]

// ─── Notifications ────────────────────────────────────────────────────────────
export const teacherNotifications = [
  { id: 1, type: 'submission', title: 'Assignment Submitted',     message: 'Daniel K. Freeman submitted Problem Set 7 for Grade 9A.',           time: '1 hour ago',   read: false },
  { id: 2, type: 'alert',      title: 'Grade Submission Reminder', message: 'Grade 9A final grades are due by Friday, February 28.',              time: '3 hours ago',  read: false },
  { id: 3, type: 'message',   title: 'New Message – Principal',   message: 'Mr. Samuel Johnson sent you a message about Term 1 results.',        time: '5 hours ago',  read: false },
  { id: 4, type: 'resource',  title: 'Resource Viewed',           message: 'Mid-Term Revision Notes has been viewed 63 times by students.',      time: '1 day ago',    read: true  },
  { id: 5, type: 'info',      title: 'Attendance Reminder',       message: 'You have not yet marked attendance for Grade 9B today.',             time: '1 day ago',    read: false },
  { id: 6, type: 'grade',     title: 'Grade Update',              message: 'Marcus Johnson\'s grade has been flagged for review – score below 50%', time: '2 days ago', read: true  },
]

// ─── School Info (same as student) ────────────────────────────────────────────
export const teacherSchoolInfo = {
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
