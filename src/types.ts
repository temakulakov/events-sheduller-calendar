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


// Тип данных для ответа от API
export interface IResponse<T> {
    result: T;
    total: number;
    time: {
        start: number;
        finish: number;
        duration: number;
        processing: number;
        date_start: string;
        date_finish: string;
    };
}

// Тип данных для ответа от API
export interface ProcessedElement {
    id: number;
    title: string;
    sectionId: string;
    timeStart: Dayjs; // значение как timeStart
    timeFinish: Dayjs; // значение как timeFinish
    color: string; // значение как color
}

// Тип данных для ответа от API
export interface ProcessedListSection {
    id: number;
    title: string;
}

export interface ListElement {
    ID: string;
    IBLOCK_ID: string;
    NAME: string;
    IBLOCK_SECTION_ID: string;
    CREATED_BY: string;
    BP_PUBLISHED: string;
    CODE: string | null;
    PROPERTY_316: { [key: string]: string };
    PROPERTY_317: { [key: string]: string };
    PROPERTY_318: { [key: string]: string };
}

export interface ListSection {
    ID: string;
    TIMESTAMP_X: string;
    MODIFIED_BY: string;
    DATE_CREATE: string;
    CREATED_BY: string;
    IBLOCK_ID: string;
    IBLOCK_SECTION_ID: string | null;
    ACTIVE: string;
    GLOBAL_ACTIVE: string;
    SORT: string;
    NAME: string;
    PICTURE: string | null;
    LEFT_MARGIN: string;
    RIGHT_MARGIN: string;
    DEPTH_LEVEL: string;
    DESCRIPTION: string | null;
    DESCRIPTION_TYPE: string;
    SEARCHABLE_CONTENT: string;
    CODE: string | null;
    XML_ID: string | null;
    TMP_ID: string | null;
    DETAIL_PICTURE: string | null;
    SOCNET_GROUP_ID: string | null;
    LIST_PAGE_URL: string | null;
    SECTION_PAGE_URL: string | null;
    IBLOCK_TYPE_ID: string;
    IBLOCK_CODE: string | null;
    IBLOCK_EXTERNAL_ID: string | null;
    EXTERNAL_ID: string | null;
}