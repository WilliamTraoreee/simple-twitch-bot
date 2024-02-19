import { ComponentPropsWithoutRef } from 'react';

interface Props extends ComponentPropsWithoutRef<'input'> {
	label?: string;
	containerClassName?: string;
}

export function Input(props: Props) {
	const { label, containerClassName = '', ...rest } = props;

	return (
		<label className={`flex flex-col gap-1 ${containerClassName}`}>
			{label && <span className='text-sm'>{label}</span>}
			<input
				{...rest}
				className={`h-10 border border-white/20 rounded bg-transparent outline-none px-3 transition-colors duration-200 ${rest.className}`}
				focus='border-blue-500'
			/>
		</label>
	);
}
