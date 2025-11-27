export const getThemeClasses = (darkMode: boolean) => ({
  bg: darkMode ? 'bg-[#121826]' : 'bg-gray-50',
  bgDrawer: darkMode ? 'bg-[#202A36]' : 'bg-gray-50',
  sidebarBg: darkMode ? 'bg-[#101622]' : 'bg-white',
  border: darkMode ? 'border-slate-800' : 'border-gray-200',
  divider: darkMode ? 'divide-gray-800' : 'divide-gray-200',
  text: darkMode ? 'text-slate-300' : 'text-gray-700',
  textMuted: darkMode ? 'text-slate-400' : 'text-gray-500',
  textActive: darkMode ? 'text-white' : 'text-gray-900',
  activeItem: darkMode
    ? 'bg-slate-800 text-white'
    : 'bg-gray-100 text-gray-900',
  hoverItem: darkMode
    ? 'hover:bg-slate-800/50 hover:text-slate-300'
    : 'hover:bg-gray-50 hover:text-gray-700',
  searchBg: darkMode ? 'bg-slate-800/50' : 'bg-gray-100',
  inputText: darkMode ? 'text-slate-300' : 'text-gray-900',
  placeholder: darkMode ? 'placeholder-slate-500' : 'placeholder-gray-400',
  teamBadge: darkMode
    ? 'bg-slate-700 text-slate-300'
    : 'bg-gray-200 text-gray-700',
  hoverBg: darkMode ? 'hover:bg-slate-800' : 'hover:bg-gray-100',
  backdrop: darkMode ? 'bg-slate-900/80' : 'bg-gray-900/50',
  cardBg: darkMode ? 'bg-[#192030]' : 'bg-white',
  buttonBg: darkMode ? 'bg-slate-700/50' : 'bg-gray-100',
  buttonHover: darkMode ? 'hover:bg-slate-700' : 'hover:bg-gray-200',
  buttonText: darkMode ? 'text-slate-300' : 'text-gray-700',
  badge: darkMode
    ? 'bg-green-500/20 text-green-400'
    : 'bg-green-100 text-green-700',
  iconBg: darkMode ? 'bg-slate-800' : 'bg-gray-100',
  iconHover: darkMode ? 'hover:bg-slate-700' : 'hover:bg-gray-200',
});

export type ThemeClasses = ReturnType<typeof getThemeClasses>;
