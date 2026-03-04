// ─── Minister of Education – National Mock Data (Liberia) ─────────────────

export const ministerProfile = {
  name: 'Hon. Dr. Beatrice M. Karnga',
  firstName: 'Dr. Karnga',
  title: 'Minister of Education',
  ministry: 'Ministry of Education – Republic of Liberia',
  employeeId: 'MOE-MIN-001',
  phone: '+231-886-000-001',
  email: 'minister@moe.gov.lr',
  office: 'Capitol Hill, Monrovia, Montserrado County',
  gender: 'women',
  photoId: 44,
}

// ─── Counties (15) ────────────────────────────────────────────────────────
export const counties = [
  { id: 'C01', name: 'Montserrado',  ceo: 'Dr. Moses A. Peabody',     districts: 13, schools: 612, students: 284320, teachers: 8210, attendance: 87, performance: 76, compliance: 91, infraAlerts: 2, status: 'Healthy',         gender: 'men',   photoId: 22 },
  { id: 'C02', name: 'Nimba',        ceo: 'Mrs. Comfort J. Ganta',     districts: 12, schools: 418, students: 181250, teachers: 5640, attendance: 82, performance: 71, compliance: 85, infraAlerts: 3, status: 'Healthy',         gender: 'women', photoId: 35 },
  { id: 'C03', name: 'Lofa',         ceo: 'Mr. Patrick K. Kollie',     districts: 11, schools: 289, students: 112400, teachers: 3820, attendance: 78, performance: 67, compliance: 74, infraAlerts: 5, status: 'Needs Attention', gender: 'men',   photoId: 48 },
  { id: 'C04', name: 'Bong',         ceo: 'Ms. Victoria F. Wuo',       districts: 12, schools: 311, students: 132060, teachers: 4120, attendance: 80, performance: 69, compliance: 79, infraAlerts: 4, status: 'Needs Attention', gender: 'women', photoId: 57 },
  { id: 'C05', name: 'Grand Bassa',  ceo: 'Mr. Samuel D. Freeman',     districts: 8,  schools: 198, students:  82400, teachers: 2810, attendance: 83, performance: 71, compliance: 88, infraAlerts: 3, status: 'Healthy',         gender: 'men',   photoId: 31 },
  { id: 'C06', name: 'Grand Gedeh',  ceo: 'Dr. Ruth A. Nehpue',        districts: 7,  schools: 162, students:  56200, teachers: 2140, attendance: 76, performance: 62, compliance: 68, infraAlerts: 7, status: 'Critical',         gender: 'women', photoId: 19 },
  { id: 'C07', name: 'Margibi',      ceo: 'Mr. John T. Mulbah',        districts: 7,  schools: 187, students:  88340, teachers: 2960, attendance: 84, performance: 72, compliance: 83, infraAlerts: 2, status: 'Healthy',         gender: 'men',   photoId: 66 },
  { id: 'C08', name: 'Maryland',     ceo: 'Mrs. Alice M. Gibson',      districts: 6,  schools: 143, students:  48720, teachers: 1890, attendance: 79, performance: 66, compliance: 75, infraAlerts: 4, status: 'Needs Attention', gender: 'women', photoId: 29 },
  { id: 'C09', name: 'River Cess',   ceo: 'Mr. Emmanuel B. Suah',      districts: 5,  schools: 98,  students:  31400, teachers: 1230, attendance: 68, performance: 55, compliance: 58, infraAlerts: 9, status: 'Critical',         gender: 'men',   photoId: 73 },
  { id: 'C10', name: 'Sinoe',        ceo: 'Ms. Patience D. Wreh',      districts: 9,  schools: 174, students:  61800, teachers: 2180, attendance: 77, performance: 64, compliance: 72, infraAlerts: 6, status: 'Needs Attention', gender: 'women', photoId: 14 },
  { id: 'C11', name: 'Grand Cape Mount', ceo: 'Mr. Alfred K. Sherif',  districts: 6,  schools: 131, students:  42600, teachers: 1540, attendance: 74, performance: 61, compliance: 67, infraAlerts: 5, status: 'Needs Attention', gender: 'men',   photoId: 59 },
  { id: 'C12', name: 'Grand Kru',    ceo: 'Mrs. Edna W. Doe',          districts: 5,  schools: 94,  students:  28100, teachers:  980, attendance: 69, performance: 54, compliance: 61, infraAlerts: 8, status: 'Critical',         gender: 'women', photoId: 42 },
  { id: 'C13', name: 'Gbarpolu',     ceo: 'Mr. Thomas A. Yancy',       districts: 5,  schools: 87,  students:  24800, teachers:  820, attendance: 71, performance: 58, compliance: 63, infraAlerts: 7, status: 'Needs Attention', gender: 'men',   photoId: 38 },
  { id: 'C14', name: 'Rivercess',    ceo: 'Ms. Hannah F. Kollie',      districts: 4,  schools: 79,  students:  21200, teachers:  720, attendance: 67, performance: 52, compliance: 55, infraAlerts: 11,status: 'Critical',         gender: 'women', photoId: 8  },
  { id: 'C15', name: 'Bomi',         ceo: 'Mr. Peter B. Cooper',       districts: 6,  schools: 99,  students:  56300, teachers: 1380, attendance: 81, performance: 68, compliance: 77, infraAlerts: 3, status: 'Needs Attention', gender: 'men',   photoId: 51 },
]

// ─── National KPIs ────────────────────────────────────────────────────────
export const nationalKPIs = {
  counties:         15,
  districts:        136,
  schools:          counties.reduce((s, c) => s + c.schools, 0),
  students:         counties.reduce((s, c) => s + c.students, 0),
  teachers:         counties.reduce((s, c) => s + c.teachers, 0),
  avgAttendance:    Math.round(counties.reduce((s, c) => s + c.attendance, 0) / counties.length),
  avgPerformance:   Math.round(counties.reduce((s, c) => s + c.performance, 0) / counties.length),
  avgCompliance:    Math.round(counties.reduce((s, c) => s + c.compliance, 0) / counties.length),
  healthyCounties:  counties.filter(c => c.status === 'Healthy').length,
  criticalCounties: counties.filter(c => c.status === 'Critical').length,
  totalInfraAlerts: counties.reduce((s, c) => s + c.infraAlerts, 0),
}

// ─── Enrollment Trend (5 years) ───────────────────────────────────────────
export const enrollmentTrend5Y = [
  { year: '2021/22', enrolled: 1089420 },
  { year: '2022/23', enrolled: 1134780 },
  { year: '2023/24', enrolled: 1182340 },
  { year: '2024/25', enrolled: 1218990 },
  { year: '2025/26', enrolled: nationalKPIs.students },
]

// ─── Attendance Trend (12 months) ────────────────────────────────────────
export const attendanceTrend12M = [
  { month: 'Mar 25', rate: 83 },
  { month: 'Apr 25', rate: 85 },
  { month: 'May 25', rate: 84 },
  { month: 'Jun 25', rate: 82 },
  { month: 'Jul 25', rate: 79 },
  { month: 'Aug 25', rate: 76 },
  { month: 'Sep 25', rate: 81 },
  { month: 'Oct 25', rate: 83 },
  { month: 'Nov 25', rate: 85 },
  { month: 'Dec 25', rate: 80 },
  { month: 'Jan 26', rate: 82 },
  { month: 'Feb 26', rate: 85 },
]

// ─── Performance Trend ────────────────────────────────────────────────────
export const performanceTrend = [
  { year: '2021/22', passRate: 65 },
  { year: '2022/23', passRate: 67 },
  { year: '2023/24', passRate: 69 },
  { year: '2024/25', passRate: 70 },
  { year: '2025/26', passRate: 71 },
]

// ─── Enrollment by Level ──────────────────────────────────────────────────
export const enrollmentByLevel = [
  { level: 'Primary (1–6)',       students: 681400, pct: 55 },
  { level: 'Junior High (7–9)',   students: 310200, pct: 25 },
  { level: 'Senior High (10–12)', students: 186900, pct: 15 },
  { level: 'Tertiary / Other',    students:  67390, pct: 5  },
]

// ─── Enrollment by Gender ─────────────────────────────────────────────────
export const genderData = {
  male:   Math.round(nationalKPIs.students * 0.525),
  female: Math.round(nationalKPIs.students * 0.475),
}

// ─── Subject Performance ──────────────────────────────────────────────────
export const subjectPerformance = [
  { subject: 'Mathematics',  passRate: 61 },
  { subject: 'English',      passRate: 74 },
  { subject: 'Science',      passRate: 67 },
  { subject: 'Social Studies',passRate: 79 },
  { subject: 'French',       passRate: 58 },
  { subject: 'Agriculture',  passRate: 82 },
]

// ─── Schools (sample, national) ───────────────────────────────────────────
export const nationalSchools = [
  { id: 'NS-001', name: 'Capitol Hill Secondary School',    county: 'Montserrado', district: 'Monrovia Central', principal: 'Mr. James A. Reeves',    level: 'Secondary', enrollment: 2140, attendance: 91, performance: 78, infraStatus: 'Good',     lastReport: '2026-02-28', type: 'Public',  status: 'Active'   },
  { id: 'NS-002', name: 'United Methodist School',          county: 'Montserrado', district: 'Sinkor',           principal: 'Mrs. Gloria B. Gaye',    level: 'Primary',   enrollment: 1820, attendance: 88, performance: 81, infraStatus: 'Good',     lastReport: '2026-02-27', type: 'Private', status: 'Active'   },
  { id: 'NS-003', name: 'Grand Gedeh High School',          county: 'Grand Gedeh', district: 'Zwedru',           principal: 'Mr. Ben K. Toe',         level: 'Secondary', enrollment:  980, attendance: 74, performance: 60, infraStatus: 'Poor',     lastReport: '2026-02-10', type: 'Public',  status: 'Active'   },
  { id: 'NS-004', name: 'Nimba Central High School',        county: 'Nimba',       district: 'Sanniquellie',     principal: 'Dr. Mary E. Gaye',       level: 'Secondary', enrollment: 1640, attendance: 85, performance: 73, infraStatus: 'Fair',     lastReport: '2026-02-28', type: 'Public',  status: 'Active'   },
  { id: 'NS-005', name: 'Lofa County Community School',     county: 'Lofa',        district: 'Voinjama',         principal: 'Mrs. Patience L. Kollie',level: 'Primary',   enrollment:  743, attendance: 76, performance: 65, infraStatus: 'Fair',     lastReport: '2026-02-22', type: 'Public',  status: 'Active'   },
  { id: 'NS-006', name: 'Rivercess Academy',                county: 'Rivercess',   district: 'Cestos',           principal: 'Mr. David T. Yancy',     level: 'Primary',   enrollment:  412, attendance: 63, performance: 51, infraStatus: 'Critical', lastReport: null,         type: 'Public',  status: 'Flagged'  },
  { id: 'NS-007', name: 'Margibi Comprehensive High',       county: 'Margibi',     district: 'Kakata',           principal: 'Mrs. Ruth A. Dennis',    level: 'Secondary', enrollment: 1280, attendance: 87, performance: 74, infraStatus: 'Good',     lastReport: '2026-02-28', type: 'Public',  status: 'Active'   },
  { id: 'NS-008', name: 'Buchanan Public School',           county: 'Grand Bassa', district: 'Buchanan',         principal: 'Ms. Martha J. Kpoto',    level: 'Primary',   enrollment:  843, attendance: 91, performance: 74, infraStatus: 'Good',     lastReport: '2026-02-28', type: 'Public',  status: 'Active'   },
  { id: 'NS-009', name: 'Grand Kru District School',        county: 'Grand Kru',   district: 'Barclayville',     principal: 'Mr. Aaron B. Nyema',     level: 'Primary',   enrollment:  389, attendance: 67, performance: 53, infraStatus: 'Poor',     lastReport: '2026-01-15', type: 'Public',  status: 'Flagged'  },
  { id: 'NS-010', name: 'Bong Mine Community School',       county: 'Bong',        district: 'Gbarnga',          principal: 'Mrs. Helen T. Flomo',    level: 'Primary',   enrollment:  621, attendance: 80, performance: 68, infraStatus: 'Fair',     lastReport: '2026-02-25', type: 'Public',  status: 'Active'   },
]

// ─── Teachers (national sample) ───────────────────────────────────────────
export const nationalTeachers = [
  { id: 'NT-001', name: 'Fatu B. Kollie',      county: 'Grand Bassa', school: 'Buchanan Public School',     subject: 'Mathematics',    qualification: 'B.Ed',        yearsService: 8,  attendance: 96, performance: 'Excellent', status: 'Active',   gender: 'women', photoId: 9  },
  { id: 'NT-002', name: 'John A. Saah',        county: 'Nimba',       school: 'Nimba Central High School',  subject: 'English',         qualification: 'M.A.',        yearsService: 12, attendance: 94, performance: 'Good',      status: 'Active',   gender: 'men',   photoId: 22 },
  { id: 'NT-003', name: 'Grace M. Reeves',     county: 'Montserrado', school: 'Capitol Hill Secondary',     subject: 'Science',         qualification: 'B.Sc.',       yearsService: 6,  attendance: 98, performance: 'Excellent', status: 'Active',   gender: 'women', photoId: 31 },
  { id: 'NT-004', name: 'David O. Teah',       county: 'Rivercess',   school: 'Rivercess Academy',          subject: 'Social Studies',  qualification: 'Diploma',     yearsService: 3,  attendance: 71, performance: 'Poor',      status: 'Flagged',  gender: 'men',   photoId: 44 },
  { id: 'NT-005', name: 'Rachel K. Dennis',    county: 'Margibi',     school: 'Margibi Comprehensive High', subject: 'Biology',         qualification: 'B.Sc.',       yearsService: 9,  attendance: 89, performance: 'Good',      status: 'Active',   gender: 'women', photoId: 53 },
  { id: 'NT-006', name: 'Moses T. Wleh',       county: 'Grand Kru',   school: 'Grand Kru District School',  subject: 'Mathematics',    qualification: 'Certificate', yearsService: 2,  attendance: 62, performance: 'Poor',      status: 'Pending',  gender: 'men',   photoId: 66 },
  { id: 'NT-007', name: 'Cecelia G. Dolo',     county: 'Grand Bassa', school: 'Salvation Baptist School',   subject: 'English',         qualification: 'B.Ed',        yearsService: 11, attendance: 91, performance: 'Good',      status: 'Active',   gender: 'women', photoId: 14 },
  { id: 'NT-008', name: 'Benjamin F. Kamara',  county: 'Grand Bassa', school: 'Buchanan Technical Inst.',   subject: 'Technical Drawing',qualification: 'HND',        yearsService: 7,  attendance: 88, performance: 'Good',      status: 'Active',   gender: 'men',   photoId: 37 },
  { id: 'NT-009', name: 'Samuel A. Flomo',     county: 'Grand Bassa', school: 'Grand Bassa High School',    subject: 'Chemistry',       qualification: 'B.Sc.',       yearsService: 5,  attendance: 0,  performance: 'N/A',       status: 'On Leave', gender: 'men',   photoId: 58 },
  { id: 'NT-010', name: 'Hawa D. Kollie',      county: 'Montserrado', school: 'United Methodist School',    subject: 'Religion',        qualification: 'B.Ed',        yearsService: 14, attendance: 97, performance: 'Excellent', status: 'Active',   gender: 'women', photoId: 7  },
  { id: 'NT-011', name: 'Aaron B. Sherif',     county: 'Lofa',        school: 'Lofa County Community',      subject: 'Agriculture',     qualification: 'B.Sc.',       yearsService: 4,  attendance: 84, performance: 'Good',      status: 'Active',   gender: 'men',   photoId: 71 },
  { id: 'NT-012', name: 'Patience J. Nimely',  county: 'Bong',        school: 'Bong Mine Community School', subject: 'Social Studies',  qualification: 'Diploma',     yearsService: 6,  attendance: 93, performance: 'Good',      status: 'Active',   gender: 'women', photoId: 20 },
]

// ─── Students (national sample) ───────────────────────────────────────────
export const nationalStudents = [
  { id: 'STU-LR-001', name: 'Joseph K. Kollie',     county: 'Grand Bassa', school: 'Buchanan Public School',     grade: 'Grade 6',  attendance: 94, avgGrade: 78, status: 'Active', gender: 'men',   photoId: 10 },
  { id: 'STU-LR-002', name: 'Mary A. Freeman',       county: 'Montserrado', school: 'Capitol Hill Secondary',     grade: 'Grade 10', attendance: 89, avgGrade: 82, status: 'Active', gender: 'women', photoId: 23 },
  { id: 'STU-LR-003', name: 'Daniel T. Suah',        county: 'Nimba',       school: 'Nimba Central High School',  grade: 'Grade 9',  attendance: 77, avgGrade: 68, status: 'Active', gender: 'men',   photoId: 36 },
  { id: 'STU-LR-004', name: 'Fatumata M. Bah',       county: 'Lofa',        school: 'Lofa County Community',      grade: 'Grade 4',  attendance: 65, avgGrade: 54, status: 'At Risk',gender: 'women', photoId: 49 },
  { id: 'STU-LR-005', name: 'Emmanuel B. Pewee',     county: 'Margibi',     school: 'Margibi Comprehensive High', grade: 'Grade 11', attendance: 91, avgGrade: 74, status: 'Active', gender: 'men',   photoId: 62 },
  { id: 'STU-LR-006', name: 'Victoria S. Dennis',    county: 'Rivercess',   school: 'Rivercess Academy',          grade: 'Grade 3',  attendance: 58, avgGrade: 48, status: 'At Risk',gender: 'women', photoId: 11 },
  { id: 'STU-LR-007', name: 'James A. Flomo',        county: 'Grand Gedeh', school: 'Grand Gedeh High School',    grade: 'Grade 8',  attendance: 73, avgGrade: 61, status: 'Active', gender: 'men',   photoId: 28 },
  { id: 'STU-LR-008', name: 'Agnes P. Gaye',         county: 'Bong',        school: 'Bong Mine Community School', grade: 'Grade 5',  attendance: 88, avgGrade: 71, status: 'Active', gender: 'women', photoId: 47 },
  { id: 'STU-LR-009', name: 'Patrick D. Wreh',       county: 'Grand Kru',   school: 'Grand Kru District School',  grade: 'Grade 2',  attendance: 61, avgGrade: 50, status: 'At Risk',gender: 'men',   photoId: 60 },
  { id: 'STU-LR-010', name: 'Hannah B. Cooper',      county: 'Montserrado', school: 'United Methodist School',    grade: 'Grade 7',  attendance: 96, avgGrade: 88, status: 'Active', gender: 'women', photoId: 16 },
]

// ─── DEOs (national sample) ───────────────────────────────────────────────
export const nationalDEOs = [
  { id: 'DEO-LR-001', name: 'Emmanuel K. Kollie',   county: 'Grand Bassa',  district: 'Buchanan District',      schools: 8,  compliance: 88, flagged: 1, status: 'Active',   gender: 'men',   photoId: 42 },
  { id: 'DEO-LR-002', name: 'Susan M. Tarr',        county: 'Nimba',        district: 'Sanniquellie District',  schools: 12, compliance: 84, flagged: 2, status: 'Active',   gender: 'women', photoId: 15 },
  { id: 'DEO-LR-003', name: 'Robert A. Gonquoi',    county: 'Lofa',         district: 'Voinjama District',      schools: 9,  compliance: 71, flagged: 4, status: 'Active',   gender: 'men',   photoId: 63 },
  { id: 'DEO-LR-004', name: 'Mariatu F. Kamara',    county: 'Grand Gedeh',  district: 'Zwedru District',        schools: 7,  compliance: 62, flagged: 6, status: 'Flagged',  gender: 'women', photoId: 32 },
  { id: 'DEO-LR-005', name: 'Thomas B. Nyema',      county: 'Rivercess',    district: 'Cestos District',        schools: 4,  compliance: 52, flagged: 9, status: 'Flagged',  gender: 'men',   photoId: 74 },
  { id: 'DEO-LR-006', name: 'Comfort A. Pewee',     county: 'Margibi',      district: 'Kakata District',        schools: 10, compliance: 83, flagged: 1, status: 'Active',   gender: 'women', photoId: 26 },
  { id: 'DEO-LR-007', name: 'Alfred K. Mulbah',     county: 'Montserrado',  district: 'Monrovia Central',       schools: 18, compliance: 93, flagged: 0, status: 'Active',   gender: 'men',   photoId: 55 },
  { id: 'DEO-LR-008', name: 'Hannah W. Doe',        county: 'Bong',         district: 'Gbarnga District',       schools: 11, compliance: 78, flagged: 3, status: 'Active',   gender: 'women', photoId: 39 },
]

// ─── National Reports ─────────────────────────────────────────────────────
export const nationalReports = [
  { id: 'NR-001', title: 'National Q4 Academic Report 2025',   county: 'All',         type: 'Academic',      period: 'Q4 2025',       status: 'Approved',  submittedAt: '2026-02-01', submittedBy: 'All CEOs'       },
  { id: 'NR-002', title: 'Montserrado Monthly – February 2026', county: 'Montserrado', type: 'Monthly',       period: 'Feb 2026',      status: 'Approved',  submittedAt: '2026-02-28', submittedBy: 'Dr. M. Peabody'  },
  { id: 'NR-003', title: 'Nimba County Attendance Report',      county: 'Nimba',       type: 'Attendance',    period: 'Feb 2026',      status: 'Pending',   submittedAt: '2026-02-27', submittedBy: 'Mrs. C. Ganta'   },
  { id: 'NR-004', title: 'Grand Gedeh Infrastructure Report',   county: 'Grand Gedeh', type: 'Infrastructure',period: 'Feb 2026',      status: 'Pending',   submittedAt: '2026-02-20', submittedBy: 'Dr. R. Nehpue'   },
  { id: 'NR-005', title: 'River Cess Monthly Report',           county: 'River Cess',  type: 'Monthly',       period: 'Feb 2026',      status: 'Missing',   submittedAt: null,         submittedBy: null              },
  { id: 'NR-006', title: 'Lofa Finance Summary Q1 2026',        county: 'Lofa',        type: 'Finance',       period: 'Q1 2026',       status: 'Rejected',  submittedAt: '2026-02-18', submittedBy: 'Mr. P. Kollie',  comment: 'Budget figures inconsistent' },
  { id: 'NR-007', title: 'National Infrastructure Status 2026', county: 'All',         type: 'Infrastructure',period: 'Jan 2026',      status: 'Approved',  submittedAt: '2026-02-05', submittedBy: 'MOE Research Unit' },
  { id: 'NR-008', title: 'Grand Kru Monthly Report',            county: 'Grand Kru',   type: 'Monthly',       period: 'Feb 2026',      status: 'Missing',   submittedAt: null,         submittedBy: null              },
  { id: 'NR-009', title: 'National Dropout Analysis 2025',      county: 'All',         type: 'Academic',      period: 'Annual 2025',   status: 'Approved',  submittedAt: '2026-01-15', submittedBy: 'Statistics Unit'  },
  { id: 'NR-010', title: 'Bong County Academic Report',         county: 'Bong',        type: 'Academic',      period: 'Q4 2025',       status: 'Pending',   submittedAt: '2026-02-26', submittedBy: 'Ms. V. Wuo'      },
]

// ─── System Users ─────────────────────────────────────────────────────────
export const systemUsers = [
  { id: 'USR-001', name: 'Dr. Beatrice M. Karnga',  role: 'Minister',    county: 'National',    status: 'Active', lastActive: 'Just now',  gender: 'women', photoId: 44 },
  { id: 'USR-002', name: 'Dr. Moses A. Peabody',    role: 'CEO',         county: 'Montserrado', status: 'Active', lastActive: '2 hrs ago', gender: 'men',   photoId: 22 },
  { id: 'USR-003', name: 'Mrs. Comfort J. Ganta',   role: 'CEO',         county: 'Nimba',       status: 'Active', lastActive: '1 hr ago',  gender: 'women', photoId: 35 },
  { id: 'USR-004', name: 'Emmanuel K. Kollie',      role: 'DEO',         county: 'Grand Bassa', status: 'Active', lastActive: '4 hrs ago', gender: 'men',   photoId: 42 },
  { id: 'USR-005', name: 'Martha J. Kpoto',         role: 'School Admin',county: 'Grand Bassa', status: 'Active', lastActive: '1 day ago', gender: 'women', photoId: 12 },
  { id: 'USR-006', name: 'Fatu B. Kollie',          role: 'Teacher',     county: 'Grand Bassa', status: 'Active', lastActive: '6 hrs ago', gender: 'women', photoId: 9  },
  { id: 'USR-007', name: 'Joseph K. Kollie',        role: 'Student',     county: 'Grand Bassa', status: 'Active', lastActive: '2 days ago',gender: 'men',   photoId: 10 },
  { id: 'USR-008', name: 'Dr. Ruth A. Nehpue',      role: 'CEO',         county: 'Grand Gedeh', status: 'Flagged',lastActive: '3 days ago',gender: 'women', photoId: 19 },
  { id: 'USR-009', name: 'Moses T. Wleh',           role: 'Teacher',     county: 'Grand Kru',   status: 'Pending',lastActive: '1 week ago',gender: 'men',   photoId: 66 },
  { id: 'USR-010', name: 'Hannah F. Kollie',        role: 'CEO',         county: 'Rivercess',   status: 'Active', lastActive: '5 hrs ago', gender: 'women', photoId: 8  },
]

// ─── Messages ─────────────────────────────────────────────────────────────
export const ministerMessages = [
  {
    id: 'MM-001',
    contact: 'Dr. Moses A. Peabody',
    role: 'CEO – Montserrado',
    gender: 'men', photoId: 22,
    unread: 0,
    messages: [
      { from: 'them', text: 'Good morning Madam Minister. Q4 report has been submitted and approved.', time: '9:10 AM' },
      { from: 'me',   text: 'Thank you Dr. Peabody. Excellent work on the compliance rate this quarter.', time: '10:30 AM' },
    ],
  },
  {
    id: 'MM-002',
    contact: 'Mrs. Comfort J. Ganta',
    role: 'CEO – Nimba',
    gender: 'women', photoId: 35,
    unread: 2,
    messages: [
      { from: 'them', text: 'Madam Minister, the attendance report is ready for your review.', time: 'Yesterday' },
      { from: 'me',   text: 'Please proceed with submission. I will review this week.', time: 'Yesterday' },
      { from: 'them', text: 'Submitted. Thank you.', time: '8:40 AM' },
      { from: 'them', text: 'Also flagging infrastructure concern in Sanniquellie District.', time: '8:55 AM' },
    ],
  },
  {
    id: 'MM-003',
    contact: 'Dr. Ruth A. Nehpue',
    role: 'CEO – Grand Gedeh',
    gender: 'women', photoId: 19,
    unread: 1,
    messages: [
      { from: 'them', text: 'Madam Minister, the infrastructure situation in Grand Gedeh is worsening.', time: '2 days ago' },
      { from: 'me',   text: 'I have escalated to the Infrastructure Fund Committee. Expect response by Friday.', time: '2 days ago' },
      { from: 'them', text: 'Thank you. Two schools still at risk of closure.', time: '9:30 AM' },
    ],
  },
]

// ─── Notifications ────────────────────────────────────────────────────────
export const ministerNotifications = [
  { id: 1,  type: 'alert',   severity: 'Critical', county: 'Rivercess', title: 'Infrastructure Emergency',      message: '11 schools in Rivercess County flagged for critical infrastructure failure. Immediate attention required.', time: '1 hour ago',  read: false },
  { id: 2,  type: 'report',  severity: 'High',     county: 'Grand Kru', title: 'Missing Monthly Reports',       message: 'Grand Kru County has not submitted February monthly report. 3rd consecutive miss.', time: '2 hours ago', read: false },
  { id: 3,  type: 'warning', severity: 'High',     county: 'National',  title: 'Teacher Verification Pending',  message: '112 teachers across 8 counties have pending qualification verification.', time: '4 hours ago', read: false },
  { id: 4,  type: 'alert',   severity: 'Critical', county: 'River Cess', title: 'Attendance Below Threshold',   message: 'River Cess attendance rate dropped to 67% — 13 points below national minimum.', time: '6 hours ago', read: false },
  { id: 5,  type: 'success', severity: 'Low',      county: 'Montserrado', title: 'Report Approved',             message: 'Montserrado Q4 Academic Report approved. County compliance at 91%.', time: '1 day ago',  read: true  },
  { id: 6,  type: 'info',    severity: 'Medium',   county: 'National',  title: 'System Update',                 message: 'NEMIS system updated to v3.2. New attendance reporting module activated.', time: '2 days ago', read: true  },
  { id: 7,  type: 'warning', severity: 'Medium',   county: 'Lofa',      title: 'Finance Report Rejected',       message: 'Lofa County Finance Q1 report rejected due to inconsistent budget figures.', time: '2 days ago', read: true  },
  { id: 8,  type: 'alert',   severity: 'High',     county: 'Grand Gedeh', title: 'County Status Downgraded',   message: 'Grand Gedeh County performance index fell below 65% — status changed to Critical.', time: '3 days ago', read: true  },
]

// ─── National Policies ────────────────────────────────────────────────────
export const nationalPolicies = [
  { id: 'POL-001', title: 'Attendance Minimum Standard Policy',     category: 'Attendance',    status: 'Active',  effectiveDate: '2025-09-01', lastUpdated: '2025-08-15', description: 'All schools must maintain minimum 75% attendance. Schools below threshold trigger automatic DEO review.' },
  { id: 'POL-002', title: 'Teacher Qualification Requirements 2026', category: 'Teachers',     status: 'Active',  effectiveDate: '2026-01-01', lastUpdated: '2025-12-01', description: 'All new teacher hires must hold minimum B.Ed or equivalent. Existing teachers with only certificate must complete upgrade by 2027.' },
  { id: 'POL-003', title: 'Digital Attendance Reporting',            category: 'Reporting',    status: 'Active',  effectiveDate: '2026-03-15', lastUpdated: '2026-02-20', description: 'All schools must submit attendance digitally every Friday by 5 PM via NEMIS platform.' },
  { id: 'POL-004', title: 'School Infrastructure Safety Standards',  category: 'Infrastructure',status: 'Under Review', effectiveDate: null, lastUpdated: '2026-02-10', description: 'Updated safety standards for school buildings including classroom capacity, sanitation, and emergency exits.' },
  { id: 'POL-005', title: 'National Grading Scale 2026',             category: 'Academic',     status: 'Active',  effectiveDate: '2025-09-01', lastUpdated: '2025-07-01', description: 'Standardized grading scale: A(90-100), B(80-89), C(70-79), D(60-69), F(below 60). Applies to all public schools.' },
  { id: 'POL-006', title: 'Free and Compulsory Primary Education',   category: 'Access',       status: 'Active',  effectiveDate: '2023-09-01', lastUpdated: '2024-01-01', description: 'Primary education grades 1-6 is free and compulsory for all children aged 6-12 in the Republic of Liberia.' },
]

// ─── Budget Overview ──────────────────────────────────────────────────────
export const nationalBudget = {
  totalAllocation: 42000000,
  disbursed:       31500000,
  utilized:        26800000,
  outstanding:      4700000,
  year: '2025/2026',
}

export const countyBudget = counties.slice(0, 8).map((c, i) => ({
  county:     c.name,
  allocation: Math.round(nationalBudget.totalAllocation / 15 * (c.students / nationalKPIs.students * 15)),
  disbursed:  Math.round(nationalBudget.totalAllocation / 15 * (c.students / nationalKPIs.students * 15) * (0.65 + Math.random() * 0.25)),
  compliance: c.compliance,
}))

// ─── Emergency Incidents ──────────────────────────────────────────────────
export const emergencyIncidents = [
  { id: 'EMG-001', title: 'Rivercess School Building Collapse Risk', county: 'Rivercess',  severity: 'Critical', status: 'Active',      reportedAt: '2026-02-28', schoolsAffected: 3,  studentsAffected: 1240, description: 'Structural inspection revealed collapse risk at 3 schools. Students evacuated.', assignedTo: 'Infrastructure Response Team' },
  { id: 'EMG-002', title: 'Grand Kru Flooding — Schools Closed',     county: 'Grand Kru',  severity: 'Critical', status: 'Active',      reportedAt: '2026-02-22', schoolsAffected: 5,  studentsAffected: 1820, description: 'Heavy rains caused flooding. 5 schools in low-lying areas closed until further notice.', assignedTo: 'Disaster Management Committee' },
  { id: 'EMG-003', title: 'Lofa Teacher Strike',                     county: 'Lofa',       severity: 'High',     status: 'Under Control',reportedAt: '2026-02-18', schoolsAffected: 12, studentsAffected: 8400, description: 'Teachers in 3 districts on strike over salary dispute. Negotiations ongoing.', assignedTo: 'MOE HR & Unions Desk' },
  { id: 'EMG-004', title: 'Grand Gedeh Curriculum Material Shortage', county: 'Grand Gedeh',severity: 'Medium',  status: 'In Progress', reportedAt: '2026-02-10', schoolsAffected: 9,  studentsAffected: 6200, description: 'Textbooks and curriculum materials not delivered to schools for Semester 2.', assignedTo: 'Procurement Division' },
]

// ─── Audit Logs ───────────────────────────────────────────────────────────
export const auditLogs = [
  { id: 'LOG-001', user: 'Dr. M. Peabody',  role: 'CEO',     action: 'Approved Q4 Report',              target: 'NR-002', county: 'Montserrado', time: '2026-02-28 10:14', ip: '196.210.40.12' },
  { id: 'LOG-002', user: 'Dr. B. Karnga',   role: 'Minister', action: 'Approved National Report',        target: 'NR-001', county: 'National',    time: '2026-02-28 11:30', ip: '196.210.40.01' },
  { id: 'LOG-003', user: 'E. K. Kollie',    role: 'DEO',     action: 'Submitted February Report',        target: 'RPT-01', county: 'Grand Bassa', time: '2026-02-28 09:00', ip: '196.210.42.88' },
  { id: 'LOG-004', user: 'T. B. Nyema',     role: 'DEO',     action: 'Flagged Infrastructure Issue',     target: 'ISS-09', county: 'Rivercess',   time: '2026-02-28 07:44', ip: '196.210.45.32' },
  { id: 'LOG-005', user: 'Dr. R. Nehpue',   role: 'CEO',     action: 'Escalated Emergency to Minister',  target: 'EMG-01', county: 'Grand Gedeh', time: '2026-02-27 16:20', ip: '196.210.47.11' },
  { id: 'LOG-006', user: 'Dr. B. Karnga',   role: 'Minister', action: 'Published New Policy',            target: 'POL-003',county: 'National',   time: '2026-02-20 14:00', ip: '196.210.40.01' },
  { id: 'LOG-007', user: 'System',          role: 'System',  action: 'Auto-flagged School Report Missing',target: 'GKR-09', county: 'Grand Kru',  time: '2026-02-20 00:01', ip: 'System'        },
  { id: 'LOG-008', user: 'Mrs. C. Ganta',   role: 'CEO',     action: 'Submitted Attendance Report',      target: 'ATT-NB', county: 'Nimba',       time: '2026-02-27 15:52', ip: '196.210.41.72' },
]

// ─── Scorecard Data ───────────────────────────────────────────────────────
export const scorecardMetrics = [
  { metric: 'National Enrollment Rate',   value: 84,  target: 90,  trend: 'up',   unit: '%' },
  { metric: 'National Pass Rate',         value: 71,  target: 80,  trend: 'up',   unit: '%' },
  { metric: 'National Attendance',        value: nationalKPIs.avgAttendance, target: 85, trend: 'up', unit: '%' },
  { metric: 'Teacher-to-Student Ratio',   value: 32,  target: 30,  trend: 'down', unit: ':1' },
  { metric: 'Report Compliance Rate',     value: nationalKPIs.avgCompliance, target: 95, trend: 'up', unit: '%' },
  { metric: 'Schools with Safe Infra',    value: 68,  target: 85,  trend: 'up',   unit: '%' },
  { metric: 'Gender Parity Index',        value: 0.90, target: 1.0, trend: 'up',  unit: '' },
  { metric: 'Dropout Rate',              value: 8.2, target: 5.0, trend: 'down', unit: '%' },
]
