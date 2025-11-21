import React, { useState, useRef } from 'react';
import { Upload, Wand2, AlertCircle, Download, X, Image as ImageIcon, RefreshCw } from 'lucide-react';
import { editImageWithGemini } from '../services/gemini';
import LoadingSpinner from './LoadingSpinner';

const ImageEditor: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [mimeType, setMimeType] = useState<string>('image/png');
  const [prompt, setPrompt] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
        setMimeType(file.type);
        setGeneratedImage(null); // Reset previous result
        setError(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
        setMimeType(file.type);
        setGeneratedImage(null);
        setError(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGenerate = async () => {
    if (!selectedImage || !prompt) return;

    setIsProcessing(true);
    setError(null);

    try {
      // Extract pure base64 string (remove data:image/xxx;base64, prefix)
      const base64Data = selectedImage.split(',')[1];
      
      const result = await editImageWithGemini(base64Data, mimeType, prompt);
      
      if (result) {
        setGeneratedImage(result);
      } else {
        setError("A IA processou o pedido mas não retornou imagem. Tente outro comando.");
      }
    } catch (err) {
      console.error(err);
      setError("Erro ao processar imagem. Por favor tente novamente.");
    } finally {
      setIsProcessing(false);
    }
  };

  const clearAll = () => {
    setSelectedImage(null);
    setGeneratedImage(null);
    setPrompt('');
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Dashboard Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Left Column: Input */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center border-b border-gray-100 pb-3">
              <ImageIcon className="w-5 h-5 mr-2 text-indigo-900" />
              Imagem Original
            </h2>

            {/* Upload Area */}
            {!selectedImage ? (
              <div 
                onDragOver={(e) => e.preventDefault()}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-gray-300 rounded-xl p-12 flex flex-col items-center justify-center cursor-pointer hover:border-indigo-500 hover:bg-indigo-50/50 transition-all h-80 group"
              >
                <div className="bg-indigo-50 p-4 rounded-full mb-4 group-hover:bg-indigo-100 transition-colors">
                    <Upload className="w-8 h-8 text-indigo-600" />
                </div>
                <p className="text-gray-700 font-medium">Clique para carregar foto</p>
                <p className="text-sm text-gray-400 mt-2">ou arraste o arquivo aqui</p>
              </div>
            ) : (
              <div className="relative rounded-xl overflow-hidden border border-gray-200 bg-gray-50 h-80 flex items-center justify-center group">
                <img 
                  src={selectedImage} 
                  alt="Original" 
                  className="max-h-full max-w-full object-contain"
                />
                <button 
                  onClick={clearAll}
                  className="absolute top-3 right-3 bg-white text-gray-500 p-2 rounded-full hover:bg-red-50 hover:text-red-500 transition-colors shadow-sm border border-gray-200"
                  title="Remover imagem"
                >
                  <X size={18} />
                </button>
              </div>
            )}
            <input 
              type="file" 
              ref={fileInputRef}
              onChange={handleImageUpload} 
              className="hidden" 
              accept="image/*" 
            />
          </div>

          {/* Prompt Area */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
             <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center border-b border-gray-100 pb-3">
              <Wand2 className="w-5 h-5 mr-2 text-indigo-900" />
              Instruções de Edição
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">O que deve ser alterado?</label>
                <textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="Ex: 'Adicione capacetes de segurança nos trabalhadores', 'Remova os entulhos', 'Adicione paisagismo na frente'"
                  className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 min-h-[100px] bg-white text-gray-900 placeholder-gray-500 resize-none disabled:bg-gray-100 disabled:text-gray-400"
                  disabled={!selectedImage || isProcessing}
                />
              </div>
              
              {error && (
                <div className="bg-red-50 border border-red-100 rounded-lg p-4">
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <AlertCircle className="h-5 w-5 text-red-500" />
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-red-700">{error}</p>
                    </div>
                  </div>
                </div>
              )}

              <button
                onClick={handleGenerate}
                disabled={!selectedImage || !prompt || isProcessing}
                className="w-full bg-indigo-900 hover:bg-indigo-800 text-white font-semibold py-4 px-6 rounded-lg shadow-lg shadow-indigo-900/20 transition-all disabled:opacity-50 disabled:shadow-none disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                {isProcessing ? (
                  <>
                    <RefreshCw className="w-5 h-5 animate-spin" />
                    <span>PROCESSANDO...</span>
                  </>
                ) : (
                  <>
                    <Wand2 className="w-5 h-5" />
                    <span>GERAR ALTERAÇÕES</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Output */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 flex flex-col h-full min-h-[600px]">
          <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center justify-between border-b border-gray-100 pb-3">
            <span className="flex items-center">
              <ImageIcon className="w-5 h-5 mr-2 text-indigo-900" />
              Resultado
            </span>
            {generatedImage && (
              <a 
                href={generatedImage} 
                download="projeto-editado.png"
                className="text-sm text-indigo-600 hover:text-indigo-800 font-medium flex items-center bg-indigo-50 px-3 py-1.5 rounded-lg transition-colors"
              >
                <Download className="w-4 h-4 mr-1.5" />
                Baixar
              </a>
            )}
          </h2>
          
          <div className="flex-1 bg-gray-50 rounded-xl border border-gray-200 flex items-center justify-center overflow-hidden relative">
            {isProcessing ? (
              <LoadingSpinner />
            ) : generatedImage ? (
              <img 
                src={generatedImage} 
                alt="Generated" 
                className="max-h-full max-w-full object-contain shadow-lg"
              />
            ) : (
              <div className="text-center p-8">
                <div className="inline-block p-6 bg-white rounded-full mb-4 shadow-sm">
                  <ImageIcon className="w-10 h-10 text-gray-300" />
                </div>
                <p className="text-gray-900 font-medium">Aguardando processamento</p>
                <p className="text-gray-500 text-sm mt-1">Carregue uma imagem e digite instruções para começar.</p>
              </div>
            )}
          </div>
          
          {/* Info Box */}
          {generatedImage && (
            <div className="mt-4 p-4 bg-indigo-50/50 rounded-lg border border-indigo-100">
              <h4 className="text-xs font-bold text-indigo-900 uppercase mb-1 tracking-wide">Alteração Solicitada</h4>
              <p className="text-sm text-gray-700 italic">"{prompt}"</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ImageEditor;