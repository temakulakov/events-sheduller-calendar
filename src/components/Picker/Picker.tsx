import styles from './Picker.module.scss';
import {AnimatePresence, motion} from 'framer-motion'
import {useRecoilState, useRecoilValue} from "recoil";
import {calendarMin, currentDate} from "../../store/atoms";
import {DateCalendar, LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import 'dayjs/locale/ru';
import dayjs from "dayjs";
import Calendar from "../Calendar"; // импорт русской локализации

dayjs.locale('ru'); // установка локализации dayjs

export default function Picker() {
    const [now, setNow] = useRecoilState(currentDate)

    const active = useRecoilValue(calendarMin);
    return <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={'ru'}>
        <AnimatePresence>
            {
                active &&
                <motion.div
                    key={String(active)}
                    initial={{width: 0}} /* Начальное положение за левой границей экрана */
                    animate={{width: 270}} /* Конечное положение внутри экрана */
                    exit={{width: 0}} /* Положение за левой границей экрана при скрытии */
                    transition={{duration: 0.28}} /* Длительность анимации */
                    className={styles.root}
                >
                    <AnimatePresence>
                        {
                            active && <motion.div
                                key={String(active)+'w'}
                                initial={{x: -300}} /* Начальное положение за левой границей экрана */
                                animate={{x: 0}} /* Конечное положение внутри экрана */
                                exit={{x: -300}} /* Положение за левой границей экрана при скрытии */
                                transition={{duration: 0.28}} /* Длительность анимации */

                            >
                                <DateCalendar
                                    sx={{transform: 'scale(0.9)', width: '270px'}}
                                    value={now}
                                    onChange={(value, selectionState, selectedView) => setNow(value)}
                                />

                            </motion.div>
                        }
                    </AnimatePresence>

                </motion.div>
            }
        </AnimatePresence>

        </LocalizationProvider>
}
