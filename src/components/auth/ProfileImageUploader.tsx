// src/components/auth/ProfileImageUploader.tsx
import { ProfileImageUploaderProps } from '@/types/components/auth';
import { FaPencilAlt } from 'react-icons/fa';

export default function ProfileImageUploader({ profileImageFile, setProfileImageFile, previewUrl }: ProfileImageUploaderProps) {
  return (
    <div className="flex flex-col items-center">
      <div className="relative w-24 h-24 mb-2 group">
        <img
          src={previewUrl}
          alt="프로필 이미지"
          className="w-24 h-24 rounded-full object-cover border border-gray-200 bg-white transition-opacity duration-200 group-hover:opacity-80"
          style={{ aspectRatio: '1/1' }}
        />
        <label
          className="absolute bottom-2 right-2 bg-white rounded-full p-2 shadow cursor-pointer border border-gray-300 hover:bg-gray-50 transition flex items-center justify-center"
          title="프로필 이미지 변경"
          style={{ zIndex: 2 }}
        >
          <FaPencilAlt className="text-gray-600" />
          <input
            id="profileImage"
            name="profileImage"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => setProfileImageFile(e.target.files?.[0] || null)}
          />
        </label>
        <div className="absolute inset-0 rounded-full bg-black bg-opacity-10 pointer-events-none group-hover:bg-opacity-20 transition"></div>
      </div>
      <span className="text-xs text-gray-500">프로필 이미지는 선택사항입니다.</span>
    </div>
  );
}
