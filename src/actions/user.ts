import { login } from "api/user";
import { fetchUserData } from "api/user";
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
				betaUser: user?.betaUser,
			};
		};
	} catch (_) {
		throw Error("invalid email or password.");
	}
};

export const getUserDataAction = async () => {
	try {
		const data = await fetchUserData();

		if (!data?.name || !data?.email) {
			throw Error("invalid user data.");
		}

		return (curState: UserI) => {
			return {
				...curState,
				id: data.id,
				name: data.name,
				email: data.email,
				betaUser: data.betaUser,
			};
		};
	} catch (_) {
		throw Error("error fetching user data");
	}
};
