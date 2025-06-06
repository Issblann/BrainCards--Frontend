import { ReactNode, useEffect } from "react";

interface ToastProps {
  children: ReactNode;
  open: boolean;
  setOpen: (open: boolean) => void;
}
export const Toast = ({children, open, setOpen}:ToastProps) => {
  let timer: NodeJS.Timeout | null = null;

  timer = setTimeout(() => {
    setOpen(false);
  }, 5000);

  const closeToast = () => {
    setOpen(false);
  };

  useEffect(() => {
    return () => clearTimeout(timer);
  }, []);
  return (
    <button
    type="button"
    onClick={closeToast}
    className={`fixed right-4 top-4 z-50 rounded-md bg-green-500 px-4 py-2 text-white transition hover:bg-green-600 ${open ? 'block' : 'hidden'}`}
  >
    <div className="flex items-center space-x-2">
      <span className="text-3xl">
        <i className="bx bx-check"></i>
      </span>
      <p className="font-bold">{children || "Item Created Successfully!"}</p>
    </div>
  </button>   
  );
}
