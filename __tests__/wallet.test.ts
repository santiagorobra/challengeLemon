import { validateAddress } from 'utils/wallet';

describe('validateAddress', () => {
  it('accepts a valid lowercase Ethereum address', () => {
    expect(
      validateAddress('0xcd529b4a67f25aa2ffb98148ebca59865e9a94fe'),
    ).toBe(true);
  });

  it('accepts a valid mixed-case Ethereum address', () => {
    expect(
      validateAddress('0xdbF03B407c01E7cD3CBea99509d93f8DDDC8C6FB'),
    ).toBe(true);
  });

  it('accepts an Ethereum address with leading/trailing spaces', () => {
    expect(
      validateAddress('  0xcd529b4a67f25aa2ffb98148ebca59865e9a94fe  '),
    ).toBe(true);
  });

  it('rejects an Ethereum address without 0x prefix', () => {
    expect(
      validateAddress('cd529b4a67f25aa2ffb98148ebca59865e9a94fe'),
    ).toBe(false);
  });

  it('rejects an Ethereum address with invalid hex character', () => {
    expect(
      validateAddress('0xcd529b4a67f25aa2ffb98148ebca59865e9a94fg'), // "g" no es hex
    ).toBe(false);
  });

  it('rejects an Ethereum address with wrong length (39 hex chars)', () => {
    expect(
      validateAddress('0x' + 'a'.repeat(39)),
    ).toBe(false);
  });

  it('rejects an Ethereum address with wrong length (41 hex chars)', () => {
    expect(
      validateAddress('0x' + 'a'.repeat(41)),
    ).toBe(false);
  });

  it('accepts a valid legacy Bitcoin P2PKH (1...)', () => {
    expect(
      validateAddress('19UGxQ9tQHRXr8HPBbtgesF6Lj57JAq9si'),
    ).toBe(true);
  });

  it('accepts a valid legacy Bitcoin P2SH (3...)', () => {
    expect(
      validateAddress('3J98t1WpEZ73CNmQviecrnyiWrnqRhWNLy'),
    ).toBe(true);
  });

  it('accepts a valid Bitcoin address with "bitcoin:" prefix', () => {
    expect(
      validateAddress('bitcoin:19UGxQ9tQHRXr8HPBbtgesF6Lj57JAq9si'),
    ).toBe(true);
  });

  it('rejects Bitcoin address with forbidden Base58 chars (O, I, l, 0)', () => {
    expect(
      validateAddress('1O0Il11111111111111111111111111111'),
    ).toBe(false);
  });

  it('rejects too short Bitcoin address', () => {
    expect(
      validateAddress('1ABC'),
    ).toBe(false);
  });

  it('rejects empty string', () => {
    expect(validateAddress('')).toBe(false);
  });

  it('rejects random string', () => {
    expect(validateAddress('not-an-address')).toBe(false);
  });
});
