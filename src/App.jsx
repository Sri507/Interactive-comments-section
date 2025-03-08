import React, { useEffect, useState, useRef } from "react";
import CommentCard from "./components/CommentCard";
import ProfileReplyCard from "./components/ProfileReplyCard";
import juliusomo from "./assets/images/avatars/image-juliusomo.png";
import DeleteComment from "./components/DeleteComment";

const App = () => {
  let data = [
    {
      id: 1,
      username: "amyrobson",
      content:
        "Impressive! Though it seems the drag feature could be improved. But overall it looks incredible. You've nailed the design and the responsiveness at various breakpoints works really well.",
      score: 12,
      image: "./images/avatars/image-amyrobson.png",
      createdAt: "1 month ago",
      add: 0,
      sub: 0,
      voted: false,
      replyTo: "",
      replies: [],
    },
    {
      id: 2,
      username: "maxblagun",
      content:
        "Woah, your project looks awesome! How long have you been coding for? I'm still new, but think I want to dive into React as well soon. Perhaps you can give me an insight on where I can learn React? Thanks!",
      score: 5,
      image: "./images/avatars/image-maxblagun.png",
      createdAt: "2 weeks ago",
      add: 0,
      sub: 0,
      voted: false,
      replyTo: "",
      replies: [
        {
          id: 3,
          username: "ramsesmiron",
          content:
            "If you're still new, I'd recommend focusing on the fundamentals of HTML, CSS, and JS before considering React. It's very tempting to jump ahead but lay a solid foundation first.",
          score: 4,
          image: "./images/avatars/image-ramsesmiron.png",
          createdAt: "1 week ago",
          add: 0,
          sub: 0,
          voted: false,
          replyTo: "maxblagun",
        },
        {
          id: 4,
          username: "juliusomo",
          content:
            "I couldn't agree more with this. Everything moves so fast and it always seems like everyone knows the newest library/ framework. But the fundamentals are what stay constant.",
          score: 2,
          image: "./images/avatars/image-juliusomo.png",
          createdAt: "2 days ago",
          add: 0,
          sub: 0,
          voted: false,
          replyTo: "ramsesmiron",
        },
      ],
    },
  ];

  useEffect(() => {
    handledataComment();
  }, []);
  const handledataComment = () => {
    const savedComments = JSON.parse(localStorage.getItem("comments")) || data;
    return savedComments;
  };
  const [comment, setComment] = useState(handledataComment());
  const [deleteID, setDeleteID] = useState(-1);
  const textAreaRef = useRef(null);
  const [deleteB, setDeleteB] = useState(false);
  const [reply, setReply] = useState("");

  useEffect(() => {
    localStorage.setItem("comments", JSON.stringify(comment));
  }, [comment]);

  const handleSubmit = (val) => {
    setComment(val);
  };

  const handleDeleteT = () => {
    setDeleteB(!deleteB);
    setDeleteID(-1);
  };
  const handleDeleteID = (val) => {
    setDeleteID(val);
  };

  useEffect(() => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = "auto";
      textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
    }
  }, [reply]);

  const handleCommentSubmit = () => {
    const randomID = Math.floor(Math.random() * 1000 + 200);
    if (reply.trim() !== "") {
      const value = {
        id: randomID,
        username: "juliusomo",
        content: reply,
        score: 0,
        image: "./images/avatars/image-juliusomo.png",
        createdAt: "Today",
        add: 0,
        sub: 0,
        voted: false,
        replyTo: "",
        replies: [],
      };
      setComment((prevComment) => [...prevComment, value]);
      setReply("");
    }
  };

  return (
    <main className="flex flex-col justify-center items-center min-h-dvh bg-[var(--very-light-gray)] font-[family-name:var(--ff)]">
      {deleteB === true ? (
        <DeleteComment
          handleDeleteT={handleDeleteT}
          deleteID={deleteID}
          comment={comment}
          handleSubmit={handleSubmit}
        />
      ) : (
        ""
      )}
      {comment.map((item, index) => (
        <div key={`m${index}`}>
          {item.username === "juliusomo" ? (
            <ProfileReplyCard
              data={item}
              comment={comment}
              handleSubmit={handleSubmit}
              handleDeleteT={handleDeleteT}
              handleDeleteID={handleDeleteID}
            />
          ) : (
            <CommentCard
              data={item}
              comment={comment}
              handleSubmit={handleSubmit}
            />
          )}
          <div className="border-l-[0.125rem] border-(--light-gray) md:ml-[2.6rem]">
            {item.replies?.length > 0
              ? item.replies.map((nitem, index) => (
                  <div
                    key={`n${index}`}
                    className="flex flex-col items-end md:gap-[1.125rem] mb-[1.125rem]"
                  >
                    {nitem.username === "juliusomo" ? (
                      <ProfileReplyCard
                        data={nitem}
                        comment={comment}
                        handleSubmit={handleSubmit}
                        handleDeleteT={handleDeleteT}
                        handleDeleteID={handleDeleteID}
                      />
                    ) : (
                      <CommentCard
                        data={nitem}
                        comment={comment}
                        handleSubmit={handleSubmit}
                      />
                    )}
                  </div>
                ))
              : ""}
          </div>
        </div>
      ))}
      <div className="bg-[var(--white)] flex flex-col md:flex-row max-w-[343px] md:max-w-[728px] w-dvw items-start md:gap-4 p-4 md:p-6 rounded-[0.625rem]">
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
          onClick={() => handleCommentSubmit()}
          className="bg-[var(--moderate-blue)] text-[var(--very-light-gray)] font-medium rounded-[0.625rem] py-4 px-8 hidden md:block active:opacity-50 hover:cursor-pointer transition-all ease-out"
        >
          SEND
        </button>
        <div className="flex justify-between items-center w-full md:hidden mt-4">
          <img src={juliusomo} alt="profile_picture" className="size-8" />
          <button
            type="button"
            onClick={() => handleCommentSubmit()}
            className="bg-[var(--moderate-blue)] text-[var(--very-light-gray)] font-medium rounded-[0.625rem] py-4 px-8 active:opacity-50 hover:cursor-pointer transition-all ease-out"
          >
            SEND
          </button>
        </div>
      </div>
    </main>
  );
};

export default App;
