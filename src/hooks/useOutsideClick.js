import { useEffect, useRef } from "react";

//listenCapturing - bubbling or capture phase - goes up or down - choose right option
export function useOutsideClick(handler, listenCapturing = true) {
	const ref = useRef();

	useEffect(() => {
		function handleClick(e) {
			if (ref.current && !ref.current.contains(e.target)) handler();
		}
		document.addEventListener("click", handleClick, listenCapturing);

		return () =>
			document.removeEventListener("click", handleClick, listenCapturing);
	}, [handler, listenCapturing]);

	return ref;
}
