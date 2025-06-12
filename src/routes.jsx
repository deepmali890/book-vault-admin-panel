import { createBrowserRouter } from 'react-router-dom';
import Login from './pages/Login';
import AdminLayout from './layouts/AdminLayout';
import AddBookCategory from './pages/bookcategory/AddBookCategory';
import ViewBookCategory from './pages/bookcategory/ViewBookCategory';
import DashBoard from './pages/dashboard/DashBoard';
import ProtectedRoute from './components/ProtectedRoute';
import PublicRoute from './components/PublicRoute';
import CreateUserPage from './pages/createUser/CreateUserPage';
import AddSubCategory from './pages/subcategory/AddSubCategory';
import ViewSubCategory from './pages/subcategory/ViewSubCategory';
import AddBook from './pages/book/AddBook';
import AddEpisode from './pages/episode/AddEpisode';
import Notification from './pages/notifications/Notification';
import Inquire from './pages/inquire/Inquire';
import Orders from './pages/orders/Orders';

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <PublicRoute>
        <Login />
      </PublicRoute>
    )
  },
  {
    path: "/admin",
    element: (
      <ProtectedRoute>
        <AdminLayout />
      </ProtectedRoute>
    ),
    children: [
      { path: "", element: <DashBoard /> },
      { path: "addbookcategory", element: <AddBookCategory /> },
      { path: "viewbookcategory", element: <ViewBookCategory /> },
      { path: "createuser", element: <CreateUserPage /> },
      { path: "addsubcategory", element: <AddSubCategory /> },
      { path: "viewsubcategory", element: <ViewSubCategory /> },
      { path: "addbook", element: <AddBook /> },
      { path: "addepisode", element: <AddEpisode /> },
      // { path: "viewepisode", element: <ViewEpisode /> },
      { path: "notification", element: <Notification /> },
      { path: "inquire", element: <Inquire /> },
      { path: "orders", element: <Orders /> },
      
    ]
  }
]);

export default router;
