import React, { useState, useEffect } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {resetPassword,resetAllAuthForms} from './../../redux/User/user.actions'
import {withRouter} from 'react-router-dom'
import './styles.scss'
import AuthWrapper from './../AuthWrapper'
import FormInput from './../forms/FormInput'
import Button from './../forms/Button'


const mapState = ({ user }) => ({
    resetPasswordSuccess: user.resetPasswordSuccess,
    resetPasswordError: user.resetPasswordError
})
const EmailPassword = props => {
    const {resetPasswordSuccess, resetPasswordError} = useSelector(mapState)
    const dispatch = useDispatch();
    const [email, setEmail] = useState('')
    const [errors, setErrors] = useState([])

    useEffect(()=> {
        if (resetPasswordSuccess){
            dispatch(resetAllAuthForms())
            props.history.push('/login')
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [resetPasswordSuccess])

    useEffect(()=> {
        if(Array.isArray(resetPasswordError) && resetPasswordError.length > 0){
            setErrors(resetPasswordError)
        }
    }, [resetPasswordError])

    const handleSubmit = e =>{
        e.preventDefault();
        dispatch(resetPassword({email}))
       
    }
        const configAuthWrapper = {
            headline:'Email Password'
        }
        return (
            <div>
                <AuthWrapper {...configAuthWrapper}>
                    <div className="formWrap">
                        {
                            errors.length> 0&& (
                                <ul>
                                    {errors.map((e, index) => {
                                        return (
                                            <li key ={index}>
                                                {e}
                                            </li>
                                        )
                                    })}
                                </ul>
                            )
                        }       
                        <form onSubmit={handleSubmit}>
                            <FormInput 
                                type="email" 
                                name="email"
                                value ={email}
                                placeholder="Email"
                                handleChange={e => setEmail(e.target.value)}
                            />
                            <Button type="submit">
                                Email Password
                            </Button>
                        </form>
                    </div>
                </AuthWrapper>
            </div>
        )
    }

export default withRouter(EmailPassword)
