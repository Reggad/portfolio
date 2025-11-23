
const chatWrapper = document.getElementById("chatWrapper");
const openBtn = document.getElementById("openChatBtn");
const closeBtn = document.getElementById("closeChatBtn");

// فتح الشات
openBtn.onclick = () => {
    chatWrapper.style.display = "flex";
};

// إغلاق الشات
closeBtn.onclick = () => {
    chatWrapper.style.animation = "fadeOut 0.3s ease forwards";
    setTimeout(() => {
        chatWrapper.style.display = "none";
        chatWrapper.style.animation = "fadeIn 0.3s ease forwards";
    }, 300);
};

// بدء المحادثة
function startChat() {
    const name = document.getElementById("clientName").value.trim();
    const email = document.getElementById("clientEmail").value.trim();

    if (!name || !email) {
        alert("Please enter name and email");
        return;
    }

    document.getElementById("startScreen").style.display = "none";
    document.getElementById("chatBox").style.display = "flex";

    addBotMessage(`Welcome ${name}!`);
}
function sendMessage() {
    let input = document.getElementById("messageInput");
    let text = input.value.trim();
    if (!text) return;

    addUserMessage(text);

    // إرسال الرسالة إلى Django
    const name = document.getElementById("clientName").value.trim();
    const email = document.getElementById("clientEmail").value.trim();

    fetch("/save-message/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            name: name,
            email: email,
            message: text
        })
    });

    input.value = "";

    setTimeout(() => {
        addBotMessage("I received your message!");
    }, 700);
}


function addUserMessage(text) {
    let box = document.getElementById("messages");
    box.innerHTML += `<div class="msg me">${text}</div>`;
    box.scrollTop = box.scrollHeight;
}

function addBotMessage(text) {
    let box = document.getElementById("messages");
    box.innerHTML += `<div class="msg bot">${text}</div>`;
    box.scrollTop = box.scrollHeight;
}





const textElement = document.querySelector(".typing");


const texts = [
  "imo",
  "Full-Stack Developer",
  "Django Back-End ",
  "React Front-End ",
  "Creative Designer"
];

let index = 0;      
let charIndex = 0;  
let isDeleting = false;

function typeEffect() {
  const currentText = texts[index];

  if (!isDeleting) {
    // كتابة
    textElement.textContent = currentText.slice(0, charIndex++);
  } else {
    // مسح
    textElement.textContent = currentText.slice(0, charIndex--);
  }

  // اكتمال الكتابة → يبدأ الحذف
  if (!isDeleting && charIndex === currentText.length) {
    isDeleting = true;
    setTimeout(typeEffect, 1000);
    return;
  }

  // اكتمال المسح → الجملة التالية
  if (isDeleting && charIndex === 0) {
    isDeleting = false;
    index = (index + 1) % texts.length;
  }

  // سرعة الكتابة والمسح
  const speed = isDeleting ? 60 : 90;
  setTimeout(typeEffect, speed);
}

typeEffect();





