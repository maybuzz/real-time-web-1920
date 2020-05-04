const addRoom = document.querySelector("#newRoomBtn");
const addForm = document.querySelector("#addRoomContainer");

addRoom.addEventListener("click", function() {
  addForm.classList.toggle("invisible");
});
