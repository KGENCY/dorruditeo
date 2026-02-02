import React, { useState } from 'react';
import { ArrowLeft, Hash, LogIn, Clock, CheckCircle2, Home, Megaphone, AlertTriangle, Smile, Camera, X, ImagePlus, ChevronDown, ChevronUp } from 'lucide-react';

const AttendanceApp = ({ onClose }) => {
  const [step, setStep] = useState('login'); // login, main, checkin, checkout, complete
  const [employeeId, setEmployeeId] = useState('');
  const [userName, setUserName] = useState('');
  // 기업이 등록한 오늘의 작업 안내 (실제로는 서버에서 받아올 데이터)
  const [taskDescription] = useState(
    '오늘은 제품 포장 작업과\n부품 조립 작업을 진행할 예정입니다.\n작업 후에는 작업장 정리정돈을 함께 해주세요.\n안전하게 천천히 진행하시면 됩니다.'
  );
  const [confirmedTasks, setConfirmedTasks] = useState(false);
  const [showCheckinModal, setShowCheckinModal] = useState(false);
  const [workDone, setWorkDone] = useState('');
  const [photos, setPhotos] = useState([]);
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const [showPastNotices, setShowPastNotices] = useState(false);
  const [attendanceType, setAttendanceType] = useState(''); // checkin or checkout

  // 금일 긴급 공지 더미 데이터 (실제로는 서버에서 받아올 데이터)
  const [todayNotices] = useState([
    {
      id: 1,
      date: '2026.02.02',
      content: '폭설로 인해 금일 출근이 제한됩니다.\n안전을 위해 자택 대기 바랍니다.',
      sender: '두루빛터 관리자'
    }
  ]);

  // 지난 긴급 공지 더미 데이터
  const [pastNotices] = useState([
    {
      id: 2,
      date: '2026.01.28',
      content: '2월 근무 일정표가 변경되었습니다.\n기업 관리자에게 확인 바랍니다.',
      sender: '두루빛터 관리자'
    },
    {
      id: 3,
      date: '2025.08.17',
      content: '폭염 예보로 인해 금일 자택 대기 바랍니다.',
      sender: '두루빛터 관리자'
    }
  ]);

  const handleLogin = () => {
    if (employeeId.length >= 4 && employeeId.length <= 6) {
      setUserName('홍길동'); // 실제로는 서버에서 받아올 데이터
      setStep('main');
    }
  };

  const handleCheckIn = () => {
    setAttendanceType('checkin');
    setStep('checkin');
  };

  const handleCheckOut = () => {
    setAttendanceType('checkout');
    setStep('checkout');
  };

  const completeCheckIn = () => {
    setShowCheckinModal(true);
  };

  const completeCheckOut = () => {
    setShowCheckoutModal(true);
  };

  const handlePhotoUpload = (e) => {
    const files = Array.from(e.target.files);
    const newPhotos = files.map((file) => ({
      id: Date.now() + Math.random(),
      name: file.name,
      url: URL.createObjectURL(file)
    }));
    setPhotos((prev) => [...prev, ...newPhotos]);
  };

  const removePhoto = (id) => {
    setPhotos((prev) => prev.filter((p) => p.id !== id));
  };



  // 로그인 페이지
  if (step === 'login') {
    const isValidId = employeeId.length >= 4 && employeeId.length <= 6;

    return (
      <div className="min-h-screen bg-duru-ivory flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-duru-orange-100">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-duru-orange-100 rounded-full mb-4">
                <Hash className="w-8 h-8 text-duru-orange-600" />
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">두루빛 출퇴근</h1>
              <p className="text-gray-600">부여받은 고유 번호를 입력해주세요</p>
            </div>

            <div className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">고유 번호</label>
                <input
                  type="text"
                  placeholder="예) JH1234"
                  value={employeeId}
                  onChange={(e) => setEmployeeId(e.target.value.replace(/[^a-zA-Z0-9]/g, '').slice(0, 10))}
                  onKeyDown={(e) => { if (e.key === 'Enter' && isValidId) handleLogin(); }}
                  maxLength={10}
                  autoFocus
                  className="w-full px-4 py-4 border border-gray-300 rounded-lg text-2xl text-center tracking-[0.3em] font-semibold placeholder:text-base placeholder:font-normal placeholder:tracking-normal placeholder:text-gray-500 placeholder:text-center focus:outline-none focus:ring-2 focus:ring-duru-orange-500 focus:border-transparent"
                />
              </div>

              <button
                onClick={handleLogin}
                disabled={!isValidId}
                className="w-full py-5 bg-duru-orange-500 text-white rounded-lg font-bold text-xl hover:bg-duru-orange-600 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                <LogIn className="w-5 h-5" />
                출퇴근 시작
              </button>

              <p className="text-center text-sm text-gray-400">
                고유 번호를 모르시나요?{' '}
                <span className="text-gray-500 underline underline-offset-2">관리자에게 문의해주세요</span>
              </p>

              <button
                onClick={onClose}
                className="w-full py-3 text-gray-600 hover:text-gray-900 transition-colors font-medium"
              >
                메인으로 돌아가기
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 메인 페이지 (출근/퇴근 선택)
  if (step === 'main') {
    return (
      <div className="min-h-screen bg-duru-ivory">
        <div className="max-w-4xl mx-auto p-4 sm:p-8">
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-duru-orange-100 mb-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">{userName}님, 환영합니다!</h2>
                <p className="text-gray-600 mt-1">{new Date().toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' })}</p>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <Home className="w-6 h-6 text-gray-600" />
              </button>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <button
                onClick={handleCheckIn}
                className="p-8 bg-gradient-to-br from-duru-orange-500 to-duru-orange-600 text-white rounded-xl hover:shadow-lg transition-all group"
              >
                <div className="flex flex-col items-center gap-4">
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Clock className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-2">출근하기</h3>
                    <p className="text-white/90">오늘의 할 일을 확인하세요</p>
                  </div>
                </div>
              </button>

              <button
                onClick={handleCheckOut}
                className="p-8 bg-gradient-to-br from-gray-700 to-gray-800 text-white rounded-xl hover:shadow-lg transition-all group"
              >
                <div className="flex flex-col items-center gap-4">
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-2">퇴근하기</h3>
                    <p className="text-white/90">오늘 한 일을 기록하세요</p>
                  </div>
                </div>
              </button>
            </div>
          </div>

          {/* 섹션 1. 금일 긴급 공지 (강조 영역) */}
          <div className="bg-duru-orange-50 rounded-2xl shadow-lg p-8 border-2 border-duru-orange-200">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-duru-orange-500 rounded-full flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-duru-orange-600">금일 긴급 공지</h3>
            </div>

            {todayNotices.length > 0 ? (
              <div className="space-y-6">
                {todayNotices.map((notice) => (
                  <div key={notice.id} className="bg-white rounded-xl p-6 border border-duru-orange-100">
                    <p className="text-base font-bold text-duru-orange-600 mb-3">{notice.date}</p>
                    <p className="text-xl sm:text-2xl font-semibold text-gray-900 leading-relaxed whitespace-pre-line mb-4">
                      {notice.content}
                    </p>
                    <p className="text-sm text-gray-400">전송자: {notice.sender}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-xl p-6 text-center">
                <p className="text-lg text-gray-400">금일 등록된 긴급 공지가 없습니다.</p>
              </div>
            )}
          </div>

          {/* 섹션 2. 지난 긴급 공지 (슬림 토글 카드) */}
          {pastNotices.length > 0 && (
            <div className="mt-6">
              {/* 트리거 카드 (항상 한 줄 슬림) */}
              <button
                onClick={() => setShowPastNotices(!showPastNotices)}
                className="w-full bg-gradient-to-b from-[#F7F7F8] to-[#F1F1F3] rounded-2xl px-5 py-3.5 border border-[#E2E2E6] shadow-[0_1px_2px_rgba(0,0,0,0.03)] flex items-center justify-between hover:from-[#F3F3F5] hover:to-[#EDEDEF] transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 bg-gray-200 rounded-full flex items-center justify-center">
                    <Megaphone className="w-3.5 h-3.5 text-gray-500" />
                  </div>
                  <span className="text-sm text-gray-500 font-normal">지난 긴급 공지</span>
                </div>
                <span className="flex items-center gap-1 text-xs text-gray-500">
                  {showPastNotices ? '접기' : '모두 보기'}
                  {showPastNotices
                    ? <ChevronUp className="w-3.5 h-3.5" />
                    : <ChevronDown className="w-3.5 h-3.5" />
                  }
                </span>
              </button>

              {/* 펼쳐지는 공지 리스트 (아코디언) */}
              {showPastNotices && (
                <div className="mt-2 bg-gray-50 rounded-2xl px-5 py-4 border border-gray-100 space-y-2.5">
                  {pastNotices.map((notice) => (
                    <div key={notice.id} className="bg-white/80 rounded-lg px-4 py-3">
                      <p className="text-xs text-gray-500 mb-1">{notice.date}</p>
                      <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-line mb-1">
                        {notice.content}
                      </p>
                      <p className="text-xs text-gray-400">전송자: {notice.sender}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    );
  }

  // 출근하기 페이지
  if (step === 'checkin') {
    return (
      <div className="min-h-screen bg-duru-ivory">
        <div className="max-w-3xl mx-auto p-4 sm:p-8">
          <button
            onClick={() => { setStep('main'); setConfirmedTasks(false); }}
            className="mb-6 flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            뒤로가기
          </button>

          <div className="bg-white rounded-2xl shadow-lg border border-duru-orange-100 overflow-hidden">
            {/* 1. 상단 타이틀 */}
            <div className="text-center pt-8 pb-6 px-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-duru-orange-100 rounded-full mb-4">
                <Clock className="w-8 h-8 text-duru-orange-600" />
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">출근하기</h1>
              <p className="text-lg text-gray-500">오늘 할 일을 확인해주세요</p>
            </div>

            {/* 2. 오늘의 작업 내용 (문장형 안내) */}
            <div className="mx-6 sm:mx-8 mb-6 bg-[#FFF4EC] rounded-2xl p-6 sm:p-8 border border-duru-orange-100">
              <h3 className="text-xl font-bold text-duru-orange-600 mb-5">오늘의 작업 내용</h3>
              <p className="text-xl font-medium text-gray-900 leading-loose whitespace-pre-line">
                {taskDescription}
              </p>
            </div>

            {/* 3. 확인 체크 영역 */}
            <div className="mx-6 sm:mx-8 mb-6">
              <label className="flex items-center gap-4 p-5 border-2 border-duru-orange-200 rounded-xl cursor-pointer hover:bg-duru-orange-50 transition-colors">
                <input
                  type="checkbox"
                  checked={confirmedTasks}
                  onChange={(e) => setConfirmedTasks(e.target.checked)}
                  className="w-7 h-7 text-duru-orange-600 rounded focus:ring-duru-orange-500 shrink-0"
                />
                <span className="text-xl font-semibold text-gray-800">오늘 할 일을 확인했어요!</span>
              </label>
            </div>

            {/* 4. 출근 완료 버튼 (카드 내부 최하단) */}
            <div className="px-6 sm:px-8 pb-8">
              <button
                onClick={completeCheckIn}
                disabled={!confirmedTasks}
                className="w-full py-5 bg-duru-orange-500 text-white rounded-xl font-bold text-xl hover:bg-duru-orange-600 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                <CheckCircle2 className="w-6 h-6" />
                출근 완료
              </button>
            </div>
          </div>
        </div>

        {/* 출근 완료 모달 */}
        {showCheckinModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40">
            <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-sm text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-duru-orange-100 rounded-full mb-6">
                <Smile className="w-10 h-10 text-duru-orange-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">
                출근이 완료되었어요!<br/>오늘도 파이팅!
              </h2>
              <p className="text-gray-500 mb-8">안전하게 근무하시길 바랍니다.</p>
              <button
                onClick={() => {
                  setShowCheckinModal(false);
                  setConfirmedTasks(false);
                  setAttendanceType('checkin');
                  setStep('main');
                }}
                className="w-full py-4 bg-duru-orange-500 text-white rounded-lg font-bold text-lg hover:bg-duru-orange-600 transition-colors"
              >
                메인으로 이동
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }

  // 퇴근하기 페이지
  if (step === 'checkout') {
    return (
      <div className="min-h-screen bg-duru-ivory">
        <div className="max-w-3xl mx-auto p-4 sm:p-8">
          <button
            onClick={() => { setStep('main'); setPhotos([]); }}
            className="mb-6 flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            뒤로가기
          </button>

          <div className="bg-white rounded-2xl shadow-lg border border-duru-orange-100 overflow-hidden">
            {/* 1. 상단 */}
            <div className="text-center pt-8 pb-6 px-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-duru-orange-100 rounded-full mb-4">
                <CheckCircle2 className="w-8 h-8 text-duru-orange-600" />
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">퇴근하기</h1>
              <p className="text-lg text-gray-500">오늘 한 일을 간단히 기록해주세요</p>
            </div>

            {/* 2. 오늘의 업무 내용 */}
            <div className="mx-6 sm:mx-8 mb-6">
              <label className="block text-xl font-bold text-gray-800 mb-3">오늘의 업무 내용</label>
              <textarea
                value={workDone}
                onChange={(e) => setWorkDone(e.target.value)}
                placeholder="예) 제품 포장 작업, 부품 조립, 작업장 정리 등"
                rows={5}
                className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl text-lg focus:outline-none focus:ring-2 focus:ring-duru-orange-500 focus:border-transparent resize-none leading-relaxed"
              />
            </div>

            {/* 3. 자택 근무 활동 사진 첨부 */}
            <div className="mx-6 sm:mx-8 mb-6 bg-[#FFF4EC] rounded-2xl p-5 border border-duru-orange-100">
              <div className="flex items-center gap-2.5 mb-1">
                <Camera className="w-5 h-5 text-duru-orange-500 shrink-0" />
                <p className="text-base font-semibold text-gray-800 whitespace-nowrap">자택 근무 시 활동 사진을 꼭 함께 업로드해 주세요!</p>
              </div>
              <p className="text-sm text-gray-400 mb-4 ml-[30px]">*사진 첨부는 필수가 아닙니다.</p>

              {/* 사진 미리보기 */}
              {photos.length > 0 && (
                <div className="flex flex-wrap gap-3 mb-3">
                  {photos.map((photo) => (
                    <div key={photo.id} className="relative w-20 h-20 rounded-lg overflow-hidden border border-duru-orange-100 bg-white">
                      <img src={photo.url} alt={photo.name} className="w-full h-full object-cover" />
                      <button
                        onClick={() => removePhoto(photo.id)}
                        className="absolute top-1 right-1 w-5 h-5 bg-black/50 rounded-full flex items-center justify-center hover:bg-black/70 transition-colors"
                      >
                        <X className="w-3 h-3 text-white" />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {/* 사진 추가 버튼 */}
              <label className="flex items-center justify-center gap-2 w-full py-3 bg-white border-2 border-dashed border-duru-orange-200 rounded-xl cursor-pointer hover:bg-duru-orange-50 transition-colors">
                <ImagePlus className="w-5 h-5 text-duru-orange-500" />
                <span className="text-base font-semibold text-duru-orange-600">사진 추가하기</span>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handlePhotoUpload}
                  className="hidden"
                />
              </label>
            </div>

            {/* 4. 퇴근 완료 버튼 */}
            <div className="px-6 sm:px-8 pb-8">
              <button
                onClick={completeCheckOut}
                disabled={!workDone.trim()}
                className="w-full py-5 bg-duru-orange-500 text-white rounded-xl font-bold text-xl hover:bg-duru-orange-600 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                <CheckCircle2 className="w-6 h-6" />
                퇴근 완료
              </button>
            </div>
          </div>
        </div>

        {/* 퇴근 완료 모달 */}
        {showCheckoutModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40">
            <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-sm text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-duru-orange-100 rounded-full mb-6">
                <Smile className="w-10 h-10 text-duru-orange-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">퇴근 완료!</h2>
              <p className="text-lg text-gray-700 mb-2">오늘도 너무 고생하셨습니다</p>
              <p className="text-gray-400 mb-8">편안한 저녁 시간 보내세요.</p>
              <button
                onClick={() => {
                  setShowCheckoutModal(false);
                  setWorkDone('');
                  setPhotos([]);
                  setAttendanceType('checkout');
                  setStep('main');
                }}
                className="w-full py-4 bg-duru-orange-500 text-white rounded-lg font-bold text-lg hover:bg-duru-orange-600 transition-colors"
              >
                메인으로 이동
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }

  return null;
};

export default AttendanceApp;