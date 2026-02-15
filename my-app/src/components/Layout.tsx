import { useState } from "react";
import { Link, useLocation, Outlet } from "react-router-dom";
import {
  FileText,
  BarChart3,
  Settings,
  Shield,
  FileCode,
  Search,
  CircleUserRound,
  Menu,
  Users,
  X,
  CalendarDays,
  Plus,
  House,
  Eye,
} from "lucide-react";
import LogoImg from "../assets/logo1.png";
import LogoImgTwo from "../assets/logo2.png";
import ProfileMenu from "./dashboard/profilemenu";

const USER_ROLES = {
  UBEC_ADMIN: 'UBEC Admin',
  DESK_OFFICER: 'Desk Officers',
  TRAINING_DIRECTOR: 'Training Director',
  MONITORING_OFFICER: 'Monitoring Officer',
  SSO: 'SSO (School Support Officer)',
  EDUCATION_SECRETARY: 'Education Secretary',
} as const;

const iconNavigation = [
  { name: "User", icon: CircleUserRound, href: "/users/overview" },
  { name: "Analytics", icon: BarChart3, href: "/analytics" },
  { name: "Settings", icon: Settings, href: "/settings" },
  { name: "Team", icon: Users, href: "/team" },
  { name: "Security", icon: Shield, href: "/security" },
  { name: "Documents", icon: FileCode, href: "/documents" },
];

const navigation = [
  { name: "Calendar", href: "/calendar", icon: CalendarDays },
  { name: "Training Program", href: "/training", icon: Settings },
];

const dashboard = [
  { name: "National Overview", icon: <House className="h-4 w-4" />, to: "/dashboard/overview" },
];

const trainingPrograms = [
  { name: "Overview", icon: <Eye className="h-4 w-4" />, to: "/training/overview" },
  { name: "Manage Training", icon: <FileText className="h-4 w-4" />, to: "/training/manage" },
  { name: "Assign Officers", icon: <Users className="h-4 w-4" />, to: "/training/assign-officer" },
  { name: "Training Type", icon: <FileText className="h-4 w-4" />, to: "/training/training-type" },
  { name: "Program Tracker", icon: <FileText className="h-4 w-4" />, to: "/training/tracker" },
];

const training = [
  { name: "Training Activities", icon: <FileText className="h-4 w-4" />, to: "/training/activities" },
];

const teachers = [
  { name: "Register Teacher", icon: <Eye className="h-4 w-4" />, to: "/teachers/register-new" },
  { name: "Biometric", icon: <FileText className="h-4 w-4" />, to: "/teachers/biometric" },
  { name: "List of Teachers", icon: <Users className="h-4 w-4" />, to: "/teachers/list-of-teachers" },
  { name: "Transfer Teachers", icon: <FileText className="h-4 w-4" />, to: "/teachers/transfer-teacher" },
  { name: "Teacher Resignation", icon: <FileText className="h-4 w-4" />, to: "/teachers/teacher-resignation" },
];

const schools = [
  { name: "Register School", icon: <Plus className="h-4 w-4" />, to: "/schools/register-school" },
  { name: "List of Schools", icon: <FileText className="h-4 w-4" />, to: "/schools/list-of-schools" },
];

const educationalSecretary = [
  { name: "Register ES", icon: <Plus className="h-4 w-4" />, to: "/es/register-es" },
  { name: "ES Activities", icon: <FileText className="h-4 w-4" />, to: "/es/es-activities" },
];

const users = [
  { name: "Overview", icon: <FileText className="h-4 w-4" />, to: "/users/overview" },
  { name: "All Users", icon: <Users className="h-4 w-4" />, to: "/users/all-users" },
  { name: "My Profile", icon: <CircleUserRound className="h-4 w-4" />, to: "/users/my-profile" },
];

const monitoringEvaluation = [
  { name: "Monitoring Officers", icon: <Eye className="h-4 w-4" />, to: "/monitoring/officers" },
  { name: "Officer Activities", icon: <FileText className="h-4 w-4" />, to: "/monitoring/activities" },
  { name: "Compliance Report", icon: <FileText className="h-4 w-4" />, to: "/monitoring/compliance" },
  { name: "Training Evaluation", icon: <FileText className="h-4 w-4" />, to: "/monitoring/evaluation" },
];

const sso = [
  { name: "Register SSO", icon: <FileText className="h-4 w-4" />, to: "/sso/register-sso" },
  { name: "SSOs Activities", icon: <FileText className="h-4 w-4" />, to: "/sso/sso-activities" },
  { name: "Training Evaluation", icon: <FileText className="h-4 w-4" />, to: "/sso/evaluation" },
];

const subec = [
  { name: "State Overview", icon: <Eye className="h-4 w-4" />, to: "/subec" },
  { name: "Teachers Training", icon: <FileText className="h-4 w-4" />, to: "/subec/teachers" },
  { name: "Training Report", icon: <FileText className="h-4 w-4" />, to: "/subec/report" },
  { name: "Performance Report", icon: <FileText className="h-4 w-4" />, to: "/subec/performance" },
];

const reportInsight = [
  { name: "Training Report", icon: <FileText className="h-4 w-4" />, to: "/reports/training" },
  { name: "Teachers Report", icon: <FileText className="h-4 w-4" />, to: "/reports/teachers" },
  { name: "State Report", icon: <FileText className="h-4 w-4" />, to: "/reports/state" },
  { name: "LGA Report", icon: <FileText className="h-4 w-4" />, to: "/reports/lga" },
];


function RoleIndicator({ currentUserRole }: { currentUserRole: string }) {
  return (
    <div className="px-3 py-2 mb-4 bg-transparent">
      <p className="text-xl lg:text-xl">
        <span className="font-bold"></span> {currentUserRole}
      </p>
    </div>
  );
}

function DashboardSection() {
  const location = useLocation();
  return (
    <div className="mt-0 border-b-[1.9px] border-gray-300 pb-2">
      <div className="flex items-center justify-between px-3 mb-2">
        <h3 className="text-xs font-light font-montserrat text-gray-300 tracking-wider">
          Dashboard
        </h3>
      </div>
      <div className="space-y-1">
        {dashboard.map((item) => (
          <Link
            key={item.name}
            to={item.to}
            className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-light transition-all duration-200 w-full ${
              location.pathname === item.to
                ? "bg-blue-50 text-[#19488A] font-medium"
                : "text-gray-600 hover:bg-gray-100 hover:text-[#19488A]"
            }`}
          >
            <span className="text-lg flex-shrink-0">{item.icon}</span>
            <span className="flex-1 text-left">{item.name}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}

function TraingProgramsSection() {
  const location = useLocation();
  return (
    <div className="mt-6 border-b-[1.9px] border-gray-300 pb-2">
      <div className="flex items-center justify-between px-3 mb-2">
        <h3 className="text-xs text-gray-300 tracking-wider">Training Program</h3>
      </div>
      <div className="space-y-1">
        {trainingPrograms.map((item) => (
          <Link
            key={item.name}
            to={item.to}
            className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-light transition-all duration-200 w-full ${
              location.pathname.startsWith(item.to)
                ? "bg-blue-50 text-[#19488A] font-medium"
                : "text-gray-600 hover:bg-gray-100 hover:text-[#19488A]"
            }`}
          >
            <span className="text-lg flex-shrink-0">{item.icon}</span>
            <span className="flex-1 text-left">{item.name}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}

function TraingSection() {
  const location = useLocation();
  return (
    <div className="mt-6 border-b-[1.9px] border-gray-300 pb-2">
      <div className="flex items-center justify-between px-3 mb-2">
        <h3 className="text-xs text-gray-300 tracking-wider">Training</h3>
      </div>
      <div className="space-y-1">
        {training.map((item) => (
          <Link
            key={item.name}
            to={item.to}
            className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-light transition-all duration-200 w-full ${
              location.pathname.startsWith(item.to)
                ? "bg-blue-50 text-[#19488A] font-medium"
                : "text-gray-600 hover:bg-gray-100 hover:text-[#19488A]"
            }`}
          >
            <span className="text-lg flex-shrink-0">{item.icon}</span>
            <span className="flex-1 text-left">{item.name}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}

function TeachersSection() {
  const location = useLocation();
  return (
    <div className="mt-6 border-b-[1.9px] border-gray-300 pb-2">
      <div className="flex items-center justify-between px-3 mb-2">
        <h3 className="text-xs text-gray-300 tracking-wider">Teachers</h3>
      </div>
      <div className="space-y-1">
        {teachers.map((item) => (
          <Link
            key={item.name}
            to={item.to}
            className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-light transition-all duration-200 w-full ${
              location.pathname.startsWith(item.to)
                ? "bg-blue-50 text-[#19488A] font-medium"
                : "text-gray-600 hover:bg-gray-100 hover:text-[#19488A]"
            }`}
          >
            <span className="text-lg flex-shrink-0">{item.icon}</span>
            <span className="flex-1 text-left">{item.name}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}

function SchoolsSection() {
  const location = useLocation();
  return (
    <div className="mt-6 border-b-[1.9px] border-gray-300 pb-2">
      <div className="flex items-center justify-between px-3 mb-2">
        <h3 className="text-xs text-gray-300 tracking-wider">Schools</h3>
      </div>
      <div className="space-y-1">
        {schools.map((item) => (
          <Link
            key={item.name}
            to={item.to}
            className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-light transition-all duration-200 w-full ${
              location.pathname === item.to
                ? "bg-blue-50 text-[#19488A] font-medium"
                : "text-gray-600 hover:bg-gray-100 hover:text-[#19488A]"
            }`}
          >
            <span className="text-lg flex-shrink-0">{item.icon}</span>
            <span className="flex-1 text-left">{item.name}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}

function EducationSecretarySection() {
  const location = useLocation();
  return (
    <div className="mt-6 border-b-[1.9px] border-gray-300 pb-2">
      <div className="flex items-center justify-between px-3 mb-2">
        <h3 className="text-xs text-gray-300 tracking-wider">Education Secretary</h3>
      </div>
      <div className="space-y-1">
        {educationalSecretary.map((item) => (
          <Link
            key={item.name}
            to={item.to}
            className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-light transition-all duration-200 w-full ${
              location.pathname === item.to
                ? "bg-blue-50 text-[#19488A] font-medium"
                : "text-gray-600 hover:bg-gray-100 hover:text-[#19488A]"
            }`}
          >
            <span className="text-lg flex-shrink-0">{item.icon}</span>
            <span className="flex-1 text-left">{item.name}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}

function UsersSection() {
  const location = useLocation();
  return (
    <div className="mt-6 border-b-[1.9px] border-gray-300 pb-2">
      <div className="flex items-center justify-between px-3 mb-2">
        <h3 className="text-xs text-gray-300 tracking-wider">Users</h3>
      </div>
      <div className="space-y-1">
        {users.map((item) => (
          <Link
            key={item.name}
            to={item.to}
            className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-light transition-all duration-200 w-full ${
              location.pathname === item.to || location.pathname.startsWith(item.to + "/")
                ? "bg-blue-50 text-[#19488A] font-medium"
                : "text-gray-600 hover:bg-gray-100 hover:text-[#19488A]"
            }`}
          >
            <span className="text-lg flex-shrink-0">{item.icon}</span>
            <span className="flex-1 text-left">{item.name}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}

function MonitoringEvaluationSection() {
  const location = useLocation();
  return (
    <div className="mt-6 border-b-[1.9px] border-gray-300 pb-2">
      <div className="flex items-center justify-between px-3 mb-2">
        <h3 className="text-xs text-gray-300 tracking-wider">Monitoring & Evaluation</h3>
      </div>
      <div className="space-y-1">
        {monitoringEvaluation.map((item) => (
          <Link
            key={item.name}
            to={item.to}
            className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-light transition-all duration-200 w-full ${
              location.pathname.startsWith(item.to)
                ? "bg-blue-50 text-[#19488A] font-medium"
                : "text-gray-600 hover:bg-gray-100 hover:text-[#19488A]"
            }`}
          >
            <span className="text-lg flex-shrink-0">{item.icon}</span>
            <span className="flex-1 text-left">{item.name}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}

function SchoolSupportOfficerSection() {
  const location = useLocation();
  return (
    <div className="mt-6 border-b-[1.9px] border-gray-300 pb-2">
      <div className="flex items-center justify-between px-3 mb-2">
        <h3 className="text-xs text-gray-300 tracking-wider">School Support Officer</h3>
      </div>
      <div className="space-y-1">
        {sso.map((item) => (
          <Link
            key={item.name}
            to={item.to}
            className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-light transition-all duration-200 w-full ${
              location.pathname.startsWith(item.to)
                ? "bg-blue-50 text-[#19488A] font-medium"
                : "text-gray-600 hover:bg-gray-100 hover:text-[#19488A]"
            }`}
          >
            <span className="text-lg flex-shrink-0">{item.icon}</span>
            <span className="flex-1 text-left">{item.name}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}

function SubecSection() {
  const location = useLocation();
  return (
    <div className="mt-6 border-b-[1.9px] border-gray-300 pb-2">
      <div className="flex items-center justify-between px-3 mb-2">
        <h3 className="text-xs text-gray-300 tracking-wider">SUBEC</h3>
      </div>
      <div className="space-y-1">
        {subec.map((item) => (
          <Link
            key={item.name}
            to={item.to}
            className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-light transition-all duration-200 w-full ${
              location.pathname.startsWith(item.to)
                ? "bg-blue-50 text-[#19488A] font-medium"
                : "text-gray-600 hover:bg-gray-100 hover:text-[#19488A]"
            }`}
          >
            <span className="text-lg flex-shrink-0">{item.icon}</span>
            <span className="flex-1 text-left">{item.name}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}

function ReportInsightSection() {
  const location = useLocation();
  return (
    <div className="mt-6 border-gray-300 pb-2">
      <div className="flex items-center justify-between px-3 mb-2">
        <h3 className="text-xs text-gray-300 tracking-wider">Report & Insight</h3>
      </div>
      <div className="space-y-1">
        {reportInsight.map((item) => (
          <Link
            key={item.name}
            to={item.to}
            className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-light transition-all duration-200 w-full ${
              location.pathname.startsWith(item.to)
                ? "bg-blue-50 text-[#19488A] font-medium"
                : "text-gray-600 hover:bg-gray-100 hover:text-[#19488A]"
            }`}
          >
            <span className="text-lg flex-shrink-0">{item.icon}</span>
            <span className="flex-1 text-left">{item.name}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}


export function Layout() {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [secondSidebarOpen, setSecondSidebarOpen] = useState(true);

  const [currentUserRole] = useState<string>(USER_ROLES.DESK_OFFICER);

  const isDeskOfficer = currentUserRole === USER_ROLES.DESK_OFFICER;
  const isTRAININGDIRECTOR = currentUserRole === USER_ROLES.TRAINING_DIRECTOR;

  const shouldShowTeachers = () => currentUserRole === USER_ROLES.DESK_OFFICER;
  const shouldShowTraining = () => currentUserRole === USER_ROLES.TRAINING_DIRECTOR;
  const shouldEducationSecretary = () => currentUserRole === USER_ROLES.DESK_OFFICER;
  const shouldShowSchool = () => !isTRAININGDIRECTOR;
  const shouldShowSSO = () => !isTRAININGDIRECTOR;
  const shouldShowSubec = () => !isDeskOfficer && !isTRAININGDIRECTOR;
  const shouldShowTrainingPrograms = () => !isTRAININGDIRECTOR;
  const shouldShowUsers = () => !isDeskOfficer && !isTRAININGDIRECTOR;
  const shouldShowReportingInsight = () => !isDeskOfficer && !isTRAININGDIRECTOR;
  const shouldShowMonitoringAndEvaluation = () => !isDeskOfficer && !isTRAININGDIRECTOR;

  const getBreadcrumb = () => {
    const pathSegments = location.pathname.split('/').filter(segment => segment.length > 0);

    let sectionName = '';
    if (pathSegments.length > 0) {
      sectionName = pathSegments[0].charAt(0).toUpperCase() + pathSegments[0].slice(1);

      if (sectionName === "Sso") sectionName = "School Support Officer";
      if (sectionName === "Reports") sectionName = "Report & Insight";
    }

    if (!sectionName) {
      sectionName = 'Dashboard';
    }
    if (pathSegments[0] === 'users') {
      sectionName = 'Users';
    }
    if (pathSegments[0] === 'subec') {
      sectionName = 'SUBEC';
    }

    return (
      <div className="hidden sm:flex items-center gap-2 text-sm text-gray-600">
        <Link to="/dashboard/overview" className="hover:text-gray-900 cursor-pointer">
          Home
        </Link>
        <span>/</span>
        <span className="font-medium text-gray-900">{sectionName}</span>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 font-montserrat">

      <aside className="fixed left-0 top-0 z-50 hidden h-screen w-16 lg:block">
        <div className="mt-2">
          <div className="flex flex-col items-center justify-center space-y-4 px-2 lg:mt-6">
            <Link to="/dashboard/overview">
              <img src={LogoImg} alt="Logo" className="w-[100%] lg:w-[100%] h-auto cursor-pointer" />
            </Link>
            <Link to="/dashboard/overview">
              <img src={LogoImgTwo} alt="Logo" className="w-[100%] lg:w-[100%] cursor-pointer" />
            </Link>
          </div>
        </div>

        <nav className="py-3 space-y-1 px-3">
          {iconNavigation.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.name}
                to={item.href}
                className={`w-full flex items-center justify-center py-3 transition-colors ${
                  isActive ? "bg-[#19488A] rounded-lg" : "hover:bg-gray-300"
                }`}
                title={item.name}
              >
                <Icon className={`h-5 w-5 ${isActive ? "text-white" : "text-gray-400"}`} />
              </Link>
            );
          })}
        </nav>

        <nav className="py-2 space-y-1 px-2 mt-[13.4rem]">
          {navigation.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.name}
                to={item.href}
                className={`w-full flex items-center justify-center py-3 transition-colors ${
                  isActive ? "bg-[#19488A] rounded-md" : "hover:bg-gray-300"
                }`}
                title={item.name}
              >
                <Icon className={`h-5 w-5 ${isActive ? "text-white" : "text-gray-400"}`} />
              </Link>
            );
          })}
        </nav>

        <div className="absolute bottom-0 w-full py-4">
          <button className="w-full flex items-center justify-center" title="User Settings">
            <img
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=User"
              alt="User"
              className="w-10 h-10 rounded-full"
            />
          </button>
        </div>
      </aside>


      <aside
        className={`bg-white fixed top-16 left-16 z-40 h-[calc(100vh-4rem)] w-64 border-r border-gray-200 transform transition-transform duration-300 ease-in-out ${
          secondSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } hidden lg:block`}
      >
        <div className="overflow-y-auto h-full">
          <div className="py-4">
            <RoleIndicator currentUserRole={currentUserRole} />
            <DashboardSection />
            {shouldShowTrainingPrograms() && <TraingProgramsSection />}
            {shouldShowTraining() && <TraingSection />}
            {shouldShowTeachers() && <TeachersSection />}
            {shouldEducationSecretary() && <EducationSecretarySection />}
            {shouldShowSchool() && <SchoolsSection />}
            {shouldShowUsers() && <UsersSection />}
            {shouldShowMonitoringAndEvaluation() && <MonitoringEvaluationSection />}
            {shouldShowSSO() && <SchoolSupportOfficerSection />}
            {shouldShowSubec() && <SubecSection />}
            {shouldShowReportingInsight() && <ReportInsightSection />}
          </div>
        </div>
      </aside>


      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="fixed inset-0 bg-slate-300 bg-opacity-75" onClick={() => setMobileMenuOpen(false)} />
          <div className="fixed left-0 top-0 h-full flex">
            <aside className="bg-gray-200 w-16 md:w-24">
              <div className="mt-6  ">
                <div className="flex flex-col items-center justify-center space-y-4 px-2 pb-4">
                  <Link to="/dashboard/overview">
                    <img src={LogoImg} alt="Logo" className="w-full h-auto cursor-pointer" />
                  </Link>
                  <Link to="/dashboard/overview">
                    <img src={LogoImgTwo} alt="Logo" className="w-full cursor-pointer" />
                  </Link>
                </div>
              </div>

              <nav className="py-3 space-y-1 px-3">
                {iconNavigation.map((item) => {
                  const Icon = item.icon;
                  const isActive = location.pathname === item.href;
                  return (
                    <Link
                      key={item.name}
                      to={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`w-full flex items-center justify-center py-3 transition-colors ${
                        isActive ? "bg-[#19488A] rounded-md" : "hover:bg-gray-300"
                      }`}
                      title={item.name}
                    >
                      <Icon className={`h-5 w-5 md:w-6 md:h-6 ${isActive ? "text-white" : "text-gray-400"}`} />
                    </Link>
                  );
                })}
              </nav>

              <nav className="py-2 md:py-2 space-y-1 px-2 mt-16 md:mt-[18rem]">
                {navigation.map((item) => {
                  const Icon = item.icon;
                  const isActive = location.pathname === item.href;
                  return (
                    <Link
                      key={item.name}
                      to={item.href}
                      className={`w-full flex items-center justify-center py-3 transition-colors ${
                        isActive ? "bg-[#19488A] rounded-md" : "hover:bg-gray-300"
                      }`}
                      title={item.name}
                    >
                      <Icon className={`h-5 w-5 md:w-6 md:h-6 ${isActive ? "text-white" : "text-gray-400"}`} />
                    </Link>
                  );
                })}
              </nav>

              <div className="w-full py-0 md:py-4 md:mt-2">
                <button className="w-full flex items-center justify-center" title="User Settings">
                  <img
                    src="https://api.dicebear.com/7.x/avataaars/svg?seed=User"
                    alt="User"
                    className="w-10 h-10 md:w-12 md:h-12"
                  />
                </button>
              </div>
            </aside>

            <aside className="bg-white w-64 h-full overflow-y-auto">
              <div className="flex h-16 items-center justify-between border-b border-gray-200 px-4">
                <h1 className="text-lg font-bold text-gray-900">APC PLATFORM</h1>
                <button onClick={() => setMobileMenuOpen(false)} className="p-1.5 rounded-lg hover:bg-gray-100">
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div className="p-4">
                <RoleIndicator currentUserRole={currentUserRole} />
                <DashboardSection />
                {shouldShowTrainingPrograms() && <TraingProgramsSection />}
                {shouldShowTraining() && <TraingSection />}
                {shouldShowTeachers() && <TeachersSection />}
                {shouldEducationSecretary() && <EducationSecretarySection />}
                {shouldShowSchool() && <SchoolsSection />}
                {shouldShowUsers() && <UsersSection />}
                {shouldShowMonitoringAndEvaluation() && <MonitoringEvaluationSection />}
                {shouldShowSSO() && <SchoolSupportOfficerSection />}
                {shouldShowSubec() && <SubecSection />}
                {shouldShowReportingInsight() && <ReportInsightSection />}
              </div>
            </aside>
          </div>
        </div>
      )}

      <div
        className={`
          transition-all duration-300 ease-in-out
          ${secondSidebarOpen ? 'lg:pl-80' : 'lg:pl-16'}
        `}
      >
        <header className="fixed top-0 left-0 right-0 z-30 flex h-16 items-center justify-between border-b border-gray-200 bg-white px-4 lg:px-6 lg:left-16 lg:right-0">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="p-2 rounded-lg hover:bg-gray-100 lg:hidden"
            >
              <Menu className="h-5 w-5" />
            </button>

            <div className="flex items-center justify-between gap-3 lg:w-[14.5rem] lg:border-r h-[64px]">
              <h1 className="text-lg font-bold text-gray-900">APC PLATFORM</h1>
              <button
                onClick={() => setSecondSidebarOpen(prev => !prev)}
                className="hidden lg:block p-2 rounded-lg hover:bg-gray-100"
              >
                <Menu className="h-5 w-5" />
              </button>
            </div>

            {getBreadcrumb()}
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center">
              <div className="relative hidden lg:block">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="search"
                  placeholder="Search..."
                  className="w-64 pl-9 pr-10 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="lg:hidden relative">
                <button
                  onClick={() => setMobileSearchOpen(prev => !prev)}
                  className="p-1 md:p-2 rounded-lg border border-gray-300 hover:bg-gray-50 transition"
                  aria-label="Search"
                >
                  <Search className="h-4 w-4 md:w-5 md:h-5 text-gray-600" />
                </button>

                <div
                  className={`fixed inset-x-0 top-16 z-50 transition-all duration-300 ease-in-out ${
                    mobileSearchOpen
                      ? "translate-y-0 opacity-100"
                      : "-translate-y-4 opacity-0 pointer-events-none"
                  }`}
                >
                  <div className="px-4 pt-4 pb-3 bg-white border-b border-gray-200 shadow-lg">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <input
                        autoFocus
                        type="search"
                        placeholder="Search..."
                        className="w-full pl-10 pr-10 py-3 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        onBlur={() => {
                          setTimeout(() => {
                            if (document.activeElement?.tagName !== 'INPUT') {
                              setMobileSearchOpen(false);
                            }
                          }, 100);
                        }}
                      />
                      <button
                        onClick={() => setMobileSearchOpen(false)}
                        className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded hover:bg-gray-100"
                      >
                        <X className="h-4 w-4 text-gray-500" />
                      </button>
                    </div>
                  </div>
                </div>

                {mobileSearchOpen && (
                  <div
                    className="fixed inset-0 z-40 bg-black bg-opacity-10"
                    onClick={() => setMobileSearchOpen(false)}
                  />
                )}
              </div>
            </div>

            <button className="hidden lg:flex items-center gap-2 px-3 py-1.5 border rounded-lg hover:bg-gray-100">
              <FileText className="h-4 w-4" />
              <span className="text-sm">Reports</span>
            </button>
            <button className="lg:hidden p-1 md:p-2 rounded-lg hover:bg-gray-100 border" aria-label="Reports">
              <FileText className="h-4 w-4 md:w-5 md:h-5 text-gray-600" />
            </button>

            <button className="hidden lg:flex items-center px-4 py-2 bg-[#19488A] text-white text-sm font-medium rounded-lg hover:bg-blue-700">
              <span>+ Add</span>
            </button>
            <button className="lg:hidden p-1 md:p-2 rounded bg-blue-600 hover:bg-blue-700 text-white" aria-label="Add">
              <Plus className="h-4 w-4 md:w-5 md:h-5" />
            </button>

            <button title="button" className="w-8 h-8 md:w-[40px] md:h-[40px] lg:w-10 lg:h-10 rounded-full flex justify-center items-center border-2 border-gray-200 overflow-hidden">
              <ProfileMenu />
            </button>
          </div>
        </header>

        <main className="relative z-10 top-[4.1rem] bg-white">
          <Outlet />
        </main>
      </div>
    </div>
  );
}