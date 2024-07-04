import React,{useEffect,useState} from 'react'
import Layout from '../../components/layouts/Layout'
import AdminMenu from '../../components/layouts/AdminMenu'
import toast from 'react-hot-toast'
import axios from 'axios'
import { Modal } from 'antd'
const CreateCategory = () => {
const [categories,setCategories]=useState([])
const [name,setName]=useState()
const [visible, setVisible] = useState(false);
const [selected, setSelected] = useState(null);
const [updateName, setUpdateName] = useState('');

//handle form submit
const handleCreateCategory= async (e)=>{
  e.preventDefault()
  try {
    const {data}= await axios.post('http://localhost:8000/api/v1/category/create-category',{name})
    if(data?.success){
      toast.success(`${name} IS ADDED AS NEW CATEGORY`)
      getAllCategories()
    } else {toast.error('SOMTHING WENT WRONG WHILE ADDING CATEGORY')}
  } catch (error) {
    console.log(error)
    toast.error('SOMTHING WENT WRONG')
  }
}

//handle update name
const handleUpdate = async (e)=>{
  e.preventDefault()
  try {
  const {data}= await axios.put(`http://localhost:8000/api/v1/category/update-category/${selected._id}`,{name:updateName})
  if(data.success){
    toast.success(`${updateName} IS UPDATED`),
    setSelected(null),
    setUpdateName(''),
    setVisible(false),
    getAllCategories()
  }
  } catch (error) {
    console.log(error)
    toast.error('SOMTHING WENT WRONG')
  }
}

//handle delete name
const handleDelete = async (pid)=>{
  try {
  const {data}= await axios.delete(`http://localhost:8000/api/v1/category/delete-category/${pid}`)
  if(data.success){
    toast.success(`CATEGORY IS DELETED`),
    getAllCategories()
  }
  } catch (error) {
    console.log(error)
    toast.error('SOMTHING WENT WRONG')
  }
}
// geting all categories
const getAllCategories = async ()=>{
  try {
    const {data}= await axios.get('http://localhost:8000/api/v1/category/all-category')
    if(data.success){
        setCategories(data.category)
    }
  } catch (error) {
    console.log(error)
    toast.error("SOMTHING WENT WRONG IN GETTING CATEGORIES")
  }
}
useEffect(()=>{
    getAllCategories()
},[])
  return (
    <>
       <Layout title="Dashboard-Create Categories">
    <div className='container-fluid'>
    <center><h1 className=''>Admin Panel</h1></center>
      <div className='row'>
        <div className='col-md-3'>
            <AdminMenu/>
        </div>
        <div className='col-md-9'>
              <div className='card w-80 p-3'>
                <center><h3 className='m-3'>Manage Categories</h3></center>
                <div className=''>

                <form className='p-3'onSubmit={handleCreateCategory}>
                      <div className="mb-3">
                        <input type="text" className="form-control" id="createCategoryText" placeholder='ENTER NEW CATEGORY NAME ' value={name} onChange={(e)=>setName(e.target.value)}/>
                      </div>
                      <center><button  type="submit" className="btn btn-primary createCategorybtn">CREATE CATEGORY</button></center>
                </form>


                <table className="table">
                    <thead>
                      <tr>
                        <th scope="col">NAME</th>
                        <th scope="col"><center>ACTIONS</center></th>
                      </tr>
                    </thead>
                    <tbody>
                    {categories?.map(c=>(
                    <>  
                     <tr>
                        <td key={c._id}>{c.name}</td>
                        <td>
                          <center>
                            <button className='btn btn-primary ms-2 edit' onClick={()=>{setVisible(true); setUpdateName(c.name); setSelected(c)}}>Edit</button>
                            <button className='btn btn-primary ms-2 delete' onClick={()=>{handleDelete(c._id)}}>Delete</button>
                          </center>
                          
                        </td>
                       
                     </tr>
                      
                    </>
                     ))}  
                    </tbody>
                  </table>
                  </div> 
              </div>
              
        </div>
      <Modal onCancel={()=>setVisible(false)} footer={null} visible={visible}>
      <form onSubmit={handleUpdate}>
                <div className="mb-3">
                  <label className="form-label">Update Category Name</label>
                  <input
                    type="text"
                    className="form-control"
                    value={updateName}
                    onChange={(e) => setUpdateName(e.target.value)}
                  />
                </div>
                <button type="submit" className="btn btn-primary">Update Category</button>
              </form>
      </Modal>
      </div>
    </div>
        </Layout> 
    </>
    
    
  )
}

export default CreateCategory