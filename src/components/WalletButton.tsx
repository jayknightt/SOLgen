import React from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import '@solana/wallet-adapter-react-ui/styles.css';

export default function WalletButton() {
  const { wallet } = useWallet();

  return (
    <div className="flex items-center">
      <WalletMultiButton className="!bg-green-600 hover:!bg-green-700 !rounded-lg" />
      {wallet && (
        <span className="ml-2 text-sm text-gray-600">
          Connected: {wallet.adapter.name}
        </span>
      )}
    </div>
  );
}