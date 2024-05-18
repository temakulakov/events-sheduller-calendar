import {atom} from "recoil";
import {EventType} from "../types";
import dayjs, {Dayjs} from "dayjs";

export const typeEventState = atom<EventType[]>({
    key: 'typeEventState', // unique ID (with respect to other atoms/selectors)
    default: [], // default value (aka initial value)
});

export const departmentEventState = atom<EventType[]>({
    key: 'departmentEventState', // unique ID (with respect to other atoms/selectors)
    default: [], // default value (aka initial value)
});

export const roomEventState = atom<EventType[]>({
    key: 'roomEventState', // unique ID (with respect to other atoms/selectors)
    default: [], // default value (aka initial value)
});

export const typeContractEventState = atom<EventType[]>({
    key: 'typeContractEventState', // unique ID (with respect to other atoms/selectors)
    default: [], // default value (aka initial value)
});

export const publishEventState = atom<EventType[]>({
    key: 'publishEventState', // unique ID (with respect to other atoms/selectors)
    default: [], // default value (aka initial value)
});


export const dateRange = atom<{from: Dayjs, to: Dayjs}>({
    key: 'dateRange',
    default: {from: dayjs(), to: dayjs()},
})


export const calendarMin = atom<boolean>({
    key: 'calendarMin',
    default: true,
})

export const currentDate = atom<Dayjs>({
    key: 'currentDate',
    default: dayjs(),
})

export const viewState = atom<'day'| 'week'| 'month'>({
    key: 'viewState',
    default: 'month',
})

export const filtersState = atom<number[]>({
    key: 'filtersState',
    default: [],
});

