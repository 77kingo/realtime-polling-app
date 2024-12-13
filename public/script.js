const socket = io();

socket.on("pollData", (data) => {
  updateResults('option1', data.option1);
  updateResults('option2', data.option2);
  updateResults('option3', data.option3);
});

function vote(option) {
  socket.emit("vote", option);
}

function updateResults(option, value) {
  const bar = document.getElementById(`${option}-bar`);
  const span = document.getElementById(option);
  span.innerText = value;
  bar.style.width = `${Math.min(value, 100)}%`; // Ensure the bar does not exceed 100%
}
