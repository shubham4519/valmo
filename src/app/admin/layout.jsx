import Image from "next/image"
import Link from "next/link"
import {
    Home,
    LineChart,
    Package,
    Package2,
    PanelLeft,
    Search,
    Settings,
    ShoppingCart,
    Users2,
} from "lucide-react"
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

import {
    TooltipProvider,
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip"

export default function Layout({ children }) {
    return (
        <TooltipProvider>
            <div className="flex min-h-screen w-full flex-col bg-muted/40">
                {/* nav bar visible on big screen */}
                <SideNavigation />

                <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
                    <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background sm:static px-4 sm:h-auto sm:pb-4 sm:border-b-[2.2px] sm:bg-transparent sm:px-6">
                        {/* Navigation on small screen with hamburger */}
                        {/* <HamNav/> */}
                        <Breadcrumb className="hidden md:flex">
                            <BreadcrumbList>
                                <BreadcrumbItem>
                                    <BreadcrumbLink asChild>
                                        <Link href="#">Dashboard</Link>
                                    </BreadcrumbLink>
                                </BreadcrumbItem>
                                <BreadcrumbSeparator />
                                <BreadcrumbItem>
                                    <BreadcrumbLink asChild>
                                        <Link href="#">Users</Link>
                                    </BreadcrumbLink>
                                </BreadcrumbItem>
                            </BreadcrumbList>
                        </Breadcrumb>
                        <div className="relative ml-auto flex-1 md:grow-0">
                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                                type="search"
                                placeholder="Search..."
                                className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
                            />
                        </div>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button
                                    variant="outline"
                                    size="icon"
                                    className="overflow-hidden rounded-full"
                                >
                                    <Image
                                        src="/placeholder-user.jpg"
                                        width={36}
                                        height={36}
                                        alt="Avatar"
                                        className="overflow-hidden rounded-full"
                                    />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>Settings</DropdownMenuItem>
                                <DropdownMenuItem>Support</DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>Logout</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </header>
                    <main className="p-2 md:p-4 md:px-8">
                        {children}
                    </main>
                </div>
            </div>
        </TooltipProvider>
    )
}

function SideNavigation() {
    return (
        <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
            <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
                <Link
                    href="#"
                    className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
                >
                    <Package2 className="h-4 w-4 transition-all group-hover:scale-110" />
                    <span className="sr-only">Volmo Inc</span>
                </Link>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Link
                            href="#"
                            className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                        >
                            <Home className="h-5 w-5" />
                            <span className="sr-only">Dashboard</span>
                        </Link>
                    </TooltipTrigger>
                    <TooltipContent side="right">Dashboard</TooltipContent>
                </Tooltip>

            </nav>
            <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Link
                            href="#"
                            className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                        >
                            <Settings className="h-5 w-5" />
                            <span className="sr-only">Settings</span>
                        </Link>
                    </TooltipTrigger>
                    <TooltipContent side="right">Settings</TooltipContent>
                </Tooltip>
            </nav>
        </aside>
    )
}

// function HamNav() {
//     return (
//         <Sheet>
//             <SheetTrigger asChild>
//                 <Button size="icon" variant="outline" className="sm:hidden">
//                     <PanelLeft className="h-5 w-5" />
//                     <span className="sr-only">Toggle Menu</span>
//                 </Button>
//             </SheetTrigger>
//             <SheetContent side="left" className="sm:max-w-xs">
//                 <nav className="grid gap-6 text-lg font-medium">
//                     <Link
//                         href="#"
//                         className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base"
//                     >
//                         <Package2 className="h-5 w-5 transition-all group-hover:scale-110" />
//                         <span className="sr-only">Acme Inc</span>
//                     </Link>
//                     <Link
//                         href="#"
//                         className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
//                     >
//                         <Home className="h-5 w-5" />
//                         Dashboard
//                     </Link>
//                     <Link
//                         href="#"
//                         className="flex items-center gap-4 px-2.5 text-foreground"
//                     >
//                         <ShoppingCart className="h-5 w-5" />
//                         Orders
//                     </Link>
//                     <Link
//                         href="#"
//                         className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
//                     >
//                         <Package className="h-5 w-5" />
//                         Products
//                     </Link>
//                     <Link
//                         href="#"
//                         className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
//                     >
//                         <Users2 className="h-5 w-5" />
//                         Customers
//                     </Link>
//                     <Link
//                         href="#"
//                         className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
//                     >
//                         <LineChart className="h-5 w-5" />
//                         Settings
//                     </Link>
//                 </nav>
//             </SheetContent>
//         </Sheet>
//     )
// }

