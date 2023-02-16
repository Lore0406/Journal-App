import { Link } from 'react-router-dom'
import { useForm } from '../../hooks/useForm'
import validator from 'validator'
import { useDispatch, useSelector } from 'react-redux'
import { removeErrorAction, setErrorAction } from '../../actions/uiAction'
import { startRegisterWithEmailPasswordName } from '../../actions/authActions'

export const RegisterScreen = () => {

  const dispatch = useDispatch()
  const { msgError } = useSelector( state => state.ui )

  const { values, handleInputChange } = useForm({
    name: 'OsitoBonito', 
    email: 'ositosAzules@gmail.com',
    password: '123456',
    password2: '123456',

  })

  const { name, email, password, password2 } = values

  const handleRegister = ( e ) => {
    e.preventDefault()

    if ( isFormValid() ) {
      dispatch( startRegisterWithEmailPasswordName (email, password, name))
    }
  }

  const isFormValid = () =>{
    if (name.trim().length === 0 ){
      dispatch( setErrorAction ('Name is required') )
      return false
    } else if ( !validator.isEmail( email ) ) {
      dispatch( setErrorAction ('Email is not valid') )
      return false
    } else if ( password !== password2 ) {
      dispatch( setErrorAction ('Passwords do not match') )
      return false
    } else if ( password.length < 5 && password2.length < 5 ) {
      dispatch( setErrorAction ('Passwords should be at least 5 chars long '))
      return false
    }

    dispatch( removeErrorAction() )
    return true
  }

  return (
    <>
    <h3 className='auth__title mb-1'>Login</h3>

    <form onSubmit={ handleRegister }>
      {
        msgError &&
        (
          <div className="auth__alert-error">
            { msgError }
          </div>
        )
      }

      <input 
        type="text"
        placeholder="Name"
        name="name" 
        className='auth__input'
        autoComplete='off'
        value={ name }
        onChange={ handleInputChange }
      />

      <input 
        type="text"
        placeholder="Email"
        name="email" 
        className='auth__input'
        autoComplete='off'
        value={ email }
        onChange={ handleInputChange }
      />

      <input 
        type="password"
        placeholder="Password"
        name="password"
        className='auth__input'
        value={ password }
        onChange={ handleInputChange }
      />

      <input 
        type="password"
        placeholder="Confirm Password"
        name="password2"
        className='auth__input'
        value={ password2 }
        onChange={ handleInputChange }
      />

      <button
        type="submit"
        className='btn btn-primary btn-block mb-5 mt-5'
        // disabled={ true }
      >
        Register
      </button>

      <Link
        to='/auth/login'
        className='link '
      >
        Already registered?
      </Link>

    </form>

  </>
  )
}