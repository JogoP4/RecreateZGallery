import React, { useState } from 'react';
import { ArrowLeft, Search, GridIcon, List, MoreVertical } from 'lucide-react';
import { ImageCard } from './ImageCard';

interface Folder {
  id: string;
  name: string;
  count: number;
  thumbnail: string;
}

interface ImageGalleryProps {
  folder: Folder;
  onBack: () => void;
}

// Mock images for each folder
const folderImages: { [key: string]: string[] } = {
  '1': [ // WhatsApp Images
    'https://images.unsplash.com/photo-1685893182655-92ca66d16475?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzY3JlZW5zaG90JTIwZG9jdW1lbnR8ZW58MXx8fHwxNzYzODUzODEwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    'https://images.unsplash.com/photo-1590097520505-416422f07ad1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMHByZXNlbnRhdGlvbiUyMHNsaWRlfGVufDF8fHx8MTc2Mzg1MzgxMXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    'https://images.unsplash.com/photo-1762320386346-8a16970845e1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxxciUyMGNvZGUlMjBwb3N0ZXJ8ZW58MXx8fHwxNzYzODUzODExfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    'https://images.unsplash.com/photo-1587573089734-09cb69c0f2b4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYW1lJTIwc2NyZWVuc2hvdCUyMG1vYmlsZXxlbnwxfHx8fDE3NjM4NTM4MTF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    'https://images.unsplash.com/photo-1617049037028-d4746ed5e6bc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmZvZ3JhcGhpYyUyMGRlc2lnbnxlbnwxfHx8fDE3NjM3NDIzMTR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    'https://images.unsplash.com/photo-1735467547583-d9fc4503f238?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYWxjdWxhdG9yJTIwYXBwJTIwc2NyZWVufGVufDF8fHx8MTc2Mzg1MzgxMnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    'https://images.unsplash.com/photo-1725798451557-fc60db3eb6a2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGF0JTIwY29udmVyc2F0aW9uJTIwc2NyZWVuc2hvdHxlbnwxfHx8fDE3NjM4NTM4MTJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    'https://images.unsplash.com/photo-1748609160056-7b95f30041f0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGFydCUyMGFuYWx5dGljcyUyMGRhc2hib2FyZHxlbnwxfHx8fDE3NjM4NTM4MTN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    'https://images.unsplash.com/photo-1707836868495-3307d371aba4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWJzaXRlJTIwbW9ja3VwJTIwZGVzaWdufGVufDF8fHx8MTc2MzgyMzA2NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    'https://images.unsplash.com/photo-1645109870868-e1b6f909e444?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2JpbGUlMjBnYW1lJTIwaW50ZXJmYWNlfGVufDF8fHx8MTc2MzgwMzA2NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    'https://images.unsplash.com/photo-1759661966728-4a02e3c6ed91?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXRhJTIwdmlzdWFsaXphdGlvbiUyMGdyYXBofGVufDF8fHx8MTc2Mzg0NTA0MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    'https://images.unsplash.com/photo-1590098563686-06ab8778a6a7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcmVzZW50YXRpb24lMjBzbGlkZSUyMGJ1c2luZXNzfGVufDF8fHx8MTc2Mzg1MzgxNHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  ]
};

// Use default images for folders without specific images
const getImagesForFolder = (folderId: string): string[] => {
  return folderImages[folderId] || folderImages['1'];
};

export function ImageGallery({ folder, onBack }: ImageGalleryProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const images = getImagesForFolder(folder.id);

  return (
    <div className="min-h-screen pb-6">
      {/* Top Bar with Search */}
      <div className="sticky top-0 z-10 px-4 pt-4 pb-3">
        <div className="bg-[#3e3028] rounded-full flex items-center gap-3 px-3 py-3 shadow-lg">
          <button 
            onClick={onBack}
            className="text-zinc-300 hover:text-white transition-colors flex-shrink-0"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          
          <input
            type="text"
            placeholder={`Buscar en ${folder.name}...`}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-transparent text-zinc-300 placeholder:text-zinc-500 flex-1 outline-none"
          />
          
          <div className="flex items-center gap-3 ml-auto">
            <button className="text-zinc-300 hover:text-white transition-colors">
              <GridIcon className="w-5 h-5" />
            </button>
            <button className="text-zinc-300 hover:text-white transition-colors">
              <List className="w-5 h-5" />
            </button>
            <button className="text-zinc-300 hover:text-white transition-colors">
              <MoreVertical className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Image Grid */}
      <div className="grid grid-cols-3 gap-0.5 px-0.5 mt-2">
        {images.map((image, index) => (
          <ImageCard key={index} imageUrl={image} index={index} />
        ))}
      </div>
    </div>
  );
}