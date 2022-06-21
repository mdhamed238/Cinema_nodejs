export default ({ children, className }) => (
    <span className={`${className} block mt-2 text-sm text-red-600`}>
        {children}
    </span>
)