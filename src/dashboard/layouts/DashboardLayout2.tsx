import {
  IconHome,
  IconLayoutSidebarLeftCollapse,
  IconLayoutSidebarLeftExpand,
  IconReport,
  IconUsers,
  IconUsersGroup,
  IconCalendarEvent,
} from "@tabler/icons-react";
import { useState } from "react";
import lightLogo from "../../assets/svg/logo-light.svg";
import darkLogo from "../../assets/svg/logo-black.svg";
import { ProfileNavButton } from "../components/ProfileNavButton";
import { SidebarLink } from "../components/SidebarLink";
import dayjs from "dayjs";
import "dayjs/locale/es";
import { IconFileUpload, IconFileLike } from "@tabler/icons-react";
import { IconUserBolt } from "@tabler/icons-react";
dayjs.locale("es");

export const DashboardLayout2 = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [showSidebar, setShowSidebar] = useState(
    JSON.parse(localStorage.getItem("showSidebar") || "false"),
  );

  const handleSidebar = () => {
    setShowSidebar(!showSidebar);
    localStorage.setItem("showSidebar", JSON.stringify(!showSidebar));
  };

  return (
    <>
      <aside
        className={`fixed overflow-y-auto ${
          showSidebar ? "w-[15rem]" : "w-[5rem]"
        } h-full border-r transition-all bg-white border-gray-200 dark:bg-slate-800 dark:border-slate-700`}
      >
        <div className="flex items-center top-0 sticky z-10 justify-between overflow-x-hidden p-4">
          <a href="#" className="flex items-center pl-2">
            <img
              src={lightLogo}
              alt="logo"
              height={32}
              width={32}
              className="block dark:hidden max-w-full"
            />
            <img
              src={darkLogo}
              alt="logo"
              height={32}
              width={32}
              className="dark:block hidden max-w-full"
            />
            <span
              className={`ml-3 text-xl font-bold text-slate-900 dark:text-white ${
                !showSidebar && "hidden"
              }`}
            >
              Ideia
            </span>
          </a>

          {showSidebar && (
            <button onClick={handleSidebar}>
              <IconLayoutSidebarLeftCollapse size={24} stroke={1.5} />
            </button>
          )}
        </div>
        <div className="py-2 px-4 h-[calc(100%-80px)] overflow-y-auto z-50">
          <ul>
            <SidebarLink
              to="/"
              showSidebar={showSidebar}
              title="Home"
              icon={<IconHome size={24} />}
            />
            <SidebarLink
              to="clientes"
              showSidebar={showSidebar}
              title="Clientes"
              icon={<IconUsers size={24} />}
            />
            {/* <SidebarLink to="consultas" showSidebar={showSidebar} title="Consultas" icon={<IconFile size={24} />} /> */}
            <SidebarLink
              to="files"
              showSidebar={showSidebar}
              title="Subir Documentos"
              icon={<IconFileUpload size={24} />}
            />
            <SidebarLink
              to="files-validations"
              showSidebar={showSidebar}
              title="Validación de Documentos"
              icon={<IconFileLike size={24} />}
            />
            <SidebarLink
              to="rfc"
              showSidebar={showSidebar}
              title="Generar RFC"
              icon={<IconReport size={24} />}
            />
            {/* <SidebarLink to="funnel" showSidebar={showSidebar} title="Funnel" icon={<IconChartBar size={24} />} /> */}
            <SidebarLink
              to="prospectos"
              showSidebar={showSidebar}
              title="Prospectos"
              icon={<IconUserBolt size={24} />}
            />
            <SidebarLink
              to="users"
              showSidebar={showSidebar}
              title="Usuarios"
              icon={<IconUsersGroup size={24} />}
            />
            <SidebarLink
              to="citas"
              showSidebar={showSidebar}
              title="Citas"
              icon={<IconCalendarEvent size={24} />}
            />
          </ul>
        </div>
      </aside>
      <main
        className={`${
          showSidebar
            ? "w-[calc(100%-15rem)] left-[15rem]"
            : "w-[calc(100%-5rem)] left-[5rem]"
        } transition-all top-0 left-sidebar absolute overflow-x-hidden min-h-screen`}
      >
        <nav className="border-b border-gray-200 bg-white dark:bg-slate-800 dark:border-slate-700">
          <div className="flex p-5">
            <button
              className={`${showSidebar ? "hidden" : "block"}`}
              onClick={handleSidebar}
            >
              <IconLayoutSidebarLeftExpand size={24} stroke={1.5} />
            </button>
            <div className="ml-auto flex items-center">
              <div className="w-0.5 bg-gray-200 dark:bg-slate-700 mx-3 h-full"></div>
              <ProfileNavButton />
            </div>
          </div>
        </nav>
        <div className="p-5 grid grid-cols-12 gap-3">{children}</div>
      </main>
    </>
  );
};
