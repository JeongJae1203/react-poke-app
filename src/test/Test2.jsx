import React, { useRef } from 'react'
import { ChildComponent } from './ChildComponent'

const Test2 = () => {
	const inputRef = useRef();
	const handleClick = () => {
		inputRef.current.focus();
	}

	return (
		<div>
			<ChildComponent ref={inputRef} />
			<button type="button" onClick={handleClick}>클릭</button>
		</div>
	)
}

export default Test2