import { AuthorizationStatus } from "./const";

export function formatTime(minutes: number) {

  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;

  let formattedTime = '';

  if (hours > 0) {
    formattedTime += `${hours}h `;
  }

  if (remainingMinutes > 0) {
    formattedTime += `${remainingMinutes}m`;
  }

  return formattedTime.trim();
}


export function getRatingDescription(rating: number): string {
  return (
    rating >= 0 && rating <= 3 ? 'Bad' :
    rating >= 3 && rating <= 5 ? 'Normal' :
    rating >= 5 && rating <= 8 ? 'Good' :
    rating >= 8 && rating <= 10 ? 'Very good' :
    rating === 10 ? 'Awesome' :
    'Invalid rating'
  );
}

export const validateEmail = (email: string): boolean => {
  const emailPattern = /\S+@\S+\.\S+/;
  return email ? emailPattern.test(email) : false;
};

export const validatePassword = (password: string): boolean => {
  const passwordPattern = /^.*$/;
  return password ? passwordPattern.test(password) : false;
};

export const isAuthStatusUnknown = (authorizationStatus: string): boolean =>
  authorizationStatus === AuthorizationStatus.Unknown;
