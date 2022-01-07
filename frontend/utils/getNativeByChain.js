const chains = {
  "0x1": "ETH",
  "0x89": "MATIC",
  "0x38": "BNB",
  "0xa86a": "AVAX",
  "0xa869": "FUJI",
};

export const getNativeByChain = (chain) => chains[chain];

