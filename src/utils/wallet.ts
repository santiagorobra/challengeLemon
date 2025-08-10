// EXAMPLES ADDRESSES
// 0xcd529b4a67f25aa2ffb98148ebca59865e9a94fe
// 0xdbF03B407c01E7cD3CBea99509d93f8DDDC8C6FB

const isEthereumAddress = (address: string): boolean => {
  return /^0x[a-fA-F0-9]{40}$/.test(address.trim());
};

const isBitcoinAddress = (address: string): boolean => {
  return /^(?:bitcoin:)?[13][a-km-zA-HJ-NP-Z1-9]{25,34}$/.test(address.trim());
};

export const validateAddress = (rawAddress: string): boolean => {
  const address = rawAddress.includes(':')
    ? rawAddress.split(':')[1]
    : rawAddress;

  return isEthereumAddress(address) || isBitcoinAddress(rawAddress);
};
