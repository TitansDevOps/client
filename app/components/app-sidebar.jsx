import * as React from "react"
import { Dog } from "lucide-react"
import { NavMain } from "@/app/components/nav-main"
//import { SidebarOptInForm } from "@/app/components/sidebar-opt-in-form"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarFullScreenToggle
} from "@/app/components/ui/sidebar"

// This is sample data.
const data = {
  navMain: [
    {
      title: "Inicio",
      url: "#"
    },
    {
      title: "¿Quienes somos?",
      url: "#"
    },
    {
      title: "Mascotas en adopcion",
      url: "#"
    },
    {
      title: "Contacto",
      url: "#",
      items: [
        {
          title: "Whatsapp",
          url: "#"
        },
        {
          title: "Instagram",
          url: "#"
        }
      ],
    },
  ],
}

export function AppSidebar({
  ...props
}) {
  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="#">
                <div>
                </div>
                <div
                  className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <Dog className="size-9" />
                </div>
                <div>
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-semibold">Menu</span>
                  <span className="">Titan Devs</span>
                </div>
                <div>
                </div>
                <div>
                </div>
                <div>
                </div>
                <div>
                </div>
                <div>
                </div>
                <div>
                  <SidebarFullScreenToggle className="size-12" />
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <div className="p-1">
        </div>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
