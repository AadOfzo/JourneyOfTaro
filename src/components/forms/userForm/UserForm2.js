import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z, string } from "zod";
import SUserForm from "./styles.UserForm";
import axios from "axios";


const schema = z.object({
    username: string().min(2, { message: "Name is required" }),
    password: z.string().min(6, { message: "Password must be at least 6 characters" }),
    firstname: string().min(6, { message: "Please fill in your first name"}),
    lastname: string().min(6, { message: "Please fill in your last name"}),
    dateofbirth: string(),
    country: string().min(6,),
    email: string().email({ message: "Invalid email address" }),
    artistname: string().min(1, { message: "Artist name is required" }),
});

const UserForm = () => {
    const { register, handleSubmit, formState } = useForm({
        resolver: zodResolver(schema)
    });
    const { errors } = formState;

    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [showForm, setShowForm] = useState(true);

    const handleSave = (formValues, e) => {
        e.preventDefault();
        console.log(formValues);
        axios.post("http://localhost:8080/users", formValues).then(() => {
            setSuccessMessage(`Thank you for subscribing ${formValues.username}`);
            setShowForm(false);
            console.log(formValues);
        }).catch((error) => {
            console.error(error)
        });
    };

    return (
        <SUserForm>
            <h2>Demo Upload</h2>
            {successMessage && (
                <div className="success-message">{successMessage}</div>
            )}
            {showForm && (
                <form onSubmit={handleSubmit(handleSave)}>
                    <label>
                        <p>Username:</p>
                        <input {...register("username", { required: true, value: "Test_Admin_1" })} placeholder="Enter Name"/>
                        <div style={{ color: 'red' }}>{errors.name?.message}</div>
                    </label>
                    <div>
                        <p>Password:</p>
                        <input {...register("password", { required: true, minLength: 6, value: "ExamplePassword2" })} name="password" type="password" placeholder="Enter password of minimum 6 characters" />
                        <div style={{ color: 'red' }}>{errors.password?.message && <span>{errors.password?.message}</span>}</div>
                    </div>
                    <div>
                        <p>First name:</p>
                        <input {...register("firstname", { value: "Test FirstName" })} placeholder="Enter first Name" />
                        <div style={{ color: 'red' }}>{errors.firstname?.message}</div>
                    </div>
                    <div>
                        <p>Last name:</p>
                        <input {...register("lastname", { value: "Test LastName" })} placeholder="Enter first Name" />
                        <div style={{ color: 'red' }}>{errors.lastname?.message}</div>
                    </div>
                    <div>
                        <p>Date of birth:</p>
                        <input {...register("dateofbirth", { value: "18-01-1986" })} placeholder="Enter Country" />
                        <div style={{ color: 'red' }}>{errors.dateofbirth?.message}</div>
                    </div>
                    <div>
                        <p>Country:</p>
                        <input {...register("country", { value: "Netherlands" })} placeholder="Enter Country" />
                        <div style={{ color: 'red' }}>{errors.country?.message}</div>
                    </div>
                    <div>
                        <p>Email:</p>
                        <input {...register("email", { required: true, value: "admin@testmail.com" })} placeholder="Enter Email"/>
                        <div style={{ color: 'red' }}>{errors.email?.message}</div>
                    </div>
                    <div>
                        <p>Artist name:</p>
                        <input {...register("artistName", { value: "Test ArtistName" })} placeholder="Enter Artist Name" />
                        <div style={{ color: 'red' }}>{errors.artistname?.message}</div>
                    </div>
                    <button type="submit">Save</button>
                </form>
            )}
        </SUserForm>
    );
};

export default UserForm;
