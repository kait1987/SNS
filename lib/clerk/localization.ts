/**
 * @file lib/clerk/localization.ts
 * @description Clerk 한국어 커스텀 로컬라이제이션
 *
 * Clerk 컴포넌트의 한국어 번역을 커스터마이징합니다.
 * 기본 koKR 로컬라이제이션을 확장하여 브랜드에 맞게 수정할 수 있습니다.
 *
 * 참고: https://clerk.com/docs/guides/customizing-clerk/localization
 */

import { koKR } from "@clerk/localizations";

/**
 * 커스텀 한국어 로컬라이제이션
 *
 * 기본 koKR 로컬라이제이션을 확장하여 에러 메시지나 특정 텍스트를 커스터마이징합니다.
 */
export const customKoKR = {
  ...koKR,
  // 에러 메시지 커스터마이징
  unstable__errors: {
    ...koKR.unstable__errors,
    // 접근이 허용되지 않은 이메일 도메인에 대한 커스텀 메시지
    not_allowed_access:
      "접근이 허용되지 않은 이메일 도메인입니다. 기업 이메일 도메인을 허용 목록에 추가하려면 이메일로 문의해주세요.",
    // 기타 에러 메시지 커스터마이징 예시
    // form_identifier_not_found: "입력하신 이메일 또는 사용자 이름을 찾을 수 없습니다.",
    // form_password_incorrect: "비밀번호가 올바르지 않습니다.",
  },
  // 특정 컴포넌트 텍스트 커스터마이징 (필요한 경우)
  // signIn: {
  //   start: {
  //     title: "로그인",
  //     subtitle: "{{applicationName}}에 로그인하세요",
  //   },
  // },
  // signUp: {
  //   start: {
  //     title: "회원가입",
  //     subtitle: "{{applicationName}}에 가입하세요",
  //   },
  // },
};

