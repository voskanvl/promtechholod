import "./sass/style.sass";
import slides from "./slides";
import "@splidejs/splide/css";
import accordion from "./accordion";
import modal from "./modal";
import ky from "ky";
import IMask from "imask";
import Counter from "./CounterClass";

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

slides();
accordion();
modal("form");
modal("search");

const middleButton = document.querySelector<HTMLButtonElement>(".middle__button");
const middleInputElement = document.querySelector<HTMLElement>(".middle__phone");
const middleInputMask =
    middleInputElement &&
    IMask(middleInputElement, {
        mask: "+{7}(000)000-00-00",
        lazy: false, // make placeholder always visible
    });

middleButton &&
    middleButton.addEventListener("click", async event => {
        event.preventDefault();
        const middleInput = document.querySelector<HTMLInputElement>(".middle__phone");
        if (!middleInput || !(middleInputMask && middleInputMask.unmaskedValue.length === 11)) {
            console.warn("there isn't .middle__phone or input.middle__phone value is empty");
            return;
        }

        const fm = new FormData();
        fm.append("phone", middleInput.value);
        try {
            const res = await ky.post("/mail1.php", {
                body: fm,
            });
            if (res.ok) {
                const mod = modal("ok");
                setTimeout(() => {
                    mod && mod.remove();
                }, 2000);
            } else {
                const mod = modal("error");
                setTimeout(() => {
                    mod && mod.remove();
                }, 2000);
            }
        } catch (error) {
            const mod = modal("error");
            setTimeout(() => {
                mod && mod.remove();
            }, 3000);
        }
    });

//--- toggle img on slider in card.html

const slidesElements = document.querySelectorAll<HTMLElement>("#card .splide__slide");
const bigImage = document.querySelector<HTMLImageElement>(".card.card-details__big-image > img");

slidesElements &&
    slidesElements.length &&
    slidesElements.forEach(slide => {
        slide.addEventListener("click", (event: Event) => {
            const target = event.target as HTMLElement;
            if (target.nodeName === "IMG") {
                bigImage && (bigImage.src = (target as HTMLImageElement).src);
            }
        });
    });

//--- COUNTER ---

const counters = document.querySelectorAll<HTMLElement>(".counter");
counters &&
    counters.length &&
    counters.forEach(counterEl => {
        const counter = new Counter(counterEl);
        const total =
            counterEl.parentElement?.parentElement?.querySelector<HTMLElement>(
                ".cart__total > span",
            );

        const priceElement =
            counterEl.parentElement?.parentElement?.querySelector<HTMLElement>(".cart__item-cost");

        const priceString = priceElement?.innerText.replace(/\W/g, "");
        const price = (priceString && parseInt(priceString)) || 0;

        counter.subscribe((val: number) => {
            total && (total.innerText = (val * price).toLocaleString());
        });
    });
