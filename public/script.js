let input = document.getElementById("text");
let text = "*******";
document.addEventListener("keydown", () => type());

function type() {
	if (input.innerText == "ENTER") input.innerText = "";
	console.log("Key pressed");
	let currentLength = input.innerText.length;
	if (currentLength < text.length)
		return (input.innerText += text.charAt(currentLength));
	document.removeEventListener("keydown", type);
	document.querySelector("#instructions p").innerText = "PRESS [ENTER]";
	document.addEventListener("keydown", (event) => {
		if (event.key === "Enter") valid();
	});
}

function valid() {
	document.getElementById("container").classList.replace("button", "enter");
	setTimeout(() => {
		document.getElementById("container").style.display = "none";
		document.getElementById("message").style.display = "block";
	}, 400);
}


const socket = new WebSocket("ws://10.13.37.239:8080");

// Connection opened
socket.addEventListener("open", (event) => {
  socket.send("Hello Server!");
});

// Listen for messages
socket.addEventListener("message", (event) => {
  console.log("Message from server ", event.data);
});
