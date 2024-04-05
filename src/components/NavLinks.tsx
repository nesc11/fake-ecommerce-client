import { NavLink } from "react-router-dom";
import { links } from "@/utils";
import { useAppSelector } from "@/app/hooks";

export default function NavLinks() {
  const { user } = useAppSelector((state) => state.user);
  return (
    <div className="hidden lg:flex justify-center items-center gap-x-4">
      {links.map((link) => {
        if (!user && (link.href === "checkout" || link.href === "orders"))
          return null;
        return (
          <NavLink
            to={link.href}
            key={link.label}
            className={({ isActive }) =>
              `capitalize font-light tracking-wide ${isActive ? "text-primary" : ""}`
            }
          >
            {link.label}
          </NavLink>
        );
      })}
    </div>
  );
}
