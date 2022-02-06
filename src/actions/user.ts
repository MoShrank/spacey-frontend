import { login } from "api/user";
import { UserI } from "types/user";

export const loginAction = async (email: string, password: string) => {
	if (!email || !password) {
		throw Error("please fill in all fields!");
	}

	try {
		const user = await login({ email, password });

		return (curState: UserI) => {
			return {
				...curState,
				email: email,
				id: user?.id,
			};
		};
	} catch (_) {
		throw Error("invalid email or password.");
	}
};
