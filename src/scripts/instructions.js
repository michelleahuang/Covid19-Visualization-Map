export default function instructions() {
    let instructionsButton = document.getElementById("instructions-button");

    instructionsButton.addEventListener("click", (e) => {
        e.preventDefault();
        let instructionsBox = document.getElementById("instructions");
        instructionsBox.classList.toggle("instructions-box-hidden")
    })
}