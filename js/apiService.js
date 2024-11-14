const BASE_URL = 'https://lernia-sjj-assignments.vercel.app/api';

// Helper function to validate date format (YYYY-MM-DD)
const isValidDate = (date) => /^\d{4}-\d{2}-\d{2}$/.test(date);

// Helper function to validate time format (HH:mm)
const isValidTime = (time) => /^\d{2}:\d{2}$/.test(time);


//API Services:

const fetchApi = async (url, requestOptions = {}) => {
    try {
      const res = await fetch(url, requestOptions);
  
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

export const createReservation = async ({ challengeId, name, email, date, time, participants }) => {
    
    console.log('Type of ID:', challengeId, 'type of name:', name , 'type of email:', typeof(date), 'type of date:',typeof(date), 'type of time:',typeof(time),'type of participants:', typeof(participants))
    if (typeof challengeId !== 'number' || typeof name !== 'string' || typeof email !== 'string' || typeof date !== 'string' || typeof time !== 'string' || typeof participants !== 'number') {
        console.log('Invalid parameter/s');
        return null;
      }  
      if (typeof date !== 'string' || !isValidDate(date)) {
        console.log("Invalid 'date': Must be a string in YYYY-MM-DD format.");
        return null;
    }
    if (typeof time !== 'string' || !isValidTime(time)) {
        console.log("Invalid 'time': Must be a string in HH:mm format.");
        return null;
    }
    
    try {
      const data = await fetchApi(`${BASE_URL}/booking/reservations`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          challenge: challengeId,
          name,
          email,
          date,
          time,
          participants
        })
      });
  
      if (data?.status === 'ok') {
          console.log(data)
        return data.booking; 
      } else {
        throw new Error("Reservation failed");
      }
    } catch (error) {
      console.log("Error in creating reservation:", error);
      return null; 
    }
  };