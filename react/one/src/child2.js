import React, {useContext} from 'react'
import appContext from './context/appContext';

const Child2 = () => {
    const {data,setData} = useContext(appContext);
    const handleDataChange=(e)=>{
        setData(e.target.value)
    };
  return (
    <div>
      <h2>child 2</h2>
      <input type='text' value={data} onChange={handleDataChange}/>
    </div>
  )
}

export default Child2;
