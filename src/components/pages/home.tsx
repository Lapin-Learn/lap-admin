import SideBar from "../organisms/side-bar";

export default function HomePage() {
  return (
    <div className="flex h-full">
      <div className="sticky left-0 top-0 z-10 flex h-dvh bg-white">
        <SideBar />
      </div>

      <main className="flex flex-1 flex-col overflow-hidden">
        {/* <NavBar />
        <div className="flex flex-1 bg-default ">
          <Outlet />
        </div> */}
      </main>
    </div>
  );
}
