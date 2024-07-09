import { Sidebar } from "./sidebar.styles";
import { HomeIcon } from "../icons/sidebar/home-icon";
import { PaymentsIcon } from "../icons/sidebar/payments-icon";
import { SidebarItem } from "./sidebar-item";
import { SidebarMenu } from "./sidebar-menu";
import { useSidebarContext } from "../layout/layout-context";
import { usePathname } from "next/navigation";

export const SidebarWrapper = () => {
  const pathname = usePathname();
  const { collapsed, setCollapsed } = useSidebarContext();

  return (
    <aside className="h-screen z-[20] sticky top-0">
      {collapsed ? (
        <div className={Sidebar.Overlay()} onClick={setCollapsed} />
      ) : null}
      <div
        className={Sidebar({
          collapsed: collapsed,
        })}
      >
        <div className={Sidebar.Header()}>
            <h2 className="text-xl font-semibold">Expenses M.</h2>
        </div>
        <div className="flex flex-col justify-between h-full">
          <div className={Sidebar.Body()}>
            <SidebarItem
              title="Home"
              icon={<HomeIcon />}
              isActive={pathname === "/"}
              href="/"
            />
            <SidebarMenu title="Menu">
              <SidebarItem
                isActive={pathname === "/expenses"}
                title="Expenses"
                icon={<PaymentsIcon />}
                href="expenses"
              />
              <SidebarItem
                isActive={pathname === "/statistics"}
                title="Statistics"
                icon={<PaymentsIcon />}
                href="statistics"
              />
            </SidebarMenu>
          </div>
        </div>
      </div>
    </aside>
  );
};
