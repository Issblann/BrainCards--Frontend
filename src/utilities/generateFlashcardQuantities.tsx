interface FlashcardQuantity {
  number: number;
}

export const generateFlashcardQuantities = (
  min: number,
  max: number
): number[] => {
  let quantityFlashcards: number[] = [];

  for (let i = min; i <= max; i++) {
    quantityFlashcards.push(i);
  }

  return quantityFlashcards;
};
