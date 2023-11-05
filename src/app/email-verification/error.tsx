"use client";

export default function Error({ reset }: { reset: () => void }) {
  return (
    <div className="email-verification-error min-h-[60vh] flex flex-col justify-evenly">
      <div className="flex flex-col items-center gap-8">
        <h2 className="text-3xl">오류가 발생했습니다.</h2>
        <div className="email-verification-error flex flex-col items-center gap-3">
          <p className="text-xl text-neutral-500">메일 인증 요청 중 오류가 발생했습니다.</p>
          <p className="text-xl text-neutral-500">아래의 버튼을 눌러 다시 시도해 주세요.</p>
        </div>
        <button
          type="button"
          className="border bg-thunder px-4 py-2 text-white rounded-2xl hover:brightness-95"
          onClick={() => reset()}
        >
          다시 시도
        </button>
      </div>
    </div>
  );
}
