import { useTheme } from '../context/useTheme';

export const SalesPage = () => {
  const { darkMode, theme } = useTheme();

  return (
    <div className={`${theme.bg} `}>
      {/* Header with tabs and button */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 px-4 sm:px-6 md:px-8 lg:px-10 pt-6 sm:pt-8 pb-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 md:gap-8 w-full sm:w-auto">
          <h2
            className={`text-lg  ${darkMode ? 'text-white' : 'text-gray-900'}`}
          >
            Flujo de caja
          </h2>
          <div
            className={`hidden sm:block h-5 w-px ${darkMode ? 'bg-gray-600' : 'bg-gray-300'}`}
          ></div>
          <div className="flex items-center gap-4 sm:gap-6 md:gap-8 overflow-x-auto w-full sm:w-auto">
            <button
              className={`text-xs sm:text-sm font-medium whitespace-nowrap text-[#7c85ff]`}
            >
              Últimos 7 días
            </button>
            <button
              className={`text-xs sm:text-sm font-medium whitespace-nowrap ${darkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-900'} transition-colors`}
            >
              Últimos 30 días
            </button>
            <button
              className={`text-xs sm:text-sm font-medium whitespace-nowrap ${darkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-900'} transition-colors`}
            >
              Todo el tiempo
            </button>
          </div>
        </div>
        <button
          className={`${darkMode ? 'bg-indigo-600 hover:bg-indigo-700' : 'bg-indigo-600 hover:bg-indigo-700'} text-white px-4 sm:px-5 py-2 sm:py-2.5 rounded-lg text-xs sm:text-sm font-medium flex items-center gap-2 transition-colors w-full sm:w-auto justify-center`}
        >
          <span className="text-base sm:text-lg font-light">+</span>
          Nueva factura
        </button>
      </div>

      {/* Stats Grid with vertical dividers */}
      <div
        className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border-t border-b ${theme.border} divide-y md:divide-y-0 md:divide-x`}
      >
        {/* Revenue */}
        <div
          className={`flex flex-col justify-center px-6 md:px-8 lg:px-10 py-9 ${theme.border}`}
        >
          <div className="flex items-center justify-between mb-4">
            <span
              className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}
            >
              Ingresos
            </span>
            <span
              className={`text-xs font-medium ${darkMode ? 'text-green-400' : 'text-green-600'}`}
            >
              +4.75%
            </span>
          </div>
          <div
            className={`text-2xl md:text-3xl lg:text-[32px]  leading-none ${darkMode ? 'text-white' : 'text-gray-900'}`}
          >
            $405,091.00
          </div>
        </div>

        {/* Overdue invoices - with red/pink glow */}
        <div
          className={`flex flex-col relative justify-center px-6 md:px-8 lg:px-10 py-6 ${theme.border}`}
        >
          {/* Subtle red glow backdrop */}
          {darkMode && (
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-red-500/5 to-transparent rounded-lg"></div>
          )}
          <div className="relative">
            <div className="flex items-start justify-between mb-4">
              <span
                className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}
              >
                Facturas vencidas
              </span>
              <span
                className={`text-xs font-medium ${darkMode ? 'text-red-400' : 'text-red-600'}`}
              >
                +54.02%
              </span>
            </div>
            <div
              className={`text-2xl md:text-3xl lg:text-[32px]  leading-none ${darkMode ? 'text-white' : 'text-gray-900'}`}
            >
              $12,787.00
            </div>
          </div>
        </div>

        {/* Outstanding invoices */}
        <div
          className={`flex flex-col justify-center px-6 md:px-8 lg:px-10 py-6 ${theme.border}`}
        >
          <div className="flex items-center justify-between mb-4">
            <span
              className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}
            >
              Facturas pendientes
            </span>
            <span
              className={`text-xs font-medium ${darkMode ? 'text-red-400' : 'text-red-600'}`}
            >
              -1.39%
            </span>
          </div>
          <div
            className={`text-2xl md:text-3xl lg:text-[32px]  leading-none ${darkMode ? 'text-white' : 'text-gray-900'}`}
          >
            $245,988.00
          </div>
        </div>

        {/* Expenses */}
        <div
          className={`flex flex-col relative justify-center px-6 md:px-8 lg:px-10 py-6 ${theme.border}`}
        >
          {/* Subtle red glow backdrop */}
          {darkMode && (
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-red-500/5 to-transparent rounded-lg"></div>
          )}
          <div className="relative"></div>
          <div className="flex items-center justify-between mb-4">
            <span
              className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}
            >
              Gastos
            </span>
            <span
              className={`text-xs font-medium ${darkMode ? 'text-green-400' : 'text-green-600'}`}
            >
              +10.18%
            </span>
          </div>
          <div
            className={`text-2xl md:text-3xl lg:text-[32px]  leading-none ${darkMode ? 'text-white' : 'text-gray-900'}`}
          >
            $30,156.00
          </div>
        </div>
      </div>
    </div>
  );
};
