import React from 'react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface Folder {
  id: string;
  name: string;
  count: number;
  thumbnail: string;
}

interface FolderCardProps {
  folder: Folder;
  onClick: () => void;
}

export function FolderCard({ folder, onClick }: FolderCardProps) {
  return (
    <button 
      className="relative aspect-square overflow-hidden group cursor-pointer"
      onClick={onClick}
    >
      {/* Thumbnail Image */}
      <ImageWithFallback
        src={folder.thumbnail}
        alt={folder.name}
        className="w-full h-full object-cover"
      />
      
      {/* Overlay Gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
      
      {/* Folder Info */}
      <div className="absolute bottom-0 left-0 right-0 p-3 text-left">
        <div className="text-white">{folder.name}</div>
        <div className="text-zinc-300 text-sm mt-0.5">{folder.count}</div>
      </div>
      
      {/* Hover Effect */}
      <div className="absolute inset-0 bg-white/0 group-hover:bg-white/5 transition-colors" />
    </button>
  );
}