// src/app/privacy/page.tsx
'use client';

import { useRouter } from 'next/navigation';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import { FaArrowLeft } from 'react-icons/fa';

export default function PrivacyPage() {
  const router = useRouter();

  return (
    <ProtectedRoute checkAuth={false}>
      <div className="app-container flex flex-col bg-gray-50">
        <header className="page-header">
          <button onClick={() => router.back()} className="page-back-button">
            <FaArrowLeft size={18} />
          </button>
          <h1 className="page-header-title">개인정보 처리 방침</h1>
          <div className="w-10"></div>
        </header>
        
        <main className="flex-1 overflow-y-auto p-6 text-gray-700 leading-relaxed">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">제1조 (개인정보의 처리 목적)</h2>
          <p className="mb-4">
            회사는 다음의 목적을 위하여 개인정보를 처리하며, 다음의 목적 이외의 용도로는 이용하지 않습니다.
          </p>
          <ul className="list-disc list-inside mb-4">
            <li>회원 가입 및 관리: 회원 가입 의사 확인, 회원제 서비스 제공에 따른 본인 식별/인증, 회원 자격 유지/관리, 제한적 본인확인제 시행에 따른 본인확인, 서비스 부정이용 방지, 만14세 미만 아동 개인정보 처리 시 법정대리인의 동의 여부 확인, 각종 고지/통지, 고충 처리 등을 목적으로 개인정보를 처리합니다.</li>
            <li>서비스 제공: 우산 대여 및 반납 서비스 제공, 콘텐츠 제공, 맞춤 서비스 제공, 본인인증, 요금 결제 및 정산 등을 목적으로 개인정보를 처리합니다.</li>
            <li>마케팅 및 광고에의 활용: 신규 서비스(제품) 개발 및 맞춤 서비스 제공, 이벤트 및 광고성 정보 제공 및 참여기회 제공, 인구통계학적 특성에 따른 서비스 제공 및 광고 게재, 서비스의 유효성 확인 등을 목적으로 개인정보를 처리합니다.</li>
            <li>고객 문의 및 상담: 고객 문의에 대한 답변, 불만 처리, 서비스 개선을 위한 통계 분석 등을 목적으로 개인정보를 처리합니다.</li>
          </ul>

          <h2 className="text-xl font-semibold text-gray-800 mb-4">제2조 (처리하는 개인정보 항목)</h2>
          <p className="mb-4">
            회사는 서비스 제공을 위해 다음의 개인정보 항목을 처리하고 있습니다.
          </p>
          <ul className="list-disc list-inside mb-4">
            <li>필수 항목: 이름, 이메일 주소, 비밀번호, 휴대전화번호</li>
            <li>선택 항목: 주소, 결제 정보 (카드 번호 일부, 유효기간 등)</li>
            <li>서비스 이용 과정에서 자동으로 생성될 수 있는 항목: 서비스 이용 기록, 접속 로그, 쿠키, 접속 IP 정보, 결제 기록 등</li>
          </ul>

          <h2 className="text-xl font-semibold text-gray-800 mb-4">제3조 (개인정보의 처리 및 보유 기간)</h2>
          <p className="mb-4">
            회사는 법령에 따른 개인정보 보유∙이용 기간 또는 정보주체로부터 개인정보를 수집 시에 동의 받은 개인정보 보유∙이용 기간 내에서 개인정보를 처리∙보유합니다.
          </p>
          <ul className="list-disc list-inside mb-4">
            <li>회원 가입 및 관리: 회원 탈퇴 시까지</li>
            <li>서비스 제공: 서비스 종료 시까지</li>
            <li>다만, 다음의 사유에 해당하는 경우에는 해당 기간 종료 시까지</li>
            <ul className="list-circle list-inside ml-5">
              <li>「전자상거래 등에서의 소비자 보호에 관한 법률」에 따른 표시/광고, 계약내용 및 이행 등 거래에 관한 기록</li>
              <ul className="list-disc list-inside ml-5">
                <li>표시/광고에 관한 기록: 6개월</li>
                <li>계약 또는 청약철회 등에 관한 기록: 5년</li>
                <li>대금결제 및 재화 등의 공급에 관한 기록: 5년</li>
                <li>소비자의 불만 또는 분쟁처리에 관한 기록: 3년</li>
              </ul>
              <li>「통신비밀보호법」에 따른 통신사실확인자료 보관</li>
              <ul className="list-disc list-inside ml-5">
                <li>컴퓨터통신, 인터넷 로그기록 자료, 접속지 추적자료: 3개월</li>
              </ul>
            </ul>
          </ul>

          {/* ... 더 많은 개인정보 처리 방침 내용 ... */}
          <p className="text-sm text-gray-500 mt-8">
            본 개인정보 처리 방침은 2025년 7월 15일부터 적용됩니다.
          </p>
        </main>
      </div>
    </ProtectedRoute>
  );
}