import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components'
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, signOut } from 'firebase/auth'
import app from '../firebase'

// 데이터 유지를 위해 state에 세팅
const initialUserData = localStorage.getItem('userData') 
	? JSON.parse(localStorage.getItem('userData'))
	: {};

const NavBar = () => {
	// 로그인 구현
	const auth = getAuth(app); // 이미 firebase.js 에서 생성됨.
	const provider = new GoogleAuthProvider();

	const [show, setShow] = useState(false);
	const listener = () => {
		if (window.scrollY > 50) {
			setShow(true);
		} else {
			setShow(false);
		}
	};
	
	const [userData, setUserData] = useState(initialUserData);
	const { pathname } = useLocation();

	useEffect(() => {
		window.addEventListener('scroll', listener);

		return () => {
			window.removeEventListener('scroll', listener);
		}
	}, []);

	// 로그인 관련 함수
	const handleAuth = () => {
		signInWithPopup(auth, provider)
		.then(result => {
			setUserData(result.user);
			localStorage.setItem('userData', JSON.stringify(result.user));
		})
		.catch(error => console.error(error));
	};

	const navigate = useNavigate();
	
	// pathname 변경 시, 호출될 수 있도록
	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			if (!user) {
				navigate('/login');
			} else if (user && pathname === '/login') {
				navigate('/');
			}
		});

		return () => {
			unsubscribe();
		}
	}, [pathname]);

	// 로그아웃
	// firebase에서 제공
	const handleLogout = () => {
		signOut(auth).then(() => {
			setUserData({});
		})
		.catch(error => {
			alert(error.message);
		});
	}

	return (
		<NavWrapper show={show}>
			<Logo>
				<Image
					src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png"
					alt="poke img"
					onClick={() => (window.location.href = '/')}
				/>
			</Logo>
			{pathname === '/login' ? (
					<Login
						onClick={handleAuth}
					>로그인</Login>
				) : (
					<SignOut>
						<UserImg
							src={userData.photoURL}
							alt="user photo"
						/>
						<Dropdown>
							<span onClick={handleLogout}>Sign Out</span>
						</Dropdown>
					</SignOut>
				)
			}
		</NavWrapper>
	)
}

// Styled Components
const NavWrapper = styled.nav`
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	display: flex;
	align-items: center;
	justify-content: space-between;
	height: 70px;
	padding: 0 36px;
	background-color: ${props => props.show ? "#090b13" : "transparent"};
	letter-spacing: 16px;
	z-index: 100;
`;

const Logo = styled.a`
	width: 50px;
	margin-top: 4px;
	padding: 0;
`;

const Image = styled.img`
	width: 100%;
	cursor: pointer;
`;

const Login = styled.a`
	padding: 8px 16px;
	background-color: rgba(0, 0, 0, .6);
	border: 1px solid #f9f9f9;
	border-radius: 4px;
	text-transform: uppercase;
	color: #ffffff;
	letter-spacing: 1.5px;
	transition: .2s ease;

	&:hover {
		background-color: #f9f9f9;
		border-color: transparent;
		color: #000;
	}
`;

const Dropdown = styled.div`
	position: absolute;
	top: 48px;
	right: 0;
	width: 150px;
	padding: 10px;
	opacity: 0;
	background-color: rgba(19, 19, 19, 1);
	border: 1px solid rgba(151, 151, 151, .34);
	border-radius: 4px;
	box-shadow: rgb(0 0 0 / 50%) 0 0 18px 0;
	font-size: 14px;
	letter-spacing: 3px;
	color: #ffffff;
`;

const SignOut = styled.div`
	position: relative;
	display: flex;
	align-items: center;
	justify-content: center;
	width: 48px;
	height: 48px;
	cursor: pointer;

	&:hover {
		${Dropdown} {
			opacity: 1;
			transition-duration: 1s;
		}
	}
`;

const UserImg = styled.img`
	width: 100%;
	height: 100%;
	border-radius: 50%;
`;

export default NavBar