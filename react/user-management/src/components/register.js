import {useFormik} from 'formik';
import {useNavigate} from 'react-router-dom';
import * as yup from 'yup';
const Register = () => {
    const navigate = useNavigate();
    const formik = useFormik({
        initialValues:{
            firstname: '',
            lastname: '',
            username: '',
            gender: '',
            email: '',
            password: '',
            confirmPassword: '',
        },
        validationSchema: yup.object({
            firstname: yup.string()
            .required('First Name is required')
            .max(15, 'Must be 15 characters or less'),
            username: yup.string()
            .required('Username is required')
            .max(15, 'Must be 15 characters or less'),
            gender: yup.string()
            .required('Required'),
            email: yup.string()
            .required('Email is required')
            .email('Invalid email'),
            password: yup.string()
            // .min(8, '8 characters minimum')
            // .matches(/[0-9]/, "Must contain a digit")
            // .matches(/[a-z]/, "Must contain a lowercase")
            // .matches(/[A-Z]/, "Must contain a uppercase")
            // .matches(/[^\w]/, 'Must containe a special character')
            .required('Password is required'),
            confirmPassword: yup.string()
            .required("Please re-type your password")
            .oneOf([yup.ref("password")], "Passwords does not match"),
        }),
        onSubmit: values => {
            const storedData = localStorage.getItem('data');
            let existingData = [];
            if(storedData){
                existingData=JSON.parse(storedData);
            }
            const userExists = existingData.some(user => user.username === values.username);
            const emailExists = existingData.some(user => user.email === values.email);
            if(userExists){
                alert('Username already exists!');
            }
            else if(emailExists){
                alert('Email already exists!');
            }
            else{
                localStorage.setItem("data", JSON.stringify([...existingData,values]));
                navigate('../');
            }     
        },
    });
  return (
    <div>
        <h1 className='text-center my-4'>Registeration Form</h1>
        <form onSubmit={formik.handleSubmit}>
            <div className='form-group'>
                <label htmlFor='firstname' className='form-label'>Firstname</label>
                <input type='text' className='form-control' name='firstname' onChange={formik.handleChange} value={formik.values.firstname}/>
                {formik.errors.firstname ? <div className='invalid-feedback d-block'>{formik.errors.firstname}</div> : null}
            </div>
            <div className='form-group my-2'>
                <label htmlFor='lastname' className='form-label'>Lastname</label>
                <input type='text' className='form-control' name='lastname' onChange={formik.handleChange} value={formik.values.lastname}/>
                {formik.errors.lastname ? <div className='invalid-feedback d-block'>{formik.errors.lastname}</div> : null}
            </div>
            <div className='form-group my-2'>
                <label htmlFor='username' className='form-label'>Username</label>
                <input type='text' className='form-control' name='username' onChange={formik.handleChange} value={formik.values.username}/>
                {formik.errors.username ? <div className='invalid-feedback d-block'>{formik.errors.username}</div> : null}
            </div>
            <div className='form-group mt-3'>
                <label htmlFor='gender' className='form-label'>Gender</label>
                <div className="form-check form-check-inline mx-4">
                    <input className="form-check-input" type="radio" name="gender" value="male" onChange={formik.handleChange}/>
                    <label className="form-check-label" htmlFor="male">Male</label>
                </div>
                <div className="form-check form-check-inline">
                    <input className="form-check-input" type="radio" name="gender" value="female" onChange={formik.handleChange}/>
                    <label className="form-check-label" htmlFor="female">Female</label>
                </div>
                {formik.errors.gender ? <div className='invalid-feedback d-block'>{formik.errors.gender}</div> : null}
            </div>
            <div className='form-group my-2'>
                <label htmlFor='email' className='form-label'>Email</label>
                <input type='email' className='form-control' name='email' onChange={formik.handleChange} value={formik.values.email}/>
                {formik.errors.email ? <div className='invalid-feedback d-block'>{formik.errors.email}</div> : null}
            </div>
            <div className='form-group my-2'>
                <label htmlFor='password' className='form-label'>Password</label>
                <input type='password' className='form-control' name='password' onChange={formik.handleChange} value={formik.values.password}/>
                {formik.errors.password ? <div className='invalid-feedback d-block'>{formik.errors.password}</div> : null}
            </div>
            <div className='form-group my-2'>
                <label htmlFor='confirmPassword' className='form-label'>Confirm Password</label>
                <input type='password' className='form-control' name='confirmPassword' onChange={formik.handleChange} value={formik.values.confirmPassword}/>
                {formik.errors.confirmPassword ? <div className='invalid-feedback d-block'>{formik.errors.confirmPassword}</div> : null}
            </div>
            <button type="submit" className="btn btn-primary my-2">Submit</button> 
        </form>
    </div>
  )
}

export default Register;
