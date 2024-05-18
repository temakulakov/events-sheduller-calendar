import styles from './Header.module.scss';
import React, {useEffect, useState} from "react";
import {LeftOutlined, MenuOutlined, RightOutlined} from "@ant-design/icons";
import {Button, ButtonGroup} from "@mui/material";
import {useRecoilState} from "recoil";
import {calendarMin, currentDate, viewState} from "../../store/atoms";
import dayjs from "dayjs";
import {Month, WeekDay} from "../../consts";
import ReportModal from '../ReportModal/ReportModal'

const Header = () => {
    const [menu, setMenu] = useRecoilState(calendarMin);
    const [currentDay, setCurrentDay] = useRecoilState(currentDate);
    const [view, setView] = useRecoilState(viewState);

    const [ reportModal, setReportModal ] = useState<boolean>(false);


    const handleToday = () => {
        setCurrentDay(dayjs());
    }

    const handleNext = (action: 'min' | 'pls') => {
        switch (view) {
            case 'day':
                action === 'min' ? setCurrentDay(currentDay.subtract(1, 'day')) : setCurrentDay(currentDay.add(1, 'day'))
                break;
            case 'week':
                action === 'min' ? setCurrentDay(currentDay.subtract(1, 'week')) : setCurrentDay(currentDay.add(1, 'week'))
                break;
            case 'month':
                action === 'min' ? setCurrentDay(currentDay.subtract(1, 'month')) : setCurrentDay(currentDay.add(1, 'month'))

                break;
        }
    }


    return <div className={styles.root}>
        <div className={styles.menu}>
            <div className={styles.arrow} onClick={() => setMenu(!menu)}><MenuOutlined
                width={70} height={50}/></div>
            <Button sx={{height: 'fit-content'}} variant="outlined" onClick={handleToday}> Сегодня</Button>
            <div className={styles.arrow} onClick={() => handleNext('min')}><LeftOutlined/></div>
            <div className={styles.arrow} onClick={() => handleNext('pls')}><RightOutlined/></div>
            <h1>
                {
                    view === 'day' &&
                    <>{currentDay.date()} {Month[currentDay.month()]} {currentDay.year()} {WeekDay[currentDay.day()]}</>
                }

                {
                    view === 'week' && <>{Month[currentDay.month()]} {currentDay.year()}</>
                }

                {
                    view === 'month' && <>{Month[currentDay.month()]} {currentDay.year()}</>
                }
            </h1>
        </div>
        <div className={styles.menu}>
            <Button onClick={() => setReportModal(true)} variant={'outlined'}>Отчет</Button>

            <ButtonGroup variant="outlined" aria-label="Basic button group">
                <Button onClick={() => setView('month')} className={styles.button}>Месяц</Button>
                <Button onClick={() => {setView('week'); setCurrentDay(dayjs())}} className={styles.button}>Неделя</Button>
                <Button onClick={() => setView('day')} className={styles.button}>День</Button>
            </ButtonGroup>
        </div>
        <ReportModal onClose={() => setReportModal(false)} open={reportModal}/>
    </div>
};

export default Header;