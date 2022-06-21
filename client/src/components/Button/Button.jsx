export default ({
    children,
    onClick,
    type,
}) => (
    <button
        onClick={onClick}
        type={type}
        className="flex items-center justify-center mt-3 w-full ring-offset-2 ring-indigo-500 focus:ring-2 outline-none px-4 py-3 bg-indigo-600 text-white shadow-md rounded-md hover:bg-indigo-700"
    >
        {children}
    </button>
)