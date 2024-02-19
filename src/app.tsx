import { useEffect, useMemo, useState } from 'react';
import { Config } from './components/config';
import tmi from 'tmi.js';
import { Command } from './components/command';
import { Button } from './components/button';

function App() {
	const [connected, setConnected] = useState(false);
	const [commands, setCommands] = useState<
		{ name: string; response: string }[]
	>([]);

	function createCommand() {
		const currentCommands = localStorage.getItem('commands');
		const parsedCommands = currentCommands ? JSON.parse(currentCommands) : [];

		parsedCommands.push({
			name: 'test',
			response: 'test',
		});

		localStorage.setItem('commands', JSON.stringify(parsedCommands));
		setCommands(parsedCommands);
	}

	function changeCommand(name: string, response: string, index: number) {
		const currentCommands = localStorage.getItem('commands');
		const parsedCommands = currentCommands ? JSON.parse(currentCommands) : [];

		parsedCommands[index].name = name;
		parsedCommands[index].response = response;

		localStorage.setItem('commands', JSON.stringify(parsedCommands));
		setCommands(parsedCommands);
	}

	function deleteCommand(index: number) {
		const currentCommands = localStorage.getItem('commands');
		const parsedCommands = currentCommands ? JSON.parse(currentCommands) : [];

		parsedCommands.splice(index, 1);

		localStorage.setItem('commands', JSON.stringify(parsedCommands));
		setCommands(parsedCommands);
	}

	const twitch = useMemo(() => {
		const config = localStorage.getItem('config');

		if (!config) {
			console.log('No config');
			return;
		}

		const parsedConfig = JSON.parse(config);

		return new tmi.Client({
			channels: [parsedConfig.username],
			identity: {
				username: parsedConfig.twitchUsername,
				password: parsedConfig.twitchOauth,
			},
		});
	}, []);

	useEffect(() => {
		if (!twitch) return;

		twitch.connect();

		twitch.on('connected', () => {
			setConnected(true);
		});

		twitch.on('disconnected', () => {
			setConnected(false);
		});

		twitch.on('message', (channel, _, message) => {
			if (!message) return;

			const command = commands.find(
				(command: any) => `!${command.name}` == message
			);

			if (command) {
				twitch.say(channel, command.response);
			}
		});
	}, [commands]);

	useEffect(() => {
		const allCommands = localStorage.getItem('commands');
		const parsedCommands = allCommands ? JSON.parse(allCommands) : [];

		setCommands(parsedCommands);
	}, []);

	return (
		<div className='p-20'>
			<div className='flex justify-end mb-3'>
				{connected ? (
					<p className='px-2 py-1 bg-green-100 text-green-900 text-sm rounded font-medium'>
						Connected
					</p>
				) : (
					<p className='px-2 py-1 bg-red-100 text-red-900 text-sm rounded font-medium'>
						Not connected
					</p>
				)}
			</div>
			<Config />
			{commands.map((command, index) => (
				<Command
					key={index + command.name}
					index={index}
					name={command.name}
					response={command.response}
					onCommandChange={changeCommand}
					onCommandDelete={deleteCommand}
				/>
			))}
			<div className='mt-10 w-full flex justify-end'>
				<Button onClick={createCommand}>Add a command</Button>
			</div>
		</div>
	);
}

export default App;
