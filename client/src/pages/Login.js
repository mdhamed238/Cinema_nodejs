import { useState } from "react"
import { Link, useNavigate } from "react-router-dom";
import axios from "axios"
import validator from "email-validator"
import Input from "../components/Input/Input"
import Button from "../components/Button/Button"
import Error from "../components/ValidationMgs/Error"
import ErrorAlert from "../components/Alert/ErrorAlert"
import Loading from "../components/Loading/Loading"
import { setTokenCookie } from "../auth/cookies"



const Login = () => {

    const [isLoad, setIsLoad] = useState(false)

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const [emailErr, setEmailErr] = useState("")
    const [passErr, setPassErr] = useState("")

    const [errMsg, setErrMsg] = useState("")

    const navigateTo = useNavigate()




    const handleSubmit = e => {
        e.preventDefault()

        setEmailErr("")
        setPassErr("")

        // Error messages
        setErrMsg("")

        if (!validator.validate(email)) setEmailErr("Email is not valid")
        else if (password.length < 8) setPassErr("Password must be at least 8 characters")
        else {

            setIsLoad(true)



            fetch('http://localhost:5000/api/users/login', {
                method: 'POST',
                body: JSON.stringify({ email, password }),
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            }).then(res => {
                return res.json();
            }).then(data => {
                const { empty, msg, user } = data
                if (!empty) {
                    setIsLoad(false)

                    setEmail("")
                    setPassword("")

                    setTokenCookie(user.token)

                    // navigate(`/dashboard/${user._id}`)
                    navigateTo('/')
                } else {
                    setErrMsg(msg)
                    setIsLoad(false)
                }
            }).catch(err => {
                console.log(`%c${err}`, 'background-color: #777; padding: 1.5rem; color: red; font-weight: bold')
            });

            // axios.post('http://localhost:5000/api/users/login', { email, password }).then(async res => {
            //     const { empty, msg, user } = res.data
            //     if (empty) {
            //         setIsLoad(false) 
            //     } else {

            //         setIsLoad(false)

            //         setEmail("")
            //         setPassword("")


            //         setTokenCookie(user.token)

            //         // navigate(`/dashboard/${user._id}`)
            //         navigate('/')
            //     }
            // })
        }
    }


    return (
        <>
            {
                errMsg.length != 0 ? (
                    <ErrorAlert
                        msg={errMsg}
                        onClick={() => setErrMsg("")}
                    />
                ) : ''
            }

            <div className="mt-24 max-w-2xl mx-4 p-4 bg-white rounded-md shadow sm:p-8 sm:mx-auto">
                <h2 className="text-3xl font-semibold text-center py-4">
                    Login
                </h2>
                <form
                    onSubmit={handleSubmit}
                    className="space-y-3">
                    <div>
                        <label className="text-gray-500 py-3 block">
                            Email
                        </label>
                        <Input
                            className="w-full"
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <Error>
                            {emailErr}
                        </Error>
                    </div>
                    <div>
                        <label className="text-gray-500 py-3 block">
                            Password
                        </label>
                        <Input
                            className="w-full"
                            type="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <Error>
                            {passErr}
                        </Error>
                    </div>
                    <Link to="/forget">
                        <a className="text-indigo-600">
                            Forget your password?
                        </a>
                    </Link>
                    <div>
                        <Button
                            type="submit"
                        >
                            {
                                isLoad ? (
                                    <Loading />
                                ) : ''
                            }
                            Submit
                        </Button>
                    </div>
                    <div className="text-gray-500">
                        Don't have an account? <Link to="/signup">
                            <a className="text-indigo-600">
                                Sign Up
                            </a>
                        </Link>
                    </div>
                </form>
            </div>
        </>
    );
}

export default Login;