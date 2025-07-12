import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

export default function Layout() {
  return (
    <>
      <Navbar />
      <main className="p-4 max-w-3xl mx-auto">
        <Outlet />
      </main>
    </>
  );
}
