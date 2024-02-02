import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable"
import { Separator } from "@/components/ui/separator"
import { TooltipProvider } from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"
import { ReactNode, useState } from "react"
import { Nav } from "../components/nav"
import { BadgePercent, Boxes, CalendarDays, FileSpreadsheet, Gauge, Gift, ReceiptText, Rss, ShoppingCart, Store, UserSearch, Users2 } from "lucide-react"
import { AccountSwitcher } from "../components/sucursal-switcher"
import { UserNav } from "../components/user-nav"
import { useLocation } from "react-router-dom"

interface DashboardProps {
  sucursales: {
    id: string
    label: string
  }[]
  defaultLayout: number[] | undefined
  defaultCollapsed?: boolean
  navCollapsedSize: number
  children: ReactNode
}

export const DashboardLayout = ({
  sucursales,
  defaultLayout = [265, 1095],
  defaultCollapsed = false,
  children
}: DashboardProps) => {
  const location = useLocation();

  const [isCollapsed, setIsCollapsed] = useState(defaultCollapsed);


  return (

    <TooltipProvider delayDuration={0}>
      <ResizablePanelGroup
        direction="horizontal"
        onLayout={(sizes: number[]) => {
          localStorage.setItem('react-resizable-panels:layout', JSON.stringify(sizes));
        }}
        className="h-full items-stretch"
      >
        <ResizablePanel
          defaultSize={defaultLayout[0]}
          minSize={15}
          maxSize={20}
          className={cn(isCollapsed && "min-w-[50px] transition-all duration-300 ease-in-out")}
          collapsible={true}
          onCollapse={() => {
            setIsCollapsed(true)
            localStorage.setItem('react-resizable-panels:collapsed', JSON.stringify(false));
          }}
          onExpand={() => {
            setIsCollapsed(false)
            localStorage.setItem('react-resizable-panels:collapsed', JSON.stringify(true));
          }}
        >
          <div className={cn("flex h-[52px] items-center justify-center", isCollapsed ? 'h-[52px]' : 'px-2')}>
            <AccountSwitcher isCollapsed={isCollapsed} sucursales={sucursales} />
          </div>
          <Separator />
          <Nav
            isCollapsed={isCollapsed}
            links={[
              {
                title: "Inicio",
                label: "128",
                icon: Gauge,
                variant: location.pathname == '/home' ? 'default' : 'ghost',
                uri: 'home'
              },
              {
                title: "Tickets",
                label: "",
                icon: ReceiptText,
                variant: "ghost",
              },
              {
                title: "Agenda",
                label: "9",
                icon: CalendarDays,
                variant: "ghost",
              },
              {
                title: "Clientes",
                label: "",
                icon: UserSearch,
                variant: location.pathname.startsWith('/clients') ? 'default' : 'ghost',
                uri: 'clients'
              },
              {
                title: "Marketing",
                label: "23",
                icon: Rss,
                variant: "ghost",
              },
              {
                title: "Gift Cards",
                label: "",
                icon: Gift,
                variant: "ghost",
              },
            ]}
          />
          <Separator />
          <Nav
            isCollapsed={isCollapsed}
            links={[
              {
                title: "Sucursales",
                label: "",
                icon: Store,
                variant: location.pathname.startsWith('/branches') ? 'default' : 'ghost',
                uri: 'branches'
              },
              {
                title: "Usuarios",
                label: "",
                icon: Users2,
                variant: location.pathname.startsWith('/users') ? 'default' : 'ghost',
                uri: 'users'
              },
              {
                title: "Productos",
                label: "",
                icon: ShoppingCart,
                variant: "ghost",
              },
              {
                title: "Inventario",
                label: "128",
                icon: Boxes,
                variant: "ghost",
              },
              {
                title: "Promociones",
                label: "",
                icon: BadgePercent,
                variant: "ghost",
              },
              {
                title: "Reportes",
                label: "",
                icon: FileSpreadsheet,
                variant: "ghost",
              },
            ]}
          />

        </ResizablePanel>
        <ResizableHandle withHandle />

        <ResizablePanel minSize={30} defaultSize={defaultLayout[1]}>
          <div className="flex items-center px-4 py-2 h-[52px]">
            <h1 className="text-xl font-bold">
              Page Title
            </h1>
            <div className="ml-auto">
              <UserNav />
            </div>
          </div>
          <Separator />
          <div className="bg-background/95 p-4 backdrop-blur supports-[backdrop-filter]:bg-background/60 h-[95%] overflow-y-auto">
            {children}
          </div>
        </ResizablePanel>

      </ResizablePanelGroup>

    </TooltipProvider>
  )
}
