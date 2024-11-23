import React, { useState, useMemo } from 'react';
import { TokenMetadata } from './types/token';
import TokenForm from './components/TokenForm';
import PreviewCard from './components/PreviewCard';
import WalletButton from './components/WalletButton';
import NotificationBell from './components/NotificationBell';
import SubscriptionModal from './components/SubscriptionModal';
import { Toaster, toast } from 'react-hot-toast';
import { Coins } from 'lucide-react';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { PhantomWalletAdapter } from '@solana/wallet-adapter-wallets';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import { SOLANA_NETWORK } from './utils/solana';

export default function App() {
  const [tokenMetadata, setTokenMetadata] = useState<TokenMetadata | null>(null);
  const [showSubscriptionModal, setShowSubscriptionModal] = useState(false);
  const [subscriptionSource, setSubscriptionSource] = useState<'download' | 'create'>('create');

  const wallets = useMemo(
    () => [new PhantomWalletAdapter()],
    []
  );

  const handleSubmit = (metadata: TokenMetadata) => {
    setSubscriptionSource('create');
    setShowSubscriptionModal(true);
  };

  const handleDownload = () => {
    setSubscriptionSource('download');
    setShowSubscriptionModal(true);
  };

  return (
    <ConnectionProvider endpoint={SOLANA_NETWORK}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
          <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
            <Toaster position="top-right" />
            
            <header className="bg-white shadow-sm">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
                <div className="flex items-center">
                  <Coins className="h-8 w-8 text-green-600" />
                  <h1 className="ml-2 text-xl font-bold text-gray-900">Easy Token</h1>
                </div>
                <div className="flex items-center space-x-4">
                  <NotificationBell />
                  <WalletButton />
                </div>
              </div>
            </header>
<main className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
  <div className="text-center mb-12">
    <h1 className="text-5xl font-extrabold text-blue-900 leading-tight">
      Create Your Token
    </h1>
    <p className="mt-4 text-lg text-gray-700">
      Design and launch your custom Solana token in just minutes.
    </p>
  </div>


              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-white rounded-2xl shadow-lg p-6">
                  <h2 className="text-2xl font-semibold text-blue-900 mb-6">Token Configuration</h2>
                  <TokenForm onSubmit={handleSubmit} onDownload={handleDownload} />
                </div>

                <div>
                  <h2 className="text-2xl font-semibold text-gray-900 mb-6">Preview</h2>
                  {tokenMetadata ? (
                    <PreviewCard metadata={tokenMetadata} />
                  ) : (
                    <div className="bg-white rounded-2xl shadow-lg p-6 text-center text-gray-500">
                      Configure your token to see the preview
                    </div>
                  )}
                </div>
              </div>
            </main>

            <SubscriptionModal
              isOpen={showSubscriptionModal}
              onClose={() => setShowSubscriptionModal(false)}
              source={subscriptionSource}
            />
          </div>
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}