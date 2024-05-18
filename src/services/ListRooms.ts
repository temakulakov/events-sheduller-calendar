import axios from "axios";
import dayjs, {Dayjs} from 'dayjs';
import {IResponse, ListElement, ProcessedElement} from "../types";
import { useQuery } from "@tanstack/react-query";



// Функция для преобразования данных времени в формат dayjs
const processDateTime = (datetime: string): string => dayjs(datetime).format('YYYY-MM-DD HH:mm:ss');


const processListElements = (elements: ListElement[]): ProcessedElement[] => {
    let processedElements: ProcessedElement[] = [];
    try {
        processedElements = elements.map(element => {
            const processedElement = {
                id: parseInt(element.ID),
                title: element.NAME,
                sectionId: element.IBLOCK_SECTION_ID,
                timeStart: dayjs(processDateTime(element.PROPERTY_316[Object.keys(element.PROPERTY_316)[0]])),
                timeFinish: dayjs(processDateTime(element.PROPERTY_317[Object.keys(element.PROPERTY_317)[0]])),
                color: element.PROPERTY_318[Object.keys(element.PROPERTY_318)[0]]
            };
            return processedElement;
        });
    } catch (error) {
        console.log(error)
    }
    return processedElements;
};

// Функция для получения элементов списка
const fetchListElements = async (): Promise<ProcessedElement[]> => {
    try {
        const response = await axios.get<IResponse<ListElement[]>>('https://intranet.gctm.ru/rest/1552/0ja3gbkg3kxex6aj/lists.element.get.json?IBLOCK_TYPE_ID=lists&IBLOCK_ID=78&SECTION_ID=0');
        console.log('API Response:', response.data);
        const processedData = processListElements(response.data.result);
        console.log('Processed data:', processedData);
        return processedData;
    } catch (error) {
        console.error('Error fetching list elements:', error);
        throw error;  // Важно, чтобы вы могли видеть ошибку в вашем компоненте, использующем useQuery.
    }
};

// Хук для использования элементов списка
export const useListElements = () => {
    return useQuery({ queryKey: ['listElements'], queryFn: fetchListElements });
};
