import React from 'react'
import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom'
import MainPage from './pages/MainPage/index'
import DetailPage from './pages/DetailPage/index'
import LoginPage from './pages/LoginPage'
import NavBar from './components/NavBar'

const Layout = () => {
	return (
		<>
			<NavBar />
			<br />
			<br />
			<br />
			<Outlet />
		</>
	)
}

const App = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path='/' element={<Layout />}>
					<Route index element={<MainPage />} />
					<Route path='login' element={<LoginPage />}></Route>
					<Route path='/pokemon/:id' element={<DetailPage />}></Route>
				</Route>
			</Routes>
		</BrowserRouter>
	)
}

export default App