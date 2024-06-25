import { BrowserRouter, Routes, Route } from "react-router-dom";
import DefaultLayout from "./layouts/DefaultLayout.jsx";
import HomePage from "./pages/HomePage.jsx";
import Posts from "./pages/Posts.jsx";
import PostDetail from "./pages/PostDeatil.jsx";
import CreatePost from "./pages/CreatePost.jsx";
import { GlobalProvider } from "./contexts/GlobalContext.jsx";
import EditPost from "./pages/EditPost.jsx";
import { AuthProvider } from "./contexts/AuthContext.jsx";
import PrivatePage from "./middlewares/PrivatePage.jsx";
import Login from "./pages/Login.jsx";

function App() {
  return (
    <BrowserRouter>
      <GlobalProvider>
        <AuthProvider>
          <Routes>

            {/* Rotte pubbliche */}
            <Route path="/" element={<DefaultLayout />}>
              <Route index element={<HomePage />} />
              <Route path="login" element={<Login />} />
              <Route path="posts">
                <Route index element={<Posts />} />
                <Route path=":slug" >
                  <Route index element={<PostDetail />} />
                </ Route>
              </Route>
            </Route>

            {/* Rotte private */}
            <Route path="/" element={
              <PrivatePage>
                <DefaultLayout />
              </PrivatePage>
            }>
              <Route path="posts">
                <Route path=":slug">
                  <Route path="edit" element={<EditPost />} />
                </Route>
                <Route path="create" element={<CreatePost />} />
              </Route>
            </Route>

          </Routes>
        </AuthProvider>
      </GlobalProvider>
    </BrowserRouter>
  );
}

export default App;