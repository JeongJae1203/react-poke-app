import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Loading } from '../../assets/Loading';
import { LessThan } from '../../assets/LessThan';
import { GreaterThan } from '../../assets/GreaterThan';
import { ArrowLeft } from '../../assets/ArrowLeft';
import { Balance } from '../../assets/Balance';
import { Vector } from '../../assets/Vector';
import Type from '../../components/Type';
import BaseStat from '../../components/BaseStat';
import DamageModal from '../../components/DamageModal';

const DetailPage = () => {
	const [pokemon, setPokemon] = useState();
	const [isLoading, setIsLoading] = useState(false);
	const [isModalOpen, setIsModalOpen] = useState(false);	// modal 관련

	// 포켓몬 이름 가져오기 (id)
	const params = useParams()
			, pokemonId = params.id
			, baseUrl = `https://pokeapi.co/api/v2/pokemon/`;
	
	useEffect(() => {
		setIsLoading(true);
		fetchPokemonData(pokemonId);
	}, [pokemonId]);
	
	async function fetchPokemonData(id) {
		const url = `${baseUrl}${id}`;
		try {
			const { data: pokemonData } = await axios.get(url);

			if (pokemonData) {
				const { name, id, types, weight, height, stats, abilities, sprites } = pokemonData;
				const nextAndPreviousPokemon = await getNextAndPreviousPokemon(id);

				// 다 된 걸 처리하기 위해 Promise.all 사용
				const DamageRelations = await Promise.all(
					types.map(async (i) => {
						const type = await axios.get(i.type.url);
						
						return type.data.damage_relations;
					})
				);

				// 데이터 가공 (기본 데이터)
				// state로 만들어야 함.
				const formattedPokemonData = {
					id,
					name,
					weight: weight / 10,
					height: height / 10,
					previous: nextAndPreviousPokemon.previous,
					next: nextAndPreviousPokemon.next,
					abilities: formatPokemonAbilites(abilities),
					stats: formatPokemonStats(stats),
					DamageRelations: DamageRelations,
					types: types.map(type => type.type.name),
					sprites: formatPokemonSprites(sprites),
					description: await getPokemonDescription(id)
				};
				setPokemon(formattedPokemonData);
				setIsLoading(false);
			}
		} catch (error) {
			console.error(error);
			setIsLoading(false);
		}
	}

	// 설명이 한국어인지 filtering
	const filterAndFormatDescription = (flavorText) => {
		const koreanDescriptions = flavorText
		?.filter((text) => text.language.name === 'ko')
		.map((text) => text.flavor_text.replace(/\r|\n|\f/g, ' '));

		return koreanDescriptions;
	}

	const getPokemonDescription = async (id) => {
		const url = `https://pokeapi.co/api/v2/pokemon-species/${id}/`;
		const { data: pokemonSpecies } = await axios.get(url);
		const descriptions = filterAndFormatDescription(pokemonSpecies.flavor_text_entries);

		// 배열 안에 있는 것 중 랜덤으로 뽑기
		return descriptions[Math.floor(Math.random() * descriptions.length)];
	}

	// 능력 관련 - 제거 함수
	const formatPokemonAbilites = (abilities) => {
		return abilities.filter((ability, index) => index <= 1).map((obj) => obj.ability.name.replaceAll('-', ''));
	}

	const formatPokemonStats = ([
		statHP,
		statATK,
		statDEP,
		statSATK,
		statSDEP,
		statSPD
	]) => [
		{ name: 'Hit Points', baseStat: statHP.base_stat },
		{ name: 'Attack', baseStat: statATK.base_stat },
		{ name: 'Defense', baseStat: statDEP.base_stat },
		{ name: 'Special Attack', baseStat: statSATK.base_stat },
		{ name: 'Special Defense', baseStat: statSDEP.base_stat },
		{ name: 'Speed', baseStat: statSPD.base_stat },
	];

	// 
	const formatPokemonSprites = (sprites) => {
		const newSprites = { ...sprites };

		(Object.keys(newSprites).forEach(key => {
			// String이 아닌 key들은 제거
			if (typeof newSprites[key] !== 'string') {
				delete newSprites[key];
			}
		}));

		return Object.values(newSprites);
	}

	// 이전, 다음 포켓몬 url 가져오기
	async function getNextAndPreviousPokemon(id) {
		const urlPokemon = `${baseUrl}?limit=1&offset=${id - 1}`;
		const { data: pokemonData } = await axios.get(urlPokemon);

		const nextResponse = pokemonData.next && (await axios.get(pokemonData.next))
				, previousResponse = pokemonData.previous && (await axios.get(pokemonData.previous));

		// 방어 코드 (혹시나, undefined나 null이 있을 경우에 대비)
		return {
			next: nextResponse?.data?.results?.[0]?.name,
			previous: previousResponse?.data?.results?.[0]?.name
		}
	}

	// 로딩 상태 (데이터 가져오는 중)
	if (isLoading) {
		return (
			<div className={`absolute h-auto w-auto top-1/3 -translate-x-1/2 left-1/2 z-50`}>
				<Loading className='w-12 h-12 z-50 animate-spin text-slate-500' />
			</div>
		)
	}

	if (!isLoading && !pokemon) {
		return (
			<div>...NOT FOUND</div>
		)
	}

	// 이미지
	const img = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon?.id}.png`
			, bg = `bg-${pokemon?.types?.[0]}`
			, text = `text-${pokemon?.types?.[0]}`;
			
	return (
		<article className='flex items-center gap-1 flex-col w-full'>
			<div className={`${bg} w-auto h-full flex flex-col z-0 items-center justify-end relative overflow-hidden`}>
				{/* 이전 화살표 */}
				{pokemon.previous && (
					<Link 
						className='absolute top-[40%] -translate-y-1/2 z-50 left-1'
						to={`/pokemon/${pokemon.previous}`}
					>
						<LessThan className='w-5 h-8 p-1' />
					</Link>
				)}
				
				{/* 다음 화살표 */}
				{pokemon.next && (
					<Link 
						className='absolute top-[40%] -translate-y-1/2 z-50 right-1'
						to={`/pokemon/${pokemon.next}`}
					>
						<GreaterThan className='w-5 h-8 p-1' />
					</Link>
				)}

				<section className='w-full flex flex-col z-20 items-center justify-end relative h-full'>
					<div className='absolute z-30 top-6 flex items-center w-full justify-between px-2'>
						<div className='flex items-center gap-1'>
							<Link to="/">
								<ArrowLeft className='w-6 h-8 text-zinc-200' />
							</Link>
							<h1 className='text-zinc-200 font-bold text-xl capitalize'>
								{pokemon.name}
							</h1>
						</div>
						<div className='text-zinc-200 font-bold text-md'>
							#{pokemon.id.toString().padStart(3, '00')}
						</div>
					</div>
					<div className='relative h-auto max-w-[15.5rem] z-20 mt-6 -mb-16'>
						<img 
							src={img} 
							width="100%" 
							height="auto" 
							loading='lazy' 
							alt={pokemon.name} 
							className={`object-contain h-full`} 
							onClick={() => setIsModalOpen(true)}
						/>
					</div>
				</section>
				
				<section className='w-full min-h-[65%] h-full bg-gray-800 z-10 pt-14 flex flex-col items-center gap-3 px-5 pb-4'>
					<div className='flex items-center justify-center gap-4'>
						{/* 포켓몬 타입 */}
						{pokemon.types.map((type) => (
							<Type key={type} type={type} />
						))}
					</div>
					<h2 className={`text-base font-semibold ${text}`}>
						정보
					</h2>

					<div className='flex w-full items-center justify-between max-w-[400px] text-center'>
						<div className='w-full'>
							<h4 className='text-[.5rem] text-zinc-100'>Weight</h4>
							<div className='text-sm text-zinc-200 flex mt-1 gap-2 justify-center'>
								<Balance />
								{pokemon.weight}kg
							</div>
						</div>
						<div className='w-full'>
							<h4 className='text-[.5rem] text-zinc-100'>Height</h4>
							<div className='text-sm text-zinc-200 flex mt-1 gap-2 justify-center'>
								<Vector />
								{pokemon.height}kg
							</div>
						</div>
						<div className='w-full'>
							<h4 className='text-[.5rem] text-zinc-100'>Weight</h4>
							{pokemon.abilities.map((ability) => (
								<div key={ability} className='text-[.5rem] text-zinc-100 capitalize'>
									{ability}
								</div>
							))}
						</div>
					</div>

					<h2 className={`text-base font-semibold ${text}`}>
						기본 능력치
					</h2>
					<div className='w-full'>
						<table>
							<tbody>
								{pokemon.stats.map((stat) => (
									<BaseStat 
										key={stat.name} 
										valueStat={stat.baseStat} 
										nameStat={stat.name}
										type={pokemon.types[0]}
									/>
								))}
							</tbody>
						</table>
					</div>

					<h2 className={`text-base font-semibold ${text}`}>설명</h2>
					<p className='text-md leading-4 font-sans text-zinc-200 max-w-[30rem] text-center'>
						{pokemon.description}
					</p>

					<div className='flex my-8 flex-wrap justify-center'>
						{pokemon.sprites.map((url, index) => (
							<img 
								key={index}
								src={url}
								alt="sprite"
							/>
						))}
					</div>
				</section>
			</div>
			{/* modalOpen이 true일 때 */}
			{isModalOpen && 
				<DamageModal 
					setIsModalOpen={setIsModalOpen} 
					damages={pokemon.DamageRelations} 
				/>
			}
		</article>
	)
}

export default DetailPage