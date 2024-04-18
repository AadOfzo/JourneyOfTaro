import {useState} from "react";
import axios from "axios";

function PostRequestPage() {
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [addSucces, toggleAddSuccess] = useState(false);


    async function addUser(e) {

        e.preventDefault()
        console.log(userName, email)

        try {
            const response = await axios.post('http://localhost:8080/users', {
                username: userName,
                email: email,
            })

            console.log(response)

        } catch (e) {
            console.error(e)
        }
    }

    return (
        <div className={"user-page-container"}>
            <h1>Add a new User</h1>

            <form onSubmit={addUser}>
                <label htmlFor={"user-name"}>
                    Name and Surname:
                    <input
                        type="text"
                        name="user-name-field"
                        id="user-name"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                    />
                </label>
                <label htmlFor="password">
                    Password:
                    :
                    <input
                        type="password"
                        name="user-email-field"
                        id="user-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </label>
                <label htmlFor="student-email">
                    Email:
                    <input
                        type="email"
                        name="user-email-field"
                        id="user-email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}/>
                </label>
                <button type="submit">
                    Add User
                </button>
            </form>
        </div>
    );
}

export default PostRequestPage;