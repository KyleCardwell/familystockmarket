export const generateRandomNumber = () => Math.floor(Math.random() * 4) + 3;

export const generateTwoDistinctRandomNumbers = () => {
  // Create an array with numbers 1 to 6
  const numbers = [1, 2, 3, 4, 5, 6];

  // Shuffle the array using the Fisher-Yates algorithm
  for (let i = numbers.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
  }

  // Return the first two elements of the shuffled array
  return [numbers[0], numbers[1]];
}