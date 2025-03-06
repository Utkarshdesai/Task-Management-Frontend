import React from 'react'
import { useEffect, useState } from 'react'
import Taskform from './Taskform'
import axios from 'axios'  

const Tasklist = () => {
    const [tasklist ,settasklist] = useState([])
    const [selectedTask, setSelectedTask] = useState(null);
    const [edittitle ,setedittitle] = useState('')
    const [editdesc , seteditdesc] = useState('')

  
   
    
    console.log (editdesc ,edittitle)

    //fetch task 
    const alltask = async () =>{
        const data = await axios.get('http://localhost:3000/api/v1/task')
       
        settasklist(data.data.alltask)
     }
   
   
     useEffect (() => {
       alltask()
     } ,[])

     


     //delete task 
     const deletetask = async (id) => {
       
        const deletetask = await axios.delete(`http://localhost:3000/api/v1/task/${id}`) 
        console.log(deletetask)
         //update UI 
        settasklist(tasklist.filter((task) => task.id !== id)); 
     }



 // Handle edit button click
  const handleEditClick = (task) => {
 
    setSelectedTask(task._id);
    seteditdesc(task.description)
    setedittitle(task.title)
     
  };

 
 const updatetask = async () => {
  
    const updatetask = await axios.put(`http://localhost:3000/api/v1/task/${selectedTask}` , {title: edittitle , description:editdesc})
    console.log(updatetask)
 }

     

  return (
    <div className="max-w-2xl mx-auto bg-white shadow-md rounded-lg p-6">
    <h1 className="text-2xl font-bold text-gray-700 mb-4 text-center">Task List</h1>
  
    {tasklist.length > 0 ? (
      <div className="space-y-4">
        {tasklist.map((task) => (
          <div key={task._id} className="border border-gray-300 rounded-lg p-4 shadow-sm bg-gray-50">
            {selectedTask === task._id ? (
              <>
                {/* Editable Inputs */}
                <input
                  type="text"
                  name="title"
                  value={edittitle}
                  onChange={(e) => setedittitle(e.target.value)}
                  className="border border-gray-300 p-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 mb-2"
                />
                
                <textarea
                  type="text"
                  name="description"
                  value={editdesc}
                  onChange={(e) => seteditdesc(e.target.value)}
                  className="border border-gray-300 p-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 mb-2"
                />
  
                {/* Update Button */}
                <button
                  onClick={updatetask}
                  className="bg-green-500 text-white px-4 py-2 rounded-md font-medium hover:bg-green-600 transition duration-300 w-full"
                >
                  Update Task
                </button>
              </>
            ) : (
              <>
                    <div className="mb-4">
                    <p className="text-xl font-bold text-gray-900 tracking-wide">{task.title}</p>
                    <p className="text-base text-gray-700 leading-relaxed mt-2">{task.description}</p>
                    </div>
  
                {/* Action Buttons */}
                <div className="flex gap-2 mt-4">
                  <button
                    className="bg-yellow-500 text-white px-4 py-2 rounded-md font-medium hover:bg-yellow-600 transition duration-300"
                    onClick={() => handleEditClick(task)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-500 text-white px-4 py-2 rounded-md font-medium hover:bg-red-600 transition duration-300"
                    onClick={() => deletetask(task._id)}
                  >
                    Delete
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    ) : (
      <p className="text-gray-500 text-center mt-4">No tasks available. Add some tasks!</p>
    )}
  </div>
  
  )
}

export default Tasklist