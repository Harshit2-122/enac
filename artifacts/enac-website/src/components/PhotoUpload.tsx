import { useState, useRef } from "react";
import { Upload, Loader2, X } from "lucide-react";

interface PhotoUploadProps {
  value: string;
  onChange: (url: string) => void;
  folder?: string;
  label?: string;
}

async function compressImage(file: File, maxSize = 600, quality = 0.78): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const img = new Image();
      img.onload = () => {
        let { width, height } = img;
        if (width > height && width > maxSize) {
          height = Math.round((height * maxSize) / width);
          width = maxSize;
        } else if (height > maxSize) {
          width = Math.round((width * maxSize) / height);
          height = maxSize;
        }
        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        if (!ctx) {
          reject(new Error("Canvas not supported"));
          return;
        }
        ctx.drawImage(img, 0, 0, width, height);
        const dataUrl = canvas.toDataURL("image/jpeg", quality);
        resolve(dataUrl);
      };
      img.onerror = () => reject(new Error("Could not load image"));
      img.src = reader.result as string;
    };
    reader.onerror = () => reject(new Error("Could not read file"));
    reader.readAsDataURL(file);
  });
}

export function PhotoUpload({ value, onChange, label = "Photo" }: PhotoUploadProps) {
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = async (file: File) => {
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      alert("Please select an image file (JPG, PNG, WebP, etc.)");
      return;
    }
    if (file.size > 8 * 1024 * 1024) {
      alert("Original image too large. Please choose one under 8 MB.");
      return;
    }

    setUploading(true);
    try {
      let dataUrl = await compressImage(file, 600, 0.78);
      if (dataUrl.length > 700_000) {
        dataUrl = await compressImage(file, 480, 0.7);
      }
      if (dataUrl.length > 700_000) {
        dataUrl = await compressImage(file, 360, 0.6);
      }
      onChange(dataUrl);
    } catch (err: unknown) {
      console.error("Photo processing error:", err);
      alert("Could not process image. " + ((err as { message?: string })?.message ?? ""));
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  return (
    <div>
      <label className="block text-xs font-semibold text-muted-foreground mb-1.5">{label}</label>

      {value && (
        <div className="mb-2 flex items-center gap-3">
          <img
            src={value}
            alt="Preview"
            className="w-16 h-16 rounded-lg object-cover border border-border"
            onError={(e) => {
              (e.target as HTMLImageElement).style.opacity = "0.3";
            }}
          />
          <button
            type="button"
            onClick={() => onChange("")}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-muted hover:bg-muted/70 text-xs text-muted-foreground"
          >
            <X className="w-3.5 h-3.5" />
            Remove
          </button>
        </div>
      )}

      <div className="flex flex-col gap-2 sm:flex-row">
        <button
          type="button"
          disabled={uploading}
          onClick={() => fileInputRef.current?.click()}
          className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border-2 border-dashed border-primary/40 bg-primary/5 hover:bg-primary/10 text-primary text-sm font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed sm:w-44"
        >
          {uploading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Processing…
            </>
          ) : (
            <>
              <Upload className="w-4 h-4" />
              {value ? "Replace photo" : "Upload photo"}
            </>
          )}
        </button>

        <input
          type="url"
          placeholder="…or paste an image URL"
          value={value.startsWith("data:") ? "" : value}
          onChange={(e) => onChange(e.target.value)}
          className="flex-1 px-3 py-2.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
        />
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleFile(file);
        }}
      />
      <p className="mt-1 text-[10.5px] text-muted-foreground">
        Photos are auto-resized and saved with the member. Max 8 MB original.
      </p>
    </div>
  );
}
