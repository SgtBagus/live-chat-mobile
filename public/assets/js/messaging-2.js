/*=====================
    Messaging 2 Js
==========================*/
const msgerForm = get(".msger-inputarea");
const msgerInput = get(".msger-input");
const msgerChat = get(".msger-chat");

const BOT_MSGS = [
    "Hi, how are you?",
    "Ohh... I can't understand what you trying to say. Sorry!",
    "I like to play games... But I don't know how to play!",
    "Sorry if my answers are not relevant. :))",
    "I feel sleepy! :("
];

// Icons made by Freepik from www.flaticon.com
const BOT_IMG = "../assets/images/chatting/profile/1.png";
const PERSON_IMG = "../assets/images/chatting/profile/2.png";
const BOT_NAME = "Jack";
const PERSON_NAME = "Michael";

msgerForm.addEventListener("submit", event => {
    event.preventDefault();

    const msgText = msgerInput.value;
    if (!msgText) return;

    appendMessage(PERSON_NAME, PERSON_IMG, "right", msgText);
    msgerInput.value = "";

    botResponse();
});

function appendMessage(name, img, side, text) {
    // Simple solution for small apps
    const msgHTML = `
            <div class="msg ${side}-msg">
                <div class="msg-bubble">
                    <div class="chatting-box">
                        <div>
                            <div class="msg-text">${text}</div>
                            <div class="msg-time">Aug 5, 2022 at 4.15 PM</div>
                        </div>
                        <div class="msg-pay">$25</div>
                    </div>
                </div>
            </div>
            `;

    msgerChat.insertAdjacentHTML("beforeend", msgHTML);
    msgerChat.scrollTop += 500;
}

function botResponse() {
    const r = random(0, BOT_MSGS.length - 1);
    const msgText = BOT_MSGS[r];
    const delay = msgText.split(" ").length * 100;

    setTimeout(() => {
        appendMessage(BOT_NAME, BOT_IMG, "left", msgText);
    }, delay);
}

// Utils
function get(selector, root = document) {
    return root.querySelector(selector);
}

function formatDate(date) {
    const h = "0" + date.getHours();
    const m = "0" + date.getMinutes();

    return `${h.slice(-2)}:${m.slice(-2)}`;
}

function random(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}