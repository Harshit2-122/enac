import { useState, useRef } from "react";
import { ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage";
import { getStorageSafe } from "@/lib/firebase";
import { Upload, Loader2, X } from "lucide-react";

interface PhotoUploadProps {
  value: string;
  onChange: (url: string) => void;
  folder: string;
  label?: string;
}

export function PhotoUpload({ value, onChange, folder, label = "Photo" }: PhotoUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = async (file: File) => {
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      alert("Please select an image file (JPG, PNG, WebP, etc.)");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      alert("Image must be smaller than 5 MB.");
      return;
    }

    setUploading(true);
    setProgress(10);
    try {
      const ext = file.name.split(".").pop() ?? "jpg";
      const filename = `${folder}/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
      const ref = storageRef(getStorageSafe(), filename);
      setProgress(40);
      await uploadBytes(ref, file);
      setProgress(80);
      const url = await getDownloadURL(ref);
      setProgress(100);
      onChange(url);
    } catch (err: unknown) {
      console.error("Photo upload error:", err);
      alert(
        "Photo upload failed. Make sure Firebase Storage is enabled and the storage rules allow admin uploads.\n\n" +
          ((err as { message?: string })?.message ?? "Unknown error")
      );
    } finally {
      setUploading(false);
      setProgress(0);
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
              Uploading {progress}%
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
          value={value}
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
      <p className="mt-1 text-[10.5px] text-muted-foreground">Max 5 MB. JPG, PNG, or WebP recommended.</p>
    </div>
  );
}
