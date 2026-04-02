import { Layers } from 'lucide-react';
import EditorForm from './components/EditorForm';
import PDFPreview from './components/PDFPreview';
import { useTheme } from './context/ThemeContext';
import { BrandType } from './types';
import { useTranslation } from './hooks/useTranslation';

function App() {
  const { brand, setBrand } = useTheme();
  const { handleTranslateAll, isTranslating } = useTranslation();

  const brandOptions: { value: BrandType; label: string; logo: string }[] = [
    { value: 'theramart', label: 'Theramart', logo: `${import.meta.env.BASE_URL}logos/theramart.png` },
    { value: 'nuvo', label: 'Nuvo', logo: `${import.meta.env.BASE_URL}logos/nuvo.png` },
    { value: 'backbone', label: 'Backbone', logo: `${import.meta.env.BASE_URL}logos/backbone.png` },
    { value: 'nextep', label: 'Nextep', logo: `${import.meta.env.BASE_URL}logos/nextep.png` },
  ];

  return (
    <div className="flex h-screen overflow-hidden bg-slate-100">
      {/* Top Sidebar & Forms container */}
      <div className="w-[45%] flex flex-col bg-white border-r shadow-xl z-10 sticky top-0 h-screen overflow-y-auto">
        <header className="p-6 border-b sticky top-0 bg-white/80 backdrop-blur-md z-20 flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <Layers className="w-8 h-8" style={{ color: '#c2da6a' }} />
            <div>
              <h1 className="text-2xl font-bold" style={{ color: '#2f4450' }}>
                TDS Generator
              </h1>
              <p className="text-sm text-gray-500">Grupo Thera</p>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex gap-1 p-1.5 bg-gray-100 rounded-xl">
              {brandOptions.map((b) => (
                <button
                  key={b.value}
                  onClick={() => setBrand(b.value)}
                  className={`relative px-3 py-2 rounded-lg transition-all duration-300 flex items-center justify-center ${
                    brand === b.value
                      ? 'bg-white shadow-md scale-105'
                      : 'opacity-40 grayscale hover:opacity-70 hover:grayscale-0 hover:bg-white/50'
                  }`}
                  title={b.label}
                >
                  <img
                    src={b.logo}
                    alt={b.label}
                    className="h-7 w-auto object-contain"
                  />
                  {brand === b.value && (
                    <span className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-6 h-1 bg-indigo-500 rounded-full" />
                  )}
                </button>
              ))}
            </div>
            
            <button
              onClick={handleTranslateAll}
              disabled={isTranslating}
              className={`px-3 py-2 h-[52px] rounded-lg text-sm font-bold transition-all shadow-md ${
                isTranslating
                  ? 'bg-slate-400 text-[#c2da6a] cursor-not-allowed'
                  : 'bg-[#2f4450] text-[#c2da6a] hover:opacity-90 hover:shadow-lg hover:-translate-y-0.5'
              }`}
            >
              {isTranslating ? 'Traduzindo...' : 'Versão traduzida'}
            </button>
          </div>
        </header>
        
        <div className="p-6">
          <EditorForm />
        </div>
      </div>

      {/* Live Preview Container */}
      <div className="w-[55%] bg-slate-200 flex flex-col relative">
        <div className="w-full h-full p-4 flex justify-center items-center">
            <PDFPreview />
        </div>
      </div>
    </div>
  );
}

export default App;
