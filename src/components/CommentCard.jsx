import { useState, useEffect } from "react";
import plus from "../assets/images/icon-plus.svg";
import minus from "../assets/images/icon-minus.svg";
import reply from "../assets/images/icon-reply.svg";
import Reply from "./Reply";

const CommentCard = ({ data, comment, handleSubmit, img }) => {
  let getImg;

  Object.keys(img).map((item) => {
    if (item === data.username) {
      getImg = img[item];
    }
    return item;
  });

  const [replyB, setReplyB] = useState(false);
  const [addS, setAddS] = useState(data.add);
  const [minusS, setMinusS] = useState(data.sub);
  const [votedS, setVotedS] = useState(data.voted);
  const [scoreS, setScoreS] = useState(data.score);

  const handleReplyB = () => {
    setReplyB((prevReply) => !prevReply);
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

  return (
    <div className={`${data.replyTo === "" ? "mb-[1.125rem]" : ""}`}>
      <div
        className={`md:flex gap-6 p-4 md:p-6 bg-[var(--white)] rounded-[0.625rem]  ${
          data.replyTo === ""
            ? "max-w-[343px] w-dvw md:max-w-[728px]"
            : "max-w-[327px] w-dvw md:max-w-[640px]"
        }`}
      >
        <div className="hidden md:flex flex-col justify-around items-center max-h-[6.25rem] min-w-10 bg-[var(--very-light-gray)] rounded-[0.625rem]">
          <img
            src={plus}
            onClick={() => handlePlus()}
            alt="plus_img"
            className="w-9 p-3 cursor-pointer"
          />
          <div className="text-[var(--moderate-blue)] font-medium">
            {scoreS}
          </div>
          <img
            src={minus}
            onClick={() => handleMinus()}
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
              <div className="text-[var(--grayish-blue)]">{data.createdAt}</div>
            </div>
            <div
              onClick={() => setReplyB(!replyB)}
              className="hidden md:flex items-center gap-2 active:opacity-50 cursor-pointer transition-all ease-out"
            >
              <img src={reply} alt="reply_icon" className="size-[0.8rem]" />
              <div className="text-[var(--moderate-blue)] font-medium ">
                Reply
              </div>
            </div>
          </div>
          <div className="text-[var(--grayish-blue)] mb-4 md:mb-0 break-words">
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
        </div>
        <div className="flex justify-between md:hidden">
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
          <div
            onClick={() => setReplyB(!replyB)}
            className="flex items-center gap-2 active:opacity-50 cursor-pointer transition-all ease-out"
          >
            <img src={reply} alt="reply_icon" className="size-[0.8rem]" />
            <div className="text-[var(--moderate-blue)] font-medium ">
              Reply
            </div>
          </div>
        </div>
      </div>
      {replyB && (
        <Reply
          id={data.id}
          name={data.username}
          replyTo={data.replyTo}
          comment={comment}
          handleSubmit={handleSubmit}
          handleReplyB={handleReplyB}
          className="transition-all ease-in-out"
        />
      )}
    </div>
  );
};

export default CommentCard;
