import store from "./store/index";

export default function accordion() {
    const accordionButtons = document.querySelectorAll<HTMLElement>(".accordion__button");
    if (!accordionButtons || !accordionButtons.length) return;

    const detailsContainer = document.querySelector<HTMLElement>(".accordion__details");
    if (!detailsContainer) throw Error("there isn't .accordion__details");

    const details = document.querySelectorAll<HTMLElement>(".accordion__details > .card");

    accordionButtons.forEach(e =>
        e.addEventListener("click", ({ target }: Event) => {
            const targetElement = target as HTMLElement;
            const { id } = targetElement.dataset;
            if (!id) return;

            if (store.accordionStore.getState().current === +id)
                return store.accordionStore.getState().clear();

            const activeDetail = [...details].find(e => e.dataset.id === id);
            if (!activeDetail)
                throw Error(`.accordion__details > .card(data-id="${id}") didn't found`);

            store.accordionStore.getState().set(+id, targetElement, activeDetail);
        }),
    );

    store.accordionStore.subscribe((state, prev) => {
        prev.currentButton?.removeAttribute("active");
        prev.currentDetail?.removeAttribute("active");
        state.currentButton?.setAttribute("active", "active");
        state.currentDetail?.setAttribute("active", "active");

        state.current !== undefined
            ? detailsContainer?.setAttribute("active", "active")
            : detailsContainer?.removeAttribute("active");
    });
}
