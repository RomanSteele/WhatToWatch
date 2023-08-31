import { formatTime, getRatingDescription, validateEmail, validatePassword,isAuthStatusUnknown } from './helpers';
import { fakeMovie, fakeRating, fakeEmail, fakePassword, fakeAuthStatus } from './utils/mocks';

const mockMovieObject = fakeMovie;

describe('Function: formatTime', () => {

  it('should correctly format time in hours and minutes', () => {
    const runTime = mockMovieObject.runTime;
    expect(formatTime(runTime))
      .toBe('2h 30m');
  });
});

    describe('Function: getRatingDescription',() => {

      const rating = fakeRating

  it('should return string with rating', () => {
    expect(getRatingDescription(rating[0])).toBe('Bad');
    expect(getRatingDescription(rating[1])).toBe('Normal');
    expect(getRatingDescription(rating[2])).toBe('Good');
    expect(getRatingDescription(rating[3])).toBe('Very good');
    expect(getRatingDescription(rating[4])).toBe('Awesome');
  });

  it('should return "Invalid rating" for values outside the valid range', () => {
    expect(getRatingDescription(rating[5])).toBe('Invalid rating');
    expect(getRatingDescription(rating[6])).toBe('Invalid rating');
  });
});

describe('Function: validateEmail', () => {
  it('should return true if email is validated', () => {
    const email = fakeEmail;
    expect(validateEmail(email[0])).toBe(true);
  });
  it('should return false if email is not validated', () => {
    const email = fakeEmail;
    expect(validateEmail(email[1])).toBe(false);
  });
});

describe('Function: validatePassword', () => {
  const password = fakePassword;

  it('should return true if password is validated', () => {
    expect(validatePassword(password[0])).toBe(true);
  });

  it('should return false if password is not validated', () => {
    expect(validatePassword(password[1])).toBe(false);
  });
});

describe('Function: isAuthStatusUnknown', () => {
  const authStatus = fakeAuthStatus;

  it('should return true if authorizationStatus is unknown', () => {
    expect(isAuthStatusUnknown(authStatus[0])).toBe(true);
  });

  it('should return false if authorizationStatus is auth or notauth', () => {
    expect(isAuthStatusUnknown(authStatus[1])).toBe(false);
    expect(isAuthStatusUnknown(authStatus[2])).toBe(false);
  });
});


