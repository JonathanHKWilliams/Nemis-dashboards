// ─── DEO (District Education Officer) Mock Data ───────────────────────────
// District: Buchanan District, Grand Bassa County, Liberia

export const deoProfile = {
  name: 'Emmanuel K. Kollie',
  firstName: 'Emmanuel',
  title: 'District Education Officer',
  district: 'Buchanan District',
  county: 'Grand Bassa County',
  employeeId: 'DEO-GB-001',
  phone: '+231-770-421-088',
  email: 'e.kollie@moe.edu.lr',
  gender: 'men',
  photoId: 42,
  reportsTo: 'CEO – Grand Bassa County Education Office',
  office: 'Buchanan City Education Building, Buchanan',
  joinedYear: 2019,
}

// ─── Schools in District ──────────────────────────────────────────────────
export const deoSchools = [
  {
    id: 'SCH-001',
    name: 'Buchanan Public School',
    level: 'Primary',
    principal: 'Martha J. Kpoto',
    principalId: 'ADM-001',
    students: 843,
    teachers: 28,
    attendance: 91,
    status: 'Compliant',
    reportsSubmitted: 3,
    reportsDue: 3,
    location: 'Buchanan City',
    established: 2001,
    feesCollected: 78,
    issues: 0,
    grades: ['1','2','3','4','5','6'],
    gender: { male: 432, female: 411 },
    enrollmentByGrade: [
      { grade: 'Grade 1', students: 148 },
      { grade: 'Grade 2', students: 141 },
      { grade: 'Grade 3', students: 138 },
      { grade: 'Grade 4', students: 140 },
      { grade: 'Grade 5', students: 137 },
      { grade: 'Grade 6', students: 139 },
    ],
    performanceAvg: 74,
  },
  {
    id: 'SCH-002',
    name: 'Grand Bassa High School',
    level: 'Secondary',
    principal: 'Rev. James T. Freeman',
    principalId: 'ADM-002',
    students: 1204,
    teachers: 46,
    attendance: 88,
    status: 'Compliant',
    reportsSubmitted: 3,
    reportsDue: 3,
    location: 'Buchanan City',
    established: 1995,
    feesCollected: 83,
    issues: 1,
    grades: ['7','8','9','10','11','12'],
    gender: { male: 628, female: 576 },
    enrollmentByGrade: [
      { grade: 'Grade 7', students: 218 },
      { grade: 'Grade 8', students: 205 },
      { grade: 'Grade 9', students: 198 },
      { grade: 'Grade 10', students: 196 },
      { grade: 'Grade 11', students: 194 },
      { grade: 'Grade 12', students: 193 },
    ],
    performanceAvg: 71,
  },
  {
    id: 'SCH-003',
    name: 'St. Mary Catholic School',
    level: 'Primary',
    principal: 'Sister Agnes M. Flomo',
    principalId: 'ADM-003',
    students: 612,
    teachers: 22,
    attendance: 94,
    status: 'Compliant',
    reportsSubmitted: 3,
    reportsDue: 3,
    location: 'Buchanan City',
    established: 1987,
    feesCollected: 91,
    issues: 0,
    grades: ['1','2','3','4','5','6'],
    gender: { male: 295, female: 317 },
    enrollmentByGrade: [
      { grade: 'Grade 1', students: 108 },
      { grade: 'Grade 2', students: 102 },
      { grade: 'Grade 3', students: 99 },
      { grade: 'Grade 4', students: 101 },
      { grade: 'Grade 5', students: 102 },
      { grade: 'Grade 6', students: 100 },
    ],
    performanceAvg: 82,
  },
  {
    id: 'SCH-004',
    name: 'Rivercess Community School',
    level: 'Primary',
    principal: 'Thomas B. Pewee',
    principalId: 'ADM-004',
    students: 387,
    teachers: 14,
    attendance: 76,
    status: 'Needs Review',
    reportsSubmitted: 2,
    reportsDue: 3,
    location: 'Rivercess Town',
    established: 2008,
    feesCollected: 52,
    issues: 2,
    grades: ['1','2','3','4','5','6'],
    gender: { male: 201, female: 186 },
    enrollmentByGrade: [
      { grade: 'Grade 1', students: 78 },
      { grade: 'Grade 2', students: 68 },
      { grade: 'Grade 3', students: 64 },
      { grade: 'Grade 4', students: 62 },
      { grade: 'Grade 5', students: 59 },
      { grade: 'Grade 6', students: 56 },
    ],
    performanceAvg: 61,
  },
  {
    id: 'SCH-005',
    name: 'New Life Academy',
    level: 'Secondary',
    principal: 'Dr. Victoria S. Cooper',
    principalId: 'ADM-005',
    students: 756,
    teachers: 31,
    attendance: 85,
    status: 'Compliant',
    reportsSubmitted: 3,
    reportsDue: 3,
    location: 'Buchanan City',
    established: 2003,
    feesCollected: 77,
    issues: 0,
    grades: ['7','8','9','10','11','12'],
    gender: { male: 378, female: 378 },
    enrollmentByGrade: [
      { grade: 'Grade 7', students: 136 },
      { grade: 'Grade 8', students: 129 },
      { grade: 'Grade 9', students: 127 },
      { grade: 'Grade 10', students: 124 },
      { grade: 'Grade 11', students: 122 },
      { grade: 'Grade 12', students: 118 },
    ],
    performanceAvg: 69,
  },
  {
    id: 'SCH-006',
    name: 'Kpayea District School',
    level: 'Primary',
    principal: 'Mark O. Suah',
    principalId: 'ADM-006',
    students: 429,
    teachers: 16,
    attendance: 69,
    status: 'Flagged',
    reportsSubmitted: 1,
    reportsDue: 3,
    location: 'Kpayea',
    established: 2011,
    feesCollected: 38,
    issues: 3,
    grades: ['1','2','3','4','5','6'],
    gender: { male: 228, female: 201 },
    enrollmentByGrade: [
      { grade: 'Grade 1', students: 89 },
      { grade: 'Grade 2', students: 78 },
      { grade: 'Grade 3', students: 72 },
      { grade: 'Grade 4', students: 68 },
      { grade: 'Grade 5', students: 65 },
      { grade: 'Grade 6', students: 57 },
    ],
    performanceAvg: 54,
  },
  {
    id: 'SCH-007',
    name: 'Salvation Baptist School',
    level: 'Primary',
    principal: 'Pastor Samuel D. Wreh',
    principalId: 'ADM-007',
    students: 521,
    teachers: 19,
    attendance: 89,
    status: 'Compliant',
    reportsSubmitted: 3,
    reportsDue: 3,
    location: 'Buchanan City',
    established: 1999,
    feesCollected: 84,
    issues: 0,
    grades: ['1','2','3','4','5','6'],
    gender: { male: 261, female: 260 },
    enrollmentByGrade: [
      { grade: 'Grade 1', students: 94 },
      { grade: 'Grade 2', students: 89 },
      { grade: 'Grade 3', students: 86 },
      { grade: 'Grade 4', students: 85 },
      { grade: 'Grade 5', students: 84 },
      { grade: 'Grade 6', students: 83 },
    ],
    performanceAvg: 73,
  },
  {
    id: 'SCH-008',
    name: 'Buchanan Technical Institute',
    level: 'Secondary',
    principal: 'Eng. Patrick B. Nyema',
    principalId: 'ADM-008',
    students: 634,
    teachers: 27,
    attendance: 87,
    status: 'Compliant',
    reportsSubmitted: 3,
    reportsDue: 3,
    location: 'Buchanan City',
    established: 2006,
    feesCollected: 80,
    issues: 1,
    grades: ['9','10','11','12'],
    gender: { male: 398, female: 236 },
    enrollmentByGrade: [
      { grade: 'Grade 9', students: 165 },
      { grade: 'Grade 10', students: 162 },
      { grade: 'Grade 11', students: 158 },
      { grade: 'Grade 12', students: 149 },
    ],
    performanceAvg: 70,
  },
]

// ─── School Admins ────────────────────────────────────────────────────────
export const deoAdmins = [
  { id: 'ADM-001', name: 'Martha J. Kpoto',         school: 'Buchanan Public School',     role: 'Principal',       status: 'Active',    lastActive: '2 hours ago',   gender: 'women', photoId: 12, reports: 3, issues: 0, joinDate: '2018-03-01' },
  { id: 'ADM-002', name: 'Rev. James T. Freeman',   school: 'Grand Bassa High School',    role: 'Principal',       status: 'Active',    lastActive: '1 hour ago',    gender: 'men',   photoId: 33, reports: 3, issues: 1, joinDate: '2015-09-01' },
  { id: 'ADM-003', name: 'Sister Agnes M. Flomo',   school: 'St. Mary Catholic School',   role: 'Head Mistress',   status: 'Active',    lastActive: '30 min ago',    gender: 'women', photoId: 28, reports: 3, issues: 0, joinDate: '2010-01-15' },
  { id: 'ADM-004', name: 'Thomas B. Pewee',         school: 'Rivercess Community School',  role: 'Principal',       status: 'Active',    lastActive: '1 day ago',     gender: 'men',   photoId: 55, reports: 2, issues: 2, joinDate: '2020-02-10' },
  { id: 'ADM-005', name: 'Dr. Victoria S. Cooper',  school: 'New Life Academy',            role: 'Head Mistress',   status: 'Active',    lastActive: '3 hours ago',   gender: 'women', photoId: 41, reports: 3, issues: 0, joinDate: '2016-08-22' },
  { id: 'ADM-006', name: 'Mark O. Suah',            school: 'Kpayea District School',      role: 'Principal',       status: 'Suspended', lastActive: '5 days ago',    gender: 'men',   photoId: 62, reports: 1, issues: 3, joinDate: '2021-03-01' },
  { id: 'ADM-007', name: 'Pastor Samuel D. Wreh',   school: 'Salvation Baptist School',    role: 'Principal',       status: 'Active',    lastActive: '5 hours ago',   gender: 'men',   photoId: 17, reports: 3, issues: 0, joinDate: '2017-05-14' },
  { id: 'ADM-008', name: 'Eng. Patrick B. Nyema',   school: 'Buchanan Technical Institute', role: 'Director',       status: 'Active',    lastActive: '4 hours ago',   gender: 'men',   photoId: 49, reports: 3, issues: 1, joinDate: '2014-11-07' },
]

// ─── Teachers (District-level view) ──────────────────────────────────────
export const deoTeachers = [
  { id: 'TCH-001', name: 'Fatu B. Kollie',        school: 'Buchanan Public School',     subject: 'Mathematics',   status: 'Active',  gradesSubmitted: true,  attendance: 96, gender: 'women', photoId: 9  },
  { id: 'TCH-002', name: 'John A. Saah',          school: 'Grand Bassa High School',    subject: 'English',        status: 'Active',  gradesSubmitted: true,  attendance: 94, gender: 'men',   photoId: 22 },
  { id: 'TCH-003', name: 'Grace M. Reeves',       school: 'St. Mary Catholic School',   subject: 'Science',        status: 'Active',  gradesSubmitted: true,  attendance: 98, gender: 'women', photoId: 31 },
  { id: 'TCH-004', name: 'David O. Teah',         school: 'Rivercess Community School',  subject: 'Social Studies', status: 'Active',  gradesSubmitted: false, attendance: 71, gender: 'men',   photoId: 44 },
  { id: 'TCH-005', name: 'Rachel K. Dennis',      school: 'New Life Academy',            subject: 'Biology',        status: 'Active',  gradesSubmitted: true,  attendance: 89, gender: 'women', photoId: 53 },
  { id: 'TCH-006', name: 'Moses T. Wleh',         school: 'Kpayea District School',      subject: 'Mathematics',   status: 'Active',  gradesSubmitted: false, attendance: 62, gender: 'men',   photoId: 66 },
  { id: 'TCH-007', name: 'Cecelia G. Dolo',       school: 'Salvation Baptist School',    subject: 'English',        status: 'Active',  gradesSubmitted: true,  attendance: 91, gender: 'women', photoId: 14 },
  { id: 'TCH-008', name: 'Benjamin F. Kamara',    school: 'Buchanan Technical Institute', subject: 'Technical Drawing', status: 'Active', gradesSubmitted: true, attendance: 88, gender: 'men', photoId: 37 },
  { id: 'TCH-009', name: 'Patience J. Nimely',    school: 'Buchanan Public School',     subject: 'Social Studies', status: 'Active',  gradesSubmitted: true,  attendance: 93, gender: 'women', photoId: 20 },
  { id: 'TCH-010', name: 'Samuel A. Flomo',       school: 'Grand Bassa High School',    subject: 'Chemistry',      status: 'On Leave', gradesSubmitted: false, attendance: 0, gender: 'men',   photoId: 58 },
  { id: 'TCH-011', name: 'Hawa D. Kollie',        school: 'St. Mary Catholic School',   subject: 'Religion',       status: 'Active',  gradesSubmitted: true,  attendance: 97, gender: 'women', photoId: 7  },
  { id: 'TCH-012', name: 'Henry P. Mulbah',       school: 'Kpayea District School',      subject: 'English',        status: 'Active',  gradesSubmitted: false, attendance: 58, gender: 'men',   photoId: 71 },
]

export const teachersBySchool = deoSchools.map(s => ({
  schoolId: s.id,
  schoolName: s.name,
  total: s.teachers,
  gradesPending: deoTeachers.filter(t => t.school === s.name && !t.gradesSubmitted).length,
  avgAttendance: Math.round(deoTeachers.filter(t => t.school === s.name).reduce((sum, t) => sum + t.attendance, 0) / Math.max(deoTeachers.filter(t => t.school === s.name).length, 1)),
}))

// ─── Enrollment & Student Analytics ──────────────────────────────────────
export const enrollmentTrend = [
  { month: 'Sep', enrolled: 4820 },
  { month: 'Oct', enrolled: 4891 },
  { month: 'Nov', enrolled: 4856 },
  { month: 'Dec', enrolled: 4780 },
  { month: 'Jan', enrolled: 4912 },
  { month: 'Feb', enrolled: 5386 },
]

export const attendanceTrend = [
  { month: 'Sep', rate: 88 },
  { month: 'Oct', rate: 86 },
  { month: 'Nov', rate: 85 },
  { month: 'Dec', rate: 80 },
  { month: 'Jan', rate: 84 },
  { month: 'Feb', rate: 84 },
]

export const schoolPerformance = deoSchools.map(s => ({
  name: s.name.split(' ').slice(0, 2).join(' '),
  avg: s.performanceAvg,
  attendance: s.attendance,
}))

export const genderDistribution = {
  male: deoSchools.reduce((s, sc) => s + sc.gender.male, 0),
  female: deoSchools.reduce((s, sc) => s + sc.gender.female, 0),
}

export const dropoutAlerts = [
  { school: 'Kpayea District School',     count: 12, reason: 'Economic hardship' },
  { school: 'Rivercess Community School',  count: 8,  reason: 'Distance / transport' },
  { school: 'Grand Bassa High School',    count: 5,  reason: 'Family relocation' },
]

// ─── Reports & Compliance ─────────────────────────────────────────────────
export const deoReports = [
  { id: 'RPT-001', school: 'Buchanan Public School',     type: 'Monthly Report',    month: 'February 2026', submittedAt: '2026-02-28', status: 'Approved',   submittedBy: 'Martha J. Kpoto' },
  { id: 'RPT-002', school: 'Grand Bassa High School',    type: 'Monthly Report',    month: 'February 2026', submittedAt: '2026-02-27', status: 'Pending',    submittedBy: 'Rev. James T. Freeman' },
  { id: 'RPT-003', school: 'St. Mary Catholic School',   type: 'Monthly Report',    month: 'February 2026', submittedAt: '2026-02-28', status: 'Approved',   submittedBy: 'Sister Agnes M. Flomo' },
  { id: 'RPT-004', school: 'Rivercess Community School',  type: 'Monthly Report',    month: 'February 2026', submittedAt: '2026-02-26', status: 'Rejected',   submittedBy: 'Thomas B. Pewee', comment: 'Attendance data incomplete' },
  { id: 'RPT-005', school: 'New Life Academy',            type: 'Monthly Report',    month: 'February 2026', submittedAt: '2026-02-28', status: 'Approved',   submittedBy: 'Dr. Victoria S. Cooper' },
  { id: 'RPT-006', school: 'Kpayea District School',      type: 'Monthly Report',    month: 'February 2026', submittedAt: null,         status: 'Missing',    submittedBy: null },
  { id: 'RPT-007', school: 'Salvation Baptist School',    type: 'Monthly Report',    month: 'February 2026', submittedAt: '2026-02-27', status: 'Approved',   submittedBy: 'Pastor Samuel D. Wreh' },
  { id: 'RPT-008', school: 'Buchanan Technical Institute', type: 'Monthly Report',   month: 'February 2026', submittedAt: '2026-02-25', status: 'Pending',    submittedBy: 'Eng. Patrick B. Nyema' },
  { id: 'RPT-009', school: 'Buchanan Public School',     type: 'Academic Performance', month: 'Q1 2026',    submittedAt: '2026-01-31', status: 'Approved',   submittedBy: 'Martha J. Kpoto' },
  { id: 'RPT-010', school: 'Grand Bassa High School',    type: 'Academic Performance', month: 'Q1 2026',    submittedAt: '2026-02-03', status: 'Approved',   submittedBy: 'Rev. James T. Freeman' },
  { id: 'RPT-011', school: 'St. Mary Catholic School',   type: 'Infrastructure',    month: 'February 2026', submittedAt: '2026-02-20', status: 'Pending',    submittedBy: 'Sister Agnes M. Flomo' },
  { id: 'RPT-012', school: 'Rivercess Community School',  type: 'Infrastructure',    month: 'February 2026', submittedAt: '2026-02-19', status: 'Pending',    submittedBy: 'Thomas B. Pewee' },
]

// ─── Infrastructure & Issues ──────────────────────────────────────────────
export const deoIssues = [
  { id: 'ISS-001', school: 'Kpayea District School',     category: 'Facility',       title: 'Roof collapse in Block C',           severity: 'Critical',  status: 'Escalated to CEO', reportedAt: '2026-02-20', assignedTo: 'CEO Office', notes: 'Structural damage confirmed' },
  { id: 'ISS-002', school: 'Kpayea District School',     category: 'Staff Shortage', title: 'No math teacher since January',      severity: 'High',      status: 'Under Review',     reportedAt: '2026-02-15', assignedTo: 'DEO HR Unit', notes: 'Recruitment request filed' },
  { id: 'ISS-003', school: 'Rivercess Community School',  category: 'Facility',       title: 'No clean water supply',              severity: 'High',      status: 'Under Review',     reportedAt: '2026-02-18', assignedTo: 'DEO Office', notes: 'WASH committee notified' },
  { id: 'ISS-004', school: 'Rivercess Community School',  category: 'Security',       title: 'Perimeter fence broken on east side', severity: 'Medium',   status: 'Open',             reportedAt: '2026-02-22', assignedTo: null, notes: '' },
  { id: 'ISS-005', school: 'Grand Bassa High School',    category: 'Resources',      title: 'Science lab equipment missing',       severity: 'Medium',   status: 'Under Review',     reportedAt: '2026-02-14', assignedTo: 'DEO Procurement', notes: 'Inventory audit initiated' },
  { id: 'ISS-006', school: 'Buchanan Technical Institute', category: 'Facility',     title: 'Generator failure — no power',        severity: 'Medium',   status: 'Open',             reportedAt: '2026-02-25', assignedTo: null, notes: '' },
  { id: 'ISS-007', school: 'Kpayea District School',     category: 'Security',       title: 'Teacher threats reported',            severity: 'Critical',  status: 'Escalated to CEO', reportedAt: '2026-02-21', assignedTo: 'CEO Office', notes: 'Police report filed' },
]

// ─── Finance (District-level monitoring) ─────────────────────────────────
export const deoFinance = {
  districtBudget: 285000,
  disbursed: 214000,
  utilized: 178000,
  outstanding: 36000,
}

export const schoolFinance = deoSchools.map(s => ({
  id: s.id,
  school: s.name,
  allocation: Math.round(deoFinance.districtBudget / deoSchools.length),
  collected: Math.round((deoFinance.districtBudget / deoSchools.length) * s.feesCollected / 100),
  compliance: s.feesCollected,
  status: s.feesCollected >= 80 ? 'On Track' : s.feesCollected >= 50 ? 'Behind' : 'Critical',
}))

export const financeMonthly = [
  { month: 'Sep', collected: 28400 },
  { month: 'Oct', collected: 31200 },
  { month: 'Nov', collected: 29800 },
  { month: 'Dec', collected: 24600 },
  { month: 'Jan', collected: 33100 },
  { month: 'Feb', collected: 30900 },
]

// ─── Communications ───────────────────────────────────────────────────────
export const deoMessages = [
  {
    id: 'MSG-001',
    contact: 'Martha J. Kpoto',
    role: 'Principal – Buchanan Public School',
    gender: 'women',
    photoId: 12,
    unread: 0,
    messages: [
      { from: 'them', text: 'Good morning sir, February report has been submitted.', time: '9:14 AM' },
      { from: 'me',   text: 'Thank you Martha. Report has been reviewed and approved.', time: '10:02 AM' },
    ],
  },
  {
    id: 'MSG-002',
    contact: 'Thomas B. Pewee',
    role: 'Principal – Rivercess Community School',
    gender: 'men',
    photoId: 55,
    unread: 2,
    messages: [
      { from: 'them', text: 'Sir, the attendance report has a data issue. We are correcting it.', time: 'Yesterday' },
      { from: 'me',   text: 'Please resubmit by tomorrow. The rejection stands until corrected.', time: 'Yesterday' },
      { from: 'them', text: 'Understood sir. We will resubmit today.', time: '8:45 AM' },
      { from: 'them', text: 'Corrected report has been uploaded.', time: '11:20 AM' },
    ],
  },
  {
    id: 'MSG-003',
    contact: 'CEO Office',
    role: 'County Education Officer',
    gender: 'men',
    photoId: 77,
    unread: 1,
    messages: [
      { from: 'me',   text: 'Escalated infrastructure report for Kpayea District School attached.', time: '2 days ago' },
      { from: 'them', text: 'Noted. Infrastructure team will visit this week.', time: 'Yesterday' },
      { from: 'them', text: 'Site inspection confirmed for Friday, March 6.', time: '9:00 AM' },
    ],
  },
  {
    id: 'MSG-004',
    contact: 'Eng. Patrick B. Nyema',
    role: 'Director – Buchanan Technical Institute',
    gender: 'men',
    photoId: 49,
    unread: 0,
    messages: [
      { from: 'them', text: 'The generator issue has been flagged. Awaiting budget approval.', time: '2 days ago' },
      { from: 'me',   text: 'Understood. I will review the procurement request.', time: '2 days ago' },
    ],
  },
]

// ─── Notifications ────────────────────────────────────────────────────────
export const deoNotifications = [
  { id: 1,  type: 'alert',   title: 'Critical Issue – Kpayea',       message: 'Roof collapse in Block C escalated to CEO. Site inspection scheduled Friday.', time: '2 hours ago',  read: false },
  { id: 2,  type: 'report',  title: 'Report Submitted',               message: 'Rivercess Community School resubmitted corrected monthly report.', time: '3 hours ago',  read: false },
  { id: 3,  type: 'warning', title: 'Low Attendance Alert',            message: 'Kpayea District School attendance dropped to 69% this week.', time: '5 hours ago',  read: false },
  { id: 4,  type: 'info',    title: 'District Budget Update',          message: 'Government disbursement of $37,000 received for March allocation.', time: '1 day ago',   read: false },
  { id: 5,  type: 'success', title: 'Report Approved',                 message: 'Buchanan Public School February report marked approved.', time: '1 day ago',   read: true  },
  { id: 6,  type: 'warning', title: 'Missing Report',                  message: 'Kpayea District School has not submitted the February monthly report.', time: '2 days ago',  read: true  },
  { id: 7,  type: 'info',    title: 'New Admin Account Request',       message: 'Application for new admin at Buchanan Primary Annex pending approval.', time: '3 days ago',  read: true  },
  { id: 8,  type: 'alert',   title: 'Security Issue Reported',         message: 'Teacher threats at Kpayea District School. Police report filed.', time: '3 days ago',  read: true  },
  { id: 9,  type: 'success', title: 'District Performance Index',      message: 'District performance index improved by 3.2 points this semester.', time: '4 days ago',  read: true  },
  { id: 10, type: 'info',    title: 'Ministry Policy Update',          message: 'New MoE attendance reporting guidelines effective March 15, 2026.', time: '5 days ago',  read: true  },
]

// ─── Announcements sent by DEO ────────────────────────────────────────────
export const deoAnnouncements = [
  { id: 'ANN-001', title: 'Monthly Report Deadline Reminder',   target: 'All Schools',       date: '2026-02-25', priority: 'High',   message: 'All schools must submit February monthly reports by February 28, 2026. Failure to submit will result in administrative review.' },
  { id: 'ANN-002', title: 'District Teacher Training – March',  target: 'All Teachers',      date: '2026-02-22', priority: 'Medium', message: 'A mandatory district-wide teacher professional development training is scheduled for March 14–15. All teachers must attend.' },
  { id: 'ANN-003', title: 'New MoE Attendance Policy',          target: 'All Schools',       date: '2026-02-20', priority: 'High',   message: 'Effective March 15, 2026, attendance must be recorded and submitted digitally every Friday by 5 PM.' },
  { id: 'ANN-004', title: 'Emergency Alert – Kpayea School',   target: 'Kpayea School',     date: '2026-02-20', priority: 'Critical', message: 'Due to structural damage in Block C, all students in grades 4–6 must be relocated to the community hall immediately.' },
  { id: 'ANN-005', title: 'Q1 Academic Review',                 target: 'School Admins',     date: '2026-02-10', priority: 'Medium', message: 'Q1 academic performance reports are due by February 15. Results will be reviewed at the district performance meeting.' },
]

// ─── District Summary KPIs ────────────────────────────────────────────────
export const districtKPIs = {
  totalSchools: deoSchools.length,
  totalStudents: deoSchools.reduce((s, sc) => s + sc.students, 0),
  totalTeachers: deoSchools.reduce((s, sc) => s + sc.teachers, 0),
  activeAdmins: deoAdmins.filter(a => a.status === 'Active').length,
  avgAttendance: Math.round(deoSchools.reduce((s, sc) => s + sc.attendance, 0) / deoSchools.length),
  compliantSchools: deoSchools.filter(s => s.status === 'Compliant').length,
  flaggedSchools: deoSchools.filter(s => s.status === 'Flagged').length,
  pendingReports: deoReports.filter(r => r.status === 'Pending' || r.status === 'Missing').length,
  openIssues: deoIssues.filter(i => i.status !== 'Closed').length,
  performanceIndex: Math.round(deoSchools.reduce((s, sc) => s + sc.performanceAvg, 0) / deoSchools.length),
}
