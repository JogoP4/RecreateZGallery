import React, { useState } from 'react';
import { FolderGallery } from './components/FolderGallery';
import { ImageGallery } from './components/ImageGallery';

interface Folder {
  id: string;
  name: string;
  count: number;
  thumbnail: string;
}

export default function App() {
  const [selectedFolder, setSelectedFolder] = useState<Folder | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-900 to-black">
      {selectedFolder ? (
        <ImageGallery 
          folder={selectedFolder} 
          onBack={() => setSelectedFolder(null)} 
        />
      ) : (
        <FolderGallery onFolderSelect={setSelectedFolder} />
      )}
    </div>
  );
}