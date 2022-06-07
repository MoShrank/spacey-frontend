import { combineStyles } from "util/css";

import style from "./style.module.scss";

interface ScalingSVGI extends React.SVGProps<SVGSVGElement> {
	icon: React.FunctionComponent<
		React.SVGProps<SVGSVGElement> & { title?: string | undefined }
	>;
}

const ScalingSVG: React.FC<ScalingSVGI> = ({
	icon: Icon,
	className,
	...rest
}: ScalingSVGI) => (
	<div className={style.img_container}>
		<Icon className={combineStyles(style.img, className)} {...rest} />
	</div>
);

export default ScalingSVG;
