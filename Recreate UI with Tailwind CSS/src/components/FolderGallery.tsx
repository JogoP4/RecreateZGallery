import React, { useState } from 'react';
import { Search, Camera, Image as ImageIcon, MoreVertical } from 'lucide-react';
import { FolderCard } from './FolderCard';

interface Folder {
  id: string;
  name: string;
  count: number;
  thumbnail: string;
}

interface FolderGalleryProps {
  onFolderSelect: (folder: Folder) => void;
}

const folders: Folder[] = [
  {
    id: '1',
    name: 'WhatsApp Images',
    count: 397,
    thumbnail: 'https://images.unsplash.com/photo-1729487151777-b4be9098ecbb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjbG90aGluZyUyMHN0b3JlJTIwaW50ZXJpb3J8ZW58MXx8fHwxNzYzNzk2NzA2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
  },
  {
    id: '2',
    name: 'Camera',
    count: 1245,
    thumbnail: 'https://images.unsplash.com/photo-1656321717360-be568acc171b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1bml2ZXJzaXR5JTIwY2FtcHVzJTIwYmx1ZXxlbnwxfHx8fDE3NjM4NTM1NDJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
  },
  {
    id: '3',
    name: 'Pictures',
    count: 5,
    thumbnail: 'https://images.unsplash.com/photo-1753715613388-7e03410b1dce?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvcmdhbml6YXRpb25hbCUyMGNoYXJ0JTIwZGlhZ3JhbXxlbnwxfHx8fDE3NjM4NTM1NDJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
  },
  {
    id: '4',
    name: 'WhatsApp Video',
    count: 40,
    thumbnail: 'https://images.unsplash.com/photo-1732270912159-f392146292ce?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aWRlbyUyMGJsdXIlMjBhYnN0cmFjdHxlbnwxfHx8fDE3NjM4NTM1NDJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
  },
  {
    id: '5',
    name: 'Instagram',
    count: 2,
    thumbnail: 'https://images.unsplash.com/photo-1763244734635-72b34a167bd5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3ZpZSUyMHBvc3RlciUyMGNpbmVtYXxlbnwxfHx8fDE3NjM4NTM1NDN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
  },
  {
    id: '6',
    name: 'WhatsApp',
    count: 9,
    thumbnail: 'https://images.unsplash.com/photo-1697382608813-df6eb720164f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkb2N1bWVudHMlMjBwYXBlcnN8ZW58MXx8fHwxNzYzODIzODg3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
  },
  {
    id: '7',
    name: 'WhatsApp Animated Gifs',
    count: 4,
    thumbnail: 'https://images.unsplash.com/photo-1614713534584-5e6270470346?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbmltYXRlZCUyMGNhdCUyMGdpZnxlbnwxfHx8fDE3NjM4NTM1NDR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
  },
  {
    id: '8',
    name: 'Twitter',
    count: 11,
    thumbnail: 'https://images.unsplash.com/photo-1616509091334-2be806ea7a3b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0d2l0dGVyJTIwc29jaWFsJTIwbWVkaWF8ZW58MXx8fHwxNzYzNzk0MDIyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
  }
];

export function FolderGallery({ onFolderSelect }: FolderGalleryProps) {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="min-h-screen pb-6">
      {/* Search Bar */}
      <div className="sticky top-0 z-10 px-4 pt-4 pb-3">
        <div className="bg-[#3e3028] rounded-full flex items-center gap-3 px-4 py-3 shadow-lg">
          <Search className="text-zinc-400 w-5 h-5 flex-shrink-0" />
          <input
            type="text"
            placeholder="Buscar las carpe..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-transparent text-zinc-300 placeholder:text-zinc-500 flex-1 outline-none"
          />
          <div className="flex items-center gap-3 ml-auto">
            <button className="text-zinc-300 hover:text-white transition-colors">
              <Camera className="w-5 h-5" />
            </button>
            <button className="text-zinc-300 hover:text-white transition-colors">
              <ImageIcon className="w-5 h-5" />
            </button>
            <button className="text-zinc-300 hover:text-white transition-colors">
              <MoreVertical className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Folder Grid */}
      <div className="grid grid-cols-2 gap-0.5 px-0.5 mt-2">
        {folders.map((folder) => (
          <FolderCard 
            key={folder.id} 
            folder={folder} 
            onClick={() => onFolderSelect(folder)}
          />
        ))}
      </div>
    </div>
  );
}