import { OptionSlide, SlideClass } from "./classSlides";
export default function slides() {
    const review: OptionSlide = {
        elementName: "#review",
        elementElement: document.querySelector("#review")!,
        options: {
            type: "loop",
            arrows: false,
            perPage: 3,
            focus: "center",
            pagination: false,
        },
        controls: {
            left: document.querySelector<HTMLElement>(".reviews__control--left")!,
            right: document.querySelector<HTMLElement>(".reviews__control--right")!,
        },
    };

    const about: OptionSlide = {
        elementName: "#about",
        elementElement: document.querySelector("#about")!,
        options: {
            type: "loop",
            arrows: false,
            perPage: 5,
            focus: "center",
            pagination: false,
        },
        controls: {
            left: document.querySelector<HTMLElement>(".about__control--left")!,
            right: document.querySelector<HTMLElement>(".about__control--right")!,
        },
    };

    const product: OptionSlide = {
        elementName: "#product",
        elementElement: document.querySelector("#product")!,
        options: {
            type: "loop",
            arrows: false,
            perPage: 3,
            perMove: 1,
            focus: "center",
            pagination: false,
        },
        controls: {
            left: document.querySelector<HTMLElement>(".price__products-control--left")!,
            right: document.querySelector<HTMLElement>(".price__products-control--right")!,
        },
    };

    const certificatesName = document.querySelectorAll<HTMLElement>(
        ".price-details__platform-certificates > section.splide[id^='certificate']",
    );

    const certificates: Record<string, OptionSlide> = [...certificatesName].reduce(
        (acc, e) => ({
            ...acc,
            [e.getAttribute("id")!]: {
                elementName: `#${e.getAttribute("id")!}`,
                elementElement: e,
                options: {
                    perPage: 1,
                    pagination: true,
                    arrows: false,
                },
            },
        }),
        {},
    );

    const services: OptionSlide = {
        elementName: "#services",
        elementElement: document.querySelector("#services")!,
        options: {
            type: "loop",
            arrows: false,
            perPage: 3,
            perMove: 1,
            focus: "center",
            pagination: false,
        },
        controls: {
            left: document.querySelector<HTMLElement>(".services__control--left")!,
            right: document.querySelector<HTMLElement>(".services__control--right")!,
        },
    };

    const partners: OptionSlide = {
        elementName: "#partners",
        elementElement: document.querySelector("#partners")!,
        options: {
            type: "loop",
            arrows: false,
            perPage: 7,
            perMove: 1,
            focus: "center",
            pagination: false,
        },
    };

    const panelsName = document.querySelectorAll<HTMLElement>(
        ".panel__slider > section.splide[id^='panel']",
    );

    const panels: Record<string, OptionSlide> = [...panelsName].reduce((acc, e) => {
        return {
            ...acc,
            [e.getAttribute("id")!]: {
                elementName: `#${e.getAttribute("id")!}`,
                elementElement: e,
                options: {
                    type: "loop",
                    perPage: 3,
                    perMove: 1,
                    pagination: false,
                    arrows: false,
                    focus: "center",
                },
                controls: {
                    left: e.parentElement!.querySelector<HTMLElement>(
                        ".panel__slider-control--left",
                    )!,
                    right: e.parentElement!.querySelector<HTMLElement>(
                        ".panel__slider-control--right",
                    )!,
                },
            },
        };
    }, {});

    return new SlideClass({
        review,
        about,
        product,
        ...certificates,
        services,
        partners,
        ...panels,
    });
}
