import style from "./style.module.scss";

interface SelectI {
	options: string[];
	onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const Select = ({ options, onChange }: SelectI) => {
	return (
		<div className={style.select_container}>
			<select className={style.select} onChange={onChange}>
				{options.map((option, idx) => (
					<option className={style.option} key={idx} value={idx}>
						{option}
					</option>
				))}
			</select>
			<div className={style.arrow}></div>
		</div>
	);
};

export default Select;
