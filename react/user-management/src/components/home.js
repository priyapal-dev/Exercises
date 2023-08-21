import React, { useEffect, useState } from 'react'
import { Link} from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';

const Home = () => {
    const [data, setData] = useState([]);
    const [editing, setEditing] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [addUser, setAddUser] = useState(false);
    const handleAddUser=()=>{
        setAddUser(true);
        setShowModal(true);
        // navigate('../register');
    }
    const handleDelete=(user)=>{
        const existingData=JSON.parse(localStorage.getItem('data'));
        const updatedArray = existingData.filter(obj => obj.username !== user);
        localStorage.setItem("data", JSON.stringify(updatedArray));
        setData(updatedArray);
    }
    const handleEdit=(user)=>{
        setAddUser(false);
        setEditing(user);
        setShowModal(true);
    }
    const handleCloseModal = () => {
        setEditing(null);
        setShowModal(false);
    };
    function isValidEmail(email) {
        return /\S+@\S+\.\S+/.test(email);
    }
    const handleSave = () => {
        if(addUser){
            //add user true
            if(!editing || !editing.firstname || !editing.username || !editing.gender || !editing.password){
                alert('Please fill in all required fields!');
            }
            else if(!editing.email || !isValidEmail(editing.email)){
                alert('Please enter valid email');
            }
            else {
                const index = data.findIndex((item) => (item.email === editing.email || item.username===editing.username));
                if(index!==-1){
                    alert('Already registered! Try Log in')
                }
                else {
                    data.push(editing);
                    localStorage.setItem("data", JSON.stringify(data));
                    handleCloseModal();
                } 
            }
        }
        else {
            const updatedData = [...data];
            const index = data.findIndex((item) => item.email === editing.email);
            updatedData[index] = editing;
            setData(updatedData);
            localStorage.setItem("data", JSON.stringify(updatedData));
            handleCloseModal(); 
        }
    }
    useEffect(()=>{
        const items = JSON.parse(localStorage.getItem('data'));
            if(items){
                setData(items);           
            }  
    },[]);

  return (
    <div>
      <h1 className='text-center'>User Details</h1>
      <button type='button' className='btn btn-primary' onClick={handleAddUser}>Add User</button>
      <table className='table'>
        <thead>
            <tr>
                <th scope='col'>First Name</th>
                <th scope='col'>Last Name</th>
                <th scope='col'>UserName</th>
                <th scope='col'>Email</th>
                <th scope='col'>Password</th>
                <th scope='col'>Gender</th>
                <th scope='col'>Action</th>
            </tr>
        </thead>
        <tbody>
            {data.map((item)=>{
                return(
                    <tr key={item.username}>
                    <td>{item.firstname}</td>
                    <td>{item.lastname}</td>
                    <td>{item.username}</td>
                    <td>{item.email}</td>
                    <td>{item.password}</td>
                    <td>{item.gender}</td>
                    <td>
                        <button type='button' className='btn btn-primary' onClick={()=>handleEdit(item)}>Edit</button>
                        <button type='button' className='btn btn-secondary ms-3' onClick={() => handleDelete(item.username)}>Delete</button>
                    </td>
                    </tr>
                );
            })}

        </tbody>
      </table>
      <Link to='/' className='btn btn-primary'>Logout</Link>
        <Modal show={showModal} onHide={handleCloseModal}>
            <Modal.Header closeButton>
            <Modal.Title>
                {addUser?'Add':'Edit'} User
            </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className='form-group'>
                <label htmlFor='firstname' className='form-label'><b>First Name*</b></label>
                <input type='text' className='form-control' name='firstname' 
                value={editing?.firstname || ''}
                onChange={(e) =>
                    setEditing({ ...editing, firstname: e.target.value })
                    }
                />
            </div>
            <div className='form-group mt-2'>
                <label htmlFor='lastname' className='form-label'><b>Last Name</b></label>
                <input type='text' className='form-control' name='lastname' 
                value={editing?.lastname || ''}
                onChange={(e) =>
                    setEditing({ ...editing, lastname: e.target.value })
                    }
                />
            </div>
            <div className='form-group mt-2'>
                <label htmlFor='username' className='form-label'><b>Username*</b></label>
                <input type='text' className='form-control' name='username' 
                value={editing?.username || ''}
                onChange={(e) =>
                    setEditing({ ...editing, username: e.target.value })
                    }
                />
            </div>
            <div className='form-group mt-2'>
                <label htmlFor='gender' className='form-label'><b>Gender*</b></label>
                <div className="form-check form-check-inline mx-4">
                    <input className="form-check-input" type="radio" name="gender" value="male"
                    checked={editing?.gender === 'male'} 
                    onChange={(e) =>
                    setEditing({ ...editing, gender: 'male' })
                    }
                />
                    <label className="form-check-label" htmlFor="male">Male</label>
                </div>
                <div className="form-check form-check-inline">
                    <input className="form-check-input" type="radio" name="gender" value="female" 
                    checked={editing?.gender === 'female'}
                    onChange={(e) =>
                    setEditing({ ...editing, gender: 'female' })
                    }
                />
                    <label className="form-check-label" htmlFor="female">Female</label>
                </div>
            </div>
            {addUser?<div className='form-group mt-2'>
                <label htmlFor='email' className='form-label'><b>Email*</b></label>
                <input type='email' className='form-control' name='email' 
                value={editing?.email || ''}
                onChange={(e) =>
                    setEditing({ ...editing, email: e.target.value })
                    }
                />
            </div>
            :''}
            <div className='form-group mt-2'>
                <label htmlFor='password' className='form-label'><b>Password*</b></label>
                <input type='password' className='form-control' name='password' 
                value={editing?.password || ''}
                onChange={(e) =>
                    setEditing({ ...editing, password: e.target.value })
                    }
                />
            </div>
            </Modal.Body>
            <Modal.Footer>
            <button className="btn btn-secondary" onClick={handleCloseModal}>
                Close
            </button>
            <button className="btn btn-primary" onClick={handleSave}>
                Save Changes
            </button>
            </Modal.Footer>
        </Modal>

    </div>
  )}

export default Home;