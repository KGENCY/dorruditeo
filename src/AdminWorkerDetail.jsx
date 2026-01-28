import React, { useState } from 'react';
import { ArrowLeft, User, Briefcase, Phone, Mail, MapPin, FileText, Upload, Download, Eye, X, Calendar, Clock, Edit3, Save, Building2, IdCard } from 'lucide-react';

const AdminWorkerDetail = ({ worker, onClose }) => {
  const [documents, setDocuments] = useState([
    { id: 1, name: '근로계약서.pdf', type: '계약서', uploadDate: '2025-12-01', size: '1.2MB' },
    { id: 2, name: '개인정보동의서.pdf', type: '동의서', uploadDate: '2025-12-01', size: '0.8MB' },
    { id: 3, name: '건강검진결과.pdf', type: '건강검진', uploadDate: '2026-01-15', size: '2.1MB' },
    { id: 4, name: '장애인등록증.pdf', type: '신분증', uploadDate: '2025-12-01', size: '0.5MB' },
    { id: 5, name: '이력서.pdf', type: '이력서', uploadDate: '2025-11-28', size: '0.9MB' },
  ]);

  const [showUploadModal, setShowUploadModal] = useState(false);
  const [isEditingWorkTime, setIsEditingWorkTime] = useState(false);
  const [editedWorkTime, setEditedWorkTime] = useState({
    date: '2026-01-28',
    checkin: '09:00',
    checkout: '18:00',
    workDone: '제품 검수 완료'
  });

  const [attendanceHistory, setAttendanceHistory] = useState([
    { date: '2026-01-28', checkin: '09:00', checkout: '18:00', status: '정상', workDone: '제품 검수 완료' },
    { date: '2026-01-27', checkin: '09:05', checkout: '18:10', status: '정상', workDone: '포장 작업' },
    { date: '2026-01-26', checkin: '09:00', checkout: '17:55', status: '정상', workDone: '재고 정리' },
    { date: '2026-01-25', checkin: '-', checkout: '-', status: '휴가', workDone: '-' },
    { date: '2026-01-24', checkin: '09:10', checkout: '18:00', status: '지각', workDone: '품질 검사' },
  ]);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const newDoc = {
        id: documents.length + 1,
        name: file.name,
        type: '기타',
        uploadDate: new Date().toISOString().split('T')[0],
        size: `${(file.size / 1024 / 1024).toFixed(1)}MB`
      };
      setDocuments([...documents, newDoc]);
      setShowUploadModal(false);
    }
  };

  const handleEditWorkTime = (record) => {
    setEditedWorkTime(record);
    setIsEditingWorkTime(true);
  };

  const handleSaveWorkTime = () => {
    setAttendanceHistory(attendanceHistory.map(record =>
      record.date === editedWorkTime.date ? editedWorkTime : record
    ));
    setIsEditingWorkTime(false);
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
              <h1 className="text-xl font-bold text-gray-900">근로자 상세 정보</h1>
              <p className="text-xs text-gray-500">관리자 모드</p>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* 왼쪽: 기본 정보 */}
          <div className="space-y-6">
            {/* 프로필 카드 */}
            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <div className="text-center mb-6">
                <div className="w-24 h-24 bg-duru-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl font-bold text-duru-orange-600">{worker.name[0]}</span>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-1">{worker.name}</h2>
                <p className="text-gray-600">{worker.position}</p>
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mt-2 ${
                  worker.status === '근무중' ? 'bg-green-100 text-green-700' :
                  worker.status === '휴직' ? 'bg-yellow-100 text-yellow-700' :
                  'bg-gray-200 text-gray-700'
                }`}>
                  {worker.status}
                </span>
              </div>

              <div className="space-y-3 border-t border-gray-200 pt-6">
                <div className="flex items-center gap-3 text-sm">
                  <Building2 className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-600">소속 회사:</span>
                  <span className="font-semibold text-gray-900">{worker.company}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Phone className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-600">전화번호:</span>
                  <span className="font-semibold text-gray-900">010-{Math.floor(Math.random() * 10000).toString().padStart(4, '0')}-{Math.floor(Math.random() * 10000).toString().padStart(4, '0')}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Mail className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-600">이메일:</span>
                  <span className="font-semibold text-gray-900">{worker.name.toLowerCase()}@company.com</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <MapPin className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-600">주소:</span>
                  <span className="font-semibold text-gray-900">서울시 강남구</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Briefcase className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-600">입사일:</span>
                  <span className="font-semibold text-gray-900">{worker.hireDate}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <IdCard className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-600">장애 유형:</span>
                  <span className="font-semibold text-gray-900">{worker.disability}</span>
                </div>
              </div>
            </div>

            {/* 계약 정보 */}
            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                <FileText className="w-5 h-5 text-duru-orange-600" />
                계약 정보
              </h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">계약 기간</span>
                  <span className="font-semibold text-gray-900">{worker.contractStart} ~ {worker.contractEnd}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">시급</span>
                  <span className="font-semibold text-gray-900">9,860원</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">근무 시간</span>
                  <span className="font-semibold text-gray-900">주 40시간</span>
                </div>
              </div>
            </div>

            {/* 이번 달 통계 */}
            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-duru-orange-600" />
                이번 달 통계
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-duru-orange-50 rounded-lg p-3">
                  <p className="text-xs text-gray-600 mb-1">출근일</p>
                  <p className="text-2xl font-bold text-duru-orange-600">20일</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-xs text-gray-600 mb-1">결근</p>
                  <p className="text-2xl font-bold text-gray-900">0일</p>
                </div>
                <div className="bg-blue-50 rounded-lg p-3">
                  <p className="text-xs text-gray-600 mb-1">휴가</p>
                  <p className="text-2xl font-bold text-blue-600">1일</p>
                </div>
                <div className="bg-green-50 rounded-lg p-3">
                  <p className="text-xs text-gray-600 mb-1">출근율</p>
                  <p className="text-2xl font-bold text-green-600">100%</p>
                </div>
              </div>
            </div>
          </div>

          {/* 오른쪽: 상세 정보 */}
          <div className="lg:col-span-2 space-y-6">
            {/* 문서 관리 */}
            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-duru-orange-600" />
                  문서 관리
                </h3>
                <button
                  onClick={() => setShowUploadModal(true)}
                  className="px-4 py-2 bg-duru-orange-500 text-white rounded-lg font-semibold hover:bg-duru-orange-600 transition-colors flex items-center gap-2"
                >
                  <Upload className="w-4 h-4" />
                  파일 업로드
                </button>
              </div>

              <div className="space-y-3">
                {documents.map(doc => (
                  <div key={doc.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                        <FileText className="w-5 h-5 text-red-600" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">{doc.name}</p>
                        <p className="text-xs text-gray-600">{doc.type} · {doc.uploadDate} · {doc.size}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button className="p-2 hover:bg-white rounded-lg transition-colors" title="미리보기">
                        <Eye className="w-4 h-4 text-gray-600" />
                      </button>
                      <button className="p-2 hover:bg-white rounded-lg transition-colors" title="다운로드">
                        <Download className="w-4 h-4 text-gray-600" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 출퇴근 기록 (수정 가능) */}
            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <Clock className="w-5 h-5 text-duru-orange-600" />
                최근 출퇴근 기록
                <span className="text-xs font-normal text-gray-500 ml-2">(클릭하여 수정 가능)</span>
              </h3>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">날짜</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">출근</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">퇴근</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">상태</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">업무 내용</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">수정</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {attendanceHistory.map((record, idx) => (
                      <tr key={idx} className="hover:bg-gray-50">
                        <td className="px-4 py-3 text-gray-900">{record.date}</td>
                        <td className="px-4 py-3 text-gray-900">{record.checkin}</td>
                        <td className="px-4 py-3 text-gray-900">{record.checkout}</td>
                        <td className="px-4 py-3">
                          <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                            record.status === '정상' ? 'bg-green-100 text-green-700' :
                            record.status === '지각' ? 'bg-yellow-100 text-yellow-700' :
                            record.status === '휴가' ? 'bg-blue-100 text-blue-700' :
                            'bg-red-100 text-red-700'
                          }`}>
                            {record.status}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-gray-600 text-sm">{record.workDone}</td>
                        <td className="px-4 py-3">
                          <button
                            onClick={() => handleEditWorkTime(record)}
                            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                            title="수정"
                          >
                            <Edit3 className="w-4 h-4 text-gray-600" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 파일 업로드 모달 */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900">파일 업로드</h3>
              <button
                onClick={() => setShowUploadModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">문서 종류</label>
                <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-duru-orange-500">
                  <option>근로계약서</option>
                  <option>동의서</option>
                  <option>건강검진</option>
                  <option>자격증</option>
                  <option>장애인등록증</option>
                  <option>이력서</option>
                  <option>기타</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">파일 선택</label>
                <input
                  type="file"
                  onChange={handleFileUpload}
                  accept=".pdf,.jpg,.jpeg,.png"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-duru-orange-500"
                />
                <p className="text-xs text-gray-500 mt-2">PDF, JPG, PNG 파일만 업로드 가능 (최대 10MB)</p>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => setShowUploadModal(false)}
                  className="flex-1 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
                >
                  취소
                </button>
                <button
                  onClick={handleFileUpload}
                  className="flex-1 py-3 bg-duru-orange-500 text-white rounded-lg font-semibold hover:bg-duru-orange-600 transition-colors"
                >
                  업로드
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 근무시간 수정 모달 */}
      {isEditingWorkTime && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900">근무시간 수정</h3>
              <button
                onClick={() => setIsEditingWorkTime(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">날짜</label>
                <input
                  type="text"
                  value={editedWorkTime.date}
                  disabled
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">출근 시간</label>
                <input
                  type="time"
                  value={editedWorkTime.checkin}
                  onChange={(e) => setEditedWorkTime({...editedWorkTime, checkin: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-duru-orange-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">퇴근 시간</label>
                <input
                  type="time"
                  value={editedWorkTime.checkout}
                  onChange={(e) => setEditedWorkTime({...editedWorkTime, checkout: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-duru-orange-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">업무 내용</label>
                <textarea
                  value={editedWorkTime.workDone}
                  onChange={(e) => setEditedWorkTime({...editedWorkTime, workDone: e.target.value})}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-duru-orange-500"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => setIsEditingWorkTime(false)}
                  className="flex-1 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
                >
                  취소
                </button>
                <button
                  onClick={handleSaveWorkTime}
                  className="flex-1 py-3 bg-duru-orange-500 text-white rounded-lg font-semibold hover:bg-duru-orange-600 transition-colors flex items-center justify-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  저장
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminWorkerDetail;