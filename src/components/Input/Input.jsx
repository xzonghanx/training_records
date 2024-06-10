function Input({ type, onChange, name, value, id, minLength = 1, required }) {
	return (
		<input
			minLength={minLength}
			required={required}
			type={type}
			onChange={onChange}
			name={name}
			value={value}
			id={id}
			className='border-opacity-60 border-slate-500 border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex h-2 w-full rounded-md border px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 my-2'
		/>
	);
}

export default Input;
