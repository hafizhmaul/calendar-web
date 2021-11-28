import { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { send } from 'emailjs-com';

export default function InputModalEmail({ openModalEmail, handleCloseModalEmail, dataSelectedDate }) {
  const [userEmail, setUserEmail] = useState("");

  // send schedule to the email
  const handleSendEmail = (event) => {
    event.preventDefault();

    const templateParams = {
      from_name: "Hafizh",
      to_name: dataSelectedDate.name,
      to_email: userEmail,
      message: `You have a schedule on the ${dataSelectedDate.date} from ${dataSelectedDate.startTime} to ${dataSelectedDate.endTime}. Please kindly check here if you want to see the details.`
    };

    send(
      `${process.env.REACT_APP_SERVICEID_EMAILJS}`,
      `${process.env.REACT_APP_TEMPLATEID_EMAILJS}`,
      templateParams,
      `${process.env.REACT_APP_USERID_EMAILJS}`
    )
      .then(() => {
        alert("Success! Email has been send, check your email")
      })
      .catch((err) => {
        console.log('FAILED...', err);
      });

      setUserEmail("");
      handleCloseModalEmail();
  }

  return (
    <>
      <Transition appear show={openModalEmail} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={handleCloseModalEmail}
        >
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="inline-block border border-gray-400 w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                <Dialog.Title
                  as="h3"
                  className="block text-lg text-center font-medium leading-6 text-gray-900"
                >
                  <span className="text-blue-500 font-bold">Send this schedule to your Email</span>
                </Dialog.Title>
                <div className="max-w-lg mx-auto">
                  <form onSubmit={handleSendEmail}>
                    <div className="mt-4">
                      <label htmlFor="endTime" className="text-sm font-medium text-gray-900 block mb-2">Your Email</label>
                      <input defaultValue={userEmail} onChange={(e) => setUserEmail(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" type="text" id="youremail" name="youremail" required />
                    </div>
                    <div className="flex justify-end mt-4">
                      <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ml-3">Send to Email</button>
                    </div>
                  </form>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}
