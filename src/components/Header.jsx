import { Link, useNavigate } from "react-router-dom";

export default function Header() {
	const user = JSON.parse(localStorage.getItem("user"));
	const email = user ? user.user.email : null;
	const nav = useNavigate()
	const logout = () => {
		localStorage.removeItem("user")
		nav("/login")
	}
	return (
		<header>
			<ul>
				<li>
					<Link to="/">Home</Link>
				</li>
				<li>
					<Link to="/about">About</Link>
				</li>
				<li>
					<Link to="/products">Shop</Link>
				</li>
				<li>
					<Link to="/register">Register</Link>
				</li>
				{email ? (<li>	
					<button onClick={logout}>
						Hello {email}
						Logout
					</button>
				</li>) : (<li>
					<Link to="/login">Login</Link>
				</li>)}
				<input class="form-control" id="form-control" type="text" placeholder="Readonly input here…" />
				<button className="btn btn-warning">search</button>
					
			</ul>
			
		</header>
	);
}
