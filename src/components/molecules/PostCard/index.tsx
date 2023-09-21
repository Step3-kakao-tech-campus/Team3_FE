import { MdAlarm } from "react-icons/md";
import { MdLocationPin } from "react-icons/md";
import { MdPeopleAlt } from "react-icons/md";
import Badge from "@/components/atoms/Badge";
import Image from "next/image";

interface Props {
  title: string;
  dueTime: string;
  startTime: string;
  districtName: string;
  userName: string;
  profileImage: string | null;
  isClose: boolean;
}

function PostCard({
  title,
  dueTime,
  startTime,
  districtName,
  userName,
  profileImage,
  isClose,
}: Props) {
  return (
    <section className="post-card flex flex-col gap-6 p-7 rounded-2xl shadow">
      <div className="post-title-upper">
        <Badge isClose={isClose} />
        <span className="text-sm mx-2">
          <MdPeopleAlt className="inline mr-1 text-neutral-400" />
          <span>참석 </span>
          <span className="text-[#37D629]">{"hard"}</span>
        </span>
        <span className="text-neutral-400">
          <span className="mr-1">모집마감</span>
          <span>{dueTime}</span>
        </span>
      </div>
      <div className="post-title-wrapper">
        <h1 className="post-title text-2xl">{title}</h1>
      </div>
      <div className="post-title-lower flex w-full justify-between">
        <div className="post-info-wrapper text-neutral-400">
          <p className="district-name">
            <MdLocationPin className="inline" />
            <span>{districtName}</span>
          </p>
          <p className="start-time">
            <MdAlarm className="inline" />
            <span>{startTime}</span>
          </p>
        </div>
        <div className="user-profile flex items-center h-10">
          {/* // Image 컴포넌트로 외부 경로 이미지 로드시 next.config.js를 설정해 줘야해서 일단 img 태그로 구현 */}
          {/* <Image alt="유저 프로필 이미지" src={profileImage ? `임시APIURL${profileImage}` : "기본이미지경로"} fill={true}/> */}
          <img
            alt="유저 프로필 이미지"
            src={
              profileImage
                ? `임시APIURL${profileImage}`
                : "https://w7.pngwing.com/pngs/741/68/png-transparent-user-computer-icons-user-miscellaneous-cdr-rectangle-thumbnail.png"
            }
            className="user-profile-image rounded-full h-full"
          />
          <span className="user-name text-2xl mx-1">{userName}</span>
        </div>
      </div>
    </section>
  );
}

export default PostCard;
