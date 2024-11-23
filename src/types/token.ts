export interface TokenMetadata {
  name: string;
  symbol: string;
  description: string;
  image: string;
  decimals: number;
  initialSupply: number;
}

export interface ValidationError {
  field: string;
  message: string;
}

export interface TokenConfig {
  metadata: TokenMetadata;
  errors: ValidationError[];
}