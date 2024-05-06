import styles from './Calendar.module.scss';
import dayjs, {Dayjs} from "dayjs";
import isBetween from 'dayjs/plugin/isBetween';
import Header from "./Header/Header";
import Picker from "./Picker/Picker";
import Grid from "./Grid/Grid";

dayjs.extend(isBetween);


const AntCalendar = () => {

    return <div className={styles.root}>
        <div className={styles.calendar}>
            <Header/>
            <div className={styles.bottom}>
                <Picker/>
                <Grid/>
            </div>
        </div>

    </div>
};

export default AntCalendar;