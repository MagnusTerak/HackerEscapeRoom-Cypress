const BASE_URL = 'https://lernia-sjj-assignments.vercel.app/api';
console.log('hello from apiTest')
export const fetchAllChallenges= async()=>{
    try{
        const res = await fetch(`${BASE_URL}/challenges`);
        const {challenges}= await res.json();
        console.log(challenges);
        console.log(typeof(challenges));
        return challenges?? [];

    }catch(error){
console.error("Error in feching challenges", error);
    }
}