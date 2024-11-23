import React from 'react';
import { TokenMetadata } from '../types/token';
import { Coins } from 'lucide-react';

interface PreviewCardProps {
  metadata: TokenMetadata;
}

export default function PreviewCard({ metadata }: PreviewCardProps) {
  return (
    <div className="card">
      <div className="flex items-center space-x-4 mb-6">
        {metadata.image ? (
          <img 
            src={metadata.image} 
            alt={metadata.name} 
            className="w-16 h-16 rounded-full object-cover border-2 border-green-100"
          />
        ) : (
          <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center border-2 border-green-100">
            <Coins className="w-8 h-8 text-green-600" />
          </div>
        )}
        <div>
          <h3 className="text-xl font-semibold text-gray-900">{metadata.name}</h3>
          <p className="text-sm font-medium text-green-600">{metadata.symbol}</p>
        </div>
      </div>

      <div className="space-y-6">
        <div>
          <h4 className="text-sm font-medium text-gray-500 mb-2">Description</h4>
          <p className="text-sm text-gray-700 leading-relaxed">
            {metadata.description || 'No description provided'}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="text-sm font-medium text-gray-500 mb-1">Decimals</h4>
            <p className="text-lg font-semibold text-gray-900">{metadata.decimals}</p>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="text-sm font-medium text-gray-500 mb-1">Initial Supply</h4>
            <p className="text-lg font-semibold text-gray-900">
              {metadata.initialSupply.toLocaleString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}