// src/app/terms/page.tsx
'use client';

import { useRouter } from 'next/navigation';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import { FaArrowLeft } from 'react-icons/fa';
import ModernScrollbar from '@/components/custom-scrollbar/ModernScrollbar';

export default function TermsPage() {
  const router = useRouter();

  return (
    <ProtectedRoute checkAuth={false}>
      <div className="app-container flex flex-col bg-gray-50 dark:bg-gray-900 min-h-screen">
        <header className="page-header flex items-center justify-between px-4 py-2 bg-white dark:bg-gray-800 shadow-sm">
        <button
            onClick={() => router.back()}
            className="page-back-button text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors"
            aria-label="뒤로가기"
            type="button"
          >
            <FaArrowLeft size={18} />
          </button>
          <h1 className="page-header-title text-lg font-semibold text-gray-800 dark:text-gray-100">
            서비스 이용 약관
          </h1>
          <div className="w-10" />
        </header>

        <main className="flex-1 overflow-y-auto p-6 text-gray-700 dark:text-gray-300 leading-relaxed">
          <ModernScrollbar className="w-full h-full">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">제1조 (목적)</h2>
            <p className="mb-4">
              본 약관은 UMO(이하 “회사”라 함)가 제공하는 우산 대여 서비스 및 관련 제반 서비스(이하 “서비스”라 함)의 이용과 관련하여 회사와 회원 간의 권리, 의무 및 책임사항, 기타 필요한 사항을 규정함을 목적으로 합니다.
            </p>

            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">제2조 (용어의 정의)</h2>
            <p className="mb-2">
              본 약관에서 사용하는 용어의 정의는 다음과 같습니다.
            </p>
            <ul className="list-disc list-inside mb-4 space-y-1">
              <li>“서비스”라 함은 구현되는 단말기(PC, 휴대형 단말기 등의 각종 유무선 장치를 포함)와 상관없이 회원이 이용할 수 있는 우산 대여 및 반납, 결제 등 회사가 제공하는 일체의 서비스를 의미합니다.</li>
              <li>“회원”이라 함은 회사의 서비스에 접속하여 본 약관에 따라 회사와 이용계약을 체결하고 회사가 제공하는 서비스를 이용하는 고객을 말합니다.</li>
              <li>“아이디”라 함은 회원의 식별과 서비스 이용을 위하여 회원이 정하고 회사가 승인하는 문자와 숫자의 조합을 의미합니다.</li>
              <li>“비밀번호”라 함은 회원이 부여받은 아이디와 일치되는 회원임을 확인하고 비밀보호를 위해 회원 자신이 정한 문자 또는 숫자의 조합을 의미합니다.</li>
              <li>“유료서비스”라 함은 회사가 유료로 제공하는 각종 온라인 디지털 콘텐츠 및 제반 서비스를 의미합니다.</li>
              <li>“포인트”라 함은 서비스의 효율적 이용을 위해 회사가 임의로 책정 또는 지급, 조정할 수 있는 재산적 가치가 없는 서비스 상의 가상 데이터를 의미합니다.</li>
              <li>“게시물”이라 함은 회원이 서비스를 이용함에 있어 서비스 상에 게시한 부호, 문자, 음성, 음향, 화상, 동영상 등의 정보 형태의 글, 사진, 동영상 및 각종 파일과 링크 등을 의미합니다.</li>
            </ul>

            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">제3조 (약관의 게시와 개정)</h2>
            <p className="mb-4">
              ① 회사는 이 약관의 내용을 회원이 쉽게 알 수 있도록 서비스 초기 화면에 게시합니다.
            </p>
            <p className="mb-4">
              ② 회사는 「약관의 규제에 관한 법률」, 「정보통신망 이용촉진 및 정보보호 등에 관한 법률」 등 관련 법령을 위배하지 않는 범위에서 이 약관을 개정할 수 있습니다.
            </p>
            <p className="mb-4">
              ③ 회사가 약관을 개정할 경우에는 적용일자 및 개정사유를 명시하여 현행 약관과 함께 서비스 초기 화면에 그 적용일자 7일 전부터 적용일자 전일까지 공지합니다. 다만, 회원에게 불리한 약관의 개정의 경우에는 최소 30일 이상의 유예기간을 두고 공지하며, 유예기간 중 개정 내용에 대한 회원의 동의 여부를 확인합니다.
            </p>
            <p className="mb-4">
              ④ 회원이 개정 약관의 적용에 동의하지 않는 경우 회사는 개정 약관의 내용을 적용할 수 없으며, 이 경우 회원은 이용계약을 해지할 수 있습니다. 다만, 기존 약관을 적용할 수 없는 특별한 사정이 있는 경우에는 회사는 이용계약을 해지할 수 있습니다.
            </p>

            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">제4조 (이용계약 체결)</h2>
            <p className="mb-4">
              ① 이용계약은 회원이 되고자 하는 자가 약관의 내용에 대하여 동의를 한 다음 회원가입신청을 하고 회사가 이러한 신청에 대하여 승낙함으로써 체결됩니다.
            </p>
            <p className="mb-4">
              ② 회사는 다음 각 호에 해당하는 신청에 대하여는 승낙을 하지 않거나 사후에 이용계약을 해지할 수 있습니다.
            </p>
            <ul className="list-disc list-inside mb-4 space-y-1">
              <li>가입신청자가 이 약관에 의하여 이전에 회원자격을 상실한 적이 있는 경우, 다만 회원자격 상실 후 1년이 경과한 자로서 회사의 회원 재가입 승낙을 얻은 경우에는 예외로 합니다.</li>
              <li>실명이 아니거나 타인의 명의를 이용한 경우</li>
              <li>허위의 정보를 기재하거나, 회사가 제시하는 내용을 기재하지 않은 경우</li>
              <li>이용자의 귀책사유로 인하여 승인이 불가능하거나 기타 이 약관에서 정한 제반 사항을 위반하며 신청하는 경우</li>
            </ul>
            <p className="mb-4">
              ③ 제1항에 따른 신청에 있어 회사는 전문기관을 통한 실명확인 및 본인인증을 요청할 수 있습니다.
            </p>
            <p className="mb-4">
              ④ 회사는 서비스 관련 설비의 여유가 없거나, 기술상 또는 업무상 문제가 있는 경우에는 승낙을 유보할 수 있습니다.
            </p>
            <p className="mb-4">
              ⑤ 이용계약의 성립 시기는 회사가 가입 완료를 신청자에게 통지한 시점으로 합니다.
            </p>

            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">제5조 (회원의 의무)</h2>
            <p className="mb-4">
              ① 회원은 회원정보를 정확히 기재하고, 변경 시 지체 없이 회사에 알려야 합니다.
            </p>
            <p className="mb-4">
              ② 회원은 자신의 아이디 및 비밀번호 관리에 책임이 있으며, 제3자가 이를 사용하도록 해서는 안 됩니다.
            </p>
            <p className="mb-4">
              ③ 회원은 서비스 이용 시 법령, 약관, 회사의 정책을 준수해야 하며, 타인의 권리를 침해하거나 서비스 운영을 방해하는 행위를 해서는 안 됩니다.
            </p>

            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">제6조 (서비스의 변경 및 중단)</h2>
            <p className="mb-4">
              ① 회사는 서비스의 개선, 운영 정책 변경, 시스템 유지보수 등 사유로 서비스의 전부 또는 일부를 변경하거나 중단할 수 있습니다.
            </p>
            <p className="mb-4">
              ② 서비스 변경이나 중단 시 회사는 사전에 공지하며, 긴급한 경우 사후에 공지할 수 있습니다.
            </p>
            <p className="mb-4">
              ③ 회사는 서비스 중단으로 인한 회원 또는 제3자의 손해에 대해 관련 법령이 정하는 범위 내에서 책임을 부담합니다.
            </p>

            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">제7조 (회원의 게시물)</h2>
            <p className="mb-4">
              ① 회원이 서비스 내에 게시한 게시물의 권리는 게시자에게 귀속됩니다. 다만 회사는 서비스 운영을 위해 필요한 경우 게시물을 이용할 수 있습니다.
            </p>
            <p className="mb-4">
              ② 회사는 게시물이 다음 각 호에 해당한다고 판단되는 경우 사전 통지 없이 삭제하거나 접근을 제한할 수 있습니다.
            </p>
            <ul className="list-disc list-inside mb-4 space-y-1">
              <li>타인의 권리 또는 명예를 침해하는 경우</li>
              <li>공서양속에 반하는 경우</li>
              <li>법령 또는 약관에 위반되는 경우</li>
              <li>기타 회사가 부적절하다고 판단하는 경우</li>
            </ul>

            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">제8조 (면책 조항)</h2>
            <p className="mb-4">
              ① 회사는 천재지변, 불가항력적 사유로 인한 서비스 장애에 대해 책임을 지지 않습니다.
            </p>
            <p className="mb-4">
              ② 회원의 귀책사유로 인한 서비스 이용 장애에 대해서도 회사는 책임을 지지 않습니다.
            </p>
            <p className="mb-4">
              ③ 회사는 회원 간 또는 회원과 제3자 간에 서비스를 매개로 발생한 분쟁에 대해 개입하거나 책임지지 않습니다.
            </p>

            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">제9조 (분쟁 해결)</h2>
            <p className="mb-4">
              본 약관과 관련한 분쟁은 대한민국 법령을 준거법으로 하며, 회사 본사 소재지를 관할하는 법원을 1심 관할 법원으로 합니다.
            </p>

            <p className="text-sm text-gray-500 dark:text-gray-400 mt-8">
              본 약관은 2025년 7월 15일부터 적용됩니다.
            </p>
          </ModernScrollbar>
        </main>
      </div>
    </ProtectedRoute>
  );
}
