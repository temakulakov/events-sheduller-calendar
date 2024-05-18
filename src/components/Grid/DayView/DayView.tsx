import styles from './DayView.module.scss';
import {useListElements} from "../../../services/ListRooms";
import {useListSections} from "../../../services/ListFilial";
import {IEvent, ProcessedElement, ProcessedListSection} from "../../../types";
import ArrowBackIosNewOutlinedIcon from '@mui/icons-material/ArrowBackIosNewOutlined';
import {useRecoilValue} from "recoil";
import {calendarMin, currentDate, filtersState} from "../../../store/atoms";
import React, {useCallback, useEffect, useRef, useState} from "react";
import {AnimatePresence, motion} from 'framer-motion'
import {v4} from 'uuid';
import dayjs from "dayjs";
import Loading from "./Loading/Loading";

interface Props {
    sections: ProcessedListSection[];
    elements: ProcessedElement[];
    events: IEvent[];
};

const WIDTH = 100;
const HEIGHT_ROW = 50;

const DayView = ({sections, events, elements}: Props) => {
    const filters = useRecoilValue(filtersState);
    const [active, setActive] = useState(Array.from({length: sections.length}, () => true));
    const panel = useRecoilValue(calendarMin);
    const dateTime = useRecoilValue(currentDate)
    const containerRef = useRef<HTMLDivElement>(null);
    const [ report, setReport ] = useState<{id: number; elements: {id: number; hours: number; percents: number}[]}[]>(sections.map(section => ({
        id: section.id,
        elements: elements.filter(element => element.sectionId === String(section.id)).map(element => ({
            id: element.id,
            hours: 0,
            percents: 0
        }))
    })));

    const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
        if (containerRef.current) {
            const container = containerRef.current;
            const delta = e.deltaY || e.deltaX || e.deltaZ;

            container.scrollLeft += delta;
            e.preventDefault();
        }
    };

    useEffect(() => {
        console.log(report)
    }, [report]);

    const calculatingReport = useCallback(() => {
        setReport(
            sections.map(section => ({
                id: section.id,
                elements: elements.filter(element => element.sectionId === String(section.id)).map(element => {
                    const minutes = events.filter(evenT => evenT.usedRooms === String(element.id)).reduce((accumulator, currentValue) => {
                        let duration = 0;
                        if (element.timeStart > currentValue.startDate) {
                            if (element.timeFinish < currentValue.endDate) {
                                duration = element.timeFinish.set('year', dayjs().year()).set('month', dayjs().month()).set('date', dayjs().date()).diff(element.timeStart.set('year', dayjs().year()).set('month', dayjs().month()).set('date', dayjs().date()), 'minute');
                            } else {
                                duration = currentValue.endDate.set('year', dayjs().year()).set('month', dayjs().month()).set('date', dayjs().date()).diff(element.timeStart.set('year', dayjs().year()).set('month', dayjs().month()).set('date', dayjs().date()), 'minute');
                            }
                        } else {
                            if (element.timeFinish < currentValue.endDate) {
                                duration = element.timeFinish.set('year', dayjs().year()).set('month', dayjs().month()).set('date', dayjs().date()).diff(currentValue.startDate.set('year', dayjs().year()).set('month', dayjs().month()).set('date', dayjs().date()), 'minute');
                            } else {
                                duration = currentValue.endDate.set('year', dayjs().year()).set('month', dayjs().month()).set('date', dayjs().date()).diff(currentValue.startDate.set('year', dayjs().year()).set('month', dayjs().month()).set('date', dayjs().date()), 'minute');
                            }
                        }
                        return duration;
                    }, 0)
                    return {
                        id: element.id,
                        hours: minutes / 60,
                        percents: minutes / (element.timeFinish.set('year', dayjs().year()).set('month', dayjs().month()).set('date', dayjs().date()).diff(element.timeStart.set('year', dayjs().year()).set('month', dayjs().month()).set('date', dayjs().date()), 'minute') / 100)
                    }
                })
            }))
        );

    }, [events]);

    useEffect(() => {
        calculatingReport();
    }, [dateTime, events]);


    useEffect(() => {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting && containerRef.current) {
                    const container = containerRef.current;
                    container.scrollLeft += dayjs().diff(dayjs().startOf('day'), 'minute') * WIDTH / 60 - 100;
                }
            });
        });

        if (containerRef.current) {
            observer.observe(containerRef.current);
        }

        return () => {
            if (containerRef.current) {
                observer.unobserve(containerRef.current);
            }
        };
    }, []);

    return <div className={styles.root}>
        <div className={styles.panel}>
            {
                sections.map((section, sectionId) => <div key={sectionId} className={styles.section}>
                    <>
                        <div className={styles.sectionTitle} style={{height: HEIGHT_ROW}}
                             onClick={() => setActive(prevStatus => {
                                 const newStatus = [...prevStatus];
                                 newStatus[sectionId] = !prevStatus[sectionId];
                                 return newStatus;
                             })}>
                            <h4>{section.title}</h4>
                            <ArrowBackIosNewOutlinedIcon sx={{rotate: active[sectionId] ? '90deg' : '270deg', width: 15, marginLeft: '10px'}}/>
                        </div>
                        {
                            elements.filter(element => element.sectionId === String(section.id)).map((element, elementId) =>
                                <AnimatePresence>
                                    {active[sectionId] && <motion.div key={String(active[sectionId])}
                                                                      initial={{opacity: 0, top: -10, height: 0}}
                                                                      animate={{opacity: 1, top: 0, height: HEIGHT_ROW}}
                                                                      exit={{opacity: 0, top: 10, height: 0}}
                                                                      className={styles.row}>
                                        <span>{element.title}</span>
                                        {

                                            sections && elements && <Loading color={element.color} description={`wfe`} report={report} sectionId={sectionId} element={element} />
                                        }
                                    </motion.div>}
                                </AnimatePresence>
                            )
                        }
                    </>
                </div>)
            }
        </div>
        <motion.div ref={containerRef} onWheel={handleWheel} className={styles.grid} animate={{width: `calc(100vw - 204px - ${panel ? 270 : 0}px)`}}>
            <div className={styles.redLine} style={{ left: dayjs().diff(dayjs().startOf('day'), 'minute') * WIDTH / 60}}/>
            <div className={styles.timeLine} style={{width: WIDTH * 24}}>{
                new Array(24).fill(null).map((el, key) => <div className={styles.time}
                                                               key={key}>{`${key}:00`}</div>)
            }</div>
            {
                sections.map((section, sectionId) => <div key={sectionId}>
                    <div style={{height: HEIGHT_ROW, width: WIDTH * 24}} className={styles.gridSection}>
                        {
                            elements.filter(element => element.sectionId === String(section.id)).map((element, elementId) => <div
                            key={`${elementId}-${element.id}`}>
                                <AnimatePresence>
                                    {
                                        !active[sectionId] && <motion.div
                                            key={String(active[sectionId])}
                                            initial={{opacity: 0, top: -10, height: 0, borderBottom: 'none'}}
                                            animate={{opacity: 1, top: 0, height: HEIGHT_ROW / elements.filter(element => element.sectionId === String(section.id)).length, width: WIDTH * 24, borderBottom: 'none'}}
                                            exit={{opacity: 0, top: 10, height: 0, borderBottom: 'none'}}
                                            className={styles.gridRow}>
                                            {
                                                events.filter((evenT, evenTId) => String(element.id) === evenT.usedRooms).map((evenT, evenTId) => {


                                                    return <div style={{
                                                        left: WIDTH * evenT.startDate.diff(evenT.startDate.startOf('day'), 'minute') / 60,
                                                        backgroundColor: elements.find(ele => ele.id === Number(evenT.usedRooms))?.color
                                                    }}
                                                                className={styles.eventContainer}
                                                                key={evenT.id}>{evenT.title}</div>
                                                })
                                            }
                                        </motion.div>
                                    }
                                </AnimatePresence>
                            </div>)
                        }
                    </div>
                    {
                        elements.filter(element => element.sectionId === String(section.id)).map((element, elementId) =>
                            <AnimatePresence>
                                {active[sectionId] && <motion.div
                                    key={String(active[sectionId])}
                                    initial={{opacity: 0, top: -10, height: 0,}}
                                    animate={{opacity: 1, top: 0, height: HEIGHT_ROW, width: WIDTH * 24}}
                                    exit={{opacity: 0, top: -10, height: 0,}}
                                    className={styles.gridRow}>
                                    {
                                        events.filter((evenT, evenTId) => String(element.id) === evenT.usedRooms).map((evenT, evenTId) => {
                                            console.log(evenT.endDate.diff(evenT.startDate, 'minute') / 60)
                                            return <div style={{
                                                left: WIDTH * evenT.startDate.diff(evenT.startDate.startOf('day'), 'minute') / 60,
                                                backgroundColor: elements.find(ele => ele.id === Number(evenT.usedRooms))?.color,
                                                width: WIDTH * evenT.endDate.diff(evenT.startDate, 'minute') / 60,
                                            }}
                                                        className={styles.eventContainer}
                                                        key={evenT.id}>
                                                <span>{evenT.title}</span><span>{evenT.startDate.format('HH-mm')} - {evenT.endDate.format(('HH-mm'))}</span>
                                            </div>
                                        })
                                    }
                                </motion.div>}
                            </AnimatePresence>)
                    }
                </div>)
            }
        </motion.div>
    </div>
};

export default DayView