"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { UploadCloud, Image as ImageIcon, X, Loader2, Check } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface ImageUploaderProps {
  value: string;
  onChange: (url: string) => void;
  label?: string;
  aspectRatio?: "portrait" | "video" | "square";
  placeholder?: string;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({
  value,
  onChange,
  label = "Upload Image / Photo",
  aspectRatio = "portrait",
  placeholder = "Upload image or enter public path...",
}) => {
  const [isUploading, setIsUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [error, setError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const aspectClasses = {
    portrait: "aspect-[4/5] w-[180px] min-h-[225px] max-w-[180px]",
    video: "aspect-video w-[280px] min-h-[157px] max-w-[280px]",
    square: "aspect-square w-[160px] min-h-[160px] max-w-[160px]",
  }[aspectRatio];

  const handleUpload = async (file: File) => {
    setIsUploading(true);
    setError("");

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Upload failed");
      }

      onChange(data.url);
    } catch (err: any) {
      setError(err.message || "Failed to upload image");
    } finally {
      setIsUploading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleUpload(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) handleUpload(file);
  };

  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-xs font-mono font-bold text-accent-purple uppercase tracking-wider">
          {label}
        </label>
      )}

      <div className="flex flex-col sm:flex-row gap-4 items-start">
        {/* Preview Frame */}
        {value ? (
          <div className="relative group shrink-0">
            <div
              className={`relative ${aspectClasses} w-full rounded-2xl overflow-hidden border border-white/20 bg-[#050714] shadow-lg`}
            >
              <Image
                src={value}
                alt="Preview"
                fill
                sizes="(max-width: 768px) 100vw, 280px"
                className="object-cover"
              />
            </div>
            <button
              type="button"
              onClick={() => onChange("")}
              className="absolute -top-2 -right-2 p-1.5 rounded-full bg-rose-500 text-white hover:bg-rose-600 shadow-md transition-all group-hover:scale-110"
              title="Remove image"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        ) : (
          <div
            onClick={() => fileInputRef.current?.click()}
            onDragOver={(e) => {
              e.preventDefault();
              setDragOver(true);
            }}
            onDragLeave={() => setDragOver(false)}
            onDrop={handleDrop}
            className={`relative ${aspectClasses} w-full rounded-2xl border-2 border-dashed flex flex-col items-center justify-center p-4 text-center cursor-pointer transition-all ${
              dragOver
                ? "border-accent-cyan bg-accent-cyan/10"
                : "border-white/15 bg-[#050714] hover:border-accent-purple/50 hover:bg-[#070A1A]"
            }`}
          >
            {isUploading ? (
              <div className="flex flex-col items-center gap-2">
                <Loader2 className="w-6 h-6 text-accent-cyan animate-spin" />
                <span className="text-[10px] font-mono text-text-secondary">Uploading...</span>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-2 text-text-secondary">
                <UploadCloud className="w-7 h-7 text-accent-purple" />
                <span className="text-xs font-medium text-white">Click or Drag & Drop</span>
                <span className="text-[10px] font-mono text-text-secondary">
                  PNG, JPG, WebP (Max 10MB)
                </span>
              </div>
            )}
          </div>
        )}

        {/* URL Input & Controls */}
        <div className="flex-1 w-full space-y-2">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/png, image/jpeg, image/webp, image/gif, image/svg+xml"
            className="hidden"
          />

          <div className="flex items-center gap-2">
            <input
              type="text"
              value={value}
              onChange={(e) => onChange(e.target.value)}
              placeholder={placeholder}
              className="flex-1 bg-[#050714] border border-white/15 rounded-2xl px-4 py-2.5 text-xs text-white placeholder-text-secondary focus:outline-none focus:border-accent-purple transition-all font-mono"
            />
            <Button
              type="button"
              variant="secondary"
              size="sm"
              onClick={() => fileInputRef.current?.click()}
              disabled={isUploading}
              className="text-xs shrink-0"
            >
              <UploadCloud className="w-3.5 h-3.5 mr-1 text-accent-cyan" />
              {isUploading ? "Uploading..." : "Browse"}
            </Button>
          </div>

          {error && (
            <p className="text-[11px] text-rose-400 font-mono flex items-center gap-1">
              <X className="w-3 h-3" /> {error}
            </p>
          )}

          {value && (
            <p className="text-[10px] text-emerald-400 font-mono flex items-center gap-1">
              <Check className="w-3 h-3" /> Image linked & ready
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
