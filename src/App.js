import axios from 'axios';
import { useEffect, useState } from 'react';
import './App.css';
import Todo from './Components/Todo';

const App = () => {
  const [response, setResponse] = useState([]);
  const [user, setUser] = useState("1")

  const getData = async() => {
    const resp = await axios.get("https://jsonplaceholder.typicode.com/todos");
    setResponse(resp.data);
  }

  useEffect(() => {
    getData();
  }, []);

  const onDone = (item) => {
    const doneList = response.map((check) => {
      if(item.id === check.id){
        return ({...check, completed: !check.completed})
      } else{
        return check;
      }
    });
    setResponse(doneList);  
  }

  const onDelete = (item) => {
    const updatedList = response.filter((check) => {
      if(item.id === check.id){
        return false;
      } else{
        return true;
      }
    });
    setResponse(updatedList);
  }

  return (
    <main>
      <nav className="flex flex-row items-center justify-between mx-[100px] mt-[25px]">
        <div className="logo hidden xl:flex">                
            <a href="./index.html"><h3 className="font-bold text-[25px] w-[200px]">TodoList App</h3></a>
        </div>
        <div className="flex flex-row items-center gap-[40px]">
            <h3 className="font-bold text-[25px]">Username</h3>
            <div className='w-[40px] h-[40px] rounded-full bg-red-300'></div>
        </div>
      </nav>
      {/* stats and add todo */}
      <div className='mx-[100px] mt-[30px] flex flex-row gap-[50px] items-center justify-between'>
        <div className='w-[70vw] h-[150px] bg-green-100 rounded-3xl'></div>
        <div className='w-[25vw] h-[150px] bg-green-100 rounded-3xl'></div>
        <div className='w-[25vw] h-[150px] bg-green-100 rounded-3xl'></div>
      </div>
      {/* displaying todo */}
      <div className='grid grid-cols-3 gap-[40px] mx-[100px] mt-[30px] mb-[100px] items-center justify-between'>
        {response.map((item) => (
          <Todo key={item.id} item={item} onDone={onDone} onDelete={onDelete} />
        ))}
      </div>
      {/* displayign todo until here */}
    </main>
  );
}

export default App;
