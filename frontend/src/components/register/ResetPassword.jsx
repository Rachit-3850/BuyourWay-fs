import React, { Fragment, useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { UPDATE_PASSWORD_RESET } from '../../constants/userConstants'
import { useNavigate } from 'react-router-dom'
import { resetPassword, clearErrors } from '../../actions/userActions'
import { useParams } from 'react-router-dom'
const ResetPassword = () => {
    const { token } = useParams();
    const navigate = useNavigate();
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const dispatch = useDispatch();

    const { error, success } = useSelector(state => state.forgotPassword)

    useEffect(() => {

        if (error) {
            alert("something went wrong");
            dispatch(clearErrors());
        }

        if (success) {
            alert('Password updated successfully')
            navigate("/login")
        }

    }, [dispatch, error, success])

    const submitHandler = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.set('password', password);
        formData.set('confirmPassword', confirmPassword);

        dispatch(resetPassword(token, formData))
    }

  return (
    <div>
        <div className="form-container ">
					<form className="card p-4 form" onSubmit={submitHandler}>
						<div className="text-center">
							<h1>New Password</h1>
						</div>

						<div class="form-group m-2">
							<label for="exampleInputEmail1">Password</label>
							<input
								type="password"
								className="form-control"
								placeholder="Enter Password"
								value={password}
                                onChange={(e) => setPassword(e.target.value)}
							/>
						</div>
						<div class="form-group m-2">
							<label for="exampleInputPassword1" >Password</label>
							<input
								type="password"
								className="form-control"
								id="exampleInputPassword1"
								placeholder="Password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
							/>
						</div>
						<div className="button">
							<button type="submit" className="btn login w-100 ">
								Set Password
							</button>
						</div>
					</form>
				</div>
    </div>
  )
}

export default ResetPassword