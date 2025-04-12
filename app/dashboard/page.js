"use client";

import { SidebarItem } from './components/Sidebar'
import Sidebar from './components/Sidebar'
import {
  MessageCircleQuestion,
  Receipt,
  Boxes,
  Package,
  UserCircle,
  BarChart3,
  LayoutDashboard,
  Settings,
} from "lucide-react"

export default function App() {
  return (
    <main className="App">
      <Sidebar>
      <div className="mt-4">
      <SidebarItem
        icon={<LayoutDashboard size={20} style={{color:"black"}}/>}
        text={<span style={{ color: "black" }}>Dashboard</span>}       
        />
        <SidebarItem icon={<BarChart3 size={20} style={{color:"black"}}/>} text={<span style={{ color: "black" }}>Statistics</span>}/>
        <SidebarItem icon={<UserCircle size={20} style={{color:"black"}}/>} text={<span style={{ color: "black" }}>Users</span>}/>
        <SidebarItem icon={<Boxes size={20} style={{color:"black"}}/>} text={<span style={{ color: "black" }}>Inventory</span>}/>
        <SidebarItem icon={<Package size={20} style={{color:"black"}}/>} text={<span style={{ color: "black" }}>Orders</span>}/>
        <SidebarItem icon={<Receipt size={20} style={{color:"black"}}/>} text={<span style={{ color: "black" }}>Billings</span>}/>
        <hr className="my-3" />
        <SidebarItem icon={<Settings size={20} style={{color:"black"}}/>} text={<span style={{ color: "black" }}>Settings</span>}/>
        <SidebarItem icon={<MessageCircleQuestion size={20} style={{color:"black"}}/>} text={<span style={{ color: "black" }}>Help</span>}/>
        </div>
      </Sidebar>
    </main>
  )
}
