const modal = document.querySelector(".modal");
const modalOpenButton = document.querySelector(".open-modal__button");

const form = document.querySelector("form");
const submitButton = document.querySelector(".form__submit-button");

// form.addEventListener("input", () => {
//     console.log(form.checkValidity());
//     if (form.checkValidity()) {
//         submitButton.disabled = false;
//     } else {
//         submitButton.disabled = true;
//     }
// });

const checkFormValidity = () => {
    if (form.checkValidity()) {
        submitButton.disabled = false;
    } else {
        submitButton.disabled = true;
    }
};

form.addEventListener("input", checkFormValidity);

document.addEventListener("DOMContentLoaded", checkFormValidity);

const outsideClickHandling = (event) => {
    const target = event.target;
    if (!target.closest(".modal__content")) {
        closeModal();
    }
};

const closeModal = (event) => {
    modal.classList.add("modal-closed");
    document.removeEventListener("click", outsideClickHandling);
};

const modalOpenButtonHandling = (event) => {
    if (modal.classList.contains("modal-closed")) {
        modal.classList.remove("modal-closed");
        event.stopPropagation();
        document.addEventListener("click", outsideClickHandling);
    }
};

modalOpenButton.addEventListener("click", modalOpenButtonHandling);

const phoneInput = document.querySelector("input[type='tel']");

const prefixNumber = (str) => {
    if (str === "7") {
        return "7 ";
    }
    if (str === "8") {
        return "8 ";
    }
    if (str === "9") {
        return "7 9";
    }
    return "7 ";
};

phoneInput.addEventListener("input", (e) => {
    const value = phoneInput.value.replace(/\D+/g, "");
    const numberLength = 11;

    let result;
    if (phoneInput.value.includes("+8") || phoneInput.value[0] === "8") {
        result = "";
    } else {
        result = "+";
    }

    for (let i = 0; i < value.length && i < numberLength; i++) {
        switch (i) {
            case 0:
                result += prefixNumber(value[i]);
                continue;
            case 4:
                result += " ";
                break;
            case 7:
                result += "-";
                break;
            case 9:
                result += "-";
                break;
            default:
                break;
        }
        result += value[i];
    }
    phoneInput.value = result;
});
