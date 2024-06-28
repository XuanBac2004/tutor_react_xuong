import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { ProductContext } from "../../contexts/productContext";
import instance from "../../axios";


const Dashboard = () => {
	const { state, dispatch } = useContext(ProductContext)
	console.log(state)
	const Remove = async (id) => {
		confirm("re you want to del this product?")
		await instance.delete(`/products/${id}`)
		dispatch ({type : "DELETE_PRODUCTS",payload : id })
	}
	return (
		<div>
			<h1>Hello, admin</h1>
			<Link to="/admin/product-form" className="btn btn-primary">
				Add new product
			</Link>

			<div className="search-bar">
				<input
					type="text"
					placeholder="Search by title..."
					className="form-control"
				    id="form-control1"
				/>
			</div>

			<table className="table table-bordered table-striped text-center">
				<thead>
					<tr>
						<th>ID</th>
						<th>Title</th>
						<th>Price</th>
						<th>Description</th>
						<th>Thumbnail</th>
						<th>Action</th>
					</tr>
				</thead>
				<tbody>
					{state.products.map((p) => (
						<tr key={p.id}>
							<td>{p.id}</td>
							<td>{p.title}</td>
							<td>{p.price}</td>
							<td>{p.description || "Dang cap nhat"}</td>
							<td>{p.thumbnail ? <img src={p.thumbnail} width={"100px"} alt="Dang cap nhat" /> : "Dang cap nhat"}</td>
							<td>
								<button className="btn btn-danger" onClick={() => Remove(p.id)}>
									Delete
								</button>
								<Link to={`/admin/product-form/${p.id}`} className="btn btn-warning">
									Edit
								</Link>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default Dashboard;
