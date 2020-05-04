const addRoom = document.querySelector("#newRoomBtn");
const addForm = document.querySelector("#addRoomContainer");

console.log(addRoom);

addRoom.addEventListener("click", function() {
  addForm.classList.toggle("invisible");
});
