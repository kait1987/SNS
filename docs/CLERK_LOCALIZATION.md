# Clerk 한국어 로컬라이제이션 가이드

이 문서는 Clerk 컴포넌트를 한국어로 설정하는 방법을 설명합니다.

## 현재 설정

프로젝트는 이미 한국어 로컬라이제이션이 적용되어 있습니다:

- `@clerk/localizations` 패키지 설치됨
- `lib/clerk/localization.ts`에서 커스텀 한국어 로컬라이제이션 정의
- `app/layout.tsx`에서 `ClerkProvider`에 적용
- `html lang="ko"` 설정

## 로컬라이제이션 파일 구조

```typescript
// lib/clerk/localization.ts
import { koKR } from "@clerk/localizations";

export const customKoKR = {
  ...koKR,
  unstable__errors: {
    ...koKR.unstable__errors,
    // 커스텀 에러 메시지
  },
};
```

## 커스터마이징 방법

### 1. 에러 메시지 커스터마이징

`unstable__errors` 객체를 사용하여 에러 메시지를 커스터마이징할 수 있습니다:

```typescript
export const customKoKR = {
  ...koKR,
  unstable__errors: {
    ...koKR.unstable__errors,
    not_allowed_access: "접근이 허용되지 않은 이메일 도메인입니다.",
    form_identifier_not_found: "입력하신 이메일 또는 사용자 이름을 찾을 수 없습니다.",
    form_password_incorrect: "비밀번호가 올바르지 않습니다.",
  },
};
```

### 2. 컴포넌트 텍스트 커스터마이징

특정 컴포넌트의 텍스트를 커스터마이징할 수 있습니다:

```typescript
export const customKoKR = {
  ...koKR,
  signIn: {
    start: {
      title: "로그인",
      subtitle: "{{applicationName}}에 로그인하세요",
    },
  },
  signUp: {
    start: {
      title: "회원가입",
      subtitle: "{{applicationName}}에 가입하세요",
    },
  },
};
```

### 3. 전체 로컬라이제이션 확인

모든 사용 가능한 키를 확인하려면 [Clerk 공식 GitHub 저장소](https://github.com/clerk/javascript/blob/main/packages/localizations/src/en-US.ts)의 영어 로컬라이제이션 파일을 참고하세요.

## 적용 방법

`app/layout.tsx`에서 커스텀 로컬라이제이션을 적용합니다:

```tsx
import { customKoKR } from "@/lib/clerk/localization";

<ClerkProvider localization={customKoKR}>
  {/* ... */}
</ClerkProvider>
```

## 지원되는 언어

Clerk는 다음 언어를 지원합니다 (한국어 포함):

- 한국어 (ko-KR): `koKR`
- 영어 (en-US): `enUS`
- 일본어 (ja-JP): `jaJP`
- 중국어 간체 (zh-CN): `zhCN`
- 중국어 번체 (zh-TW): `zhTW`
- 기타 50개 이상의 언어

전체 목록은 [Clerk 공식 문서](https://clerk.com/docs/guides/customizing-clerk/localization)를 참고하세요.

## 주의사항

> [!WARNING]
> 로컬라이제이션 기능은 현재 실험적(experimental)입니다. 예상치 못한 동작이 발생할 수 있습니다.

- 로컬라이제이션은 Clerk 컴포넌트의 텍스트만 변경합니다
- Clerk Account Portal은 여전히 영어로 표시됩니다
- 문제가 발생하면 [Clerk 지원팀](https://clerk.com/contact/support)에 문의하세요

## 참고 자료

- [Clerk 로컬라이제이션 공식 문서](https://clerk.com/docs/guides/customizing-clerk/localization)
- [@clerk/localizations 패키지](https://www.npmjs.com/package/@clerk/localizations)
- [Clerk GitHub 저장소 - 로컬라이제이션 파일](https://github.com/clerk/javascript/tree/main/packages/localizations/src)

