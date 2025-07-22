This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

# 폴더구조
src/
├── app/
│   ├── admin/
│   │     ├── _components_/         
│   │     ├── coupons/              # 쿠폰/프로모션 관리
│   │     ├── dashboard/            # 기존 대시보드를 admin page로 수정
│   │     ├── events/               # 이벤트/공지 관리
│   │     ├── login/                # 관리자 전용 로그인(권장)
│   │     ├── logs/                 # 운영 로그(관리자 액션)
│   │     ├── orders/               # 주문 관리
│   │     │   └── [id]/             # (개별 주문 상세)
│   │     ├── products/             # 상품 관리
│   │     │   └── [id]/
│   │     ├── profile/              # 내 관리자 계정 정보
│   │     ├── stations/             # 대여소 관리
│   │     │   └── [id]/
│   │     ├── umbrellas/            # 우산 관리
│   │     │   └── [id]/
│   │     ├── users/                # 사용자 관리
│   │     │    └── [id]/
│   │     ├── utils/                # utils 관리
│   │     ├── layout.tsx            
│   │     └── page.tsx              # 메인페이지 - 대시보드
│   │
│   ├── auth/
│   │   ├── social-callback
│   │   │    ├── page.tsx
│   │   └── social-terms
│   │        ├── page.tsx
│   │        └── SocialTermsContent.tsx
│   ├── coupons/
│   │   └── page.tsx
│   ├── customer-service/
│   │   └── page.tsx
│   ├── event/
│   │   ├── [id]/
│   │   │    └── page.tsx
│   │   └── page.tsx
│   ├── find-password/
│   │     ├── page.tsx             # 메인 진입 페이지 (라우트)
│   │     ├── EmailStep.tsx        # 1. 이메일/코드 입력 컴포넌트
│   │     ├── ResetStep.tsx        # 2. 새 비밀번호 재설정 컴포넌트
│   │     └── SuccessStep.tsx      # 3. 완료 안내 (선택
│   ├── guide/
│   │   └── page.tsx
│   ├── invite-friends/
│   │   └── page.tsx
│   ├── login/
│   │   └── page.tsx
│   ├── my-rentals/
│   │   └── page.tsx
│   ├── notice/
│   │   └── page.tsx
│   ├── payment-methods/
│   │   ├── add/
│   │   │    └── page.tsx
│   │   └── page.tsx
│   ├── privacy/
│   │   └── page.tsx
│   ├── products/
│   │   └── page.tsx
│   │   └── ProductsClient.tsx
│   ├── profile/
│   │   └── page.tsx
│   ├── register/
│   │   └── page.tsx
│   ├── rent/
│   │   └── page.tsx
│   ├── return/
│   │   └── page.tsx
│   ├── settings/
│   │   └── page.tsx
│   ├── terms/
│   │   └── page.tsx
│   ├── wallet/
│   │   └── page.tsx
│   ├── favicon.ico
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── admin/
│   │   ├── AdminCouponTable.tsx
│   │   ├── AdminEventTable.tsx
│   │   ├── AdminLogTable.tsx
│   │   ├── AdminOrderTable.tsx
│   │   ├── AdminProductTable.tsx
│   │   ├── AdminStationTable.tsx
│   │   ├── AdminTable.tsx
│   │   ├── AdminUmbrellaTable.tsx
│   │   └── AdminUserTable.tsx
│   ├── auth/
│   │   ├── EmailInputWithVerification.tsx
│   │   ├── LoginForm.tsx
│   │   ├── NameInput.tsx
│   │   ├── PasswordConfirmInput.tsx
│   │   ├── PasswordInput.tsx
│   │   ├── ProfileImageUploader.tsx
│   │   ├── ProtectedRoute.tsx
│   │   ├── RegisterForm.tsx
│   │   ├── SocialLoginButtons.tsx
│   │   └── TermsAgreement.tsx
│   ├── drawer/
│   │   ├── Drawer.tsx
│   │   └── index.ts
│   ├── events/
│   │   └── page.tsx
│   ├── kakao-map/
│   │   ├── KakaoMap.tsx
│   │   └── index.ts
│   ├── map-controls/
│   │   ├── MapControls.tsx
│   │   └── index.ts
│   ├── notice/
│   │   └── page.tsx
│   ├── payment/
│   │   └── PaymentButton.tsx
│   ├── shared/
│   ├── terms/
│   │   └── TermsModal.tsx
│   ├── toast/
│   │   ├── Toast.tsx
│   │   └── index.ts
│   └── weather/
│       ├── WeatherInfo.tsx
│       └── index.ts
├── constants/
│   ├── privacy.ts
│   └── terms.ts
├── hooks/
│   ├── userCurrentLocation.ts
│   ├── useEmailAutocomplete.ts
│   ├── useEmailVerification.ts
│   ├── userLocationTracker.ts
│   ├── userStationMarkers.ts
│   ├── useStation.ts
│   └── useUserMarkers.ts
├── services/
│   ├── api.ts
│   ├── auth.service.
│   ├── location.service.ts
│   ├── payment.service.ts
│   ├── product.service.ts
│   ├── rental.service.ts
│   ├── station.service.ts
│   ├── wallet.service.ts
│   └── weather.service.ts
├── store/
│   ├── auth.store.ts
│   ├── rental.store.ts
│   ├── wallet.store.ts
│   └── weather.store.ts
├── types/
│   │ └── components
│   │        └── auth.ts
│   ├── auth.ts
│   ├── coupon.ts
│   ├── event.ts
│   ├── guide.ts
│   ├── kakao-types.ts
│   ├── kakao.d.ts
│   ├── notice.ts
│   ├── payment.ts
│   ├── product.ts
│   ├── rental.ts
│   ├── toast.ts
│   ├── wallet.ts
│   └── weather.ts
└── util/
    ├── autocomplete.ts
    ├── errorMessage.ts
    ├── toFormData.ts
    └── validation.ts


Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
