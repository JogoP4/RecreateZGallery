import React from 'react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface ImageCardProps {
  imageUrl: string;
  index: number;
}

export function ImageCard({ imageUrl, index }: ImageCardProps) {
  return (
    <button className="relative aspect-square overflow-hidden group cursor-pointer bg-zinc-800">
      {/* Image */}
      <ImageWithFallback
        src={imageUrl}
        alt={`Image ${index + 1}`}
        className="w-full h-full object-cover"
      />
      
      {/* Hover Effect */}
      <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-colors" />
    </button>
  );
}