import { MdOutlineSubdirectoryArrowRight } from "react-icons/md";
import React, { useRef, useState } from "react";
import { useParams } from "next/navigation";
import { CommentData } from "@/types/commentData";
import CircularProfileImage from "@/components/atoms/CircularProfileImage";
import useMutateWithQueryClient from "@/hooks/useMutateWithQueryClient";
import { postReply } from "@/apis/comment";
import useToast from "@/hooks/useToast";
import ProfileLink from "@/components/atoms/ProfileLink";
import useApiErrorToast from "@/hooks/useApiErrorToast";
import CommentBlock from "../CommentBlock";
import ChildComment from "../ChildComment";
import CommentSubmit from "../CommentSubmit";

export interface CommentWithChild extends CommentData {
  childComments: CommentData[];
}

interface Props {
  comment: CommentWithChild;
}

function Comment({ comment }: Props): JSX.Element {
  const params = useParams();
  const id = parseInt(params.id as string, 10);

  const [reply, setReply] = useState(false);
  const [commentContent, setCommentContent] = useState("");

  const commentRef = useRef<HTMLTextAreaElement>(null);

  const { mutate, queryClient } = useMutateWithQueryClient(postReply);

  const { addWarningToast } = useToast();
  const { addApiErrorToast } = useApiErrorToast();

  const handleReplyForm = () => {
    setReply((prev) => !prev);
    setCommentContent("");
  };

  const handleReply = () => {
    if (commentContent === "") {
      addWarningToast("내용을 입력해 주세요.");
      return;
    }
    const payload = {
      postId: id,
      commentId: comment.id,
      content: commentContent,
    };
    mutate(payload, {
      onSuccess: () => {
        queryClient.invalidateQueries(["/comments", id]);
        setReply(false);
      },
      onError: (err) => {
        addApiErrorToast({ err, alt: "댓글 등록에 실패했습니다." });
      },
    });
  };

  const handleSetValue = (value: string) => {
    setCommentContent(value);
  };

  return (
    <>
      <div className="flex items-center gap-3">
        <ProfileLink userId={comment.userId}>
          <CircularProfileImage src={comment.profileImage} styleType="lg" />
        </ProfileLink>
        <div className="flex-1">
          <CommentBlock comment={comment} isChild handleReplyForm={handleReplyForm} />
        </div>
      </div>
      <hr className="mt-2" />
      {reply && (
        <>
          <div className="flex items-center gap-1">
            <MdOutlineSubdirectoryArrowRight className="h-8 w-8 text-neutral-400" />
            <p>답글 달기</p>
          </div>
          <div className="flex items-center gap-3 mt-2">
            <CommentSubmit
              commentRef={commentRef}
              onClick={handleReply}
              value={commentContent}
              handleSetValue={handleSetValue}
            />
          </div>
          <hr className="mt-2" />
        </>
      )}
      {comment.childComments?.map((childComment) => <ChildComment childComment={childComment} key={childComment.id} />)}
    </>
  );
}

export default React.memo(Comment);
