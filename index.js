const express = require("express");
const app = express();

const randNum = (max, min) => Math.floor(Math.random() * (max - min + 1)) + min;
app.use(express.static("public")); // uses the public folder for static files
// randomise port 3000 - 3500
app.listen(3000);
// let randnumber = randNum(3010, 3000);
// app.listen(randnumber);

const net = require("net");

let arr = [];
let sending;

async function findOpenPort(startPort) {
	let port = startPort;

	while (true) {
		try {
			let inUse = await checkPort(port);
			if (!inUse) break;
			else port++;
		} catch (error) {
			port++;
		}
	}
	return port;
}

async function randPorts(ws, n) {
	sending = randNum(0, n);
	for (let i = 0; i < n; i++) {
		let randp = await findOpenPort(randNum(2000, 1000));

		ws.send(randp.toString());
		if (i == sending) sending = randp;
		arr.push(randp);
	}

	arr.forEach((element) => {
		console.log(element);
	});
	broadcast(arr, sending);
}

// checks if port is in use

function checkPort(port) {
	return new Promise((resolve, reject) => {
		let tester = net.createServer();

		tester.once("error", (err) => {
			if (err.code === "EADDRINUSE") resolve(true);
			else reject(err); // some other error (may delete l8er)
		});

		tester.once("listening", () => {
			tester.close();
			resolve(false);
		});
		tester.listen(port);
	});
}

function broadcast(arr, flagPort) {
	let falses = Math.round(arr.length / 4);
	console.log("yo");
	arr.forEach((port) => {
		const tcpServer = net.createServer((socket) => {
			console.log(`client connected to TCP server on port ${port}`);
		});

		tcpServer.listen(port, () => {
			console.log(`TCP server listening on port ${port}`);
		});

		tcpServer.on("connection", (socket) => {
			if (port == flagPort) socket.write("CTF{SUPERHOT}");
			else {
				if (falses != 0) {
					falses--;
					tcpServer.close();
				}
				socket.write("wrong port");
			}
		});
	});
}

const { WebSocketServer } = require("ws");

const wss = new WebSocketServer({ port: 8080 });

wss.on("connection", function connection(ws) {
	ws.on("error", console.error);

	//randPorts(ws, Math.ceil(70 / (780 / 60)));
	ws.on("message", function message(data) {
		console.log("Time: %s", data / 60, 70 / (data / 60));

		if (typeof arr != "undefined" && arr.length == 0)
			randPorts(ws, Math.ceil(70 / (data / 60)));
		else
			arr.forEach((element) => {
				ws.send(element);
			});
	});
	//ws.send("connected");
});
