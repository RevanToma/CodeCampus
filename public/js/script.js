document.addEventListener("DOMContentLoaded", function () {
  const closeFlashButton = document.querySelector("span.close-flash");

  if (closeFlashButton) {
    closeFlashButton.addEventListener("click", closeFlashMessage);
  }
  const completeStepCheckBoxes = this.documentElement.querySelectorAll(
    "input.complete-step"
  );
  if (completeStepCheckBoxes) {
    completeStepCheckBoxes.forEach((checkBox) =>
      checkBox.addEventListener("change", completeStep)
    );
    calculateAllProgress();
  }
});

const closeFlashMessage = (ev) => {
  const flashMEssage = ev.target.parentElement;
  flashMEssage.remove();
};

const completeStep = async (ev) => {
  const checkBox = ev.target;
  const pathId = checkBox.dataset.pathId;
  const stepId = checkBox.dataset.stepId;
  const done = checkBox.dataset.done === "true";

  const response = await fetch("/api/profile/complete-step", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({ pathId, stepId, done: !done }),
  });

  if (response.ok) {
    checkBox.dataset.done = done ? "false" : "true";
    calculateAllProgress();
  }
};

const calculateAllProgress = () => {
  const paths = document.querySelectorAll(".path");
  if (paths) {
    paths.forEach((path) => calculateProgress(path));
  }
};

const calculateProgress = (el) => {
  const steps = el.querySelectorAll("input.complete-step");
  const totalSteps = steps.length;
  const completedSteps = el.querySelectorAll(
    'input.complete-step[data-done="true"]'
  ).length;

  const progress = el.querySelector(".progress-bar");
  progress.style.width = `${(completedSteps / totalSteps) * 100}%`;

  const stepsCount = el.querySelector(".steps-count");
  stepsCount.innerText = `${completedSteps}/${totalSteps}`;

  const progressPercent = el.querySelector(".progress-percent");
  progressPercent.innerText = `${Math.round(
    (completedSteps / totalSteps) * 100
  )}%`;
};
