import styles from './RowRender.module.scss';
import {IEvent, ProcessedElement} from "../../../../types";
import dayjs from "dayjs";

interface ICellRenderProps {
    date: string;
    events: IEvent[];
    elements: ProcessedElement[]
}

const RowRender = ({ date, events, elements}: ICellRenderProps) => {
    // return <div
    //     key={key}
    //     style={{
    //         background: 'rgb(66, 133, 244)',
    //         top: HEIGHT * dayjs(el.startDate).diff(dayjs(el.startDate).startOf('day'), 'minute') / 60,
    //         height: HEIGHT * dayjs(el.endDate).diff(dayjs(el.startDate), 'hour'),
    //     }}
    //     className={styles.event}
    // >{el.title}<br/>{el.startDate.format('HH:MM')}<br/>{el.endDate.format('HH:MM')}{}
    // </div>
};

export default RowRender;