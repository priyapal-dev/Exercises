import { useFormik} from 'formik';
import * as yup from 'yup';
function App() {
  const formik = useFormik({
    initialValues: {
      fullname: '',
      email: '',
      roomType: '',
      arrivalDate: '',
      departureDate: '',
      numberOfGuests: '',
      freePickup: '',
      flightNumber: '',
      specialRequests: '',
    },
    validationSchema: yup.object({
      fullname: yup.string()
      .max(15, 'Must be 15 characters or less')
      .required('*Required'),
      email: yup.string()
      .required('*Required')
      .email('*Invalid Email'),
      arrivalDate: yup.string().required('*Required'),
      departureDate: yup.string().required('*Required'),
      numberOfGuests:yup.string().required('*Required'),
    }),
    onSubmit: values => {
      console.log(values);
    },
  });
  return (
    <div className='container-fluid'>
    <h1 className='text-center'>Reservation Form</h1>
    <form onSubmit={formik.handleSubmit}>
      <div className="form-group row justify-content-center mb-2" >
        <label htmlFor="fullname" className="col-sm-2 col-form-label">
          Name*
        </label>
        <div className="col-sm-4">
          <input type="text" className="form-control" id="fullname" placeholder="Name" name="fullname" onChange={formik.handleChange} value={formik.values.fullname}/>
          {formik.errors.fullname ? <div className='invalid-feedback d-block'>{formik.errors.fullname}</div> : null}
        </div>
      </div>
      <div className="form-group row justify-content-center mb-2">
        <label htmlFor="email" className="col-sm-2 col-form-label">Email*</label>
        <div className="col-sm-4">
          <input type="email" className="form-control" id="email" placeholder="Email" name='email' onChange={formik.handleChange} value={formik.values.email}/>
          {formik.errors.email ? <div className='invalid-feedback d-block'>{formik.errors.email}</div> : null}
        </div>
      </div>
      <div className="form-group row justify-content-center mb-2">
        <label htmlFor="roomType" className="col-sm-2 col-form-label">Room Type</label>
        <div className="col-sm-4">
          <select className="form-control" id='roomType' onChange={formik.handleChange} value={formik.values.roomType}>
            <option value=''>Select</option>
            <option value='1'>One</option>
            <option value='2'>Two</option>
            <option value='3'>Three</option>
            <option value='4'>Four</option>
          </select>
        </div>
      </div>
      <div className="form-group row justify-content-center mb-2">
        <label htmlFor="arrivalDate" className="col-sm-2 col-form-label">Arrival Date*</label>
        <div className="col-sm-4">
          <input type="date" className="form-control" id="arrivalDate" onChange={formik.handleChange} value={formik.values.arrivalDate}/>
          {formik.errors.arrivalDate ? <div className='invalid-feedback d-block'>{formik.errors.arrivalDate}</div> : null}
        </div>
      </div>
      <div className="form-group row justify-content-center mb-2">
        <label htmlFor="departureDate" className="col-sm-2 col-form-label">Departure Date*</label>
        <div className="col-sm-4">
          <input type="date" className="form-control" id="departureDate" onChange={formik.handleChange} value={formik.values.departureDate}/>
          {formik.errors.departureDate ? <div className='invalid-feedback d-block'>{formik.errors.departureDate}</div> : null}
        </div>
      </div>
      <div className="form-group row justify-content-center mb-2">
        <label htmlFor="numberOfGuests" className="col-sm-2 col-form-label">Number of Guests*</label>
        <div className="col-sm-1">
          <select className='form-control' id='numberOfGuests' onChange={formik.handleChange} value={formik.values.numberOfGuests}>
            <option value=''></option>
            <option value='0'>0</option>
            <option value='1'>1</option>
            <option value='2'>2</option>
            <option value='3'>3</option>
            <option value='4'>4</option>
          </select>
          {formik.errors.numberOfGuests ? <div className='invalid-feedback d-block'>{formik.errors.numberOfGuests}</div> : null}

        </div>
        <div className='col-sm-3'></div>
      </div>
      <div className="form-group row justify-content-center mb-2">
        <label htmlFor="freePickup" className="col-sm-2 col-form-label">Free Pickup</label>
        <div className="col-sm-4">
          <div className="form-check form-check-inline">
            <input className="form-check-input" type="radio" name="freePickup" value="yes" onChange={formik.handleChange}/>
            <label className="form-check-label" htmlFor="yes">Yes</label>
          </div>
          <div className="form-check form-check-inline">
            <input className="form-check-input" type="radio" name="freePickup" value="no" onChange={formik.handleChange}/>
            <label className="form-check-label" htmlFor="no">No</label>
          </div>
        </div>
      </div>
      <div className="form-group row justify-content-center mb-2">
        <label htmlFor="flightNumber" className="col-sm-2 col-form-label">Flight Number</label>
        <div className="col-sm-4">
          <input type="text" className="form-control" name="flightNumber" placeholder="Flight Number" onChange={formik.handleChange} value={formik.values.flightNumber}/>
        </div>
      </div>
      <div className="form-group row justify-content-center">
        <label htmlFor="specialRequests" className="col-sm-2 col-form-label">Special Requests</label>
        <div className="col-sm-4">
          <textarea className="form-control" name="specialRequests" placeholder="Type Here" rows={4} onChange={formik.handleChange} value={formik.values.specialRequests}/>
        </div>
      </div>
      <div className="col-2 mx-auto my-3 text-center">
        <button type="submit" className="btn btn-primary">Submit</button>
      </div>
    </form>
    </div>
  );
}

export default App;
