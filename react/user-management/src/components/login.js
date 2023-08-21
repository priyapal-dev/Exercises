import {useFormik} from 'formik';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
const Login = () => {
    const navigate = useNavigate();
    const [auth, setAuth] = useState(true)
    const formik = useFormik({
        initialValues:{
            username: '',
            password: '',
        },
        validationSchema: yup.object({
            username: yup.string()
            .required('Username is required')
            .max(15, 'Must be 15 characters or less'),
            password: yup.string()
            .required('Password is required'),
        }),
        onSubmit: values => {
            const items = JSON.parse(localStorage.getItem('data'));
            
            items.forEach(element => {
                if(element.username===values.username && element.password === values.password){
                    navigate('/home');
                }
                else{
                    setAuth(false);
                }
            }); 
        },
    });

  return (
    <div>
        <h1 className='text-center my-4'>Welcome to Login Page</h1>
        <form onSubmit={formik.handleSubmit}>
            <div className='form-group'>
                <label htmlFor='username' className='form-label'>Username</label>
                <input type='text' className='form-control' name='username' onChange={formik.handleChange} value={formik.values.username}/>
                {formik.errors.username ? <div className='invalid-feedback d-block'>{formik.errors.username}</div> : null}

            </div>
            <div className='form-group my-2'>
                <label htmlFor='password' className='form-label'>Password</label>
                <input type='password' className='form-control' name='password' onChange={formik.handleChange} value={formik.values.password}/>
                {formik.errors.password ? <div className='invalid-feedback d-block'>{formik.errors.password}</div> : null}
            </div>
            <button type="submit" className="btn btn-primary">Submit</button> 
        </form>
        {auth?'':<div className='text-danger'>Wrong Details! try again</div>}
    </div>
  )
}

export default Login;
