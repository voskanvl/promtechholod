import { OptionSlide, SlideClass } from "./classSlides";

export default function slides() {
    const card: OptionSlide = {
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

    return new SlideClass({
        card,
    });
}
