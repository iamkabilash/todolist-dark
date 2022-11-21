import axios from 'axios';
import { useEffect, useState } from 'react';
import './App.css';
import Todo from './Components/Todo';

const App = () => {
  const [response, setResponse] = useState([]);
  const [user, setUser] = useState("1");
  const [userList, setUserList] = useState([]);
  const [todo, setTodo] = useState("");
  const [totalTodo, setTotalTodo] = useState("");
  const [openTodo, setOpenTodo] = useState("");
  const [closedTodo, setClosedTodo] = useState("");

  const getData = async() => {
    const resp = await axios.get("https://jsonplaceholder.typicode.com/todos");
    setResponse(resp.data);
    setUserList([...new Set(resp.data.map(item => item.userId))]);
    setTotalTodo(resp.data.length);
    const closed = resp.data.filter((item) => item.completed);
    setClosedTodo(closed.length);
    const open = resp.data.filter((item) => item.completed === false);
    setOpenTodo(open.length);
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
    if (item.completed===false){
      setOpenTodo(openTodo-1);
      setClosedTodo(closedTodo+1);
    } else{
      setOpenTodo(openTodo+1);
      setClosedTodo(closedTodo-1);
    }
  }

  const onDelete = (item) => {
    item.completed ? setClosedTodo(closedTodo-1) : setOpenTodo(openTodo-1);
    const updatedList = response.filter((check) => {
      if(item.id === check.id){
        return false;
      } else{
        return true;
      }
    });
    setResponse(updatedList);
    setTotalTodo(updatedList.length);
  }

  const selectUser = (e) =>{
    let currentUser = e.target.value;
    setUser(currentUser);
  }

  const addTodo = () => {
    setResponse([...response, {
      "userId": user,
      "id": response.length + 1,
      "title": todo,
      "completed": false
    }]);
    setTotalTodo(totalTodo + 1);
    setOpenTodo(openTodo+1)
    setTodo("");
  }

  return (
    <main>
      <nav className="flex flex-row items-center justify-between mx-[50px] lg:mx-[100px] mt-[25px]">
        <div className="">                
            <a href="./index.html"><h3 className="font-bold text-[25px] w-[200px] text-white">TodoList App ✅</h3></a>
        </div>
        <div className="flex flex-row items-center gap-[20px]">
            <h3 className="font-bold text-[25px] text-white">Dark theme</h3>
            <div className='w-[40px] h-[40px] rounded-full bg-gradient-to-t from-violet-500 to-fuchsia-500'></div>
        </div>
      </nav>
      {/* stats and add todo */}
      <div className='mx-[100px] mt-[30px] flex flex-col xl:flex-row gap-[50px] items-center justify-center xl:justify-between'>
        <div className='flex flex-col w-[80vw] xl:w-[65vw] h-[150px] bg-gradient-to-r from-purple-300 to-pink-300 rounded-3xl px-[50px]'>
          <div className='mt-[25px] flex flex-row items-center gap-[10px]'>
            <h2 className='text-xl font-bold'>Add a new Todo to User</h2>
            <select onChange={selectUser} className="font-bold text-[15px] rounded-lg w-[40px] h-[25px]">
                {userList.map((item) => (<option key={item} value={item}>{item}</option>))}
            </select>
          </div>
          <div className='flex flex-row mt-[25px] justify-between'>
            <input onChange={(e) => setTodo(e.target.value)} value={todo} type="text" placeholder='Enter a Todo' className='w-[400px] px-[10px] rounded-lg' />
            <button onClick={addTodo} className='bg-gradient-to-r from-purple-400 to-pink-400 hover:from-purple-500 hover:to-pink-500 text-lg font-semibold px-[30px] py-[6px] rounded-xl'>Add</button>
          </div>
        </div>
        <div className='ml-[20vw] xl:ml-[0px] flex flex-row gap-[50px] w-screen xl:w-[35vw]'>
          <div className='w-[35vw] xl:w-[25vw] h-[150px] bg-gradient-to-r from-purple-300 to-pink-300 rounded-3xl p-[20px]'>
            <h3 className='text-xl font-semibold'>Open tasks</h3>
            <h2 className='mt-[15px] text-4xl font-bold'>{openTodo} / {totalTodo}</h2>
          </div>
          <div className='w-[35vw] xl:w-[25vw] h-[150px] bg-gradient-to-r from-purple-300 to-pink-300 rounded-3xl p-[20px]'>
            <h3 className='text-xl font-semibold'>Completed</h3>
            <h2 className='mt-[15px] text-4xl font-bold'>{closedTodo} / {totalTodo}</h2>
          </div>
        </div>
      </div>
      {/* displaying todo */}
      <div className='grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-[40px] mx-[100px] mt-[30px] mb-[100px] items-center justify-between'>
        {response.map((item) => (
          <Todo key={item.id} item={item} onDone={onDone} onDelete={onDelete} />
        ))}
      </div>
      {/* displayign todo until here */}
    </main>
  );
}

export default App;