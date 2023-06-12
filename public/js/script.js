document.addEventListener("DOMContentLoaded", function () {
  const closeFlashButton = document.querySelector("span.close-flash");

  closeFlashButton.addEventListener("click", closeFlashMessage);
});

const closeFlashMessage = (ev) => {
  const flashMEssage = ev.target.parentElement;
  flashMEssage.remove();
};
