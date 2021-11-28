import { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';

export default function EditableModal({ isOpenEditableModal, handleCloseEditableModal, editableData }) {
  const dateWithEvents = JSON.parse(localStorage.getItem('dateWithEvents')) || [];
  const [editEventDate, setEditEventDate] = useState({
    name: "",
    startTime: "",
    endTime: "",
  })

  const handleEditFormChange = (event) => {
    event.preventDefault();

    setEditEventDate({
      ...editEventDate,
      [event.target.name]: event.target.value,
    })
  }

  const handleEditEventSubmit = () => {
    const editedEvent = {
      id: editableData.id,
      date: editableData.date,
      name: editEventDate.name.length === 0 ? editableData.name : editEventDate.name,
      startTime: editEventDate.startTime.length === 0 ? editableData.startTime : editEventDate.startTime,
      endTime: editEventDate.endTime.length === 0 ? editableData.endTime : editEventDate.endTime,
      color: editableData.color
    }

    const newEditedEvents = [...dateWithEvents];

    const index = dateWithEvents.findIndex((dateWithEvent) => dateWithEvent.id === editableData.id);

    newEditedEvents[index] = editedEvent;

    localStorage.setItem('dateWithEvents', JSON.stringify(newEditedEvents));
    handleCloseEditableModal();
    
  }

  return (
    <>
      <Transition appear show={isOpenEditableModal} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={handleCloseEditableModal}
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
                  <span className="text-pink-500 font-bold">Edit Event in {editableData.date}</span>
                </Dialog.Title>
                <div className="max-w-lg mx-auto">
                  <form onSubmit={(e) => handleEditEventSubmit(e)}>
                    <div className="mb-6">
                      <label htmlFor="name" className="text-sm font-medium text-gray-900 block mb-2">Name</label>
                      <input
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        type="text"
                        id="name"
                        name="name"
                        placeholder="example: Raiden Shogun"
                        defaultValue={editableData.name}
                        onChange={handleEditFormChange}
                        required
                      />
                    </div>
                    <div className="mb-6">
                      <label htmlFor="startTime" className="text-sm font-medium text-gray-900 block mb-2">Start Time</label>
                      <input
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        type="time"
                        id="startTime"
                        name="startTime"
                        defaultValue={editableData.startTime}
                        onChange={handleEditFormChange}
                        required
                      />
                    </div>
                    <div className="mb-6">
                      <label htmlFor="endTime" className="text-sm font-medium text-gray-900 block mb-2">End Time</label>
                      <input
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        type="time"
                        id="endTime"
                        name="endTime"
                        defaultValue={editableData.endTime}
                        onChange={handleEditFormChange}
                        required
                      />
                    </div>
                    <div className="flex justify-end">
                      <button type="button" onClick={() => handleCloseEditableModal()} className="text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ml-3">Cancel</button>
                      <button type="submit" className="text-white bg-pink-700 hover:bg-pink-800 focus:ring-4 focus:ring-pink-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ml-3">Submit Edit</button>
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
