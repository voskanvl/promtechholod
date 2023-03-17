import "./sass/style.sass";
import slides from "./slides";
import "@splidejs/splide/css";
import accordion from "./accordion";

//---toggle menu modal ---

const menuModal = document.querySelector<HTMLElement>(".modal-menu");
if (!menuModal) throw Error("there isn't .modal-menu");

const burger = document.querySelector<HTMLElement>(".header__burger");
!!burger &&
    burger.addEventListener("click", () => {
        const isClosed = menuModal.classList.contains("closed");
        if (isClosed) {
            menuModal.classList.remove("closed");
            document.body.style.height = "100vh";
            document.body.style.overflow = "hidden";
        }
    });

const closeElement = document.querySelector<HTMLElement>(".modal-menu__close");
!!closeElement &&
    closeElement.addEventListener("click", () => {
        const isOpened = !menuModal.classList.contains("closed");
        if (isOpened) {
            menuModal.classList.add("closed");
            document.body.style.height = "";
            document.body.style.overflow = "";
        }
    });

const slidesEl = slides();
accordion();
window.slides = slidesEl;
