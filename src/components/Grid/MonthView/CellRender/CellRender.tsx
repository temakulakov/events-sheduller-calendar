import React from 'react';
import styles from './CellRender.module.scss';
import dayjs from "dayjs";
import {Month} from "../../../../consts";
import {IEvent} from "../../../../types";

interface ICellRenderProps {
    date: string;
    events: IEvent[];
}

const CellRender = ({date, events}: ICellRenderProps) => {
    const moment = dayjs(date, 'D.M.YYYY');
    return <div className={styles.root}>
        <div
            className={`${styles.number} ${moment.format('DD.MM.YYYY') === dayjs().format('DD.MM.YYYY') ? styles.current : null} ${moment.date() === 1 ? styles.monthStart : null}`}>
            {
                moment.date() === 1 ? `${moment.date()} ${Month[moment.month()]}` : moment.date()
            }
        </div>
        <div className={styles.containerEvents}>
            {
                events.map(el => <div key={el.id} className={styles.event} style={{backgroundColor: 'rgb(66, 133, 244)'}}>{el.title}</div>)
            }
        </div>
    </div>
};

export default CellRender;