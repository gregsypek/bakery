import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Orders from "./pages/Orders";
import Products from "./pages/Products";
import Users from "./pages/Users";
import Settings from "./pages/Settings";
import Account from "./pages/Account";
import Login from "./pages/Login";
import PageNotFound from "./pages/PageNotFound";
import GlobalStyles from "./styles/GlobalStyles";
import AppLayout from "./ui/AppLayout";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";
import Order from "./pages/Order";
import Status from "./pages/Status";
import ProtectedRoute from "./ui/ProtectedRoute";
import { DarkModeProvider } from "./context/DarkModeContext";

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			staleTime: 0,
		},
	},
});

function App() {
	// const { isDarkMode } = useDarkMode();

	return (
		<DarkModeProvider>
			<QueryClientProvider client={queryClient}>
				<ReactQueryDevtools initialIsOpen={false} />
				<GlobalStyles />
				<BrowserRouter>
					<Routes>
						<Route
							element={
								<ProtectedRoute>
									<AppLayout />
								</ProtectedRoute>
							}
						>
							<Route index element={<Navigate replace to="dashboard" />} />
							<Route path="dashboard" element={<Dashboard />} />
							<Route path="orders" element={<Orders />} />
							<Route path="orders/:orderId" element={<Order />} />
							<Route path="status/:orderId" element={<Status />} />
							<Route path="products" element={<Products />} />
							<Route path="users" element={<Users />} />
							<Route path="settings" element={<Settings />} />
							<Route path="account" element={<Account />} />
						</Route>

						<Route path="login" element={<Login />} />
						<Route path="*" element={<PageNotFound />} />
					</Routes>
				</BrowserRouter>
				<Toaster
					position="top-center"
					gutter={12}
					containerStyle={{ margin: "8px" }}
					toastOptions={{
						success: {
							duration: 3000,
						},
						style: {
							fontSize: "16px",
							maxWidth: "500px",
							padding: "16px 24px",
							// backgroundColor: isDarkMode
							// 	? "var(--color-brand-100)"
							// 	: "var(--color-brand-800)",
							// color: isDarkMode
							// 	? "var(--color-brand-100)"
							// 	: "var(--color-brand-900)",
							// // color: "var(--color-brand-900)",
							backgroundColor: "var(--color-black-600)",
							color: "var(--color-brand-200)",
						},
					}}
				/>
			</QueryClientProvider>
		</DarkModeProvider>
	);
}

export default App;
