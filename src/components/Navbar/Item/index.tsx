import Text from "components/Text";
import { Link } from "react-router-dom";

import style from "./style.module.scss";

interface ItemI {
	label: string;
	Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
	to: string;
	onClick?: () => void;
}

const Item = ({ label, Icon, to, onClick }: ItemI) => (
	<Link onClick={onClick} key={label} to={to} className={style.item}>
		<Text color="darkblue">{label}</Text>
		<Icon />
	</Link>
);

export default Item;
