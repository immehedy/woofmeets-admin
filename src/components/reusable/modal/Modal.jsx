import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { BsXLg } from "react-icons/bs";
import cn from "classnames";

export default function Modal({
  children,
  isOpen,
  onClose,
  title,
  showCloseButton,
  width,
  isMbFullScreen,
  noPadding = false,
  padding,
}) {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className={`relative z-[1000]`} onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-60" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-auto">
          <div
            className={cn(
              "flex min-h-full items-center overflow-auto justify-center text-center p-4 sm:p-4",
              {
                "p-0": isMbFullScreen,
              }
            )}
          >
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel
                className={cn(
                  "w-full transform overflow-auto rounded-xl sm:rounded-xl bg-white text-left align-middle shadow-xl transition-all sm:h-auto",
                  {
                    "h-screen rounded-none w-full": isMbFullScreen,
                    "space-y-8": !!title,
                  },
                  noPadding ? "p-0" : padding ? padding : "p-8"
                )}
                style={{ maxWidth: width ? `${width}` : "540px" }}
              >
                <div className="flex items-center">
                  {title && (
                    <Dialog.Title
                      as="h3"
                      className="text-2xl font-semibold leading-6 text-dark flex-1"
                    >
                      {title}
                    </Dialog.Title>
                  )}
                  {showCloseButton && (
                    <button onClick={onClose}>
                      <BsXLg className="text-xl text-gray-400" />
                    </button>
                  )}
                </div>
                {children}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
