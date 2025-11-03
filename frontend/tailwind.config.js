/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['Fira Code', 'monospace'],
      },
      colors: {
        // Primary brand colors (can be used for accents)
        primary: '#8B5CF6', // Purple
        secondary: '#EC4899', // Pink
        
        // Darker, cleaner palette
        background: '#0F172A', // Slate-900
        surface: '#1E293B',    // Slate-800
        card: '#334155',       // Slate-700
        border: '#475569',     // Slate-600
        text: '#E2E8F0',       // Slate-200
        textMuted: '#94A3B8',  // Slate-400
        codeBg: '#111827',     // Gray-900
        codeBorder: '#374151', // Gray-700
        
        // Semantic colors
        success: '#10B981', // Green
        info: '#3B82F6',    // Blue
        warning: '#F59E0B', // Amber
        danger: '#EF4444',  // Red
      },
      boxShadow: {
        'glow-purple': '0 0 15px rgba(139, 92, 246, 0.5)',
        'glow-pink': '0 0 15px rgba(236, 72, 153, 0.5)',
      }
    },
  },
  plugins: [],
}
