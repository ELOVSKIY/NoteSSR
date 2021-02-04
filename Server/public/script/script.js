const inputBox = document.querySelector(".inputField input");

function add() { //when user click on plus icon button
    let description = inputBox.value
    if (description !== "") {
        location.href = "/add?description=".concat(description)
        description.value = ""
    }
}
