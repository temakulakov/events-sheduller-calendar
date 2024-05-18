import React, { useState, useEffect } from "react";
import styles from "./Loading.module.scss";

interface LoadingProps {
    color: string;
    description: string;
    report: {
        id: number;
        elements: {
            id: number;
            hours: number;
            percents: number;
        }[];
    }[];
    sectionId: number;
    element: {
        id: number;
        color: string;
    };
}

const Loading: React.FC<LoadingProps> = ({ color, description, report, sectionId, element }) => {
    const [hours, setHours] = useState<number>(0);
    const [percents, setPercents] = useState<number>(0);

    useEffect(() => {
        if (report && report[sectionId] && report[sectionId].elements) {
            const currentElement = report[sectionId].elements.find((el) => el.id === element.id);
            if (currentElement) {
                setHours(currentElement.hours);
                setPercents(currentElement.percents);
            }
        }
    }, [report, sectionId, element.id]);

    return (
        <div className={styles.root}>
            <p>{percents && `${percents.toFixed(2)}%`}</p>
            <div className={styles.outer} style={{backgroundColor: color ? color : "red"}}>
            </div>
            <div className={styles.inner}
                 style={{backgroundColor: color ? color : "red", width: `${percents}%`}}
            />
        </div>
    )
        ;
};

export default Loading;