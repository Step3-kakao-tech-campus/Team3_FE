import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mt-8 p-16 lg:mx-28">
      <h2 className="font-bold text-3xl">
        죄송합니다.
        <br />
        요청하신 페이지를 찾을 수 없습니다.
      </h2>
      <p className="mt-5">
        방문하시려는 페이지의 주소가 잘못 입력되었거나,
        <br />
        페이지의 주소가 변경 혹은 삭제되어 요청하신 페이지를 찾을 수 없습니다.
      </p>
      <p className="mt-5">입력하신 주소가 정확한지 다시 한번 확인해 주시기 바랍니다.</p>
      <p className="mt-5">감사합니다.</p>
      <div className="flex justify-center">
        <Link href="/" className="mt-5 px-2 py-1 bg-white font-bold border border-orange-400 text-orange-400">
          홈으로
        </Link>
      </div>
    </div>
  );
}
