import React, { useState } from 'react';
import { ArrowLeft, User, Briefcase, Phone, Mail, MapPin, FileText, Upload, Download, Eye, X, Calendar, Clock, Edit3, Save, Building2, IdCard, Shield, Hash, Heart, Users as UserIcon, Edit2, Check, UserX, MessageSquare } from 'lucide-react';

const AdminWorkerDetail = ({ worker, onClose }) => {
  // 비고란 상태
  const [notes, setNotes] = useState(worker.notes || '');
  const [isEditingNotes, setIsEditingNotes] = useState(false);
  const [tempNotes, setTempNotes] = useState('');

  const handleEditNotes = () => {
    setTempNotes(notes);
    setIsEditingNotes(true);
  };

  const handleSaveNotes = () => {
    setNotes(tempNotes);
    setIsEditingNotes(false);
  };

  const handleCancelNotes = () => {
    setIsEditingNotes(false);
    setTempNotes('');
  };

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

  // 근무 정보
  const [workDays, setWorkDays] = useState(['월', '화', '수', '목', '금']);
  const [workStartTime, setWorkStartTime] = useState('09:00');
  const [isEditingWorkInfo, setIsEditingWorkInfo] = useState(false);
  const [tempWorkDays, setTempWorkDays] = useState([]);
  const [tempWorkStartTime, setTempWorkStartTime] = useState('');

  const [showCalendar, setShowCalendar] = useState(false);
  const [calendarMonth, setCalendarMonth] = useState(new Date(2026, 0, 1)); // 2026-01
  const [selectedCalendarRecord, setSelectedCalendarRecord] = useState(null);
  const [isEditingCalendarRecord, setIsEditingCalendarRecord] = useState(false);
  const [editedCalendarRecord, setEditedCalendarRecord] = useState(null);


  const [attendanceHistory, setAttendanceHistory] = useState([
    { date: '2026-01-28', checkin: '결근', checkout: '-', status: '결근', workDone: '-' },
    { date: '2026-01-27', checkin: '09:05', checkout: '18:10', status: '정상', workDone: '포장 작업' },
    { date: '2026-01-26', checkin: '09:00', checkout: '17:55', status: '정상', workDone: '재고 정리' },
    { date: '2026-01-25', checkin: '-', checkout: '-', status: '휴가', workDone: '-' },
    { date: '2026-01-24', checkin: '09:10', checkout: '18:00', status: '지각', workDone: '품질 검사' },
    { date: '2026-01-23', checkin: '09:00', checkout: '18:05', status: '정상', workDone: '설비 점검' },
    { date: '2026-01-22', checkin: '09:00', checkout: '18:00', status: '정상', workDone: '제품 포장' },
    { date: '2026-01-21', checkin: '09:00', checkout: '18:00', status: '정상', workDone: '원자재 입고' },
    { date: '2026-01-20', checkin: '09:15', checkout: '18:00', status: '지각', workDone: '라인 정비' },
    { date: '2026-01-19', checkin: '09:00', checkout: '18:00', status: '정상', workDone: '품질 검사' },
    { date: '2026-01-18', checkin: '-', checkout: '-', status: '휴가', workDone: '-' },
    { date: '2026-01-17', checkin: '-', checkout: '-', status: '휴가', workDone: '-' },
    { date: '2026-01-16', checkin: '09:00', checkout: '18:00', status: '정상', workDone: '재고 정리' },
    { date: '2026-01-15', checkin: '09:00', checkout: '17:50', status: '정상', workDone: '제품 검수' },
    { date: '2026-01-14', checkin: '09:00', checkout: '18:00', status: '정상', workDone: '포장 작업' },
    { date: '2026-01-13', checkin: '09:05', checkout: '18:00', status: '정상', workDone: '설비 점검' },
    { date: '2026-01-12', checkin: '결근', checkout: '-', status: '결근', workDone: '-' },
    { date: '2026-01-11', checkin: '-', checkout: '-', status: '휴가', workDone: '-' },
    { date: '2026-01-10', checkin: '-', checkout: '-', status: '휴가', workDone: '-' },
    { date: '2026-01-09', checkin: '09:00', checkout: '18:00', status: '정상', workDone: '품질 검사' },
    { date: '2026-01-08', checkin: '09:00', checkout: '18:10', status: '정상', workDone: '원자재 입고' },
    { date: '2026-01-07', checkin: '09:00', checkout: '18:00', status: '정상', workDone: '제품 포장' },
    { date: '2026-01-06', checkin: '09:00', checkout: '18:00', status: '정상', workDone: '라인 정비' },
    { date: '2026-01-05', checkin: '09:00', checkout: '18:05', status: '정상', workDone: '재고 정리' },
    { date: '2026-01-04', checkin: '-', checkout: '-', status: '휴가', workDone: '-' },
    { date: '2026-01-03', checkin: '-', checkout: '-', status: '휴가', workDone: '-' },
    { date: '2026-01-02', checkin: '09:00', checkout: '18:00', status: '정상', workDone: '신년 업무 복귀' },
    { date: '2026-01-01', checkin: '-', checkout: '-', status: '휴가', workDone: '-' },
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
                  worker.isResigned ? 'bg-gray-200 text-gray-600' :
                  worker.status === '근무중' || worker.status === 'working' ? 'bg-green-100 text-green-700' :
                  worker.status === '휴직' ? 'bg-yellow-100 text-yellow-700' :
                  'bg-gray-200 text-gray-700'
                }`}>
                  {worker.isResigned ? '퇴사' : worker.status === 'working' ? '근무중' : worker.status}
                </span>
              </div>

              <div className="space-y-3 border-t border-gray-200 pt-6">
                <div className="flex items-center gap-3 text-sm">
                  <Building2 className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-600">소속 회사:</span>
                  <span className="font-semibold text-gray-900">{worker.company}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <IdCard className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-600">주민번호:</span>
                  <span className="font-semibold text-gray-900">123456-1234567</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Phone className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-600">핸드폰번호:</span>
                  <span className="font-semibold text-gray-900">010-{Math.floor(Math.random() * 10000).toString().padStart(4, '0')}-{Math.floor(Math.random() * 10000).toString().padStart(4, '0')}</span>
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
                  <span className="font-semibold text-gray-900">{worker.hireDate}</span>
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
                  {worker.workerId || 'N/A'}
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
                  <span className="font-bold text-gray-900">{worker.disability}</span>
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

            {/* 비고란 */}
            <div className="bg-white rounded-xl p-4 border border-gray-200">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-bold text-gray-900 flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-duru-orange-600" />
                  비고란
                </h3>
                {!isEditingNotes ? (
                  <button
                    onClick={handleEditNotes}
                    className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs font-semibold hover:bg-gray-200 transition-colors flex items-center gap-1"
                  >
                    <Edit2 className="w-3 h-3" />
                    수정
                  </button>
                ) : (
                  <div className="flex gap-1">
                    <button
                      onClick={handleCancelNotes}
                      className="px-2 py-1 border border-gray-300 text-gray-700 rounded text-xs font-semibold hover:bg-gray-50 transition-colors"
                    >
                      취소
                    </button>
                    <button
                      onClick={handleSaveNotes}
                      className="px-2 py-1 bg-duru-orange-500 text-white rounded text-xs font-semibold hover:bg-duru-orange-600 transition-colors flex items-center gap-1"
                    >
                      <Check className="w-3 h-3" />
                      저장
                    </button>
                  </div>
                )}
              </div>
              {!isEditingNotes ? (
                <div className="bg-gray-50 rounded-lg p-3 min-h-[60px]">
                  <p className="text-xs text-gray-700 whitespace-pre-wrap">
                    {notes || '특이사항이 없습니다.'}
                  </p>
                </div>
              ) : (
                <textarea
                  value={tempNotes}
                  onChange={(e) => setTempNotes(e.target.value)}
                  placeholder="근로자 특징이나 특이사항을 입력하세요..."
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-duru-orange-500 resize-none"
                />
              )}
            </div>

            {/* 퇴사 정보 (퇴사자인 경우) */}
            {worker.isResigned && (
              <div className="bg-gray-100 rounded-xl p-4 border border-gray-300">
                <h3 className="text-sm font-bold text-gray-700 mb-3 flex items-center gap-2">
                  <UserX className="w-4 h-4 text-gray-500" />
                  퇴사 정보
                </h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-600">퇴사일</span>
                    <span className="font-bold text-gray-700">{worker.resignDate}</span>
                  </div>
                  {worker.resignReason && (
                    <div className="text-xs">
                      <span className="text-gray-600">비고</span>
                      <p className="mt-1 p-2 bg-white rounded border border-gray-200 text-gray-700">{worker.resignReason}</p>
                    </div>
                  )}
                </div>
              </div>
            )}

          </div>

          {/* 오른쪽: 상세 정보 */}
          <div className="lg:col-span-2 space-y-6">
            {/* 출퇴근 기록 (수정 가능) */}
            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  <Clock className="w-5 h-5 text-duru-orange-600" />
                  최근 출퇴근 기록
                  <span className="text-xs font-normal text-gray-500 ml-2">(클릭하여 수정 가능)</span>
                </h3>
                <button
                  onClick={() => setShowCalendar(!showCalendar)}
                  className={`p-2 rounded-lg border transition-colors ${showCalendar ? 'bg-duru-orange-50 border-duru-orange-300 text-duru-orange-600' : 'bg-gray-50 border-gray-200 text-gray-500 hover:bg-gray-100'}`}
                  title="달력 보기"
                >
                  <Calendar className="w-5 h-5" />
                </button>
              </div>

              {showCalendar && (() => {
                const year = calendarMonth.getFullYear();
                const month = calendarMonth.getMonth();
                const firstDay = new Date(year, month, 1).getDay();
                const daysInMonth = new Date(year, month + 1, 0).getDate();
                const dayLabels = ['일', '월', '화', '수', '목', '금', '토'];
                const cells = [];
                for (let i = 0; i < firstDay; i++) cells.push(null);
                for (let d = 1; d <= daysInMonth; d++) cells.push(d);

                return (
                  <div className="mb-6 border border-gray-200 rounded-lg overflow-hidden">
                    <div className="flex items-center justify-between px-4 py-3 bg-gray-50 border-b border-gray-200">
                      <button onClick={() => setCalendarMonth(new Date(year, month - 1, 1))} className="p-1 hover:bg-gray-200 rounded transition-colors text-gray-600">&lt;</button>
                      <span className="font-bold text-gray-900">{year}년 {month + 1}월</span>
                      <button onClick={() => setCalendarMonth(new Date(year, month + 1, 1))} className="p-1 hover:bg-gray-200 rounded transition-colors text-gray-600">&gt;</button>
                    </div>
                    <div className="grid grid-cols-7">
                      {dayLabels.map(d => (
                        <div key={d} className="py-2 text-center text-xs font-semibold text-gray-500 border-b border-gray-100">{d}</div>
                      ))}
                      {cells.map((day, i) => {
                        if (day === null) return <div key={`empty-${i}`} className="py-3 border-b border-gray-50" />;
                        const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
                        const record = attendanceHistory.find(r => r.date === dateStr);
                        const statusColor = record
                          ? record.status === '정상' ? 'bg-green-500'
                          : record.status === '지각' ? 'bg-yellow-500'
                          : record.status === '휴가' ? 'bg-blue-400'
                          : record.status === '결근' ? 'bg-red-500'
                          : ''
                          : '';

                        return (
                          <button
                            key={day}
                            onClick={() => { if (record) setSelectedCalendarRecord(record); }}
                            className={`py-3 flex flex-col items-center gap-1 border-b border-gray-50 transition-colors ${record ? 'hover:bg-gray-100 cursor-pointer' : 'cursor-default'}`}
                          >
                            <span className={`text-sm ${record ? 'text-gray-900' : 'text-gray-300'}`}>{day}</span>
                            {record && <span className={`w-2 h-2 rounded-full ${statusColor}`} />}
                          </button>
                        );
                      })}
                    </div>
                    <div className="flex items-center gap-4 px-4 py-2.5 bg-gray-50 border-t border-gray-200 text-xs text-gray-500">
                      <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-green-500" />정상</span>
                      <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-yellow-500" />지각</span>
                      <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-blue-400" />휴가</span>
                      <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-red-500" />결근</span>
                    </div>
                  </div>
                );
              })()}

              {selectedCalendarRecord && !isEditingCalendarRecord && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50" onClick={() => setSelectedCalendarRecord(null)}>
                  <div className="bg-white rounded-xl w-full max-w-sm mx-4 shadow-xl" onClick={e => e.stopPropagation()}>
                    <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
                      <h3 className="text-lg font-bold text-gray-900">{selectedCalendarRecord.date}</h3>
                      <button onClick={() => setSelectedCalendarRecord(null)} className="text-gray-400 hover:text-gray-600">
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                    <div className="px-6 py-5 space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500">상태</span>
                        <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                          selectedCalendarRecord.status === '정상' ? 'bg-green-100 text-green-700' :
                          selectedCalendarRecord.status === '지각' ? 'bg-yellow-100 text-yellow-700' :
                          selectedCalendarRecord.status === '휴가' ? 'bg-blue-100 text-blue-700' :
                          'bg-red-100 text-red-700'
                        }`}>{selectedCalendarRecord.status}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500">출근</span>
                        <span className={`text-sm font-semibold ${selectedCalendarRecord.checkin === '결근' ? 'text-red-600' : 'text-gray-900'}`}>{selectedCalendarRecord.checkin}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500">퇴근</span>
                        <span className="text-sm font-semibold text-gray-900">{selectedCalendarRecord.checkout}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500">업무 내용</span>
                        <span className="text-sm text-gray-900">{selectedCalendarRecord.workDone}</span>
                      </div>
                    </div>
                    <div className="px-6 py-4 border-t border-gray-100 flex gap-3">
                      <button onClick={() => setSelectedCalendarRecord(null)} className="flex-1 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-semibold transition-colors">
                        닫기
                      </button>
                      <button onClick={() => { setEditedCalendarRecord({...selectedCalendarRecord}); setIsEditingCalendarRecord(true); }} className="flex-1 py-2.5 bg-duru-orange-500 hover:bg-duru-orange-600 text-white rounded-lg text-sm font-semibold transition-colors flex items-center justify-center gap-1.5">
                        <Edit3 className="w-4 h-4" />
                        수정하기
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {isEditingCalendarRecord && editedCalendarRecord && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => { setIsEditingCalendarRecord(false); setEditedCalendarRecord(null); }}>
                  <div className="bg-white rounded-xl w-full max-w-md shadow-xl" onClick={e => e.stopPropagation()}>
                    <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
                      <h3 className="text-lg font-bold text-gray-900">{editedCalendarRecord.date} 수정</h3>
                      <button onClick={() => { setIsEditingCalendarRecord(false); setEditedCalendarRecord(null); }} className="text-gray-400 hover:text-gray-600">
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                    <div className="px-6 py-5 space-y-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">상태</label>
                        <select
                          value={editedCalendarRecord.status}
                          onChange={(e) => {
                            const s = e.target.value;
                            if (s === '결근') {
                              setEditedCalendarRecord({...editedCalendarRecord, status: s, checkin: '결근', checkout: '-', workDone: '-'});
                            } else if (s === '휴가') {
                              setEditedCalendarRecord({...editedCalendarRecord, status: s, checkin: '-', checkout: '-', workDone: '-'});
                            } else {
                              setEditedCalendarRecord({...editedCalendarRecord, status: s, checkin: editedCalendarRecord.checkin === '결근' || editedCalendarRecord.checkin === '-' ? '09:00' : editedCalendarRecord.checkin, checkout: editedCalendarRecord.checkout === '-' ? '18:00' : editedCalendarRecord.checkout, workDone: editedCalendarRecord.workDone === '-' ? '' : editedCalendarRecord.workDone});
                            }
                          }}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-duru-orange-500"
                        >
                          <option value="정상">정상</option>
                          <option value="지각">지각</option>
                          <option value="휴가">휴가</option>
                          <option value="결근">결근</option>
                        </select>
                      </div>
                      {editedCalendarRecord.status !== '결근' && editedCalendarRecord.status !== '휴가' && (
                        <>
                          <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">출근 시간</label>
                            <input type="time" value={editedCalendarRecord.checkin} onChange={(e) => setEditedCalendarRecord({...editedCalendarRecord, checkin: e.target.value})} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-duru-orange-500" />
                          </div>
                          <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">퇴근 시간</label>
                            <input type="time" value={editedCalendarRecord.checkout} onChange={(e) => setEditedCalendarRecord({...editedCalendarRecord, checkout: e.target.value})} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-duru-orange-500" />
                          </div>
                          <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">업무 내용</label>
                            <textarea value={editedCalendarRecord.workDone} onChange={(e) => setEditedCalendarRecord({...editedCalendarRecord, workDone: e.target.value})} rows={2} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-duru-orange-500" />
                          </div>
                        </>
                      )}
                    </div>
                    <div className="px-6 py-4 border-t border-gray-100 flex gap-3">
                      <button onClick={() => { setIsEditingCalendarRecord(false); setEditedCalendarRecord(null); }} className="flex-1 py-2.5 border border-gray-300 text-gray-700 rounded-lg text-sm font-semibold hover:bg-gray-50 transition-colors">
                        취소
                      </button>
                      <button
                        onClick={() => {
                          setAttendanceHistory(prev => prev.map(r => r.date === editedCalendarRecord.date ? editedCalendarRecord : r));
                          setSelectedCalendarRecord(editedCalendarRecord);
                          setIsEditingCalendarRecord(false);
                          setEditedCalendarRecord(null);
                        }}
                        className="flex-1 py-2.5 bg-duru-orange-500 hover:bg-duru-orange-600 text-white rounded-lg text-sm font-semibold transition-colors flex items-center justify-center gap-1.5"
                      >
                        <Save className="w-4 h-4" />
                        저장
                      </button>
                    </div>
                  </div>
                </div>
              )}

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
                    {attendanceHistory.slice(0, 7).map((record, idx) => (
                      <tr key={idx} className="hover:bg-gray-50">
                        <td className="px-4 py-3 text-gray-900">{record.date}</td>
                        <td className={`px-4 py-3 ${record.checkin === '결근' ? 'text-red-600 font-semibold' : 'text-gray-900'}`}>{record.checkin}</td>
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