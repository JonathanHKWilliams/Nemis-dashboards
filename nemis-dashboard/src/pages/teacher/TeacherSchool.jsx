import { teacherSchoolInfo, teacherProfile, teacherClasses } from '../../data/teacherData'
import { MapPin, Phone, Mail, Users, BookOpen, Building2, CalendarDays, Megaphone, UserCheck } from 'lucide-react'

const EVENTS = [
  { date: 'Mar 5',  title: 'Mid-Term Examinations Begin',    type: 'Exam',    color: '#A60003', bg: 'rgba(166,0,3,0.08)'    },
  { date: 'Mar 14', title: 'Science Fair',                   type: 'Event',   color: '#2563EB', bg: 'rgba(37,99,235,0.08)'  },
  { date: 'Mar 20', title: 'Parent-Teacher Conference',      type: 'Meeting', color: '#D97706', bg: 'rgba(217,119,6,0.08)'  },
  { date: 'Apr 3',  title: 'Inter-School Sports Day',        type: 'Sports',  color: '#16A34A', bg: 'rgba(22,163,74,0.08)'  },
  { date: 'Apr 18', title: 'Term 1 Examination Results Day', type: 'Results', color: '#7C3AED', bg: 'rgba(124,58,237,0.08)' },
]

const ANNOUNCEMENTS = [
  { title: 'Grade Submission Deadline', body: 'All teachers must submit final grades for Term 1 by Friday, February 28, 2026. Use the Grades section in your dashboard.', by: 'Principal', date: 'Feb 25, 2026' },
  { title: 'Mid-Term Exam Preparation', body: 'Mid-Term Examinations begin March 5, 2026. Teachers should complete all coursework by March 3 and share revision resources with students.', by: 'Vice Principal', date: 'Feb 20, 2026' },
  { title: 'Professional Development Day', body: 'There will be a Staff Professional Development Day on March 21, 2026. Attendance is compulsory for all teaching staff.', by: 'HR Department', date: 'Feb 15, 2026' },
]

const STAFF = [
  { name: teacherSchoolInfo.principal, role: 'Principal',           gender: teacherSchoolInfo.principalGender, photoId: teacherSchoolInfo.principalPhotoId },
  { name: 'Mrs. Jane Doe',             role: 'English Teacher',     gender: 'women', photoId: 2  },
  { name: 'Mr. Peter K. Smith',        role: 'Biology Teacher',     gender: 'men',   photoId: 15 },
  { name: 'Mrs. Linda Cooper',         role: 'History Teacher',     gender: 'women', photoId: 22 },
  { name: 'Mr. Samuel Brown',          role: 'ICT Teacher',         gender: 'men',   photoId: 29 },
  { name: 'Mr. George Kollie',         role: 'Physics Teacher',     gender: 'men',   photoId: 42 },
  { name: 'Mrs. Grace Williams',       role: 'Vice Principal',      gender: 'women', photoId: 44 },
  { name: 'Ms. Patricia Harris',       role: 'Guidance Counselor',  gender: 'women', photoId: 58 },
]

export default function TeacherSchool() {
  return (
    <div className="space-y-6 max-w-[900px]">
      <div>
        <h2 className="text-2xl font-black text-[#002333]" style={{ fontFamily: 'Sora, sans-serif' }}>My School</h2>
        <p className="text-sm font-bold text-[#6B7280] mt-0.5" style={{ fontFamily: 'Roboto, sans-serif' }}>
          School information · Academic Year {teacherSchoolInfo.academicYear}
        </p>
      </div>

      {/* School Banner */}
      <div className="bg-white rounded-2xl overflow-hidden" style={{ border: '1px solid #EEF0F3', boxShadow: '0 1px 6px rgba(0,35,51,0.05)' }}>
        <div className="h-2 w-full" style={{ background: 'linear-gradient(90deg, #002333 0%, #48D08C 100%)' }} />
        <div className="px-8 py-6 flex items-center gap-6">
          <img
            src={`https://ui-avatars.com/api/?name=${encodeURIComponent(teacherSchoolInfo.name)}&size=80&background=002333&color=48D08C&bold=true&font-size=0.3`}
            alt={teacherSchoolInfo.name}
            className="rounded-2xl"
            style={{ width: 80, height: 80, border: '2px solid #EEF0F3' }}
          />
          <div>
            <h3 className="text-xl font-black text-[#002333]" style={{ fontFamily: 'Sora, sans-serif' }}>{teacherSchoolInfo.name}</h3>
            <p className="text-sm font-bold text-[#6B7280] mt-0.5" style={{ fontFamily: 'Roboto, sans-serif' }}>
              {teacherSchoolInfo.type} School · Est. {teacherSchoolInfo.established}
            </p>
            <div className="flex items-center gap-1.5 mt-2">
              <span className="text-xs px-2.5 py-0.5 rounded-full font-black"
                style={{ background: 'rgba(72,208,140,0.12)', color: '#16A34A', fontFamily: 'Roboto, sans-serif' }}>
                NEMIS Registered
              </span>
              <span className="text-xs font-bold text-[#9CA3AF]" style={{ fontFamily: 'Roboto, sans-serif' }}>{teacherSchoolInfo.code}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Total Students', value: teacherSchoolInfo.totalStudents, icon: Users     },
          { label: 'Total Teachers', value: teacherSchoolInfo.totalTeachers, icon: BookOpen  },
          { label: 'Total Classes',  value: teacherSchoolInfo.totalClasses,  icon: Building2 },
        ].map(s => {
          const Icon = s.icon
          return (
            <div key={s.label} className="bg-white rounded-2xl p-5" style={{ border: '1px solid #EEF0F3', boxShadow: '0 1px 6px rgba(0,35,51,0.05)' }}>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: 'rgba(0,35,51,0.06)' }}>
                  <Icon size={18} color="#002333" strokeWidth={3} />
                </div>
                <div>
                  <p className="text-2xl font-black text-[#002333]" style={{ fontFamily: 'Sora, sans-serif' }}>
                    {s.value.toLocaleString()}
                  </p>
                  <p className="text-xs font-bold text-[#6B7280] mt-0.5" style={{ fontFamily: 'Roboto, sans-serif' }}>{s.label}</p>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Principal + Contact */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white rounded-2xl p-6" style={{ border: '1px solid #EEF0F3', boxShadow: '0 1px 6px rgba(0,35,51,0.05)' }}>
          <p className="text-xs font-black uppercase tracking-wider text-[#6B7280] mb-4" style={{ fontFamily: 'Roboto, sans-serif' }}>School Principal</p>
          <div className="flex items-center gap-4">
            <img
              src={`https://randomuser.me/api/portraits/${teacherSchoolInfo.principalGender}/${teacherSchoolInfo.principalPhotoId}.jpg`}
              alt={teacherSchoolInfo.principal}
              className="rounded-full object-cover flex-shrink-0"
              style={{ width: 60, height: 60, border: '2px solid #EEF0F3' }}
              onError={e => { e.target.style.display = 'none' }}
            />
            <div>
              <p className="font-black text-[#002333]" style={{ fontFamily: 'Sora, sans-serif' }}>{teacherSchoolInfo.principal}</p>
              <p className="text-sm font-bold text-[#6B7280] mt-0.5" style={{ fontFamily: 'Roboto, sans-serif' }}>Principal</p>
              <p className="text-xs font-bold text-[#9CA3AF] mt-1" style={{ fontFamily: 'Roboto, sans-serif' }}>{teacherSchoolInfo.name}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-6" style={{ border: '1px solid #EEF0F3', boxShadow: '0 1px 6px rgba(0,35,51,0.05)' }}>
          <p className="text-xs font-black uppercase tracking-wider text-[#6B7280] mb-4" style={{ fontFamily: 'Roboto, sans-serif' }}>Contact Information</p>
          <div className="space-y-3">
            {[
              { icon: MapPin, text: teacherSchoolInfo.address },
              { icon: Phone,  text: teacherSchoolInfo.phone },
              { icon: Mail,   text: teacherSchoolInfo.email },
            ].map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-3">
                <Icon size={15} color="#002333" strokeWidth={2.5} className="flex-shrink-0" />
                <span className="text-sm font-bold text-[#4B5563]" style={{ fontFamily: 'Roboto, sans-serif' }}>{text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* My Teaching Info */}
      <div className="bg-white rounded-2xl p-6" style={{ border: '1px solid #EEF0F3', boxShadow: '0 1px 6px rgba(0,35,51,0.05)' }}>
        <p className="text-xs font-black uppercase tracking-wider text-[#6B7280] mb-4" style={{ fontFamily: 'Roboto, sans-serif' }}>My Teaching Information</p>
        <div className="grid grid-cols-3 gap-6">
          {[
            { label: 'Subject',          value: teacherProfile.subject },
            { label: 'Employee ID',      value: teacherProfile.employeeId },
            { label: 'Assigned Classes', value: teacherClasses.map(c => c.name).join(', ') },
            { label: 'Academic Year',    value: teacherSchoolInfo.academicYear },
            { label: 'District',         value: teacherSchoolInfo.district },
            { label: 'School Code',      value: teacherSchoolInfo.code },
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
              <div className="w-16 text-center flex-shrink-0 rounded-xl py-2" style={{ background: ev.bg }}>
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

      {/* Announcements */}
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
          {STAFF.map((s, i) => (
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
