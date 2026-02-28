import { useState } from 'react'
import { Users, DollarSign, ClipboardList, MessageSquare, School, AlertCircle, CheckCircle, GraduationCap, MapPin } from 'lucide-react'
import { parentProfile, children, childFees, childGrades, childAttendance, parentNotifications, parentMessages } from '../../data/parentData'

const ACCENT = '#C084FC'

function ChildCard({ child, selected, onClick }) {
  const hasBalance = child.balance > 0
  return (
    <button onClick={onClick}
      className="flex-shrink-0 rounded-2xl text-left transition-all"
      style={{
        width: 160,
        background: selected ? '#002333' : '#fff',
        border: `2px solid ${selected ? ACCENT : '#EEF0F3'}`,
        padding: '14px',
        boxShadow: selected ? `0 4px 16px rgba(192,132,252,0.18)` : '0 1px 4px rgba(0,35,51,0.05)',
      }}>
      <div className="flex items-center gap-2 mb-2.5">
        <img
          src={`https://randomuser.me/api/portraits/${child.gender}/${child.photoId}.jpg`}
          alt={child.name}
          className="rounded-full object-cover flex-shrink-0"
          style={{ width: 38, height: 38, border: `2px solid ${selected ? ACCENT : '#EEF0F3'}` }}
          onError={e => { e.target.style.display = 'none' }}
        />
        <div className="min-w-0">
          <p className="text-xs font-black leading-snug truncate"
            style={{ color: selected ? '#fff' : '#002333', fontFamily: 'Sora, sans-serif' }}>
            {child.name.split(' ')[0]}
          </p>
          <p className="text-[10px] font-semibold truncate"
            style={{ color: selected ? 'rgba(255,255,255,0.55)' : '#9CA3AF', fontFamily: 'Roboto, sans-serif' }}>
            {child.grade}
          </p>
        </div>
      </div>
      <p className="text-[10px] font-semibold truncate mb-2"
        style={{ color: selected ? 'rgba(255,255,255,0.55)' : '#6B7280', fontFamily: 'Roboto, sans-serif' }}>
        {child.type === 'university' ? 'UL · ' + child.program?.split(' ')[0] : child.school.split(' ').slice(0, 2).join(' ')}
      </p>
      <div className="flex items-center justify-between">
        <span className="text-[10px] font-black px-1.5 py-0.5 rounded-md"
          style={{ background: hasBalance ? 'rgba(166,0,3,0.12)' : 'rgba(72,208,140,0.12)', color: hasBalance ? '#A60003' : '#059669' }}>
          {hasBalance ? `$${child.balance} due` : 'Paid ✓'}
        </span>
      </div>
    </button>
  )
}

function StatCard({ icon: Icon, label, value, color, sub }) {
  return (
    <div className="rounded-2xl p-5 flex items-start gap-4" style={{ background: '#fff', border: '1px solid #EEF0F3' }}>
      <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
        style={{ background: `${color}18` }}>
        <Icon size={20} style={{ color }} strokeWidth={2.5} />
      </div>
      <div>
        <p className="text-2xl font-black text-[#002333]" style={{ fontFamily: 'Sora, sans-serif' }}>{value}</p>
        <p className="text-xs font-bold text-[#6B7280] mt-0.5" style={{ fontFamily: 'Roboto, sans-serif' }}>{label}</p>
        {sub && <p className="text-[11px] font-semibold mt-1" style={{ color, fontFamily: 'Roboto, sans-serif' }}>{sub}</p>}
      </div>
    </div>
  )
}

export default function ParentDashboard({ selectedChild, setSelectedChild, setActivePage }) {
  const totalBalance = children.reduce((s, c) => s + c.balance, 0)
  const unreadMessages = parentMessages.filter(m => m.unread > 0).length
  const unreadNotifs = parentNotifications.filter(n => !n.read).length
  const child = children.find(c => c.id === selectedChild) || children[0]
  const grades = childGrades[child.id] || []
  const attendance = childAttendance[child.id]

  const presentCount = attendance?.records.filter(r => r.status === 'Present').length || 0
  const totalCount = attendance?.records.length || 1
  const attendanceRate = Math.round((presentCount / totalCount) * 100)

  const bestGrade = grades.reduce((best, g) => {
    const score = (g.assignment * 0.3) + (g.test * 0.3) + (g.exam * 0.4)
    return score > best.score ? { score, subject: g.subject, grade: g.grade } : best
  }, { score: 0, subject: '', grade: '' })

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={Users}         label="Total Children"      value={children.length}  color={ACCENT} />
        <StatCard icon={DollarSign}    label="Outstanding Fees"    value={`$${totalBalance}`} color="#A60003" sub="Across all children" />
        <StatCard icon={ClipboardList} label="Due This Week"       value="4"                color="#F59E0B" sub="Assignments" />
        <StatCard icon={MessageSquare} label="Unread"              value={unreadMessages + unreadNotifs} color="#60A5FA" sub="Messages & alerts" />
      </div>

      {/* Children Switcher */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-black text-[#002333]" style={{ fontFamily: 'Sora, sans-serif' }}>My Children</h2>
          <button onClick={() => setActivePage('children')}
            className="text-xs font-bold hover:underline" style={{ color: ACCENT }}>View All</button>
        </div>
        <div className="flex gap-3 overflow-x-auto pb-2" style={{ scrollbarWidth: 'none' }}>
          {children.map(c => (
            <ChildCard key={c.id} child={c} selected={selectedChild === c.id} onClick={() => setSelectedChild(c.id)} />
          ))}
        </div>
      </div>

      {/* Selected Child Detail */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* School Info */}
        <div className="rounded-2xl overflow-hidden" style={{ background: '#fff', border: '1px solid #EEF0F3' }}>
          <div className="px-5 py-3.5 flex items-center gap-2" style={{ background: '#002333' }}>
            <School size={15} color={ACCENT} strokeWidth={2.5} />
            <span className="text-sm font-black text-white" style={{ fontFamily: 'Sora, sans-serif' }}>
              {child.name.split(' ')[0]}'s School
            </span>
          </div>
          <div className="p-5 space-y-3">
            <div className="flex items-center gap-3">
              <img src={`https://ui-avatars.com/api/?name=${encodeURIComponent(child.school)}&size=44&background=C084FC&color=fff&bold=true&font-size=0.35`}
                alt={child.school} className="rounded-xl flex-shrink-0" style={{ width: 44, height: 44 }} />
              <div>
                <p className="text-sm font-black text-[#002333]" style={{ fontFamily: 'Sora, sans-serif' }}>{child.school}</p>
                {child.type === 'university'
                  ? <p className="text-xs font-semibold text-[#9CA3AF]" style={{ fontFamily: 'Roboto, sans-serif' }}>{child.program}</p>
                  : <p className="text-xs font-semibold text-[#9CA3AF]" style={{ fontFamily: 'Roboto, sans-serif' }}>{child.grade}</p>
                }
              </div>
            </div>
            <div className="space-y-2 pt-1">
              {child.type === 'university' ? (
                <>
                  <InfoRow label="Campus" value={child.campus} />
                  <InfoRow label="Year" value={child.grade} />
                  <InfoRow label="Advisor" value={child.advisor} />
                  <InfoRow label="Student ID" value={child.studentId} />
                </>
              ) : (
                <>
                  <InfoRow label="District" value={child.district} />
                  <InfoRow label="Principal" value={child.principal} />
                  <InfoRow label="Homeroom" value={child.homeroomTeacher} />
                  <InfoRow label="Student ID" value={child.studentId} />
                </>
              )}
            </div>
          </div>
        </div>

        {/* Grades Snapshot */}
        <div className="rounded-2xl overflow-hidden" style={{ background: '#fff', border: '1px solid #EEF0F3' }}>
          <div className="px-5 py-3.5 flex items-center justify-between" style={{ background: '#002333' }}>
            <div className="flex items-center gap-2">
              <GraduationCap size={15} color={ACCENT} strokeWidth={2.5} />
              <span className="text-sm font-black text-white" style={{ fontFamily: 'Sora, sans-serif' }}>Academic Snapshot</span>
            </div>
            <button onClick={() => setActivePage('academics')}
              className="text-[11px] font-bold" style={{ color: 'rgba(192,132,252,0.8)' }}>View all</button>
          </div>
          <div className="p-5 space-y-2">
            {grades.slice(0, 4).map(g => (
              <div key={g.subject} className="flex items-center justify-between py-1.5"
                style={{ borderBottom: '1px solid #F4F6F8' }}>
                <div>
                  <p className="text-xs font-bold text-[#002333]" style={{ fontFamily: 'Roboto, sans-serif' }}>{g.subject}</p>
                  <p className="text-[10px] text-[#9CA3AF]" style={{ fontFamily: 'Roboto, sans-serif' }}>{g.teacher}</p>
                </div>
                <span className="text-sm font-black px-2.5 py-0.5 rounded-lg"
                  style={{ background: gradeColor(g.grade).bg, color: gradeColor(g.grade).text }}>
                  {g.grade}
                </span>
              </div>
            ))}
            {grades.length === 0 && (
              <p className="text-xs text-[#9CA3AF] text-center py-4" style={{ fontFamily: 'Roboto, sans-serif' }}>No grades available</p>
            )}
          </div>
        </div>

        {/* Attendance + Fees Snapshot */}
        <div className="space-y-4">
          {/* Attendance */}
          <div className="rounded-2xl overflow-hidden" style={{ background: '#fff', border: '1px solid #EEF0F3' }}>
            <div className="px-5 py-3 flex items-center gap-2" style={{ background: '#002333' }}>
              <CheckCircle size={15} color={ACCENT} strokeWidth={2.5} />
              <span className="text-sm font-black text-white" style={{ fontFamily: 'Sora, sans-serif' }}>Attendance</span>
            </div>
            <div className="p-4">
              <div className="flex items-center justify-between mb-2">
                <p className="text-2xl font-black text-[#002333]" style={{ fontFamily: 'Sora, sans-serif' }}>{attendanceRate}%</p>
                <span className="text-xs font-bold px-2 py-0.5 rounded-full"
                  style={{ background: attendanceRate >= 90 ? 'rgba(72,208,140,0.12)' : 'rgba(245,158,11,0.12)', color: attendanceRate >= 90 ? '#059669' : '#B45309' }}>
                  {attendanceRate >= 90 ? 'Excellent' : 'Needs attention'}
                </span>
              </div>
              <div className="h-2 rounded-full overflow-hidden" style={{ background: '#F4F6F8' }}>
                <div className="h-full rounded-full transition-all"
                  style={{ width: `${attendanceRate}%`, background: attendanceRate >= 90 ? '#48D08C' : '#F59E0B' }} />
              </div>
              <p className="text-[11px] text-[#9CA3AF] mt-2" style={{ fontFamily: 'Roboto, sans-serif' }}>
                {attendance?.summary}
              </p>
            </div>
          </div>

          {/* Fee Status */}
          <div className="rounded-2xl overflow-hidden" style={{ background: '#fff', border: '1px solid #EEF0F3' }}>
            <div className="px-5 py-3 flex items-center justify-between" style={{ background: '#002333' }}>
              <div className="flex items-center gap-2">
                <DollarSign size={15} color={ACCENT} strokeWidth={2.5} />
                <span className="text-sm font-black text-white" style={{ fontFamily: 'Sora, sans-serif' }}>Fee Status</span>
              </div>
              {child.balance > 0 && (
                <button onClick={() => setActivePage('fees')}
                  className="text-[11px] font-bold" style={{ color: '#FF6B6B' }}>Pay now</button>
              )}
            </div>
            <div className="p-4">
              {child.balance > 0 ? (
                <div className="flex items-center gap-3">
                  <AlertCircle size={22} color="#A60003" strokeWidth={2.5} />
                  <div>
                    <p className="text-lg font-black text-[#A60003]" style={{ fontFamily: 'Sora, sans-serif' }}>${child.balance}</p>
                    <p className="text-[11px] text-[#9CA3AF]" style={{ fontFamily: 'Roboto, sans-serif' }}>Outstanding balance</p>
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <CheckCircle size={22} color="#059669" strokeWidth={2.5} />
                  <div>
                    <p className="text-sm font-black text-[#059669]" style={{ fontFamily: 'Sora, sans-serif' }}>Fully Paid</p>
                    <p className="text-[11px] text-[#9CA3AF]" style={{ fontFamily: 'Roboto, sans-serif' }}>No outstanding balance</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Location note */}
      <div className="flex items-center gap-2 py-2 px-4 rounded-xl"
        style={{ background: 'rgba(192,132,252,0.06)', border: '1px solid rgba(192,132,252,0.15)' }}>
        <MapPin size={13} color={ACCENT} strokeWidth={2.5} />
        <p className="text-xs font-semibold text-[#6B7280]" style={{ fontFamily: 'Roboto, sans-serif' }}>
          {parentProfile.name} · {parentProfile.location} · ID: {parentProfile.parentId}
        </p>
      </div>
    </div>
  )
}

function InfoRow({ label, value }) {
  return (
    <div className="flex items-start gap-2">
      <span className="text-[10px] font-black uppercase tracking-wider flex-shrink-0 mt-0.5" style={{ color: '#9CA3AF', width: 60, fontFamily: 'Roboto, sans-serif' }}>
        {label}
      </span>
      <span className="text-xs font-bold text-[#002333]" style={{ fontFamily: 'Roboto, sans-serif' }}>{value}</span>
    </div>
  )
}

function gradeColor(grade) {
  if (!grade) return { bg: '#F4F6F8', text: '#6B7280' }
  const g = grade.charAt(0)
  if (g === 'A') return { bg: 'rgba(72,208,140,0.12)', text: '#059669' }
  if (g === 'B') return { bg: 'rgba(96,165,250,0.12)', text: '#1D4ED8' }
  if (g === 'C') return { bg: 'rgba(245,158,11,0.12)', text: '#B45309' }
  return { bg: 'rgba(166,0,3,0.10)', text: '#A60003' }
}
