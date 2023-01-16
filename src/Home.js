import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useFormik } from 'formik';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


export function Home() {
    return (
        <div>
            <h1>Welcome to Mobiles App💐💐</h1>
            <LoginForm />

        </div>
    );
}

function LoginForm() {
    const [formState, setFormState] = useState("success")
    const navigate = useNavigate()
    const { handleChange, values, handleSubmit } = useFormik({
        initialValues: { username: "resvanth", password: "123" },
        onSubmit: async (values) => {
            console.log(values);

            const data = await fetch("http://localhost:4000/user/login", {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                },
                body: JSON.stringify(values),
            })
            if (data.status === 401) {
                console.log("❌Error")
                setFormState("error")
            }
            else {
                const result = await data.json()
                console.log("✅success", result)
                localStorage.setItem("token", result.token)
                localStorage.setItem("roleId", result.roleId)
                navigate("/mobiles")

            }

        }
    })
    return (
        <form onSubmit={handleSubmit} className='login-form'>
            <h2>Login</h2>
            <TextField label="Username"
                variant="outlined"
                onChange={handleChange}
                value={values.username}
                name="username" />
            <TextField label="Password"
                variant="outlined"
                onChange={handleChange}
                value={values.password}
                name="password" />
            <Button color={formState} type='submit' variant="contained">
                {formState === "error" ? "Retry" : "Submit"}
            </Button>
        </form>
    )
}
