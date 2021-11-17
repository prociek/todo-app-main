export default class ToggleMode {
  private button: HTMLButtonElement;
  private image: HTMLImageElement;
  private sunIcon: string;
  private moonIcon: string;

  constructor(sunIcon: string, moonIcon: string) {
    this.button = document.querySelector(
      ".header__button"
    ) as HTMLButtonElement;
    this.image = this.button.querySelector(
      ".header__icon"
    )! as HTMLImageElement;
    this.sunIcon = sunIcon;
    this.moonIcon = moonIcon;
    this.config();
  }

  private config() {
    this.button.addEventListener("click", this.toggleMode);
  }

  private toggleMode = () => {
    if (!document.documentElement.hasAttribute("data-theme")) {
      document.documentElement.setAttribute("data-theme", "dark");
      this.image.setAttribute("src", this.sunIcon);
    } else {
      document.documentElement.removeAttribute("data-theme");
      this.image.setAttribute("src", this.moonIcon);
    }
  };
}
