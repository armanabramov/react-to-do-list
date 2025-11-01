import styles from './Checkbox.module.css';
import CheckedIcon from '../assets/icons/checked-icon.svg';

export default function Checkbox({ id, checked, onChange }) {
	return (
		<label className={styles.checkbox} htmlFor={id}>
			<input
				type="checkbox"
				id={id}
				className={styles.checkbox__input}
				checked={checked}
				onChange={(e) => onChange(e.target.checked)}
			/>
			<span
				className={[styles.checkbox__box, checked ? styles.checked : null]
					.filter(Boolean)
					.join(' ')}
				aria-hidden="true"
			>
				{checked && <CheckedIcon className={styles.checkbox__icon} />}
			</span>
		</label>
	);
}
