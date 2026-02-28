import { School, DollarSign, CheckCircle, AlertCircle, GraduationCap, User } from 'lucide-react'
import { children, childFees } from '../../data/parentData'

const ACCENT = '#C084FC'

function gradeColor(grade) {
  if (!grade) return { bg: '#F4F6F8', text: '#6B7280' }
  const g = grade.charAt(0)
  if (g === 'A') return { bg: 'rgba(72,208,140,0.12)', text: '#059669' }
  if (g === 'B') return { bg: 'rgba(96,165,250,0.12)', text: '#1D4ED8' }
  if (g === 'C') return { bg: 'rgba(245,158,11,0.12)', text: '#B45309' }
  return { bg: 'rgba(166,0,3,0.10)', text: '#A60003' }
}

export default function ParentChildren({ selectedChild, setSelectedChild, setActivePage }) {
  const child = children.find(c => c.id === selectedChild) || children[0]
  const fees = childFees[child.id]
  const paidPct = Math.round((fees.paid / fees.total) * 100)

  return (
    <div className="space-y-6">
      {/* Child Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
        {children.map(c => {
          const f = childFees[c.id]
          const selected = selectedChild === c.id
          return (
            <button key={c.id} onClick={() => setSelectedChild(c.id)}
              className="rounded-2xl text-left transition-all overflow-hidden"
              style={{
                background: '#fff',
                border: `2px solid ${selected ? ACCENT : '#EEF0F3'}`,
                boxShadow: selected ? `0 4px 20px rgba(192,132,252,0.18)` : '0 1px 4px rgba(0,35,51,0.05)',
              }}>
              {/* Header strip */}
              <div className="px-5 py-3 flex items-center gap-3"
                style={{ background: selected ? '#002333' : '#F4F6F8' }}>
                <img
                  src={`https://randomuser.me/api/portraits/${c.gender}/${c.photoId}.jpg`}
                  alt={c.name}
                  className="rounded-full object-cover flex-shrink-0"
                  style={{ width: 42, height: 42, border: `2px solid ${selected ? ACCENT : '#E5E7EB'}` }}
                  onError={e => { e.target.style.display = 'none' }}
                />
                <div className="min-w-0">
                  <p className="text-sm font-black truncate leading-snug"
                    style={{ color: selected ? '#fff' : '#002333', fontFamily: 'Sora, sans-serif' }}>
                    {c.name}
                  </p>
                  <p className="text-[11px] font-semibold truncate"
                    style={{ color: selected ? 'rgba(255,255,255,0.6)' : '#9CA3AF', fontFamily: 'Roboto, sans-serif' }}>
                    {c.grade} · {c.type === 'university' ? c.program?.split(' ')[0] : c.school.split(' ').slice(0, 3).join(' ')}
                  </p>
                </div>
              </div>
              {/* Body */}
              <div className="p-4 space-y-2.5">
                <InfoRow icon={School} label="School" value={c.school} />
                {c.type === 'university' ? (
                  <>
                    <InfoRow icon={GraduationCap} label="Program" value={c.program} />
                    <InfoRow icon={User} label="Advisor" value={c.advisor} />
                  </>
                ) : (
                  <>
                    <InfoRow icon={User} label="Homeroom" value={c.homeroomTeacher} />
                  </>
                )}
                {/* Fee bar */}
                <div className="pt-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] font-black uppercase tracking-wider text-[#9CA3AF]" style={{ fontFamily: 'Roboto, sans-serif' }}>Fees</span>
                    {f.outstanding > 0
                      ? <span className="text-xs font-black text-[#A60003]">${f.outstanding} due</span>
                      : <span className="text-xs font-black text-[#059669]">Fully paid</span>}
                  </div>
                  <div className="h-1.5 rounded-full overflow-hidden" style={{ background: '#F4F6F8' }}>
                    <div className="h-full rounded-full"
                      style={{ width: `${Math.round((f.paid / f.total) * 100)}%`, background: f.outstanding === 0 ? '#48D08C' : ACCENT }} />
                  </div>
                </div>
              </div>
            </button>
          )
        })}
      </div>

      {/* Selected child expanded detail */}
      {child && (
        <div className="rounded-2xl overflow-hidden" style={{ background: '#fff', border: '1px solid #EEF0F3' }}>
          <div className="px-6 py-4 flex items-center gap-3" style={{ background: '#002333' }}>
            <img
              src={`https://randomuser.me/api/portraits/${child.gender}/${child.photoId}.jpg`}
              alt={child.name} className="rounded-full object-cover"
              style={{ width: 48, height: 48, border: `2px solid ${ACCENT}` }}
              onError={e => { e.target.style.display = 'none' }}
            />
            <div>
              <p className="text-base font-black text-white" style={{ fontFamily: 'Sora, sans-serif' }}>{child.name}</p>
              <p className="text-xs font-semibold" style={{ color: 'rgba(255,255,255,0.55)', fontFamily: 'Roboto, sans-serif' }}>
                {child.studentId} · {child.status}
              </p>
            </div>
          </div>
          <div className="p-6 grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { label: 'School', value: child.school },
              { label: child.type === 'university' ? 'Campus' : 'Grade', value: child.type === 'university' ? child.campus : child.grade },
              { label: child.type === 'university' ? 'Year' : 'District', value: child.type === 'university' ? child.grade : child.district },
              { label: child.type === 'university' ? 'Advisor' : 'Principal', value: child.type === 'university' ? child.advisor : child.principal },
            ].map(row => (
              <div key={row.label}>
                <p className="text-[10px] font-black uppercase tracking-wider text-[#9CA3AF] mb-0.5" style={{ fontFamily: 'Roboto, sans-serif' }}>{row.label}</p>
                <p className="text-xs font-bold text-[#002333]" style={{ fontFamily: 'Roboto, sans-serif' }}>{row.value}</p>
              </div>
            ))}
          </div>
          {/* Fee detail */}
          <div className="mx-6 mb-6 rounded-xl p-4" style={{ background: '#F4F6F8' }}>
            <div className="flex items-center justify-between mb-3">
              <p className="text-xs font-black text-[#002333]" style={{ fontFamily: 'Sora, sans-serif' }}>{fees.label}</p>
              <span className="text-xs font-bold px-2 py-0.5 rounded-full"
                style={{ background: fees.outstanding > 0 ? 'rgba(166,0,3,0.10)' : 'rgba(72,208,140,0.12)', color: fees.outstanding > 0 ? '#A60003' : '#059669' }}>
                {fees.outstanding > 0 ? `$${fees.outstanding} outstanding` : 'Fully Paid'}
              </span>
            </div>
            <div className="grid grid-cols-3 gap-3 mb-3">
              {[{ l: 'Total Fee', v: `$${fees.total}` }, { l: 'Amount Paid', v: `$${fees.paid}`, c: '#059669' }, { l: 'Outstanding', v: `$${fees.outstanding}`, c: fees.outstanding > 0 ? '#A60003' : '#059669' }].map(item => (
                <div key={item.l} className="rounded-lg p-3 text-center" style={{ background: '#fff' }}>
                  <p className="text-base font-black" style={{ color: item.c || '#002333', fontFamily: 'Sora, sans-serif' }}>{item.v}</p>
                  <p className="text-[10px] font-semibold text-[#9CA3AF]" style={{ fontFamily: 'Roboto, sans-serif' }}>{item.l}</p>
                </div>
              ))}
            </div>
            <div className="h-2 rounded-full overflow-hidden" style={{ background: '#E5E7EB' }}>
              <div className="h-full rounded-full" style={{ width: `${paidPct}%`, background: fees.outstanding === 0 ? '#48D08C' : ACCENT }} />
            </div>
            <p className="text-[11px] text-[#9CA3AF] mt-1.5" style={{ fontFamily: 'Roboto, sans-serif' }}>
              {paidPct}% paid · Due: {fees.dueDate}
            </p>
            {fees.outstanding > 0 && (
              <button onClick={() => setActivePage('payments')}
                className="mt-3 px-4 py-2 rounded-xl text-xs font-black text-white transition-opacity hover:opacity-90"
                style={{ background: ACCENT, fontFamily: 'Roboto, sans-serif' }}>
                Make a Payment
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

function InfoRow({ icon: Icon, label, value }) {
  return (
    <div className="flex items-start gap-2">
      <Icon size={13} color="#9CA3AF" strokeWidth={2.5} className="flex-shrink-0 mt-0.5" />
      <div className="min-w-0">
        <span className="text-[10px] font-black uppercase tracking-wider text-[#9CA3AF]" style={{ fontFamily: 'Roboto, sans-serif' }}>{label} </span>
        <span className="text-xs font-bold text-[#002333]" style={{ fontFamily: 'Roboto, sans-serif' }}>{value}</span>
      </div>
    </div>
  )
}
