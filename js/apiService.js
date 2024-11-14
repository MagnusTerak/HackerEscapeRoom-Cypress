const BASE_URL = 'https://lernia-sjj-assignments.vercel.app/api';

export const fetchAllChallenges = async () => {
  try {
    const res = await fetch(`${BASE_URL}/challenges`);
    const { challenges } = await res.json();
    console.log('challengs:', challenges);
    console.log(typeof challenges);
    return challenges ?? [];
  } catch (error) {
    console.error('Error in feching challenges', error);
    return [];
  }
};

export const fetchAvailableTimes = async (challengeId, date) => {
  try {
    const res = await fetch(
      `${BASE_URL}/booking/available-times?date=${date}&challenge=${challengeId}`
);
console.log('challengeId:', typeof(challengeId), 'dateType:' , typeof(date))

if (!res.ok) {
    const errorText = await res.text(); 
    console.error('Error response:', errorText);
    throw new Error(`HTTP error! status: ${res.status}`);
  }
    const { slots } = await res.json();
    console.log('available slots:',slots);
    return slots ?? [];
  } catch (error) {
    console.error('Error fetching available times:', error);
    return [];
  }
};
