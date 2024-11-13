class Challenge {
  constructor(
    id,
    title,
    description,
    type,
    minParticipants,
    maxParticipants,
    rating,
    image,
    labels,
  ) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.type = type;
    this.minParticipants = minParticipants;
    this.maxParticipants = maxParticipants;
    this.rating = rating;
    this.image = image;
    this.labels = labels;
  }

//methods:
  createChallengeCard(){

  }
}
export default Challenge;
