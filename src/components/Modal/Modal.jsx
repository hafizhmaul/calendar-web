import { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { nanoid } from 'nanoid';
import { generateRandomInteger } from '../../utils/random-number-utils';
import { colorCode } from '../../constants/color';

export default function Modal({ isOpenModal, handleCloseModal, selectedDate, selectDateWithEvent }) {
  const dateWithEvents = JSON.parse(localStorage.getItem('dateWithEvents')) || [];
  const [addEventDate, setAddEventDate] = useState({
    id: "",
    date: "",
    name: "",
    startTime: "",
    endTime: "",
    color: ""
  });

  // filtered event that match with selected date
  const listOfEventWithSpecificDate = selectDateWithEvent.filter((item) => item.date === selectedDate)

  const handleAddEventFormChange = (event) => {
    event.preventDefault();

    setAddEventDate({
      ...addEventDate,
      [event.target.name]: event.target.value,
    })
  }

  const handleAddEventSubmit = (event) => {
    event.preventDefault();

    if (listOfEventWithSpecificDate?.length < 3) {
      const newAddEvent = {
        id: nanoid(),
        date: selectedDate,
        name: addEventDate.name,
        startTime: addEventDate.startTime,
        endTime: addEventDate.endTime,
        color: colorCode[generateRandomInteger(35)],
      }

      const newAddEvents = dateWithEvents.concat(newAddEvent);

      localStorage.setItem('dateWithEvents', JSON.stringify(newAddEvents));

      setAddEventDate("");
      handleCloseModal();
    } else {
      alert("Cannot add another event, the number of events has reached the maximum on this day");
      setAddEventDate("");
      handleCloseModal(); 
    }
  }

  return (
    <>
      <Transition appear show={isOpenModal} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={handleCloseModal}
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
                  <span className="text-purple-700 text-base font-bold">Add Event in {selectedDate}</span>
                </Dialog.Title>
                <div className="max-w-lg mx-auto">
                  <form onSubmit={handleAddEventSubmit}>
                    <div className="mb-6">
                      <label htmlFor="name" className="text-sm font-medium text-gray-900 block mb-2">Name</label>
                      <input onChange={handleAddEventFormChange} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" type="name" id="name" name="name" placeholder="example: Raiden Shogun" required />
                    </div>
                    <div className="mb-6">
                      <label htmlFor="startTime" className="text-sm font-medium text-gray-900 block mb-2">Start Time</label>
                      <input onChange={handleAddEventFormChange} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" type="time" id="startTime" name="startTime" required />
                    </div>
                    <div className="mb-6">
                      <label htmlFor="endTime" className="text-sm font-medium text-gray-900 block mb-2">End Time</label>
                      <input onChange={handleAddEventFormChange} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" type="time" id="endTime" name="endTime" required />
                    </div>
                    <div className="flex justify-end">
                      <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ml-3">Submit</button>
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
