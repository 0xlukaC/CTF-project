const net = require("net");

async function connectToPort(port) {
	return new Promise((resolve, reject) => {
		const client = new net.Socket();

		client.on("connect", () => {
			client.end();
			resolve(port);
		});

		client.on("error", (err) => {
			reject(err);
		});

		client.on("data", (data) => {
			console.log(data.toString());
		});

		client.connect(port, "localhost");
	});
}

async function findOpenPorts(portList) {
	const openPorts = [];

	for (const port of portList) {
		try {
			await connectToPort(port);
			openPorts.push(port);
		} catch (err) {
			console.log(`${port} is closed`);
		}
	}
	return openPorts;
}

// eg:
const portsToCheck = [1744, 1239, 1897, 1345, 1896, 1922];

findOpenPorts(portsToCheck)
	.then((openPorts) => {
		console.log("Open ports:", openPorts);
	})
	.catch((err) => {
		console.error("Error finding open ports:", err);
	});
