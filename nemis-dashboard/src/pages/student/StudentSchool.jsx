import { schoolInfo, studentProfile, subjects } from '../../data/studentData'
import { MapPin, Phone, Mail, Users, BookOpen, Building2, CalendarDays, Megaphone, UserCheck } from 'lucide-react'

const EVENTS = [
  { date: 'Mar 5',  title: 'Mid-Term Examinations Begin',      type: 'Exam',     color: '#A60003', bg: 'rgba(166,0,3,0.08)' },
  { date: 'Mar 14', title: 'Science Fair',                     type: 'Event',    color: '#2563EB', bg: 'rgba(37,99,235,0.08)' },
  { date: 'Mar 20', title: 'Parent-Teacher Conference',        type: 'Meeting',  color: '#D97706', bg: 'rgba(217,119,6,0.08)' },
  { date: 'Apr 3',  title: 'Inter-School Sports Day',          type: 'Sports',   color: '#16A34A', bg: 'rgba(22,163,74,0.08)' },
  { date: 'Apr 18', title: 'Term 1 Examination Results Day',   type: 'Results',  color: '#7C3AED', bg: 'rgba(124,58,237,0.08)' },
]

const ANNOUNCEMENTS = [
  { title: 'Mid-Term Exams — March 5', body: 'Mid-Term Examinations will begin on March 5, 2026. Timetables will be shared by your class teachers. Students are advised to begin revision.', by: 'School Admin', date: 'Feb 20, 2026' },
  { title: 'New Library Resources', body: 'The school library has received new textbooks and reference materials for Term 2. Students can check out books from 7 AM to 4 PM on school days.', by: 'Library Staff', date: 'Feb 15, 2026' },
  { title: 'School Uniform Reminder', body: 'All students are reminded to wear their complete school uniform daily. Students without proper uniform will be required to call parents for a change before entering class.', by: 'Dean of Students', date: 'Feb 10, 2026' },
]

const STAFF = [
  ...subjects.map(s => ({ name: s.teacher, role: `${s.name} Teacher`, gender: s.teacherGender, photoId: s.teacherPhotoId })),
  { name: schoolInfo.principal, role: 'Principal', gender: schoolInfo.principalGender, photoId: schoolInfo.principalPhotoId },
  { name: 'Mrs. Jane Doe', role: 'Homeroom Teacher (9A)', gender: 'women', photoId: 2 },
]

function StatCard({ label, value, icon: Icon, color, bg }) {
  return (
    <div className="bg-white rounded-2xl p-5" style={{ border: '1px solid #EEF0F3', boxShadow: '0 1px 6px rgba(0,35,51,0.05)' }}>
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: bg }}>
          <Icon size={18} color={color} strokeWidth={3} />
        </div>
        <div>
          <p className="text-2xl font-black text-[#002333]" style={{ fontFamily: 'Sora, sans-serif' }}>
            {typeof value === 'number' ? value.toLocaleString() : value}
          </p>
          <p className="text-xs font-bold text-[#6B7280] mt-0.5" style={{ fontFamily: 'Roboto, sans-serif' }}>{label}</p>
        </div>
      </div>
    </div>
  )
}

export default function StudentSchool() {
  return (
    <div className="space-y-6 max-w-[900px]">
      <div>
        <h2 className="text-2xl font-black text-[#002333]" style={{ fontFamily: 'Sora, sans-serif' }}>My School</h2>
        <p className="text-sm font-bold text-[#6B7280] mt-0.5" style={{ fontFamily: 'Roboto, sans-serif' }}>
          School information for {studentProfile.grade} · Academic Year {schoolInfo.academicYear}
        </p>
      </div>

      {/* School Banner */}
      <div className="bg-white rounded-2xl overflow-hidden" style={{ border: '1px solid #EEF0F3', boxShadow: '0 1px 6px rgba(0,35,51,0.05)' }}>
        <div className="h-2 w-full" style={{ background: 'linear-gradient(90deg, #002333 0%, #48D08C 100%)' }} />
        <div className="px-8 py-6 flex items-center gap-6">
          <img
            src={`https://ui-avatars.com/api/?name=${encodeURIComponent(schoolInfo.name)}&size=80&background=002333&color=48D08C&bold=true&font-size=0.3`}
            alt={schoolInfo.name}
            className="rounded-2xl"
            style={{ width: 80, height: 80, border: '2px solid #EEF0F3' }}
          />
          <div>
            <h3 className="text-xl font-black text-[#002333]" style={{ fontFamily: 'Sora, sans-serif' }}>{schoolInfo.name}</h3>
            <p className="text-sm font-bold text-[#6B7280] mt-0.5" style={{ fontFamily: 'Roboto, sans-serif' }}>
              {schoolInfo.type} School · Est. {schoolInfo.established}
            </p>
            <div className="flex items-center gap-1.5 mt-2">
              <span className="text-xs px-2.5 py-0.5 rounded-full font-black"
                style={{ background: 'rgba(72,208,140,0.12)', color: '#16A34A', fontFamily: 'Roboto, sans-serif' }}>
                NEMIS Registered
              </span>
              <span className="text-xs font-bold text-[#9CA3AF]" style={{ fontFamily: 'Roboto, sans-serif' }}>{schoolInfo.code}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <StatCard label="Total Students" value={schoolInfo.totalStudents} icon={Users}     color="#002333" bg="rgba(0,35,51,0.06)" />
        <StatCard label="Total Teachers" value={schoolInfo.totalTeachers} icon={BookOpen}  color="#002333" bg="rgba(0,35,51,0.06)" />
        <StatCard label="Total Classes"  value={schoolInfo.totalClasses}  icon={Building2} color="#002333" bg="rgba(0,35,51,0.06)" />
      </div>

      {/* Principal + Contact */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white rounded-2xl p-6" style={{ border: '1px solid #EEF0F3', boxShadow: '0 1px 6px rgba(0,35,51,0.05)' }}>
          <p className="text-xs font-black uppercase tracking-wider text-[#6B7280] mb-4" style={{ fontFamily: 'Roboto, sans-serif' }}>School Principal</p>
          <div className="flex items-center gap-4">
            <img
              src={`https://randomuser.me/api/portraits/${schoolInfo.principalGender}/${schoolInfo.principalPhotoId}.jpg`}
              alt={schoolInfo.principal}
              className="rounded-full object-cover flex-shrink-0"
              style={{ width: 60, height: 60, border: '2px solid #EEF0F3' }}
              onError={e => { e.target.style.display = 'none' }}
            />
            <div>
              <p className="font-black text-[#002333]" style={{ fontFamily: 'Sora, sans-serif' }}>{schoolInfo.principal}</p>
              <p className="text-sm font-bold text-[#6B7280] mt-0.5" style={{ fontFamily: 'Roboto, sans-serif' }}>Principal</p>
              <p className="text-xs font-bold text-[#9CA3AF] mt-1" style={{ fontFamily: 'Roboto, sans-serif' }}>{schoolInfo.name}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6" style={{ border: '1px solid #EEF0F3', boxShadow: '0 1px 6px rgba(0,35,51,0.05)' }}>
          <p className="text-xs font-black uppercase tracking-wider text-[#6B7280] mb-4" style={{ fontFamily: 'Roboto, sans-serif' }}>Contact Information</p>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <MapPin size={15} color="#002333" strokeWidth={2.5} className="flex-shrink-0 mt-0.5" />
              <span className="text-sm font-bold text-[#4B5563]" style={{ fontFamily: 'Roboto, sans-serif' }}>{schoolInfo.address}</span>
            </div>
            <div className="flex items-center gap-3">
              <Phone size={15} color="#002333" strokeWidth={2.5} />
              <span className="text-sm font-bold text-[#4B5563]" style={{ fontFamily: 'Roboto, sans-serif' }}>{schoolInfo.phone}</span>
            </div>
            <div className="flex items-center gap-3">
              <Mail size={15} color="#002333" strokeWidth={2.5} />
              <span className="text-sm font-bold text-[#4B5563]" style={{ fontFamily: 'Roboto, sans-serif' }}>{schoolInfo.email}</span>
            </div>
          </div>
        </div>
      </div>

      {/* My Class Info */}
      <div className="bg-white rounded-2xl p-6" style={{ border: '1px solid #EEF0F3', boxShadow: '0 1px 6px rgba(0,35,51,0.05)' }}>
        <p className="text-xs font-black uppercase tracking-wider text-[#6B7280] mb-4" style={{ fontFamily: 'Roboto, sans-serif' }}>My Class Information</p>
        <div className="grid grid-cols-3 gap-6">
          {[
            { label: 'Class',             value: studentProfile.grade },
            { label: 'Student ID',        value: studentProfile.id },
            { label: 'Homeroom Teacher',  value: studentProfile.homeroomTeacher },
            { label: 'Academic Year',     value: schoolInfo.academicYear },
            { label: 'District',          value: schoolInfo.district },
            { label: 'School Code',       value: schoolInfo.code },
          ].map(item => (
            <div key={item.label}>
              <p className="text-xs font-bold text-[#9CA3AF] mb-0.5" style={{ fontFamily: 'Roboto, sans-serif' }}>{item.label}</p>
              <p className="text-sm font-black text-[#002333]" style={{ fontFamily: 'Roboto, sans-serif' }}>{item.value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Upcoming Events */}
      <div className="bg-white rounded-2xl overflow-hidden" style={{ border: '1px solid #EEF0F3', boxShadow: '0 1px 6px rgba(0,35,51,0.05)' }}>
        <div className="px-6 py-4 flex items-center gap-2.5" style={{ borderBottom: '2px solid #EEF0F3', background: '#002333' }}>
          <CalendarDays size={16} color="white" strokeWidth={3} />
          <p className="text-sm font-black text-white" style={{ fontFamily: 'Sora, sans-serif' }}>Upcoming School Events</p>
        </div>
        <div className="divide-y divide-[#F4F6F8]">
          {EVENTS.map((ev, i) => (
            <div key={i} className="px-6 py-4 flex items-center gap-4">
              <div className="w-16 text-center flex-shrink-0 rounded-xl py-2"
                style={{ background: ev.bg }}>
                <p className="text-xs font-black" style={{ color: ev.color, fontFamily: 'Sora, sans-serif' }}>{ev.date}</p>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-black text-[#002333]" style={{ fontFamily: 'Sora, sans-serif' }}>{ev.title}</p>
                <span className="text-[10px] font-black uppercase tracking-wide" style={{ color: ev.color }}>{ev.type}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* School Announcements */}
      <div className="bg-white rounded-2xl overflow-hidden" style={{ border: '1px solid #EEF0F3', boxShadow: '0 1px 6px rgba(0,35,51,0.05)' }}>
        <div className="px-6 py-4 flex items-center gap-2.5" style={{ borderBottom: '2px solid #EEF0F3', background: '#002333' }}>
          <Megaphone size={16} color="white" strokeWidth={3} />
          <p className="text-sm font-black text-white" style={{ fontFamily: 'Sora, sans-serif' }}>School Announcements</p>
        </div>
        <div className="divide-y divide-[#F4F6F8]">
          {ANNOUNCEMENTS.map((a, i) => (
            <div key={i} className="px-6 py-5">
              <div className="flex items-start justify-between gap-2 mb-1.5">
                <p className="text-sm font-black text-[#002333]" style={{ fontFamily: 'Sora, sans-serif' }}>{a.title}</p>
                <span className="text-xs font-bold text-[#9CA3AF] flex-shrink-0" style={{ fontFamily: 'Roboto, sans-serif' }}>{a.date}</span>
              </div>
              <p className="text-sm font-semibold text-[#4B5563] leading-relaxed" style={{ fontFamily: 'Roboto, sans-serif' }}>{a.body}</p>
              <p className="text-xs font-black text-[#9CA3AF] mt-2" style={{ fontFamily: 'Roboto, sans-serif' }}>Posted by {a.by}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Staff Directory */}
      <div className="bg-white rounded-2xl overflow-hidden" style={{ border: '1px solid #EEF0F3', boxShadow: '0 1px 6px rgba(0,35,51,0.05)' }}>
        <div className="px-6 py-4 flex items-center gap-2.5" style={{ borderBottom: '2px solid #EEF0F3', background: '#002333' }}>
          <UserCheck size={16} color="white" strokeWidth={3} />
          <p className="text-sm font-black text-white" style={{ fontFamily: 'Sora, sans-serif' }}>Staff Directory</p>
        </div>
        <div className="grid grid-cols-2 divide-x divide-[#F4F6F8]">
          {STAFF.slice(0, 8).map((s, i) => (
            <div key={i} className="px-6 py-4 flex items-center gap-3"
              style={{ borderBottom: i < STAFF.length - 2 ? '1px solid #F4F6F8' : 'none' }}>
              <img
                src={`https://randomuser.me/api/portraits/${s.gender}/${s.photoId}.jpg`}
                alt={s.name}
                className="rounded-full object-cover flex-shrink-0"
                style={{ width: 36, height: 36, border: '2px solid #EEF0F3' }}
                onError={e => { e.target.style.display = 'none' }}
              />
              <div className="min-w-0">
                <p className="text-sm font-black text-[#002333] truncate" style={{ fontFamily: 'Sora, sans-serif' }}>{s.name}</p>
                <p className="text-xs font-bold text-[#9CA3AF] truncate" style={{ fontFamily: 'Roboto, sans-serif' }}>{s.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}
