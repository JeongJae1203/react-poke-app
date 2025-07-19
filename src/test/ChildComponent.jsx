import React, { forwardRef } from 'react'

// forward ref 방식
// 반드시, ref가 두번째 props로 와야 함.
const ChildComponent = (props, ref) => {
	return (
		<div>
			<input type="text" name="" id="" ref={ref} />
		</div>
	)
}

export default forwardRef(ChildComponent)