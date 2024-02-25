const fromText = document.querySelector(".from-text");
toText = document.querySelector(".to-text");
selectTag = document.querySelectorAll("select");
exchangeIcon = document.querySelector(".exchange");
translateBtn = document.querySelector("button"),
icons = document.querySelectorAll(".row i");

selectTag.forEach((tag, id) => {
    for (const country_code in countries) {
        let selected;
        if(id == 0 && country_code == "en-GB"){
            selected = "selected";
        } else if (id == 1 && country_code == "hi-IN"){
            selected = "selected";
        }
        let option = `<option value="${country_code}">${countries[country_code]}</option>`;
        tag.insertAdjacentHTML("beforeend", option); //adding options tag inside select tag
    }
});

exchangeIcon.addEventListener("click", () => {
    // exchanges the <textarea> values between the 2 text boxes.
    let exchangeText = fromText.value;
    fromText.value = toText.value;
    toText.value = exchangeText;

    // exchanges the <select> values between the 2 selected languages. 
    exchangeLang = selectTag[0].value;
    selectTag[0].value = selectTag[1].value;
    selectTag[1].value = exchangeLang;
});

translateBtn.addEventListener("click", () => {
    let text = fromText.value,
    translateFrom = selectTag[0].value, // getting fromSelect tag value
    translateTo = selectTag[1].value;   // getting toSelect tag value
    let apiUrl = `https://api.mymemory.translated.net/get?q=${text}&langpair=${translateFrom}|${translateTo}`;
    // fetching api response and returning it with parsing into js obj
    // add in another then method receiving that obj
    fetch(apiUrl).then(res => res.json()).then(data => {
        toText.value = data.responseData.translatedText;
    });
});

icons.forEach(icon => {
    icon.addEventListener("click", ({target}) => {
        if(target.classList.contains("fa-copy")) {
            console.log(target.classList)
            if(target.id == "from") {
                console.log("from copy icon clicked")
            } else {
                console.log("to copy icon clicked")
            } 
        } else {
            console.log("Speech icon clicked")
        }
    });
});

// 2.25.24 On youtube tutorial you are on 26:01.
// review classList method.