import Select from "react-select";
import {useForm, useController} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {z, string} from "zod";
import SUserForm from "./styles.UserForm";

const schema = z.object({
    name: string().min(1),
    email: string().email(),
    testSelect: string(),
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
                    { message: "File size must be less than or equal to 2Mb" }
                ),
        })

const selectOptions = [
    { value: 'bla', label: 'bla' },
    { value: 'bla2', label: 'bla2' },
]

const UserForm = () => {
    const { register, control, handleSubmit, formState } = useForm({
        resolver: zodResolver(schema)
    });
    const { errors } = formState;

    const { field } = useController({ name: "testSelect", control });

    const handleSelectChange = (option) => {
        field.onChange(option.value);
    }

    const handleSave = (formValues) => {
        console.log(formValues)
    }



    return (
        <SUserForm>
            <h1>Demo Upload</h1>
            <form onSubmit={handleSubmit(handleSave)}>
                <div>
                    <p>Name:</p>
                    <input {...register("name")} />
                    <div style={{ color: 'red' }}>{errors.name?.message}</div>
                </div>
                <div>
                    <p>Email:</p>
                    <input {...register("email")} />
                    <div style={{ color: 'red' }}>{errors.email?.message}</div>
                </div>
                <div>
                    <p>Profile image:</p>
                    <input type="file" {...register("profileImage")} />
                    <div style={{ color: 'red' }}>{errors.profileImage?.message}</div>
                </div>
                <div>
                    <p>Select dinges:</p>
                    <Select
                        value={selectOptions.find(({ value }) => value === field.value)}
                        onChange={handleSelectChange}
                        options={selectOptions}
                    />
                    <div style={{ color: 'red' }}>{errors.testSelect?.message}</div>
                </div>
                <button type="submit">Save</button>
            </form>
        </SUserForm>
    );
}

export default UserForm;