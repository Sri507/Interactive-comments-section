import React, { useState } from "react";

const DeleteComment = ({ handleDeleteT, deleteID, comment, handleSubmit }) => {
  const [deleteFlag, setDeleteFlag] = useState(false);

  const handleDeleteSubmit = () => {
    let temp = comment.filter((item) => item.id != deleteID);

    for (let i = 0; i < temp.length; i++) {
      for (let j = temp[i].replies.length - 1; j >= 0; j--) {
        if (temp[i].replies[j].id === deleteID) {
          temp[i].replies.splice(j, 1);
          setDeleteFlag(true);
          break;
        }
      }
      if (deleteFlag === true) {
        setDeleteFlag(false);
        break;
      }
    }

    handleSubmit([...temp]);
    handleDeleteT();
  };
  return (
    <div className="fixed inset-0 flex items-center justify-center z-10 bg-black/50 bg-opacity-50">
      <div className="relative max-w-[343px] md:max-w-[25rem] p-7 md:p-8 bg-white shadow-lg rounded-lg">
        <div className="text-[1.5rem] font-medium text-[var(--dark-blue)] mb-5">
          Delete comment
        </div>
        <div className="text-[var(--grayish-blue)] mb-6">
          Are you sure you want to delete this comment? This will remove the
          comment and can't be undone.
        </div>
        <div className="flex justify-between">
          <button
            onClick={() => handleDeleteT()}
            className="text-[var(--white)] bg-[var(--grayish-blue)] text-base text-center px-5.5 md:px-8 py-3.5 rounded-[0.625rem] active:opacity-50 hover:cursor-pointer transition-all ease-out"
            type="button"
          >
            NO, CANCEL
          </button>
          <button
            onClick={() => handleDeleteSubmit()}
            className="text-[var(--white)] bg-[var(--soft-red)] text-base text-center px-5.5 md:px-8 py-3.5 rounded-[0.625rem] active:opacity-50 hover:cursor-pointer transition-all ease-out"
            type="button"
          >
            YES, DELETE
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteComment;
