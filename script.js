const sarcasticPhrases = [
  "Work is when you're tired before you even start.",
  "The boss says 'we are family' but doesn't pay alimony.",
  "If work were a dream, it wouldn't be paid so sadly.",
  "Every deadline is a small death, but without respawn.",
  "You're not procrastinating, you're protesting.",
  "The office is an MMORPG where the loot is kitchen cookies.",
  "8 hours of work just to spend 2 hours lying on your phone feeling guilty.",
  "If you love your job, why are you on TikTok at 11:07?",
  "'Urgent for yesterday' is the main corporate meme.",
  "Your dream job is the one you can talk about without crying.",
];

const sarcasmHoverTexts = [
  "Work has eaten your life.",
  "Boss = virus. Do not update.",
  "Your burnout level: 97%.",
  "This text is counting your overtime.",
  "You're not lazy. You're in beta version.",
  "Your KPI is not dying before Friday.",
  "'Stay, you are important to us' — said the open space.",
  "Every meeting shortens life by 5 minutes.",
];

const defaultTasks = [
  "Reply to a meaningless call",
  "Fill out another Excel spreadsheet",
  "Pretend to be engaged in a meeting",
  "Pretend you love corporate values",
  "Write a report nobody will read",
  "Say 'yes, I understand' and google it later",
  "Survive another 'quick 5-minute call'",
  "Smile on Zoom when the internet has already given up",
];

const toastEl = document.getElementById("toast");
const donateButton = document.getElementById("donate-button");
const dynamicPhraseEl = document.getElementById("dynamic-phrase");
const tasksBoard = document.getElementById("tasks-board");
const tasksCounter = document.getElementById("tasks-counter")?.querySelector("span");

function showToast(message) {
  if (!toastEl) return;
  toastEl.textContent = message;
  toastEl.classList.add("visible");
  clearTimeout(showToast._timeoutId);
  showToast._timeoutId = setTimeout(() => {
    toastEl.classList.remove("visible");
  }, 2100);
}

function rotateSarcasticPhrases() {
  if (!dynamicPhraseEl) return;
  let index = Math.floor(Math.random() * sarcasticPhrases.length);
  dynamicPhraseEl.textContent = sarcasticPhrases[index];

  setInterval(() => {
    index = (index + 1) % sarcasticPhrases.length;
    dynamicPhraseEl.style.opacity = 0;
    setTimeout(() => {
      dynamicPhraseEl.textContent = sarcasticPhrases[index];
      dynamicPhraseEl.style.opacity = 1;
    }, 160);
  }, 3200);
}

function setupSarcasmHovers() {
  const sarcasmElements = document.querySelectorAll("[data-sarcasm]");
  sarcasmElements.forEach((el) => {
    const random = sarcasmHoverTexts[
      Math.floor(Math.random() * sarcasmHoverTexts.length)
    ];
    el.setAttribute("data-hover-text", random);
  });
}

function setupCopyButtons() {
  const copyButtons = document.querySelectorAll(".copy-btn");
  copyButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const selector = button.getAttribute("data-copy-target");
      const target = selector && document.querySelector(selector);

      if (!target) {
        showToast("Something broke, just like your deadline.");
        return;
      }

      const text = target.textContent.trim();

      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard
          .writeText(text)
          .then(() => {
            showToast("Address copied. Now don't forget to donate.");
          })
          .catch(() => {
            fallbackCopyText(text);
          });
      } else {
        fallbackCopyText(text);
      }
    });
  });
}

function fallbackCopyText(text) {
  const tempInput = document.createElement("textarea");
  tempInput.value = text;
  tempInput.setAttribute("readonly", "");
  tempInput.style.position = "absolute";
  tempInput.style.left = "-9999px";
  document.body.appendChild(tempInput);
  tempInput.select();
  try {
    document.execCommand("copy");
    showToast("Address copied the old-school way.");
  } catch (err) {
    showToast("Couldn't copy. Do it the old way: select and Ctrl+C.");
  }
  document.body.removeChild(tempInput);
}

function setupDonateButton() {
  if (!donateButton) return;
  donateButton.addEventListener("click", () => {
    const walletsSection = document.getElementById("wallets");
    if (walletsSection && walletsSection.scrollIntoView) {
      walletsSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    showToast("Scroll down — that's your exit from office hell (in wallet form).");
  });
}

function renderTasks() {
  if (!tasksBoard || !tasksCounter) return;
  tasksBoard.innerHTML = "";

  const tasks = shuffleArray(defaultTasks).slice(0, 6);
  let remaining = tasks.length;
  tasksCounter.textContent = String(remaining);

  tasks.forEach((taskText) => {
    const chip = document.createElement("button");
    chip.type = "button";
    chip.className = "task-chip";
    chip.textContent = taskText;

    chip.addEventListener("click", () => {
      const bye = document.createElement("span");
      bye.className = "bye-label";
      bye.textContent = "Bye-bye, job";
      chip.appendChild(bye);

      setTimeout(() => {
        chip.classList.add("completed");
        setTimeout(() => {
          chip.remove();
        }, 210);
      }, 120);

      remaining = Math.max(remaining - 1, 0);
      tasksCounter.textContent = String(remaining);

      if (remaining === 0) {
        const counterWrapper = document.getElementById("tasks-counter");
        counterWrapper?.classList.add("done");
        showToast("All tasks destroyed. Only crypto and memes remain.");
        setTimeout(() => {
          renderTasks();
          counterWrapper?.classList.remove("done");
        }, 2600);
      } else {
        showToast("One task went to a better place.");
      }
    });

    tasksBoard.appendChild(chip);
  });
}

function shuffleArray(array) {
  const result = array.slice();
  for (let i = result.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

function setupShareButtons() {
  const twitterBtn = document.getElementById("share-twitter");
  const copyLinkBtn = document.getElementById("share-copy-link");

  const url = window.location.href;
  const text =
    "Fuck Job! A meme website where you can tell your job to go to hell and donate crypto to the creator. 🚬💸";

  if (twitterBtn) {
    twitterBtn.addEventListener("click", () => {
      const shareUrl =
        "https://twitter.com/intent/tweet?text=" +
        encodeURIComponent(text) +
        "&url=" +
        encodeURIComponent(url);
      window.open(shareUrl, "_blank", "noopener,noreferrer");
    });
  }

  if (copyLinkBtn) {
    copyLinkBtn.addEventListener("click", () => {
      const fullText = `${text}\n\n${url}`;
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard
          .writeText(fullText)
          .then(() => {
            showToast("Link copied. Now go spam it in stories.");
          })
          .catch(() => fallbackCopyText(fullText));
      } else {
        fallbackCopyText(fullText);
      }
    });
  }
}

window.addEventListener("DOMContentLoaded", () => {
  rotateSarcasticPhrases();
  setupSarcasmHovers();
  setupCopyButtons();
  setupDonateButton();
  renderTasks();
  setupShareButtons();
});
