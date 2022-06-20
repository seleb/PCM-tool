import { h, ComponentProps } from 'preact';
import { useCallback } from 'preact/hooks';
import './input.css';

export default function Input({
	formula,
	setFormula,
}: {
	formula: string;
	setFormula: (formula: string) => void;
}) {
	const onChange = useCallback<NonNullable<ComponentProps<'textarea'>['onChange']>>(event => setFormula(event.currentTarget.value), [])
	return (
		<textarea cols={50} rows={5} id="audio" type="text" onChange={onChange} value={formula} />
	);
}
