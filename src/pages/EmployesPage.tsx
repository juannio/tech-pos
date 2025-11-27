import { useTheme } from '../context/useTheme';

export const EmployeesAttendance = () => {
  const { darkMode, theme } = useTheme();

  // Sample employee data
  const employees = [
    {
      id: 1,
      name: 'María García',
      store: 'Tienda Centro',
      status: 'online',
      avatar:
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
      shift: 'Mañana',
      checkIn: '08:00 AM',
      position: 'Gerente',
    },
    {
      id: 2,
      name: 'Carlos Rodríguez',
      store: 'Tienda Centro',
      status: 'online',
      avatar:
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
      shift: 'Mañana',
      checkIn: '08:15 AM',
      position: 'Vendedor',
    },
    {
      id: 3,
      name: 'Ana Martínez',
      store: 'Tienda Norte',
      status: 'online',
      avatar:
        'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
      shift: 'Mañana',
      checkIn: '08:05 AM',
      position: 'Cajera',
    },
    {
      id: 4,
      name: 'Jorge López',
      store: 'Tienda Sur',
      status: 'offline',
      avatar:
        'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop',
      shift: 'Tarde',
      checkIn: '-',
      position: 'Vendedor',
    },
    {
      id: 5,
      name: 'Laura Sánchez',
      store: 'Tienda Centro',
      status: 'online',
      avatar:
        'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop',
      shift: 'Mañana',
      checkIn: '08:30 AM',
      position: 'Asistente',
    },
    {
      id: 6,
      name: 'Pedro Ramírez',
      store: 'Tienda Norte',
      status: 'offline',
      avatar:
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
      shift: 'Noche',
      checkIn: '-',
      position: 'Supervisor',
    },
    {
      id: 7,
      name: 'Sofia Torres',
      store: 'Tienda Sur',
      status: 'online',
      avatar:
        'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=100&h=100&fit=crop',
      shift: 'Mañana',
      checkIn: '08:10 AM',
      position: 'Gerente',
    },
    {
      id: 8,
      name: 'Diego Hernández',
      store: 'Tienda Este',
      status: 'online',
      avatar:
        'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop',
      shift: 'Mañana',
      checkIn: '07:55 AM',
      position: 'Vendedor',
    },
  ];

  const stores = [
    'Todas',
    'Tienda Centro',
    'Tienda Norte',
    'Tienda Sur',
    'Tienda Este',
  ];
  const onlineCount = employees.filter((e) => e.status === 'online').length;
  const offlineCount = employees.filter((e) => e.status === 'offline').length;

  return (
    <div
      /* style={{ border: '1px solid red' }} */ className={`${theme.bg} mt-8`}
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 px-4 sm:px-6 md:px-8 lg:px-10 pt-6 sm:pt-8 pb-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 md:gap-8 w-full sm:w-auto">
          <h2
            className={`text-lg ${darkMode ? 'text-white' : 'text-gray-900'}`}
          >
            Asistencia de empleados
          </h2>
          <div
            className={`hidden sm:block h-5 w-px ${darkMode ? 'bg-gray-600' : 'bg-gray-300'}`}
          ></div>
          <div className="flex items-center gap-4 sm:gap-6 md:gap-8 overflow-x-auto w-full sm:w-auto">
            {stores.map((store, index) => (
              <button
                key={store}
                className={`text-xs sm:text-sm font-medium whitespace-nowrap ${
                  index === 0
                    ? 'text-[#7c85ff]'
                    : darkMode
                      ? 'text-gray-400 hover:text-gray-300'
                      : 'text-gray-500 hover:text-gray-900'
                } transition-colors`}
              >
                {store}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div
        className={`grid grid-cols-1 sm:grid-cols-3 border-t border-b ${theme.border} divide-y sm:divide-y-0 sm:divide-x ${theme.divider}`}
      >
        {/* Total Employees */}
        <div
          className={`flex flex-col justify-center px-6 md:px-8 lg:px-10 py-6`}
        >
          <div className="flex items-center justify-between mb-4">
            <span
              className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}
            >
              Total empleados
            </span>
          </div>
          <div
            className={`text-2xl md:text-3xl lg:text-[32px] leading-none ${darkMode ? 'text-white' : 'text-gray-900'}`}
          >
            {employees.length}
          </div>
        </div>

        {/* Online */}
        <div
          className={`flex flex-col justify-center px-6 md:px-8 lg:px-10 py-6`}
        >
          <div className="flex items-center justify-between mb-4">
            <span
              className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}
            >
              En línea
            </span>
            <span
              className={`text-xs font-medium ${darkMode ? 'text-green-400' : 'text-green-600'}`}
            >
              {((onlineCount / employees.length) * 100).toFixed(0)}%
            </span>
          </div>
          <div
            className={`text-2xl md:text-3xl lg:text-[32px] leading-none ${darkMode ? 'text-white' : 'text-gray-900'}`}
          >
            {onlineCount}
          </div>
        </div>

        {/* Offline */}
        <div
          className={`flex flex-col justify-center px-6 md:px-8 lg:px-10 py-6`}
        >
          <div className="flex items-center justify-between mb-4">
            <span
              className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}
            >
              Fuera de línea
            </span>
            <span
              className={`text-xs font-medium ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}
            >
              {((offlineCount / employees.length) * 100).toFixed(0)}%
            </span>
          </div>
          <div
            className={`text-2xl md:text-3xl lg:text-[32px] leading-none ${darkMode ? 'text-white' : 'text-gray-900'}`}
          >
            {offlineCount}
          </div>
        </div>
      </div>

      {/* Employee List */}
      <div
        /* style={{ border: '1px solid red' }} */
        className={`px-4 sm:px-6 md:px-8 lg:px-10 pt-6`}
      >
        <h3
          className={`text-base font-medium mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}
        >
          Lista de empleados
        </h3>

        {/* Table Header */}
        <div
          className={`hidden md:grid grid-cols-[2fr_1.5fr_1fr_1fr_1fr_1fr] gap-6 px-6 py-3 mb-2`}
        >
          <div
            className={`text-xs font-medium uppercase ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}
          >
            Empleado
          </div>
          <div
            className={`text-xs font-medium uppercase ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}
          >
            Tienda
          </div>
          <div
            className={`text-xs font-medium uppercase ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}
          >
            Posición
          </div>
          <div
            className={`text-xs font-medium uppercase ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}
          >
            Turno
          </div>
          <div
            className={`text-xs font-medium uppercase ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}
          >
            Check-in
          </div>
          <div
            className={`text-xs font-medium uppercase ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}
          >
            Estado
          </div>
        </div>

        {/* Employee Rows - Scrollable Container */}
        <div className="md:overflow-y-auto md:max-h-[calc(100vh-500px)] space-y-2">
          {employees.map((employee) => (
            <div
              key={employee.id}
              className={`grid grid-cols-1 md:grid-cols-[2fr_1.5fr_1fr_1fr_1fr_1fr] gap-4 md:gap-6 px-6 py-4 rounded-lg ${
                darkMode
                  ? 'bg-[#1e2936] hover:bg-[#242f3d]'
                  : 'bg-gray-50 hover:bg-gray-100'
              } transition-colors`}
            >
              {/* Employee Info */}
              <div className="flex items-center gap-3">
                <div className="relative">
                  <img
                    src={employee.avatar}
                    alt={employee.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  {/* Status indicator on avatar for mobile */}
                  <div
                    className={`md:hidden absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 ${
                      darkMode ? 'border-[#1e2936]' : 'border-white'
                    } ${employee.status === 'online' ? 'bg-green-500' : 'bg-gray-500'}`}
                  ></div>
                </div>
                <div className="flex-1 min-w-0">
                  <p
                    className={`text-sm font-medium truncate ${darkMode ? 'text-white' : 'text-gray-900'}`}
                  >
                    {employee.name}
                  </p>
                  {/* Mobile: Show store below name */}
                  <p
                    className={`text-xs md:hidden ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}
                  >
                    {employee.store}
                  </p>
                </div>
              </div>

              {/* Store - Desktop only */}
              <div className="hidden md:flex items-center">
                <span
                  className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}
                >
                  {employee.store}
                </span>
              </div>

              {/* Position */}
              <div className="flex items-center">
                <div className="flex items-center gap-2 w-full">
                  <span className="md:hidden text-xs text-gray-500">
                    Posición:
                  </span>
                  <span
                    className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}
                  >
                    {employee.position}
                  </span>
                </div>
              </div>

              {/* Shift */}
              <div className="flex items-center">
                <div className="flex items-center gap-2 w-full">
                  <span className="md:hidden text-xs text-gray-500">
                    Turno:
                  </span>
                  <span
                    className={`text-xs px-3 py-1 rounded-md font-medium ${
                      darkMode
                        ? 'bg-slate-700/50 text-slate-300'
                        : 'bg-gray-200 text-gray-700'
                    }`}
                  >
                    {employee.shift}
                  </span>
                </div>
              </div>

              {/* Check-in */}
              <div className="flex items-center">
                <div className="flex items-center gap-2 w-full">
                  <span className="md:hidden text-xs text-gray-500">
                    Check-in:
                  </span>
                  <span
                    className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}
                  >
                    {employee.checkIn}
                  </span>
                </div>
              </div>

              {/* Status */}
              <div className="flex items-center">
                <div className="flex items-center gap-2">
                  <div
                    className={`hidden md:block w-2 h-2 rounded-full ${
                      employee.status === 'online'
                        ? 'bg-green-500'
                        : 'bg-gray-500'
                    }`}
                  ></div>
                  <span
                    className={`text-sm font-medium ${
                      employee.status === 'online'
                        ? darkMode
                          ? 'text-green-400'
                          : 'text-green-600'
                        : darkMode
                          ? 'text-gray-500'
                          : 'text-gray-500'
                    }`}
                  >
                    {employee.status === 'online' ? 'En línea' : 'Offline'}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
