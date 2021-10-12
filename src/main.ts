import sunIcon from "./images/icon-sun.svg";
import moonIcon from "./images/icon-moon.svg";

class ToggleMode {
  button: HTMLButtonElement;
  sunIcon: string;
  moonIcon: string;

  constructor(sunIcon: string, moonIcon: string) {
    this.button = document.querySelector(
      ".header__button"
    )! as HTMLButtonElement;
    this.sunIcon = sunIcon;
    this.moonIcon = moonIcon;
    this.configure();
  }

  configure() {
    this.button.addEventListener("click", this.handleClick);
  }

  handleClick = () => {
    if (!document.documentElement.hasAttribute("data-theme")) {
      document.documentElement.setAttribute("data-theme", "dark");
      this.button
        .querySelector(".header__icon")
        .setAttribute("src", this.sunIcon);
    } else {
      document.documentElement.removeAttribute("data-theme");
      this.button
        .querySelector(".header__icon")
        .setAttribute("src", this.moonIcon);
    }
  };
}

new ToggleMode(sunIcon, moonIcon);
