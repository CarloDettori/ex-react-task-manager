import { NavLink } from "react-router-dom";
import T from "../../assets/blue-T.png"


export default function Header() {


    return (
        <header>
            <img id="logo" src={T} alt="" />

            <nav className="d-flex gap-4">


                <NavLink className="nav-link button" to="/">TaskList</NavLink>


                <NavLink className="nav-link button" to="/AddTask">AddTask</NavLink>


            </nav>

        </header >
    )
}