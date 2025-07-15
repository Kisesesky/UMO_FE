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
│   ├── coupons/
│   │   └── page.tsx
│   ├── customer-service/
│   │   └── page.tsx
│   ├── event/
│   │   └── [id]/
│   │        └── page.tsx
│   │   └── page.tsx
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
│   │   └── add/
│   │        └── page.tsx
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
│   ├── auth/
│   │   └── ProtectedRoute.tsx
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
├── hooks/
│   ├── userCurrentLocation.ts
│   ├── userStationMarkers.ts
│   ├── useStation.ts
│   └── useUserMarkers.ts
├── lib/
│   └── api.ts
├── services/
│   ├── api.ts
│   ├── auth.service.ts
│   ├── payment.service.ts
│   ├── product.service.ts
│   ├── rental.service.ts
│   ├── wallet.service.ts
│   └── weather.service.ts
├── store/
│   ├── auth.store.ts
│   ├── rental.store.ts
│   ├── wallet.store.ts
│   └── weather.store.ts
├── types/
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
    └── (아직 파일 없음)


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
