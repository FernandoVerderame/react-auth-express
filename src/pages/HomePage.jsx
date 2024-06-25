import { useAuth } from "../contexts/AuthContext";

const Home = () => {

    const { user, isLoggedIn } = useAuth();

    return (
        <div>
            {isLoggedIn ?
                <h1>Benvenuto {user.name}!</h1>
                :
                <h1>Benvenuto!</h1>
            }
        </div>
    );
}

export default Home;