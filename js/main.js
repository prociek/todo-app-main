(() => {
  /* GRABING ALL ELEMENTS INTO VARIABLES */
  const toggleModeBtn = document.querySelector(".header__button");

  /* FUNCTIONS */
  function toggleMode() {
    if (!document.documentElement.hasAttribute("data-theme")) {
      document.documentElement.setAttribute("data-theme", "dark");
      toggleModeBtn
        .querySelector(".header__icon")
        .setAttribute("src", "./images/icon-sun.svg");
    } else {
      document.documentElement.removeAttribute("data-theme");
      toggleModeBtn
        .querySelector(".header__icon")
        .setAttribute("src", "./images/icon-moon.svg");
    }
  }

  /* EVENT LISTENERS */
  toggleModeBtn.addEventListener("click", toggleMode);
})();
