import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLayout from "./components/AppLayout";
import Login from "./components/Login";
import { Provider } from "react-redux";
import appStore from "./redux/appStore";
import Feed from "./components/Feed";
import Connections from "./components/Connections";
import Requests from "./components/Requests";
import Chat from "./components/Chat";
import Home from "./components/Home";
import Pricing from "./components/Pricing";
import ProfileEdit from "./components/ProfileEdit";
import UserProfile from "./components/UserProfile";

function App() {
  return (
    <>
      <Provider store={appStore}>
        <BrowserRouter basename="/">
          {/* basename is where our application's root should point to  */}
          <Routes>
            <Route path="/" element={<AppLayout />}>
              {/* route matching our application's root */}
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/feed" element={<Feed />} />
              <Route path="/profile/edit" element={<ProfileEdit />} />
              <Route path="/connections" element={<Connections />} />
              <Route path="/requests" element={<Requests />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/profile/:userId" element={<UserProfile />} />
              <Route path="/chat/:targetUserId" element={<Chat />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;
