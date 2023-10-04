import { MdAlarm, MdLocationPin } from "react-icons/md";
import Badge from "@/components/atoms/Badge";
import formatDateToString from "@/utils/formatDateToString";
import Link from "next/link";
import { PostData } from "@/types/postData";
import Participant from "@/components/atoms/Participant";
import RoundImage from "@/components/atoms/RoundImage";

interface Props {
  data: PostData;
}

function PostCard({ data }: Props) {
  return (
    <Link
      href={`/post/${data.id}`}
      className="post-card flex flex-col gap-6 bg-white p-7 rounded-2xl shadow hover:scale-[103%] transition"
    >
      <div className="post-title-upper">
        <Badge isClose={data.isClose} />
        <Participant currentNumber={data.currentNumber} />
        <span className="text-neutral-400">
          <span className="mr-1">모집마감</span>
          <span>{formatDateToString(data.dueTime)}</span>
        </span>
      </div>
      <div className="post-title-wrapper">
        <h1 className="post-title text-2xl">{data.title}</h1>
      </div>
      <div className="post-title-lower flex w-full justify-between">
        <div className="post-info-wrapper text-neutral-400">
          <p className="district-name">
            <MdLocationPin className="inline" />
            <span>{data.districtName}</span>
          </p>
          <p className="start-time">
            <MdAlarm className="inline" />
            <span>{formatDateToString(data.startTime)}</span>
          </p>
        </div>
        <div className="user-profile flex items-center h-10">
          <RoundImage
            className="w-8 h-8"
            src={data.profileImage ? `임시APIURL${data.profileImage}` : "/images/default_profile_image.png"}
            alt="프로필 이미지"
          />
          <span className="user-name text-2xl mx-1">{data.userName}</span>
        </div>
      </div>
    </Link>
  );
}

export default PostCard;
