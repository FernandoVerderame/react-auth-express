import { NavLink } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

const Navbar = () => {

    const { isLoggedIn, logout } = useAuth();

    return (
        <nav className="navbar navbar-expand-lg bg-secondary-subtle px-5">
            <div className="container-fluid">
                <NavLink className="navbar-brand" to={'/'}>Blog</NavLink>
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                        <NavLink className="nav-link" to={'/'}>Home</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to={'/posts'}>Posts</NavLink>
                    </li>
                </ul>
                {!isLoggedIn &&
                    <NavLink to={`/login`} className="btn btn-primary">Login</NavLink>
                }
                {isLoggedIn &&
                    <button onClick={logout} className="btn btn-secondary">Logout</button>
                }
            </div>
        </nav>
    );
}

export default Navbar;