import { getIsAdmin } from './getIsAdmin';

jest.mock('jwt-decode', () => jest.fn());

describe('utils/getIsAdmin', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });

  it('returns false if no token is present in localStorage', () => {
    const result = getIsAdmin();
    expect(result).toBe(false);
  });

  it('returns false if the token is invalid', () => {
    localStorage.setItem('token', 'invalid-token');

    const result = getIsAdmin();
    expect(result).toBe(false);
  });

  it('returns false if the decoded token does not have the "admin" role', () => {
    const mockToken = 'valid-token';
    localStorage.setItem('token', mockToken);

    const result = getIsAdmin();
    expect(result).toBe(false);
  });
});