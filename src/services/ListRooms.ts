import axios from "axios";
import dayjs, {Dayjs} from 'dayjs';
import {ListElement, ListElementsResponse, ProcessedElement} from "../types";
import { useQuery } from "@tanstack/react-query";



// Функция для преобразования данных времени в формат dayjs
const processDateTime = (datetime: string): string => dayjs(datetime).format('YYYY-MM-DD HH:mm:ss');

// Функция для обработки элементов списка и преобразования данных
const processListElements = (elements: ListElement[]): ProcessedElement[] => {
    return elements.map(element => {
        const key316 = Object.keys(element.PROPERTY_316)[0]; // Получаем первый ключ PROPERTY_316
        const key317 = Object.keys(element.PROPERTY_317)[0]; // Получаем первый ключ PROPERTY_317
        const key318 = Object.keys(element.PROPERTY_318)[0]; // Получаем первый ключ PROPERTY_318
        return ({
            id: parseInt(element.ID),
            title: element.NAME,
            sectionId: element.IBLOCK_SECTION_ID,
            timeStart: dayjs(processDateTime(element.PROPERTY_316[key316])), // Используем значение первого ключа PROPERTY_316
            timeFinish: dayjs(processDateTime(element.PROPERTY_317[key317])), // Используем значение первого ключа PROPERTY_317
            color: element.PROPERTY_318[key318], // Используем значение первого ключа PROPERTY_318
        });
    });
};

// Функция для получения элементов списка
const fetchListElements = async (sectionId: string): Promise<ProcessedElement[]> => {
    const { data } = await axios.get<ListElementsResponse>(`https://intranet.gctm.ru/rest/1552/0ja3gbkg3kxex6aj/lists.element.get.json?IBLOCK_TYPE_ID=lists&IBLOCK_ID=78&SECTION_ID=${sectionId}`);
    return processListElements(data.result);
};

// Хук для использования элементов списка
export const useListElements = (sectionId: string) => {
    return useQuery({ queryKey: ['listElements', sectionId], queryFn: () => fetchListElements(sectionId) });
};
