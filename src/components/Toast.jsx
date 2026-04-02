import { useApp } from '../context/AppContext';

export default function Toast() {
  const { toasts } = useApp();
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 pointer-events-none">
      {toasts.map(t => (
        <div key={t.id} className="bg-gray-800 border border-amber-400 text-amber-300 px-4 py-3 rounded-lg shadow-lg text-sm font-medium">
          {t.message}
        </div>
      ))}
    </div>
  );
}
