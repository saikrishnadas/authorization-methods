import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from "react-router-dom";

function User() {
    const [users, setUsers] = useState();
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        //Cancel asynchronous operations, such as HTTP requests, when the component is unmounted. It's especially useful for preventing unnecessary network requests and freeing up resources.
        //If the component is unmounted before the API request completes, the request can be aborted to prevent potential issues or memory leaks.
        let isMounted = true;
        let controller = new AbortController();

        const getUsers = async () => {
            try {
                const response = await axiosPrivate.get('/users/all', {
                    signal: controller.signal
                });
                console.log(response.data);
                isMounted && setUsers(response.data)
            } catch (error) {
                console.error(error)
                navigate('/login', { state: { from: location }, replace: true }); //Probably the refresh token expired, so redirect to /login with the location, so that when user logins in they will be taken to the page they were on.
            }
        }

        getUsers(); //call the function

        //useEffect hook returns a cleanup function - This prevents potential memory leaks from the ongoing API request.
        return () => {
            isMounted = false;
            controller.abort();
        }
    }, [])

    return (
        <article>
            <h2>Users List</h2>
            {users?.length
                ? (
                    <ul>
                        {users.map((user, i) => <li key={i}>{user?.username}</li>)}
                    </ul>
                ) : <p>No users to display</p>
            }
        </article>
    )
}

export default User
