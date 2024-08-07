import { PATHS } from "./paths"
import AboutPage from "../components/pages/AboutPage"
import RulesPage from "../components/pages/RulesPage"
import LoginPage from "../components/pages/LoginPage"
import CounselorRegPage from "../components/pages/signup/CounselorRegPage"
import CounselorsPage from "../components/pages/CounselorsPage"
import { createBrowserRouter, Navigate, Outlet} from 'react-router-dom'
import NavBar from "../components/layout/navbar/Navbar"
import StickyFooter from "../components/layout/Footer"
import UserRegPage from "../components/pages/signup/UserRegPage"
import TopicItem from "../components/topic/TopicItem"
import DeletePostPage from "../components/pages/DeletePostPage"
import { useSelector } from 'react-redux'
import { isProfessional, selectIsAuthenticated } from '../data/redux/auth/auth.selectors'
import { RootState } from '../data/redux/store'
import CreateTopicPage from '../components/pages/CreateTopicPage'
import HomePage from '../components/pages/HomePage'

export  const router = createBrowserRouter([
    {
        path: '',
        element: <Layout />,
        children: [
            {
                path: PATHS.Home,
                element: <HomePage/>
            },
            {
                path: PATHS.Counselors,
                element:<CounselorsPage/>
            },
            {
                path: PATHS.UserSignUp,
                element:  <UserRegPage /> 
            },
            {
                path: PATHS.CounselorSignUp,
                element: <CounselorRegPage />
              },

              {
                path: PATHS.NewTopic,
                element: <NewTopicGuard />
                
            },
              {
                path: PATHS.LogIn,
                element:  <LoginPage /> 
            },

            {
                path: PATHS.About,
                element:<AboutPage/>
            },
            {
                path: PATHS.ForumRules,
                element:<RulesPage/>
             },
    
            {
                path: PATHS.TopicItem,  
                element: <TopicItem />
            },
            {
                path:PATHS.DeletePost,
                element: <DeletePostPage/>
            }

           ]
          }
        ])

        function Layout() {
    return <>
        <header><Header/></header>
        <main><Outlet /></main>
        <footer><StickyFooter/></footer>
    </>
}

function Header(){
    return(<>
        <NavBar/>
    </>)
}

//  Restrict access to creating a new topic to logged-in users only.
function NewTopicGuard() {
    const isAuthenticated = useSelector(selectIsAuthenticated);
    const isCounselor = useSelector((state: RootState) => isProfessional(state));

    // If the user is logged in, show the new topic creation form.
    if (isAuthenticated && !isCounselor) {
        return <CreateTopicPage />;
    }
    
    else
    {
        // If the user is not logged in, redirect him to a page with the requested message.
        return <Navigate to={PATHS.UserSignUp} />;
    }
}

