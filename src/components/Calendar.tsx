import styles from './Calendar.module.scss';
import {Calendar} from "antd";
import {useState} from "react";
import dayjs, {Dayjs} from "dayjs";

const FullCall = () => {
    return <div className={styles.fullCell}></div>
}

const AntCalendar = () => {
    const [ date, setDate ] = useState<Dayjs>(dayjs('2024-04-01'));
    return <Calendar
        // dateCellRender={FullCall}
        value={date}
        onSelect={(date) => {setDate(date)}}
    />
};

export default AntCalendar;