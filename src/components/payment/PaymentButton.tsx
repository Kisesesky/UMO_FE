// src/components/payment/PaymentButton.tsx
'use client';

import { useEffect, useState } from 'react';
import { PaymentService } from '../../services/payment.service';
import { useWalletStore } from '../../store/wallet.store';

interface PaymentButtonProps {
  amount: number;
  onSuccess?: () => void;
  onFailure?: (error: any) => void;
}

export default function PaymentButton({ amount, onSuccess, onFailure }: PaymentButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { fetchWallet } = useWalletStore();

  // 포트원 SDK 스크립트 로드
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://cdn.iamport.kr/v1/iamport.js';
    script.async = true;
    document.body.appendChild(script);
    
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handlePayment = async () => {
    if (amount <= 0) {
      alert('충전 금액을 입력해주세요.');
      return;
    }

    setIsLoading(true);
    try {
      // 포트원 결제 모듈 초기화
      const { IMP } = window as any;
      if (!IMP) {
        throw new Error('포트원 결제 모듈을 불러오는데 실패했습니다.');
      }
      
      IMP.init('YOUR_PORTONE_SHOP_ID'); // 실제 상점 ID로 변경 필요
      
      // 결제 요청
      IMP.request_pay({
        pg: 'html5_inicis', // 결제 PG사 (실제 사용할 PG사로 변경 필요)
        pay_method: 'card', // 결제 수단
        merchant_uid: `order_${Date.now()}`, // 주문번호
        name: `츄르 충전 (${amount}원)`, // 주문명
        amount: amount, // 결제 금액
        buyer_email: 'user@example.com', // 구매자 이메일
        buyer_name: '사용자', // 구매자 이름
      }, async (response: any) => {
        // 결제 결과 처리
        if (response.success) {
          // 결제 성공 시 백엔드 검증 요청
          try {
            const verifyResponse = await PaymentService.verifyPayment({
              imp_uid: response.imp_uid,
              merchant_uid: response.merchant_uid,
              amount: amount,
            });

            if (verifyResponse.success) {
              // 지갑 정보 갱신
              await fetchWallet();
              onSuccess && onSuccess();
              alert('츄르 충전이 완료되었습니다!');
            } else {
              onFailure && onFailure(new Error(verifyResponse.message));
              alert(`결제 검증 실패: ${verifyResponse.message}`);
            }
          } catch (error: any) {
            onFailure && onFailure(error);
            alert(`결제 검증 중 오류 발생: ${error.message || '알 수 없는 오류가 발생했습니다.'}`);
          }
        } else {
          onFailure && onFailure(new Error(response.error_msg));
          alert(`결제 실패: ${response.error_msg}`);
        }
        setIsLoading(false);
      });
    } catch (error: any) {
      setIsLoading(false);
      onFailure && onFailure(error);
      alert(`결제 오류: ${error.message || '알 수 없는 오류가 발생했습니다.'}`);
    }
  };

  return (
    <button
      onClick={handlePayment}
      disabled={isLoading || amount <= 0}
      className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white ${
        isLoading || amount <= 0 ? 'bg-indigo-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'
      } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
    >
      {isLoading ? '결제 처리 중...' : '결제하기'}
    </button>
  );
}