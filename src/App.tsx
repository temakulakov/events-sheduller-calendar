import React, {useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import AntCalendar from "./components/Calendar";
import {RecoilRoot, useRecoilState} from "recoil";
import {useQuery} from "@tanstack/react-query";
import {fetchEvents, fetchFields, fetchUsers} from "./services/BitrixService";
import {
    dateRange as DateRange,
    departmentEventState,
    publishEventState,
    roomEventState,
    typeContractEventState,
    typeEventState
} from "./store/atoms";
import {useListSections} from "./services/ListFilial";
import {useListElements} from "./services/ListRooms";

function App() {
    const {data: users, isLoading: loadingUsers, error: errorUsers} = useQuery({
        queryKey: ['users'],
        queryFn: fetchUsers
    });
    const {data: fields, isLoading: loadingFields, error: errorFields} = useQuery({
        queryKey: ['fields'],
        queryFn: fetchFields
    });


    const [ typeEvent, setTypeEvent] = useRecoilState(typeEventState);
    const [ departments, setDepartments] = useRecoilState(departmentEventState);
    const [ rooms, setRooms] = useRecoilState(roomEventState);
    const [contract, setContract] = useRecoilState(typeContractEventState)
    const [publish, setPublish] = useRecoilState(publishEventState)

    useEffect(() => {
        if (!errorFields && fields) {
            fields.forEach((element, index) => {
                if (element.id === 167 && element.list) setTypeEvent(element.list);
                if (element.id === 169 && element.list) setDepartments(element.list);
                if (element.id === 170 && element.list) setRooms(element.list);
                if (element.id === 172 && element.list) setContract(element.list);
                if (element.id === 175 && element.list) setPublish(element.list);
            });
        }
    }, [fields]);

    const {data: sections, error: errorSections, isLoading: isLoadingSections} = useListSections();
    const {data: elements, error: errorElements, isLoading: isLoadingElements} = useListElements('0');

    return (
        <div className="App">
            <AntCalendar/>
        </div>
    );
}

export default App;
