import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { TDSData, LogisticsData } from '../types';
import { useTranslation } from '../hooks/useTranslation';
import { 
  Package, 
  Languages, 
  Truck, 
  FileText,
  Plus,
  Trash2,
  Image as ImageIcon,
  Upload,
  Scale,
  Ruler
} from 'lucide-react';

export default function EditorForm() {
  const { data, setData, brand } = useTheme();
  const { handleTranslateBlur } = useTranslation();

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setData({ ...data, productImage: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const getBrandAccent = () => {
    switch (brand) {
      case 'theramart': return 'text-cyan-600 border-cyan-500 bg-cyan-50';
      case 'nuvo': return 'text-orange-600 border-orange-500 bg-orange-50';
      case 'backbone': return 'text-lime-500 border-lime-500 bg-lime-50';
      case 'nextep': return 'text-teal-600 border-teal-500 bg-teal-50';
      default: return 'text-indigo-600 border-indigo-500 bg-indigo-50';
    }
  };

  const getBrandBtnColor = () => {
    switch (brand) {
      case 'theramart': return 'bg-cyan-600 hover:bg-cyan-700';
      case 'nuvo': return 'bg-orange-600 hover:bg-orange-700';
      case 'backbone': return 'bg-lime-600 hover:bg-lime-700';
      case 'nextep': return 'bg-teal-600 hover:bg-teal-700';
      default: return 'bg-indigo-600 hover:bg-indigo-700';
    }
  };

  const handleUpdate = (field: keyof TDSData, value: string, lang: 'pt' | 'en' | 'es' = 'pt') => {
    if (typeof data[field] === 'string') {
      setData({ ...data, [field]: value });
    } else if (typeof data[field] === 'object' && !Array.isArray(data[field])) {
      setData({
        ...data,
        [field]: { ...(data[field] as any), [lang]: value },
      });
    }
  };

  const handleLogisticsUpdate = (field: keyof LogisticsData, value: string) => {
    setData({
      ...data,
      logistics: { ...data.logistics, [field]: value },
    });
  };

  const handleAddSection = () => {
    const newSection = {
      id: Math.random().toString(36).substr(2, 9),
      title: { pt: '', en: '', es: '' },
      value: { pt: '', en: '', es: '' }
    };
    setData({ ...data, customSections: [...data.customSections, newSection] });
  };

  const handleRemoveSection = (index: number) => {
    const newSections = [...data.customSections];
    newSections.splice(index, 1);
    setData({ ...data, customSections: newSections });
  };

  const SectionTitle = ({ icon: Icon, title }: { icon: any, title: string }) => (
    <div className={`flex items-center gap-2 mb-4 border-b pb-2 ${getBrandAccent().split(' ')[0]} ${getBrandAccent().split(' ')[1]}`}>
      <Icon className="w-5 h-5" />
      <h2 className="text-lg font-bold text-slate-800">{title}</h2>
    </div>
  );

  // Mapping of field keys to their English display names
  const fieldLabels: Record<string, string> = {
    shortDescription: 'Brief Product Description',
    dimensions: 'Dimensions',
    weight: 'Weight',
  };

  return (
    <div className="space-y-8 pb-32 max-w-2xl mx-auto">

      {/* === SECTION 1: Product === */}
      <section className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
        <SectionTitle icon={Package} title="Product" />
        <div className="grid grid-cols-2 gap-6">
          <div className="col-span-2">
            <label className="block text-sm font-semibold text-slate-700 mb-1">Product Name</label>
            <input
              type="text"
              value={data.productName}
              onChange={(e) => handleUpdate('productName', e.target.value)}
              className="block w-full rounded-lg border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-3 border font-medium text-lg"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">SKU</label>
            <input
              type="text"
              value={data.sku}
              onChange={(e) => handleUpdate('sku', e.target.value)}
              className="block w-full rounded-lg border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border font-mono text-sm text-slate-600"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Update Date</label>
            <input
              type="date"
              value={data.updateDate}
              onChange={(e) => handleUpdate('updateDate', e.target.value)}
              className="block w-full rounded-lg border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border text-sm text-slate-600"
            />
          </div>

          <div className="col-span-2">
            <label className="block text-sm font-semibold text-slate-700 mb-2">Product Photo (650 x 650 px)</label>
            <div className="flex items-center gap-4">
              <div className={`w-24 h-24 rounded-xl border-2 border-dashed flex items-center justify-center overflow-hidden bg-slate-50 transition-colors ${data.productImage ? 'border-indigo-200' : 'border-slate-300 hover:border-indigo-400'}`}>
                {data.productImage ? (
                  <img src={data.productImage} alt="Preview" className="w-full h-full object-cover" />
                ) : (
                  <ImageIcon className="w-8 h-8 text-slate-400" />
                )}
              </div>
              <div className="flex-1">
                <label className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-white text-sm font-medium cursor-pointer shadow-sm transition-all ${getBrandBtnColor()}`}>
                  <Upload className="w-4 h-4" />
                  {data.productImage ? 'Change Image' : 'Upload Image'}
                  <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} />
                </label>
                <p className="text-xs text-slate-500 mt-2">Recommended: Square format (1:1), PNG or JPG.</p>
                {data.productImage && (
                  <button 
                    onClick={() => setData({ ...data, productImage: '' })}
                    className="text-xs text-red-600 hover:underline mt-1 block"
                  >
                    Remove image
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* === SECTION 2: Product Specifications (Merged) === */}
      <section className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
        <div className="mb-4 border-b pb-2">
          <SectionTitle icon={Languages} title="Product Specifications" />
        </div>

        <div className="space-y-6">
          {/* Trilingual Short Description */}
          <div className="space-y-3 p-4 bg-slate-50 rounded-xl border border-slate-200">
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-slate-500" />
              <h3 className="text-sm font-bold text-slate-700">{fieldLabels.shortDescription}</h3>
            </div>
            <div className="grid gap-3">
              {(['pt', 'en', 'es'] as const).map((lang) => (
                <div key={lang} className="flex gap-3 items-start">
                  <span className={`w-8 text-center text-xs font-bold px-1 py-1 rounded mt-1 uppercase shadow-sm ${lang === 'pt' ? 'bg-indigo-100 text-indigo-700' : 'bg-slate-200 text-slate-600'}`}>
                    {lang === 'es' ? 'SPA' : lang}
                  </span>
                  <textarea
                    rows={2}
                    value={data.shortDescription[lang]}
                    onChange={(e) => handleUpdate('shortDescription', e.target.value, lang)}
                    onBlur={() => lang === 'pt' && handleTranslateBlur('shortDescription', data.shortDescription.pt)}
                    className="block w-full rounded-lg border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border leading-relaxed placeholder:italic"
                    placeholder={lang === 'pt' ? "Descrição resumida do produto" : `${lang.toUpperCase()}`}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Unified Numeric Fields (Dimensions & Weight) */}
          <div className="grid grid-cols-2 gap-4">
             <div className="space-y-2 p-4 bg-slate-50 rounded-xl border border-slate-200">
                <div className="flex items-center gap-2 mb-1">
                  <Ruler className="w-4 h-4 text-slate-500" />
                  <h3 className="text-sm font-bold text-slate-700">{fieldLabels.dimensions}</h3>
                </div>
                <input
                  type="text"
                  value={data.dimensions}
                  onChange={(e) => handleUpdate('dimensions', e.target.value)}
                  className="block w-full rounded-lg border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
                  placeholder="___ x ___ x ___ cm"
                />
             </div>
             <div className="space-y-2 p-4 bg-slate-50 rounded-xl border border-slate-200">
                <div className="flex items-center gap-2 mb-1">
                  <Scale className="w-4 h-4 text-slate-500" />
                  <h3 className="text-sm font-bold text-slate-700">{fieldLabels.weight}</h3>
                </div>
                <input
                  type="text"
                  value={data.weight}
                  onChange={(e) => handleUpdate('weight', e.target.value)}
                  className="block w-full rounded-lg border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
                  placeholder="___ kg"
                />
             </div>
          </div>

          {/* Dynamic Fields (Custom Categories) */}
          <div className="space-y-4 pt-4 border-t border-slate-100">
            {data.customSections.map((section, index) => (
              <div key={section.id} className="p-4 border border-slate-200 rounded-xl bg-slate-50 shadow-sm relative group transition-all">
                <button 
                  onClick={() => handleRemoveSection(index)}
                  className="absolute -right-2 -top-2 bg-red-100 text-red-600 p-1.5 rounded-full hover:bg-red-200 opacity-0 group-hover:opacity-100 transition-opacity shadow-sm"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <span className="text-xs font-bold text-[#2f4450] block uppercase tracking-wider">CATEGORY</span>
                    <input
                      type="text" placeholder="PT" value={section.title.pt}
                      onChange={(e) => {
                        const newSpecs = [...data.customSections];
                        newSpecs[index].title.pt = e.target.value;
                        setData({ ...data, customSections: newSpecs });
                      }}
                      onBlur={() => handleTranslateBlur(`customSections.${index}.title`, section.title.pt)}
                      className="w-full text-sm border-slate-300 p-2 rounded-lg border shadow-sm"
                    />
                    <div className="flex gap-2">
                       <input type="text" placeholder="EN" value={section.title.en} onChange={(e) => { const n=[...data.customSections]; n[index].title.en=e.target.value; setData({...data, customSections:n})}} className="w-1/2 text-xs border-slate-300 bg-slate-100 p-1.5 rounded border" />
                       <input type="text" placeholder="ES" value={section.title.es} onChange={(e) => { const n=[...data.customSections]; n[index].title.es=e.target.value; setData({...data, customSections:n})}} className="w-1/2 text-xs border-slate-300 bg-slate-100 p-1.5 rounded border" />
                    </div>
                  </div>

                  <div className="space-y-2">
                     <span className="text-xs font-bold text-[#528189] block uppercase tracking-wider">VALUE</span>
                      <textarea
                        rows={1} 
                        placeholder={
                          section.id === 'materials-default' 
                            ? "Composição do produto" 
                            : (section.id === 'care-default' ? "Indicações de como manter o produto" : "PT")
                        } 
                        value={section.value.pt}
                        onChange={(e) => {
                          const newSpecs = [...data.customSections];
                          newSpecs[index].value.pt = e.target.value;
                          setData({ ...data, customSections: newSpecs });
                        }}
                        onBlur={() => handleTranslateBlur(`customSections.${index}.value`, section.value.pt)}
                        className="w-full text-sm border-slate-300 p-2 rounded-lg border shadow-sm placeholder:italic"
                      />
                    <div className="flex gap-2">
                       <textarea rows={1} placeholder="EN" value={section.value.en} onChange={(e) => { const n=[...data.customSections]; n[index].value.en=e.target.value; setData({...data, customSections:n})}} className="w-1/2 text-xs border-slate-300 bg-slate-100 p-1.5 rounded border placeholder:italic" />
                       <textarea rows={1} placeholder="ES" value={section.value.es} onChange={(e) => { const n=[...data.customSections]; n[index].value.es=e.target.value; setData({...data, customSections:n})}} className="w-1/2 text-xs border-slate-300 bg-slate-100 p-1.5 rounded border placeholder:italic" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center pt-2">
            <button 
              onClick={handleAddSection}
              className={`flex items-center gap-2 text-white px-6 py-2.5 rounded-xl text-sm font-bold shadow-md hover:shadow-lg transition-all active:scale-95 ${getBrandBtnColor()}`}
            >
              <Plus className="w-5 h-5" /> Add Category
            </button>
          </div>
        </div>
      </section>

      {/* === SECTION 4: Specifications per lot (Logistics - LAST) === */}
      <section className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
        <SectionTitle icon={Truck} title="Specifications per lot" />
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Units per Box</label>
            <div className="relative rounded-md shadow-sm">
              <input type="text" value={data.logistics.unitsPerBox} onChange={(e) => handleLogisticsUpdate('unitsPerBox', e.target.value)} className="block w-full rounded-lg p-2 pr-10 border border-slate-300 sm:text-sm" />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none"><span className="text-slate-500 sm:text-sm font-medium">un</span></div>
            </div>
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Box Dimensions</label>
            <div className="relative rounded-md shadow-sm">
              <input type="text" value={data.logistics.dimensionsBox} onChange={(e) => handleLogisticsUpdate('dimensionsBox', e.target.value)} placeholder="___ x ___ x ___ cm" className="block w-full rounded-lg p-2 pr-10 border border-slate-300 sm:text-sm" />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none"><span className="text-slate-500 sm:text-sm font-medium">cm</span></div>
            </div>
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Gross Weight</label>
            <div className="relative rounded-md shadow-sm">
              <input type="text" value={data.logistics.grossWeight} onChange={(e) => handleLogisticsUpdate('grossWeight', e.target.value)} placeholder="___ kg" className="block w-full rounded-lg p-2 pr-10 border border-slate-300 sm:text-sm" />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none"><span className="text-slate-500 sm:text-sm font-medium">kg</span></div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
