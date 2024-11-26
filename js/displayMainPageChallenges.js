import { fetchAllChallenges } from './apiService.js';
import Challenge from './challengeClass.js';

const challengesListElement = document.querySelector(".challenges__list");

let challengesArray = [];
// const displayedChallenges = 3;

const displayNumberOfChallenges = async () => {
    const { success, data: challenges, error } = await fetchAllChallenges();

    if (!success) {
        console.error("Failed to fetch challenges:", error);
        challengesListElement.innerHTML = `<li>Error loading challenges. Please try again later.</li>`;
        return;
    }

    challengesArray = challenges;

    const sortedChallenges = [...challengesArray].sort((a, b) => b.rating - a.rating);
    const challengesToDisplay = sortedChallenges.slice(0, 3);


    for (let i = 0; i < challengesToDisplay.length; i++) {
        const challengeData = challengesToDisplay[i];

        const challenge = new Challenge(
            challengeData.id,
            challengeData.title,
            challengeData.description,
            challengeData.type,
            challengeData.minParticipants,
            challengeData.maxParticipants,
            challengeData.rating,
            challengeData.image,
            challengeData.labels
        );

        challengesListElement.appendChild(challenge.createChallengeCard(true));
    }
};

displayNumberOfChallenges();