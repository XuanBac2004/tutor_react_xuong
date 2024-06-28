import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import "./App.scss";
import AuthForm from "./components/AuthForm";
import Footer from "./components/Footer";
import Header from "./components/Header";
import About from "./pages/About";
import Dashboard from "./pages/admin/Dashboard";
import ProductForm from "./pages/admin/ProductForm";
import Home from "./pages/Home";
import Notfound from "./pages/Notfound";
import ProductDetail from "./pages/ProductDetail";
import PrivateRouter from "./components/PrivateRouter";


function App() {
	return (
		<>
			<Header />
			<main>
				<Routes>
					{/* path for client */}
					<Route index element={<Home  />} />
					<Route path="/home" element={<Navigate to="/" />} />
					<Route path="/data-detail/:id" element={<ProductDetail />} />
					<Route path="/about" element={<About />} />

					{/* path for admin */}
					<Route path="/admin" element={<PrivateRouter />}>
					<Route path="/admin" element={<Dashboard />} role = "admin"/>
					<Route path="/admin/product-form" element={<ProductForm  />} />
					<Route path="/admin/product-form/:id" element={<ProductForm  />} />
					</Route>

					{/* path empty */}
					<Route path="/register" element={<AuthForm isRegister />} />
					<Route path="/login" element={<AuthForm />} />
					<Route path="*" element={<Notfound />} />
				</Routes>
			</main>

			<Footer />
		</>
	);
}

export default App;
