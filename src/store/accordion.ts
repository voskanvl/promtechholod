import createStore from "zustand/vanilla";
import { devtools } from "zustand/middleware";

export interface AccordionState {
    current: number | undefined;
    currentButton: HTMLElement | null;
    currentDetail: HTMLElement | null;
    set: (number: number, button: HTMLElement | null, detail: HTMLElement | null) => void;
    clear: () => void;
}

const accordionStoreCreator = (name: string) => {
    return createStore<AccordionState, [["zustand/devtools", never]]>(
        devtools(
            set => ({
                current: undefined,
                currentButton: null,
                currentDetail: null,
                set: (number, button, detail) =>
                    set(state => ({
                        ...state,
                        current: number,
                        currentButton: button,
                        currentDetail: detail,
                    })),
                clear: () =>
                    set(state => ({
                        ...state,
                        current: undefined,
                        currentButton: null,
                        currentDetail: null,
                    })),
            }),
            { name },
        ),
    );
};

export const accordionStore = accordionStoreCreator("accordion1");
export const accordion2Store = accordionStoreCreator("accordion2");
