import React, { useEffect, useState } from 'react';
import styles from './Filters.module.scss';
import { useListSections } from "../../../services/ListFilial";
import { useListElements } from "../../../services/ListRooms";
import { filtersState} from "../../../store/atoms";
import {useRecoilState} from "recoil";
import {Checkbox} from "@mui/material";

interface Section {
    id: number;
    title: string;
}

export default function AccordionUsage() {
    const { data: sections, error: errorSections, isLoading: isLoadingSections } = useListSections();
    const { data: elements, error: errorElements, isLoading: isLoadingElements } = useListElements('0');
    const [sectionStatus, setSectionStatus] = useState<boolean[]>([]);
    const [ filters, setFilters] = useRecoilState(filtersState)

    useEffect(() => {
        // Проверяем, есть ли данные в sections и создаем массив длиной sections.length
        if (sections) {
            const newSectionStatus: boolean[] = Array.from({ length: sections.length }, () => true);
            setSectionStatus(newSectionStatus);
        }
        if (elements) {
            setFilters(elements.map((el, ind) => el.id));
        }
    }, [sections, elements]);

    const handleSectionClick = (id: number) => {
        setSectionStatus(prevStatus => {
            const newStatus = [...prevStatus];
            newStatus[id] = !prevStatus[id];
            return newStatus;
        });
    };

    const handleCheckBoxClick = (i: number) => {
        if (filters.find(el => el === i)) {
            setFilters(filters.filter(el => el !== i));
        } else {
            setFilters([...filters, i]);
        }
    }

    useEffect(() => {
        console.log(filters)
    }, [filters]);


    return (
        <div className={styles.root}>
            {
                sections && elements && sections.map((element: Section, id: number) => {
                    const arr = elements.filter((el, ind) => el.sectionId === String(element.id))
                    return (
                        <div key={element.id} className={styles.section}>
                            <p className={styles.title} onClick={() => handleSectionClick(id)}>{element.title}</p>
                            <div className={styles.container} style={{display: sectionStatus[id] ? 'flex' : 'none'}}>{
                                arr.map(el => <div
                                    onClick={() => handleCheckBoxClick(el.id)}
                                    key={el.id}>
                                    <Checkbox
                                        checked={Boolean(filters.find(elem => elem === el.id))}
                                        inputProps={{ 'aria-label': 'controlled' }}
                                        sx={{
                                            color: el.color,
                                            '&.Mui-checked': {
                                                color: el.color,
                                            },
                                        }}
                                    />
                                    {el.title}
                                    </div>)
                            }</div>
                        </div>

                    );
                })
            }
        </div>
    );
}
