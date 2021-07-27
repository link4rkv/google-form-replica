import classes from './RegisterUserForm.module.css';
import Ajv from "ajv";
import { useState } from 'react';

const UserSchema = {
  "title": "User Registration",
  "description": "A simple user registration form.",
  "type": "object",
  "required": [
    "name",
    "email",
    "age",
    "password"
  ],
  "properties": {
    "name": {
      "type": "string",
      "title": "Name"
    },
    "email": {
      "type": "string",
      "title": "Email"
    },
    "age": {
      "type": "number",
      "title": "Age",
      "minimum": 18
    },
    "password": {
      "type": "string",
      "description": "password should have minimum length of 8.",
      "title": "Password",
      "minLength": 8
    }
  }
}

const RegisterUserForm = () => {
  const ajv = new Ajv();
  const [ ageErrorMessage, setAgeErrorMessage ] = useState(null);
  const [ passwordErrorMessage, setPasswordErrorMessage ] = useState(null); 

  const addUserHandler = (event) => {
    event.preventDefault();
    const data = new FormData(event.target);

    const validate = ajv.compile(UserSchema)
    const user = {
      'name': data.get('name'),
      'email': data.get('email'),
      'age': parseInt(data.get('age')),
      'password': data.get('password')
    } 

    const valid = validate(user)
    if (!valid) {
      console.log(validate.errors)

      if (validate.errors[0].dataPath.replace('.', '') === 'age') {
        setAgeErrorMessage("Age " + validate.errors[0].message)
        setPasswordErrorMessage(null);
      }
      if (validate.errors[0].dataPath.replace('.', '') === 'password') {
        setPasswordErrorMessage("Password " + validate.errors[0].message)
        setAgeErrorMessage(null);
      }
    } else {
      setAgeErrorMessage(null);
      setPasswordErrorMessage(null);
    }
  }

  return (
    <form className={classes.addUserForm} onSubmit={addUserHandler}>
      <h2>User Registration</h2>
      <div className={classes.control}>
        <label htmlFor='name'>Name</label>
        <input type='text' id='name' name='name' />
      </div>
      <div className={classes.control}>
        <label htmlFor='email'>Email</label>
        <input type='email' id='email' name='email' />
      </div>
      <div className={classes.control}>
        <label htmlFor='age'>Age</label>
        <input type='number' id='age' name='age' />
      </div>
      {ageErrorMessage && <p className={classes.error}>{ageErrorMessage}</p>}
      <div className={classes.control}>
        <label htmlFor='password'>Password</label>
        <input type='password' id='password' name='password' />
      </div>
      {passwordErrorMessage && <p className={classes.error}>{passwordErrorMessage}</p>}
      <button>Register</button>
    </form>
  )
}

export default RegisterUserForm