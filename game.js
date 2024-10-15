const dialog = document.querySelector("dialog");

document.querySelector(".new-game").addEventListener("click", () => dialog.showModal());
document.querySelector(".close-dialog").addEventListener("click", () => dialog.close());