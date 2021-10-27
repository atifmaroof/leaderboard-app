import { Link } from "react-router-dom"

function Header() {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <Link className="navbar-brand" to="/">Leader Board</Link>
            <Link className="navbar-brand" to="/add-user">Add User</Link>
        </nav>
    );
}

export default Header;
