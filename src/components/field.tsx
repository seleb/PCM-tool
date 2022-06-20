import { h, ComponentProps } from 'preact';
import { useCallback, useEffect } from 'preact/hooks';
import './field.css';

export default function Field({
	field = '',
	value = 0,
	defaultValue = 0,
	setState,
}: {
	field?: string;
	value?: number;
	defaultValue?: number;
	setState: (field: string, value: number) => void;
}) {
	const onChange = useCallback<NonNullable<ComponentProps<'input'>['onChange']>>(({
		currentTarget: {
			value: newValue,
		},
	}) => {
		setState(field, (isNaN(parseFloat(newValue)) || !newValue) ? defaultValue : Math.floor(Number(newValue)));
	}, []);

	useEffect(() => {
		// @ts-ignore
		onChange({currentTarget:{value}});
	}, []);

	return (
		<div class="field">
			<label for={field}>{field}:</label>
			<input type="text" id={field} name={field} value={value} onChange={onChange} />
		</div>
	);
}
