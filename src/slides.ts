import { OptionSlide, SlideClass } from "./classSlides";

export default function slides() {
    const cardElement = document.querySelector<HTMLElement>("#card");
    let card: OptionSlide | null = null;
    if (cardElement) {
        card = {
            elementName: "#card",
            elementElement: document.querySelector<HTMLElement>("#card")!,
            options: {
                type: "loop",
                arrows: false,
                perPage: 3,
                focus: "center",
                pagination: false,
                breakpoints: {
                    1024: {
                        focus: undefined,
                        perPage: 2,
                    },
                    600: {
                        perPage: 1,
                    },
                },
            },
            controls: {
                left: document.querySelector<HTMLElement>(".card-details__control--left")!,
                right: document.querySelector<HTMLElement>(".card-details__control--right")!,
            },
        };
    }

    const similarElement = document.querySelector<HTMLElement>("#similar");
    let similar: OptionSlide | null = null;
    if (similarElement) {
        similar = {
            elementName: "#similar",
            elementElement: document.querySelector<HTMLElement>("#similar")!,
            options: {
                type: "loop",
                arrows: false,
                perPage: 4,
                pagination: false,
                breakpoints: {
                    1024: {
                        perPage: 2,
                    },
                    600: {
                        perPage: 1,
                    },
                },
            },
            controls: {
                left: document.querySelector<HTMLElement>(".similar__control--left")!,
                right: document.querySelector<HTMLElement>(".similar__control--right")!,
            },
        };
    }

    const newsElement = document.querySelector<HTMLElement>("#news");
    let news: OptionSlide | null = null;
    if (newsElement) {
        news = {
            elementName: "#news",
            elementElement: document.querySelector<HTMLElement>("#news")!,
            options: {
                type: "loop",
                arrows: false,
                perPage: 4,
                pagination: false,
                breakpoints: {
                    1024: {
                        perPage: 2,
                    },
                    600: {
                        perPage: 1,
                    },
                },
            },
            controls: {
                left: document.querySelector<HTMLElement>("#news-left")!,
                right: document.querySelector<HTMLElement>("#news-right")!,
            },
        };
    }

    const sequence = Object.entries({
        card,
        similar,
        news,
    }).reduce((acc, [key, val]) => (val ? { ...acc, [key]: val } : { ...acc }), {});

    return new SlideClass(sequence);
}
