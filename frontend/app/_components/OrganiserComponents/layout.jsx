import MobileNav from "./MobileNav";
import LeftSidebar from "./LeftSidebar";

export default function OrganiserLayout({ children }) {
  const loggedIn = { firstName: "Nabeel", lastName: "Rahman" };
  return (
    <main className="flex h-screen w-full font-inter">
      <LeftSidebar user={loggedIn} />

      <div className="flex size-full flex-col">
        <div className="flex h-16 items-center justify-between p-5 shadow-creditCard sm:p-8 md:hidden">
          

          <div>
            <MobileNav user={loggedIn} />
          </div>
        </div>

        {children}
      </div>
    </main>
  );
}
