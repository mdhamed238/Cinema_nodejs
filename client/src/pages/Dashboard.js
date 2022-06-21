import { useState, useEffect } from "react"
import ListItem from "../components/List/ListItem";
import { getCookie } from './../auth/cookies';



const Dashboard = () => {
    const [movies, setMovies] = useState([])

    const token = getCookie('token')

    useEffect(() => {
        fetch("http://localhost:5000/api/users/me", {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(res => res.json())
            .then(data => setMovies(data.favoriteMovies))
    }, [])


    if (movies.length === 0) return (
        <div className="max-w-screen-sm absolute top-1/2 left-1/2 -translate-x-1/2">
            <h3 className="text-3xl text-slate-900 text-center">No favorite movies</h3>
        </div>
    )

    return (
        <div className="space-y-6 p-6">
            {
                movies.map(movie => {
                    return <ListItem key={movie._id} movie={movie} />
                })
            }
        </div>
    );
}

export default Dashboard;