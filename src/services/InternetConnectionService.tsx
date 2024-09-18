/** @format */

import {ReactNode, useEffect, useRef, useState} from "react";
import {toast, ToastContent} from "react-toastify";

interface IProps {
	children: ReactNode;
}

const InternetConnectionProvider = ({children}: IProps) => {
	const [isOnline, setIsOnline] = useState<boolean>(false);
	// const toastIdRef = useRef<ToastContent | null>(null);

	// const close = () => {
	// 	toastIdRef.current = null;
	// };
	// const addToast = () => {
	// 	toastIdRef.current = toast.warning("Internet Connection Lost", {
	// 		autoClose: false,
	// 	});
	// };

	useEffect(() => {
		setIsOnline(navigator.onLine);
	}, [isOnline]);

	window.addEventListener("online", () => {
		setIsOnline(true);
	});
	window.addEventListener("offline", () => {
		setIsOnline(false);
	});

	if (!isOnline) {
		return (
			<>
				{children}
				{toast.warning("Internet Connection Lost")}
			</>
		);
	}

	return children;
};

export default InternetConnectionProvider;
