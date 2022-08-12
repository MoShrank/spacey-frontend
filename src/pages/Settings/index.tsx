import TextInput from "components/Input/TextInput";
import Layout from "components/Layout";
import Spacer from "components/Spacer";
import useStore from "hooks/useStore";

const Settings = () => {
	const { email } = useStore(state => state.user);

	return (
		<Layout width="normal">
			<Spacer spacing={2} />
			<TextInput value={email} disabled placeholder="e-mail" />
		</Layout>
	);
};

export default Settings;
