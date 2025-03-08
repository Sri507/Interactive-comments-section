import React, { useState, useRef, useEffect } from "react";
import juliusomo from "../assets/images/avatars/image-juliusomo.png";

const Reply = ({ id, name, replyTo, comment, handleSubmit, handleReplyB }) => {
  const textAreaRef = useRef(null);
  const [reply, setReply] = useState(`@${name}, `);
  const handleReply = () => {
    const randomID = Math.floor(Math.random() * 1000 + 200);
    let txt = reply;
    txt = txt.split(" ");
    txt.splice(0, 1);
    txt = txt.join(" ");
    const value = {
      id: randomID,
      username: "juliusomo",
      content: txt,
      score: 0,
      image: "./images/avatars/image-juliusomo.png",
      createdAt: "Today",
      add: 0,
      sub: 0,
      voted: false,
      replyTo: `${name}`,
      replies: [],
    };
    let temp = comment;
    temp.map((item, findex) => {
      item.id === id
        ? temp[findex].replies.push(value)
        : temp[findex].replies?.length > 0
        ? temp[findex].replies.map((item) => {
            item.id === id ? temp[findex].replies.push(value) : "";
          })
        : "";
    });
    handleSubmit([...temp]);
    handleReplyB();
  };
  useEffect(() => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = "auto";
      textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
    }
  }, [reply]);

  return (
    <div
      className={`bg-[var(--white)] flex flex-col md:flex-row ${
        replyTo === ""
          ? "max-w-[343px] w-dvw md:max-w-[728px]"
          : "max-w-[327px] w-dvw md:max-w-[640px]"
      } items-start md:gap-4 p-4 md:p-6 rounded-[0.625rem] mt-2`}
    >
      <img
        src={juliusomo}
        alt="profile_picture"
        className="w-9 hidden md:block"
      />
      <textarea
        placeholder="Add a comment..."
        className="resize-none w-full min-h-24 border-(--light-gray) overflow-hidden py-4 px-6 border rounded-[0.625rem] caret-[var(--moderate-blue)] focus:border-[var(--moderate-blue)] focus:border-2 focus:outline-0 active:cursor-pointer"
        ref={textAreaRef}
        value={reply}
        onChange={(e) => setReply(e.target.value)}
      ></textarea>
      <button
        type="button"
        onClick={() => handleReply()}
        className="bg-[var(--moderate-blue)] text-[var(--very-light-gray)] font-medium rounded-[0.625rem] py-4 px-8 hidden md:block active:opacity-50 hover:cursor-pointer transition-all ease-out"
      >
        REPLY
      </button>
      <div className="flex justify-between items-center w-full md:hidden mt-4">
        <img src={juliusomo} alt="profile_picture" className="size-8" />
        <button
          type="button"
          onClick={() => handleReply()}
          className="bg-[var(--moderate-blue)] text-[var(--very-light-gray)] font-medium rounded-[0.625rem] py-4 px-8 active:opacity-50 hover:cursor-pointer transition-all ease-out"
        >
          REPLY
        </button>
      </div>
    </div>
  );
};

export default Reply;
