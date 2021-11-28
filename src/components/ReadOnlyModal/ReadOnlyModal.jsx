import { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { EditableModal, InputModalEmail } from '..';

export default function ReadOnlyModal({ isOpenReadOnlyModal, handleCloseReadOnlyModal, readOnlyData, selectedDate, dateWithEvents }) {
  const [isOpenEditableModal, setIsOpenEditableModal] = useState(false);
  const [editableData, setEditableData] = useState("");
  const [openModalEmail, setIsOpenModalEmail] = useState(false);

  // show modal email
  const handleOpenModalEmail = () => {
    setIsOpenModalEmail(true);
  }

  // close modal email 
  const handleCloseModalEmail = () => {
    setIsOpenModalEmail(false);
  }

  // show editable modal 
  const handleOpenEditableModal = () => {
    setIsOpenEditableModal(true);
  }

  // close editable modal 
  const handleCloseEditableModal = () => {
    setIsOpenEditableModal(false);
  }

  // handle click edit button
  const handleClickEditEvent = (event, item) => {
    event.stopPropagation();

    setEditableData(item);
    handleOpenEditableModal();
    handleCloseReadOnlyModal();
  }


  // handle delete selected date
  const handleDeleteEvent = (id) => {
    const copyListEvent = [...dateWithEvents];

    const removeItem = copyListEvent.filter((item) => {
      return item.id !== id;
    });

    localStorage.setItem('dateWithEvents', JSON.stringify(removeItem));
    handleCloseReadOnlyModal();
  }

  // handle when user click button send email
  const handleSendEmailButton = () => {
    handleOpenModalEmail();
    handleCloseReadOnlyModal();
  }

  return (
    <>
      <EditableModal isOpenEditableModal={isOpenEditableModal} editableData={editableData} handleCloseEditableModal={handleCloseEditableModal} selectedDate={selectedDate} />
      <InputModalEmail openModalEmail={openModalEmail} handleCloseModalEmail={handleCloseModalEmail} dataSelectedDate={readOnlyData} />
      <Transition appear show={isOpenReadOnlyModal} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={handleCloseReadOnlyModal}
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
                  <span className="text-green-500 text-base font-bold">Detail Event in {readOnlyData.date}</span>
                </Dialog.Title>
                <div className="max-w-lg mx-auto">
                  <form>
                    <div className="mb-6">
                      <label htmlFor="name" className="text-sm font-medium text-gray-900 block mb-2">Name</label>
                      <input disabled value={readOnlyData.name} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" type="name" id="name" name="name" placeholder="example: Raiden Shogun" required />
                    </div>
                    <div className="mb-6">
                      <label htmlFor="startTime" className="text-sm font-medium text-gray-900 block mb-2">Start Time</label>
                      <input disabled value={readOnlyData.startTime} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" type="time" id="startTime" name="startTime" required />
                    </div>
                    <div className="mb-6">
                      <label htmlFor="endTime" className="text-sm font-medium text-gray-900 block mb-2">End Time</label>
                      <input disabled value={readOnlyData.endTime} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" type="time" id="endTime" name="endTime" required />
                    </div>
                    <div className={`flex justify-between items-center`}>
                      <div>
                        <button onClick={handleSendEmailButton} type="button" className="text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-xs px-2 py-2 text-center">Send to Email ?</button>
                      </div>
                      <div>
                        <button onClick={() => handleDeleteEvent(readOnlyData.id)} type="button" className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Delete</button>
                        <button onClick={(e) => handleClickEditEvent(e, readOnlyData)} type="button" className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ml-3">Edit</button>
                      </div>
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
