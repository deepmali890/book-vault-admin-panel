import {
    LayoutDashboard,
    ListOrdered,
    ListTree,
    BookOpen,
    FileText,
    NotebookPen,
    Image,
    ShoppingCart,
    Users,
    MessagesSquare,
    BookMarked,
    ShieldCheck,
    Settings,
    HelpCircle,
    MessageCircle,
    Bell,
    Menu
} from 'lucide-react'

import { useLocation, Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Button } from './ui/button'

const Sidebar = () => {
    const ICONS = {
        LayoutDashboard,
        ListOrdered,
        ListTree,
        BookOpen,
        FileText,
        NotebookPen,
        Image,
        ShoppingCart,
        Users,
        MessagesSquare,
        BookMarked,
        ShieldCheck,
        Settings,
        HelpCircle,
        MessageCircle,
        Bell
    }

    const [sideBarOpen, setSideBarOpen] = useState(true)
    const [sidebarItem, setSidebarItem] = useState([])
    const location = useLocation()

    useEffect(() => {
        fetch("/data/data.json")
            .then((res) => res.json())
            .then((data) => {
                setSidebarItem(data.setSidebarItem);
            })
            .catch((err) => console.error("Error fetching data:", err));
    }, []);

    return (
        <div className={`relative z-10 transition-all duration-300 ease-in-out flex-shrink-0 ${sideBarOpen ? "w-64" : "w-20"}`}>
            <div className='h-full overflow-y-auto bg-white/5 backdrop-blur-3xl flex sidebar-scrollbar flex-col border-r border-gray-700'>
                <Button
                    onClick={() => setSideBarOpen(!sideBarOpen)}
                    className="m-2 rounded-full transition-colors max-w-fit cursor-pointer"
                >
                    <Menu size={24} />
                </Button>

                <nav className='mt-8 flex-grow'>
                    {sidebarItem.map((item,) => {
                        const IconComponent = ICONS[item.icon]
                        return (
                            <Link to={item.href} key={item.name}>
                                <div
                                    className={`flex items-center p-4 text-sm font-medium rounded-lg transition-colors mb-2 ${location.pathname === item.href ? 'bg-gray-800 text-white' : 'text-gray-400 hover:bg-gray-700'}`}
                                >
                                    <IconComponent size={20} style={{ minWidth: "20px" }} />
                                    {sideBarOpen && <span className='ml-3 text-white'>{item.name}</span>}
                                </div>
                            </Link>
                        )
                    })}
                </nav>
            </div>
        </div>
    )
}

export default Sidebar
