import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";
import ChatView from 'views/ChatView';
const dashboardRoutes = [
  {
    path: "/chat",
    name: "Chat",
    icon: Dashboard,
    component: ChatView,
    layout: "/admin"
  },
  
];

export default dashboardRoutes;