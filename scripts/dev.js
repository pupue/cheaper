import { exec } from 'child_process';
import { networkInterfaces } from 'os';

const nets = networkInterfaces();
let localIp = 'localhost';

for (const name of Object.keys(nets)) {
	const netInfos = nets[name];
	if (!netInfos) continue;

	for (const net of netInfos) {
		if (net.family === 'IPv4' && !net.internal) {
			localIp = net.address;
			break;
		}
	}
}

const port = 3008;

console.log(`🚀 http://${localIp}:${port}`);

exec(
	`npx next dev -H ${localIp} -p ${port}`,
	(error, stdout, stderr) => {
		if (error) {
			console.error(`エラー: ${stderr}`);
			return;
		}
		console.log(stdout);
	}
);
