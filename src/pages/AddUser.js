
import React from "react";
import { Toast } from "../redux/helpers/Services/Toast";
import { Leaderboard } from '../redux/helpers/Services/Leaderboard';
import { Formik } from "formik";
import * as Yup from "yup"

const formSchema = Yup.object().shape({
    "participantName": Yup.string().required("Required"),
    "location": Yup.string().required("Required"),
    "units": Yup.string().required("Required"),
    "type": Yup.string().required("Required"),
    "points": Yup.string().required("Required").min(0, "to short"),
    "selectedDate": Yup.string().required("Required"),
})
class AddUser extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
        };
    }
    render() {
        return (<Formik
            validateOnChange={true}
            initialValues={{
                "participantName": "",
                "location": "",
                "units": "",
                "type": "",
                "points": "",
                "selectedDate": ""
            }}

            validationSchema={formSchema}
            onSubmit={(values, { setStatus, setSubmitting, resetForm }) => {
                Leaderboard.Create(values).then(res => {
                    setSubmitting(false);
                    if (res.data.success) {
                        Toast.Success(res.data.message);
                    }
                    else {
                        Toast.Error(res.data.message);
                    }
                    // resetForm();
                })
            }}
            render={({ form, errors, handleSubmit, status, touched, isSubmitting, values, handleChange, handleBlur, setFieldTouched, setFieldValue, setFieldError }) => {

                return (<form onSubmit={handleSubmit}>
                    <div className="container">
                        <div className="card" >
                            <div className="card-body">
                                <h5 className="card-title">Add New Player</h5>
                            </div>
                            <div className="card-body">
                                <div className="form-group">
                                    <label for="inputAddress">Participent Name *</label>
                                    <input type="text" className="form-control" name="participantName" value={values.participantName} onChange={handleChange} id="participantName" placeholder="Enter Participent Name" />
                                    <span className="error">{errors.participantName}</span>
                                </div>
                                <div className="form-row">
                                    <div className="form-group col-md-6">
                                        <label for="inputPassword4">Location *</label>
                                        <input type="text" className="form-control" name="location" value={values.location} onChange={handleChange} id="location" placeholder="Enter Location" />
                                        <span className="error">{errors.location}</span>
                                    </div>
                                    <div className="form-group  col-md-6">
                                        <label for="inputEmail4">Date *</label>
                                        <input type="date" className="form-control" name="selectedDate" value={values.selectedDate} onChange={handleChange} id="selectedDate" placeholder="Date" />
                                        <span className="error">{errors.selectedDate}</span>
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="form-group col-md-4">
                                        <label for="inputZip">Unit *</label>
                                        <input type="text" className="form-control" name="units" value={values.units} onChange={handleChange} id="units" placeholder="Enter Unit" />
                                        <span className="error">{errors.units}</span>
                                    </div>
                                    <div className="form-group col-md-4">
                                        <label for="inputCity">Type *</label>
                                        <input type="text" className="form-control" name="type" value={values.type} onChange={handleChange} id="type" placeholder="Enter Type" />
                                        <span className="error">{errors.type}</span>
                                    </div>

                                    <div className="form-group col-md-4">
                                        <label for="inputZip">Point *</label>
                                        <input type="number" className="form-control" name="points" value={values.points} onChange={handleChange} id="points" placeholder="Enter Point" />
                                        <span className="error">{errors.points}</span>
                                    </div>
                                </div>
                                {isSubmitting ? <div className="spinner-border" role="status">
                                    <span className="sr-only">Loading...</span>
                                </div> :
                                    <button type="submit" className="btn btn-primary">Submit</button>
                                }
                                {
                                    status &&
                                    <div classNameName={'alert alert-danger'}>{status}</div>
                                }
                                {/* <pre>{JSON.stringify(errors, null, 2)}</pre> */}

                            </div>
                        </div>
                    </div>
                </form>
                )
            }}
        />);

    }
}

export default AddUser;
