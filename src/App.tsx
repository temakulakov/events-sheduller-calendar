import React, {useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import AntCalendar from "./components/Calendar";
import {RecoilRoot} from "recoil";
import {useQuery} from "@tanstack/react-query";
import {useCRMEvents} from "./services/BitrixService";

function App() {
    const {data, error, isLoading} = useCRMEvents();

    useEffect(() => {
        console.log(data)
    }, [data])
    if (isLoading) return <div>Loading...</div>;
    if (error instanceof Error) return <div>An error occurred: {error.message}</div>;


    return (
        <div className="App">
            <pre>{JSON.stringify(data, null, 2)}</pre>
            <AntCalendar/>
        </div>
    );
}

export default App;
