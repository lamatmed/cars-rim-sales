import { useState, useRef } from "react";
import { UploadButton } from "@uploadthing/react";
import type { OurFileRouter } from "@/app/api/uploadthing/core";
import Image from "next/image";
import { XCircle } from "lucide-react";
import { Button } from "./ui/button";
import { motion } from "framer-motion";

interface UploaderProps {
  onUpload: (url: string) => void;
}

export default function Uploader({ onUpload }: UploaderProps) {
  const [uploadedUrl, setUploadedUrl] = useState<string | null>(null);
  const uploadButtonRef = useRef<HTMLDivElement>(null);

  return (
    <div className="flex flex-col items-center w-full">
      {/* Conteneur principal avec effet de halo */}
      <motion.div 
        className="relative rounded-full p-1 bg-gradient-to-r from-purple-400 to-indigo-500 shadow-lg"
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        {/* Zone d'affichage de l'image */}
        <div className="relative w-32 h-32 rounded-full bg-white border-2 border-dashed border-indigo-200 flex items-center justify-center overflow-hidden">
          {uploadedUrl ? (
            <Image
              src={uploadedUrl}
              alt="Profile"
              width={128}
              height={128}
              className="w-full h-full object-cover"
              priority
            />
          ) : (
            <div className="flex flex-col items-center text-indigo-300">
              <div className="bg-indigo-100 rounded-full p-3 mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <span className="text-xs font-medium text-center px-4">Cliquez pour uploader</span>
            </div>
          )}
        </div>

        {/* Bouton de suppression */}
        {uploadedUrl && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-2 -right-2"
          >
            <Button
              onClick={() => setUploadedUrl(null)}
              className="p-1 bg-red-500 text-white rounded-full shadow-lg hover:bg-red-600"
              size="icon"
            >
              <XCircle className="w-5 h-5" />
            </Button>
          </motion.div>
        )}
      </motion.div>

      {/* Bouton d'upload caché mais fonctionnel */}
      <div ref={uploadButtonRef} className="mt-4 w-full">
        <UploadButton<OurFileRouter, "imageUploader">
          endpoint="imageUploader"
          onClientUploadComplete={(res) => {
            if (res?.[0]?.url) {
              setUploadedUrl(res[0].url);
              onUpload(res[0].url);
            }
          }}
          onUploadError={(error) => alert(`Erreur d'upload: ${error.message}`)}
          appearance={{
            button: "w-full bg-gradient-to-r from-purple-600 to-indigo-700 hover:from-purple-700 hover:to-indigo-800 text-white font-semibold py-3 rounded-xl transition-all shadow-lg",
            container: "w-full",
            allowedContent: "hidden"
          }}
        />
      </div>
    </div>
  );
}