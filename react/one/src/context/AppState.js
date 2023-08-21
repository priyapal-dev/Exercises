import React, { useState } from "react";
import AppContext from "./appContext";
const AppState =(props)=>{
    const [data, setData] = useState('')
    return (
        <AppContext.Provider value={{data, setData}}>
            {props.children}
        </AppContext.Provider>
    )
}
export default AppState;