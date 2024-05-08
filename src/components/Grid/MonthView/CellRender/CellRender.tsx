import React from 'react';
import styles from './CellRender.module.scss';
import dayjs from "dayjs";
import {Month} from "../../../../consts";

interface ICellRenderProps {
    date: string;
}

const CellRender = ({date}: ICellRenderProps) => {
    const moment = dayjs(date, 'D.M.YYYY');

    return <div className={styles.root}>
            <div className={`${styles.number} ${moment.format('DD.MM.YYYY') === dayjs().format('DD.MM.YYYY') ? styles.current : null} ${moment.date() === 1 ? styles.monthStart : null}`}>
                {
                    moment.date() === 1 ? `${moment.date()} ${Month[moment.month()]}` : moment.date()
                }
            </div>
    </div>
};

export default CellRender;