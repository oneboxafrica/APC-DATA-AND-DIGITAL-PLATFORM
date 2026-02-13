import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route} from "react-router-dom";
import Index from "./pages";
import NotFound from "./pages/NotFound";
import { Layout } from "./components/Layout";

import User from "./components/userMgt/UserMgt";
// import "leaflet/dist/leaflet.css";
import { TooltipProvider } from "./components/ui/tooltip";
import { Toaster } from "./components/ui/sonner";
import Dashboard from "./pages/dashboard/Dashboard";
import AllUser from "./components/userMgt/AllUser";
import MyProfile from "./components/userMgt/MyProfile";
import School from "./pages/Schools/School";
import AssignOfficer from "./pages/Training/AssignOfficer";
import ManageTraining from "./pages/Training/ManageTraining";
import TrainingType from "./pages/Training/TrainingType";
import Programtype from "./pages/Training/Programtype";
import TrainingMgt from "./components/trainingMgt/trainingMgt";
import StatePage from "./pages/StatePage";
import TrainingFormPage from "./pages/Training/TrainingFormPage";
import TrainingView from "./pages/Training/TrainingView";
// import StateDetails from "./pages/StateDetails";
import RegisterSchool from "./pages/Schools/RegisterSchool";
import RegisterNew from "./pages/Teachers/RegisterParticipant";
import Biometric from "./pages/Teachers/TeacherBiometric";
import ListOfTeachers from "./pages/Teachers/ListOfTeachers";
import TransferTeacher from "./pages/Teachers/TransferTeacher";
import TeacherResignation from "./pages/Teachers/TeacherResignation";
import SSOList from "./pages/SSO/SSOList";
import RegisterSSO from "./pages/SSO/RegisterSSO";
import RegisterES from "./pages/Es/RegisterEs";
import EsList from "./pages/Es/EsList";
import TrainingActivities from "./pages/Training/TrainingActivities";
import FillTrainingForm from "./pages/Training/FillTrainingForm";
import StateDetailsPage from "./pages/StateDetailsPage";
import { navItems } from "./nav-items";



const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster position="top-right" />

        <Routes>
 
          <Route path="/" element={<Index />} />
          

          <Route element={<Layout />}>
            <Route path="/dashboard/overview" element={<Dashboard />} />
            <Route path="/dashboard/overview/state/:slug" element={<StateDetailsPage />} />
            
            <Route
              path="/dashboard/metrics"
              element={<StatePage />}
            />

            
            {navItems.map(({ to, page }) => (
              <Route key={to} path={to} element={page} />
            ))}

            <Route path="/users/overview" element={<User />} />
            <Route path="/users/all-users" element={<AllUser />} />
            <Route path="/users/my-profile" element={<MyProfile />} />

             <Route path="/training/overview" element={<TrainingMgt />} />
            <Route path="/training/manage" element={<ManageTraining />} />
             <Route path="/training/activities" element={<TrainingActivities />} />
              <Route path="/training/fill-training-form" element={<FillTrainingForm />} />
             <Route path="/training/activities/edit/:id" element={<TrainingActivities />} />
             <Route path="/training/activities/view/:id" element={<TrainingActivities />} />
            <Route path="/training/manage/add" element={<TrainingFormPage />} />
      <Route path="/training/manage/edit/:id" element={<TrainingFormPage />} />
      <Route path="/training/manage/view/:id" element={<TrainingView />} />
            <Route path="/training/assign-officer" element={<AssignOfficer />} />
            <Route path="/training/training-type" element={<TrainingType />} />
            <Route path="/training/tracker" element={<Programtype />} />

            <Route path="/teachers/register-new" element={<RegisterNew />} />
            <Route path="/teachers/biometric" element={<Biometric />} />
            <Route path="/teachers/list-of-teachers" element={<ListOfTeachers />} />
            <Route path="/teachers/transfer-teacher" element={<TransferTeacher />} />
            <Route path="/teachers/teacher-resignation" element={<TeacherResignation />} />

            <Route path="/schools/list-of-schools" element={<School />} />
            <Route path="/schools/register-school" element={<RegisterSchool />} />

             <Route path="/sso/register-sso" element={<RegisterSSO />} />
             <Route path="/sso/sso-activities" element={<SSOList />} />

             <Route path="/es/register-es" element={<RegisterES />} />
             <Route path="/es/es-activities" element={<EsList />} />


          </Route>
 
          <Route path="*" element={<NotFound />} />
        </Routes>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
