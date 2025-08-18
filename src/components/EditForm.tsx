import { useState } from "react"
import { addContent, updateContent } from "../api/ContentApi"
import { useAuth } from "../Contexts/authContext"

interface EditFormProps{
    title:string,
    link:string,
    description:string,
    onCancel:()=>void,
    onAdd:()=>void,
    id:string,
    refresh:()=>void
}

const EditForm = ({title,link,description,onCancel,onAdd,id,refresh}:EditFormProps) => {
    const [editTitle,setEditTitle]=useState(title)
    const [editLink,setEditLink]=useState(link)
    const [editDesc,setEditDesc]=useState(description)
    const auth =useAuth()
     async function handleAdd() {
        if (!title || !link) return alert("Please fill all fields");
  if (!auth) {
  throw new Error("useAuth must be used inside AuthProvider");
}
  const {token} = auth
        await updateContent(token,id, editTitle, editLink,editDesc);
        alert("Content added");
        
        
      }
  return (
    <div>
      <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Add New Brain</h2>
            <input
              className="border p-2 w-full mb-3 rounded"
              placeholder="Title"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
            />
            <input
              className="border p-2 w-full mb-3 rounded"
              placeholder="Link"
              value={editLink}
              onChange={(e) => setEditLink(e.target.value)}
            />
            <input
              className="border p-2 w-full mb-3 rounded"
              placeholder="Description"
              value={editDesc}
              onChange={(e) => setEditDesc(e.target.value)}
            />
            <div className="flex justify-end gap-3">
              <button
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                onClick={() => onCancel()}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
                onClick={()=>{
                    handleAdd()
                    refresh()
                    onCancel()
                }}
              >
                Save
              </button>
            </div>
          </div>
        </div>
    </div>
  )
}

export default EditForm
