// import Select from "react-select";
import {useState} from "react";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {z, string} from "zod";
import SUserForm from "./styles.UserForm";
import axios from "axios";
// import {getValue} from "@testing-library/user-event/dist/utils";

const schema = z.object({
    username: string().min(2, {message: "Name is required"}),
    email: string().email({message: "Invalid email address"}),
    password: z.string().min(6, {message: "Password must be at least 6 characters"}),
    country: string(),
    artistName: string().min(1, {message: "Artist name is required"}),
    demoTitle: string().min(1, {message: "Demo title is required"}),
    enabled: string().min(1, {message: 'Enabled is required'})
    // profileImage:
    //     typeof window === "undefined" // this is required if your app rendered in server side, otherwise just remove the ternary condition
    //         ? z.undefined()
    //         : z
    //             .instanceof(FileList)
    //             .refine(file => file.length !== 0, {
    //                 message: "File is required",
    //             })
    //             .refine(
    //                 file => {
    //                     const fileType = file.item?.(0)?.type || "";
    //                     return fileType === "image/png";
    //                 },
    //                 {
    //                     message: "File must be in .png or .jpeg format",
    //                 }
    //             )
    //             .refine(
    //                 file => {
    //                     const fileSize = file.item?.(0)?.size || 0;
    //                     return fileSize <= 2048000;
    //                 },
    //                 {message: "File size must be less than or equal to 2Mb"}
    //             ),

    // profileUserDemo:
    //     typeof window === "undefined" // this is required if your app rendered in server side, otherwise just remove the ternary condition
    //         ? z.undefined()
    //         : z
    //             .instanceof(FileList)
    //             .refine(file => file.length !== 0, {
    //                 message: "File is required",
    //             })
    //             .refine(
    //                 file => {
    //                     const fileType = file.item?.(0)?.type || "";
    //                     return fileType === "audio/mpeg";
    //                 },
    //                 {
    //                     message: "File must be in .mp3 format",
    //                 }
    //             )
    //             .refine(
    //                 file => {
    //                     const fileSize = file.item?.(0)?.size || 0;
    //                     return fileSize <= 10240000;
    //                 },
    //                 {message: "File size must be less than or equal to 10Mb"}
    //             ),
})

const UserForm = () => {
    const {register, handleSubmit, formState} = useForm({
        resolver: zodResolver(schema)
    });
    const {errors} = formState;

    const [successMessage, setSuccessMessage] = useState('');
    const [showForm, setShowForm] = useState(true);

    const handleSave = (formValues, e) => {
        e.preventDefault();
        console.log(formValues);
        axios.post("http://localhost:8080/users", formValues).then(() => {
            setSuccessMessage(`Thank you for uploading your demo ${formValues.name}`);
            setShowForm(false);
            console.log(formValues);
        }).catch((error) => console.error(error))

    }


    return (
        <SUserForm>
            <h2>Demo Upload</h2>
            {successMessage && (
                <div className="success-message">{successMessage}</div>
            )}
            {showForm && (
                <form onSubmit={handleSubmit(handleSave)}>
                    <label>
                        <p>username:</p>
                        <input {...register("username", {required: true, value: "Test_Admin_1" })} placeholder="Enter Name"/>
                        <div style={{color: 'red'}}>{errors.name?.message}</div>
                    </label>
                    <div>
                        <p>Email:</p>
                        <input {...register("email", {required: true, value: "admin@testmail.com"})} placeholder="Enter Email"/>
                        <div style={{color: 'red'}}>{errors.email?.message}</div>
                    </div>
                    <div>
                        <p>Password:</p>
                        <input
                            {...register("password", {required: true, minLength: 6, value: "ExamplePassword2"})}
                            name="password"
                            type="password"
                            placeholder="Enter password of minimum 6 characters"
                        />
                        <div style={{color: 'red'}}>{errors.password?.message &&
                            <span>{errors.password?.message}</span>}</div>
                    </div>
                    <div>
                        <p>Country:</p>
                        <input {...register("country", {value: "Netherlands"})} placeholder="Enter Country"/>
                        <div style={{color: 'red'}}>{errors.country?.message}</div>
                    </div>
                    <div>
                        <p>Artist Name:</p>
                        <input {...register("artistName", {value: "Test ArtistName"})} placeholder="Enter Artist Name"/>
                        <div style={{color: 'red'}}>{errors.name?.message}</div>
                    </div>
                    <div>
                        <p>Track Title:</p>
                        <input {...register("demoTitle", {value:"TestSongTitle"})} placeholder="Demo Title" />
                        <div style={{color: 'red'}}>{errors.name?.message}</div>
                    </div>

                    <div>
                        <p>Enabled:</p>
                        <input {...register("enabled", {required: true, value: "true"})} placeholder="Enter Name"/>
                        <div style={{color: 'red'}}>{errors.name?.message}</div>
                    </div>

                    {/*<div>*/}
                    {/*    <p>Profile image:</p>*/}
                    {/*    <label htmlFor="profileImage"/>*/}
                    {/*    <input type="file" {...register("profileImage")}*/}
                    {/*           id="profileImage"*/}
                    {/*    />*/}
                    {/*    <div style={{color: 'red'}}>{errors.profileImage?.message}</div>*/}
                    {/*</div>*/}
                    <div>
                        <p>Upload music:</p>
                        <label htmlFor="profileUserDemo"/>
                        <input type="file" {...register("profileUserDemo")}
                               id="profileUserDemo"
                        />
                        <div style={{color: 'red'}}>{errors.profileUserDemo?.message}</div>
                    </div>

                    <button type="submit">Save</button>
                </form>
            )}
        </SUserForm>
    );
}

export default UserForm;