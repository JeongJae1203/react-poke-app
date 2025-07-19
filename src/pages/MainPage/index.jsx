import { useEffect, useState } from 'react'
import axios from 'axios';
import PockeCard from '../../components/PockeCard';
import AutoComplete from '../../components/AutoComplete';

const MainPage = () => {
	// 모든 포켓몬 데이터를 가지고 있는 state
	const [allPokemons, setAllPokemons] = useState([]);
	// 실제로 리스트를 보여주는 포켓몬 데이터를 가지고 있는 State
	const [displayedPokemons, setDisplayedPokemons] = useState([]);
	// 한 번에 보여주는 포켓몬 수 (limitNum)
	const limitNum = 20;
	const apiUrl = `https://pokeapi.co/api/v2/pokemon/?limit=1008&offset=0`;

	useEffect(() => {
		fetchPoketData();
	}, []);

	// 호출 시점 : 처음
	const filterDisplayedPokemonData = (allPokemonsData, displayedPokemons = []) => {
		const limit = displayedPokemons.length + limitNum;	// 최초 20개 표출
		// 모든 포켓몬 데이터에서 limitNum 만큼 더 가져오기
		// limit 변수에 지정된 숫자보다 작거나 같을 때만 true가 되어, 해당 요소가 새로운 배열에 포함
		// allPokemonsData.slice(0, limit)과 동일한 수행
		const array = allPokemonsData.filter((pokemon, index) => index + 1 <= limit);

		return array;
	};

	const fetchPoketData = async () => {
		try {
			// 1008개의 포켓몬 데이터 받아오기
			const response = await axios.get(apiUrl);
			// 모든 포켓몬 데이터 기억하기
			setAllPokemons(response.data.results);
			// 실제로 화면에 보여 줄 포켓몬 리스트 기억하는 state
			setDisplayedPokemons(filterDisplayedPokemonData(response.data.results));
		} catch(error) {
			console.error(error);
		}
	};

	// 검색 Search Input handler
	// const handleSearchInput = async (searchTerm) => {
	// 	// 검색 시
	// 	if (searchTerm.length > 0) {
	// 		try {
	// 			const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${searchTerm}`);
	// 			const pokemonData = {
	// 				url: `https://pokeapi.co/api/v2/pokemon/${response.data.id}`,
	// 				name: searchTerm
	// 			};
	// 			setPoketmons([pokemonData]);	// 이름에 맞는 정확한 포켓몬만 보냄. (1마리만 검색)
	// 		} catch (error) {
	// 			setPoketmons([]);
	// 			console.error(error);
	// 		}
	// 	} else {
	// 		// 검색 안 할 시
	// 		fetchPoketData();	// 처음 나와야 하는 포켓몬들
	// 	}
	// }

	return (
		<article className='pt-6'>
			<header className='flex flex-col gap-2 w-full px-4 z-50'>
				<AutoComplete	allPokemons={allPokemons} setDisplayedPokemons={setDisplayedPokemons} />
			</header>
			<section className="pt-6 flex flex-col justify-content items-center overflow-auto z-0">
				<div className='flex flex-row flex-wrap gap-[16px] items-center justify-center px-2 max-w-4xl'>
					{displayedPokemons.length > 0 ? 
						(
							displayedPokemons.map(({url, name}) => (
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
				{/* 더 보기 버튼 보여주려면 */}
				{/* 모든 포켓몬 수가 보여주고 있는 포켓몬 수보다 많고, 보여주는 게 하나일 때가 아닐 때 */}
				{(allPokemons.length > displayedPokemons.length) && (displayedPokemons.length !== 1) && 
					(
						<button 
							className='bg-slate-800 px-6 py-2 my-4 text-base rounded-lg font-bold text-white'
							onClick={() => setDisplayedPokemons(filterDisplayedPokemonData(allPokemons, displayedPokemons))}
						>
							더 보기
						</button>
					)
				}
			</div>
		</article>
	)
}

export default MainPage