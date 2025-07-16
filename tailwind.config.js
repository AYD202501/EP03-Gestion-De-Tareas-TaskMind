module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: 'var(--color-primary)',
        'primary-hover': 'var(--color-primary-hover)',
        secondary: 'var(--color-secondary)',
        'secondary-hover': 'var(--color-secondary-hover)',
        background: 'var(--color-background)',
        'task-pending': 'var(--color-task-pending)',
        'task-review': 'var(--color-task-review)',
        'task-progress': 'var(--color-task-progress)',
        'task-done': 'var(--color-task-done)',
      },
    },
  },
  plugins: [],
}
