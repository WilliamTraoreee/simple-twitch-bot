import { Button } from './button';
import { Input } from './input';

interface Props {
	name: string;
	response: string;
	index: number;
	onCommandChange: (name: string, response: string, index: number) => void;
	onCommandDelete: (index: number) => void;
}

export function Command(props: Props) {
	const { name, response, onCommandChange, onCommandDelete, index } = props;

	return (
		<div className='p-3 rounded-lg bg-gray-950 mb-1'>
			<div className='flex items-center gap-3'>
				<div className='flex items-center gap-1'>
					<span>!</span>
					<input
						type='text'
						defaultValue={name}
						onBlur={(e) => onCommandChange(e.target.value, response, index)}
						className='border-b border-gray-700 text-white h-10 outline-none flex items-end p-0 bg-transparent'
						focus='border-blue-500'
					/>
				</div>
				<Input
					containerClassName='flex-1'
					defaultValue={response}
					onBlur={(e) => onCommandChange(name, e.target.value, index)}
				/>
				<Button
					className='bg-red-500'
					hover='bg-red-600'
					onClick={() => onCommandDelete(index)}
				>
					Delete
				</Button>
			</div>
		</div>
	);
}
