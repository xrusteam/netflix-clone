import Image from 'next/image';
import {
  BsChevronDown,
  BsSearch,
  BsBell,
} from 'react-icons/bs';
import NavbarItem from './NavbarItem';
import MobileMenu from './MobileMenu';
import {
  useCallback,
  useEffect,
  useState,
} from 'react';
import AccountMenu from './AccountMenu';

const Navbar = () => {
  const TOP_OFFSET = 66;
  const [showMobileMenu, setShowMobileMenu] =
    useState(false);
  const [showAccountMenu, setShowAccountMenu] =
    useState(false);
  const [showBackground, setShowBackground] =
    useState(false);

  const toggleMobileMenu = useCallback(() => {
    setShowMobileMenu((current) => !current);
  }, []);
  const toggleAccountMenu = useCallback(() => {
    setShowAccountMenu((current) => !current);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= TOP_OFFSET) {
        setShowBackground(true);
      } else {
        setShowBackground(false);
      }
    };

    window.addEventListener(
      'scroll',
      handleScroll
    );

    return () => {
      window.removeEventListener(
        'scroll',
        handleScroll
      );
    };
  }, []);

  return (
    <nav className="w-full fixed z-40">
      <div
        className={`px-4 md:px-16 py-6 flex items-center transition duration-500 ${
          showBackground
            ? 'bg-zinc-900 bg-opacity-90'
            : ''
        }`}
      >
        <Image
          src="/images/logo.png"
          alt="logo"
          width={100}
          height={100}
        />
        <div className="lg:flex flex-row gap-7 hidden ml-8">
          <NavbarItem label="Home" />
          <NavbarItem label="Series" />
          <NavbarItem label="Films" />
          <NavbarItem label="New & Popular" />
          <NavbarItem label="My List" />
          <NavbarItem label="Browse by Languages" />
        </div>
        <div
          onClick={toggleMobileMenu}
          className="lg:hidden flex items-center flex-row gap-2 ml-8 cursor-pointer relative"
        >
          <p className="text-white text-sm">
            Browse
          </p>
          <BsChevronDown
            className={`text-white transition ${
              showMobileMenu
                ? 'rotate-180'
                : 'rotate-0'
            }`}
          />
          <MobileMenu visible={showMobileMenu} />
        </div>
        <div className="ml-auto flex flex-row  gap-7 items-center">
          <div className="text-gray-200 hover:text-gray-300 cursor-pointer">
            <BsSearch />
          </div>
          <div className="text-gray-200 hover:text-gray-300 cursor-pointer">
            <BsBell />
          </div>
          <div
            onClick={toggleAccountMenu}
            className="flex flex-row items-center gap-2 cursor-pointer relative"
          >
            <div className="h-6 w-6 lg:h-10 lg:w-10 rounded-md overflow-hidden">
              <Image
                src="/images/default-green.png"
                alt="default-avatar"
                width={100}
                height={100}
              />
            </div>
            <BsChevronDown
              className={`text-white transition ${
                showAccountMenu
                  ? 'rotate-180'
                  : 'rotate-0'
              }`}
            />
            <AccountMenu
              visible={showAccountMenu}
            />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
