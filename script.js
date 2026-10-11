
const envelope = document.getElementById("envelope");
const letterContent = document.getElementById("letterContent");
const envelopeText = document.getElementById("envelopeText");

envelope.addEventListener("click", () => {
  const isOpening = letterContent.classList.contains("hidden");

  letterContent.classList.toggle("hidden");
  envelope.setAttribute("aria-expanded", String(isOpening));
  envelopeText.textContent = isOpening
    ? "Tap to close your letter"
    : "Tap to open your letter";

  if (isOpening) {
    letterContent.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }
});

// MUSIC BUTTON
const music = document.getElementById("ourSong");
const musicBtn = document.getElementById("musicBtn");

musicBtn.addEventListener("click", async () => {
  if (music.paused) {
    try {
      await music.play();
      musicBtn.textContent = "♫ Pause our song";
      musicBtn.setAttribute("aria-pressed", "true");
    } catch {
      musicBtn.textContent = "Add music.mp3 first 🎵";
    }
  } else {
    music.pause();
    musicBtn.textContent = "♫ Play our song";
    musicBtn.setAttribute("aria-pressed", "false");
  }
});

music.addEventListener("ended", () => {
  musicBtn.textContent = "♫ Play our song";
  musicBtn.setAttribute("aria-pressed", "false");
});

// BIRTHDAY GIFT
const giftBtn = document.getElementById("giftBtn");
const giftMessage = document.getElementById("giftMessage");

giftBtn.addEventListener("click", () => {
  const opening = giftMessage.classList.contains("hidden");
  giftMessage.classList.toggle("hidden");
  giftBtn.textContent = opening ? "Close your gift ♡" : "Open your gift ♡";

  if (opening) {
    makeHearts(18);
    giftMessage.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }
});

// FLOATING HEARTS
const heartsContainer = document.getElementById("hearts");

function makeHearts(amount = 1) {
  for (let i = 0; i < amount; i++) {
    const heart = document.createElement("span");
    heart.className = "heart";
    heart.textContent = ["♡", "♥", "💙", "✧"][Math.floor(Math.random() * 4)];
    heart.style.left = Math.random() * 95 + "vw";
    heart.style.fontSize = (14 + Math.random() * 18) + "px";
    heart.style.animationDuration = (3 + Math.random() * 3) + "s";

    heartsContainer.appendChild(heart);
    heart.addEventListener("animationend", () => heart.remove());
  }
}

// A little ocean magic now and then
setInterval(() => makeHearts(1), 1800);

// COUPLE QUIZ
const questions = [
  {
    question: "What is your special nickname?",
    options: ["Sunshine ☀️", "Ocean 🌊", "Moonlight 🌙"],
    answer: 1,
    correct: "Of course, you're my Ocean! 🌊💙",
    wrong: "Hehe, try again, birthday boy! 👀"
  },
  {
    question: "Who made this little birthday website?",
    options: ["A random stranger", "A secret mermaid", "Your wife 💌"],
    answer: 2,
    correct: "YES! Your wife made this just for you! 🥹",
    wrong: "Really, Ocean? Look at the signature! 😂💙"
  },
  {
    question: "What is the theme of your birthday surprise?",
    options: ["Outer space 🚀", "Ocean magic 🌊", "A jungle 🐬"],
    answer: 1,
    correct: "You know your little world! 🌊 Here's a hug in spirit! 💙",
    wrong: "Look around you, Ocean! There's a little clue everywhere. 💙"
  }
];

let questionIndex = 0;
let quizFinished = false;

const quizQuestion = document.getElementById("quizQuestion");
const quizOptions = document.getElementById("quizOptions");
const quizFeedback = document.getElementById("quizFeedback");
const quizCount = document.getElementById("quizCount");
const nextQuestion = document.getElementById("nextQuestion");

function renderQuestion() {
  const current = questions[questionIndex];

  quizCount.textContent =
    `QUESTION ${questionIndex + 1} OF ${questions.length}`;
  quizQuestion.textContent = current.question;
  quizFeedback.textContent = "";
  nextQuestion.classList.add("hidden");
  quizOptions.replaceChildren();

  current.options.forEach((option, index) => {
    const button = document.createElement("button");
    button.className = "quiz-option";
    button.textContent = option;
    button.type = "button";

    button.addEventListener("click", () => selectAnswer(index));
    quizOptions.appendChild(button);
  });
}

function selectAnswer(selected) {
  if (quizFinished) return;

  const current = questions[questionIndex];
  const buttons = quizOptions.querySelectorAll("button");

  buttons.forEach((button, index) => {
    button.disabled = true;

    if (index === current.answer) {
      button.classList.add("correct");
    } else if (index === selected) {
      button.classList.add("wrong");
    }
  });

  quizFeedback.textContent = selected === current.answer
    ? current.correct
    : current.wrong;

  if (selected === current.answer) makeHearts(5);

  nextQuestion.classList.remove("hidden");
  nextQuestion.textContent =
    questionIndex === questions.length - 1
      ? "See my final message ♡"
      : "Next question →";
}

nextQuestion.addEventListener("click", () => {
  if (questionIndex < questions.length - 1) {
    questionIndex++;
    renderQuestion();
  } else {
    quizFinished = true;
    quizCount.textContent = "QUIZ COMPLETED ♡";
    quizQuestion.textContent = "You will always be my Ocean. 🌊";
    quizOptions.replaceChildren();

    quizFeedback.textContent =
      "Thank you for playing, birthday boy! Your real gift is waiting below. 💙";

    nextQuestion.classList.add("hidden");
    makeHearts(15);
  }
});

renderQuestion();

// BACK TO TOP
document.getElementById("topBtn").addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});
