import styles from './Header.module.scss';
import React from "react";
import {LeftOutlined, MenuOutlined, RightOutlined} from "@ant-design/icons";
import {Button, ButtonGroup} from "@mui/material";
import {useRecoilState} from "recoil";
import {calendarMin, currentDate, viewState} from "../../store/atoms";
import dayjs from "dayjs";
import {Month, WeekDay} from "../../consts";


const Header = () => {
    const [ menu, setMenu] = useRecoilState(calendarMin);
    const [ currentDay, setCurrentDay ] = useRecoilState(currentDate);
    const [ view, setView ] = useRecoilState(viewState)


    const handleToday = () => {
        setCurrentDay(dayjs());
    }
    const handleNext = (action: 'min' | 'pls') => {
        switch (view) {
            case 'day':
                action === 'min' ? currentDay.subtract(1, 'day') : currentDay.add(1, 'day')
                break;
            case 'week':
                action === 'min' ? currentDay.subtract(1, 'week') : currentDay.add(1, 'week')
                console.log('wefwef')
                break;
            case 'month':
                action === 'min' ? currentDay.subtract(1, 'month') : currentDay.add(1, 'week')

                break;
        }
    }
    return <div className={styles.root}>
        <div className={styles.menu}>
            <div className={styles.arrow} onClick={() => setMenu(!menu)}><MenuOutlined style={{height: '100%', width: 'auto'}} width={70} height={50}/></div>
            <Button variant="outlined">Сегодня</Button>
            <div className={styles.arrow} onClick={() => handleNext('min')} ><LeftOutlined /></div>
            <div className={styles.arrow} onClick={() => handleNext('pls')} ><RightOutlined /></div>
            <div>
                {
                    view === 'day' &&
                    <p>{currentDay.date()} {Month[currentDay.month()]} {currentDay.year()} {WeekDay[currentDay.day()]}</p>
                }
                {
                    view === 'month' && <p>{Month[currentDay.month()]} {currentDay.year()}</p>
                }
            </div>
        </div>
        <div className={styles.menu}>
            <ButtonGroup variant="outlined" aria-label="Basic button group">
                <Button onClick={() => setView('month')}>Месяц</Button>
                <Button onClick={() => setView('week')}>Неделя</Button>
                <Button onClick={() => setView('day')}>День</Button>
            </ButtonGroup>
        </div>
    </div>
};

export default Header;