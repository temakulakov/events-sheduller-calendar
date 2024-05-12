import styles from './WeekView.module.scss';
import {useQuery} from "@tanstack/react-query";
import {fetchEvents} from "../../../services/BitrixService";
import {useRecoilState, useRecoilValue} from "recoil";
import dayjs, {Dayjs} from "dayjs";
import {currentDate, filtersState, viewState} from "../../../store/atoms";
import {IEvent} from "../../../types";
import {useEffect} from "react";
import {useListElements} from "../../../services/ListRooms";

const HEIGHT = 48;

const WeekView = () => {
    const filters = useRecoilValue(filtersState)
    const {data: elements, error: errorElements, isLoading: isLoadingElements} = useListElements('0');

    const [currentWeek, setCurrentWeek] = useRecoilState<Dayjs>(currentDate);
    const [ view, setView ] = useRecoilState(viewState);

    const {data: events} = useQuery({
        queryKey: ['events'],
        queryFn: () => fetchEvents(currentWeek.startOf('week'), currentWeek.endOf('week'))
    });

    const getEventsForDay = (date: Dayjs): IEvent[] => {
        if (events) {
            return events.filter(el => filters.includes(Number(el.usedRooms))).filter(event =>
                (event.startDate.isSame(date, 'day') || event.startDate.isBefore(date, 'day')) &&
                (event.endDate.isSame(date, 'day') || event.endDate.isAfter(date, 'day'))
            );
        } else return [];
    };

    // Массив дней недели для заголовков и их дат
    const weekDays = ['пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'вс'].map((day, index) => ({
        day,
        date: currentWeek.startOf('week').add(index, 'day') // Форматирование даты каждого дня недели
    }));

    useEffect(() => {

    }, [currentWeek]);

    return (

        <div className={styles.root}>
            <div className={styles.header}>
                <div style={{width: 51}}/>
                {weekDays.map((el, key) => (
                    <div key={key} className={styles.weekDays}>
                        <div className={`${styles.week} ${el.date.isSame(dayjs(), 'date') ? styles.active : ''}`}><h3>{el.day}</h3></div>
                        <div
                            onClick={() => {setCurrentWeek(el.date); setView('day')}}
                            className={`${styles.day} ${el.date.isSame(dayjs(), 'date') ? styles.active : ''}`}>
                            <h1>{el.date.date()}</h1>
                        </div>
                    </div>
                ))}
            </div>
            <div className={styles.allDayRow}>
                <div style={{width: 51}}/>
                {
                    weekDays.map((el, key) => <div key={key} className={styles.allDayCell}>
                    </div>)
                }
            </div>
            <div className={styles.body} >
                <div className={styles.timeLine} style={{height: 24 * HEIGHT, background: `repeating-linear-gradient(
    to bottom,
    transparent,
    transparent 47px,
    #DADCE0 47px,
    #DADCE0 48px
)` }} >
                    {
                        new Array(24).fill(null).map((el, key) => <div className={styles.time}
                                                                       key={key}>{`${key}:00`}</div>)
                    }
                </div>
                {
                    weekDays.map((el, key) => {
                        return <div key={key} className={styles.row} style={{height: 24 * HEIGHT, background: `repeating-linear-gradient(
    to bottom,
    transparent,
    transparent 47px,
    #DADCE0 47px,
    #DADCE0 48px
)`}}>
                            {el.date.isSame(dayjs(), 'day') && <div className={styles.redLine} style={{top: dayjs().diff(dayjs().startOf('day'), 'minute') * HEIGHT / 60}}/>}
                            {
                                elements && getEventsForDay(el.date).map((el, key) => {
                                    return <div
                                        key={key}
                                        style={{
                                            backgroundColor: elements.find(ele => ele.id === Number(el.usedRooms))?.color,
                                            top: HEIGHT * dayjs(el.startDate).diff(dayjs(el.startDate).startOf('day'), 'minute') / 60,
                                            height: HEIGHT * dayjs(el.endDate).diff(dayjs(el.startDate), 'hour'),
                                        }}
                                        className={styles.event}
                                    >{el.title}<br/>{el.startDate.format('HH:MM')}<br/>{el.endDate.format('HH:MM')}{}
                                    </div>
                                })
                            }
                        </div>
                    })
                }
            </div>
        </div>
    );
};

export default WeekView;
