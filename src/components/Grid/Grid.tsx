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

export default function Grid() {
    const {data: sections, error: errorSections, isLoading: isLoadingSections} = useListSections();
    const {data: elements, error: errorElements, isLoading: isLoadingElements} = useListElements('0');
    const { data: events } = useQuery({queryKey: ['events'], queryFn: () => fetchEvents(now, now)})
    const [now, setNow] = useRecoilState(currentDate)

    const view = useRecoilValue(viewState);
    return <div className={styles.root}>
        {
            view === 'month' && <MonthView/>
        }
        {
            view === 'week' && <WeekView/>
        }
        {
            events && elements && sections && view === 'day' && <DayView sections={sections} elements={elements} events={events}/>
        }
    </div>
}