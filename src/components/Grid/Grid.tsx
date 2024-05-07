import styles from './Grid.module.scss';
import MonthView from "./MonthView/MonthView";

export default function Grid() {
    return <div className={styles.root}>
        <MonthView/>
    </div>
}