import { Construction } from 'lucide-react'

const PAGE_INFO = {
  enrollment: {
    title: 'Enrollment Management',
    desc: 'Track student enrollment trends, manage enrollment periods, and generate district-level reports.',
  },
}

export default function PlaceholderPage({ pageName }) {
  const info = PAGE_INFO[pageName] || {
    title: 'This Page',
    desc: 'This section is available in the full NEMIS suite.',
  }

  return (
    <div className="flex flex-col items-center justify-center h-[60vh] text-center max-w-sm mx-auto">
      <div
        className="w-16 h-16 rounded-2xl flex items-center justify-center mb-5"
        style={{ background: 'rgba(0,35,51,0.07)' }}
      >
        <Construction size={28} style={{ color: '#002333' }} />
      </div>
      <h2
        className="text-xl font-bold text-[#002333]"
        style={{ fontFamily: 'Sora, sans-serif' }}
      >
        {info.title}
      </h2>
      <p
        className="text-gray-400 mt-2 leading-relaxed text-sm"
        style={{ fontFamily: 'Roboto, sans-serif' }}
      >
        {info.desc}
      </p>
      <div
        className="mt-6 px-4 py-2 rounded-full text-xs font-medium"
        style={{
          background: 'rgba(0,35,51,0.06)',
          color: '#002333',
          fontFamily: 'Roboto, sans-serif',
        }}
      >
        Available in full NEMIS suite
      </div>
    </div>
  )
}
