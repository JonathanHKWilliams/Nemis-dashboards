// ─── Enrollment Trend (Grand Bassa County) ─────────────────────────────────────
export const enrollmentTrendData = [
  { month: 'Aug', students: 118200 },
  { month: 'Sep', students: 124600 },
  { month: 'Oct', students: 128900 },
  { month: 'Nov', students: 132400 },
  { month: 'Dec', students: 130700 },
  { month: 'Jan', students: 134800 },
  { month: 'Feb', students: 137300 },
]

// ─── Top Performing Districts (Grand Bassa County) ────────────────────────────
export const topSchoolsData = [
  { school: 'Buchanan City', compliance: 91 },
  { school: 'St. John River City', compliance: 87 },
  { school: 'Commonwealth Dist.', compliance: 85 },
  { school: 'District No. 3', compliance: 82 },
  { school: 'District No. 2', compliance: 78 },
]

// ─── School Approvals (Grand Bassa County) ────────────────────────────────────
export const schoolApprovals = [
  { id: 1, name: 'Buchanan City Community High School', district: 'Buchanan City', dateSubmitted: 'Feb 10, 2026', status: 'Pending', type: 'Secondary', students: 320 },
  { id: 2, name: 'St. John River Academy', district: 'St. John River City', dateSubmitted: 'Feb 12, 2026', status: 'Pending', type: 'Secondary', students: 210 },
  { id: 3, name: 'Commonwealth Technical Institute', district: 'Commonwealth District', dateSubmitted: 'Feb 14, 2026', status: 'Approved', type: 'Technical', students: 185 },
  { id: 4, name: 'Owensgrove Secondary School', district: 'Owensgrove District', dateSubmitted: 'Feb 15, 2026', status: 'Rejected', type: 'Secondary', students: 145 },
  { id: 5, name: 'Neekreen District Primary School', district: 'Neekreen District', dateSubmitted: 'Feb 16, 2026', status: 'Pending', type: 'Primary', students: 460 },
  { id: 6, name: 'District No. 4 Faith Academy', district: 'District No. 4', dateSubmitted: 'Feb 17, 2026', status: 'Pending', type: 'Primary', students: 290 },
  { id: 7, name: 'Grand Bassa Vocational Training Centre', district: 'Buchanan City', dateSubmitted: 'Feb 18, 2026', status: 'Approved', type: 'Vocational', students: 175 },
]

// ─── Teacher Oversight (Grand Bassa County) ───────────────────────────────────
export const teacherOversightData = [
  { id: 1, name: 'Henry Dolo', school: 'Grand Bassa Central High School', district: 'Buchanan City', lastReport: 'Feb 15, 2026', status: 'Submitted', reportsTotal: 8, reportsSubmitted: 8 },
  { id: 2, name: 'Robert Kollie', school: 'Grand Bassa Central High School', district: 'Buchanan City', lastReport: 'Feb 14, 2026', status: 'Pending', reportsTotal: 8, reportsSubmitted: 6 },
  { id: 3, name: 'Miatta Cooper', school: 'Grand Bassa Primary Academy', district: 'Commonwealth District', lastReport: 'Feb 13, 2026', status: 'Submitted', reportsTotal: 8, reportsSubmitted: 8 },
  { id: 4, name: 'Benjamin Dolo', school: 'Grand Bassa Central High School', district: 'Buchanan City', lastReport: 'Feb 10, 2026', status: 'Overdue', reportsTotal: 8, reportsSubmitted: 4 },
  { id: 5, name: 'Dorothy Kpaye', school: 'St. John River Secondary School', district: 'St. John River City', lastReport: 'Feb 22, 2026', status: 'Submitted', reportsTotal: 8, reportsSubmitted: 8 },
]

// ─── Recent Activities (Grand Bassa County) ───────────────────────────────────
export const recentActivities = [
  { id: 1, date: 'Feb 20, 2026', action: 'Updated Teacher Attendance', actor: 'DEO – Buchanan City', location: 'Buchanan City', status: 'Completed' },
  { id: 2, date: 'Feb 19, 2026', action: 'Student Enrollment Edit', actor: 'DEO – Commonwealth District', location: 'Commonwealth District', status: 'Approved' },
  { id: 3, date: 'Feb 18, 2026', action: 'School Registration Submitted', actor: 'New School – District No. 4', location: 'District No. 4', status: 'Pending' },
  { id: 4, date: 'Feb 17, 2026', action: 'Q1 Budget Report Filed', actor: 'Patricia Wesseh – Finance', location: 'Grand Bassa CEO Office', status: 'Completed' },
  { id: 5, date: 'Feb 16, 2026', action: 'Teacher Oversight Review', actor: 'Supervisor – St. John River City', location: 'St. John River City', status: 'Pending' },
  { id: 6, date: 'Feb 15, 2026', action: 'System User Created', actor: 'Mr. Jefferson Vobah – CEO', location: 'Grand Bassa CEO Office', status: 'Completed' },
]

// ─── System Users (Grand Bassa County) ────────────────────────────────────────
export const users = [
  { id: 1, name: 'Benjamin P. Dolo', email: 'b.dolo@gbndb.edu.lr', role: 'District Officer', district: 'Buchanan City', status: 'Active', lastLogin: 'Feb 22, 2026', gender: 'men', photoId: 52, permissions: ['view_reports', 'edit_enrollment', 'manage_schools'] },
  { id: 2, name: 'Miatta C. Cooper', email: 'm.cooper@gbndb.edu.lr', role: 'District Officer', district: 'Commonwealth District', status: 'Active', lastLogin: 'Feb 21, 2026', gender: 'women', photoId: 40, permissions: ['view_reports', 'edit_enrollment', 'manage_schools'] },
  { id: 3, name: 'Dorothy A. Kpaye', email: 'd.kpaye@gbndb.edu.lr', role: 'District Officer', district: 'St. John River City', status: 'Active', lastLogin: 'Feb 20, 2026', gender: 'women', photoId: 22, permissions: ['view_reports', 'manage_schools', 'manage_students'] },
  { id: 4, name: 'Patricia Wesseh', email: 'p.wesseh@gbndb.edu.lr', role: 'Finance Manager', district: 'Grand Bassa CEO Office', status: 'Active', lastLogin: 'Feb 23, 2026', gender: 'women', photoId: 29, permissions: ['view_reports', 'manage_budget'] },
  { id: 5, name: 'Samuel K. Sirleaf', email: 's.sirleaf@gbndb.edu.lr', role: 'Data Analyst', district: 'District No. 2', status: 'Active', lastLogin: 'Feb 23, 2026', gender: 'men', photoId: 27, permissions: ['view_reports', 'export_data', 'view_analytics'] },
  { id: 6, name: 'Rebecca J. Zarwolo', email: 'r.zarwolo@gbndb.edu.lr', role: 'Teacher Supervisor', district: 'District No. 5', status: 'Inactive', lastLogin: 'Feb 10, 2026', gender: 'women', photoId: 14, permissions: ['view_reports', 'manage_teachers', 'teacher_oversight'] },
]

// ─── Messages ──────────────────────────────────────────────────────────────────
export const messages = [
  {
    id: 1, sender: 'Benjamin P. Dolo', role: 'DEO – Buchanan City', avatar: 'BD',
    gender: 'men', photoId: 52,
    lastMessage: 'The enrollment figures for February have been updated and submitted for review.', time: '10:32 AM', unread: 3,
    thread: [
      { from: 'Benjamin P. Dolo', text: 'Good morning Mr. Vobah. The enrollment figures for February have been updated and submitted for review.', time: '10:30 AM', isMe: false },
      { from: 'Mr. Jefferson Vobah', text: 'Thank you Benjamin. Please ensure all district officers submit their reports by EOD Friday.', time: '10:45 AM', isMe: true },
      { from: 'Benjamin P. Dolo', text: 'Understood. I will send the reminder to all DEOs immediately.', time: '10:47 AM', isMe: false },
    ],
  },
  {
    id: 2, sender: 'Miatta C. Cooper', role: 'DEO – Commonwealth District', avatar: 'MC',
    gender: 'women', photoId: 40,
    lastMessage: 'Three new schools have submitted registration applications this week.', time: '9:15 AM', unread: 1,
    thread: [
      { from: 'Miatta C. Cooper', text: 'Mr. Vobah, three new schools have submitted registration applications from Commonwealth District. Please review at your earliest convenience.', time: 'Feb 23, 9:00 AM', isMe: false },
      { from: 'Mr. Jefferson Vobah', text: 'Thank you Miatta. I have forwarded the applications to the approval committee for initial review.', time: 'Feb 23, 9:30 AM', isMe: true },
      { from: 'Miatta C. Cooper', text: 'Noted. Should I follow up with the school principals directly?', time: 'Feb 23, 9:45 AM', isMe: false },
    ],
  },
  {
    id: 3, sender: 'IT Support Team', role: 'System Administrator', avatar: 'IT',
    gender: 'men', photoId: 20,
    lastMessage: 'System maintenance is scheduled for Saturday Feb 28 from 12AM–4AM.', time: 'Yesterday', unread: 0,
    thread: [
      { from: 'IT Support', text: 'Dear Mr. Vobah, system maintenance is scheduled for Saturday Feb 28 from 12AM to 4AM. Services may be unavailable during this period.', time: 'Feb 22, 9:00 AM', isMe: false },
      { from: 'Mr. Jefferson Vobah', text: 'Noted. Please ensure all data is backed up before the maintenance window begins.', time: 'Feb 22, 9:15 AM', isMe: true },
    ],
  },
  {
    id: 4, sender: 'Patricia Wesseh', role: 'Finance Manager – Grand Bassa', avatar: 'PW',
    gender: 'women', photoId: 29,
    lastMessage: 'Q1 budget utilization report is ready for your review and approval.', time: 'Feb 21', unread: 0,
    thread: [
      { from: 'Patricia Wesseh', text: 'Mr. Vobah, the Q1 budget utilization report is ready for your review and approval. Please advise on the capital allocation for Q2.', time: 'Feb 21, 2:00 PM', isMe: false },
      { from: 'Mr. Jefferson Vobah', text: 'Thank you Patricia. I will review it this afternoon and send feedback by close of business.', time: 'Feb 21, 3:10 PM', isMe: true },
    ],
  },
  {
    id: 5, sender: 'Dorothy A. Kpaye', role: 'DEO – St. John River City', avatar: 'DK',
    gender: 'women', photoId: 22,
    lastMessage: 'Teacher attendance reports for January have been compiled and attached.', time: 'Feb 20', unread: 0,
    thread: [
      { from: 'Dorothy A. Kpaye', text: 'Good afternoon Mr. Vobah. Teacher attendance reports for January have been compiled and attached for your records.', time: 'Feb 20, 1:00 PM', isMe: false },
      { from: 'Mr. Jefferson Vobah', text: 'Excellent work Dorothy. Please flag any teachers with attendance below 80% for follow-up.', time: 'Feb 20, 2:00 PM', isMe: true },
    ],
  },
]

// ─── Roles & Districts (for user management – Grand Bassa County) ─────────────
export const roles = ['District Officer', 'School Admin', 'Data Analyst', 'Finance Manager', 'Teacher Supervisor']
export const districts = ['Buchanan City', 'Commonwealth District', 'District No. 2', 'District No. 3', 'District No. 4', 'District No. 5', 'St. John River City', 'Owensgrove District', 'Neekreen District', 'Grand Bassa CEO Office']

// ─── Districts – Grand Bassa County (9 districts) ─────────────────────────────
export const districtsData = [
  { id: 1, name: 'Buchanan City',          county: 'Grand Bassa', schools: 66, students: 29700, teachers: 1230, compliance: 91, status: 'Active',   deo: { name: 'Benjamin P. Dolo',   gender: 'men',   photoId: 52, email: 'b.dolo@gbndb.edu.lr',      phone: '+231 770 220 001' } },
  { id: 2, name: 'Commonwealth District',  county: 'Grand Bassa', schools: 49, students: 21400, teachers: 890,  compliance: 85, status: 'Active',   deo: { name: 'Miatta C. Cooper',   gender: 'women', photoId: 40, email: 'm.cooper@gbndb.edu.lr',    phone: '+231 770 220 002' } },
  { id: 3, name: 'District No. 2',         county: 'Grand Bassa', schools: 38, students: 17200, teachers: 710,  compliance: 78, status: 'Active',   deo: { name: 'Samuel K. Sirleaf',  gender: 'men',   photoId: 27, email: 's.sirleaf@gbndb.edu.lr',   phone: '+231 770 220 003' } },
  { id: 4, name: 'District No. 3',         county: 'Grand Bassa', schools: 31, students: 13800, teachers: 570,  compliance: 82, status: 'Active',   deo: { name: 'Fatumata B. Koroma', gender: 'women', photoId: 31, email: 'f.koroma@gbndb.edu.lr',    phone: '+231 770 220 004' } },
  { id: 5, name: 'District No. 4',         county: 'Grand Bassa', schools: 27, students: 11600, teachers: 480,  compliance: 74, status: 'Active',   deo: { name: 'Alfred B. Duo',      gender: 'men',   photoId: 45, email: 'a.duo@gbndb.edu.lr',       phone: '+231 770 220 005' } },
  { id: 6, name: 'District No. 5',         county: 'Grand Bassa', schools: 22, students: 9400,  teachers: 390,  compliance: 69, status: 'Inactive', deo: { name: 'Rebecca J. Zarwolo', gender: 'women', photoId: 14, email: 'r.zarwolo@gbndb.edu.lr',   phone: '+231 770 220 006' } },
  { id: 7, name: 'St. John River City',    county: 'Grand Bassa', schools: 44, students: 19800, teachers: 820,  compliance: 87, status: 'Active',   deo: { name: 'Dorothy A. Kpaye',   gender: 'women', photoId: 22, email: 'd.kpaye@gbndb.edu.lr',     phone: '+231 770 220 007' } },
  { id: 8, name: 'Owensgrove District',    county: 'Grand Bassa', schools: 18, students: 7900,  teachers: 330,  compliance: 72, status: 'Active',   deo: { name: 'Morris T. Boima',    gender: 'men',   photoId: 37, email: 'm.boima@gbndb.edu.lr',     phone: '+231 770 220 008' } },
  { id: 9, name: 'Neekreen District',      county: 'Grand Bassa', schools: 15, students: 6500,  teachers: 270,  compliance: 66, status: 'Active',   deo: { name: 'Comfort S. Weah',    gender: 'women', photoId: 8,  email: 'c.weah@gbndb.edu.lr',      phone: '+231 770 220 009' } },
]

// ─── Schools Full Data (30 schools) ───────────────────────────────────────────
export const schoolsData = [
  { id: 1,  name: 'Monrovia Central High School',     code: 'MCH-001', district: 'City of Monrovia',    county: 'Montserrado', type: 'Secondary',  enrollment: 1240, capacity: 1400, teachers: 62,  compliance: 94, status: 'Active',   established: 1962, logoColor: '#002333', principal: { name: 'Dr. Samuel Kpeh', gender: 'men',   photoId: 32, email: 's.kpeh@nemis.edu.lr' } },
  { id: 2,  name: 'St. Peter High School',             code: 'SPH-002', district: 'City of Monrovia',    county: 'Montserrado', type: 'Secondary',  enrollment: 980,  capacity: 1200, teachers: 48,  compliance: 91, status: 'Active',   established: 1975, logoColor: '#A60003', principal: { name: 'Agnes Kollie',     gender: 'women', photoId: 17, email: 'a.kollie@nemis.edu.lr' } },
  { id: 3,  name: 'Greater Monrovia Community School', code: 'GMC-003', district: 'Greater Monrovia',    county: 'Montserrado', type: 'Primary',    enrollment: 760,  capacity: 900,  teachers: 34,  compliance: 87, status: 'Active',   established: 1988, logoColor: '#48D08C', principal: { name: 'James Freeman',    gender: 'men',   photoId: 14, email: 'j.freeman@nemis.edu.lr' } },
  { id: 4,  name: 'Careysburg Elementary School',      code: 'CES-004', district: 'Careysburg',          county: 'Montserrado', type: 'Primary',    enrollment: 520,  capacity: 700,  teachers: 24,  compliance: 83, status: 'Active',   established: 1994, logoColor: '#F59E0B', principal: { name: 'Mary Sirleaf',     gender: 'women', photoId: 25, email: 'm.sirleaf@nemis.edu.lr' } },
  { id: 5,  name: 'Sanniquellie Comprehensive School', code: 'SCS-005', district: 'Sanniquellie-Mahn',   county: 'Nimba',       type: 'Secondary',  enrollment: 890,  capacity: 1100, teachers: 43,  compliance: 89, status: 'Active',   established: 1970, logoColor: '#7C3AED', principal: { name: 'Philip Duo',       gender: 'men',   photoId: 41, email: 'p.duo@nemis.edu.lr' } },
  { id: 6,  name: 'Nimba Technical Institute',         code: 'NTI-006', district: 'Sanniquellie-Mahn',   county: 'Nimba',       type: 'Technical',  enrollment: 340,  capacity: 500,  teachers: 22,  compliance: 86, status: 'Active',   established: 1982, logoColor: '#059669', principal: { name: 'Clara Zarwolo',    gender: 'women', photoId: 9,  email: 'c.zarwolo@nemis.edu.lr' } },
  { id: 7,  name: 'Gbehlay-Geh Model School',         code: 'GGM-007', district: 'Gbehlay-Geh',         county: 'Nimba',       type: 'Primary',    enrollment: 480,  capacity: 600,  teachers: 21,  compliance: 81, status: 'Active',   established: 1997, logoColor: '#DC2626', principal: { name: 'Thomas Flomo',     gender: 'men',   photoId: 55, email: 't.flomo@nemis.edu.lr' } },
  { id: 8,  name: 'Suakoko District School',          code: 'SDS-008', district: 'Suakoko',             county: 'Bong',        type: 'Primary',    enrollment: 650,  capacity: 800,  teachers: 29,  compliance: 85, status: 'Active',   established: 1986, logoColor: '#2563EB', principal: { name: 'Faith Kpaye',      gender: 'women', photoId: 33, email: 'f.kpaye@nemis.edu.lr' } },
  { id: 9,  name: 'Bong County Secondary School',     code: 'BCS-009', district: 'Suakoko',             county: 'Bong',        type: 'Secondary',  enrollment: 720,  capacity: 900,  teachers: 36,  compliance: 82, status: 'Active',   established: 1978, logoColor: '#D97706', principal: { name: 'Daniel Sirleaf',   gender: 'men',   photoId: 7,  email: 'd.sirleaf@nemis.edu.lr' } },
  { id: 10, name: 'Salayea Mission School',           code: 'SMS-010', district: 'Salayea',             county: 'Bong',        type: 'Primary',    enrollment: 410,  capacity: 550,  teachers: 18,  compliance: 78, status: 'Active',   established: 1991, logoColor: '#0891B2', principal: { name: 'Esther Koroma',    gender: 'women', photoId: 46, email: 'e.koroma@nemis.edu.lr' } },
  { id: 11, name: 'Grand Bassa Central High School',  code: 'GBC-011', district: 'Grand Bassa Dist. 1', county: 'Grand Bassa', type: 'Secondary',  enrollment: 830,  capacity: 1000, teachers: 41,  compliance: 80, status: 'Active',   established: 1973, logoColor: '#0F172A', principal: { name: 'Henry Dolo',       gender: 'men',   photoId: 22, email: 'h.dolo@nemis.edu.lr' } },
  { id: 12, name: 'Grand Bassa Primary Academy',      code: 'GBP-012', district: 'Grand Bassa Dist. 2', county: 'Grand Bassa', type: 'Primary',    enrollment: 530,  capacity: 700,  teachers: 24,  compliance: 76, status: 'Active',   established: 1999, logoColor: '#9333EA', principal: { name: 'Ruth Cooper',      gender: 'women', photoId: 19, email: 'r.cooper@nemis.edu.lr' } },
  { id: 13, name: 'Voinjama District High School',    code: 'VDH-013', district: 'Voinjama',            county: 'Lofa',        type: 'Secondary',  enrollment: 760,  capacity: 900,  teachers: 37,  compliance: 78, status: 'Active',   established: 1969, logoColor: '#B45309', principal: { name: 'Moses Kamara',     gender: 'men',   photoId: 39, email: 'm.kamara@nemis.edu.lr' } },
  { id: 14, name: 'Lofa Academy',                    code: 'LAC-014', district: 'Voinjama',            county: 'Lofa',        type: 'Secondary',  enrollment: 580,  capacity: 750,  teachers: 28,  compliance: 75, status: 'Active',   established: 1985, logoColor: '#047857', principal: { name: 'Grace Fayiah',     gender: 'women', photoId: 57, email: 'g.fayiah@nemis.edu.lr' } },
  { id: 15, name: 'Kolahun Community Primary',        code: 'KCP-015', district: 'Kolahun',             county: 'Lofa',        type: 'Primary',    enrollment: 440,  capacity: 600,  teachers: 20,  compliance: 72, status: 'Active',   established: 2001, logoColor: '#1D4ED8', principal: { name: 'Edward Boima',     gender: 'men',   photoId: 48, email: 'e.boima@nemis.edu.lr' } },
  { id: 16, name: 'Kakata High School',               code: 'KHS-016', district: 'Kakata',              county: 'Margibi',     type: 'Secondary',  enrollment: 870,  capacity: 1050, teachers: 43,  compliance: 87, status: 'Active',   established: 1967, logoColor: '#BE185D', principal: { name: 'Vivian Davis',     gender: 'women', photoId: 11, email: 'v.davis@nemis.edu.lr' } },
  { id: 17, name: 'Margibi County School of Science', code: 'MCS-017', district: 'Kakata',              county: 'Margibi',     type: 'Technical',  enrollment: 290,  capacity: 400,  teachers: 19,  compliance: 84, status: 'Active',   established: 2005, logoColor: '#7C3AED', principal: { name: 'Joseph Brown',     gender: 'men',   photoId: 61, email: 'j.brown@nemis.edu.lr' } },
  { id: 18, name: 'Firestone District School',        code: 'FDS-018', district: 'Firestone',           county: 'Margibi',     type: 'Primary',    enrollment: 510,  capacity: 650,  teachers: 23,  compliance: 80, status: 'Active',   established: 1993, logoColor: '#DC2626', principal: { name: 'Abigail Wesseh',   gender: 'women', photoId: 4,  email: 'a.wesseh@nemis.edu.lr' } },
  { id: 19, name: 'Robertsport County High School',   code: 'RCH-019', district: 'Robertsport',         county: 'Grand Cape Mount', type: 'Secondary', enrollment: 620, capacity: 800, teachers: 31,  compliance: 79, status: 'Active',   established: 1980, logoColor: '#065F46', principal: { name: 'Peter Nimely',    gender: 'men',   photoId: 29, email: 'p.nimely@nemis.edu.lr' } },
  { id: 20, name: 'Tewor Community School',           code: 'TCS-020', district: 'Tewor',               county: 'Grand Cape Mount', type: 'Primary',  enrollment: 380, capacity: 500, teachers: 17,  compliance: 71, status: 'Active',   established: 2003, logoColor: '#0F766E', principal: { name: 'Patience Gono',   gender: 'women', photoId: 43, email: 'p.gono@nemis.edu.lr' } },
  { id: 21, name: 'Zwedru Multilateral High School',  code: 'ZMH-021', district: 'Zwedru',              county: 'Grand Gedeh', type: 'Secondary',  enrollment: 700,  capacity: 900,  teachers: 35,  compliance: 81, status: 'Active',   established: 1972, logoColor: '#92400E', principal: { name: 'Gerald Suah',      gender: 'men',   photoId: 16, email: 'g.suah@nemis.edu.lr' } },
  { id: 22, name: 'Tchien District Academy',          code: 'TDA-022', district: 'Tchien',              county: 'Grand Gedeh', type: 'Primary',    enrollment: 420,  capacity: 550,  teachers: 19,  compliance: 74, status: 'Active',   established: 1998, logoColor: '#6D28D9', principal: { name: 'Ophelia Kerkula',  gender: 'women', photoId: 38, email: 'o.kerkula@nemis.edu.lr' } },
  { id: 23, name: 'Greenville Central School',        code: 'GCS-023', district: 'Greenville',          county: 'Sinoe',       type: 'Secondary',  enrollment: 560,  capacity: 700,  teachers: 27,  compliance: 77, status: 'Active',   established: 1977, logoColor: '#047857', principal: { name: 'Freeman Dennis',   gender: 'men',   photoId: 53, email: 'f.dennis@nemis.edu.lr' } },
  { id: 24, name: 'Cestos City Primary School',       code: 'CCP-024', district: 'Cestos City',         county: 'River Cess',  type: 'Primary',    enrollment: 460,  capacity: 600,  teachers: 21,  compliance: 75, status: 'Active',   established: 2000, logoColor: '#1E3A5F', principal: { name: 'Lucia Nyahn',      gender: 'women', photoId: 60, email: 'l.nyahn@nemis.edu.lr' } },
  { id: 25, name: 'Harper High School',               code: 'HHS-025', district: 'Harper',              county: 'Maryland',    type: 'Secondary',  enrollment: 680,  capacity: 850,  teachers: 33,  compliance: 83, status: 'Active',   established: 1965, logoColor: '#DC2626', principal: { name: 'Clarence Bleh',    gender: 'men',   photoId: 36, email: 'c.bleh@nemis.edu.lr' } },
  { id: 26, name: 'Maryland County Vocational School',code: 'MCV-026', district: 'Harper',              county: 'Maryland',    type: 'Vocational', enrollment: 210,  capacity: 300,  teachers: 14,  compliance: 80, status: 'Active',   established: 2008, logoColor: '#7C3AED', principal: { name: 'Sandra Toe',       gender: 'women', photoId: 24, email: 's.toe@nemis.edu.lr' } },
  { id: 27, name: 'Pleebo-Sodoken District School',   code: 'PSD-027', district: 'Pleebo-Sodoken',      county: 'Maryland',    type: 'Primary',    enrollment: 490,  capacity: 650,  teachers: 22,  compliance: 77, status: 'Active',   established: 1996, logoColor: '#0369A1', principal: { name: 'Richard Kpeh',    gender: 'men',   photoId: 47, email: 'r.kpeh@nemis.edu.lr' } },
  { id: 28, name: 'Barclayville Secondary School',    code: 'BSS-028', district: 'Barclayville',        county: 'Grand Kru',   type: 'Secondary',  enrollment: 390,  capacity: 500,  teachers: 18,  compliance: 73, status: 'Active',   established: 1990, logoColor: '#B45309', principal: { name: 'Gladys Kpeh',      gender: 'women', photoId: 16, email: 'g.kpeh@nemis.edu.lr' } },
  { id: 29, name: 'Bopolu District School',           code: 'BDS-029', district: 'Bopolu',              county: 'Gbarpolu',    type: 'Primary',    enrollment: 350,  capacity: 480,  teachers: 16,  compliance: 71, status: 'Active',   established: 2002, logoColor: '#0F172A', principal: { name: 'Albert Gbaye',     gender: 'men',   photoId: 70, email: 'a.gbaye@nemis.edu.lr' } },
  { id: 30, name: 'Fish Town Government School',      code: 'FTG-030', district: 'Fish Town',           county: 'River Gee',   type: 'Primary',    enrollment: 310,  capacity: 420,  teachers: 14,  compliance: 68, status: 'Inactive', established: 1995, logoColor: '#9D174D', principal: { name: 'Naomi Pewee',      gender: 'women', photoId: 5,  email: 'n.pewee@nemis.edu.lr' } },
]

// ─── Teachers Full Data (54 teachers) ─────────────────────────────────────────
export const teachersData = [
  { id: 1,  empId: 'TCH-2021-001', name: 'Jane Doe',           gender: 'women', photoId: 2,  school: 'St. Peter High School',            district: 'City of Monrovia',    subject: 'Mathematics',   qualification: 'B.Ed',    category: 'Secondary', experience: 8,  status: 'Active',   reports: 8,  total: 8 },
  { id: 2,  empId: 'TCH-2021-002', name: 'John Mensah',        gender: 'men',   photoId: 6,  school: 'Lofa Academy',                     district: 'Voinjama',            subject: 'English',       qualification: 'M.Ed',    category: 'Secondary', experience: 12, status: 'Active',   reports: 6,  total: 8 },
  { id: 3,  empId: 'TCH-2021-003', name: 'Mary Williams',      gender: 'women', photoId: 15, school: 'Nimba Technical Institute',        district: 'Sanniquellie-Mahn',   subject: 'Science',       qualification: 'B.Sc',    category: 'Technical', experience: 6,  status: 'Active',   reports: 8,  total: 8 },
  { id: 4,  empId: 'TCH-2021-004', name: 'Robert Kollie',      gender: 'men',   photoId: 23, school: 'Grand Bassa Central High School',  district: 'Grand Bassa Dist. 1', subject: 'Social Studies', qualification: 'Diploma', category: 'Secondary', experience: 4,  status: 'Active',   reports: 4,  total: 8 },
  { id: 5,  empId: 'TCH-2021-005', name: 'Grace Togba',        gender: 'women', photoId: 30, school: 'Suakoko District School',          district: 'Suakoko',             subject: 'English',       qualification: 'B.Ed',    category: 'Primary',   experience: 9,  status: 'Active',   reports: 8,  total: 8 },
  { id: 6,  empId: 'TCH-2021-006', name: 'Emmanuel Flomo',     gender: 'men',   photoId: 10, school: 'Sanniquellie Comprehensive School', district: 'Sanniquellie-Mahn',  subject: 'Mathematics',   qualification: 'M.Ed',    category: 'Secondary', experience: 15, status: 'Active',   reports: 8,  total: 8 },
  { id: 7,  empId: 'TCH-2021-007', name: 'Comfort Weah',       gender: 'women', photoId: 42, school: 'Monrovia Central High School',     district: 'City of Monrovia',    subject: 'Biology',       qualification: 'B.Sc',    category: 'Secondary', experience: 7,  status: 'Active',   reports: 7,  total: 8 },
  { id: 8,  empId: 'TCH-2021-008', name: 'Alfred Duo',         gender: 'men',   photoId: 34, school: 'Gbehlay-Geh Model School',        district: 'Gbehlay-Geh',         subject: 'Agriculture',   qualification: 'Diploma', category: 'Primary',   experience: 5,  status: 'On Leave', reports: 3,  total: 8 },
  { id: 9,  empId: 'TCH-2021-009', name: 'Victoria Davis',     gender: 'women', photoId: 18, school: 'Kakata High School',              district: 'Kakata',              subject: 'Chemistry',     qualification: 'M.Sc',    category: 'Secondary', experience: 11, status: 'Active',   reports: 8,  total: 8 },
  { id: 10, empId: 'TCH-2021-010', name: 'Moses Kamara',       gender: 'men',   photoId: 50, school: 'Voinjama District High School',   district: 'Voinjama',            subject: 'History',       qualification: 'B.Ed',    category: 'Secondary', experience: 10, status: 'Active',   reports: 8,  total: 8 },
  { id: 11, empId: 'TCH-2021-011', name: 'Fatumata Koroma',    gender: 'women', photoId: 56, school: 'Bong County Secondary School',    district: 'Suakoko',             subject: 'French',        qualification: 'B.A',     category: 'Secondary', experience: 6,  status: 'Active',   reports: 7,  total: 8 },
  { id: 12, empId: 'TCH-2021-012', name: 'Daniel Sirleaf',     gender: 'men',   photoId: 44, school: 'Bong County Secondary School',    district: 'Suakoko',             subject: 'Physics',       qualification: 'B.Sc',    category: 'Secondary', experience: 8,  status: 'Active',   reports: 8,  total: 8 },
  { id: 13, empId: 'TCH-2021-013', name: 'Harriet Kollie',     gender: 'women', photoId: 61, school: 'Greater Monrovia Community School', district: 'Greater Monrovia',  subject: 'Mathematics',   qualification: 'B.Ed',    category: 'Primary',   experience: 5,  status: 'Active',   reports: 8,  total: 8 },
  { id: 14, empId: 'TCH-2021-014', name: 'Samuel Kpaye',       gender: 'men',   photoId: 38, school: 'Suakoko District School',         district: 'Suakoko',             subject: 'Civics',        qualification: 'Diploma', category: 'Primary',   experience: 3,  status: 'Active',   reports: 6,  total: 8 },
  { id: 15, empId: 'TCH-2021-015', name: 'Rebecca Zarwolo',    gender: 'women', photoId: 23, school: 'Nimba Technical Institute',       district: 'Sanniquellie-Mahn',   subject: 'ICT',           qualification: 'B.Sc',    category: 'Technical', experience: 7,  status: 'Active',   reports: 8,  total: 8 },
  { id: 16, empId: 'TCH-2021-016', name: 'Benjamin Dolo',      gender: 'men',   photoId: 67, school: 'Grand Bassa Central High School', district: 'Grand Bassa Dist. 1', subject: 'Mathematics',   qualification: 'M.Ed',    category: 'Secondary', experience: 14, status: 'Active',   reports: 8,  total: 8 },
  { id: 17, empId: 'TCH-2021-017', name: 'Edwina Fayiah',      gender: 'women', photoId: 35, school: 'Lofa Academy',                   district: 'Voinjama',            subject: 'Biology',       qualification: 'B.Sc',    category: 'Secondary', experience: 9,  status: 'Active',   reports: 8,  total: 8 },
  { id: 18, empId: 'TCH-2021-018', name: 'Philip Duo',         gender: 'men',   photoId: 57, school: 'Sanniquellie Comprehensive School', district: 'Sanniquellie-Mahn', subject: 'Economics',     qualification: 'B.A',     category: 'Secondary', experience: 11, status: 'Active',   reports: 7,  total: 8 },
  { id: 19, empId: 'TCH-2021-019', name: 'Dorothy Kpaye',      gender: 'women', photoId: 7,  school: 'Salayea Mission School',          district: 'Salayea',             subject: 'English',       qualification: 'B.Ed',    category: 'Primary',   experience: 6,  status: 'Active',   reports: 8,  total: 8 },
  { id: 20, empId: 'TCH-2021-020', name: 'George Kamara',      gender: 'men',   photoId: 21, school: 'Careysburg Elementary School',   district: 'Careysburg',          subject: 'Mathematics',   qualification: 'Diploma', category: 'Primary',   experience: 4,  status: 'Active',   reports: 7,  total: 8 },
  { id: 21, empId: 'TCH-2021-021', name: 'Clara Zarwolo',      gender: 'women', photoId: 48, school: 'Nimba Technical Institute',       district: 'Sanniquellie-Mahn',   subject: 'Electronics',   qualification: 'B.Eng',   category: 'Technical', experience: 5,  status: 'Active',   reports: 8,  total: 8 },
  { id: 22, empId: 'TCH-2021-022', name: 'Thomas Flomo',       gender: 'men',   photoId: 29, school: 'Gbehlay-Geh Model School',        district: 'Gbehlay-Geh',         subject: 'Social Studies', qualification: 'B.Ed',   category: 'Primary',   experience: 7,  status: 'Active',   reports: 8,  total: 8 },
  { id: 23, empId: 'TCH-2021-023', name: 'Faith Kpaye',        gender: 'women', photoId: 64, school: 'Suakoko District School',         district: 'Suakoko',             subject: 'Music',         qualification: 'Diploma', category: 'Primary',   experience: 3,  status: 'Active',   reports: 5,  total: 8 },
  { id: 24, empId: 'TCH-2021-024', name: 'Anthony Kerkula',    gender: 'men',   photoId: 43, school: 'Zwedru Multilateral High School', district: 'Zwedru',              subject: 'Physics',       qualification: 'M.Sc',    category: 'Secondary', experience: 13, status: 'Active',   reports: 8,  total: 8 },
  { id: 25, empId: 'TCH-2021-025', name: 'Mariama Dennis',     gender: 'women', photoId: 29, school: 'Greenville Central School',      district: 'Greenville',          subject: 'English',       qualification: 'B.Ed',    category: 'Secondary', experience: 8,  status: 'Active',   reports: 8,  total: 8 },
  { id: 26, empId: 'TCH-2021-026', name: 'Isaac Wreh',         gender: 'men',   photoId: 69, school: 'Tchien District Academy',        district: 'Tchien',              subject: 'Agriculture',   qualification: 'Diploma', category: 'Primary',   experience: 5,  status: 'Suspended', reports: 0, total: 8 },
  { id: 27, empId: 'TCH-2021-027', name: 'Miatta Cooper',      gender: 'women', photoId: 52, school: 'Grand Bassa Primary Academy',    district: 'Grand Bassa Dist. 2', subject: 'Mathematics',   qualification: 'B.Ed',    category: 'Primary',   experience: 6,  status: 'Active',   reports: 8,  total: 8 },
  { id: 28, empId: 'TCH-2021-028', name: 'Patrick Brown',      gender: 'men',   photoId: 15, school: 'Firestone District School',      district: 'Firestone',           subject: 'Science',       qualification: 'B.Sc',    category: 'Primary',   experience: 9,  status: 'Active',   reports: 7,  total: 8 },
  { id: 29, empId: 'TCH-2021-029', name: 'Jennie Nimely',      gender: 'women', photoId: 37, school: 'Robertsport County High School', district: 'Robertsport',         subject: 'Geography',     qualification: 'B.Ed',    category: 'Secondary', experience: 7,  status: 'Active',   reports: 8,  total: 8 },
  { id: 30, empId: 'TCH-2021-030', name: 'Cecelia Suah',       gender: 'women', photoId: 44, school: 'Zwedru Multilateral High School', district: 'Zwedru',             subject: 'Chemistry',     qualification: 'M.Sc',    category: 'Secondary', experience: 10, status: 'Active',   reports: 8,  total: 8 },
  { id: 31, empId: 'TCH-2021-031', name: 'Lawrence Gbaye',     gender: 'men',   photoId: 31, school: 'Bopolu District School',         district: 'Bopolu',              subject: 'English',       qualification: 'Diploma', category: 'Primary',   experience: 4,  status: 'Active',   reports: 6,  total: 8 },
  { id: 32, empId: 'TCH-2021-032', name: 'Roseline Pewee',     gender: 'women', photoId: 68, school: 'Fish Town Government School',   district: 'Fish Town',           subject: 'Mathematics',   qualification: 'B.Ed',    category: 'Primary',   experience: 5,  status: 'On Leave', reports: 2,  total: 8 },
  { id: 33, empId: 'TCH-2021-033', name: 'Henry Dolo',         gender: 'men',   photoId: 9,  school: 'Grand Bassa Central High School', district: 'Grand Bassa Dist. 1', subject: 'History',      qualification: 'B.A',     category: 'Secondary', experience: 11, status: 'Active',   reports: 8,  total: 8 },
  { id: 34, empId: 'TCH-2021-034', name: 'Esther Koroma',      gender: 'women', photoId: 20, school: 'Salayea Mission School',         district: 'Salayea',             subject: 'Geography',     qualification: 'B.Ed',    category: 'Primary',   experience: 6,  status: 'Active',   reports: 8,  total: 8 },
  { id: 35, empId: 'TCH-2021-035', name: 'Gerald Suah',        gender: 'men',   photoId: 47, school: 'Zwedru Multilateral High School', district: 'Zwedru',             subject: 'Economics',     qualification: 'M.A',     category: 'Secondary', experience: 16, status: 'Active',   reports: 8,  total: 8 },
  { id: 36, empId: 'TCH-2021-036', name: 'Abigail Wesseh',     gender: 'women', photoId: 59, school: 'Firestone District School',      district: 'Firestone',           subject: 'French',        qualification: 'B.A',     category: 'Primary',   experience: 4,  status: 'Active',   reports: 7,  total: 8 },
  { id: 37, empId: 'TCH-2021-037', name: 'Peter Nimely',       gender: 'men',   photoId: 3,  school: 'Robertsport County High School', district: 'Robertsport',         subject: 'Mathematics',   qualification: 'B.Sc',    category: 'Secondary', experience: 8,  status: 'Active',   reports: 8,  total: 8 },
  { id: 38, empId: 'TCH-2021-038', name: 'Vivian Davis',       gender: 'women', photoId: 32, school: 'Kakata High School',             district: 'Kakata',              subject: 'Biology',       qualification: 'M.Sc',    category: 'Secondary', experience: 12, status: 'Active',   reports: 8,  total: 8 },
  { id: 39, empId: 'TCH-2021-039', name: 'Roland Tarr',        gender: 'men',   photoId: 63, school: 'Cestos City Primary School',    district: 'Cestos City',         subject: 'English',       qualification: 'Diploma', category: 'Primary',   experience: 3,  status: 'Active',   reports: 6,  total: 8 },
  { id: 40, empId: 'TCH-2021-040', name: 'Hannah Kpeh',        gender: 'women', photoId: 41, school: 'Barclayville Secondary School',  district: 'Barclayville',        subject: 'Mathematics',   qualification: 'B.Ed',    category: 'Secondary', experience: 7,  status: 'Active',   reports: 8,  total: 8 },
  { id: 41, empId: 'TCH-2021-041', name: 'Christopher Toe',    gender: 'men',   photoId: 55, school: 'Pleebo-Sodoken District School', district: 'Pleebo-Sodoken',      subject: 'Science',       qualification: 'B.Sc',    category: 'Primary',   experience: 5,  status: 'Active',   reports: 7,  total: 8 },
  { id: 42, empId: 'TCH-2021-042', name: 'Bernice Bleh',       gender: 'women', photoId: 26, school: 'Harper High School',            district: 'Harper',              subject: 'English',       qualification: 'M.A',     category: 'Secondary', experience: 13, status: 'Active',   reports: 8,  total: 8 },
  { id: 43, empId: 'TCH-2021-043', name: 'Finda Nyahn',        gender: 'women', photoId: 49, school: 'Cestos City Primary School',    district: 'Cestos City',         subject: 'Mathematics',   qualification: 'B.Ed',    category: 'Primary',   experience: 6,  status: 'Active',   reports: 8,  total: 8 },
  { id: 44, empId: 'TCH-2021-044', name: 'Morris Boima',       gender: 'men',   photoId: 72, school: 'Kolahun Community Primary',     district: 'Kolahun',             subject: 'Agriculture',   qualification: 'Diploma', category: 'Primary',   experience: 5,  status: 'Active',   reports: 7,  total: 8 },
  { id: 45, empId: 'TCH-2021-045', name: 'Ophelia Kerkula',    gender: 'women', photoId: 13, school: 'Tchien District Academy',       district: 'Tchien',              subject: 'English',       qualification: 'B.Ed',    category: 'Primary',   experience: 4,  status: 'Active',   reports: 8,  total: 8 },
  { id: 46, empId: 'TCH-2021-046', name: 'Clarence Bleh',      gender: 'men',   photoId: 19, school: 'Harper High School',            district: 'Harper',              subject: 'Physics',       qualification: 'M.Sc',    category: 'Secondary', experience: 17, status: 'Active',   reports: 8,  total: 8 },
  { id: 47, empId: 'TCH-2021-047', name: 'Lucia Nyahn',        gender: 'women', photoId: 66, school: 'Cestos City Primary School',   district: 'Cestos City',         subject: 'Social Studies', qualification: 'B.Ed',   category: 'Primary',   experience: 3,  status: 'Active',   reports: 6,  total: 8 },
  { id: 48, empId: 'TCH-2021-048', name: 'Freeman Dennis',     gender: 'men',   photoId: 40, school: 'Greenville Central School',    district: 'Greenville',          subject: 'Mathematics',   qualification: 'B.Sc',    category: 'Secondary', experience: 9,  status: 'Active',   reports: 8,  total: 8 },
  { id: 49, empId: 'TCH-2021-049', name: 'Sandra Toe',         gender: 'women', photoId: 34, school: 'Maryland County Vocational School', district: 'Harper',          subject: 'Cosmetology',   qualification: 'Diploma', category: 'Vocational',experience: 5,  status: 'Active',   reports: 7,  total: 8 },
  { id: 50, empId: 'TCH-2021-050', name: 'Richard Kpeh',       gender: 'men',   photoId: 26, school: 'Pleebo-Sodoken District School', district: 'Pleebo-Sodoken',     subject: 'History',       qualification: 'B.A',     category: 'Primary',   experience: 6,  status: 'Active',   reports: 8,  total: 8 },
  { id: 51, empId: 'TCH-2021-051', name: 'Gladys Kpeh',        gender: 'women', photoId: 45, school: 'Barclayville Secondary School', district: 'Barclayville',        subject: 'Biology',       qualification: 'B.Sc',    category: 'Secondary', experience: 8,  status: 'Active',   reports: 8,  total: 8 },
  { id: 52, empId: 'TCH-2021-052', name: 'Albert Gbaye',       gender: 'men',   photoId: 66, school: 'Bopolu District School',        district: 'Bopolu',              subject: 'Civics',        qualification: 'Diploma', category: 'Primary',   experience: 4,  status: 'Active',   reports: 7,  total: 8 },
  { id: 53, empId: 'TCH-2021-053', name: 'Naomi Pewee',        gender: 'women', photoId: 22, school: 'Fish Town Government School',  district: 'Fish Town',           subject: 'English',       qualification: 'B.Ed',    category: 'Primary',   experience: 5,  status: 'On Leave', reports: 1,  total: 8 },
  { id: 54, empId: 'TCH-2021-054', name: 'Edward Boima',       gender: 'men',   photoId: 74, school: 'Kolahun Community Primary',    district: 'Kolahun',             subject: 'Mathematics',   qualification: 'B.Ed',    category: 'Primary',   experience: 7,  status: 'Active',   reports: 8,  total: 8 },
]

// ─── Students Full Data (60 students across schools) ──────────────────────────
export const studentsData = [
  { id: 1,  stuId: 'STU-2024-001', name: 'Aminata Konneh',    gender: 'women', photoId: 70, school: 'Monrovia Central High School',     district: 'City of Monrovia',    grade: 'Grade 10', age: 16, status: 'Active',   performance: 'Excellent', enrolled: 'Sep 2024' },
  { id: 2,  stuId: 'STU-2024-002', name: 'Marcus Freeman Jr', gender: 'men',   photoId: 65, school: 'Monrovia Central High School',     district: 'City of Monrovia',    grade: 'Grade 11', age: 17, status: 'Active',   performance: 'Good',      enrolled: 'Sep 2024' },
  { id: 3,  stuId: 'STU-2024-003', name: 'Hawa Kamara',       gender: 'women', photoId: 71, school: 'St. Peter High School',            district: 'City of Monrovia',    grade: 'Grade 9',  age: 15, status: 'Active',   performance: 'Good',      enrolled: 'Sep 2024' },
  { id: 4,  stuId: 'STU-2024-004', name: 'Joseph Kollie',     gender: 'men',   photoId: 76, school: 'St. Peter High School',            district: 'City of Monrovia',    grade: 'Grade 10', age: 16, status: 'Active',   performance: 'Average',   enrolled: 'Sep 2024' },
  { id: 5,  stuId: 'STU-2024-005', name: 'Fatima Bah',        gender: 'women', photoId: 63, school: 'Greater Monrovia Community School', district: 'Greater Monrovia',   grade: 'Grade 6',  age: 12, status: 'Active',   performance: 'Excellent', enrolled: 'Sep 2024' },
  { id: 6,  stuId: 'STU-2024-006', name: 'Michael Wreh',      gender: 'men',   photoId: 80, school: 'Greater Monrovia Community School', district: 'Greater Monrovia',   grade: 'Grade 5',  age: 11, status: 'Active',   performance: 'Good',      enrolled: 'Sep 2024' },
  { id: 7,  stuId: 'STU-2024-007', name: 'Korto Zan',         gender: 'women', photoId: 74, school: 'Careysburg Elementary School',     district: 'Careysburg',          grade: 'Grade 4',  age: 10, status: 'Active',   performance: 'Good',      enrolled: 'Sep 2024' },
  { id: 8,  stuId: 'STU-2024-008', name: 'David Togba',       gender: 'men',   photoId: 62, school: 'Careysburg Elementary School',     district: 'Careysburg',          grade: 'Grade 5',  age: 11, status: 'Active',   performance: 'Average',   enrolled: 'Sep 2024' },
  { id: 9,  stuId: 'STU-2024-009', name: 'Musu Flomo',        gender: 'women', photoId: 66, school: 'Sanniquellie Comprehensive School', district: 'Sanniquellie-Mahn',  grade: 'Grade 11', age: 17, status: 'Active',   performance: 'Excellent', enrolled: 'Sep 2024' },
  { id: 10, stuId: 'STU-2024-010', name: 'Samuel Duo',        gender: 'men',   photoId: 67, school: 'Sanniquellie Comprehensive School', district: 'Sanniquellie-Mahn',  grade: 'Grade 10', age: 16, status: 'Active',   performance: 'Good',      enrolled: 'Sep 2024' },
  { id: 11, stuId: 'STU-2024-011', name: 'Cecilia Zarwolo',   gender: 'women', photoId: 68, school: 'Nimba Technical Institute',        district: 'Sanniquellie-Mahn',   grade: 'Year 2',   age: 18, status: 'Active',   performance: 'Excellent', enrolled: 'Sep 2023' },
  { id: 12, stuId: 'STU-2024-012', name: 'Emmanuel Gbeh',     gender: 'men',   photoId: 73, school: 'Nimba Technical Institute',        district: 'Sanniquellie-Mahn',   grade: 'Year 1',   age: 17, status: 'Active',   performance: 'Good',      enrolled: 'Sep 2024' },
  { id: 13, stuId: 'STU-2024-013', name: 'Alice Kpaye',       gender: 'women', photoId: 79, school: 'Suakoko District School',          district: 'Suakoko',             grade: 'Grade 6',  age: 12, status: 'Active',   performance: 'Good',      enrolled: 'Sep 2024' },
  { id: 14, stuId: 'STU-2024-014', name: 'Anthony Sirleaf',   gender: 'men',   photoId: 60, school: 'Suakoko District School',          district: 'Suakoko',             grade: 'Grade 5',  age: 11, status: 'Active',   performance: 'Below Avg', enrolled: 'Sep 2024' },
  { id: 15, stuId: 'STU-2024-015', name: 'Tenneh Koroma',     gender: 'women', photoId: 72, school: 'Bong County Secondary School',     district: 'Suakoko',             grade: 'Grade 9',  age: 15, status: 'Active',   performance: 'Good',      enrolled: 'Sep 2024' },
  { id: 16, stuId: 'STU-2024-016', name: 'Richard Dolo',      gender: 'men',   photoId: 58, school: 'Bong County Secondary School',     district: 'Suakoko',             grade: 'Grade 10', age: 16, status: 'Active',   performance: 'Average',   enrolled: 'Sep 2024' },
  { id: 17, stuId: 'STU-2024-017', name: 'Patience Wesseh',   gender: 'women', photoId: 75, school: 'Salayea Mission School',           district: 'Salayea',             grade: 'Grade 4',  age: 10, status: 'Active',   performance: 'Excellent', enrolled: 'Sep 2024' },
  { id: 18, stuId: 'STU-2024-018', name: 'George Boima',      gender: 'men',   photoId: 56, school: 'Salayea Mission School',           district: 'Salayea',             grade: 'Grade 5',  age: 11, status: 'Active',   performance: 'Good',      enrolled: 'Sep 2024' },
  { id: 19, stuId: 'STU-2024-019', name: 'Fatu Cooper',       gender: 'women', photoId: 77, school: 'Grand Bassa Central High School',  district: 'Grand Bassa Dist. 1', grade: 'Grade 11', age: 17, status: 'Active',   performance: 'Excellent', enrolled: 'Sep 2024' },
  { id: 20, stuId: 'STU-2024-020', name: 'James Tarr',        gender: 'men',   photoId: 64, school: 'Grand Bassa Central High School',  district: 'Grand Bassa Dist. 1', grade: 'Grade 9',  age: 15, status: 'Inactive', performance: 'Below Avg', enrolled: 'Sep 2023' },
  { id: 21, stuId: 'STU-2024-021', name: 'Kumba Konneh',      gender: 'women', photoId: 78, school: 'Grand Bassa Primary Academy',      district: 'Grand Bassa Dist. 2', grade: 'Grade 3',  age: 9,  status: 'Active',   performance: 'Good',      enrolled: 'Sep 2024' },
  { id: 22, stuId: 'STU-2024-022', name: 'Pascal Suah',       gender: 'men',   photoId: 59, school: 'Grand Bassa Primary Academy',      district: 'Grand Bassa Dist. 2', grade: 'Grade 4',  age: 10, status: 'Active',   performance: 'Average',   enrolled: 'Sep 2024' },
  { id: 23, stuId: 'STU-2024-023', name: 'Mary Kamara',       gender: 'women', photoId: 80, school: 'Voinjama District High School',    district: 'Voinjama',            grade: 'Grade 10', age: 16, status: 'Active',   performance: 'Good',      enrolled: 'Sep 2024' },
  { id: 24, stuId: 'STU-2024-024', name: 'Solomon Togba',     gender: 'men',   photoId: 69, school: 'Voinjama District High School',    district: 'Voinjama',            grade: 'Grade 9',  age: 15, status: 'Active',   performance: 'Excellent', enrolled: 'Sep 2024' },
  { id: 25, stuId: 'STU-2024-025', name: 'Mariatu Fayiah',    gender: 'women', photoId: 73, school: 'Lofa Academy',                     district: 'Voinjama',            grade: 'Grade 11', age: 17, status: 'Active',   performance: 'Good',      enrolled: 'Sep 2024' },
  { id: 26, stuId: 'STU-2024-026', name: 'James Boima',       gender: 'men',   photoId: 61, school: 'Lofa Academy',                     district: 'Voinjama',            grade: 'Grade 10', age: 16, status: 'Active',   performance: 'Average',   enrolled: 'Sep 2024' },
  { id: 27, stuId: 'STU-2024-027', name: 'Agnes Kollie',      gender: 'women', photoId: 76, school: 'Kolahun Community Primary',        district: 'Kolahun',             grade: 'Grade 5',  age: 11, status: 'Active',   performance: 'Good',      enrolled: 'Sep 2024' },
  { id: 28, stuId: 'STU-2024-028', name: 'Martin Gbaye',      gender: 'men',   photoId: 57, school: 'Kolahun Community Primary',        district: 'Kolahun',             grade: 'Grade 6',  age: 12, status: 'Active',   performance: 'Average',   enrolled: 'Sep 2024' },
  { id: 29, stuId: 'STU-2024-029', name: 'Oretha Davis',      gender: 'women', photoId: 63, school: 'Kakata High School',               district: 'Kakata',              grade: 'Grade 12', age: 18, status: 'Active',   performance: 'Excellent', enrolled: 'Sep 2024' },
  { id: 30, stuId: 'STU-2024-030', name: 'Emmanuel Wesseh',   gender: 'men',   photoId: 66, school: 'Kakata High School',               district: 'Kakata',              grade: 'Grade 11', age: 17, status: 'Active',   performance: 'Good',      enrolled: 'Sep 2024' },
  { id: 31, stuId: 'STU-2024-031', name: 'Comfort Nimely',    gender: 'women', photoId: 71, school: 'Margibi County School of Science', district: 'Kakata',              grade: 'Year 2',   age: 19, status: 'Active',   performance: 'Excellent', enrolled: 'Sep 2023' },
  { id: 32, stuId: 'STU-2024-032', name: 'Benjamin Cooper',   gender: 'men',   photoId: 74, school: 'Firestone District School',        district: 'Firestone',           grade: 'Grade 6',  age: 12, status: 'Active',   performance: 'Good',      enrolled: 'Sep 2024' },
  { id: 33, stuId: 'STU-2024-033', name: 'Fatu Bleh',         gender: 'women', photoId: 65, school: 'Robertsport County High School',   district: 'Robertsport',         grade: 'Grade 10', age: 16, status: 'Active',   performance: 'Good',      enrolled: 'Sep 2024' },
  { id: 34, stuId: 'STU-2024-034', name: 'Peter Gono',        gender: 'men',   photoId: 78, school: 'Tewor Community School',           district: 'Tewor',               grade: 'Grade 4',  age: 10, status: 'Active',   performance: 'Average',   enrolled: 'Sep 2024' },
  { id: 35, stuId: 'STU-2024-035', name: 'Grace Suah',        gender: 'women', photoId: 69, school: 'Zwedru Multilateral High School',  district: 'Zwedru',              grade: 'Grade 11', age: 17, status: 'Active',   performance: 'Good',      enrolled: 'Sep 2024' },
  { id: 36, stuId: 'STU-2024-036', name: 'Daniel Kerkula',    gender: 'men',   photoId: 62, school: 'Tchien District Academy',          district: 'Tchien',              grade: 'Grade 5',  age: 11, status: 'Active',   performance: 'Below Avg', enrolled: 'Sep 2024' },
  { id: 37, stuId: 'STU-2024-037', name: 'Satta Dennis',      gender: 'women', photoId: 77, school: 'Greenville Central School',        district: 'Greenville',          grade: 'Grade 9',  age: 15, status: 'Active',   performance: 'Good',      enrolled: 'Sep 2024' },
  { id: 38, stuId: 'STU-2024-038', name: 'Patrick Wreh',      gender: 'men',   photoId: 80, school: 'Cestos City Primary School',       district: 'Cestos City',         grade: 'Grade 5',  age: 11, status: 'Active',   performance: 'Average',   enrolled: 'Sep 2024' },
  { id: 39, stuId: 'STU-2024-039', name: 'Hannah Tarr',       gender: 'women', photoId: 72, school: 'Harper High School',               district: 'Harper',              grade: 'Grade 12', age: 18, status: 'Active',   performance: 'Excellent', enrolled: 'Sep 2024' },
  { id: 40, stuId: 'STU-2024-040', name: 'George Toe',        gender: 'men',   photoId: 75, school: 'Maryland County Vocational School', district: 'Harper',             grade: 'Year 1',   age: 17, status: 'Active',   performance: 'Good',      enrolled: 'Sep 2024' },
  { id: 41, stuId: 'STU-2024-041', name: 'Rebecca Kpeh',      gender: 'women', photoId: 67, school: 'Pleebo-Sodoken District School',   district: 'Pleebo-Sodoken',      grade: 'Grade 4',  age: 10, status: 'Active',   performance: 'Good',      enrolled: 'Sep 2024' },
  { id: 42, stuId: 'STU-2024-042', name: 'Alfred Gbaye',      gender: 'men',   photoId: 70, school: 'Barclayville Secondary School',    district: 'Barclayville',        grade: 'Grade 10', age: 16, status: 'Active',   performance: 'Average',   enrolled: 'Sep 2024' },
  { id: 43, stuId: 'STU-2024-043', name: 'Victoria Pewee',    gender: 'women', photoId: 73, school: 'Bopolu District School',           district: 'Bopolu',              grade: 'Grade 3',  age: 9,  status: 'Active',   performance: 'Good',      enrolled: 'Sep 2024' },
  { id: 44, stuId: 'STU-2024-044', name: 'Isaac Flomo',       gender: 'men',   photoId: 68, school: 'Fish Town Government School',      district: 'Fish Town',           grade: 'Grade 5',  age: 11, status: 'Inactive', performance: 'Below Avg', enrolled: 'Sep 2023' },
]

// ─── Notifications (Grand Bassa County) ───────────────────────────────────────
export const notifications = [
  { id: 1,  type: 'approval', title: 'School Approval Required',       message: 'Buchanan City Community High School has submitted a registration request pending CEO approval.',   time: '2 hours ago',  read: false },
  { id: 2,  type: 'report',   title: 'New District Report',            message: 'Buchanan City DEO submitted the February enrollment report for your review.',                       time: '4 hours ago',  read: false },
  { id: 3,  type: 'alert',    title: 'Teacher Report Missing',         message: 'Benjamin Dolo from Grand Bassa Central High School has not submitted the monthly activity report.', time: '1 day ago',    read: false },
  { id: 4,  type: 'system',   title: 'System Update Complete',         message: 'NEMIS platform updated successfully to version 3.2.1.',                                             time: '2 days ago',   read: true  },
  { id: 5,  type: 'report',   title: 'Budget Report Submitted',        message: 'Patricia Wesseh has filed the Q1 budget utilization report for Grand Bassa County.',               time: '3 days ago',   read: true  },
  { id: 6,  type: 'approval', title: 'School Approval Required',       message: 'St. John River Academy has submitted an expansion application requiring CEO review.',              time: '5 hours ago',  read: false },
  { id: 7,  type: 'alert',    title: 'Enrollment Discrepancy Found',   message: 'Data mismatch detected in Commonwealth District enrollment records. Please review.',               time: '6 hours ago',  read: false },
  { id: 8,  type: 'report',   title: 'Quarterly Report Ready',         message: 'Grand Bassa County district performance quarterly report for Q4 2025 is ready for your review.',   time: '1 day ago',    read: true  },
  { id: 9,  type: 'system',   title: 'New User Account Created',       message: 'Samuel K. Sirleaf has been onboarded as Data Analyst for District No. 2.',                         time: '2 days ago',   read: true  },
  { id: 10, type: 'alert',    title: 'Compliance Threshold Warning',   message: 'Neekreen District has dropped below the 70% compliance threshold. Immediate action required.',     time: '3 days ago',   read: false },
  { id: 11, type: 'approval', title: 'DEO Transfer Request',           message: 'Transfer request submitted for DEO Morris Boima from Owensgrove District.',                        time: '1 week ago',   read: true  },
  { id: 12, type: 'system',   title: 'Scheduled Maintenance Reminder', message: 'System maintenance is scheduled for Sunday Mar 1, 2026 from 12AM to 4AM.',                         time: '1 week ago',   read: true  },
]

// ─── Reports Data (Grand Bassa County) ────────────────────────────────────────
export const reportsData = [
  { id: 1,  title: 'February Enrollment Summary – Grand Bassa', type: 'Enrollment', district: 'All Grand Bassa Districts', date: 'Feb 24, 2026', status: 'Ready',      format: 'PDF' },
  { id: 2,  title: 'Q1 2026 Teacher Compliance Report',         type: 'Compliance', district: 'All Grand Bassa Districts', date: 'Feb 20, 2026', status: 'Ready',      format: 'Excel' },
  { id: 3,  title: 'Buchanan City District Performance',         type: 'District',   district: 'Buchanan City',            date: 'Feb 18, 2026', status: 'Ready',      format: 'PDF' },
  { id: 4,  title: 'Commonwealth District Schools Report',       type: 'School',     district: 'Commonwealth District',    date: 'Feb 15, 2026', status: 'Ready',      format: 'PDF' },
  { id: 5,  title: 'Q4 2025 Budget Utilization – Grand Bassa',  type: 'Finance',    district: 'Grand Bassa CEO Office',   date: 'Feb 10, 2026', status: 'Ready',      format: 'Excel' },
  { id: 6,  title: 'Annual Teacher Performance 2025',            type: 'Teacher',    district: 'All Grand Bassa Districts', date: 'Jan 30, 2026', status: 'Ready',      format: 'PDF' },
  { id: 7,  title: 'St. John River City School Audit',           type: 'Audit',      district: 'St. John River City',      date: 'Jan 25, 2026', status: 'Ready',      format: 'PDF' },
  { id: 8,  title: 'Student Performance Analysis – Grand Bassa', type: 'Student',    district: 'All Grand Bassa Districts', date: 'Jan 20, 2026', status: 'Processing', format: 'Excel' },
  { id: 9,  title: 'Grand Bassa Infrastructure & Facilities',    type: 'District',   district: 'Owensgrove District',      date: 'Jan 15, 2026', status: 'Ready',      format: 'PDF' },
  { id: 10, title: 'System Usage & Access Logs',                 type: 'System',     district: 'Grand Bassa CEO Office',   date: 'Jan 10, 2026', status: 'Ready',      format: 'CSV' },
]

// ─── districtsList alias (backward compat) ────────────────────────────────────
export const districtsList = districts
