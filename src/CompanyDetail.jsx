import React, { useState } from 'react';
import { ArrowLeft, Building2, Phone, Mail, MapPin, User, Calendar, DollarSign, Users, FileText, TrendingUp, Clock, Edit3, Save, X, Upload, Download, Trash2, Paperclip, Eye, Hash } from 'lucide-react';

const CompanyDetail = ({ company, onClose }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedInfo, setEditedInfo] = useState({
    contact: '홍길동',
    phone: '02-1234-5678',
    email: 'contact@company.com',
    address: '서울시 강남구 테헤란로 123'
  });

  const workers = [
    { id: 1, name: '김민수', phone: '010-1234-5678', hireDate: '2025-06-15', status: '근무중', disability: '지체장애' },
    { id: 2, name: '이영희', phone: '010-2345-6789', hireDate: '2025-07-01', status: '근무중', disability: '청각장애' },
    { id: 3, name: '박철수', phone: '010-3456-7890', hireDate: '2025-08-10', status: '근무중', disability: '시각장애' },
    { id: 4, name: '정수진', phone: '010-4567-8901', hireDate: '2025-09-01', status: '근무중', disability: '지적장애' },
  ];

  const uploadedFiles = [
    { id: 1, name: '두루빛터_위탁계약서_2025.pdf', uploadDate: '2025-06-01', size: '2.4 MB' },
    { id: 2, name: '개인정보처리위탁_동의서.pdf', uploadDate: '2025-06-01', size: '1.1 MB' },
    { id: 3, name: '근로자_배치계획서_2026.pdf', uploadDate: '2026-01-10', size: '850 KB' },
  ];

  const contracts = [
    { id: 1, type: '월간 정산', period: '2026-01', amount: 12800000, status: '완료', date: '2026-02-05' },
    { id: 2, type: '월간 정산', period: '2025-12', amount: 12500000, status: '완료', date: '2026-01-05' },
    { id: 3, type: '월간 정산', period: '2025-11', amount: 12300000, status: '완료', date: '2025-12-05' },
  ];

  const handleSaveEdit = () => {
    setIsEditing(false);
    // 실제로는 서버에 저장
  };

  return (
    <div className="min-h-screen bg-duru-ivory">
      {/* 헤더 */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 h-16">
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </button>
            <div>
              <h1 className="text-xl font-bold text-gray-900">회사 상세 정보</h1>
              <p className="text-xs text-gray-500">관리자 모드</p>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* 왼쪽: 기본 정보 */}
          <div className="space-y-6">
            {/* 회사 프로필 카드 */}
            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <div className="text-center mb-6">
                <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Building2 className="w-12 h-12 text-blue-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-1">{company.name}</h2>
                <p className="text-gray-600">{company.industry || '제조업'}</p>
                <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold mt-2 bg-green-100 text-green-700">
                  활성
                </span>
              </div>

              <div className="space-y-3 border-t border-gray-200 pt-6">
                <div className="flex items-start gap-3 text-sm">
                  <User className="w-4 h-4 text-gray-400 mt-0.5" />
                  <div className="flex-1">
                    <span className="text-gray-600 block">담당자:</span>
                    {isEditing ? (
                      <input
                        type="text"
                        value={editedInfo.contact}
                        onChange={(e) => setEditedInfo({...editedInfo, contact: e.target.value})}
                        className="w-full mt-1 px-2 py-1 border border-gray-300 rounded"
                      />
                    ) : (
                      <span className="font-semibold text-gray-900">{editedInfo.contact}</span>
                    )}
                  </div>
                </div>
                <div className="flex items-start gap-3 text-sm">
                  <Phone className="w-4 h-4 text-gray-400 mt-0.5" />
                  <div className="flex-1">
                    <span className="text-gray-600 block">전화번호:</span>
                    {isEditing ? (
                      <input
                        type="text"
                        value={editedInfo.phone}
                        onChange={(e) => setEditedInfo({...editedInfo, phone: e.target.value})}
                        className="w-full mt-1 px-2 py-1 border border-gray-300 rounded"
                      />
                    ) : (
                      <span className="font-semibold text-gray-900">{editedInfo.phone}</span>
                    )}
                  </div>
                </div>
                <div className="flex items-start gap-3 text-sm">
                  <Mail className="w-4 h-4 text-gray-400 mt-0.5" />
                  <div className="flex-1">
                    <span className="text-gray-600 block">이메일:</span>
                    {isEditing ? (
                      <input
                        type="email"
                        value={editedInfo.email}
                        onChange={(e) => setEditedInfo({...editedInfo, email: e.target.value})}
                        className="w-full mt-1 px-2 py-1 border border-gray-300 rounded"
                      />
                    ) : (
                      <span className="font-semibold text-gray-900">{editedInfo.email}</span>
                    )}
                  </div>
                </div>
                <div className="flex items-start gap-3 text-sm">
                  <MapPin className="w-4 h-4 text-gray-400 mt-0.5" />
                  <div className="flex-1">
                    <span className="text-gray-600 block">주소:</span>
                    {isEditing ? (
                      <textarea
                        value={editedInfo.address}
                        onChange={(e) => setEditedInfo({...editedInfo, address: e.target.value})}
                        rows={2}
                        className="w-full mt-1 px-2 py-1 border border-gray-300 rounded"
                      />
                    ) : (
                      <span className="font-semibold text-gray-900">{editedInfo.address}</span>
                    )}
                  </div>
                </div>
                {/* 구분선 */}
                <div className="border-t border-gray-200 my-3"></div>

                <div className="flex items-center gap-3 text-sm">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  <div className="flex-1">
                    <span className="text-gray-600 block">계약 시작일:</span>
                    <span className="font-semibold text-gray-900">{company.joinDate || '2025-06-01'}</span>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Hash className="w-4 h-4 text-gray-400" />
                  <div className="flex-1">
                    <span className="text-gray-600 block">기업 고유 번호:</span>
                    <span className="font-semibold text-gray-900 font-mono tracking-wide">{company.adminId || 'DRT-2025-0001'}</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200">
                {isEditing ? (
                  <div className="flex gap-2">
                    <button
                      onClick={() => setIsEditing(false)}
                      className="flex-1 py-2 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
                    >
                      취소
                    </button>
                    <button
                      onClick={handleSaveEdit}
                      className="flex-1 py-2 bg-duru-orange-500 text-white rounded-lg font-semibold hover:bg-duru-orange-600 transition-colors flex items-center justify-center gap-2"
                    >
                      <Save className="w-4 h-4" />
                      저장
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="w-full py-2 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200 transition-colors flex items-center justify-center gap-2"
                  >
                    <Edit3 className="w-4 h-4" />
                    정보 수정
                  </button>
                )}
              </div>
            </div>

            {/* 통계 카드 */}
            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-duru-orange-600" />
                주요 지표
              </h3>
              <div className="space-y-4">
                <div className="bg-blue-50 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-600">근로자 수</span>
                    <Users className="w-4 h-4 text-blue-600" />
                  </div>
                  <p className="text-2xl font-bold text-blue-600">{company.workerCount}명</p>
                </div>
                <div className="bg-green-50 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-600">평균 출근율</span>
                    <Clock className="w-4 h-4 text-green-600" />
                  </div>
                  <p className="text-2xl font-bold text-green-600">97.8%</p>
                </div>
                <div className="bg-orange-50 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-600">이번 달 정산</span>
                    <DollarSign className="w-4 h-4 text-orange-600" />
                  </div>
                  <p className="text-2xl font-bold text-orange-600">{(company.monthlyRevenue || 12800000).toLocaleString()}원</p>
                </div>
              </div>
            </div>
          </div>

          {/* 오른쪽: 상세 정보 */}
          <div className="lg:col-span-2 space-y-6">
            {/* 근로자 목록 */}
            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <Users className="w-5 h-5 text-duru-orange-600" />
                소속 근로자
              </h3>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">이름</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">전화번호</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">입사일</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">장애유형</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">상태</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {workers.map((worker) => (
                      <tr key={worker.id} className="hover:bg-gray-50">
                        <td className="px-4 py-3 text-gray-900 font-medium">{worker.name}</td>
                        <td className="px-4 py-3 text-gray-600">{worker.phone}</td>
                        <td className="px-4 py-3 text-gray-600">{worker.hireDate}</td>
                        <td className="px-4 py-3 text-gray-600">{worker.disability}</td>
                        <td className="px-4 py-3">
                          <span className="px-2 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700">
                            {worker.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* 계약서 및 첨부 파일 */}
            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <div className="mb-6">
                <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  <Paperclip className="w-5 h-5 text-duru-orange-600" />
                  계약서 및 첨부 파일
                </h3>
                <p className="text-xs text-gray-500 mt-1 ml-7">해당 기업과 관련된 계약서 및 내부 자료를 관리합니다</p>
              </div>

              {/* 업로드 영역 */}
              <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-duru-orange-400 transition-colors cursor-pointer mb-6">
                <Upload className="w-8 h-8 text-gray-400 mx-auto mb-3" />
                <p className="text-sm text-gray-600 mb-3">PDF 파일을 드래그하거나 클릭하여 업로드</p>
                <button className="px-4 py-2 bg-duru-orange-500 text-white text-sm font-semibold rounded-lg hover:bg-duru-orange-600 transition-colors">
                  파일 선택
                </button>
              </div>

              {/* 업로드된 파일 리스트 */}
              <div className="space-y-2">
                {uploadedFiles.map((file) => (
                  <div key={file.id} className="flex items-center gap-3 px-4 py-3 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors">
                    <div className="w-9 h-9 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <FileText className="w-4 h-4 text-red-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">{file.name}</p>
                      <p className="text-xs text-gray-500">{file.uploadDate} · {file.size}</p>
                    </div>
                    <div className="flex items-center gap-1 flex-shrink-0">
                      <button className="p-2 hover:bg-white rounded-lg transition-colors" title="보기">
                        <Eye className="w-4 h-4 text-gray-500" />
                      </button>
                      <button className="p-2 hover:bg-white rounded-lg transition-colors" title="다운로드">
                        <Download className="w-4 h-4 text-gray-500" />
                      </button>
                      <button className="p-2 hover:bg-white rounded-lg transition-colors" title="삭제">
                        <Trash2 className="w-4 h-4 text-gray-400" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 정산 내역 */}
            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <FileText className="w-5 h-5 text-duru-orange-600" />
                정산 내역
              </h3>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">구분</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">기간</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">금액</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">상태</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">처리일</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {contracts.map((contract) => (
                      <tr key={contract.id} className="hover:bg-gray-50">
                        <td className="px-4 py-3 text-gray-900">{contract.type}</td>
                        <td className="px-4 py-3 text-gray-600">{contract.period}</td>
                        <td className="px-4 py-3 text-gray-900 font-semibold">{contract.amount.toLocaleString()}원</td>
                        <td className="px-4 py-3">
                          <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                            contract.status === '완료' ? 'bg-green-100 text-green-700' :
                            contract.status === '대기' ? 'bg-yellow-100 text-yellow-700' :
                            'bg-gray-100 text-gray-700'
                          }`}>
                            {contract.status}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-gray-600">{contract.date}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyDetail;