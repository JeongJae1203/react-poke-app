import { useEffect } from "react";

export default function useOnClickOutside(ref, handler) {
	// Modal 바깥 클릭 시, Callback 함수 호출하는 event 리스너 등록
	useEffect(() => {
		const listener = (e) => {
			// Modal 안을 클릭했는지?
			if (!ref.current || ref.current.contains(e.target)) {
				return;
			}
			// Modal 밖을 클릭했는지?
			handler();
		};
		
		document.addEventListener('mousedown', listener);

		return () => {
			document.removeEventListener('mousedown', listener);
		}
	}, [ref, handler]);
}