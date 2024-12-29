"use client";

import { useState } from "react";
import { Link } from "react-router";
import { Laptop, Menu, SquareChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const navItems = [{ name: "Home", href: "/" }];

export function NavigationMenu() {
  const [isOpen, setIsOpen] = useState(false);
  //const pathname = usePathname()
  const pathname = "";

  return (
    <header className="sticky top-0 z-50 w-full border-b mb-4">
      <div className="flex h-14 items-center p-4">
        <div className="mr-4 hidden md:flex">
          <Link to={"/"} className="mr-6 flex items-center space-x-2">
            <SquareChevronRight className="h-6 w-6" />
            <span className="hidden font-bold sm:inline-block">Codeteca</span>
          </Link>

          <nav className="flex items-center space-x-6 text-sm font-medium">
            {navItems.map((item) => (
              <Link
                key={item.href}
                to={{ pathname: item.href }}
                className={`transition-colors hover:text-foreground/80 ${
                  pathname === item.href
                    ? "text-foreground"
                    : "text-foreground/60"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>

        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="pr-0">
            <Link
              to="/"
              className="flex items-center"
              onClick={() => setIsOpen(false)}
            >
              <Laptop className="mr-2 h-4 w-4" />
              <span className="font-bold">MyApp</span>
            </Link>
            <nav className="mt-4 flex flex-col space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  className={`block px-2 py-1 text-lg ${
                    pathname === item.href
                      ? "text-foreground"
                      : "text-foreground/60"
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </SheetContent>
        </Sheet>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            {/* You can add a search input here if needed */}
          </div>
          <nav className="flex items-center">
            <Avatar>
              <AvatarImage src="/placeholder-avatar.jpg" alt="User" />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
          </nav>
        </div>
      </div>
    </header>
  );
}
