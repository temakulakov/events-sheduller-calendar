import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

const fetchCRMEvents = async (): Promise<CRMEvent[]> => {
    const response = await axios.get('https://intranet.gctm.ru/rest/1552/0ja3gbkg3kxex6aj/crm.deal.list', {
        params: {
            select: [
                "ID", "TITLE", "STAGE_ID", "OPPORTUNITY", "UF_CRM_1714583071",
                "UF_CRM_DEAL_1712137850471", "UF_CRM_DEAL_1712137877584", "UF_CRM_DEAL_1712137914328",
                "UF_CRM_1714663307", "UF_CRM_DEAL_1712138052482", "UF_CRM_DEAL_1712138132003",
                "UF_CRM_DEAL_1712138182738", "UF_CRM_DEAL_1712138239034", "OPPORTUNITY",
                "UF_CRM_DEAL_1712138336714", "UF_CRM_DEAL_1712138395258", "UF_CRM_DEAL_1712138457130",
                "UF_CRM_DEAL_1712138504154", "UF_CRM_DEAL_1712138530562", "UF_CRM_1714648360",
                "ASSIGNED_BY_ID", "CREATED_BY", "UF_CRM_DEAL_1712137787958", "UF_CRM_1714654129"
            ],
            filter: {
                'CATEGORY_ID': 7,
                '!=STAGE_ID': 'C7:NEW'
            }
        }
    });

    return response.data.result.map((deal: any) => ({
        id: deal.ID,
        title: deal.TITLE,
        stageId: deal.STAGE_ID,
        opportunity: deal.OPPORTUNITY,
        responsibleStaffList: deal.UF_CRM_1714583071,
        startDate: deal.UF_CRM_DEAL_1712137850471,
        endDate: deal.UF_CRM_DEAL_1712137877584,
        eventType: deal.UF_CRM_DEAL_1712137914328,
        duration: deal.UF_CRM_1714663307,
        responsibleDepartment: deal.UF_CRM_DEAL_1712138052482,
        usedRooms: deal.UF_CRM_DEAL_1712138132003,
        seatsCount: deal.UF_CRM_DEAL_1712138182738,
        contractType: deal.UF_CRM_DEAL_1712138239034,
        price: deal.OPPORTUNITY,
        requisites: deal.UF_CRM_DEAL_1712138336714,
        publicationPlaces: deal.UF_CRM_DEAL_1712138395258,
        technicalSupportRequired: deal.UF_CRM_DEAL_1712138457130 === 'Y',
        comments: deal.UF_CRM_DEAL_1712138504154,
        eventDetails: deal.UF_CRM_DEAL_1712138530562,
        contactFullName: deal.UF_CRM_1714648360,
        assignedById: deal.ASSIGNED_BY_ID,
        createdBy: deal.CREATED_BY,
        description: deal.UF_CRM_DEAL_1712137787958,
        techSupportNeeds: deal.UF_CRM_1714654129
    }));
};

export const useCRMEvents = () => useQuery({queryKey: ['crmEvents'], queryFn: fetchCRMEvents});
