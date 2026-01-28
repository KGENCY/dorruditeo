import React, { useState } from 'react';
import { ArrowLeft, Building2, Phone, Mail, Users, FileText, Send, CheckCircle2 } from 'lucide-react';

const CompanyInquiry = ({ onClose }) => {
  const [step, setStep] = useState('form'); // form, complete
  const [formData, setFormData] = useState({
    companyName: '',
    businessNumber: '',
    contactName: '',
    phone: '',
    email: '',
    employeeCount: '',
    position: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // 실제로는 서버에 전송
    setStep('complete');
  };

  const isFormValid = () => {
    return formData.companyName &&
           formData.contactName &&
           formData.phone &&
           formData.email &&
           formData.message;
  };

  // 완료 페이지
  if (step === 'complete') {
    return (
      <div className="min-h-screen bg-duru-ivory flex items-center justify-center p-4">
        <div className="w-full max-w-2xl">
          <div className="bg-white rounded-2xl shadow-lg p-12 border border-duru-orange-100 text-center">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-green-100 rounded-full mb-6">
              <CheckCircle2 className="w-12 h-12 text-green-600" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              문의가 접수되었습니다
            </h1>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              빠른 시일 내에 담당자가 연락드리겠습니다.<br />
              보다 자세한 상담을 원하시면 1588-0000으로 연락주세요.
            </p>

            <div className="bg-duru-orange-50 rounded-xl p-6 mb-8">
              <h3 className="font-bold text-gray-900 mb-2">접수 정보</h3>
              <div className="text-left space-y-2 text-gray-700">
                <p><span className="font-semibold">기업명:</span> {formData.companyName}</p>
                <p><span className="font-semibold">담당자:</span> {formData.contactName}</p>
                <p><span className="font-semibold">연락처:</span> {formData.phone}</p>
                <p><span className="font-semibold">이메일:</span> {formData.email}</p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="w-full py-4 bg-duru-orange-500 text-white rounded-lg font-bold text-lg hover:bg-duru-orange-600 transition-colors"
            >
              메인으로 돌아가기
            </button>
          </div>
        </div>
      </div>
    );
  }

  // 문의 폼 페이지
  return (
    <div className="min-h-screen bg-duru-ivory">
      <div className="max-w-4xl mx-auto p-4 sm:p-8">
        <button
          onClick={onClose}
          className="mb-6 flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          메인으로 돌아가기
        </button>

        <div className="bg-white rounded-2xl shadow-lg p-8 sm:p-12 border border-duru-orange-100">
          {/* 헤더 */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-duru-orange-100 rounded-full mb-4">
              <Building2 className="w-10 h-10 text-duru-orange-600" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-3">기업 채용 문의</h1>
            <p className="text-lg text-gray-600">
              장애인 근로자 채용에 관심있으신 기업을 환영합니다.<br />
              아래 정보를 입력해주시면 빠르게 연락드리겠습니다.
            </p>
          </div>

          {/* 폼 */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* 기업 정보 섹션 */}
            <div className="bg-duru-orange-50 rounded-xl p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Building2 className="w-5 h-5 text-duru-orange-600" />
                기업 정보
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    기업명 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleChange}
                    placeholder="(주)두루빛"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-duru-orange-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    사업자등록번호
                  </label>
                  <input
                    type="text"
                    name="businessNumber"
                    value={formData.businessNumber}
                    onChange={handleChange}
                    placeholder="123-45-67890"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-duru-orange-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            {/* 담당자 정보 섹션 */}
            <div className="bg-gray-50 rounded-xl p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Users className="w-5 h-5 text-gray-700" />
                담당자 정보
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    담당자명 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="contactName"
                    value={formData.contactName}
                    onChange={handleChange}
                    placeholder="홍길동"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-duru-orange-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    부서/직책
                  </label>
                  <input
                    type="text"
                    name="position"
                    value={formData.position}
                    onChange={handleChange}
                    placeholder="인사팀 과장"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-duru-orange-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    연락처 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="010-0000-0000"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-duru-orange-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    이메일 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="example@company.com"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-duru-orange-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            {/* 채용 정보 섹션 */}
            <div className="bg-duru-orange-50 rounded-xl p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <FileText className="w-5 h-5 text-duru-orange-600" />
                채용 정보
              </h2>
              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    희망 채용 인원
                  </label>
                  <select
                    name="employeeCount"
                    value={formData.employeeCount}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-duru-orange-500 focus:border-transparent"
                  >
                    <option value="">선택해주세요</option>
                    <option value="1-5">1~5명</option>
                    <option value="6-10">6~10명</option>
                    <option value="11-20">11~20명</option>
                    <option value="21+">21명 이상</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  문의 내용 <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="채용하고자 하는 직무, 근무 조건, 궁금하신 점 등을 자유롭게 작성해주세요."
                  rows={6}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-duru-orange-500 focus:border-transparent resize-none"
                />
              </div>
            </div>

            {/* 제출 버튼 */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={!isFormValid()}
                className="w-full py-4 bg-duru-orange-500 text-white rounded-lg font-bold text-lg hover:bg-duru-orange-600 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                <Send className="w-5 h-5" />
                문의 접수하기
              </button>
              <p className="text-sm text-gray-500 text-center mt-3">
                <span className="text-red-500">*</span> 표시는 필수 입력 항목입니다
              </p>
            </div>
          </form>
        </div>

        {/* 추가 안내 */}
        <div className="mt-8 bg-white rounded-xl p-6 border border-gray-200">
          <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
            <Phone className="w-5 h-5 text-duru-orange-600" />
            빠른 상담이 필요하신가요?
          </h3>
          <p className="text-gray-600 mb-3">
            전화나 이메일로 직접 문의하실 수 있습니다.
          </p>
          <div className="space-y-2 text-gray-700">
            <p className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-duru-orange-600" />
              <span className="font-semibold">전화:</span> 1588-0000
            </p>
            <p className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-duru-orange-600" />
              <span className="font-semibold">이메일:</span> contact@durubitter.com
            </p>
            <p className="text-sm text-gray-500 mt-2">
              평일 09:00 - 18:00 (주말 및 공휴일 휴무)
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyInquiry;