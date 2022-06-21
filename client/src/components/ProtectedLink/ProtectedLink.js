export const ProtectedLink = ({ children, isLoggedIn }) => {
    return isLoggedIn ? children : ""
}
export const AuthLink = ({ children, isLoggedIn }) => {
    return isLoggedIn ? "" : children
}

