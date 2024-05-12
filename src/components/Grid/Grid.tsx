import styles from './Grid.module.scss';
import MonthView from "./MonthView/MonthView";
import {useRecoilValue} from "recoil";
import {viewState} from "../../store/atoms";
import DayView from "./DayView/DayView";
import WeekView from "./WeekView/WeekView";

export default function Grid() {
    const view = useRecoilValue(viewState);
    return <div className={styles.root}>
        {
            view === 'month' && <MonthView/>
        }
        {
            view === 'week' && <WeekView/>
        }
        {
            view === 'day' && <DayView/>
        }
    </div>
}