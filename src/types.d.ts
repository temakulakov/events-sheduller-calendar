interface CRMEvent {
    id: string;
    title: string;
    stageId: string;
    opportunity: number;
    responsibleStaffList: string; // Список ответственных сотрудников
    startDate: string; // Дата начала
    endDate: string; // Дата окончания
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
