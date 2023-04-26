type cbType = (val: number) => void;

export default class Counter {
    element: HTMLElement;
    private _value: number;
    minus: HTMLElement | null;
    plus: HTMLElement | null;
    output: HTMLElement | null;
    private listeners: cbType[] = [];

    constructor(element: HTMLElement) {
        this.element = element;
        this._value = 1;
        this.minus = element.querySelector<HTMLElement>(".counter__minus");
        this.plus = element.querySelector<HTMLElement>(".counter__plus");
        this.output = element.querySelector<HTMLElement>(".counter__output");

        this.inc = this.inc.bind(this);
        this.dec = this.dec.bind(this);

        this.minus && this.minus.addEventListener("click", this.dec);
        this.plus && this.plus.addEventListener("click", this.inc);
    }

    get value(): number {
        return this._value;
    }

    set value(x: number) {
        this._value = x;
        this.output && (this.output.innerText = this._value + "");
        this.listeners.forEach(cb => cb(this._value));
    }

    inc() {
        this.value++;
    }
    dec() {
        if (this.value <= 1) return;
        this.value--;
    }

    subscribe(cb: cbType) {
        if (!this.listeners || !this.listeners.length) this.listeners = [];
        this.listeners.push(cb);
    }
    unsubscribe(cb: cbType) {
        if (!this.listeners || !this.listeners.length) return;
        this.listeners = this.listeners.filter(e => e !== cb);
    }
}
