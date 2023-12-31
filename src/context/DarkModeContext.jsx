import { createContext, useContext, useEffect } from "react";
import { useLocalStorageState } from "../hooks/useLocalStorageState";
import PropTypes from "prop-types";

const DarkModeContext = createContext();

function DarkModeProvider({ children }) {
	const [isDarkMode, setIsDarkMode] = useLocalStorageState(false, "isDarkMode"); //hook set the state and synchronize it with local storage

	useEffect(() => {
		if (isDarkMode) {
			document.documentElement.classList.add("dark-mode");
			document.documentElement.classList.remove("light-mode");
		} else {
			document.documentElement.classList.add("light-mode");
			document.documentElement.classList.remove("dark-mode");
		}
	}, [isDarkMode]);

	function toggleDarkMode() {
		setIsDarkMode((isDark) => !isDark);
	}

	return (
		<DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
			{children}
		</DarkModeContext.Provider>
	);
}

function useDarkMode() {
	const context = useContext(DarkModeContext);
	if (context === undefined)
		throw new Error("DarkModeContext was used outside of DarkModeProvider");
	return context;
}

DarkModeProvider.propTypes = {
	children: PropTypes.node,
};

export { DarkModeProvider, useDarkMode };