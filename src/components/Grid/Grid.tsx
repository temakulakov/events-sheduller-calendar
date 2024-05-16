import styles from './Grid.module.scss';
import MonthView from "./MonthView/MonthView";
import {useRecoilState, useRecoilValue} from "recoil";
import {currentDate, viewState} from "../../store/atoms";
import DayView from "./DayView/DayView";
import WeekView from "./WeekView/WeekView";
import {useListSections} from "../../services/ListFilial";
import {useListElements} from "../../services/ListRooms";
import {useQuery} from "@tanstack/react-query";
import {fetchEvents} from "../../services/BitrixService";
import {useEffect, useState} from "react";
import dayjs, {Dayjs} from "dayjs";

export default function Grid() {
    const [now, setNow] = useRecoilState(currentDate);
    const view = useRecoilValue(viewState);


    const [ duration, setDuration ] = useState<{from: Dayjs; to: Dayjs}>({from: dayjs().startOf('month'), to: dayjs().endOf('month')})
    useEffect(() => {
        console.log("ОТРАБОТАНО")
        if (view === 'day') {
            setDuration({
                from: now.startOf('day'),
                to: now.endOf('day'),
            });
        }
        if (view === 'week') {
            setDuration({
                from: now.startOf('week'),
                to: now.endOf('week'),
            });
        }
        if (view === 'month') {
            setDuration({
                from: now.startOf('month'),
                to: now.endOf('month'),
            });
        }
    }, [view, now]);

    useEffect(() => {
        setNow(dayjs())
    }, []);
    const {data: sections, error: errorSections, isLoading: isLoadingSections} = useListSections();
    const {data: elements, error: errorElements, isLoading: isLoadingElements} = useListElements('0');
    const { data: events } = useQuery({queryKey: ['events', duration], queryFn: () => fetchEvents(duration.from, duration.to)});



    return <div className={styles.root}>
        {
            events && view === 'month' && <MonthView events={events}/>
        }
        {
            events && view === 'week' && <WeekView events={events}/>
        }
        {
            events && elements && sections && view === 'day' && <DayView sections={sections} elements={elements} events={events}/>
        }
    </div>
}