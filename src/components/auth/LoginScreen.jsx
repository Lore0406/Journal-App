import { Link } from 'react-router-dom'
import { useForm } from '../../hooks/useForm'
import { useDispatch, useSelector } from "react-redux";
import { startGoogleLogin, startLoginEmailPassword } from '../../actions/authActions';

export const LoginScreen = () => {

  const dispatch = useDispatch()
  const { loading } = useSelector( state => state.ui )

  const { handleInputChange, values } = useForm({
    email: "forgetmenots@gmail.com",
    password: "blue"
  })

  const { email, password } = values

  const handleLogin = ( e ) => {
    e.preventDefault()
    dispatch( startLoginEmailPassword( email, password ) ) 
  }

  const handleGoogleLogin = (e) => {
    e.preventDefault()
    dispatch( startGoogleLogin() )
  }

  return (
    <>
      <h3 className='auth__title mb-1'>Login</h3>

      <form onSubmit={ handleLogin }>

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
          className='auth__input mb-1'
          value={ password }
          onChange={ handleInputChange }
        />

        <button
          type="submit"
          className='btn btn-primary btn-block mt-1'
          disabled={ loading }
        >
          Login
        </button>
        
        <div className='auth__social-networks'>

          <p>Login with social network</p>

          <div 
            className="google-btn"
            onClick={handleGoogleLogin}
          >
            <div className="google-icon-wrapper">
              <img className="google-icon" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="google button" />
            </div>

            <p className="btn-text">
              <b>Sign in with google</b>
            </p>

          </div>

        </div>

        <Link
          to='/auth/register'
          className='link'
        >
          Create new account
        </Link>
      </form>
    </>
  )
}
