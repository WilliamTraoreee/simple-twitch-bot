import { ComponentPropsWithoutRef } from 'react';

interface Props extends ComponentPropsWithoutRef<'button'> {
	children: React.ReactNode;
}

export function Button(props: Props) {
	const { children, ...rest } = props;

	return (
		<button
			hover='bg-blue-600'
			{...rest}
			className={`h-10 bg-blue-500 rounded px-3 border-blue-400 transition-colors duration-200 ${rest.className}`}
		>
			{children}
		</button>
	);
}
