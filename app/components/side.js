"use client";
import { useState } from "react";
import { 
  Home, 
  User, 
  Settings, 
  Mail, 
  ChevronDown, 
  ChevronRight,
  Menu as MenuIcon,
  X
} from "lucide-react";

export function Side() {
  const [open, setOpen] = useState(false);
  const [expandedItems, setExpandedItems] = useState({
    settings: false,
    messages: false
  });

  const toggleItem = (item) => {
    setExpandedItems(prev => ({
      ...prev,
      [item]: !prev[item]
    }));
  };

  const SidebarContent = ({ closeSidebar }) => {
    return (
      <>
        <div className="p-4 border-b border-gray-700">
          <h1 className="text-xl font-bold text-white">MiApp</h1>
        </div>

        <nav className="flex-1 overflow-y-auto p-3">
          <ul className="space-y-1">
            <li>
              <button
                onClick={closeSidebar}
                className="flex items-center w-full p-3 rounded-lg hover:bg-gray-800 text-gray-300 transition-colors"
              >
                <Home className="w-5 h-5 mr-3" />
                <span>Inicio</span>
              </button>
            </li>
            
            <li>
              <button
                onClick={closeSidebar}
                className="flex items-center w-full p-3 rounded-lg hover:bg-gray-800 text-gray-300 transition-colors"
              >
                <User className="w-5 h-5 mr-3" />
                <span>Perfil</span>
              </button>
            </li>
            
            <li>
              <button 
                onClick={() => toggleItem('settings')}
                className="flex items-center justify-between w-full p-3 rounded-lg hover:bg-gray-800 text-gray-300 transition-colors"
              >
                <div className="flex items-center">
                  <Settings className="w-5 h-5 mr-3" />
                  <span>Configuración</span>
                </div>
                {expandedItems.settings ? 
                  <ChevronDown className="w-4 h-4" /> : 
                  <ChevronRight className="w-4 h-4" />
                }
              </button>
              
              {expandedItems.settings && (
                <ul className="ml-8 mt-1 space-y-1">
                  <li>
                    <button 
                      onClick={closeSidebar}
                      className="flex items-center w-full p-2 text-sm rounded-lg hover:bg-gray-800 text-gray-400 transition-colors"
                    >
                      Preferencias
                    </button>
                  </li>
                  <li>
                    <button 
                      onClick={closeSidebar}
                      className="flex items-center w-full p-2 text-sm rounded-lg hover:bg-gray-800 text-gray-400 transition-colors"
                    >
                      Seguridad
                    </button>
                  </li>
                </ul>
              )}
            </li>
          </ul>
        </nav>
      </>
    );
  };

  return (
    <>
      {/* Mobile sidebar trigger */}
      <button 
        onClick={() => setOpen(true)}
        className="md:hidden fixed top-4 left-4 z-50 bg-gray-800 p-2 rounded-lg text-white"
      >
        <MenuIcon className="h-5 w-5" />
      </button>

      {/* Mobile sidebar overlay */}
      {open && (
        <div 
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Mobile sidebar */}
      <aside 
        className={`fixed z-50 h-screen w-64 bg-gray-900 border-r border-gray-800 transition-transform duration-300 ${
          open ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0`}
      >
        <div className="p-4 border-b border-gray-800 flex justify-between items-center">
          <h1 className="text-xl font-bold text-white">MiApp</h1>
          <button 
            onClick={() => setOpen(false)}
            className="md:hidden text-gray-400 hover:text-white"
          >
            <X />
          </button>
        </div>
        
        <SidebarContent closeSidebar={() => setOpen(false)} />
      </aside>
    </>
  );
}