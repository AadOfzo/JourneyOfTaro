// import Select from "react-select";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {z, string} from "zod";
import SUserForm from "./styles.UserForm";
// import {getValue} from "@testing-library/user-event/dist/utils";

const schema = z.object({
    name: string().min(1),
    email: string().email(),
    password: z.string().min(6),
    country: string(),
    // testSelect: string(),
    artistName: string().min(1),
    demoTitle: string().min(1),
    profileImage:
        typeof window === "undefined" // this is required if your app rendered in server side, otherwise just remove the ternary condition
            ? z.undefined()
            : z
                .instanceof(FileList)
                .refine(file => file.length !== 0, {
                    message: "File is required",
                })
                .refine(
                    file => {
                        const fileType = file.item?.(0)?.type || "";
                        return fileType === "image/png";
                    },
                    {
                        message: "File must be in .png format",
                    }
                )
                .refine(
                    file => {
                        const fileSize = file.item?.(0)?.size || 0;
                        return fileSize <= 2048000;
                    },
                    {message: "File size must be less than or equal to 2Mb"}
                ),

    profileUserDemo:
        typeof window === "undefined" // this is required if your app rendered in server side, otherwise just remove the ternary condition
            ? z.undefined()
            : z
                .instanceof(FileList)
                .refine(file => file.length !== 0, {
                    message: "File is required",
                })
                .refine(
                    file => {
                        const fileType = file.item?.(0)?.type || "";
                        return fileType === "audio/mpeg";
                    },
                    {
                        message: "File must be in .mp3 format",
                    }
                )
                .refine(
                    file => {
                        const fileSize = file.item?.(0)?.size || 0;
                        return fileSize <= 10240000;
                    },
                    {message: "File size must be less than or equal to 10Mb"}
                ),
})

// const selectOptions = [
//     {value: 'bla', label: 'bla'},
//     {value: 'bla2', label: 'bla2'},
// ]

const UserForm = () => {
    const {register, handleSubmit, formState} = useForm({
        resolver: zodResolver(schema)
    });
    const {errors} = formState;

    // const {field} = useController({name: "testSelect", control});

    // const handleSelectChange = (option) => {
    //     field.onChange(option.value);
    // }

    const handleSave = (formValues) => {
        console.log(formValues)
    }


    return (
        <SUserForm>
            <h2>Demo Upload</h2>
            <form onSubmit={handleSubmit(handleSave)}>
                <div>
                    <p>Name:</p>
                    <input {...register("name")} />
                    <div style={{color: 'red'}}>{errors.name?.message}</div>
                </div>
                <div>
                    <p>Email:</p>
                    <input {...register("email", {required: true,})} />
                    <div style={{color: 'red'}}>{errors.email?.message}</div>
                </div>
                <div>
                    <p>Password:</p>
                    <input
                        {...register("password", {required: true, minLength: 6})}
                        name="password"
                        type="password"
                    />
                    <div style={{color: 'red'}}>{errors.password?.message &&
                        <span>{errors.password?.message}</span>}</div>
                </div>
                <div>
                    <p>Country:</p>
                    <input {...register("country")} />
                    <div style={{color: 'red'}}>{errors.country?.message}</div>
                </div>
                <div>
                    <p>Artist Name:</p>
                    <input {...register("artistName")} />
                    <div style={{color: 'red'}}>{errors.name?.message}</div>
                </div>
                <div>
                    <p>Track Title:</p>
                    <input {...register("demoTitle")} />
                    <div style={{color: 'red'}}>{errors.name?.message}</div>
                </div>
                <div>
                    <p>Profile image:</p>
                    <label htmlFor="profileImage"/>
                    <input type="file" {...register("profileImage")}
                           id="profileImage"
                           hidden
                    />
                    <div style={{color: 'red'}}>{errors.profileImage?.message}</div>
                </div>
                <div>
                    <p>Upload music:</p>
                    <label htmlFor="profileUserDemo"/>
                    <input type="file" {...register("profileUserDemo")}
                           id="profileUserDemo"
                    />
                    <div style={{color: 'red'}}>{errors.profileUserDemo?.message}</div>
                </div>


                {/*<div>*/}
                {/*    <p>Selectbox TEST!!!:</p>*/}
                {/*    <Select*/}
                {/*        value={selectOptions.find(({value}) => value === field.value)}*/}
                {/*        onChange={handleSelectChange}*/}
                {/*        options={selectOptions}*/}
                {/*    />*/}
                {/*    <div style={{color: 'red'}}>{errors.testSelect?.message}</div>*/}
                {/*</div>*/}

                <button type="submit">Save</button>
            </form>
        </SUserForm>
    );
}

export default UserForm;