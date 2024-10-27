let newAdviceButton = document.getElementById("advice-update");
let adviceId = document.querySelector(".advice-number");
let currentAdvice = document.querySelector(".advice");

async function getAdvices() {
    try {
        const response = await fetch("https://api.adviceslip.com/advice")
        if (!response.ok){
            throw new Error("An error occured while trying to fetch the API's information!");
        }

        const adviceContent = await response.json();
        const newAdviceId = `Advice #${adviceContent.slip.id}`;
        const newAdviceText = `"${adviceContent.slip.advice}"`;

        if(newAdviceText.length > 87 && !currentAdvice.classList.contains("long-advice")) {
            currentAdvice.classList.add("long-advice")
            newAdviceButton.classList.add("long-advice-button")
            newAdviceButton.classList.remove("short-advice")
        } else if (newAdviceText.length < 30 && !newAdviceButton.classList.contains("short-advice")) {
            newAdviceButton.classList.add("short-advice")
            currentAdvice.classList.remove("long-advice")
            newAdviceButton.classList.remove("long-advice-button")
        } else {
            currentAdvice.classList.remove("long-advice")
            newAdviceButton.classList.remove("long-advice-button")
            newAdviceButton.classList.remove("short-advice")
        }        

        adviceId.innerText = newAdviceId;
        currentAdvice.innerText = newAdviceText;
    
    } catch (error) {
        console.error("Error while trying to fetch API's information", error);
    }
}

newAdviceButton.addEventListener("click", getAdvices);