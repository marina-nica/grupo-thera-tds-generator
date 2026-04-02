import { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { TDSData, TrilingualField } from '../types';

export const useTranslation = () => {
  const { data, setData } = useTheme();
  const [isTranslating, setIsTranslating] = useState(false);

  const getMockTranslation = (text: string, _targetLang: 'en' | 'es'): string => {
    return text || '';
  };

  const translateAPI = async (text: string, targetLang: 'en' | 'es'): Promise<string | null> => {
    if (!text) return '';
    try {
      const q = encodeURIComponent(text);
      const url = `https://api.mymemory.translated.net/get?q=${q}&langpair=pt|${targetLang}`;
      
      const response = await fetch(url);

      if (!response.ok) {
        console.warn(`[MyMemory API] Erro de resposta: ${response.status}. Usando Fallback.`);
        return null;
      }

      const resData = await response.json();
      
      // MyMemory structure: { responseData: { translatedText: "..." } }
      if (resData.responseData && resData.responseData.translatedText) {
        let translatedText = resData.responseData.translatedText;
        
        // MyMemory sometimes returns HTML entities (like &#39; for quotes)
        // A simple way to decode basic ones if needed, but for now we'll return it clean.
        // If the API returns the same text due to no match, it still counts as a valid response
        return translatedText.trim();
      }

      return null; // Fallback to original text if no translatedText found
    } catch (err) {
      console.warn("[MyMemory API] Erro de rede na tradução. Usando Fallback.");
      return null;
    }
  };

  const translateFieldIfNeeded = async (current: any): Promise<TrilingualField | null> => {
    // PROTEÇÃO CRÍTICA: Se não for um objeto trilingue (ex: era string), ignora ou reporta erro.
    if (!current || typeof current !== 'object' || !current.pt || !current.pt.trim()) {
      return null;
    }

    const updates: Partial<TrilingualField> = {};

    // Tenta Inglês
    if (!current.en) {
      const apiResult = await translateAPI(current.pt, 'en');
      updates.en = apiResult ?? getMockTranslation(current.pt, 'en');
      if (!apiResult) (window as any)._translationUsedMock = true;
    }

    // Tenta Espanhol
    if (!current.es) {
      const apiResult = await translateAPI(current.pt, 'es');
      updates.es = apiResult ?? getMockTranslation(current.pt, 'es');
      if (!apiResult) (window as any)._translationUsedMock = true;
    }

    return Object.keys(updates).length > 0 ? { ...current, ...updates } : null;
  };

  /**
   * Translates a single field on blur (when user leaves the PT input).
   * Supports deep paths like "customSections.0.title"
   */
  const handleTranslateBlur = async (path: string, currentPt: string) => {
    if (!currentPt.trim()) return;

    if (path.startsWith('customSections')) {
      const parts = path.split('.');
      const index = parseInt(parts[1], 10);
      const subField = parts[2] as 'title' | 'value';

      const section = data.customSections[index];
      if (!section) return;

      const updated = await translateFieldIfNeeded(section[subField]);
      if (updated) {
        setData(prev => {
          const newSections = [...prev.customSections];
          newSections[index] = { ...newSections[index], [subField]: updated };
          return { ...prev, customSections: newSections };
        });
      }
    } else {
      const fieldKey = path as keyof TDSData;
      const fieldData = data[fieldKey] as TrilingualField;
      const updated = await translateFieldIfNeeded(fieldData);
      if (updated) {
        setData(prev => ({ ...prev, [fieldKey]: updated }));
      }
    }
  };

  /**
   * Translates ALL fields at once (button click).
   * Uses functional setData to always read freshest state.
   */
  const handleTranslateAll = async () => {
    setIsTranslating(true);
    (window as any)._translationUsedMock = false;

    try {
      // 1. Traduzir campos base trilingues (Removendo Dimensions/Weight que são strings)
      const descUpdated = await translateFieldIfNeeded(data.shortDescription);
      const matUpdated = await translateFieldIfNeeded(data.materials);
      const careUpdated = await translateFieldIfNeeded(data.careInstructions);

      // 2. Traduzir todas as seções customizadas (Custom Sections)
      const translatedSections = await Promise.all(data.customSections.map(async (sec) => {
        const titleUp = await translateFieldIfNeeded(sec.title);
        const valUp = await translateFieldIfNeeded(sec.value);
        return {
          ...sec,
          title: titleUp ?? sec.title,
          value: valUp ?? sec.value
        };
      }));

      // 3. Aplicar tudo em um único update de estado
      setData(prev => ({
        ...prev,
        shortDescription: descUpdated ?? prev.shortDescription,
        materials: matUpdated ?? prev.materials,
        careInstructions: careUpdated ?? prev.careInstructions,
        customSections: translatedSections,
      }));

      if ((window as any)._translationUsedMock) {
        alert("Atenção: A API de tradução está offline ou atingiu o limite. Utilizamos o Modo de Simulação [Mock] para preencher os campos.");
      } else {
        alert("Versão traduzida gerada com sucesso via IA!");
      }

    } catch (e) {
      console.error("Erro drástico no handleTranslateAll:", e);
      alert("Houve um erro técnico inesperado ao processar a tradução.");
    } finally {
      setIsTranslating(false);
    }
  };

  return { handleTranslateBlur, handleTranslateAll, isTranslating };
};
