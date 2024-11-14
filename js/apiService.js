const BASE_URL = 'https://lernia-sjj-assignments.vercel.app/api';

const fetchApi = async (url) => {
    try {
      const res = await fetch(url);
  
      if (!res.ok) {
        const errorText = await res.text();
        console.log(`Error response from ${url}:`, errorText);
        throw new Error(`HTTP error! status: ${res.status}`);
      }
  
      return await res.json();
    } catch (error) {
      console.log(`Error fetching data from ${url}:`, error);
      return null;
    }
  };

export const fetchAllChallenges = async () => {
    const {challenges}= await fetchApi(`${BASE_URL}/challenges`);
    console.log('challengs:', challenges);
    return challenges ?? [];

};

export const fetchAvailableTimes = async (challengeId, date) => {

    if (typeof challengeId !== 'number' || typeof date !== 'string') {
        console.log('Invalid parameters:', { challengeId, date });
        return [];
      }

    const { slots } = await fetchApi(
      `${BASE_URL}/booking/available-times?date=${date}&challenge=${challengeId}`
);
console.log('challengeId:', typeof(challengeId), 'dateType:' , typeof(date))
    console.log('available slots:',slots);
    return slots ?? [];

};

 