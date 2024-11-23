import React from 'react';
import { X } from 'lucide-react';

interface SubscriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  source: 'download' | 'create';
}

export default function SubscriptionModal({ isOpen, onClose, source }: SubscriptionModalProps) {
  if (!isOpen) return null;

  const handleSubscribe = () => {
    window.open('https://buy.stripe.com/eVadR58089o4atO3cd', '_blank');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 relative">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
        >
          <X className="w-6 h-6" />
        </button>
        
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Unlock Unlimited Token Creation
          </h2>
          
          <p className="text-gray-600 mb-6">
            Take your token creation journey to the next level with Easy Token Premium
          </p>
          
          <ul className="text-left space-y-4 mb-6">
            <li className="flex items-center">
              <span className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mr-3">
                <span className="text-green-600">✓</span>
              </span>
              <span>Unlimited token generation</span>
            </li>
            <li className="flex items-center">
              <span className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mr-3">
                <span className="text-green-600">✓</span>
              </span>
              <span>Real-time trending SOL token insights</span>
            </li>
            <li className="flex items-center">
              <span className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mr-3">
                <span className="text-green-600">✓</span>
              </span>
              <span>Priority support and updates</span>
            </li>
          </ul>
          
          <button
            onClick={handleSubscribe}
            className="w-full py-3 px-4 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors"
          >
            Subscribe Now
          </button>
          
          <p className="mt-4 text-sm text-gray-500">
            Join thousands of creators who trust Easy Token
          </p>
        </div>
      </div>
    </div>
  );
}