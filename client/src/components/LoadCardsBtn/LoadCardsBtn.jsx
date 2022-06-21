import Loading from "../Loading/Loading"

export default ({ isLoad, onClick }) => {
    return (
        <button
            onClick={onClick}
            className="text-white bg-indigo-600 py-2 px-4 rounded-md flex items-center ring-indigo-500 ring-offset-2 focus:ring-2">
            {
                isLoad ? (
                    <>
                        <Loading />
                        Loading
                    </>
                ) : "Show more"
            }
        </button>
    )
}