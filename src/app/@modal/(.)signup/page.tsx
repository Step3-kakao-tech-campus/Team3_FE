"use client";

import React, { useState } from "react";
import Image from "next/image";
import Button from "@/components/atoms/Button";
import AuthCheckbox from "@/components/atoms/AuthCheckBox";
import Modal from "@/components/atoms/Modal";
import InputBox from "@/components/molecules/InputBox";
import DropdownBox from "@/components/molecules/DropdownBox";
import { validateEmail, validatePassword, validateName, validatePasswordConfirm } from "@/utils/validation";
import Logo from "public/images/bowling_logo.png";
import BlankBar from "@/components/atoms/BlankBar";
import { useRouter } from "next/navigation";

import { register, login } from "@/apis/postUser";
import { setLogin, getTokenPayload } from "@/utils/user";
import { islogin, setExpiryDate } from "@/redux/features/counterSlice";
import { useAppDispatch } from "@/redux/hooks";

function SignupHome() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [consentChecked, setConsentChecked] = useState(false); // 동의 체크 상태
  const [confirmPassword, setConfirmPassword] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    districtId: 24,
  });

  const [errorMessage, setErrorMessage] = useState({
    email: "",
    name: "",
    password: "",
    passwordConfirm: "",
    required: "",
  });

  const errorMessagesArray = Object.values(errorMessage).filter((message) => message);
  const firstErrorMessage = errorMessagesArray[0];

  const handleInputChange = (fieldName: any, value: any) => {
    // setFormData((prevData) => ({
    //   ...prevData,
    //   [fieldName]: value,
    // }));
    if (fieldName === "confirmPassword") {
      // 'confirmpassword' 필드의 값을 설정합니다.
      setConfirmPassword(value);
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [fieldName]: value,
      }));
    }
  };

  const handleSubmit = async () => {
    // 버튼 누를고 api보내지전 유효성 검사 실행
    // 그리고 빨간 글씨로 Input 밑에 표시
    // AuthInput 컴포넌트에 props로 넘겨줘서 div 안에 string과 함께 넣어주기
    if (!formData.email || !formData.password || !formData.name || !confirmPassword) {
      setErrorMessage((prev) => ({ ...prev, email: "모든 항목을 입력해주세요." }));
      return;
    }
    setErrorMessage((prev) => ({ ...prev, required: "" }));

    if (!validateEmail(formData.email)) {
      setErrorMessage((prev) => ({ ...prev, email: "이메일 형식이 올바르지 않습니다." }));
      return;
    }
    setErrorMessage((prev) => ({ ...prev, email: "" }));

    if (!validateName(formData.name)) {
      setErrorMessage((prev) => ({ ...prev, name: "닉네임은 한글, 영문, 숫자만 가능하며 20자 이하로 입력해주세요." }));
      return;
    }
    setErrorMessage((prev) => ({ ...prev, name: "" }));

    if (!validatePassword(formData.password)) {
      setErrorMessage((prev) => ({
        ...prev,
        password: "비밀번호는 영문,숫자, 특수문자가 모두 포함 8자 이상 20자 이하로 입력해주세요.",
      }));
      return;
    }
    setErrorMessage((prev) => ({ ...prev, password: "" }));

    if (!validatePasswordConfirm(formData.password, confirmPassword)) {
      setErrorMessage((prev) => ({ ...prev, passwordConfirm: "비밀번호가 일치하지 않습니다." }));
      return;
    }
    setErrorMessage((prev) => ({ ...prev, passwordConfirm: "" }));

    if (!consentChecked) {
      setErrorMessage((prev) => ({ ...prev, required: "개인정보 수집 및 이용에 동의해주세요." }));
      return;
    }

    try {
      await register(formData);
      const response = await login(formData);
      const payload = getTokenPayload(response.headers.authorization);
      // 토큰 만료시간 설정
      dispatch(islogin(formData.email));
      dispatch(setExpiryDate(payload.exp));
      setLogin(formData.email, response.headers.authorization);

      router.back();
    } catch (e: any) {
      // unkown이랑 any만 가능하다길래 any로 바꿈
      if (e.response) {
        alert(e.response.data.errorMessage);
      }
      router.back();
    }
    router.refresh();
    // Perform your signup logic here.
  };
  return (
    <Modal>
      <div>
        <div className="flex items-center justify-center pb-[22px]">
          <Image src={Logo} alt="볼링 로고" width={50} height={50} />
          <h1 className="text-[40px] text-transparent bg-clip-text bg-thunder">번개볼링</h1>
        </div>

        <div>
          {/* 이메일 입력란 */}
          <InputBox
            inputs={[
              {
                type: "email",
                placeholder: "이메일",
                className: "w-full py-2 px-3 rounded-lg border border-gray-400",
              },
              {
                type: "name",
                placeholder: "닉네임",
                className: "w-full py-2 px-3 rounded-lg border border-gray-400",
              },
              {
                type: "password",
                placeholder: "비밀번호",
                className: "w-full py-2 px-3 rounded-lg border border-gray-400",
              },
              {
                type: "confirmPassword",
                placeholder: "비밀번호 확인",
                className: "w-full py-2 px-3 rounded-lg border border-gray-400",
              },
            ]}
            onInputChange={(type, value) => handleInputChange(type, value)} // Pass the input change handler
          />
        </div>
        {/* 지역 선택 */}
        <DropdownBox />

        <BlankBar />
        {/* 개인 정보 수집 및 이용 동의 체크박스 */}
        <div className="mb-4">
          <AuthCheckbox checked={consentChecked} onChange={(isChecked) => setConsentChecked(isChecked)} />
        </div>

        <div>
          <p className="text-red-500 text-sm whitespace-pre-line">{firstErrorMessage}</p>
        </div>
        <BlankBar />

        {/* 제출 버튼 */}
        <div className="flex justify-center">
          <Button styleType="thunder_full" onClick={handleSubmit}>
            회원가입
          </Button>
        </div>
      </div>
    </Modal>
  );
}

export default SignupHome;
