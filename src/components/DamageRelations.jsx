import React, { useEffect, useState } from 'react'
import Type from './Type';

const DamageRelations = ({ damages }) => {
	const [damagePokemonForm, setDamagePokemonForm] = useState();

	useEffect(() => {
		const arrayDamage = damages.map((damage) => (
			seperateObjectBetweenToAndFrom(damage)
		));

		if (arrayDamage.length === 2) {
			// 합치는 부분 (array 데미지가 2개일 때)
			const obj = joinDamageRelations(arrayDamage);
			setDamagePokemonForm(reduceDuplicateValues(postDamageValue(obj.from)));
		} else {
			setDamagePokemonForm(postDamageValue(arrayDamage[0].from));
		}
	}, []);

	// 데이터 가공 1(from, to 구분)
	const seperateObjectBetweenToAndFrom = (damage) => {
		const from = filterDamageRelations('_from', damage)
				, to = filterDamageRelations('_to', damage);

		return { from, to }
	};

	const postDamageValue = (props) => {
		const result = Object.entries(props).reduce((acc, [keyName, value]) => {
			const key = keyName;
			const valuesOfKeyName = {
				double_damage: '2x',
				half_damage: '1/2x',
				no_damage: '0x'
			};

			return (acc = {[keyName]: value.map(val => ({
					damageValue: valuesOfKeyName[key], ...val
				})),
				...acc
			})
		}, {});

		return result;
	};

	/*
	*	Function Name : joinDamageRelations
	*/
	const joinDamageRelations = (props) => {
		return { to: joinObjects(props, 'to'), from: joinObjects(props, 'from') }
	}

	/*
	*	Function Name : reduceDuplicateValues
	*/
	// 중복 데미지일 경우, 4배 변경
	const reduceDuplicateValues = (props) => {
		const duplicateValues = {
			double_damage: '4x',
			half_damage: '1/4x',
			no_damage: '0x'
		};

		return Object.entries(props).reduce((acc, [keyName, value]) => {
			const key = keyName
					, verifiedValue = filterForUniqueValues(value, duplicateValues[key]);
			
			return (acc = { [keyName]: verifiedValue, ...acc });
		}, {})
	}

	/*
	*	Function Name : filterForUniqueValues
	*/
	const filterForUniqueValues = (valueForFiltering, damageValue) => {
		return valueForFiltering.reduce((acc, currValue) => {
			const { url, name } = currValue
					, filterAcc = acc.filter((a) => a.name !== name);

			return filterAcc.length === acc.length
			? (acc = [currValue, ...acc])
			: (acc = [{ damageValue: damageValue, name, url }, ...filterAcc])
		}, [])
	}
	
	const joinObjects = (props, string) => {
		const key = string
				, firstArrayValue = props[0][key]
				, secondArrayValue = props[1][key];

		const entryResult = Object.entries(secondArrayValue).reduce((acc, [keyName, value]) => {
			const result = firstArrayValue[keyName].concat(value);

			return (acc = { [keyName]: result, ...acc })
		}, {})

		return entryResult;
	}

	// _from 또는 _to만 filter
	const filterDamageRelations = (valueFilter, damage) => {
		const result = Object.entries(damage).filter(([keyName, value]) => {
			return keyName.includes(valueFilter);
		}).reduce((acc, [keyName, value]) => {
			// _from, _to는 key 텍스트 삭제
			const keyWithValueFilterRemove = keyName.replace(valueFilter, '');

			return (acc = { [keyWithValueFilterRemove]: value, ...acc} );
		}, {});

		return result;
	}

	return (
		<div className='flex gap-2 flex-col'>
			{
				damagePokemonForm ? 
				(
					<>
						{Object.entries(damagePokemonForm).map(([keyName, value]) => {
							const key = keyName
									, valuesOfKeyName = {
										double_damage: 'Weak',
										half_damage: 'Resistant',
										no_damage: 'Immune'
									};
							return (
								<div key={key}>
									<h3 className='capitalize font-medium text-sm md:text-base text-slate-500 text-center'>{valuesOfKeyName[key]}</h3>
									<div className='flex flex-wrap gap-1 justify-center'>
										{
											value.length > 0 ? (
												value.map(({ name, url, damageValue }) => {
													return <Type type={name} key={url} damageValue={damageValue} />
												})
											) : (
												// false일 때
												<Type type={'none'} key={'none'} />
											)
										}
									</div>
								</div>
							)
						})}
					</>
				)
				:
				<div></div>
			}
		</div>
	)
}

export default DamageRelations