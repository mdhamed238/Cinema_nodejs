import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import CTA from '../components/CTA/CTA'
import Footer from '../components/Footer/Footer'
import ListItem from '../components/List/ListItem'
import Card from "../components/Card/Card"
import baseUrl from './../url';



const Home = () => {
    const [modalVisible, setModalVisible] = useState(true)
    const [movies, setMovies] = useState([])

    const navigate = useNavigate()
    

    useEffect(() => {
        fetch(baseUrl + "/api/movies")
            .then(res => res.json())
            .then(data => setMovies(data))
    }, [])



    return (
        <>
        <div className="space-y-6 p-6">
          {
                movies.map(movie => {
                    return <ListItem key={movie._id} movie={movie} />
                })
            }  
        </div>
            
        </>
    );
}

export default Home;