import Nav from '../Nav/Nav'
import NavItem from '../Nav/NavItem'
import List from '../List/List'
import ListItem from '../List/ListItem'

export default function Movies({ movies }) {
    return (
        <div className="divide-y divide-slate-100">
            <Nav>
                <NavItem href="#" isActive>New Releases</NavItem>
                <NavItem href="#">Top Rated</NavItem>
                <NavItem href="#">Vincent’s Picks</NavItem>
            </Nav>
            <List>
                {movies.map((movie) => (
                    <ListItem key={movie._id} movie={movie} />
                ))}
            </List>
        </div>
    )
}