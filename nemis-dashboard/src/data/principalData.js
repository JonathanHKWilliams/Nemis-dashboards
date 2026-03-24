// ─── School & Principal Identity ───────────────────────────────────────────

export const principalProfile = {
  name: 'James K. Freeman',
  firstName: 'Principal Freeman',
  title: 'School Principal',
  gender: 'men',
  photoId: 45,
  email: 'j.freeman@stmarks.edu.lr',
  phone: '+231 886 234 567',
}

export const schoolInfo = {
  name: "St. Mark's Demonstration School",
  code: 'NEMIS-GBC-2031',
  county: 'Grand Bassa County',
  district: 'Buchanan District',
  address: 'Freeman Street, Buchanan City, Grand Bassa',
  type: 'Public',
  level: 'K–12',
  established: '1989',
  capacity: 800,
  status: 'Active',
  accreditation: 'MOE Accredited',
  totalStudents: 642,
  totalTeachers: 28,
  totalClasses: 18,
}

export const schoolKPIs = {
  totalStudents: 642,
  maleStudents: 340,
  femaleStudents: 302,
  totalTeachers: 28,
  activeClasses: 18,
  presentToday: 596,
  teachersPresentToday: 25,
  outstandingTuition: 18240,
  attendanceRate: 93,
  avgGrade: 'B',
}

// ─── Teachers (28) ─────────────────────────────────────────────────────────

export const principalTeachers = [
  { id: 1,  name: 'Mary A. Johnson',    subject: 'Mathematics',       classes: ['Grade 5A', 'Grade 6A'],     attendance: 97, empId: 'TCH-001', gender: 'women', photoId: 44, status: 'Active',    joined: 'Jan 2018', phone: '+231 770 112 001', email: 'm.johnson@stmarks.edu.lr',  lastReport: 'Mar 10, 2026' },
  { id: 2,  name: 'David K. Cooper',    subject: 'English Language',   classes: ['Grade 7A', 'Grade 8A'],     attendance: 94, empId: 'TCH-002', gender: 'men',   photoId: 32, status: 'Active',    joined: 'Sep 2016', phone: '+231 886 223 002', email: 'd.cooper@stmarks.edu.lr',   lastReport: 'Mar 10, 2026' },
  { id: 3,  name: 'Agnes T. Sumo',      subject: 'Science',            classes: ['Grade 6B', 'Grade 7B'],     attendance: 91, empId: 'TCH-003', gender: 'women', photoId: 55, status: 'Active',    joined: 'Mar 2019', phone: '+231 770 334 003', email: 'a.sumo@stmarks.edu.lr',     lastReport: 'Mar 7, 2026'  },
  { id: 4,  name: 'Robert G. Yarkpah',  subject: 'Social Studies',     classes: ['Grade 8B', 'Grade 9'],      attendance: 88, empId: 'TCH-004', gender: 'men',   photoId: 61, status: 'Active',    joined: 'Aug 2015', phone: '+231 886 445 004', email: 'r.yarkpah@stmarks.edu.lr',  lastReport: 'Feb 28, 2026' },
  { id: 5,  name: 'Florence B. Dennis', subject: 'Health & PE',        classes: ['Grade 5B', 'Grade 6A'],     attendance: 95, empId: 'TCH-005', gender: 'women', photoId: 38, status: 'Active',    joined: 'Nov 2020', phone: '+231 770 556 005', email: 'f.dennis@stmarks.edu.lr',   lastReport: 'Mar 10, 2026' },
  { id: 6,  name: 'Samuel E. Kollie',   subject: 'Mathematics',        classes: ['Grade 9', 'Grade 10'],      attendance: 92, empId: 'TCH-006', gender: 'men',   photoId: 22, status: 'Active',    joined: 'Jun 2017', phone: '+231 886 667 006', email: 's.kollie@stmarks.edu.lr',   lastReport: 'Mar 9, 2026'  },
  { id: 7,  name: 'Patricia W. Wleh',   subject: 'English Literature', classes: ['Grade 10', 'Grade 11'],     attendance: 89, empId: 'TCH-007', gender: 'women', photoId: 62, status: 'Active',    joined: 'Jan 2014', phone: '+231 770 778 007', email: 'p.wleh@stmarks.edu.lr',     lastReport: 'Mar 8, 2026'  },
  { id: 8,  name: 'Thomas J. Flomo',    subject: 'Biology',            classes: ['Grade 11', 'Grade 12'],     attendance: 96, empId: 'TCH-008', gender: 'men',   photoId: 48, status: 'Active',    joined: 'Apr 2018', phone: '+231 886 889 008', email: 't.flomo@stmarks.edu.lr',    lastReport: 'Mar 10, 2026' },
  { id: 9,  name: 'Cecelia M. Tarr',    subject: 'Chemistry',          classes: ['Grade 11', 'Grade 12'],     attendance: 90, empId: 'TCH-009', gender: 'women', photoId: 71, status: 'Active',    joined: 'Feb 2021', phone: '+231 770 990 009', email: 'c.tarr@stmarks.edu.lr',     lastReport: 'Mar 6, 2026'  },
  { id: 10, name: 'George H. Bestman',  subject: 'Physics',            classes: ['Grade 10', 'Grade 12'],     attendance: 87, empId: 'TCH-010', gender: 'men',   photoId: 37, status: 'Active',    joined: 'Jul 2016', phone: '+231 886 001 010', email: 'g.bestman@stmarks.edu.lr',  lastReport: 'Feb 25, 2026' },
  { id: 11, name: 'Hawa N. Gbessay',    subject: 'French',             classes: ['Grade 8A', 'Grade 9'],      attendance: 93, empId: 'TCH-011', gender: 'women', photoId: 52, status: 'Active',    joined: 'Sep 2019', phone: '+231 770 112 011', email: 'h.gbessay@stmarks.edu.lr',  lastReport: 'Mar 10, 2026' },
  { id: 12, name: 'Abraham C. Weah',    subject: 'History',            classes: ['Grade 7A', 'Grade 8B'],     attendance: 85, empId: 'TCH-012', gender: 'men',   photoId: 53, status: 'On Leave', joined: 'Mar 2015', phone: '+231 886 223 012', email: 'a.weah@stmarks.edu.lr',     lastReport: 'Feb 20, 2026' },
  { id: 13, name: 'Lorpu S. Mulbah',    subject: 'Music & Arts',       classes: ['Grade 4A', 'Grade 4B'],     attendance: 98, empId: 'TCH-013', gender: 'women', photoId: 67, status: 'Active',    joined: 'Jan 2022', phone: '+231 770 334 013', email: 'l.mulbah@stmarks.edu.lr',   lastReport: 'Mar 10, 2026' },
  { id: 14, name: 'Emmanuel D. Toe',    subject: 'ICT',                classes: ['Grade 9', 'Grade 10'],      attendance: 91, empId: 'TCH-014', gender: 'men',   photoId: 29, status: 'Active',    joined: 'Aug 2020', phone: '+231 886 445 014', email: 'e.toe@stmarks.edu.lr',      lastReport: 'Mar 9, 2026'  },
  { id: 15, name: 'Rebecca A. Nimley',  subject: 'Grade 1 Class',      classes: ['Grade 1A'],                 attendance: 100,empId: 'TCH-015', gender: 'women', photoId: 41, status: 'Active',    joined: 'Nov 2017', phone: '+231 770 556 015', email: 'r.nimley@stmarks.edu.lr',   lastReport: 'Mar 10, 2026' },
  { id: 16, name: 'John T. Kerkula',    subject: 'Grade 2 Class',      classes: ['Grade 2A'],                 attendance: 95, empId: 'TCH-016', gender: 'men',   photoId: 64, status: 'Active',    joined: 'Jun 2018', phone: '+231 886 667 016', email: 'j.kerkula@stmarks.edu.lr',  lastReport: 'Mar 10, 2026' },
  { id: 17, name: 'Miatta E. Gaye',     subject: 'Grade 3 Class',      classes: ['Grade 3A'],                 attendance: 93, empId: 'TCH-017', gender: 'women', photoId: 46, status: 'Active',    joined: 'Jan 2019', phone: '+231 770 778 017', email: 'm.gaye@stmarks.edu.lr',     lastReport: 'Mar 8, 2026'  },
  { id: 18, name: 'Isaac P. Dokie',     subject: 'Grade 4 Class',      classes: ['Grade 4A'],                 attendance: 89, empId: 'TCH-018', gender: 'men',   photoId: 15, status: 'Active',    joined: 'Apr 2016', phone: '+231 886 889 018', email: 'i.dokie@stmarks.edu.lr',    lastReport: 'Mar 7, 2026'  },
  { id: 19, name: 'Satta K. Wiah',      subject: 'Grade 5 Class',      classes: ['Grade 5A'],                 attendance: 96, empId: 'TCH-019', gender: 'women', photoId: 58, status: 'Active',    joined: 'Feb 2020', phone: '+231 770 990 019', email: 's.wiah@stmarks.edu.lr',     lastReport: 'Mar 10, 2026' },
  { id: 20, name: 'Moses B. Togba',     subject: 'Religious Studies',  classes: ['Grade 6A', 'Grade 6B'],     attendance: 92, empId: 'TCH-020', gender: 'men',   photoId: 71, status: 'Active',    joined: 'Sep 2014', phone: '+231 886 001 020', email: 'm.togba@stmarks.edu.lr',    lastReport: 'Mar 9, 2026'  },
  { id: 21, name: 'Jenneh D. Fahnbulleh',subject:'Economics',          classes: ['Grade 11', 'Grade 12'],     attendance: 94, empId: 'TCH-021', gender: 'women', photoId: 73, status: 'Active',    joined: 'Jul 2021', phone: '+231 770 112 021', email: 'j.fahnbulleh@stmarks.edu.lr',lastReport: 'Mar 10, 2026'},
  { id: 22, name: 'Daniel O. Nyenpan',  subject: 'Agriculture',        classes: ['Grade 7B', 'Grade 8A'],     attendance: 88, empId: 'TCH-022', gender: 'men',   photoId: 19, status: 'Active',    joined: 'Mar 2017', phone: '+231 886 223 022', email: 'd.nyenpan@stmarks.edu.lr',  lastReport: 'Mar 6, 2026'  },
  { id: 23, name: 'Victoria M. Nagbe',  subject: 'Grade 1B Class',     classes: ['Grade 1B'],                 attendance: 97, empId: 'TCH-023', gender: 'women', photoId: 35, status: 'Active',    joined: 'Jan 2023', phone: '+231 770 334 023', email: 'v.nagbe@stmarks.edu.lr',    lastReport: 'Mar 10, 2026' },
  { id: 24, name: 'Peter K. Zinnah',    subject: 'Grade 3B Class',     classes: ['Grade 3B'],                 attendance: 91, empId: 'TCH-024', gender: 'men',   photoId: 57, status: 'Active',    joined: 'Aug 2021', phone: '+231 886 445 024', email: 'p.zinnah@stmarks.edu.lr',   lastReport: 'Mar 9, 2026'  },
  { id: 25, name: 'Korpo A. Momo',      subject: 'Civic Education',    classes: ['Grade 5B', 'Grade 7A'],     attendance: 86, empId: 'TCH-025', gender: 'women', photoId: 63, status: 'Active',    joined: 'Nov 2018', phone: '+231 770 556 025', email: 'k.momo@stmarks.edu.lr',     lastReport: 'Mar 5, 2026'  },
  { id: 26, name: 'Isaiah T. Kollie',   subject: 'Physical Education', classes: ['Grade 10', 'Grade 11'],     attendance: 95, empId: 'TCH-026', gender: 'men',   photoId: 43, status: 'Active',    joined: 'Jun 2019', phone: '+231 886 667 026', email: 'i.kollie@stmarks.edu.lr',   lastReport: 'Mar 10, 2026' },
  { id: 27, name: 'Naomi E. Pewee',     subject: 'Guidance Counseling',classes: ['All Grades'],               attendance: 99, empId: 'TCH-027', gender: 'women', photoId: 27, status: 'Active',    joined: 'Feb 2016', phone: '+231 770 778 027', email: 'n.pewee@stmarks.edu.lr',    lastReport: 'Mar 10, 2026' },
  { id: 28, name: 'Albert S. Dolo',     subject: 'Geography',          classes: ['Grade 8B', 'Grade 9'],      attendance: 83, empId: 'TCH-028', gender: 'men',   photoId: 66, status: 'Suspended',  joined: 'Apr 2013', phone: '+231 886 889 028', email: 'a.dolo@stmarks.edu.lr',     lastReport: 'Jan 15, 2026' },
]

// ─── Classes (18) ──────────────────────────────────────────────────────────

export const principalClasses = [
  { id: 1,  name: 'Grade 1A', level: 'Elementary', teacher: 'Rebecca A. Nimley',  teacherId: 15, students: 38, capacity: 45, attendance: 96, room: 'Room 101' },
  { id: 2,  name: 'Grade 1B', level: 'Elementary', teacher: 'Victoria M. Nagbe',   teacherId: 23, students: 35, capacity: 45, attendance: 94, room: 'Room 102' },
  { id: 3,  name: 'Grade 2A', level: 'Elementary', teacher: 'John T. Kerkula',     teacherId: 16, students: 40, capacity: 45, attendance: 97, room: 'Room 103' },
  { id: 4,  name: 'Grade 3A', level: 'Elementary', teacher: 'Miatta E. Gaye',      teacherId: 17, students: 36, capacity: 45, attendance: 93, room: 'Room 104' },
  { id: 5,  name: 'Grade 3B', level: 'Elementary', teacher: 'Peter K. Zinnah',     teacherId: 24, students: 34, capacity: 45, attendance: 91, room: 'Room 105' },
  { id: 6,  name: 'Grade 4A', level: 'Elementary', teacher: 'Isaac P. Dokie',      teacherId: 18, students: 37, capacity: 45, attendance: 89, room: 'Room 106' },
  { id: 7,  name: 'Grade 4B', level: 'Elementary', teacher: 'Lorpu S. Mulbah',     teacherId: 13, students: 35, capacity: 45, attendance: 95, room: 'Room 107' },
  { id: 8,  name: 'Grade 5A', level: 'Elementary', teacher: 'Satta K. Wiah',       teacherId: 19, students: 38, capacity: 45, attendance: 92, room: 'Room 108' },
  { id: 9,  name: 'Grade 5B', level: 'Elementary', teacher: 'Mary A. Johnson',     teacherId: 1,  students: 36, capacity: 45, attendance: 90, room: 'Room 109' },
  { id: 10, name: 'Grade 6A', level: 'Elementary', teacher: 'Mary A. Johnson',     teacherId: 1,  students: 39, capacity: 45, attendance: 94, room: 'Room 110' },
  { id: 11, name: 'Grade 6B', level: 'Elementary', teacher: 'Agnes T. Sumo',       teacherId: 3,  students: 37, capacity: 45, attendance: 91, room: 'Room 111' },
  { id: 12, name: 'Grade 7A', level: 'Junior High', teacher: 'David K. Cooper',    teacherId: 2,  students: 42, capacity: 50, attendance: 96, room: 'Room 201' },
  { id: 13, name: 'Grade 7B', level: 'Junior High', teacher: 'Agnes T. Sumo',      teacherId: 3,  students: 40, capacity: 50, attendance: 93, room: 'Room 202' },
  { id: 14, name: 'Grade 8A', level: 'Junior High', teacher: 'David K. Cooper',    teacherId: 2,  students: 43, capacity: 50, attendance: 95, room: 'Room 203' },
  { id: 15, name: 'Grade 8B', level: 'Junior High', teacher: 'Robert G. Yarkpah',  teacherId: 4,  students: 41, capacity: 50, attendance: 89, room: 'Room 204' },
  { id: 16, name: 'Grade 9',  level: 'Junior High', teacher: 'Samuel E. Kollie',   teacherId: 6,  students: 44, capacity: 50, attendance: 91, room: 'Room 205' },
  { id: 17, name: 'Grade 10', level: 'Senior High', teacher: 'Patricia W. Wleh',   teacherId: 7,  students: 46, capacity: 55, attendance: 93, room: 'Room 301' },
  { id: 18, name: 'Grade 11–12 Combined', level: 'Senior High', teacher: 'Thomas J. Flomo', teacherId: 8, students: 41, capacity: 55, attendance: 88, room: 'Room 302' },
]

// ─── Students (50 shown, total 642) ────────────────────────────────────────

export const principalStudents = [
  { id: 1,  studentId: 'GB-24001', name: 'Emmanuel K. Doe',        class: 'Grade 9',  gender: 'Male',   parentPhone: '+231 77 555 1001', attendance: 92, feeStatus: 'Paid',    avgGrade: 'B+', enrolled: 'Sep 2021', photoId: 10, status: 'Active' },
  { id: 2,  studentId: 'GB-24002', name: 'Christiana M. Flomo',    class: 'Grade 8A', gender: 'Female', parentPhone: '+231 77 555 1002', attendance: 88, feeStatus: 'Partial', avgGrade: 'B',  enrolled: 'Sep 2022', photoId: 20, status: 'Active' },
  { id: 3,  studentId: 'GB-24003', name: 'Marcus T. Weah',         class: 'Grade 10', gender: 'Male',   parentPhone: '+231 77 555 1003', attendance: 95, feeStatus: 'Paid',    avgGrade: 'A',  enrolled: 'Sep 2020', photoId: 30, status: 'Active' },
  { id: 4,  studentId: 'GB-24004', name: 'Patience E. Kollie',     class: 'Grade 7A', gender: 'Female', parentPhone: '+231 77 555 1004', attendance: 79, feeStatus: 'Unpaid',  avgGrade: 'C+', enrolled: 'Sep 2023', photoId: 40, status: 'Active' },
  { id: 5,  studentId: 'GB-24005', name: 'Solomon J. Karbo',       class: 'Grade 11–12 Combined', gender: 'Male',   parentPhone: '+231 77 555 1005', attendance: 97, feeStatus: 'Paid',    avgGrade: 'A+', enrolled: 'Sep 2019', photoId: 50, status: 'Active' },
  { id: 6,  studentId: 'GB-24006', name: 'Hawa B. Sumo',           class: 'Grade 6A', gender: 'Female', parentPhone: '+231 77 555 1006', attendance: 91, feeStatus: 'Paid',    avgGrade: 'B',  enrolled: 'Sep 2023', photoId: 60, status: 'Active' },
  { id: 7,  studentId: 'GB-24007', name: 'Daniel P. Bestman',      class: 'Grade 5A', gender: 'Male',   parentPhone: '+231 77 555 1007', attendance: 85, feeStatus: 'Partial', avgGrade: 'B-', enrolled: 'Sep 2024', photoId: 70, status: 'Active' },
  { id: 8,  studentId: 'GB-24008', name: 'Rebecca A. Kerkula',     class: 'Grade 4A', gender: 'Female', parentPhone: '+231 77 555 1008', attendance: 98, feeStatus: 'Paid',    avgGrade: 'A',  enrolled: 'Sep 2024', photoId: 80, status: 'Active' },
  { id: 9,  studentId: 'GB-24009', name: 'James O. Tarr',          class: 'Grade 3A', gender: 'Male',   parentPhone: '+231 77 555 1009', attendance: 76, feeStatus: 'Unpaid',  avgGrade: 'C',  enrolled: 'Sep 2025', photoId: 90, status: 'Active' },
  { id: 10, studentId: 'GB-24010', name: 'Martha K. Dennis',       class: 'Grade 2A', gender: 'Female', parentPhone: '+231 77 555 1010', attendance: 94, feeStatus: 'Paid',    avgGrade: 'B+', enrolled: 'Sep 2025', photoId: 100, status: 'Active' },
  { id: 11, studentId: 'GB-24011', name: 'Abraham G. Nyan',        class: 'Grade 9',  gender: 'Male',   parentPhone: '+231 77 555 1011', attendance: 87, feeStatus: 'Paid',    avgGrade: 'B',  enrolled: 'Sep 2021', photoId: 11, status: 'Active' },
  { id: 12, studentId: 'GB-24012', name: 'Lorpu T. Mulbah',        class: 'Grade 8B', gender: 'Female', parentPhone: '+231 77 555 1012', attendance: 93, feeStatus: 'Partial', avgGrade: 'B+', enrolled: 'Sep 2022', photoId: 21, status: 'Active' },
  { id: 13, studentId: 'GB-24013', name: 'George C. Wleh',         class: 'Grade 7B', gender: 'Male',   parentPhone: '+231 77 555 1013', attendance: 80, feeStatus: 'Unpaid',  avgGrade: 'C+', enrolled: 'Sep 2023', photoId: 31, status: 'Active' },
  { id: 14, studentId: 'GB-24014', name: 'Miatta A. Kamara',       class: 'Grade 10', gender: 'Female', parentPhone: '+231 77 555 1014', attendance: 96, feeStatus: 'Paid',    avgGrade: 'A-', enrolled: 'Sep 2020', photoId: 41, status: 'Active' },
  { id: 15, studentId: 'GB-24015', name: 'Moses D. Gbessay',       class: 'Grade 6B', gender: 'Male',   parentPhone: '+231 77 555 1015', attendance: 89, feeStatus: 'Paid',    avgGrade: 'B',  enrolled: 'Sep 2023', photoId: 51, status: 'Active' },
  { id: 16, studentId: 'GB-24016', name: 'Satta J. Pewee',         class: 'Grade 5B', gender: 'Female', parentPhone: '+231 77 555 1016', attendance: 99, feeStatus: 'Paid',    avgGrade: 'A',  enrolled: 'Sep 2024', photoId: 61, status: 'Active' },
  { id: 17, studentId: 'GB-24017', name: 'Isaac T. Dolo',          class: 'Grade 4B', gender: 'Male',   parentPhone: '+231 77 555 1017', attendance: 72, feeStatus: 'Unpaid',  avgGrade: 'D',  enrolled: 'Sep 2024', photoId: 71, status: 'Active' },
  { id: 18, studentId: 'GB-24018', name: 'Victoria N. Fahnbulleh', class: 'Grade 3B', gender: 'Female', parentPhone: '+231 77 555 1018', attendance: 91, feeStatus: 'Paid',    avgGrade: 'B-', enrolled: 'Sep 2025', photoId: 81, status: 'Active' },
  { id: 19, studentId: 'GB-24019', name: 'Peter K. Zinnah Jr.',    class: 'Grade 1A', gender: 'Male',   parentPhone: '+231 77 555 1019', attendance: 95, feeStatus: 'Paid',    avgGrade: 'A',  enrolled: 'Sep 2025', photoId: 91, status: 'Active' },
  { id: 20, studentId: 'GB-24020', name: 'Naomi E. Tokpah',        class: 'Grade 1B', gender: 'Female', parentPhone: '+231 77 555 1020', attendance: 88, feeStatus: 'Partial', avgGrade: 'B',  enrolled: 'Sep 2025', photoId: 12, status: 'Active' },
  { id: 21, studentId: 'GB-24021', name: 'Richard A. Nyenpan',     class: 'Grade 11–12 Combined', gender: 'Male',   parentPhone: '+231 77 555 1021', attendance: 90, feeStatus: 'Paid',    avgGrade: 'B+', enrolled: 'Sep 2019', photoId: 22, status: 'Active' },
  { id: 22, studentId: 'GB-24022', name: 'Florence G. Togba',      class: 'Grade 9',  gender: 'Female', parentPhone: '+231 77 555 1022', attendance: 94, feeStatus: 'Paid',    avgGrade: 'A-', enrolled: 'Sep 2021', photoId: 32, status: 'Active' },
  { id: 23, studentId: 'GB-24023', name: 'Samuel B. Momo',         class: 'Grade 8A', gender: 'Male',   parentPhone: '+231 77 555 1023', attendance: 83, feeStatus: 'Unpaid',  avgGrade: 'C',  enrolled: 'Sep 2022', photoId: 42, status: 'Active' },
  { id: 24, studentId: 'GB-24024', name: 'Agnes T. Korlor',        class: 'Grade 7A', gender: 'Female', parentPhone: '+231 77 555 1024', attendance: 97, feeStatus: 'Paid',    avgGrade: 'A',  enrolled: 'Sep 2023', photoId: 52, status: 'Active' },
  { id: 25, studentId: 'GB-24025', name: 'Thomas J. Freeman',      class: 'Grade 6A', gender: 'Male',   parentPhone: '+231 77 555 1025', attendance: 86, feeStatus: 'Partial', avgGrade: 'B-', enrolled: 'Sep 2023', photoId: 62, status: 'Active' },
  { id: 26, studentId: 'GB-24026', name: 'Hawa M. Gaye',           class: 'Grade 5A', gender: 'Female', parentPhone: '+231 77 555 1026', attendance: 92, feeStatus: 'Paid',    avgGrade: 'B+', enrolled: 'Sep 2024', photoId: 72, status: 'Active' },
  { id: 27, studentId: 'GB-24027', name: 'Patrick E. Karbo',       class: 'Grade 4A', gender: 'Male',   parentPhone: '+231 77 555 1027', attendance: 78, feeStatus: 'Unpaid',  avgGrade: 'C+', enrolled: 'Sep 2024', photoId: 82, status: 'Active' },
  { id: 28, studentId: 'GB-24028', name: 'Cecelia A. Wiah',        class: 'Grade 3A', gender: 'Female', parentPhone: '+231 77 555 1028', attendance: 100, feeStatus: 'Paid',   avgGrade: 'A+', enrolled: 'Sep 2025', photoId: 92, status: 'Active' },
  { id: 29, studentId: 'GB-24029', name: 'David N. Nimley',        class: 'Grade 2A', gender: 'Male',   parentPhone: '+231 77 555 1029', attendance: 90, feeStatus: 'Paid',    avgGrade: 'B',  enrolled: 'Sep 2025', photoId: 13, status: 'Active' },
  { id: 30, studentId: 'GB-24030', name: 'Jenneh B. Kollie',       class: 'Grade 1A', gender: 'Female', parentPhone: '+231 77 555 1030', attendance: 87, feeStatus: 'Partial', avgGrade: 'B-', enrolled: 'Sep 2025', photoId: 23, status: 'Active' },
  { id: 31, studentId: 'GB-24031', name: 'Isaiah K. Nagbe',        class: 'Grade 10', gender: 'Male',   parentPhone: '+231 77 555 1031', attendance: 91, feeStatus: 'Paid',    avgGrade: 'B+', enrolled: 'Sep 2020', photoId: 33, status: 'Active' },
  { id: 32, studentId: 'GB-24032', name: 'Korpo S. Konneh',        class: 'Grade 9',  gender: 'Female', parentPhone: '+231 77 555 1032', attendance: 85, feeStatus: 'Paid',    avgGrade: 'B',  enrolled: 'Sep 2021', photoId: 43, status: 'Active' },
  { id: 33, studentId: 'GB-24033', name: 'Albert D. Cooper',       class: 'Grade 8B', gender: 'Male',   parentPhone: '+231 77 555 1033', attendance: 74, feeStatus: 'Unpaid',  avgGrade: 'C',  enrolled: 'Sep 2022', photoId: 53, status: 'Active' },
  { id: 34, studentId: 'GB-24034', name: 'Patience T. Gbessay',    class: 'Grade 7B', gender: 'Female', parentPhone: '+231 77 555 1034', attendance: 96, feeStatus: 'Paid',    avgGrade: 'A-', enrolled: 'Sep 2023', photoId: 63, status: 'Active' },
  { id: 35, studentId: 'GB-24035', name: 'Emmanuel M. Bestman',    class: 'Grade 6B', gender: 'Male',   parentPhone: '+231 77 555 1035', attendance: 88, feeStatus: 'Partial', avgGrade: 'B',  enrolled: 'Sep 2023', photoId: 73, status: 'Active' },
  { id: 36, studentId: 'GB-24036', name: 'Martha K. Flomo',        class: 'Grade 5B', gender: 'Female', parentPhone: '+231 77 555 1036', attendance: 93, feeStatus: 'Paid',    avgGrade: 'B+', enrolled: 'Sep 2024', photoId: 83, status: 'Active' },
  { id: 37, studentId: 'GB-24037', name: 'George T. Doe',          class: 'Grade 4B', gender: 'Male',   parentPhone: '+231 77 555 1037', attendance: 81, feeStatus: 'Paid',    avgGrade: 'B-', enrolled: 'Sep 2024', photoId: 93, status: 'Active' },
  { id: 38, studentId: 'GB-24038', name: 'Lorpu A. Tarr',          class: 'Grade 3B', gender: 'Female', parentPhone: '+231 77 555 1038', attendance: 97, feeStatus: 'Paid',    avgGrade: 'A',  enrolled: 'Sep 2025', photoId: 14, status: 'Active' },
  { id: 39, studentId: 'GB-24039', name: 'Moses B. Zinnah',        class: 'Grade 2A', gender: 'Male',   parentPhone: '+231 77 555 1039', attendance: 82, feeStatus: 'Unpaid',  avgGrade: 'C+', enrolled: 'Sep 2025', photoId: 24, status: 'Active' },
  { id: 40, studentId: 'GB-24040', name: 'Victoria E. Dolo',       class: 'Grade 1B', gender: 'Female', parentPhone: '+231 77 555 1040', attendance: 95, feeStatus: 'Paid',    avgGrade: 'A',  enrolled: 'Sep 2025', photoId: 34, status: 'Active' },
  { id: 41, studentId: 'GB-24041', name: 'Christiana J. Weah',     class: 'Grade 11–12 Combined', gender: 'Female', parentPhone: '+231 77 555 1041', attendance: 98, feeStatus: 'Paid', avgGrade: 'A+', enrolled: 'Sep 2019', photoId: 44, status: 'Active' },
  { id: 42, studentId: 'GB-24042', name: 'Samuel A. Kerkula',      class: 'Grade 10', gender: 'Male',   parentPhone: '+231 77 555 1042', attendance: 86, feeStatus: 'Partial', avgGrade: 'B',  enrolled: 'Sep 2020', photoId: 54, status: 'Active' },
  { id: 43, studentId: 'GB-24043', name: 'Satta N. Nimley',        class: 'Grade 9',  gender: 'Female', parentPhone: '+231 77 555 1043', attendance: 91, feeStatus: 'Paid',    avgGrade: 'B+', enrolled: 'Sep 2021', photoId: 64, status: 'Active' },
  { id: 44, studentId: 'GB-24044', name: 'Daniel O. Togba',        class: 'Grade 8A', gender: 'Male',   parentPhone: '+231 77 555 1044', attendance: 89, feeStatus: 'Paid',    avgGrade: 'B',  enrolled: 'Sep 2022', photoId: 74, status: 'Active' },
  { id: 45, studentId: 'GB-24045', name: 'Rebecca M. Pewee',       class: 'Grade 7A', gender: 'Female', parentPhone: '+231 77 555 1045', attendance: 94, feeStatus: 'Paid',    avgGrade: 'A-', enrolled: 'Sep 2023', photoId: 84, status: 'Active' },
  { id: 46, studentId: 'GB-24046', name: 'Isaac G. Momo',          class: 'Grade 6A', gender: 'Male',   parentPhone: '+231 77 555 1046', attendance: 77, feeStatus: 'Unpaid',  avgGrade: 'C',  enrolled: 'Sep 2023', photoId: 94, status: 'Active' },
  { id: 47, studentId: 'GB-24047', name: 'Naomi T. Kamara',        class: 'Grade 5A', gender: 'Female', parentPhone: '+231 77 555 1047', attendance: 100, feeStatus: 'Paid',   avgGrade: 'A',  enrolled: 'Sep 2024', photoId: 15, status: 'Active' },
  { id: 48, studentId: 'GB-24048', name: 'Peter A. Nyan',          class: 'Grade 4A', gender: 'Male',   parentPhone: '+231 77 555 1048', attendance: 84, feeStatus: 'Partial', avgGrade: 'B-', enrolled: 'Sep 2024', photoId: 25, status: 'Active' },
  { id: 49, studentId: 'GB-24049', name: 'Florence K. Korlor',     class: 'Grade 3A', gender: 'Female', parentPhone: '+231 77 555 1049', attendance: 92, feeStatus: 'Paid',    avgGrade: 'B+', enrolled: 'Sep 2025', photoId: 35, status: 'Active' },
  { id: 50, studentId: 'GB-24050', name: 'Abraham E. Yarkpah',     class: 'Grade 2A', gender: 'Male',   parentPhone: '+231 77 555 1050', attendance: 88, feeStatus: 'Paid',    avgGrade: 'B',  enrolled: 'Sep 2025', photoId: 45, status: 'Active' },
]

// ─── Parents / Guardians ───────────────────────────────────────────────────

export const principalParents = [
  {
    id: 1, parentId: 'PAR-001', name: 'Mary J. Doe',           relationship: 'Mother',   gender: 'women', photoId: 44,
    phone: '+231 77 555 2001', email: 'm.doe@gmail.com',         occupation: 'Nurse',      address: '12 Kennedy Ave, Buchanan',
    lastContact: 'Mar 8, 2026',
    children: [
      { studentId: 'GB-24001', name: 'Emmanuel K. Doe',  class: 'Grade 9',  feeStatus: 'Paid',    attendance: 92, avgGrade: 'B+' },
      { studentId: 'GB-24037', name: 'George T. Doe',    class: 'Grade 4B', feeStatus: 'Paid',    attendance: 81, avgGrade: 'B-' },
    ],
  },
  {
    id: 2, parentId: 'PAR-002', name: 'Henry B. Flomo',         relationship: 'Father',   gender: 'men',   photoId: 32,
    phone: '+231 88 622 2002', email: 'h.flomo@yahoo.com',       occupation: 'Farmer',     address: '5 Tubman Street, Buchanan',
    lastContact: 'Feb 25, 2026',
    children: [
      { studentId: 'GB-24002', name: 'Christiana M. Flomo', class: 'Grade 8A', feeStatus: 'Partial', attendance: 88, avgGrade: 'B'  },
      { studentId: 'GB-24036', name: 'Martha K. Flomo',     class: 'Grade 5B', feeStatus: 'Paid',    attendance: 93, avgGrade: 'B+' },
    ],
  },
  {
    id: 3, parentId: 'PAR-003', name: 'Samuel A. Weah',         relationship: 'Father',   gender: 'men',   photoId: 48,
    phone: '+231 77 555 2003', email: 's.weah@gmail.com',         occupation: 'Civil Servant', address: '3 Carey Street, Buchanan',
    lastContact: 'Mar 10, 2026',
    children: [
      { studentId: 'GB-24003', name: 'Marcus T. Weah',      class: 'Grade 10', feeStatus: 'Paid',   attendance: 95, avgGrade: 'A'  },
      { studentId: 'GB-24041', name: 'Christiana J. Weah',  class: 'Grade 11–12 Combined', feeStatus: 'Paid', attendance: 98, avgGrade: 'A+' },
    ],
  },
  {
    id: 4, parentId: 'PAR-004', name: 'Grace E. Kollie',        relationship: 'Guardian', gender: 'women', photoId: 55,
    phone: '+231 88 622 2004', email: 'grace.kollie@gmail.com',   occupation: 'Trader',     address: '8 Freeman St, Buchanan',
    lastContact: 'Jan 15, 2026',
    children: [
      { studentId: 'GB-24004', name: 'Patience E. Kollie',  class: 'Grade 7A', feeStatus: 'Unpaid', attendance: 79, avgGrade: 'C+' },
    ],
  },
  {
    id: 5, parentId: 'PAR-005', name: 'Philip J. Karbo',        relationship: 'Father',   gender: 'men',   photoId: 61,
    phone: '+231 77 555 2005', email: 'p.karbo@gmail.com',        occupation: 'Teacher',    address: '21 Mechlin Street, Buchanan',
    lastContact: 'Mar 10, 2026',
    children: [
      { studentId: 'GB-24005', name: 'Solomon J. Karbo',    class: 'Grade 11–12 Combined', feeStatus: 'Paid', attendance: 97, avgGrade: 'A+' },
    ],
  },
  {
    id: 6, parentId: 'PAR-006', name: 'Alice B. Sumo',          relationship: 'Mother',   gender: 'women', photoId: 38,
    phone: '+231 88 622 2006', email: 'a.sumo@gmail.com',         occupation: 'Petty Trader', address: '14 Benson Street, Buchanan',
    lastContact: 'Mar 5, 2026',
    children: [
      { studentId: 'GB-24006', name: 'Hawa B. Sumo',        class: 'Grade 6A', feeStatus: 'Paid',   attendance: 91, avgGrade: 'B'  },
    ],
  },
  {
    id: 7, parentId: 'PAR-007', name: 'George M. Bestman',      relationship: 'Father',   gender: 'men',   photoId: 37,
    phone: '+231 77 555 2007', email: 'g.bestman@gmail.com',      occupation: 'Driver',     address: '9 Cotton Tree Road, Buchanan',
    lastContact: 'Mar 3, 2026',
    children: [
      { studentId: 'GB-24007', name: 'Daniel P. Bestman',   class: 'Grade 5A', feeStatus: 'Partial', attendance: 85, avgGrade: 'B-' },
      { studentId: 'GB-24035', name: 'Emmanuel M. Bestman', class: 'Grade 6B', feeStatus: 'Partial', attendance: 88, avgGrade: 'B'  },
    ],
  },
  {
    id: 8, parentId: 'PAR-008', name: 'Ruth A. Kerkula',        relationship: 'Mother',   gender: 'women', photoId: 62,
    phone: '+231 88 622 2008', email: 'r.kerkula@gmail.com',      occupation: 'Nurse',      address: '6 Lynch Street, Buchanan',
    lastContact: 'Mar 10, 2026',
    children: [
      { studentId: 'GB-24008', name: 'Rebecca A. Kerkula',  class: 'Grade 4A', feeStatus: 'Paid',   attendance: 98, avgGrade: 'A'  },
    ],
  },
  {
    id: 9, parentId: 'PAR-009', name: 'Agnes O. Tarr',          relationship: 'Mother',   gender: 'women', photoId: 71,
    phone: '+231 77 555 2009', email: 'a.tarr@gmail.com',          occupation: 'Seamstress', address: '2 Nelson Street, Buchanan',
    lastContact: 'Dec 10, 2025',
    children: [
      { studentId: 'GB-24009', name: 'James O. Tarr',       class: 'Grade 3A', feeStatus: 'Unpaid', attendance: 76, avgGrade: 'C'  },
      { studentId: 'GB-24038', name: 'Lorpu A. Tarr',       class: 'Grade 3B', feeStatus: 'Paid',   attendance: 97, avgGrade: 'A'  },
    ],
  },
  {
    id: 10, parentId: 'PAR-010', name: 'Peter K. Dennis',       relationship: 'Guardian', gender: 'men',   photoId: 22,
    phone: '+231 88 622 2010', email: 'p.dennis@gmail.com',       occupation: 'Security Guard', address: '17 Broad Street, Buchanan',
    lastContact: 'Mar 7, 2026',
    children: [
      { studentId: 'GB-24010', name: 'Martha K. Dennis',    class: 'Grade 2A', feeStatus: 'Paid',   attendance: 94, avgGrade: 'B+' },
    ],
  },
  {
    id: 11, parentId: 'PAR-011', name: 'Sarah G. Nyan',         relationship: 'Mother',   gender: 'women', photoId: 52,
    phone: '+231 77 555 2011', email: 's.nyan@gmail.com',          occupation: 'Market Woman', address: '11 Johnson Street, Buchanan',
    lastContact: 'Mar 4, 2026',
    children: [
      { studentId: 'GB-24011', name: 'Abraham G. Nyan',     class: 'Grade 9',  feeStatus: 'Paid',   attendance: 87, avgGrade: 'B'  },
    ],
  },
  {
    id: 12, parentId: 'PAR-012', name: 'Mark T. Mulbah',        relationship: 'Father',   gender: 'men',   photoId: 53,
    phone: '+231 88 622 2012', email: 'm.mulbah@gmail.com',        occupation: 'Police Officer', address: '33 Randall Street, Buchanan',
    lastContact: 'Mar 9, 2026',
    children: [
      { studentId: 'GB-24012', name: 'Lorpu T. Mulbah',     class: 'Grade 8B', feeStatus: 'Partial', attendance: 93, avgGrade: 'B+' },
    ],
  },
  {
    id: 13, parentId: 'PAR-013', name: 'Hannah C. Wleh',        relationship: 'Mother',   gender: 'women', photoId: 67,
    phone: '+231 77 555 2013', email: 'h.wleh@gmail.com',          occupation: 'Midwife',    address: '7 Camp Johnson Rd, Buchanan',
    lastContact: 'Feb 18, 2026',
    children: [
      { studentId: 'GB-24013', name: 'George C. Wleh',      class: 'Grade 7B', feeStatus: 'Unpaid', attendance: 80, avgGrade: 'C+' },
    ],
  },
  {
    id: 14, parentId: 'PAR-014', name: 'Francis A. Kamara',     relationship: 'Father',   gender: 'men',   photoId: 29,
    phone: '+231 88 622 2014', email: 'f.kamara@gmail.com',        occupation: 'Lawyer',     address: '4 Ashmun Street, Buchanan',
    lastContact: 'Mar 10, 2026',
    children: [
      { studentId: 'GB-24014', name: 'Miatta A. Kamara',    class: 'Grade 10', feeStatus: 'Paid',   attendance: 96, avgGrade: 'A-' },
    ],
  },
  {
    id: 15, parentId: 'PAR-015', name: 'Daniel N. Gbessay',     relationship: 'Father',   gender: 'men',   photoId: 41,
    phone: '+231 77 555 2015', email: 'd.gbessay@gmail.com',       occupation: 'Mechanic',   address: '29 Clay Street, Buchanan',
    lastContact: 'Jan 20, 2026',
    children: [
      { studentId: 'GB-24015', name: 'Moses D. Gbessay',    class: 'Grade 6B', feeStatus: 'Paid',   attendance: 89, avgGrade: 'B'  },
      { studentId: 'GB-24034', name: 'Patience T. Gbessay', class: 'Grade 7B', feeStatus: 'Paid',   attendance: 96, avgGrade: 'A-' },
    ],
  },
  {
    id: 16, parentId: 'PAR-016', name: 'Patricia J. Pewee',     relationship: 'Mother',   gender: 'women', photoId: 41,
    phone: '+231 88 622 2016', email: 'p.pewee@gmail.com',         occupation: 'Teacher',    address: '18 Gurley Street, Buchanan',
    lastContact: 'Mar 10, 2026',
    children: [
      { studentId: 'GB-24016', name: 'Satta J. Pewee',      class: 'Grade 5B', feeStatus: 'Paid',   attendance: 99, avgGrade: 'A'  },
    ],
  },
  {
    id: 17, parentId: 'PAR-017', name: 'Emmanuel T. Dolo',      relationship: 'Father',   gender: 'men',   photoId: 64,
    phone: '+231 77 555 2017', email: 'e.dolo@gmail.com',           occupation: 'Driver',     address: '22 Water Street, Buchanan',
    lastContact: 'Nov 5, 2025',
    children: [
      { studentId: 'GB-24017', name: 'Isaac T. Dolo',       class: 'Grade 4B', feeStatus: 'Unpaid', attendance: 72, avgGrade: 'D'  },
    ],
  },
  {
    id: 18, parentId: 'PAR-018', name: 'Raymond N. Fahnbulleh', relationship: 'Father',   gender: 'men',   photoId: 15,
    phone: '+231 88 622 2018', email: 'r.fahnbulleh@gmail.com',    occupation: 'Accountant', address: '5 Carey Avenue, Buchanan',
    lastContact: 'Mar 8, 2026',
    children: [
      { studentId: 'GB-24018', name: 'Victoria N. Fahnbulleh', class: 'Grade 3B', feeStatus: 'Paid', attendance: 91, avgGrade: 'B-' },
    ],
  },
  {
    id: 19, parentId: 'PAR-019', name: 'Kerkula P. Zinnah',     relationship: 'Father',   gender: 'men',   photoId: 57,
    phone: '+231 77 555 2019', email: 'k.zinnah@gmail.com',         occupation: 'Engineer',   address: '30 Factory Street, Buchanan',
    lastContact: 'Mar 10, 2026',
    children: [
      { studentId: 'GB-24019', name: 'Peter K. Zinnah Jr.', class: 'Grade 1A', feeStatus: 'Paid',   attendance: 95, avgGrade: 'A'  },
    ],
  },
  {
    id: 20, parentId: 'PAR-020', name: 'Helen E. Tokpah',       relationship: 'Mother',   gender: 'women', photoId: 46,
    phone: '+231 88 622 2020', email: 'h.tokpah@gmail.com',         occupation: 'Market Woman', address: '13 Benson Street, Buchanan',
    lastContact: 'Mar 6, 2026',
    children: [
      { studentId: 'GB-24020', name: 'Naomi E. Tokpah',     class: 'Grade 1B', feeStatus: 'Partial', attendance: 88, avgGrade: 'B'  },
    ],
  },
  {
    id: 21, parentId: 'PAR-021', name: 'Benjamin A. Nyenpan',   relationship: 'Father',   gender: 'men',   photoId: 19,
    phone: '+231 77 555 2021', email: 'b.nyenpan@gmail.com',        occupation: 'Contractor', address: '9 Buchanan Road, Buchanan',
    lastContact: 'Mar 9, 2026',
    children: [
      { studentId: 'GB-24021', name: 'Richard A. Nyenpan',  class: 'Grade 11–12 Combined', feeStatus: 'Paid', attendance: 90, avgGrade: 'B+' },
    ],
  },
  {
    id: 22, parentId: 'PAR-022', name: 'James H. Togba',        relationship: 'Father',   gender: 'men',   photoId: 35,
    phone: '+231 88 622 2022', email: 'j.togba@gmail.com',          occupation: 'Fisherman',  address: '6 Beach Road, Buchanan',
    lastContact: 'Mar 7, 2026',
    children: [
      { studentId: 'GB-24022', name: 'Florence G. Togba',   class: 'Grade 9',  feeStatus: 'Paid',   attendance: 94, avgGrade: 'A-' },
    ],
  },
  {
    id: 23, parentId: 'PAR-023', name: 'Rebecca B. Momo',       relationship: 'Mother',   gender: 'women', photoId: 63,
    phone: '+231 77 555 2023', email: 'r.momo@gmail.com',           occupation: 'Petty Trader', address: '11 Buchanan Highway',
    lastContact: 'Jan 30, 2026',
    children: [
      { studentId: 'GB-24023', name: 'Samuel B. Momo',      class: 'Grade 8A', feeStatus: 'Unpaid', attendance: 83, avgGrade: 'C'  },
    ],
  },
  {
    id: 24, parentId: 'PAR-024', name: 'Thomas A. Korlor',      relationship: 'Father',   gender: 'men',   photoId: 43,
    phone: '+231 88 622 2024', email: 't.korlor@gmail.com',         occupation: 'Soldier',    address: '24 Military Road, Buchanan',
    lastContact: 'Mar 10, 2026',
    children: [
      { studentId: 'GB-24024', name: 'Agnes T. Korlor',     class: 'Grade 7A', feeStatus: 'Paid',   attendance: 97, avgGrade: 'A'  },
    ],
  },
  {
    id: 25, parentId: 'PAR-025', name: 'Mary J. Freeman',       relationship: 'Mother',   gender: 'women', photoId: 27,
    phone: '+231 77 555 2025', email: 'm.freeman@gmail.com',        occupation: 'Secretary',  address: '8 Cheeseman Avenue, Buchanan',
    lastContact: 'Mar 4, 2026',
    children: [
      { studentId: 'GB-24025', name: 'Thomas J. Freeman',   class: 'Grade 6A', feeStatus: 'Partial', attendance: 86, avgGrade: 'B-' },
    ],
  },
  {
    id: 26, parentId: 'PAR-026', name: 'David M. Gaye',         relationship: 'Father',   gender: 'men',   photoId: 66,
    phone: '+231 88 622 2026', email: 'd.gaye@gmail.com',           occupation: 'Farmer',     address: '3 Cotton Field Road, Buchanan',
    lastContact: 'Mar 2, 2026',
    children: [
      { studentId: 'GB-24026', name: 'Hawa M. Gaye',        class: 'Grade 5A', feeStatus: 'Paid',   attendance: 92, avgGrade: 'B+' },
    ],
  },
  {
    id: 27, parentId: 'PAR-027', name: 'Sarah T. Karbo',        relationship: 'Guardian', gender: 'women', photoId: 58,
    phone: '+231 77 555 2027', email: 's.karbo@gmail.com',           occupation: 'Clerk',      address: '16 Water Street, Buchanan',
    lastContact: 'Nov 12, 2025',
    children: [
      { studentId: 'GB-24027', name: 'Patrick E. Karbo',    class: 'Grade 4A', feeStatus: 'Unpaid', attendance: 78, avgGrade: 'C+' },
    ],
  },
  {
    id: 28, parentId: 'PAR-028', name: 'Peter A. Wiah',         relationship: 'Father',   gender: 'men',   photoId: 73,
    phone: '+231 88 622 2028', email: 'p.wiah@gmail.com',            occupation: 'Pastor',     address: '20 Church Street, Buchanan',
    lastContact: 'Mar 10, 2026',
    children: [
      { studentId: 'GB-24028', name: 'Cecelia A. Wiah',     class: 'Grade 3A', feeStatus: 'Paid',   attendance: 100, avgGrade: 'A+' },
    ],
  },
  {
    id: 29, parentId: 'PAR-029', name: 'Korpo A. Brown',        relationship: 'Guardian', gender: 'women', photoId: 52,
    phone: '+231 77 555 2029', email: 'k.brown@gmail.com',           occupation: 'NGO Worker', address: '7 Independence Avenue, Buchanan',
    lastContact: 'Mar 1, 2026',
    children: [
      { studentId: 'GB-24029', name: 'David N. Nimley',     class: 'Grade 2A', feeStatus: 'Paid',   attendance: 90, avgGrade: 'B'  },
    ],
  },
  {
    id: 30, parentId: 'PAR-030', name: 'Martha T. Kollie',      relationship: 'Mother',   gender: 'women', photoId: 35,
    phone: '+231 88 622 2030', email: 'm.kollie@gmail.com',          occupation: 'Nurse Assistant', address: '5 Roberts Street, Buchanan',
    lastContact: 'Mar 9, 2026',
    children: [
      { studentId: 'GB-24030', name: 'Jenneh B. Kollie',    class: 'Grade 1A', feeStatus: 'Partial', attendance: 87, avgGrade: 'B-' },
    ],
  },
]

// ─── Attendance (daily records) ────────────────────────────────────────────

export const attendanceRecords = principalStudents.map((s, i) => ({
  studentId: s.studentId,
  name: s.name,
  class: s.class,
  status: i % 12 === 0 ? 'Absent' : i % 7 === 0 ? 'Late' : 'Present',
  recordedBy: principalTeachers[i % principalTeachers.length]?.name ?? 'System',
  timeLogged: i % 12 === 0 ? '—' : i % 7 === 0 ? '08:' + String(15 + (i % 20)).padStart(2,'0') + ' AM' : '07:' + String(45 + (i % 15)).padStart(2,'0') + ' AM',
  photoId: s.photoId,
  gender: s.gender === 'Male' ? 'men' : 'women',
}))

export const attendanceTrendData = [
  { day: 'Mon', students: 94, teachers: 96 },
  { day: 'Tue', students: 91, teachers: 93 },
  { day: 'Wed', students: 96, teachers: 100 },
  { day: 'Thu', students: 88, teachers: 89 },
  { day: 'Fri', students: 93, teachers: 93 },
]

export const classAttendanceData = [
  { class: 'Gr. 6',  pct: 96 },
  { class: 'Gr. 7',  pct: 94 },
  { class: 'Gr. 8',  pct: 92 },
  { class: 'Gr. 9',  pct: 91 },
  { class: 'Gr. 10', pct: 93 },
  { class: 'Gr. 11–12', pct: 88 },
]

// ─── Grades ────────────────────────────────────────────────────────────────

export const gradesData = principalStudents.slice(0, 30).map((s, i) => {
  const scores = [88, 72, 95, 61, 99, 78, 83, 67, 91, 74, 85, 56, 93, 80, 70, 97, 63, 88, 77, 92, 66, 84, 75, 90, 58, 96, 79, 87, 71, 94]
  const score = scores[i]
  const grade = score >= 80 ? 'A' : score >= 70 ? 'B' : score >= 60 ? 'C' : score >= 50 ? 'D' : 'F'
  const subjects = ['Mathematics', 'English', 'Science', 'Social Studies', 'Biology', 'Chemistry', 'Physics', 'French', 'History', 'ICT']
  return {
    studentId: s.studentId,
    name: s.name,
    class: s.class,
    subject: subjects[i % subjects.length],
    score,
    grade,
    term: '1st Semester',
    photoId: s.photoId,
    gender: s.gender === 'Male' ? 'men' : 'women',
  }
})

export const performanceTrendData = [
  { term: 'Sem 1 2023', avg: 72 },
  { term: 'Sem 2 2023', avg: 75 },
  { term: 'Sem 1 2024', avg: 74 },
  { term: 'Sem 2 2024', avg: 78 },
  { term: 'Sem 1 2025', avg: 81 },
  { term: 'Sem 2 2025', avg: 85 },
]

export const subjectPerformanceData = [
  { subject: 'Math',    avg: 76 },
  { subject: 'English', avg: 83 },
  { subject: 'Science', avg: 79 },
  { subject: 'History', avg: 85 },
  { subject: 'Biology', avg: 72 },
  { subject: 'Chemistry', avg: 68 },
  { subject: 'Physics', avg: 71 },
  { subject: 'ICT',     avg: 88 },
]

// ─── Finance / Fees ────────────────────────────────────────────────────────

export const financialSummary = {
  totalExpected: 192600,
  totalCollected: 174360,
  outstanding: 18240,
  collectionRate: 91,
}

export const feeRecords = principalStudents.map((s, i) => {
  const feeMap = { 'Paid': 300, 'Partial': 200, 'Unpaid': 0 }
  const paid = feeMap[s.feeStatus]
  return {
    studentId: s.studentId,
    name: s.name,
    class: s.class,
    feeAmount: 300,
    amountPaid: paid,
    balance: 300 - paid,
    status: s.feeStatus,
    paymentDate: paid > 0 ? `Feb ${10 + (i % 18)}, 2026` : '—',
    photoId: s.photoId,
    gender: s.gender === 'Male' ? 'men' : 'women',
  }
})

export const monthlyCollectionData = [
  { month: 'Sep',  collected: 28400 },
  { month: 'Oct',  collected: 31200 },
  { month: 'Nov',  collected: 29800 },
  { month: 'Dec',  collected: 18600 },
  { month: 'Jan',  collected: 32100 },
  { month: 'Feb',  collected: 34260 },
]

// ─── Timetable ─────────────────────────────────────────────────────────────

const TT_TEACHERS = {
  math: { name: 'Mary A. Johnson', short: 'Johnson' },
  eng:  { name: 'David K. Cooper', short: 'Cooper' },
  sci:  { name: 'Agnes T. Sumo',   short: 'Sumo' },
  ss:   { name: 'Robert G. Yarkpah', short: 'Yarkpah' },
  fr:   { name: 'Hawa N. Gbessay', short: 'Gbessay' },
  bio:  { name: 'Thomas J. Flomo', short: 'Flomo' },
  chem: { name: 'Cecelia M. Tarr', short: 'Tarr' },
  phy:  { name: 'George H. Bestman', short: 'Bestman' },
  ict:  { name: 'Emmanuel D. Toe', short: 'Toe' },
  hist: { name: 'Abraham C. Weah', short: 'Weah' },
  pe:   { name: 'Isaiah T. Kollie', short: 'Kollie' },
  eco:  { name: 'Jenneh D. Fahnbulleh', short: 'Fahnbulleh' },
}

export const timetableData = [
  {
    period: 'Period 1',
    time: '7:45 – 8:30 AM',
    monday:    { subject: 'Mathematics',    teacher: TT_TEACHERS.math, class: 'Grade 7A', room: '201' },
    tuesday:   { subject: 'English',        teacher: TT_TEACHERS.eng,  class: 'Grade 8A', room: '203' },
    wednesday: { subject: 'Science',        teacher: TT_TEACHERS.sci,  class: 'Grade 6B', room: '111' },
    thursday:  { subject: 'Mathematics',    teacher: TT_TEACHERS.math, class: 'Grade 5A', room: '108' },
    friday:    { subject: 'English',        teacher: TT_TEACHERS.eng,  class: 'Grade 7A', room: '201' },
  },
  {
    period: 'Period 2',
    time: '8:30 – 9:15 AM',
    monday:    { subject: 'English',        teacher: TT_TEACHERS.eng,  class: 'Grade 9',  room: '205' },
    tuesday:   { subject: 'Mathematics',    teacher: TT_TEACHERS.math, class: 'Grade 6A', room: '110' },
    wednesday: { subject: 'History',        teacher: TT_TEACHERS.hist, class: 'Grade 8B', room: '204' },
    thursday:  { subject: 'Science',        teacher: TT_TEACHERS.sci,  class: 'Grade 7B', room: '202' },
    friday:    { subject: 'Mathematics',    teacher: TT_TEACHERS.math, class: 'Grade 9',  room: '205' },
  },
  {
    period: 'Break',
    time: '9:15 – 9:30 AM',
    monday: null, tuesday: null, wednesday: null, thursday: null, friday: null,
  },
  {
    period: 'Period 3',
    time: '9:30 – 10:15 AM',
    monday:    { subject: 'Biology',        teacher: TT_TEACHERS.bio,  class: 'Grade 11–12 Combined', room: '302' },
    tuesday:   { subject: 'Chemistry',      teacher: TT_TEACHERS.chem, class: 'Grade 11–12 Combined', room: '302' },
    wednesday: { subject: 'Physics',        teacher: TT_TEACHERS.phy,  class: 'Grade 10', room: '301' },
    thursday:  { subject: 'Economics',      teacher: TT_TEACHERS.eco,  class: 'Grade 11–12 Combined', room: '302' },
    friday:    { subject: 'ICT',            teacher: TT_TEACHERS.ict,  class: 'Grade 10', room: '301' },
  },
  {
    period: 'Period 4',
    time: '10:15 – 11:00 AM',
    monday:    { subject: 'French',         teacher: TT_TEACHERS.fr,   class: 'Grade 8A', room: '203' },
    tuesday:   { subject: 'Social Studies', teacher: TT_TEACHERS.ss,   class: 'Grade 9',  room: '205' },
    wednesday: { subject: 'English',        teacher: TT_TEACHERS.eng,  class: 'Grade 10', room: '301' },
    thursday:  { subject: 'Biology',        teacher: TT_TEACHERS.bio,  class: 'Grade 10', room: '301' },
    friday:    { subject: 'French',         teacher: TT_TEACHERS.fr,   class: 'Grade 9',  room: '205' },
  },
  {
    period: 'Lunch',
    time: '11:00 AM – 12:00 PM',
    monday: null, tuesday: null, wednesday: null, thursday: null, friday: null,
  },
  {
    period: 'Period 5',
    time: '12:00 – 12:45 PM',
    monday:    { subject: 'ICT',            teacher: TT_TEACHERS.ict,  class: 'Grade 9',  room: '205' },
    tuesday:   { subject: 'Biology',        teacher: TT_TEACHERS.bio,  class: 'Grade 12', room: '302' },
    wednesday: { subject: 'Mathematics',    teacher: TT_TEACHERS.math, class: 'Grade 10', room: '301' },
    thursday:  { subject: 'English',        teacher: TT_TEACHERS.eng,  class: 'Grade 8B', room: '204' },
    friday:    { subject: 'Social Studies', teacher: TT_TEACHERS.ss,   class: 'Grade 8A', room: '203' },
  },
  {
    period: 'Period 6',
    time: '12:45 – 1:30 PM',
    monday:    { subject: 'Physical Ed.',   teacher: TT_TEACHERS.pe,   class: 'Grade 10', room: 'Field' },
    tuesday:   { subject: 'ICT',            teacher: TT_TEACHERS.ict,  class: 'Grade 10', room: '301' },
    wednesday: { subject: 'Chemistry',      teacher: TT_TEACHERS.chem, class: 'Grade 12', room: '302' },
    thursday:  { subject: 'Physical Ed.',   teacher: TT_TEACHERS.pe,   class: 'Grade 11', room: 'Field' },
    friday:    { subject: 'Economics',      teacher: TT_TEACHERS.eco,  class: 'Grade 12', room: '302' },
  },
]

// ─── Per-Class Timetables ────────────────────────────────────────────────────

const T = {
  johnson:    { name: 'Mary A. Johnson',     short: 'Johnson',    gender: 'women', photoId: 44 },
  cooper:     { name: 'David K. Cooper',     short: 'Cooper',     gender: 'men',   photoId: 32 },
  sumo:       { name: 'Agnes T. Sumo',       short: 'Sumo',       gender: 'women', photoId: 55 },
  yarkpah:    { name: 'Robert G. Yarkpah',   short: 'Yarkpah',    gender: 'men',   photoId: 61 },
  dennis:     { name: 'Florence B. Dennis',  short: 'Dennis',     gender: 'women', photoId: 38 },
  kollie:     { name: 'Samuel E. Kollie',    short: 'Kollie',     gender: 'men',   photoId: 22 },
  wleh:       { name: 'Patricia W. Wleh',    short: 'Wleh',       gender: 'women', photoId: 62 },
  flomo:      { name: 'Thomas J. Flomo',     short: 'Flomo',      gender: 'men',   photoId: 48 },
  tarr:       { name: 'Cecelia M. Tarr',     short: 'Tarr',       gender: 'women', photoId: 71 },
  bestman:    { name: 'George H. Bestman',   short: 'Bestman',    gender: 'men',   photoId: 37 },
  gbessay:    { name: 'Hawa N. Gbessay',     short: 'Gbessay',    gender: 'women', photoId: 52 },
  weah:       { name: 'Abraham C. Weah',     short: 'Weah',       gender: 'men',   photoId: 53 },
  mulbah:     { name: 'Lorpu S. Mulbah',     short: 'Mulbah',     gender: 'women', photoId: 67 },
  toe:        { name: 'Emmanuel D. Toe',     short: 'Toe',        gender: 'men',   photoId: 29 },
  nimley:     { name: 'Rebecca A. Nimley',   short: 'Nimley',     gender: 'women', photoId: 41 },
  kerkula:    { name: 'John T. Kerkula',     short: 'Kerkula',    gender: 'men',   photoId: 64 },
  gaye:       { name: 'Miatta E. Gaye',      short: 'Gaye',       gender: 'women', photoId: 46 },
  dokie:      { name: 'Isaac P. Dokie',      short: 'Dokie',      gender: 'men',   photoId: 15 },
  wiah:       { name: 'Satta K. Wiah',       short: 'Wiah',       gender: 'women', photoId: 58 },
  togba:      { name: 'Moses B. Togba',      short: 'Togba',      gender: 'men',   photoId: 71 },
  fahnbulleh: { name: 'Jenneh D. Fahnbulleh',short: 'Fahnbulleh', gender: 'women', photoId: 73 },
  nyenpan:    { name: 'Daniel O. Nyenpan',   short: 'Nyenpan',    gender: 'men',   photoId: 19 },
  kollie2:    { name: 'Isaiah T. Kollie',    short: 'I. Kollie',  gender: 'men',   photoId: 43 },
  momo:       { name: 'Korpo A. Momo',       short: 'Momo',       gender: 'women', photoId: 63 },
}

function cls(subject, teacher, room) { return { subject, teacher, room } }

const PERIODS = [
  { period: 'Period 1', time: '7:45 – 8:30 AM' },
  { period: 'Period 2', time: '8:30 – 9:15 AM' },
  { period: 'Break',    time: '9:15 – 9:30 AM',    isBreak: true },
  { period: 'Period 3', time: '9:30 – 10:15 AM' },
  { period: 'Period 4', time: '10:15 – 11:00 AM' },
  { period: 'Lunch',    time: '11:00 AM – 12:00 PM', isBreak: true },
  { period: 'Period 5', time: '12:00 – 12:45 PM' },
  { period: 'Period 6', time: '12:45 – 1:30 PM' },
]

export const classTimetables = {
  'Grade 1A': PERIODS.map((p, i) => !p.isBreak ? { ...p, mon: [cls('Literacy', T.nimley, '101'), cls('Numeracy', T.nimley, '101'), cls('Handwriting', T.nimley, '101'), cls('Phonics', T.nimley, '101'), cls('Arts & Crafts', T.nimley, '101'), cls('Music & Arts', T.mulbah, '101')][i < 2 ? i : i > 2 ? i - 1 : 0], tue: [cls('Numeracy', T.nimley, '101'), cls('Literacy', T.nimley, '101'), cls('Science', T.nimley, '101'), cls('Social Studies', T.nimley, '101'), cls('Music & Arts', T.mulbah, '101'), cls('PE', T.dennis, 'Field')][i < 2 ? i : i > 2 ? i - 1 : 0], wed: [cls('Phonics', T.nimley, '101'), cls('Numeracy', T.nimley, '101'), cls('Literacy', T.nimley, '101'), cls('Arts & Crafts', T.nimley, '101'), cls('Handwriting', T.nimley, '101'), cls('Science', T.nimley, '101')][i < 2 ? i : i > 2 ? i - 1 : 0], thu: [cls('Literacy', T.nimley, '101'), cls('Phonics', T.nimley, '101'), cls('Numeracy', T.nimley, '101'), cls('Music & Arts', T.mulbah, '101'), cls('Social Studies', T.nimley, '101'), cls('Arts & Crafts', T.nimley, '101')][i < 2 ? i : i > 2 ? i - 1 : 0], fri: [cls('Numeracy', T.nimley, '101'), cls('Handwriting', T.nimley, '101'), cls('PE', T.dennis, 'Field'), cls('Literacy', T.nimley, '101'), cls('Arts & Crafts', T.nimley, '101'), cls('Music & Arts', T.mulbah, '101')][i < 2 ? i : i > 2 ? i - 1 : 0] } : p),
  'Grade 7A': [
    { ...PERIODS[0], mon: cls('Mathematics',  T.johnson, '108'), tue: cls('English',      T.cooper,  '201'), wed: cls('Social Studies', T.yarkpah, '202'), thu: cls('Mathematics',  T.johnson, '108'), fri: cls('English',      T.cooper,  '201') },
    { ...PERIODS[1], mon: cls('History',      null,    '202'), tue: cls('Science',      T.sumo,    '111'), wed: cls('Mathematics',  T.johnson, '108'), thu: cls('French',       T.gbessay, '203'), fri: cls('History',      null,    '202') },
    PERIODS[2],
    { ...PERIODS[3], mon: cls('French',       T.gbessay, '203'), tue: cls('Mathematics',  T.johnson, '108'), wed: cls('English',      T.cooper,  '201'), thu: cls('Science',      T.sumo,    '111'), fri: cls('Civic Education', T.momo, '202') },
    { ...PERIODS[4], mon: cls('Science',      T.sumo,    '111'), tue: cls('Civic Education', T.momo, '202'), wed: cls('ICT',          T.toe,     '301'), thu: cls('English',      T.cooper,  '201'), fri: cls('Mathematics',  T.johnson, '108') },
    PERIODS[5],
    { ...PERIODS[6], mon: cls('ICT',          T.toe,     '301'), tue: cls('Agriculture',  T.nyenpan, 'Garden'), wed: cls('History',    null,    '202'), thu: cls('Social Studies', T.yarkpah, '202'), fri: cls('Civic Education', T.momo, '202') },
    { ...PERIODS[7], mon: cls('PE',           T.kollie2, 'Field'), tue: cls('French',     T.gbessay, '203'), wed: cls('PE',          T.kollie2, 'Field'), thu: cls('Agriculture',  T.nyenpan, 'Garden'), fri: cls('Science',      T.sumo,    '111') },
  ],
  'Grade 7B': [
    { ...PERIODS[0], mon: cls('English',      T.cooper,  '201'), tue: cls('Mathematics',  T.johnson, '108'), wed: cls('Agriculture',  T.nyenpan, 'Garden'), thu: cls('Science',      T.sumo,    '111'), fri: cls('Social Studies', T.yarkpah, '202') },
    { ...PERIODS[1], mon: cls('Science',      T.sumo,    '111'), tue: cls('History',      null,    '202'), wed: cls('English',      T.cooper,  '201'), thu: cls('Mathematics',  T.johnson, '108'), fri: cls('French',       T.gbessay, '203') },
    PERIODS[2],
    { ...PERIODS[3], mon: cls('Mathematics',  T.johnson, '108'), tue: cls('Social Studies', T.yarkpah, '202'), wed: cls('Science',    T.sumo,    '111'), thu: cls('English',      T.cooper,  '201'), fri: cls('Mathematics',  T.johnson, '108') },
    { ...PERIODS[4], mon: cls('ICT',          T.toe,     '301'), tue: cls('English',      T.cooper,  '201'), wed: cls('Civic Education', T.momo, '202'), thu: cls('Agriculture',  T.nyenpan, 'Garden'), fri: cls('History',      null,    '202') },
    PERIODS[5],
    { ...PERIODS[6], mon: cls('Agriculture',  T.nyenpan, 'Garden'), tue: cls('French',    T.gbessay, '203'), wed: cls('Mathematics',  T.johnson, '108'), thu: cls('ICT',          T.toe,     '301'), fri: cls('Civic Education', T.momo, '202') },
    { ...PERIODS[7], mon: cls('Social Studies', T.yarkpah, '202'), tue: cls('PE',         T.kollie2, 'Field'), wed: cls('French',     T.gbessay, '203'), thu: cls('PE',           T.kollie2, 'Field'), fri: cls('ICT',          T.toe,     '301') },
  ],
  'Grade 8A': [
    { ...PERIODS[0], mon: cls('Mathematics',  T.johnson, '108'), tue: cls('English',      T.cooper,  '203'), wed: cls('French',       T.gbessay, '203'), thu: cls('Science',      T.sumo,    '111'), fri: cls('Mathematics',  T.johnson, '108') },
    { ...PERIODS[1], mon: cls('English',      T.cooper,  '203'), tue: cls('Agriculture',  T.nyenpan, 'Garden'), wed: cls('Mathematics', T.johnson, '108'), thu: cls('History',    null,    '204'), fri: cls('Social Studies', T.yarkpah, '204') },
    PERIODS[2],
    { ...PERIODS[3], mon: cls('French',       T.gbessay, '203'), tue: cls('Mathematics',  T.johnson, '108'), wed: cls('Social Studies', T.yarkpah, '204'), thu: cls('English',    T.cooper,  '203'), fri: cls('Science',      T.sumo,    '111') },
    { ...PERIODS[4], mon: cls('Science',      T.sumo,    '111'), tue: cls('ICT',          T.toe,     '301'), wed: cls('Agriculture',  T.nyenpan, 'Garden'), thu: cls('Mathematics', T.johnson, '108'), fri: cls('English',      T.cooper,  '203') },
    PERIODS[5],
    { ...PERIODS[6], mon: cls('History',      null,    '204'), tue: cls('Social Studies', T.yarkpah, '204'), wed: cls('English',    T.cooper,  '203'), thu: cls('French',       T.gbessay, '203'), fri: cls('Social Studies', T.yarkpah, '204') },
    { ...PERIODS[7], mon: cls('PE',           T.kollie2, 'Field'), tue: cls('Science',    T.sumo,    '111'), wed: cls('PE',          T.kollie2, 'Field'), thu: cls('Agriculture',  T.nyenpan, 'Garden'), fri: cls('ICT',          T.toe,     '301') },
  ],
  'Grade 8B': [
    { ...PERIODS[0], mon: cls('Social Studies', T.yarkpah, '204'), tue: cls('Mathematics', T.johnson, '108'), wed: cls('English',     T.cooper,  '203'), thu: cls('Science',      T.sumo,    '111'), fri: cls('History',      null,    '204') },
    { ...PERIODS[1], mon: cls('Mathematics',  T.johnson, '108'), tue: cls('English',      T.cooper,  '203'), wed: cls('History',      null,    '204'), thu: cls('Social Studies', T.yarkpah, '204'), fri: cls('Mathematics',  T.johnson, '108') },
    PERIODS[2],
    { ...PERIODS[3], mon: cls('Science',      T.sumo,    '111'), tue: cls('History',      null,    '204'), wed: cls('Mathematics',  T.johnson, '108'), thu: cls('Agriculture',  T.nyenpan, 'Garden'), fri: cls('English',      T.cooper,  '203') },
    { ...PERIODS[4], mon: cls('English',      T.cooper,  '203'), tue: cls('Social Studies', T.yarkpah, '204'), wed: cls('Science',    T.sumo,    '111'), thu: cls('English',      T.cooper,  '203'), fri: cls('Agriculture',  T.nyenpan, 'Garden') },
    PERIODS[5],
    { ...PERIODS[6], mon: cls('Agriculture',  T.nyenpan, 'Garden'), tue: cls('ICT',       T.toe,     '301'), wed: cls('Social Studies', T.yarkpah, '204'), thu: cls('Mathematics', T.johnson, '108'), fri: cls('Science',      T.sumo,    '111') },
    { ...PERIODS[7], mon: cls('ICT',          T.toe,     '301'), tue: cls('PE',           T.kollie2, 'Field'), wed: cls('Agriculture', T.nyenpan, 'Garden'), thu: cls('PE',        T.kollie2, 'Field'), fri: cls('ICT',          T.toe,     '301') },
  ],
  'Grade 9': [
    { ...PERIODS[0], mon: cls('Mathematics',  T.kollie,  '205'), tue: cls('English',      T.cooper,  '205'), wed: cls('Chemistry',    T.tarr,    '302'), thu: cls('Mathematics',  T.kollie,  '205'), fri: cls('Physics',      T.bestman, '301') },
    { ...PERIODS[1], mon: cls('English',      T.cooper,  '205'), tue: cls('Mathematics',  T.kollie,  '205'), wed: cls('Biology',      T.flomo,   '302'), thu: cls('Social Studies', T.yarkpah, '205'), fri: cls('Mathematics',  T.kollie,  '205') },
    PERIODS[2],
    { ...PERIODS[3], mon: cls('Biology',      T.flomo,   '302'), tue: cls('Social Studies', T.yarkpah, '205'), wed: cls('Mathematics', T.kollie,  '205'), thu: cls('Chemistry',    T.tarr,    '302'), fri: cls('French',       T.gbessay, '203') },
    { ...PERIODS[4], mon: cls('Chemistry',    T.tarr,    '302'), tue: cls('ICT',          T.toe,     '301'), wed: cls('English',      T.cooper,  '205'), thu: cls('Biology',      T.flomo,   '302'), fri: cls('Social Studies', T.yarkpah, '205') },
    PERIODS[5],
    { ...PERIODS[6], mon: cls('ICT',          T.toe,     '301'), tue: cls('Physics',      T.bestman, '301'), wed: cls('Social Studies', T.yarkpah, '205'), thu: cls('English',    T.cooper,  '205'), fri: cls('Biology',      T.flomo,   '302') },
    { ...PERIODS[7], mon: cls('French',       T.gbessay, '203'), tue: cls('Chemistry',    T.tarr,    '302'), wed: cls('ICT',          T.toe,     '301'), thu: cls('French',       T.gbessay, '203'), fri: cls('Chemistry',    T.tarr,    '302') },
  ],
  'Grade 10': [
    { ...PERIODS[0], mon: cls('Mathematics',  T.kollie,  '301'), tue: cls('English',      T.wleh,    '301'), wed: cls('Physics',      T.bestman, '301'), thu: cls('Biology',      T.flomo,   '302'), fri: cls('Mathematics',  T.kollie,  '301') },
    { ...PERIODS[1], mon: cls('English',      T.wleh,    '301'), tue: cls('Mathematics',  T.kollie,  '301'), wed: cls('Chemistry',    T.tarr,    '302'), thu: cls('Physics',      T.bestman, '301'), fri: cls('English',      T.wleh,    '301') },
    PERIODS[2],
    { ...PERIODS[3], mon: cls('Physics',      T.bestman, '301'), tue: cls('Biology',      T.flomo,   '302'), wed: cls('English',      T.wleh,    '301'), thu: cls('Mathematics',  T.kollie,  '301'), fri: cls('ICT',          T.toe,     '301') },
    { ...PERIODS[4], mon: cls('Biology',      T.flomo,   '302'), tue: cls('ICT',          T.toe,     '301'), wed: cls('Mathematics',  T.kollie,  '301'), thu: cls('Chemistry',    T.tarr,    '302'), fri: cls('Physics',      T.bestman, '301') },
    PERIODS[5],
    { ...PERIODS[6], mon: cls('Chemistry',    T.tarr,    '302'), tue: cls('Physics',      T.bestman, '301'), wed: cls('ICT',          T.toe,     '301'), thu: cls('English',      T.wleh,    '301'), fri: cls('Biology',      T.flomo,   '302') },
    { ...PERIODS[7], mon: cls('PE',           T.kollie2, 'Field'), tue: cls('ICT',        T.toe,     '301'), wed: cls('PE',          T.kollie2, 'Field'), thu: cls('ICT',          T.toe,     '301'), fri: cls('Mathematics',  T.kollie,  '301') },
  ],
  'Grade 11': [
    { ...PERIODS[0], mon: cls('Mathematics',  T.kollie,  '302'), tue: cls('Biology',      T.flomo,   '302'), wed: cls('Economics',    T.fahnbulleh, '303'), thu: cls('English Literature', T.wleh, '303'), fri: cls('Chemistry',    T.tarr,    '302') },
    { ...PERIODS[1], mon: cls('English Literature', T.wleh, '303'), tue: cls('Chemistry', T.tarr,    '302'), wed: cls('Mathematics',  T.kollie,  '302'), thu: cls('Biology',      T.flomo,   '302'), fri: cls('Economics',    T.fahnbulleh, '303') },
    PERIODS[2],
    { ...PERIODS[3], mon: cls('Chemistry',    T.tarr,    '302'), tue: cls('Economics',    T.fahnbulleh, '303'), wed: cls('Biology',    T.flomo,   '302'), thu: cls('Mathematics',  T.kollie,  '302'), fri: cls('English Literature', T.wleh, '303') },
    { ...PERIODS[4], mon: cls('Biology',      T.flomo,   '302'), tue: cls('Mathematics',  T.kollie,  '302'), wed: cls('English Literature', T.wleh, '303'), thu: cls('Economics',  T.fahnbulleh, '303'), fri: cls('Biology',      T.flomo,   '302') },
    PERIODS[5],
    { ...PERIODS[6], mon: cls('Economics',    T.fahnbulleh, '303'), tue: cls('English Literature', T.wleh, '303'), wed: cls('Chemistry', T.tarr,   '302'), thu: cls('Biology',      T.flomo,   '302'), fri: cls('Mathematics',  T.kollie,  '302') },
    { ...PERIODS[7], mon: cls('PE',           T.kollie2, 'Field'), tue: cls('Chemistry',  T.tarr,    '302'), wed: cls('PE',          T.kollie2, 'Field'), thu: cls('Mathematics',  T.kollie,  '302'), fri: cls('Economics',    T.fahnbulleh, '303') },
  ],
  'Grade 12': [
    { ...PERIODS[0], mon: cls('Mathematics',  T.kollie,  '302'), tue: cls('Biology',      T.flomo,   '302'), wed: cls('Chemistry',    T.tarr,    '302'), thu: cls('Physics',      T.bestman, '301'), fri: cls('Economics',    T.fahnbulleh, '303') },
    { ...PERIODS[1], mon: cls('English Literature', T.wleh, '303'), tue: cls('Chemistry', T.tarr,    '302'), wed: cls('Biology',      T.flomo,   '302'), thu: cls('Economics',    T.fahnbulleh, '303'), fri: cls('Mathematics',  T.kollie,  '302') },
    PERIODS[2],
    { ...PERIODS[3], mon: cls('Chemistry',    T.tarr,    '302'), tue: cls('Physics',      T.bestman, '301'), wed: cls('English Literature', T.wleh, '303'), thu: cls('Biology',    T.flomo,   '302'), fri: cls('Physics',      T.bestman, '301') },
    { ...PERIODS[4], mon: cls('Biology',      T.flomo,   '302'), tue: cls('Economics',    T.fahnbulleh, '303'), wed: cls('Mathematics', T.kollie, '302'), thu: cls('Chemistry',   T.tarr,    '302'), fri: cls('English Literature', T.wleh, '303') },
    PERIODS[5],
    { ...PERIODS[6], mon: cls('Physics',      T.bestman, '301'), tue: cls('Mathematics',  T.kollie,  '302'), wed: cls('Economics',    T.fahnbulleh, '303'), thu: cls('English Literature', T.wleh, '303'), fri: cls('Biology',      T.flomo,   '302') },
    { ...PERIODS[7], mon: cls('Economics',    T.fahnbulleh, '303'), tue: cls('English Literature', T.wleh, '303'), wed: cls('Physics',  T.bestman, '301'), thu: cls('Mathematics',  T.kollie,  '302'), fri: cls('Chemistry',    T.tarr,    '302') },
  ],
}

// Fill in basic schedules for remaining classes using class teacher
;['Grade 1B','Grade 2A','Grade 3A','Grade 3B','Grade 4A','Grade 4B','Grade 5A','Grade 5B','Grade 6A','Grade 6B'].forEach(g => {
  const baseTeacher = {
    'Grade 1B': T.nimley, 'Grade 2A': T.kerkula, 'Grade 3A': T.gaye, 'Grade 3B': T.gaye,
    'Grade 4A': T.dokie,  'Grade 4B': T.dokie,   'Grade 5A': T.wiah, 'Grade 5B': T.dennis,
    'Grade 6A': T.togba,  'Grade 6B': T.togba,
  }[g]
  const rm = { 'Grade 1B':'102','Grade 2A':'103','Grade 3A':'104','Grade 3B':'105','Grade 4A':'106','Grade 4B':'107','Grade 5A':'108','Grade 5B':'109','Grade 6A':'110','Grade 6B':'111' }[g]
  const subjects = ['Literacy', 'Numeracy', 'Science', 'Social Studies', 'Health', 'Music & Arts']
  const days = ['mon','tue','wed','thu','fri']
  classTimetables[g] = PERIODS.map((p, pi) => {
    if (p.isBreak) return p
    const row = { ...p }
    days.forEach((d, di) => { row[d] = cls(subjects[(pi > 2 ? pi - 1 : pi + di) % subjects.length], baseTeacher, rm) })
    return row
  })
})

// ─── Communications ────────────────────────────────────────────────────────

export const principalMessages = [
  {
    id: 1, contact: 'Mary A. Johnson', role: 'Math Teacher', gender: 'women', photoId: 44, unread: 2,
    messages: [
      { from: 'them', text: 'Good morning Principal Freeman. Grade 6 students will be taking their mathematics exam tomorrow.', time: '7:50 AM' },
      { from: 'me',   text: 'Thank you, Mary. Please ensure the exam papers are ready by 7:30 AM.', time: '8:05 AM' },
      { from: 'them', text: 'Understood. I will also need extra answer sheets for Grade 6A.', time: '8:10 AM' },
      { from: 'them', text: 'Should I send the exam schedule to parents via SMS?', time: '8:12 AM' },
    ],
  },
  {
    id: 2, contact: 'Sarah K. Doe', role: 'Parent – Emmanuel Doe', gender: 'women', photoId: 56, unread: 1,
    messages: [
      { from: 'them', text: 'Hello admin, I would like to confirm if the tuition payment for my child Emmanuel was received last week.', time: 'Mon 2:30 PM' },
      { from: 'me',   text: 'Good afternoon. Yes, we received a partial payment of $200 on Feb 18. The remaining balance is $100.', time: 'Mon 3:15 PM' },
      { from: 'them', text: 'Thank you. I will complete the payment by end of this month.', time: 'Mon 3:20 PM' },
      { from: 'them', text: 'Is it possible to pay in installments?', time: 'Mon 3:22 PM' },
    ],
  },
  {
    id: 3, contact: 'David K. Cooper', role: 'English Teacher', gender: 'men', photoId: 32, unread: 0,
    messages: [
      { from: 'them', text: 'Principal, I need to request 3 days of personal leave from March 15–17.', time: 'Tue 9:00 AM' },
      { from: 'me',   text: 'I have noted your request, Mr. Cooper. Please submit the formal leave form to the admin office.', time: 'Tue 10:30 AM' },
      { from: 'them', text: 'Thank you. I will submit it today.', time: 'Tue 10:45 AM' },
    ],
  },
  {
    id: 4, contact: 'Agnes T. Sumo', role: 'Science Teacher', gender: 'women', photoId: 55, unread: 0,
    messages: [
      { from: 'them', text: 'Good afternoon. Science lab equipment for Grade 7 is missing. Two microscopes are unaccounted for.', time: 'Wed 1:00 PM' },
      { from: 'me',   text: 'Thank you for reporting this, Agnes. Please file an equipment loss report and I will follow up.', time: 'Wed 1:45 PM' },
    ],
  },
  {
    id: 5, contact: 'DEO Office – Grand Bassa', role: 'District Education Office', gender: 'men', photoId: 71, unread: 3,
    messages: [
      { from: 'them', text: 'Dear Principal Freeman, your Q1 teacher performance reports are due by March 20, 2026.', time: 'Thu 8:00 AM' },
      { from: 'them', text: 'Please ensure all attendance records are submitted through the NEMIS portal.', time: 'Thu 8:02 AM' },
      { from: 'me',   text: 'Understood. We will compile and submit all required reports before the deadline.', time: 'Thu 9:30 AM' },
      { from: 'them', text: 'A compliance review visit is also scheduled for March 25. Please prepare accordingly.', time: 'Thu 11:00 AM' },
      { from: 'them', text: 'Thank you for your prompt response.', time: 'Thu 11:10 AM' },
      { from: 'them', text: 'Note: Enrollment data must also be updated in the system.', time: 'Thu 11:12 AM' },
    ],
  },
]

export const principalNotifications = [
  { id: 1, title: 'Q1 Reports Due March 20', message: 'All teacher performance and attendance reports must be submitted to the DEO office by March 20, 2026.', time: '2h ago', read: false, type: 'warning' },
  { id: 2, title: 'Compliance Visit Scheduled', message: 'A DEO compliance review visit is scheduled for March 25. Ensure all records and facilities are in order.', time: '4h ago', read: false, type: 'alert' },
  { id: 3, title: 'Fee Collection Update', message: '91% fee collection rate achieved for 1st Semester. Outstanding balance: $18,240. Follow up with families.', time: 'Yesterday', read: false, type: 'info' },
  { id: 4, title: 'Teacher Leave Request', message: 'Mr. David K. Cooper has submitted a leave request for March 15–17. Review required.', time: 'Mar 11', read: true, type: 'info' },
  { id: 5, title: 'Science Lab Incident', message: 'Two microscopes are unaccounted for in the science lab. Equipment loss report filed by Ms. Agnes Sumo.', time: 'Mar 10', read: true, type: 'warning' },
  { id: 6, title: 'Student Enrollment Updated', message: '4 new student enrollments have been entered into the NEMIS system for Grade 1.', time: 'Mar 9', read: true, type: 'info' },
]

// ─── Recent Activities ──────────────────────────────────────────────────────

export const recentActivities = [
  { id: 1, date: 'Mar 12, 2026', action: 'Grade 9 exam results uploaded',      actor: 'Samuel E. Kollie',  role: 'Teacher',   status: 'Completed' },
  { id: 2, date: 'Mar 12, 2026', action: 'New student admitted',               actor: 'Admin',             role: 'Admin',     status: 'Approved'  },
  { id: 3, date: 'Mar 11, 2026', action: 'Teacher leave request',              actor: 'David K. Cooper',   role: 'Teacher',   status: 'Pending'   },
  { id: 4, date: 'Mar 11, 2026', action: 'Parent message received',            actor: 'Sarah K. Doe',      role: 'Parent',    status: 'Pending'   },
  { id: 5, date: 'Mar 10, 2026', action: 'Attendance report submitted',        actor: 'Mary A. Johnson',   role: 'Teacher',   status: 'Approved'  },
  { id: 6, date: 'Mar 10, 2026', action: 'Science lab equipment reported missing', actor: 'Agnes T. Sumo', role: 'Teacher',   status: 'Pending'   },
  { id: 7, date: 'Mar 9, 2026',  action: 'Tuition fee collected',              actor: 'Finance Office',    role: 'Admin',     status: 'Completed' },
  { id: 8, date: 'Mar 8, 2026',  action: 'Timetable updated – Grade 10',      actor: 'Principal Freeman', role: 'Principal', status: 'Completed' },
]

export const upcomingEvents = [
  { id: 1, event: 'Midterm Examinations',     date: 'Mar 18–22, 2026', type: 'Academic' },
  { id: 2, event: 'PTA General Meeting',      date: 'Mar 28, 2026',   type: 'Community' },
  { id: 3, event: 'Sports Day',               date: 'Apr 5, 2026',    type: 'Activity' },
  { id: 4, event: 'DEO Compliance Visit',     date: 'Mar 25, 2026',   type: 'Compliance' },
  { id: 5, event: 'National Literacy Week',   date: 'Apr 14–18, 2026',type: 'National' },
  { id: 6, event: '1st Semester Report Card Day', date: 'Apr 25, 2026', type: 'Academic' },
]

// ─── Safety & Compliance ────────────────────────────────────────────────────

export const complianceItems = [
  { id: 1, label: 'Student Data Updated in NEMIS',     status: 'Compliant', date: 'Mar 10, 2026' },
  { id: 2, label: 'Teacher Records Submitted',         status: 'Compliant', date: 'Mar 10, 2026' },
  { id: 3, label: 'Monthly Attendance Report',         status: 'Compliant', date: 'Mar 1, 2026' },
  { id: 4, label: 'Q1 Academic Performance Report',   status: 'Pending',   date: 'Due Mar 20, 2026' },
  { id: 5, label: 'Teacher Qualification Verification',status: 'Compliant', date: 'Feb 28, 2026' },
  { id: 6, label: 'Safety & Infrastructure Inspection',status: 'Pending',   date: 'Due Mar 30, 2026' },
  { id: 7, label: 'Ministry Endorsement Renewal',      status: 'Compliant', date: 'Jan 15, 2026' },
  { id: 8, label: 'Fee Collection Report Submitted',   status: 'Compliant', date: 'Mar 5, 2026' },
]

export const safetyDrills = [
  { id: 1, type: 'Fire Drill',      date: 'Mar 5, 2026',  participants: 'All students & staff', outcome: 'Completed — 4 min 22 sec evacuation' },
  { id: 2, type: 'Lockdown Drill',  date: 'Feb 12, 2026', participants: 'All students & staff', outcome: 'Completed — All clear in 3 min 10 sec' },
  { id: 3, type: 'First Aid Drill', date: 'Jan 20, 2026', participants: 'Teaching staff',        outcome: 'Completed — 28 staff trained' },
]

export const incidentReports = [
  { id: 1, date: 'Mar 10, 2026', type: 'Equipment Loss',    description: 'Two microscopes unaccounted for in science lab.', reportedBy: 'Agnes T. Sumo',   status: 'Open'   },
  { id: 2, date: 'Feb 22, 2026', type: 'Student Injury',    description: 'Minor leg injury during Grade 8 sports practice.', reportedBy: 'Isaiah T. Kollie', status: 'Closed' },
  { id: 3, date: 'Feb 5, 2026',  type: 'Property Damage',   description: 'Classroom window broken in Room 204 during storm.', reportedBy: 'Admin',           status: 'Closed' },
]
