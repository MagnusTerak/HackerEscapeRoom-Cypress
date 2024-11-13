export class Challenge {
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

  createRatingStars() {
    // Funktion for rating(under construction)
    const challengeRating = document.createElement("div");
    challengeRating.className = "room__ratings"


    for (let i = 0; i < 5; i++) {
      const star = new Image();
      star.src = "assets/svg/star-filled.svg";
      star.className = "star filled";
      //star.src = "assets/svg/star.svg"
      challengeRating.appendChild(star);
    }

    return challengeRating;
  }

  //methods:
  createChallengeCard() {
    const liItem = document.createElement("li");
    liItem.id = "room__carousel__slide" + this.id;
    liItem.setAttribute('tabindex', 0);
    liItem.className = "carousel__slide roomy room" + this.id;

    const imageContainer = document.createElement("div");
    imageContainer.className = "room__image-container"

    const img = document.createElement("img");
    img.className = "room__img";
    img.src = this.image;
    img.alt = this.description;
    img.loading = "lazy";
    img.style.width = "100%";
    img.style.height = "100%";
    img.style.objectFit = "cover";
    imageContainer.appendChild(img);

    const detailsContainer = document.createElement("div");
    detailsContainer.className = "room__details";
    

    const title = document.createElement("h2");
    title.className = "room__details__title";
    title.textContent = this.title;

    const detailsInfo = document.createElement("div");
    detailsInfo.className = "room__details-info";

    const rating = this.createRatingStars();

    const challengeParticipants = document.createElement("div");
    challengeParticipants.className = "room__participants";
    challengeParticipants.textContent = `${this.minParticipants} - ${this.maxParticipants} participants`;

    detailsInfo.appendChild(rating);
    detailsInfo.appendChild(challengeParticipants);

    const challengeDescription = document.createElement("p");
    challengeDescription.className = "room__description"
    challengeDescription.textContent = this.description;

    const link = document.createElement("a");
    link.className = "room__btn";
    link.textContent = "Book this challenge";

    detailsContainer.appendChild(title);
    detailsContainer.appendChild(detailsInfo);
    detailsContainer.appendChild(challengeDescription);
    detailsContainer.appendChild(link);

    liItem.appendChild(imageContainer);
    liItem.appendChild(detailsContainer);

    return liItem;
  }
}