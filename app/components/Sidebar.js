import { useRouter } from "next/navigation";
import { SidebarItem } from "@/components/SidebarBase";
import Sidebar from "@/components/SidebarBase";
import {
  MessageCircleQuestion,
  UserCircle,
  BarChart3,
  LayoutDashboard,
  Settings,
} from "lucide-react";

export default function SidebarDashboard() {
  const router = useRouter();
  return (
    <>
      <Sidebar>
        <div className="mt-4">
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
            icon={<UserCircle size={20} style={{ color: "black" }} />}
            text={<span style={{ color: "black" }}>Users</span>}
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
          />
        </div>
      </Sidebar>
    </>
  );
}
