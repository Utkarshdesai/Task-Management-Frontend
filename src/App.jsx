
import { useState } from 'react'
import './App.css'
import axios from 'axios'  
import Tasklist from './component/Tasklist'

function App() {

  const [title , settitle] = useState('')
  const [ description ,setdescription] = useState('')
  

  const handlesubmit = async (e) => {
    e.preventDefault()
    

    //create new task 
    const createtask = await axios.post('https://task-management-backend-1-aeyv.onrender.com/api/v1/task' , 
      {title , description}
    )
    console.log(createtask)

    settitle('')
    setdescription('')
  };

 

  return (
    <>
       <div className="p-6 max-w-lg mx-auto bg-white shadow-md rounded-md">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Add a Task</h2>

            <form onSubmit={handlesubmit} className="space-y-4">
              {/* Title Input */}
              <div className="flex flex-col">
                <label htmlFor="Title" className="text-sm font-medium text-gray-600 mb-1">Title</label>
                <input
                  type="text"
                  id="Title"
                  placeholder="Enter title"
                  value={title}
                  onChange={(e) => settitle(e.target.value)}
                  className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>

              {/* Description Input */}
              <div className="flex flex-col">
                <label htmlFor="desc" className="text-sm font-medium text-gray-600 mb-1">Description</label>
                <textarea
                  type="text"
                  id="desc"
                  placeholder="Enter description"
                  value={description}
                  onChange={(e) => setdescription(e.target.value)}
                  className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="bg-blue-500 text-white font-semibold px-4 py-2 rounded-lg shadow hover:bg-blue-600 transition duration-300"
              >
                Submit
              </button>
            </form>

            {/* Task List */}
            <div className="mt-6">
              <Tasklist />
            </div>
      </div>

    </>
  )
}

export default App
