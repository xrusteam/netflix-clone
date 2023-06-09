import { signOut } from 'next-auth/react';
import React from 'react';
import Image from 'next/image';
import useCurrentUser from '@/hooks/useCurrentUser';

interface AccountMenuProps {
  visible?: boolean;
}

const AccountMenu: React.FC<AccountMenuProps> = ({
  visible,
}) => {
  const { data } = useCurrentUser();
  if (!visible) {
    return null;
  }
  return (
    <div className="bg-black w-56 absolute top-14 right-0 py-4 flex flex-col border-2 border-gray-800">
      <div className="flex flex-col gap-3">
        <div className="px-3 group/item flex flex-row gap-3 items-center w-full">
          <Image
            className="rounded-md"
            src="/images/default-green.png"
            alt="default-avatar"
            width={30}
            height={30}
          />
          <p className="text-white text-sm group-hover/item:underline">
            {data?.name}
          </p>
        </div>
        <hr className="bg-gray-600 border-0 h-px mt-4" />
        <div
          onClick={() => signOut()}
          className="px-3 text-center text-white text-sm hover:underline"
        >
          SignOut of Netflix
        </div>
      </div>
    </div>
  );
};

export default AccountMenu;
