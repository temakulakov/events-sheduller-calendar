import styles from './MonthView.module.scss';
import {useCallback, useEffect, useState} from "react";
import dayjs, {Dayjs} from "dayjs";
import {useRecoilState} from "recoil";
import {currentDate} from "../../../store/atoms";
import {Month} from "../../../consts";
import {AnimatePresence, motion} from 'framer-motion';
import {debounce, throttle} from "lodash";
import CellRender from "./CellRender/CellRender";


const MonthView: React.FC = () => {
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
            console.log('Scrolling forward');
            setCurrentMonth(current => current.add(1, 'month'));
        } else {
            console.log('Scrolling backward');
            setCurrentMonth(current => current.subtract(1, 'month'));
        }
    }, 1000, { leading: true, trailing: false }), []);

    useEffect(() => {
        console.log('setState changed');
    }, [setCurrentMonth]);
    useEffect(() => {
        console.log('state changed');
        console.log(currentMonth)
    }, [currentMonth]);

    return <AnimatePresence>
        <motion.div

            key={currentMonth.month()}
            style={{height: '100%'}}
            // initial={{opacity: 0, x: next ? 30 : -30}}
            // animate={{opacity: 1, x: 0}}
            // exit={{opacity: 0, x: next ? 30 : -30}}
            transition={{duration: 0.1}}
            onWheel={handleWheel}
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
                        <CellRender key={index} date={`${day}.${currentMonth.month()}.${currentMonth.year()}`}/>
                    </div>
                ))}
                {daysArray.map((day, index) => (
                    <div key={day} className={styles.cell}>
                        <CellRender key={index} date={`${day}.${currentMonth.month() + 1}.${currentMonth.year()}`}/>
                    </div>
                ))}
                {nextDays.map((day, index) => (
                    <div key={`next-${index}`} className={`${styles.cell} ${styles.unCurrent}`}>
                        <CellRender key={index} date={`${index + 1}.${currentMonth.month() + 2}.${currentMonth.year()}`}/>
                    </div>
                ))}
            </div>
        </motion.div>
    </AnimatePresence>;
};

export default MonthView;
