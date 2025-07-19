import { useEffect, useState } from "react";

export const useDebounce = (value, delay) => {
	const [debouncedValue, setDebouncedValue] = useState(value);
	
	useEffect(() => {
		// timeout 호출 도중 value나 delay가 바뀌어 다시 호출 시 clearTimeout으로 삭제
		const handler = setTimeout(() => {
			setDebouncedValue(value);
		}, delay);

		return () => {
			clearTimeout(handler);
		}
	}, [value, delay]);

	return debouncedValue;
}