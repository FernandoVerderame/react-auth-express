import { useAuth } from "../contexts/AuthContext";

export default function () {

    const { login } = useAuth();

    const handleLogin = e => {
        e.preventDefault();
        login();
    }

    return (<>
        <section id="login" className="d-flex justify-content-center mt-5">
            <form onSubmit={handleLogin}>
                <input
                    type="text"
                    placeholder="Email"
                />
                <input
                    type="password"
                    placeholder="Password"
                />
                <button>Loggati</button>
            </form>
        </section>
    </>)

}