import React, { Fragment, useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { forgotPassword, clearErrors } from '../../actions/userActions'

const ForgotPassword = () => {
    const [email, setEmail] = useState('')

    const dispatch = useDispatch();

    const {  error , loading ,  message } = useSelector(state => state.forgotPassword)

    useEffect(() => {

        if (error) {
            alert("something went wrong")
            dispatch(clearErrors());
        }

        

    }, [dispatch])

    const submitHandler = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.set('email', email);

        dispatch(forgotPassword(formData))
        alert("mail has been sent successfully")
    }

  return (
    <Fragment>
        <div className="form-container">
				<form className="card p-4 form" onSubmit={submitHandler} encType='multipart/form-data'>
					<div className="text-center">
						<h1>Forget Password</h1>
					</div>
					<div class="form-group m-2">
						<label for="exampleInputEmail1">Email</label>
						<input
                        type="email"
                        id="email_field"
                        className="form-control"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
					</div>
					
					<div className="button">
						<button
							type="submit"
							className="btn btn-primary w-100"
							disabled={loading ? true : false}
						>
							Send Email
						</button>
						
					</div>
				</form>
			</div>

</Fragment>
  )
}

export default ForgotPassword
