import { Connection, Keypair, Transaction, SystemProgram, PublicKey } from '@solana/web3.js';
import * as borsh from 'borsh';

export class TokenData {
  name: string;
  symbol: string;
  decimals: number;
  initialSupply: number;

  constructor(fields: {
    name: string;
    symbol: string;
    decimals: number;
    initialSupply: number;
  }) {
    this.name = fields.name;
    this.symbol = fields.symbol;
    this.decimals = fields.decimals;
    this.initialSupply = fields.initialSupply;
  }
}

const schema = new Map([
  [
    TokenData,
    {
      kind: 'struct',
      fields: [
        ['name', 'string'],
        ['symbol', 'string'],
        ['decimals', 'u8'],
        ['initialSupply', 'u64'],
      ],
    },
  ],
]);

export const SOLANA_NETWORK = 'https://api.devnet.solana.com';

export async function createTokenTransaction(
  tokenData: TokenData,
  wallet: PublicKey
): Promise<{ transaction: Transaction; newTokenAccount: PublicKey }> {
  const connection = new Connection(SOLANA_NETWORK, 'confirmed');
  const newTokenAccount = Keypair.generate();
  
  // Serialize the token data
  const serializedData = borsh.serialize(schema, tokenData);
  
  // Create a transaction
  const transaction = new Transaction().add(
    SystemProgram.createAccount({
      fromPubkey: wallet,
      newAccountPubkey: newTokenAccount.publicKey,
      lamports: await connection.getMinimumBalanceForRentExemption(serializedData.length),
      space: serializedData.length,
      programId: SystemProgram.programId,
    })
  );

  return {
    transaction,
    newTokenAccount: newTokenAccount.publicKey,
  };
}