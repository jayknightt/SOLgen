import React, { useState, useEffect } from 'react';
import { Bell } from 'lucide-react';

export default function NotificationBell() {
  const [showBadge, setShowBadge] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setShowBadge(true);
    }, 5000); // Changed to 5 seconds

    return () => clearInterval(interval);
  }, []);

  const handleClick = () => {
    window.open('https://buy.stripe.com/eVadR58089o4atO3cd', '_blank');
    setShowBadge(false);
  };

  return (
    <button
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative p-2 text-gray-600 hover:text-gray-900 transition-colors"
    >
      <Bell className="w-6 h-6" />
      {showBadge && (
        <>
          <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full animate-pulse-slow" />
          {isHovered && (
            <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-lg shadow-lg p-3 text-sm text-gray-900 animate-slide-up z-50 border border-gray-100">
              <p className="font-medium">Create Unlimited Tokens!</p>
              <p className="text-xs text-gray-500 mt-1">Click to unlock premium features</p>
            </div>
          )}
        </>
      )}
    </button>
  );
}