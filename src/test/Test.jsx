import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios';
import PockeCard from './components/PockeCard';
import { useDebounce } from './hooks/useDebounce';

function Test() {
	// 모든 포켓몬 데이터를 가지고 있는 state
	// 실제로 리스트를 보여주는 포켓몬 데이터를 가지고 있는 State
	// 한 번에 보여주는 포켓몬 수
	const [poketmons, setPoketmons] = useState([]);
	const [offset, setOffset] = useState(0);
	const [limit, setLimit] = useState(20);
	const [searchTerm, setSearchTerm] = useState('');
	// useDebounce hook 불러오기
	const debouncedSearchTerm = useDebounce(searchTerm, 500);

	useEffect(() => {
		fetchPoketData(true);
	}, []);

	useEffect(() => {
		handleSearchInput(debouncedSearchTerm);
	}, [debouncedSearchTerm]);

	const fetchPoketData = async (isFirstFetch) => {
		try {
			const offsetValue = isFirstFetch ? 0 : offset + limit;
			const apiUrl = `https://pokeapi.co/api/v2/pokemon/?limit=${limit}&offset=${offsetValue}`;
			const response = await axios.get(apiUrl);

			setPoketmons([...poketmons, ...response.data.results]);
			setOffset(offsetValue);
		} catch(error) {
			console.error(error);
		}
	};

	// 검색 Search Input handler
	const handleSearchInput = async (searchTerm) => {
		// 검색 시
		if (searchTerm.length > 0) {
			try {
				const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${searchTerm}`);
				const pokemonData = {
					url: `https://pokeapi.co/api/v2/pokemon/${response.data.id}`,
					name: searchTerm
				};
				setPoketmons([pokemonData]);	// 이름에 맞는 정확한 포켓몬만 보냄. (1마리만 검색)
			} catch (error) {
				setPoketmons([]);
				console.error(error);
			}
		} else {
			// 검색 안 할 시
			fetchPoketData(true);	// 처음 나와야 하는 포켓몬들
		}
	}

	return (
		<article className='pt-6'>
			<header className='flex flex-col gap-2 w-full px-4 z-50'>
				<div className='relative z-50'>
					<form className='relative flex justify-center items-center w-[20.5rem] h-6 rounded-lg m-auto'>
						<input 
							type="text" 
							className='text-xs w-[20.5rem] h-6 px-2 py-1 bg-slate-800 rounded-lg text-gray-300 text-center'
							onChange={(e) => setSearchTerm(e.target.value)}
							value={searchTerm}
						/>
						<button 
							type='submit' 
							className='text-xs bg-salte-900 text-slate-300 w-[2.5rem] h-6 px-2 py-1 rounded-r-lg text-center absolute right-0 hover:bg-slate-700'
						>
							검색
						</button>
					</form>
				</div>
			</header>
			<section className="pt-6 flex flex-col justify-content items-center overflow-auto z-0">
				<div className='flex flex-row flex-wrap gap-[16px] items-center justify-center px-2 max-w-4xl'>
					{poketmons.length > 0 ? 
						(
							poketmons.map(({url, name}) => (
								// list 나열 시 반드시, key 필요
								<PockeCard key={url} url={url} name={name} />
							))
						) : 
						(
							<h2 className='font-medium text-lg text-slate-900 mb-1'>
								포켓몬이 없습니다.
							</h2>
						)
					}
				</div>
			</section>
			<div className='text-center'>
				<button 
					className='bg-slate-800 px-6 py-2 my-4 text-base rounded-lg font-bold text-white'
					onClick={() => fetchPoketData(false)}
				>
					더 보기
				</button>
			</div>
		</article>
	)
}

export default Test