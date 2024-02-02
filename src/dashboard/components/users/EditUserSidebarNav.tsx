import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { NavLink, useLocation } from "react-router-dom";

interface SidebarNavProps extends React.HTMLAttributes<HTMLElement> {
    items: {
        href: string
        title: string
    }[]
}

export function EditUserSidebarNav({ className, items, ...props }: SidebarNavProps) {

    const location = useLocation();
    const pathname = location.pathname;
    console.log(pathname)
    return (
        <nav
            className={cn(
                "flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1",
                className
            )}
            {...props}
        >
            {items.map((item) => (
                <NavLink
                    key={item.href}
                    to={item.href}
                    className={cn(
                        buttonVariants({ variant: "ghost" }),
                        pathname == item.href
                            ? "bg-neutral-950 text-white hover:text-white hover:bg-neutral-950"
                            : "hover:bg-transparent hover:underline",
                        "justify-start"
                    )}
                >
                    {item.title}
                </NavLink>
            ))}
        </nav>
    )
}