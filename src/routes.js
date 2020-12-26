import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";
import ChatView from 'views/ChatView';
import VidView from 'views/VidView';
const dashboardRoutes = [
  {
    path: "/chat",
    name: "Chat",
    icon: Dashboard,
    component: ChatView,
    layout: "/admin"
  },
  {
    path: "/video",
    name: "Video",
    icon: Dashboard,
    component: VidView,
    layout: "/admin"
  },
  
];

export default dashboardRoutes;