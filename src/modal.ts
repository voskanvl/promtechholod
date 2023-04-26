import IMask from "imask";
import ky from "ky";

const errorMessages = {
    server: "Возникла проблема с сервером. Попробуйте отправить еще раз",
    phone: "Количество цифр в номере телефона должно быть 10. Проверьте!",
    check: "Для отправки формы нужно Ваше согласие на обработку персональных данных",
};

const selectors = {
    form: { selector: ".modal-switcher", func: formModal },
    search: { selector: ".header__control--search", func: searchModal },
    ok: { selector: null, func: okModal },
    error: { selector: null, func: errorModal },
};

export default function modal(type: keyof typeof selectors) {
    if (selectors[type].selector) {
        const switcher = document.querySelector<HTMLElement>(selectors[type].selector!);
        switcher && switcher.addEventListener("click", () => selectors[type].func());
    } else {
        return selectors[type].func();
    }
}

const sleep = (ms: number) => new Promise(r => setTimeout(r, ms));

function createModal() {
    const modal = document.createElement("div"),
        form = document.createElement("form"),
        close = document.createElement("div");

    close.classList.add("close");
    close.innerHTML = `
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="20" cy="20" r="19.25" stroke="#005389" stroke-width="1.5"/>
        <path d="M14.25 14.25L25.75 25.75" stroke="#005389" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M25.75 14.25L14.25 25.75" stroke="#005389" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        `;

    close.addEventListener("click", () => modal.remove());

    return { modal, form, close };
}

function formModal() {
    const { modal, form, close } = createModal();

    form.classList.add("form-modal");
    form.innerHTML = `
        <div class="form-title">Закажите звонок и получите консультацию 
        по нужному для вас товару</div>
        <p>Спасибо, данные будут переданы в отдел продаж. После чего ожидайте звонка!</p>
        <input type="text" name="name" placeholder="Имя">
        <input type="tel" name="phone" min="10">
        <textarea name="text" cols="30" rows="10" placeholder="Чем мы можем вам помочь?" ></textarea>
        <label>
            <input type="checkbox" name="agree">
            <p>Даю согласие на обработку моих персональных данный в соответствии с политикой обработки персональных данных</p> 
        </label>
        <output></output>
        <input type="submit" value="Отправить" passive="passive"/>
    `;

    form.append(close);

    modal.classList.add("modal");
    modal.append(form);

    document.body.append(modal);

    const tel = document.querySelector<HTMLInputElement>("form.form-modal > input[type='tel']"),
        submit = document.querySelector<HTMLInputElement>("form.form-modal > input[type='submit']"),
        check = document.querySelector<HTMLInputElement>("form.form-modal input[type='checkbox']"),
        output = document.querySelector<HTMLInputElement>("form.form-modal > output");

    const mask =
        tel &&
        IMask(tel, {
            mask: "+{7}(000)000-00-00",
            lazy: false, // make placeholder always visible
        });

    check &&
        check.addEventListener("click", () => {
            if (check.checked) {
                submit && submit.removeAttribute("passive");
            } else {
                submit && submit.setAttribute("passive", "passive");
            }
        });

    submit &&
        submit.addEventListener("click", async event => {
            event.preventDefault();
            if (submit.getAttribute("passive")) {
                output && (output.innerText = errorMessages.check);
                return;
            }
            const length = mask?.unmaskedValue.length;
            if (length !== 11) {
                output && (output.innerText = errorMessages.phone);
                return;
            }
            try {
                const res = await ky.post("/mail.php", {
                    body: new FormData(form),
                });
                console.log(res);
            } catch (error) {
                output && (output.innerText = errorMessages.server);
            }
        });
}

function searchModal() {
    const { modal: modalEl, form, close } = createModal();

    form.classList.add("search-modal");

    form.innerHTML = `
        <input type="text">
        <div class="header__control header__control--search search-button"></div>
    `;

    form.append(close);

    modalEl.classList.add("modal");
    modalEl.append(form);

    document.body.append(modalEl);

    const handler = async () => {
        try {
            const res = await ky.post("/search.php", {
                body: new FormData(form),
            });
            console.log(res);
        } catch (error) {
            modal("error");
            await sleep(3000);
        }
    };

    const searchButton = document.querySelector<HTMLElement>(".search-button");
    const searchInput = document.querySelector<HTMLElement>(".search-modal > input");

    searchButton && searchButton.addEventListener("click", handler);
    searchInput &&
        searchInput.addEventListener("keypress", ({ key }: KeyboardEvent) => {
            console.log(key);
            if (key === "Enter") handler();
        });
}

function okModal(): HTMLElement {
    const { modal, form, close } = createModal();

    form.classList.add("form-modal");

    form.innerHTML = `
        <h2 style="text-align: center;">
            Не двигайтесь с места. Вам ща будут звонить. Ясно?
        </h2>
    `;

    form.append(close);

    modal.classList.add("modal");
    modal.append(form);

    document.body.append(modal);

    return modal;
}

function errorModal(): HTMLElement {
    const { modal, form, close } = createModal();

    form.classList.add("form-modal");

    form.innerHTML = `
        <h2 style="display: flex; flex-direction: column; row-gap: 10px; align-items: center;">
            <p style="text-align: center;">Все пошло ни так!</p>
            <p style="text-align: center;">Проблема не с нашей строны.</p>
            <p style="color: #f50; text-align: center;">Меняй провайдера!</p>  
        </h2>
    `;

    form.append(close);

    modal.classList.add("modal");
    modal.append(form);

    document.body.append(modal);

    return modal;
}
