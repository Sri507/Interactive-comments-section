import { useRef, useState, useEffect } from "react";
import plus from "../assets/images/icon-plus.svg";
import minus from "../assets/images/icon-minus.svg";
import deleteI from "../assets/images/icon-delete.svg";
import editI from "../assets/images/icon-edit.svg";

const ProfileReplyCard = ({
  data,
  comment,
  handleSubmit,
  handleDeleteT,
  handleDeleteID,
  img,
}) => {
  let getImg;

  Object.keys(img).map((item) => {
    if (item === data.username) {
      getImg = img[item];
    }
    return item;
  });

  const textAreaRef = useRef(null);
  const [reply, setReply] = useState(`@${data.replyTo}, ${data.content}`);
  const [replyContent, setReplyContent] = useState(data.content);
  const [updateB, setUpdateB] = useState(false);
  const [addS, setAddS] = useState(data.add);
  const [minusS, setMinusS] = useState(data.sub);
  const [votedS, setVotedS] = useState(data.voted);
  const [scoreS, setScoreS] = useState(data.score);

  const handleUpdateSubmit = () => {
    let txt;
    if (data.replyTo === "") {
      txt = replyContent;
    } else {
      txt = reply;
      txt = txt.split(" ");
      txt.splice(0, 1);
      txt = txt.join(" ");
    }

    let temp = comment;
    temp.map((item) => {
      item.id === data.id
        ? (item.content = txt)
        : item.replies?.length > 0
        ? item.replies.map((nitem) => {
            nitem.id === data.id ? (nitem.content = txt) : nitem;
          })
        : item;
    });
    handleSubmit([...temp]);
    setUpdateB(false);
  };
  const handlePlus = () => {
    if (votedS === false && minusS === 1) {
      setScoreS((prev) => prev + 1);
      setAddS(1);
      setMinusS(0);
      setVotedS(true);
    } else if (votedS === true && minusS === 1) {
      setVotedS(false);
      setScoreS((prev) => prev + 1);
    } else if (votedS === false && minusS === 0) {
      setAddS(1);
      setVotedS(true);
      setScoreS((prev) => prev + 1);
    }
  };

  const handleMinus = () => {
    if (scoreS > 0) {
      if (votedS === false && addS === 1) {
        setScoreS((prev) => prev - 1);
        setMinusS(1);
        setAddS(0);
        setVotedS(true);
      } else if (votedS === true && addS === 1) {
        setVotedS(false);
        setScoreS((prev) => prev - 1);
      } else if (votedS === false && addS === 0) {
        setMinusS(1);
        setVotedS(true);
        setScoreS((prev) => prev - 1);
      }
    }
  };
  useEffect(() => {
    let temp = comment;
    temp.map((item) => {
      item.id === data.id
        ? ((item.add = addS),
          (item.sub = minusS),
          (item.voted = votedS),
          (item.score = scoreS))
        : item.replies?.length > 0
        ? item.replies.map((nitem) => {
            nitem.id === data.id
              ? ((nitem.add = addS),
                (nitem.sub = minusS),
                (nitem.voted = votedS),
                (nitem.score = scoreS))
              : nitem;
          })
        : item;
    });
    handleSubmit([...temp]);
  }, [scoreS]);
  useEffect(() => {
    if (textAreaRef.current) {
      // textAreaRef.current.style.height = "auto";
      textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
    }
  }, [reply, updateB]);

  return (
    <div className={`${data.replyTo === "" ? "mb-[1.125rem]" : ""}`}>
      <div
        className={`md:flex gap-6 p-4 md:p-6 bg-[var(--white)] rounded-[0.625rem] ${
          data.replyTo === ""
            ? "max-w-[343px] w-dvw md:max-w-[728px]"
            : "max-w-[327px] w-dvw md:max-w-[640px]"
        }`}
      >
        <div className="hidden md:flex flex-col justify-around items-center max-h-[6.25rem] min-w-10 bg-[var(--very-light-gray)] rounded-[0.625rem]">
          <img
            onClick={() => handlePlus()}
            src={plus}
            alt="plus_img"
            className="w-9 p-3 cursor-pointer"
          />
          <div className="text-[var(--moderate-blue)] font-medium">
            {scoreS}
          </div>
          <img
            onClick={() => handleMinus()}
            src={minus}
            alt="minus_img"
            className="w-9 p-3 cursor-pointer"
          />
        </div>
        <div className="w-full overflow-hidden">
          <div className="md:flex md:justify-between items-center mb-4">
            <div className="flex items-center gap-4">
              <img src={getImg} alt="profile_picture" className="size-8" />
              <div className="text-[var(--dark-blue)] font-medium text-base">
                {data.username}
              </div>
              <div className="bg-[var(--moderate-blue)] text-center text-[var(--white)] font-medium px-[0.5rem] rounded-[0.2rem]">
                you
              </div>
              <div className="text-[var(--grayish-blue)]">{data.createdAt}</div>
            </div>
            <div className="hidden md:flex items-center gap-[1.5rem]">
              <div
                onClick={() => (handleDeleteT(), handleDeleteID(data.id))}
                className="flex items-center gap-[0.5rem] active:opacity-50 cursor-pointer transition-all ease-out"
              >
                <img src={deleteI} alt="reply_icon" className="size-[0.9rem]" />
                <div className="text-[var(--soft-red)] font-medium ">
                  Delete
                </div>
              </div>
              <div
                onClick={() => setUpdateB(!updateB)}
                className="flex items-center gap-[0.5rem] active:opacity-50 cursor-pointer transition-all ease-out"
              >
                <img src={editI} alt="reply_icon" className="size-[0.9rem]" />
                <div className="text-[var(--moderate-blue)] font-medium">
                  Edit
                </div>
              </div>
            </div>
          </div>
          {updateB === false ? (
            <div className="text-[var(--grayish-blue)] transition-all break-words">
              {data.replyTo === "" ? (
                data.content
              ) : (
                <div className="break-words">
                  <span className="text-[var(--moderate-blue)] font-medium">
                    @{data.replyTo}{" "}
                  </span>
                  {data.content}
                </div>
              )}
            </div>
          ) : (
            <div className={`flex flex-col transition-all`}>
              <textarea
                placeholder="Add a comment..."
                className={`resize-none min-h-24 caret-[var(--moderate-blue)] overflow-hidden py-4 px-6 border rounded-[0.625rem] focus:border-[var(--moderate-blue)] focus:border-2 focus:outline-0 active:cursor-pointer`}
                ref={textAreaRef}
                value={data.replyTo === "" ? replyContent : reply}
                onChange={
                  data.replyTo === ""
                    ? (e) => setReplyContent(e.target.value)
                    : (e) => setReply(e.target.value)
                }
              ></textarea>
              <button
                onClick={() => handleUpdateSubmit()}
                type="button"
                className="bg-[var(--moderate-blue)] flex self-end text-[var(--very-light-gray)] text-center max-w-[106px] font-medium rounded-[0.625rem] py-4 px-5 mt-4 active:opacity-50 hover:cursor-pointer"
              >
                UPDATE
              </button>
            </div>
          )}
        </div>
        <div className="flex justify-between mt-4 md:hidden">
          <div className="flex justify-evenly items-center min-w-[6.25rem] bg-[var(--very-light-gray)] rounded-[0.625rem]">
            <img
              onClick={() => handlePlus()}
              src={plus}
              alt="plus_img"
              className="w-11 p-4 cursor-pointer"
            />
            <div className="text-[var(--moderate-blue)] font-medium">
              {scoreS}
            </div>
            <img
              onClick={() => handleMinus()}
              src={minus}
              alt="minus_img"
              className="w-11 p-4 cursor-pointer"
            />
          </div>
          <div className="flex items-center gap-[1.5rem]">
            <div
              onClick={() => (handleDeleteT(), handleDeleteID(data.id))}
              className="flex items-center gap-[0.5rem] active:opacity-50 cursor-pointer transition-all ease-out"
            >
              <img src={deleteI} alt="reply_icon" className="size-[0.9rem]" />
              <div className="text-[var(--soft-red)] font-medium ">Delete</div>
            </div>
            <div
              onClick={() => setUpdateB(!updateB)}
              className="flex items-center gap-[0.5rem] active:opacity-50 cursor-pointer transition-all ease-out"
            >
              <img src={editI} alt="reply_icon" className="size-[0.9rem]" />
              <div className="text-[var(--moderate-blue)] font-medium">
                Edit
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileReplyCard;
