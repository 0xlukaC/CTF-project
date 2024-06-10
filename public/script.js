let input = document.getElementById("text");
let text = "*******";
let finished = false;
let counter = 1;
setInterval(() => {
	counter++;
}, 1000);
document.addEventListener("keydown", () => type());

function type() {
	if (input.innerText == "ENTER") input.innerText = "";
	let currentLength = input.innerText.length;
	if (currentLength < text.length)
		return (input.innerText += text.charAt(currentLength));
	document.removeEventListener("keydown", type);
	document.querySelector("#instructions p").innerText = "PRESS [ENTER]";
	if (!finished) {
		finished = true;
		document.addEventListener("keyup", (event) => {
			if (event.key === "Enter") valid();
		});
	}
}

function valid() {
	console.log("validated");
	document.getElementById("container").classList.replace("button", "enter");
	setTimeout(() => {
		document.getElementById("container").style.display = "none";
		document.getElementById("message").style.display = "block";
		// socket.send(counter);
		socket.send(780);
		console.log("counter", counter);
	}, 400);
}

const socket = new WebSocket("ws://localhost:8080");

socket.addEventListener("open", (event) => {});
