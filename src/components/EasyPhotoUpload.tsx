import React, { useState, useRef, useCallback } from 'react';
import { 
  FolderUp, 
  Upload, 
  Image as ImageIcon, 
  Trash2, 
  RefreshCw, 
  CheckCircle2, 
  Link as LinkIcon,
  AlertCircle
} from 'lucide-react';

interface EasyPhotoUploadProps {
  label: string;
  value: string;
  onChange: (url: string) => void;
  helperText?: string;
  aspectRatio?: 'video' | 'portrait' | 'square' | 'wide';
  required?: boolean;
  className?: string;
}

/**
 * Compresses an image file using an off-screen canvas to guarantee 
 * crisp quality while keeping the Base64 payload light enough for localStorage.
 */
const compressImageFile = (file: File, maxDim = 1200, quality = 0.85): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = reject;
    reader.onload = () => {
      const img = new Image();
      img.onerror = reject;
      img.onload = () => {
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > maxDim) {
            height = Math.round((height * maxDim) / width);
            width = maxDim;
          }
        } else {
          if (height > maxDim) {
            width = Math.round((width * maxDim) / height);
            height = maxDim;
          }
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve(reader.result as string);
          return;
        }

        ctx.drawImage(img, 0, 0, width, height);
        const dataUrl = canvas.toDataURL('image/jpeg', quality);
        resolve(dataUrl);
      };
      img.src = reader.result as string;
    };
    reader.readAsDataURL(file);
  });
};

export const EasyPhotoUpload: React.FC<EasyPhotoUploadProps> = ({
  label,
  value,
  onChange,
  helperText = 'Select any photo file directly from your computer or phone folder.',
  aspectRatio = 'video',
  required = false,
  className = '',
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [showUrlInput, setShowUrlInput] = useState(false);
  const [recentFileName, setRecentFileName] = useState<string | null>(null);

  // Process selected file
  const handleFileProcess = useCallback(
    async (file: File) => {
      if (!file.type.startsWith('image/')) {
        setErrorMessage('Please select a valid image file (PNG, JPG, WEBP, etc.)');
        return;
      }
      setErrorMessage(null);
      setIsProcessing(true);
      try {
        const compressedBase64 = await compressImageFile(file);
        onChange(compressedBase64);
        setRecentFileName(file.name);
      } catch (err) {
        console.error('Failed to process image:', err);
        setErrorMessage('Could not load this image file. Please try another image.');
      } finally {
        setIsProcessing(false);
      }
    },
    [onChange]
  );

  // Drag and drop handlers
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      handleFileProcess(file);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      handleFileProcess(file);
      // Reset input value so re-selecting same file triggers change
      e.target.value = '';
    }
  };

  const handleTriggerFolderBrowse = () => {
    fileInputRef.current?.click();
  };

  const handleRemovePhoto = () => {
    onChange('');
    setRecentFileName(null);
    setErrorMessage(null);
  };

  const aspectClass = {
    video: 'aspect-video max-h-56',
    portrait: 'aspect-[3/4] max-h-64',
    square: 'aspect-square max-h-52',
    wide: 'aspect-[21/9] max-h-48',
  }[aspectRatio];

  return (
    <div className={`space-y-2 ${className}`}>
      {/* Hidden native file input for folder/device selection */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileInputChange}
        className="hidden"
        id={`file-input-${label.replace(/\s+/g, '-').toLowerCase()}`}
      />

      {/* Label and Mode Switcher */}
      <div className="flex items-center justify-between">
        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
          {label} {required && <span className="text-rose-600">*</span>}
        </label>
        <button
          type="button"
          onClick={() => setShowUrlInput(!showUrlInput)}
          className="text-[11px] text-emerald-700 hover:text-emerald-800 font-semibold inline-flex items-center gap-1 hover:underline cursor-pointer"
        >
          <LinkIcon className="w-3 h-3" />
          <span>{showUrlInput ? 'Switch to Folder Upload' : 'Paste Web Link instead'}</span>
        </button>
      </div>

      {errorMessage && (
        <div className="p-2.5 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-700 flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0 text-rose-500" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Mode A: Optional Manual URL Input */}
      {showUrlInput ? (
        <div className="space-y-2 p-3 rounded-2xl bg-slate-50 border border-slate-200">
          <input
            type="url"
            value={value}
            onChange={(e) => {
              onChange(e.target.value);
              setRecentFileName(null);
            }}
            placeholder="https://example.com/photo.jpg"
            className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 bg-white focus:ring-2 focus:ring-emerald-600 focus:outline-none"
          />
          <div className="flex items-center justify-between">
            <span className="text-[11px] text-slate-500">
              Direct external image link or CDN URL
            </span>
            <button
              type="button"
              onClick={() => {
                setShowUrlInput(false);
                handleTriggerFolderBrowse();
              }}
              className="text-xs text-emerald-700 font-bold hover:underline inline-flex items-center gap-1"
            >
              <FolderUp className="w-3.5 h-3.5" />
              <span>Or Upload from Folder</span>
            </button>
          </div>
        </div>
      ) : null}

      {/* Mode B: Automatic Folder Upload & Drag-and-Drop Zone */}
      {!value ? (
        /* Empty State: Invitation to Browse Folder or Drag and Drop */
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={handleTriggerFolderBrowse}
          className={`group relative border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition-all duration-200 ${
            isDragging
              ? 'border-emerald-500 bg-emerald-50/80 scale-[1.01]'
              : 'border-slate-300 hover:border-emerald-600 bg-slate-50/60 hover:bg-emerald-50/20'
          }`}
        >
          <div className="flex flex-col items-center justify-center space-y-3">
            <div
              className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all ${
                isDragging
                  ? 'bg-emerald-600 text-white shadow-lg'
                  : 'bg-emerald-100/70 text-emerald-800 group-hover:bg-emerald-700 group-hover:text-white'
              }`}
            >
              {isProcessing ? (
                <RefreshCw className="w-6 h-6 animate-spin" />
              ) : (
                <FolderUp className="w-7 h-7" />
              )}
            </div>

            <div className="space-y-1">
              <p className="text-sm font-bold text-slate-800 group-hover:text-emerald-900 flex items-center justify-center gap-1.5">
                <span>Click to Upload from Folder</span>
                <span className="text-emerald-700 text-xs font-semibold">
                  (or Drag & Drop)
                </span>
              </p>
              <p className="text-xs text-slate-500">
                {helperText}
              </p>
            </div>

            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-slate-200 shadow-2xs text-[11px] font-semibold text-slate-600">
              <Upload className="w-3.5 h-3.5 text-emerald-600" />
              <span>Direct automatic upload from your computer or phone</span>
            </div>
          </div>
        </div>
      ) : (
        /* Populated State: Live Preview with Quick Folder-Change & Remove actions */
        <div className="rounded-2xl border border-slate-200 overflow-hidden bg-slate-900/5 p-3 space-y-3">
          <div className={`relative w-full ${aspectClass} rounded-xl overflow-hidden bg-slate-900 border border-slate-200 flex items-center justify-center shadow-xs`}>
            <img
              src={value}
              alt={label}
              className="w-full h-full object-cover"
              onError={() => {
                setErrorMessage('Unable to preview this image source.');
              }}
            />

            {/* Quick Badge */}
            <div className="absolute top-2 left-2 px-2.5 py-1 rounded-lg bg-slate-950/80 backdrop-blur-xs text-emerald-300 text-[11px] font-bold flex items-center gap-1.5 shadow-sm">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>Photo Attached</span>
            </div>
          </div>

          {/* Controls below preview */}
          <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleTriggerFolderBrowse}
                disabled={isProcessing}
                className="px-3.5 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold transition-colors inline-flex items-center gap-1.5 shadow-xs cursor-pointer"
              >
                {isProcessing ? (
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  <FolderUp className="w-3.5 h-3.5" />
                )}
                <span>Change from Folder</span>
              </button>

              <button
                type="button"
                onClick={handleRemovePhoto}
                className="px-3 py-2 rounded-xl bg-white hover:bg-rose-50 text-rose-600 border border-slate-200 hover:border-rose-200 text-xs font-bold transition-colors inline-flex items-center gap-1.5 cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Remove</span>
              </button>
            </div>

            {recentFileName ? (
              <span className="text-[11px] text-slate-500 font-mono truncate max-w-[200px]" title={recentFileName}>
                {recentFileName}
              </span>
            ) : (
              <span className="text-[11px] text-emerald-700 font-medium flex items-center gap-1">
                <ImageIcon className="w-3.5 h-3.5" />
                <span>Ready & saved</span>
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
