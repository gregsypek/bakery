import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login as loginApi } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

export function useLogin() {
	const queryClient = useQueryClient();
	const navigate = useNavigate();
	const { mutate: login, isLoading } = useMutation({
		mutationFn: ({ email, password }) => loginApi({ email, password }),
		onSuccess: (user) => {
			//manually add data to cached - and useUser get data from cache now
			queryClient.setQueryData(["user"], user.user);
			navigate("/dashboard", { replace: true }); //thanks to replace back button in web browser will not work
		},
		onError: (err) => {
			console.log("errror", err);
			toast.error("Provided email or password are incorrect");
		},
	});

	return { login, isLoading };
}
