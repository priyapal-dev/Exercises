import React, {useContext} from 'react';
import appContext from './context/appContext';

const Child1 = () => {
    const {data,setData} = useContext(appContext);
    const handleDataChange=(e)=>{
        setData(e.target.value)
    };
  return (
    <div>
      <h2>child 1</h2>
      <input type='text' value={data} onChange={handleDataChange}/>
    </div>
  )
}

export default Child1;
