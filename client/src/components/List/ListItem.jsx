import { useState, useEffect, useRef } from 'react'
import { getCookie } from './../../auth/cookies'


export default function ListItem({ movie }) {
    const [isFavorite, setIsFavorite] = useState(false)
    const Movie = useRef(null)

    const token = getCookie('token')


    const checkFavorite = (id) => {
        fetch('http://localhost:5000/api/users/me', {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.favoriteMovies.indexOf(id) > -1) setIsFavorite(true)
                else setIsFavorite(false)
            })
    }


    useEffect(() => {
        checkFavorite(movie._id)
    }, [])

    useEffect(() => {
        if (!Movie.current) return
        const bodyContent = JSON.stringify(
            { id: Movie.current }
        )
        console.log(bodyContent);
        fetch("http://localhost:5000/api/users/favorite-movies", {
            method: "POST",
            body: bodyContent,
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
            .then(res => res.json())
            .then(data => console.log(data))
    }, [Movie.current])



    return (
        <article className="flex items-start space-x-6 p-6 bg-white rounded-md">
            <img src={movie.Images[0]} alt="" width="60" height="88" className="flex-none rounded-md bg-slate-100" />
            <div className="min-w-0 relative flex-auto">
                <h2 className="font-semibold text-slate-900 truncate pr-20">{movie.Title}</h2>
                <div className="mt-2 flex flex-wrap text-sm leading-6 font-medium">
                    <div className="absolute top-0 right-0 flex items-center space-x-1">
                        <dt className="text-sky-500">
                            <span className="sr-only">Star rating</span>
                            <svg width="16" height="20" fill="currentColor">
                                <path d="M7.05 3.691c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.372 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.539 1.118l-2.8-2.034a1 1 0 00-1.176 0l-2.8 2.034c-.783.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.363-1.118L.98 9.483c-.784-.57-.381-1.81.587-1.81H5.03a1 1 0 00.95-.69L7.05 3.69z" />
                            </svg>
                        </dt>
                        <dd>{movie.imdbRating}</dd>
                    </div>
                    <button
                        className={`absolute top-10 right-5 ${isFavorite ? "text-sky-500" : ""}`}
                        onClick={() => {
                            setIsFavorite(!isFavorite)
                            Movie.current = movie._id
                        }}
                    >
                        {
                            isFavorite ?
                                <svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24" width="20" height="20">
                                    <path d="M17.5.917a6.4,6.4,0,0,0-5.5,3.3A6.4,6.4,0,0,0,6.5.917,6.8,6.8,0,0,0,0,7.967c0,6.775,10.956,14.6,11.422,14.932l.578.409.578-.409C13.044,22.569,24,14.742,24,7.967A6.8,6.8,0,0,0,17.5.917Z" />
                                </svg>
                                : <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20"><g id="_01_align_center" data-name="01 align center"><path d="M17.5.917a6.4,6.4,0,0,0-5.5,3.3A6.4,6.4,0,0,0,6.5.917,6.8,6.8,0,0,0,0,7.967c0,6.775,10.956,14.6,11.422,14.932l.578.409.578-.409C13.044,22.569,24,14.742,24,7.967A6.8,6.8,0,0,0,17.5.917ZM12,20.846c-3.253-2.43-10-8.4-10-12.879a4.8,4.8,0,0,1,4.5-5.05A4.8,4.8,0,0,1,11,7.967h2a4.8,4.8,0,0,1,4.5-5.05A4.8,4.8,0,0,1,22,7.967C22,12.448,15.253,18.416,12,20.846Z" /></g></svg>

                        }
                    </button>
                    <div>
                        <dt className="sr-only">Rating</dt>
                        <dd className="px-1.5 ring-1 ring-slate-200 rounded">{movie.Rated}</dd>
                    </div>
                    <div className="ml-2">
                        <dt className="sr-only">Year</dt>
                        <dd>{movie.Year}</dd>
                    </div>
                    <div>
                        <dt className="sr-only">Genre</dt>
                        <dd className="flex items-center">
                            <svg width="2" height="2" fill="currentColor" className="mx-2 text-slate-300" aria-hidden="true">
                                <circle cx="1" cy="1" r="1" />
                            </svg>
                            {movie.Genre}
                        </dd>
                    </div>
                    <div>
                        <dt className="sr-only">Runtime</dt>
                        <dd className="flex items-center">
                            <svg width="2" height="2" fill="currentColor" className="mx-2 text-slate-300" aria-hidden="true">
                                <circle cx="1" cy="1" r="1" />
                            </svg>
                            {movie.Runtime}
                        </dd>
                    </div>
                    <div className="flex-none w-full mt-2 font-normal">
                        <dt className="sr-only">Cast</dt>
                        <dd className="text-slate-400">{movie.Actors}</dd>
                    </div>
                </div>
            </div>
        </article>
    )
}