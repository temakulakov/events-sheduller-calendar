import styles from './MonthView.module.scss';
import {useCallback, useEffect, useState} from "react";
import dayjs, {Dayjs} from "dayjs";
import {useRecoilState} from "recoil";
import {currentDate} from "../../../store/atoms";
import {Month} from "../../../consts";
import {AnimatePresence, motion} from 'framer-motion';
import {debounce, throttle} from "lodash";
import CellRender from "./CellRender/CellRender";
import {useQuery} from "@tanstack/react-query";
import {fetchEvents} from "../../../services/BitrixService";
import {IEvent} from "../../../types";


const MonthView: React.FC = () => {
    const { data: events } = useQuery({queryKey: ['events'], queryFn: () => fetchEvents(currentMonth.startOf('month'), currentMonth.endOf('month'))})
    const [currentMonth, setCurrentMonth] = useRecoilState<Dayjs>(currentDate);
    const [next, setNext] = useState<boolean>(false);
    const [timerActive, setTimerActive] = useState<boolean>(false);

    const firstDayIndex = (currentMonth.startOf('month').day() - 1) % 7;
    const firstDayAdjusted = firstDayIndex === -1 ? 6 : firstDayIndex;

    const daysInMonth = currentMonth.daysInMonth();
    const daysArray = Array.from({length: daysInMonth}, (_, index) => index + 1);

    const emptyDaysCount = firstDayAdjusted;
    const lastDayPrevMonth = currentMonth.subtract(1, 'month').endOf('month');
    const emptyDays = Array.from({length: emptyDaysCount}, (_, index) =>
        lastDayPrevMonth.subtract(index, 'day').date()
    ).reverse();

    const lastDayIndex = (currentMonth.endOf('month').day() - 1) % 7;
    const lastDayAdjusted = lastDayIndex === -1 ? 6 : lastDayIndex;

    const nextDaysCount = 6 - lastDayAdjusted;
    const firstDayNextMonth = currentMonth.add(1, 'month').startOf('month');
    const nextDays = Array.from({length: nextDaysCount}, (_, index) =>
        firstDayNextMonth.add(index, 'day').date()
    );


    const handleWheel = useCallback(throttle((event: React.WheelEvent) => {
        if (event.deltaY > 0) {
            setCurrentMonth(current => current.add(1, 'month'));
        } else {
            setCurrentMonth(current => current.subtract(1, 'month'));
        }
    }, 700, {leading: true, trailing: false}), []);

    const getEventsForDay = (date: Dayjs): IEvent[] => {
        if (events) {

            return events.filter(event =>
                (event.startDate.isSame(date, 'day') || event.startDate.isBefore(date, 'day')) &&
                (event.endDate.isSame(date, 'day') || event.endDate.isAfter(date, 'day'))
            );
        } else return [];
    };

    return <AnimatePresence>
        <motion.div
            key={currentMonth.month()}
            style={{height: '100%'}}
            // initial={{opacity: 0, y: !next ? -30 : 30}}
            initial={{opacity: 0}}
            // animate={{opacity: 1, y: 0}}
            animate={{opacity: 1, y: 0}}
            // exit={{opacity: 0, y: !next ? -30 : 30}}
            exit={{opacity: 0}}
            transition={{duration: 0.3}}
            onWheel={(event) => {
                if (event.deltaY > 0) {
                    setNext(true);
                } else {
                    setNext(false);
                }
                handleWheel(event);
            }}
        >
            <div className={styles.weekDay}>
                {['пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'вс'].map((day, index) => (
                    <div key={index} className={styles.weekDay}>
                        {day}
                    </div>
                ))}
            </div>
            <div className={styles.root}>
                {emptyDays.map((day, index) => (
                    <div key={`empty-${index}`} className={`${styles.cell} ${styles.unCurrent}`}>
                        <CellRender key={index}
                                    date={`${day}.${currentMonth.month()}.${currentMonth.year()}`}
                                    events={getEventsForDay(dayjs(`${day}.${currentMonth.month() + 1}.${currentMonth.year()}`, 'D.M.YYYY'))}
                        />
                    </div>
                ))}
                {daysArray.map((day, index) => (
                    <div key={day} className={styles.cell}>
                        <CellRender key={index}
                                    date={`${day}.${currentMonth.month() + 1}.${currentMonth.year()}`}
                                    events={getEventsForDay(dayjs(`${day}.${currentMonth.month() + 1}.${currentMonth.year()}`, 'D.M.YYYY'))}
                        />
                    </div>
                ))}
                {nextDays.map((day, index) => (
                    <div key={`next-${index}`} className={`${styles.cell} ${styles.unCurrent}`}>
                        <CellRender key={index}
                                    date={`${index + 1}.${currentMonth.month() + 2}.${currentMonth.year()}`}
                                    events={getEventsForDay(dayjs(`${day}.${currentMonth.month() + 1}.${currentMonth.year()}`, 'D.M.YYYY'))}

                        />
                    </div>
                ))}
            </div>
        </motion.div>
    </AnimatePresence>;
};

export default MonthView;
