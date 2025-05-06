const $text = document.querySelector(".typing .typetext");
const letters = [
    "Graphic & Package Designer",
    "Web Developer"
];

const speed = 30;
let i = 0;
const typing = async () => {
    const letter = letters[i].split("");
    let text = "";
    while (letter.length) {
        await wait(speed);
        text += letter.shift();
        $text.textContent = text;
    }

    await wait(1000);
    remove();
}

const remove = async () => {
    const letter = letters[i].split("");
    let text = letters[i];
    while (letter.length) {
        await wait(speed);
        letter.pop();
        text = letter.join("");
        $text.textContent = text;
    }

    i = !letters[i+1] ? 0 : i + 1;
    typing();
}

function wait(ms) {
    return new Promise(res => setTimeout(res, ms))
}

setTimeout(typing, 1000);