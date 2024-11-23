import React, { useState } from 'react';
import { TokenMetadata, ValidationError } from '../types/token';
import { Download, Upload } from 'lucide-react';
import { useWallet } from '@solana/wallet-adapter-react';
import toast from 'react-hot-toast';

interface TokenFormProps {
  onSubmit: (metadata: TokenMetadata) => void;
  onDownload: () => void;
}

export default function TokenForm({ onSubmit, onDownload }: TokenFormProps) {
  const { publicKey } = useWallet();
  const [formData, setFormData] = useState<TokenMetadata>({
    name: '',
    symbol: '',
    description: '',
    image: '',
    decimals: 9,
    initialSupply: 1000000
  });

  const [errors, setErrors] = useState<ValidationError[]>([]);

  const validateForm = (): boolean => {
    const newErrors: ValidationError[] = [];

    if (!formData.name) {
      newErrors.push({ field: 'name', message: 'Token name is required' });
    }

    if (!formData.symbol) {
      newErrors.push({ field: 'symbol', message: 'Token symbol is required' });
    } else if (formData.symbol.length > 10) {
      newErrors.push({ field: 'symbol', message: 'Symbol must be 10 characters or less' });
    }

    if (formData.decimals < 0 || formData.decimals > 9) {
      newErrors.push({ field: 'decimals', message: 'Decimals must be between 0 and 9' });
    }

    if (formData.initialSupply <= 0) {
      newErrors.push({ field: 'initialSupply', message: 'Initial supply must be greater than 0' });
    }

    setErrors(newErrors);
    return newErrors.length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    onSubmit(formData);
  };

  const handleDownloadMetadata = () => {
    const metadata = {
      name: formData.name,
      symbol: formData.symbol,
      description: formData.description,
      image: formData.image,
      decimals: formData.decimals,
      initialSupply: formData.initialSupply,
      properties: {
        files: [],
        category: 'token',
        creators: []
      }
    };

    const blob = new Blob([JSON.stringify(metadata, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${formData.symbol.toLowerCase()}_metadata.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'decimals' || name === 'initialSupply' ? Number(value) : value
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-green-700">Token Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="input-field"
            placeholder="My Token"
          />
          {errors.find(e => e.field === 'name') && (
            <p className="mt-1 text-sm text-red-600">{errors.find(e => e.field === 'name')?.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-green-700">Symbol</label>
          <input
            type="text"
            name="symbol"
            value={formData.symbol}
            onChange={handleChange}
            className="input-field"
            placeholder="MTK"
          />
          {errors.find(e => e.field === 'symbol') && (
            <p className="mt-1 text-sm text-red-600">{errors.find(e => e.field === 'symbol')?.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={3}
            className="input-field"
            placeholder="Describe your token..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Image URL</label>
          <input
            type="url"
            name="image"
            value={formData.image}
            onChange={handleChange}
            className="input-field"
            placeholder="https://example.com/token-image.png"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Decimals</label>
            <input
              type="number"
              name="decimals"
              value={formData.decimals}
              onChange={handleChange}
              min="0"
              max="9"
              className="input-field"
            />
            {errors.find(e => e.field === 'decimals') && (
              <p className="mt-1 text-sm text-red-600">{errors.find(e => e.field === 'decimals')?.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Initial Supply</label>
            <input
              type="number"
              name="initialSupply"
              value={formData.initialSupply}
              onChange={handleChange}
              min="1"
              className="input-field"
            />
            {errors.find(e => e.field === 'initialSupply') && (
              <p className="mt-1 text-sm text-red-600">{errors.find(e => e.field === 'initialSupply')?.message}</p>
            )}
          </div>
        </div>
      </div>

      <div className="flex justify-end space-x-4">
        <button
          type="button"
          onClick={handleDownloadMetadata}
          className="btn-secondary"
        >
          <Download className="h-4 w-4 mr-2" />
          Download Metadata
        </button>
        <button
          type="submit"
          className="btn-primary"
        >
          <Upload className="h-4 w-4 mr-2" />
          Create Token
        </button>
      </div>
    </form>
  );
}