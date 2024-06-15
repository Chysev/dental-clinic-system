import { ReactNode } from "react";

const AuthLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex w-screen h-screen items-center 640min:px-3 justify-center">
      <form className="640min:max-w-[390px] w-full">
        <div className="flex flex-col 640min:shadow-md shadow-slate-700 px-5 py-5 640min:rounded-[16px] items-center">
          {children}
        </div>
      </form>
    </div>
  );
};

export default AuthLayout;
