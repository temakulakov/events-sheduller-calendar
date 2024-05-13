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
        <div className={styles.root} style={{ backgroundColor: color ? color : "red" }}>
            <div className={styles.inner} style={{ backgroundColor: color ? color : "red" }} />
            {
                report && report[sectionId] && report[sectionId].elements[element.id] && report[sectionId].elements[element.id].percents &&  report[sectionId].elements[element.id].percents
            }
        </div>
    );
};

export default Loading;
