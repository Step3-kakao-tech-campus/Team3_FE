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
        <Badge isRecruiting={true} />
        <span className="text-sm mx-2">
          <MdPeopleAlt className="inline mr-1 text-neutral-400" />
          <span>참석 </span>
          <span className="text-[#37D629]">{1}</span>
        </span>
        <span className="text-neutral-400">
          <span className="mr-1">모집마감</span>
          <span>{"9월 7일 (목) 오후 9:00 - hard coded"}</span>
        </span>
      </div>
      <div className="post-title-wrapper">
        <h1 className="post-title text-2xl">
          {"이번 주 저녁에 부산대 락볼링장에서 게임하실분~~-hard coded"}
        </h1>
      </div>
      <div className="post-title-lower flex w-full justify-between">
        <div className="post-info-wrapper text-neutral-400">
          <p className="district-name">
            <MdLocationPin className="inline" />
            <span>{"부산광역시 금정구 장전2동-hard"}</span>
          </p>
          <p className="start-time">
            <MdAlarm className="inline" />
            <span>{"9월 9일 (토) 오전 9:00-hard"}</span>
          </p>
        </div>
        <div className="user-profile flex items-center h-10">
          {/* // Image 컴포넌트로 외부 경로 이미지 로드시 next.config.js를 설정해 줘야해서 일단 img 태그로 구현 */}
          {/* <Image alt="유저 프로필 이미지" src={"이미지url"} fill={true}/> */}
          <img
            alt="유저 프로필 이미지"
            src={
              "https://w7.pngwing.com/pngs/741/68/png-transparent-user-computer-icons-user-miscellaneous-cdr-rectangle-thumbnail.png"
            }
            className="user-profile-image rounded-full h-full"
          />
          <span className="user-name text-2xl mx-1">{"닉네임"}</span>
        </div>
      </div>
    </section>
  );
}

export default PostCard;
