import styles from './DayView.module.scss';
import {useListElements} from "../../../services/ListRooms";
import {useListSections} from "../../../services/ListFilial";
import {IEvent, ProcessedElement, ProcessedListSection} from "../../../types";
import ArrowBackIosNewOutlinedIcon from '@mui/icons-material/ArrowBackIosNewOutlined';
import {useRecoilValue} from "recoil";
import {calendarMin, filtersState} from "../../../store/atoms";
import React, {useState} from "react";
import {AnimatePresence, motion} from 'framer-motion'
import {v4} from 'uuid';

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
                            <h3>{section.title}</h3>
                            <ArrowBackIosNewOutlinedIcon sx={{rotate: active[sectionId] ? '90deg' : '270deg'}}/>
                        </div>
                        {
                            elements.filter(element => element.sectionId === String(section.id)).map((element, elementId) =>
                                <AnimatePresence>
                                    {active[sectionId] && <motion.div key={v4()}
                                                                      initial={{opacity: 0, top: -10, height: 0}}
                                                                      animate={{opacity: 1, top: 0, height: HEIGHT_ROW}}
                                                                      exit={{opacity: 0, top: -10, height: 0}}
                                                                      className={styles.row}>
                                        {element.title}
                                    </motion.div>}
                                </AnimatePresence>
                            )
                        }
                    </>
                </div>)
            }
        </div>
        <motion.div className={styles.grid} animate={{width: `calc(100vw - 204px - ${panel ? 270 : 0}px)`}}>
            <div className={styles.timeLine} style={{width: WIDTH * 24}}>{
                new Array(24).fill(null).map((el, key) => <div className={styles.time}
                                                               key={key}>{`${key}:00`}</div>)
            }</div>
            {
                sections.map((section, sectionId) => <div key={sectionId}>
                    <div style={{height: HEIGHT_ROW, width: WIDTH * 24}} className={styles.gridSection}>
                        {
                            elements.filter(element => element.sectionId === String(section.id)).map((element, elementId) => <div
                            key={elementId}>
                                <AnimatePresence>
                                    {
                                        !active[sectionId] && <motion.div
                                            key={v4()}
                                            initial={{opacity: 0, top: -10, height: 0, borderBottom: 'none'}}
                                            animate={{opacity: 1, top: 0, height: HEIGHT_ROW / elements.filter(element => element.sectionId === String(section.id)).length, width: WIDTH * 24, borderBottom: 'none'}}
                                            exit={{opacity: 0, top: -10, height: 0, borderBottom: 'none'}}
                                            className={styles.gridRow}>
                                            {
                                                events.filter((evenT, evenTId) => String(element.id) === evenT.usedRooms).map((evenT, evenTId) => <div style={{
                                                    left: WIDTH * evenT.startDate.diff(evenT.startDate.startOf('day'), 'hour'),
                                                    backgroundColor: elements.find(ele => ele.id === Number(evenT.usedRooms))?.color
                                                }}
                                                                                                                                                       className={styles.eventContainer}
                                                                                                                                                       key={evenT.id}>{evenT.title}</div>)
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
                                    key={v4()}
                                    initial={{opacity: 0, top: -10, height: 0}}
                                    animate={{opacity: 1, top: 0, height: HEIGHT_ROW, width: WIDTH * 24}}
                                    exit={{opacity: 0, top: -10, height: 0}}
                                    className={styles.gridRow}>
                                    {
                                        events.filter((evenT, evenTId) => String(element.id) === evenT.usedRooms).map((evenT, evenTId) => <div style={{
                                            left: WIDTH * evenT.startDate.diff(evenT.startDate.startOf('day'), 'hour'),
                                            backgroundColor: elements.find(ele => ele.id === Number(evenT.usedRooms))?.color
                                        }}
                                                                            className={styles.eventContainer}
                                                                            key={evenT.id}>{evenT.title}</div>)
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