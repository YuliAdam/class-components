import { Outlet } from 'react-router-dom';
import { Suspense } from 'react';
import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';
import Loading from '../components/loading/Loading';

export const Layout = () => {
  return (
    <>
      <Header />
      <main>
        <Suspense fallback={<Loading />}>
          <Outlet />
        </Suspense>
      </main>
      <Footer />
    </>
  );
};
