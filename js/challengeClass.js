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

  createChallengeStars() {
    // Funktion for rating(under construction)
    const challengeRating = document.createElement("div");
    challengeRating.className = "room__ratings"
    const starFilled = new Image();
    starFilled.src = "assets/svg/star-filled.svg";
    starFilled.className = "star filled";
    const starEmpty = new Image();
    starEmpty.src = "assets/svg/star.svg";
    starEmpty.className = "star unfilled";
    const starHalf = new Image();
    starHalf.src = "assets/svg/star-half.svg";
    starHalf.className = "star half";

    for (let i = 0; i < 5; i++) {
      //star.src = "assets/svg/star.svg"
      //star.src = "assets/svg/star-half.svg"
      challengeRating.appendChild(starFilled);
      challengeRating.appendChild(starEmpty);
      challengeRating.appendChild(starHalf);
      
    }

    return challengeRating;
  }

  //methods:
  createChallengeCard() {
    const liItem = document.createElement("li");
    liItem.id = "room__carousel__slide" + this.id;
    liItem.setAttribute('tabindex', 0);
    liItem.className = "challenge__slide challengey challenges" + this.id;

    const imageContainer = document.createElement("div");
    imageContainer.className = "challenge__image-container"

    const img = document.createElement("img");
    img.className = "challenge__img";
    img.src = this.image;
    img.alt = this.description;
    img.loading = "lazy";
    img.style.width = "100%";
    img.style.height = "100%";
    img.style.objectFit = "cover";
    imageContainer.appendChild(img);

    const detailsContainer = document.createElement("div");
    detailsContainer.className = "challenge__details";
    

    const title = document.createElement("h2");
    title.className = "challenge__details__title";
    title.textContent = this.title;

    const detailsInfo = document.createElement("div");
    detailsInfo.className = "challenge__details-info";

    const rating = this.createChallengeStars();

    const challengeParticipants = document.createElement("div");
    challengeParticipants.className = "challenge__participants";
    challengeParticipants.textContent = `${this.minParticipants} - ${this.maxParticipants} participants`;

    detailsInfo.appendChild(rating);
    detailsInfo.appendChild(challengeParticipants);

    const challengeDescription = document.createElement("p");
    challengeDescription.className = "challenge__description"
    challengeDescription.textContent = this.description;

    const link = document.createElement("a");
    link.className = "challenge__btn";
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


const challenge = new Challenge(
  1,
  "Title of room",
  "Praeterea, ex culpa non invenies unum aut non accusatis unum. Et nihil inuitam. Nemo nocere tibi erit, et non inimicos, et. ",
  "on-site",
  2,
  6,
  4.5,
  "assets/images/gallery/image1.png",
  ""
  );
  
  const roomList = document.querySelector(".challenges__list");
  roomList.appendChild(challenge.createChallengeCard());