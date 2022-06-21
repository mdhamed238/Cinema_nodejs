import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"
import validator from "email-validator"
import Input from "../components/Input/Input"
import Button from "../components/Button/Button"
import Error from "../components/ValidationMgs/Error"
import ErrorAlert from "../components/Alert/ErrorAlert"
import Loading from "../components/Loading/Loading"



const Signup = () => {

    const [isLoad, setIsLoad] = useState(false)

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const [nameErr, setNameErr] = useState("")
    const [emailErr, setEmailErr] = useState("")
    const [passErr, setPassErr] = useState("")

    const [errMsg, setErrMsg] = useState("")

    const navigateTo = useNavigate()


    const handleSubmit = e => {
        e.preventDefault()

        setNameErr("")
        setEmailErr("")
        setPassErr("")

        // Error messages
        setErrMsg("")


        if (name.length < 3) setNameErr("Name must be at least 3 characters")
        else if (!validator.validate(email)) setEmailErr("Email is invalid")
        else if (password.length < 8) setPassErr("Password is invalid")
        else {

            setIsLoad(true)

            // Back end
            const data = {
                name,
                email,
                password
            }


            fetch("http://localhost:5000/api/users", {
                method: "POST",
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            }).then(function (response) {
                return response.json();
            }).then(function (data) {
                console.log(data);
                const { success, msg } = data
                if (success) {
                    setIsLoad(false)
                    setName("")
                    setEmail("")
                    setPassword("")
                    navigateTo("/login")
                } else {
                    setErrMsg(msg)
                    setIsLoad(false)
                }
            }).catch(err => {
                console.log(`%c${err}`, 'background-color: #777; padding: 1.5rem; color: red; font-weight: bold')
            });


            // axios.post("http://localhost:5000/api/users", { data }).then(async res => {

            //     console.log(res.data)
            //     const { success, msg } = res.data
            //     if (success) {
            //         setIsLoad(false)
            //         setName("")
            //         setEmail("")
            //         setPassword("")
            //     } else {
            //         setErrMsg(msg)
            //         setIsLoad(false)
            //     }
            // }).catch(err => console.log(`%c${err}`, 'background-color: green; padding: 1rem, color: red; font-weight: bold'));
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
                    Register
                </h2>
                <form
                    onSubmit={handleSubmit}
                    className="space-y-3">
                    <div>
                        <label className="text-gray-500 py-3 block">
                            Name
                        </label>
                        <Input
                            className="w-full"
                            type="text"
                            placeholder="Enter your name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <Error>
                            {nameErr}
                        </Error>
                    </div>
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
                        Already have an account? <Link to="/signup">
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

export default Signup;