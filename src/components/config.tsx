import { useEffect, useState } from 'react';
import { Button } from './button';
import { Input } from './input';

export function Config() {
	const [config, setConfig] = useState({
		username: '',
		twitchUsername: '',
		twitchOauth: '',
	});

	function saveConfig() {
		localStorage.setItem('config', JSON.stringify(config));
	}

	useEffect(() => {
		const savedConfig = localStorage.getItem('config');
		if (savedConfig) {
			setConfig(JSON.parse(savedConfig));
		}
	}, []);

	return (
		<div className='p-5 border border-white/10 rounded-lg bg-gray-950 mb-4'>
			<div className='flex gap-3 w-full'>
				<Input
					label='Twitch username'
					containerClassName='flex-1'
					defaultValue={config.username}
					onChange={(e) =>
						setConfig((config) => {
							return {
								...config,
								username: e.target.value,
							};
						})
					}
				/>
				<Input
					label='Bot Twitch username'
					containerClassName='flex-1'
					defaultValue={config.twitchUsername}
					onChange={(e) =>
						setConfig((config) => {
							return {
								...config,
								twitchUsername: e.target.value,
							};
						})
					}
				/>
				<Input
					label='Bot Twitch Oauth'
					type='password'
					defaultValue={config.twitchOauth}
					containerClassName='flex-1'
					onChange={(e) =>
						setConfig((config) => {
							return {
								...config,
								twitchOauth: e.target.value,
							};
						})
					}
				/>
			</div>
			<div className='flex justify-end w-full mt-3'>
				<Button onClick={saveConfig}>Save</Button>
			</div>
		</div>
	);
}
