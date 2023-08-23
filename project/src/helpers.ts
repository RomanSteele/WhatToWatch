
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
