import {
  HomeIcon,
  UsersIcon,
  FolderIcon,
  CalendarIcon,
  DocumentTextIcon,
  ChartPieIcon,
  Cog6ToothIcon,
  XMarkIcon,
  SunIcon,
  MoonIcon,
} from '@heroicons/react/24/outline';
import { useTheme } from '../context/useTheme';

interface SideBarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (val: boolean) => void;
}

export const SideBar = ({ sidebarOpen, setSidebarOpen }: SideBarProps) => {
  const { theme, darkMode, toggleDarkMode } = useTheme();
  const navItems = [
    { icon: HomeIcon, label: 'Productos', active: true },
    { icon: UsersIcon, label: 'Team' },
    { icon: FolderIcon, label: 'Projects' },
    { icon: CalendarIcon, label: 'Calendar' },
    { icon: DocumentTextIcon, label: 'Documents' },
    { icon: ChartPieIcon, label: 'Reports' },
  ];

  const teams = [
    { initial: 'H', name: 'Heroicons' },
    { initial: 'T', name: 'Tailwind Labs' },
    { initial: 'W', name: 'Workcation' },
  ];
  return (
    <div
      className={`absolute lg:static inset-y-0 left-0 z-50 w-72 ${theme.sidebarBg} border-r ${theme.border} flex flex-col transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      {/* Logo & Close Button */}
      <div className="p-6 flex items-center justify-between">
        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
          <svg
            className="w-6 h-6 text-white"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
          </svg>
        </div>
        <button
          onClick={() => setSidebarOpen(false)}
          className={`lg:hidden p-2 ${theme.hoverBg} rounded-lg transition-colors`}
        >
          <XMarkIcon className={`w-6 h-6 ${theme.textMuted}`} />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 overflow-y-auto">
        <ul className="space-y-1">
          {navItems.map((item) => (
            <li key={item.label}>
              <button
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                  item.active
                    ? theme.activeItem
                    : `${theme.textMuted} ${theme.hoverItem}`
                }`}
              >
                <item.icon className="w-5 h-5 flex-shrink-0" />
                <span className="font-medium">{item.label}</span>
              </button>
            </li>
          ))}
        </ul>

        {/* Teams Section */}
        <div className="mt-8">
          <p
            className={`px-3 text-xs font-semibold ${darkMode ? 'text-slate-500' : 'text-gray-400'} uppercase tracking-wider mb-3`}
          >
            Your teams
          </p>
          <ul className="space-y-1">
            {teams.map((team) => (
              <li key={team.name}>
                <button
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg ${theme.textMuted} ${theme.hoverItem} transition-colors`}
                >
                  <div
                    className={`w-6 h-6 rounded-md ${theme.teamBadge} flex items-center justify-center text-xs font-semibold flex-shrink-0`}
                  >
                    {team.initial}
                  </div>
                  <span className="font-medium">{team.name}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Settings */}
      <div className={`p-3 border-t ${theme.border} flex`}>
        <button
          className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg ${theme.textMuted} ${theme.hoverItem} transition-colors`}
        >
          <Cog6ToothIcon className="w-5 h-5 flex-shrink-0" />
          <span className="font-medium">Settings</span>
        </button>
        {/* Theme Toggle */}
        <button
          onClick={() => {
            toggleDarkMode();
          }}
          className={`p-2 ${theme.hoverBg} rounded-lg transition-colors`}
          aria-label="Toggle theme"
        >
          {darkMode ? (
            <SunIcon className={`w-5 h-5 ${theme.textMuted}`} />
          ) : (
            <MoonIcon className={`w-5 h-5 ${theme.textMuted}`} />
          )}
        </button>
      </div>
    </div>
  );
};
