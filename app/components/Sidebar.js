import { useRouter } from "next/navigation";
import { useAuth } from "@/app/context/AuthContext";
import { motion } from "framer-motion";
import { useState } from "react";

import { SidebarItem } from "@/components/SidebarBase";
import Sidebar from "@/components/SidebarBase";
import {
  MessageCircleQuestion,
  UserCircle,
  BarChart3,
  LayoutDashboard,
  Settings,
  LogOut,
  Cat,
} from "lucide-react";

export default function SidebarDashboard({ isOpenSidebar }) {
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const router = useRouter();

  const isOpen = (expanded) => {
    isOpenSidebar(expanded);
  };

  const { logout } = useAuth();

  const handleLogout = async () => {
    setIsLoggingOut(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    logout();
  };

  return (
    <div
      className={`h-full ${isOpenSidebar ? "w-64" : "w-16"} transition-all duration-300 fixed`}
    >
      <Sidebar isOpen={isOpen}>
        <div className="mt-4">
          <motion.div
            animate={{ opacity: isLoggingOut ? 0 : 1 }}
            transition={{ duration: 0.5 }}
          >
            <SidebarItem
              icon={<LayoutDashboard size={20} style={{ color: "black" }} />}
              text={<span style={{ color: "black" }}>Dashboard</span>}
              onClick={() => router.push("/dashboard")}
            />
            <SidebarItem
              icon={<BarChart3 size={20} style={{ color: "black" }} />}
              onClick={() => router.push("/adoption-centers")}
              text={<span style={{ color: "black" }}>Centros de Adopción</span>}
            />
            <SidebarItem
              icon={<Cat size={20} style={{ color: "black" }} />}
              onClick={() => router.push("/pets")}
              text={<span style={{ color: "black" }}>Mascotas</span>}
            />
            <SidebarItem
              icon={<UserCircle size={20} style={{ color: "black" }} />}
              text={<span style={{ color: "black" }}>Users</span>}
              onClick={() => router.push("/users")}
            />
            <hr className="my-3" />
            <SidebarItem
              icon={<Settings size={20} style={{ color: "black" }} />}
              text={<span style={{ color: "black" }}>Settings</span>}
            />
            <SidebarItem
              icon={
                <MessageCircleQuestion size={20} style={{ color: "black" }} />
              }
              text={<span style={{ color: "black" }}>Help</span>}
              onClick={() => router.push("/help")}
            />
            <SidebarItem
              icon={<LogOut size={20} style={{ color: "black" }} />}
              text={<span style={{ color: "black" }}>Cerrar sesión</span>}
              onClick={handleLogout}
            />
          </motion.div>
        </div>
      </Sidebar>
    </div>
  );
}
