export default ({
    placeholder,
    type,
    value,
    defaultValue,
    className,
    onChange
}) => (
    <input
        type={type}
        placeholder={placeholder}
        defaultValue={defaultValue}
        value={value}
        required
        onChange={onChange}
        className={`${className} p-3 border rounded-md outline-none focus:border-indigo-600`}
    />
)