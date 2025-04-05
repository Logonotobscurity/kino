import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

interface MainNavItem {
  title: string;
  href: string;
}

interface MainNavProps {
  items?: MainNavItem[];
}

export function MainNav({ items }: MainNavProps) {
  const pathname = usePathname();
  const segment = pathname?.split("/")[1] || "";

  return (
    <div className="flex gap-6 md:gap-10">
      <Link href="/" className="flex items-center space-x-2">
        <span className="font-bold inline-block text-xl md:text-2xl">Kinkoasis</span>
      </Link>
      {items?.length ? (
        <nav className="flex gap-6">
          {items?.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              className={cn(
                "flex items-center font-medium transition-colors hover:text-primary",
                item.href.startsWith(`/${segment}`) 
                  ? "text-primary" 
                  : "text-muted-foreground"
              )}
            >
              {item.title}
            </Link>
          ))}
          <Link
            href="/community"
            className={cn(
              "flex items-center font-medium transition-colors hover:text-primary",
              segment === "community" 
                ? "text-primary" 
                : "text-muted-foreground"
            )}
          >
            Community
          </Link>
        </nav>
      ) : null}
    </div>
  )
} 