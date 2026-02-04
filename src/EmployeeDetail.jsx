import React, { useState } from 'react';
import { ArrowLeft, User, Briefcase, Phone, Mail, MapPin, FileText, Upload, Download, Eye, X, Calendar, Clock, Shield, Hash, IdCard, Heart, Users as UserIcon, Edit2, Check, UserX, AlertTriangle } from 'lucide-react';

const EmployeeDetail = ({ employee, onClose, onResign }) => {
  const [documents, setDocuments] = useState([
    { id: 1, name: '근로계약서.pdf', type: '계약서', uploadDate: '2025-12-01', size: '1.2MB' },
    { id: 2, name: '개인정보동의서.pdf', type: '동의서', uploadDate: '2025-12-01', size: '0.8MB' },
    { id: 3, name: '건강검진결과.pdf', type: '건강검진', uploadDate: '2026-01-15', size: '2.1MB' },
  ]);

  const [showUploadModal, setShowUploadModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  // 근무 정보
  const [workDays, setWorkDays] = useState(['월', '화', '수', '목', '금']);
  const [workStartTime, setWorkStartTime] = useState('09:00');
  const [isEditingWorkInfo, setIsEditingWorkInfo] = useState(false);
  const [tempWorkDays, setTempWorkDays] = useState([]);
  const [tempWorkStartTime, setTempWorkStartTime] = useState('');

  const attendanceHistory = [
    { date: '2026-01-28', checkin: '09:00', checkout: '18:00', status: '정상', workDone: '제품 검수 완료' },
    { date: '2026-01-27', checkin: '09:05', checkout: '18:10', status: '정상', workDone: '포장 작업' },
    { date: '2026-01-26', checkin: '09:00', checkout: '17:55', status: '정상', workDone: '재고 정리' },
    { date: '2026-01-25', checkin: '-', checkout: '-', status: '휴가', workDone: '-' },
    { date: '2026-01-24', checkin: '09:10', checkout: '18:00', status: '지각', workDone: '품질 검사' },
  ];

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
      setSelectedFile(null);
    }
  };

  const handleEditWorkInfo = () => {
    setTempWorkDays([...workDays]);
    setTempWorkStartTime(workStartTime);
    setIsEditingWorkInfo(true);
  };

  const handleSaveWorkInfo = () => {
    setWorkDays([...tempWorkDays]);
    setWorkStartTime(tempWorkStartTime);
    setIsEditingWorkInfo(false);
  };

  const handleCancelEditWorkInfo = () => {
    setIsEditingWorkInfo(false);
    setTempWorkDays([]);
    setTempWorkStartTime('');
  };

  const toggleTempWorkDay = (day) => {
    if (tempWorkDays.includes(day)) {
      setTempWorkDays(tempWorkDays.filter(d => d !== day));
    } else {
      setTempWorkDays([...tempWorkDays, day]);
    }
  };

  // 퇴사 등록 관련 상태
  const [showResignModal, setShowResignModal] = useState(false);
  const [resignForm, setResignForm] = useState({
    date: new Date().toISOString().split('T')[0],
    reason: ''
  });

  const handleResignSubmit = () => {
    if (!resignForm.date) return;
    if (onResign) {
      onResign(employee.id, resignForm.date, resignForm.reason);
    }
    setShowResignModal(false);
    setResignForm({ date: new Date().toISOString().split('T')[0], reason: '' });
    alert('퇴사 등록이 완료되었습니다.');
    onClose();
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
                  <span className="text-3xl font-bold text-duru-orange-600">{employee.name[0]}</span>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-1">{employee.name}</h2>
                <p className="text-gray-600">{employee.department}</p>
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mt-2 ${
                  employee.isResigned ? 'bg-gray-200 text-gray-600' :
                  employee.status === 'checkin' ? 'bg-duru-orange-100 text-duru-orange-700' :
                  employee.status === 'checkout' ? 'bg-gray-200 text-gray-700' :
                  'bg-red-100 text-red-700'
                }`}>
                  {employee.isResigned ? '퇴사' : employee.status === 'checkin' ? '출근 중' : employee.status === 'checkout' ? '퇴근' : '결근'}
                </span>
              </div>

              <div className="space-y-3 border-t border-gray-200 pt-6">
                <div className="flex items-center gap-3 text-sm">
                  <IdCard className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-600">주민번호:</span>
                  <span className="font-semibold text-gray-900">123456-1234567</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Phone className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-600">핸드폰번호:</span>
                  <span className="font-semibold text-gray-900">010-1234-5678</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Heart className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-600">비상연락처:</span>
                  <span className="font-semibold text-gray-900">010-9876-5432 (부모)</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <UserIcon className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-600">성별:</span>
                  <span className="font-semibold text-gray-900">남</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Briefcase className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-600">입사일:</span>
                  <span className="font-semibold text-gray-900">2025-12-01</span>
                </div>
              </div>
            </div>

            {/* 근로자 고유번호 */}
            <div className="bg-duru-orange-50 rounded-xl p-6 border border-duru-orange-200">
              <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Hash className="w-5 h-5 text-duru-orange-600" />
                근로자 고유번호
              </h3>
              <div className="bg-white rounded-lg p-4 border border-duru-orange-300">
                <p className="text-2xl font-bold text-duru-orange-600 text-center tracking-wider">
                  WK-2025-001
                </p>
              </div>
            </div>

            {/* 장애 정보 */}
            <div className="bg-white rounded-xl p-4 border border-gray-200">
              <h3 className="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
                <Shield className="w-4 h-4 text-duru-orange-600" />
                장애 정보
              </h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-600">유형 및 등급</span>
                  <span className="font-bold text-gray-900">지체장애 3급</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-600">중증/경증</span>
                  <span className="inline-block px-2 py-0.5 rounded-full text-xs font-bold bg-blue-100 text-blue-700">
                    경증
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-600">인정일</span>
                  <span className="font-bold text-gray-900">2020-03-15</span>
                </div>
              </div>
            </div>

            {/* 퇴사 정보 (퇴사자인 경우) */}
            {employee.isResigned && (
              <div className="bg-gray-100 rounded-xl p-4 border border-gray-300">
                <h3 className="text-sm font-bold text-gray-700 mb-3 flex items-center gap-2">
                  <UserX className="w-4 h-4 text-gray-500" />
                  퇴사 정보
                </h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-600">퇴사일</span>
                    <span className="font-bold text-gray-700">{employee.resignDate}</span>
                  </div>
                  {employee.resignReason && (
                    <div className="text-xs">
                      <span className="text-gray-600">비고</span>
                      <p className="mt-1 p-2 bg-white rounded border border-gray-200 text-gray-700">{employee.resignReason}</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* 퇴사 등록 버튼 (현재 근로자인 경우) */}
            {!employee.isResigned && (
              <button
                onClick={() => setShowResignModal(true)}
                className="w-full py-3 bg-red-50 text-red-600 rounded-xl font-semibold hover:bg-red-100 transition-colors flex items-center justify-center gap-2 border border-red-200"
              >
                <UserX className="w-5 h-5" />
                퇴사 등록
              </button>
            )}
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

            {/* 근무 정보 */}
            <div className="bg-white rounded-xl p-5 border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                  <Briefcase className="w-4 h-4 text-duru-orange-600" />
                  근무 정보
                </h3>
                {!isEditingWorkInfo ? (
                  <button
                    onClick={handleEditWorkInfo}
                    className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-lg text-sm font-semibold hover:bg-gray-200 transition-colors flex items-center gap-1.5"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                    수정
                  </button>
                ) : (
                  <div className="flex gap-2">
                    <button
                      onClick={handleCancelEditWorkInfo}
                      className="px-3 py-1.5 border border-gray-300 text-gray-700 rounded-lg text-sm font-semibold hover:bg-gray-50 transition-colors"
                    >
                      취소
                    </button>
                    <button
                      onClick={handleSaveWorkInfo}
                      className="px-3 py-1.5 bg-duru-orange-500 text-white rounded-lg text-sm font-semibold hover:bg-duru-orange-600 transition-colors flex items-center gap-1.5"
                    >
                      <Check className="w-3.5 h-3.5" />
                      저장
                    </button>
                  </div>
                )}
              </div>

              {!isEditingWorkInfo ? (
                <div className="flex items-center gap-4">
                  {/* 근무 요일 */}
                  <div className="flex-1">
                    <label className="block text-xs font-semibold text-gray-700 mb-2">
                      근무 요일
                    </label>
                    <div className="flex gap-1">
                      {['월', '화', '수', '목', '금', '토', '일'].map((day) => (
                        <div
                          key={day}
                          className={`flex-1 py-1 rounded text-xs font-semibold text-center border ${
                            workDays.includes(day)
                              ? 'bg-duru-orange-500 text-white border-duru-orange-500'
                              : 'bg-gray-50 text-gray-400 border-gray-200'
                          }`}
                        >
                          {day}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* 출근 시간 */}
                  <div className="w-32">
                    <label className="block text-xs font-semibold text-gray-700 mb-2">
                      출근 시간
                    </label>
                    <div className="flex items-center gap-2 px-3 py-1 bg-gray-50 rounded-lg border border-gray-200">
                      <Clock className="w-3.5 h-3.5 text-gray-400" />
                      <span className="text-sm font-bold text-gray-900">{workStartTime}</span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-4">
                  {/* 근무 요일 */}
                  <div className="flex-1">
                    <label className="block text-xs font-semibold text-gray-700 mb-2">
                      근무 요일
                    </label>
                    <div className="grid grid-cols-7 gap-1">
                      {['월', '화', '수', '목', '금', '토', '일'].map((day) => {
                        const isSelected = tempWorkDays.includes(day);
                        return (
                          <button
                            key={day}
                            type="button"
                            onClick={() => toggleTempWorkDay(day)}
                            className={`py-1 rounded text-xs font-semibold transition-colors border ${
                              isSelected
                                ? 'bg-duru-orange-500 text-white border-duru-orange-500'
                                : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                            }`}
                          >
                            {day}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* 출근 시간 */}
                  <div className="w-32">
                    <label className="block text-xs font-semibold text-gray-700 mb-2">
                      출근 시간
                    </label>
                    <div className="relative">
                      <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
                      <input
                        type="time"
                        value={tempWorkStartTime}
                        onChange={(e) => setTempWorkStartTime(e.target.value)}
                        className="w-full pl-9 pr-3 py-1 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-duru-orange-500 focus:border-transparent text-gray-700"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* 출퇴근 기록 */}
            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <Clock className="w-5 h-5 text-duru-orange-600" />
                최근 출퇴근 기록
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

      {/* 퇴사 등록 모달 */}
      {showResignModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                <AlertTriangle className="w-6 h-6 text-red-500" />
                퇴사 등록
              </h3>
              <button
                onClick={() => setShowResignModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
              <p className="text-sm text-red-700">
                <strong>{employee.name}</strong> 근로자를 퇴사 처리합니다.<br />
                퇴사 처리 후 해당 근로자는 출퇴근 서비스에 접속할 수 없습니다.
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  퇴사일 <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="date"
                    value={resignForm.date}
                    onChange={(e) => setResignForm({...resignForm, date: e.target.value})}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  비고 (퇴사 사유 등)
                </label>
                <textarea
                  value={resignForm.reason}
                  onChange={(e) => setResignForm({...resignForm, reason: e.target.value})}
                  placeholder="퇴사 사유나 특이사항을 입력해주세요..."
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 resize-none"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => setShowResignModal(false)}
                  className="flex-1 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
                >
                  취소
                </button>
                <button
                  onClick={handleResignSubmit}
                  disabled={!resignForm.date}
                  className="flex-1 py-3 bg-red-500 text-white rounded-lg font-semibold hover:bg-red-600 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <UserX className="w-4 h-4" />
                  퇴사 등록
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployeeDetail;