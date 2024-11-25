export const getAnswers = async (_: string) => {
  try {
    return [
      {
        isCorrect: true,
        text: 'France ' + Date.now(),
      },
      {
        isCorrect: false,
        text: 'CDMX ' + Date.now(),
      },
    ];
  } catch (error) {
    console.error('error fetching answers');
    return null;
  }
};
