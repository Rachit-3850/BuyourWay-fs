import React, { Fragment, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./index.css";
import { toast, ToastContainer, useToast } from "react-toastify";
import { updatePassword, clearErrors } from '../../actions/userActions'
import { UPDATE_PASSWORD_RESET } from '../../constants/userConstants'
import Loader from "../loader/Loader";
const UpdatePassword = () => {
    const [oldPassword, setOldPassword] = useState('')
    const [password, setPassword] = useState('')

    const dispatch = useDispatch();

    const { error, isUpdated, loading } = useSelector(state => state.user)
    useEffect(() => {

        if (error) {
            dispatch(clearErrors());
        }

        if (isUpdated) {
            toast.success('Password updated successfully')

            dispatch({
                type: UPDATE_PASSWORD_RESET
            })
        }

    }, [dispatch, error, isUpdated])

    const submitHandler = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.set('oldPassword', oldPassword);
        formData.set('password', password);

        dispatch(updatePassword(formData))
    }
  return (
    
    <div>
        <div class="p-3 py-5">
				<form onSubmit={submitHandler} encType="multipart/form-data">
					<div class="row mt-2">
						<div class="col-md-12">
							<label class="labels">Old Password</label>
							<input
								type="password"
								class="form-control"
								value={oldPassword}
								onChange={(e) => setOldPassword(e.target.value)}
							/>
						</div>
					</div>
					<div class="row mt-3">
						<div class="col-md-12">
							<label class="labels">New Password</label>
							<input
								type="password"
								class="form-control"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
							/>
						</div>
					</div>
					

					<div class="row mt-3"></div>
					<div class="mt-5 text-center">
						<button class="btn btn-primary profile-button" type="submit"  disabled={loading ? true : false}>
							Update Password
						</button>
					</div>
				</form>
			</div>
    </div>
  )
}

export default UpdatePassword