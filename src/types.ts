import {Dayjs} from "dayjs";

export interface IEvent {
    id: string;
    title: string;
    stageId: string;
    opportunity: number;
    responsibleStaffList: string; // Список ответственных сотрудников
    startDate: Dayjs; // Дата начала
    endDate: Dayjs; // Дата окончания
    eventType: string; // Тип мероприятия
    duration: string; // Длительность
    responsibleDepartment: string; // Отвественный отдел
    usedRooms: string; // Используемые залы
    seatsCount: string; // Количество мест
    contractType: string; // Вид договора
    price: number; // Цена в рублях
    requisites: string; // Реквизиты
    publicationPlaces: string; // Площадки для публикаций
    technicalSupportRequired: boolean; // Требуется ли техническое сопровождение
    comments: string; // Комментарии
    eventDetails: string; // Что будет происходить
    contactFullName: string; // ФИО
    assignedById: string;
    createdBy: string;
    description: string; // Описание
    techSupportNeeds: string; // Что требуется для тех сопровождения
}
export interface UserField {
    id: number;     // ID как число
    title: string;  // FIELD_NAME как строка
    list?: EventType[]; // Массив элементов списка
};

export interface EventType {
    id: number;
    title: string;
}
export interface UserFieldAPI {
    ID: string;     // ID как число
    FIELD_NAME: string;  // FIELD_NAME как строка
    LIST?: ListItemAPI[]; // Массив элементов списка
}

export interface ListItemAPI {
    ID: string;     // ID как число
    VALUE: string;  // FIELD_NAME как строка
}

export interface User {
    id: number;
    fullName: string;
    avatarUrl: string;
}