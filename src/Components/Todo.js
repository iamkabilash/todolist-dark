const Todo = ({ item, onDone, onDelete }) => {

    const todoClass = (item) =>{
        const classes = "card h-[120px] rounded-xl flex flex-row pt-[10px] justify-between px-[20px] transition-transform hover:scale-110 ";
        if(item.completed === true){
            return classes + "bg-gradient-to-r from-[#f8a9b6] to-[#fdd6bd]"
        } else{
            return classes + "bg-gradient-to-r from-[#a4f5f1] to-[#57d9d2]"
        }
    }
    const strikeClass = (item) =>{
        const classes = "w-[90%] mt-[10px] font-semibold "
        if(item.completed === true){
            return classes + "line-through";
        } else{
            return classes;
        }
    }

    return(
        <div key={item.id} className={todoClass(item)}>
            <div className="flex flex-col">
                <div className="bg-gray-200 w-[70px] px-[5px] rounded-lg">
                    <p>User {item.userId}</p>
                </div>
                <p className={strikeClass(item)}>{item.title}</p>
            </div>
            <div className='flex flex-row gap-[15px] h-[120px] items-center mt-[-10px]'>
                <div id="done" onClick={() => onDone(item)} className='cursor-pointer hover:scale-125 hover:text-green-800'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-[30px] h-[30px]">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </div>
                <div id="delete" onClick={() => onDelete(item)} className='cursor-pointer hover:scale-125 hover:text-red-800'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-[28px] h-[28px]">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                    </svg>
                </div>
            </div>
        </div>
    );
}

export default Todo;