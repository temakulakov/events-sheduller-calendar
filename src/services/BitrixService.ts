import axios from 'axios';
import {useQuery} from '@tanstack/react-query';
import dayjs, {Dayjs} from "dayjs";
import {IEvent, User, UserField, UserFieldAPI} from "../types";

const webhook: string = 'https://intranet.gctm.ru/rest/1552/0ja3gbkg3kxex6aj/';
const events: string = 'crm.deal.list';
const users: string = 'user.get';
const fields: string = 'crm.deal.userfield.list';


const fetchEvents = async (startDate: Dayjs, endDate: Dayjs): Promise<IEvent[]> => {
    console.log(startDate.format('DD-MM-YYYY'))
    console.log(endDate.format('DD-MM-YYYY'))
    const response = await axios.get(`${webhook}${events}`, {
        params: {
            select: [
                "ID", "TITLE", "STAGE_ID", "OPPORTUNITY", "UF_CRM_1714583071",
                "UF_CRM_DEAL_1712137850471", "UF_CRM_DEAL_1712137877584", "UF_CRM_DEAL_1712137914328",
                "UF_CRM_1714663307", "UF_CRM_DEAL_1712138052482", "UF_CRM_DEAL_1712138132003",
                "UF_CRM_DEAL_1712138182738", "UF_CRM_DEAL_1712138239034", "OPPORTUNITY",
                "UF_CRM_DEAL_1712138336714", "UF_CRM_DEAL_1712138395258", "UF_CRM_DEAL_1712138457130",
                "UF_CRM_DEAL_1712138504154", "UF_CRM_DEAL_1712138530562", "UF_CRM_1714648360",
                "ASSIGNED_BY_ID", "CREATED_BY", "UF_CRM_DEAL_1712137787958", "UF_CRM_1714654129", 'UF_CRM_1715507748', 'UF_CRM_1715508611'
            ],
            filter: {
                'CATEGORY_ID': 7,
                '!=STAGE_ID': 'C7:NEW',
                '>=UF_CRM_DEAL_1712137850471': startDate.format('YYYY-MM-DD'),
                '<=UF_CRM_DEAL_1712137877584': endDate.format('YYYY-MM-DD'),
            }
        }
    });
    const res: IEvent[] = response.data.result.map((deal: any) => ({
        id: deal.ID,
        title: deal.TITLE,
        stageId: deal.STAGE_ID,
        opportunity: deal.OPPORTUNITY,
        responsibleStaffList: deal.UF_CRM_1714583071,
        startDate: dayjs(deal.UF_CRM_DEAL_1712137850471),
        endDate: dayjs(deal.UF_CRM_DEAL_1712137877584),
        eventType: deal.UF_CRM_DEAL_1712137914328,
        duration: deal.UF_CRM_1714663307,
        responsibleDepartment: deal.UF_CRM_1715507748,
        usedRooms: deal.UF_CRM_1715508611,
        seatsCount: deal.UF_CRM_DEAL_1712138182738,
        contractType: deal.UF_CRM_DEAL_1712138239034,
        price: deal.OPPORTUNITY,
        requisites: deal.UF_CRM_DEAL_1712138336714,
        ationPlaces: deal.UF_CRM_DEAL_1712138395258,
        technicalSupportRequired: deal.UF_CRM_DEAL_1712138457130 === 'Y',
        comments: deal.UF_CRM_DEAL_1712138504154,
        eventDetails: deal.UF_CRM_DEAL_1712138530562,
        contactFullName: deal.UF_CRM_1714648360,
        assignedById: deal.ASSIGNED_BY_ID,
        createdBy: deal.CREATED_BY,
        description: deal.UF_CRM_DEAL_1712137787958,
        techSupportNeeds: deal.UF_CRM_1714654129
    }));


    return res.sort((a, b) => a.startDate.unix() - b.startDate.unix());
}

const fetchFields = async (): Promise<UserField[]> => {
    const {data} = await axios.get<{
        result: UserFieldAPI[]
    }>(webhook + fields);
    return data.result.map(field => ({
        id: parseInt(field.ID),
        title: field.FIELD_NAME,
        list: field.LIST?.map(item => ({
            id: parseInt(item.ID),
            title: item.VALUE
        }))
    }))
}

const fetchUsers = async (): Promise<User[]> => {
    let allUsers: User[] = [];
    let start = 0;
    let hasMore = true;
    const endpoint = webhook + users;

    while (hasMore) {
        const params = {start, filter: {user_type: 'employee', active: true}};
        const response = await axios.get(endpoint, {params});
        const users = response.data.result.map((user: any) => ({
            id: parseInt(user.ID),
            fullName: `${user.NAME} ${user.LAST_NAME}`,
            avatarUrl: user.PERSONAL_PHOTO
        }));

        allUsers = allUsers.concat(users);
        start += 50; // или число возвращаемых записей, если оно известно
        hasMore = users.length === 50; // предполагаем, что если пришло меньше 50 пользователей, это последняя страница
    }
    return allUsers;
}

export {fetchUsers, fetchFields, fetchEvents};

