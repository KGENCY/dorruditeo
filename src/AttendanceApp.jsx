import React, { useState } from 'react';
import { ArrowLeft, Phone, LogIn, Clock, CheckCircle2, Home } from 'lucide-react';

const AttendanceApp = ({ onClose }) => {
  const [step, setStep] = useState('login'); // login, main, checkin, checkout, complete
  const [phoneNumber, setPhoneNumber] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [showVerification, setShowVerification] = useState(false);
  const [userName, setUserName] = useState('');
  const [todos, setTodos] = useState([
    { id: 1, text: '제품 포장 작업', checked: false },
    { id: 2, text: '부품 조립 작업', checked: false },
    { id: 3, text: '작업장 정리정돈', checked: false }
  ]);
  const [workDone, setWorkDone] = useState('');
  const [attendanceType, setAttendanceType] = useState(''); // checkin or checkout

  const handleSendCode = () => {
    if (phoneNumber.length >= 10) {
      setShowVerification(true);
      // 실제로는 여기서 인증번호 발송 API 호출
    }
  };

  const handleLogin = () => {
    if (verificationCode.length === 6) {
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
    setStep('complete');
  };

  const completeCheckOut = () => {
    setStep('complete');
  };

  const toggleTodo = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, checked: !todo.checked } : todo
    ));
  };

  // 로그인 페이지
  if (step === 'login') {
    return (
      <div className="min-h-screen bg-duru-ivory flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-duru-orange-100">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-duru-orange-100 rounded-full mb-4">
                <Phone className="w-8 h-8 text-duru-orange-600" />
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">두루빛 출퇴근</h1>
              <p className="text-gray-600">전화번호로 간편하게 로그인하세요</p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">전화번호</label>
                <div className="relative">
                  <input
                    type="tel"
                    placeholder="010-0000-0000"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    disabled={showVerification}
                    className="w-full px-4 py-3 pr-28 border border-gray-300 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-duru-orange-500 focus:border-transparent disabled:bg-gray-100"
                  />
                  {!showVerification ? (
                    <button
                      onClick={handleSendCode}
                      disabled={phoneNumber.length < 10}
                      className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-2 bg-duru-orange-500 text-white rounded-lg font-semibold text-sm hover:bg-duru-orange-600 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
                    >
                      인증
                    </button>
                  ) : (
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-600" />
                      <span className="text-sm font-semibold text-green-600">인증됨</span>
                    </div>
                  )}
                </div>
              </div>

              {showVerification && (
                <div className="animate-fadeIn">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">인증번호</label>
                  <input
                    type="text"
                    placeholder="6자리 인증번호"
                    value={verificationCode}
                    onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                    maxLength={6}
                    autoFocus
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg text-lg text-center tracking-wider focus:outline-none focus:ring-2 focus:ring-duru-orange-500 focus:border-transparent"
                  />
                  <p className="text-sm text-gray-600 mt-2">
                    인증번호가 발송되었습니다. (유효시간 3분)
                  </p>
                  <button
                    onClick={() => {
                      setShowVerification(false);
                      setVerificationCode('');
                    }}
                    className="text-sm text-duru-orange-600 hover:text-duru-orange-700 mt-2"
                  >
                    다시 받기
                  </button>
                </div>
              )}

              <button
                onClick={handleLogin}
                disabled={!showVerification || verificationCode.length !== 6}
                className="w-full py-4 bg-duru-orange-500 text-white rounded-lg font-bold text-lg hover:bg-duru-orange-600 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                <LogIn className="w-5 h-5" />
                로그인
              </button>

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
            onClick={() => setStep('main')}
            className="mb-6 flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            뒤로가기
          </button>

          <div className="bg-white rounded-2xl shadow-lg p-8 border border-duru-orange-100">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-duru-orange-100 rounded-full mb-4">
                <Clock className="w-8 h-8 text-duru-orange-600" />
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">출근하기</h1>
              <p className="text-gray-600">오늘 할 일을 체크해주세요</p>
            </div>

            <div className="space-y-4 mb-8">
              {todos.map((todo) => (
                <label
                  key={todo.id}
                  className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                >
                  <input
                    type="checkbox"
                    checked={todo.checked}
                    onChange={() => toggleTodo(todo.id)}
                    className="w-6 h-6 text-duru-orange-600 rounded focus:ring-duru-orange-500"
                  />
                  <span className={`text-lg ${todo.checked ? 'text-gray-400 line-through' : 'text-gray-900'}`}>
                    {todo.text}
                  </span>
                </label>
              ))}
            </div>

            <button
              onClick={completeCheckIn}
              className="w-full py-4 bg-duru-orange-500 text-white rounded-lg font-bold text-lg hover:bg-duru-orange-600 transition-colors flex items-center justify-center gap-2"
            >
              <CheckCircle2 className="w-5 h-5" />
              출근 완료
            </button>
          </div>
        </div>
      </div>
    );
  }

  // 퇴근하기 페이지
  if (step === 'checkout') {
    return (
      <div className="min-h-screen bg-duru-ivory">
        <div className="max-w-3xl mx-auto p-4 sm:p-8">
          <button
            onClick={() => setStep('main')}
            className="mb-6 flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            뒤로가기
          </button>

          <div className="bg-white rounded-2xl shadow-lg p-8 border border-duru-orange-100">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
                <CheckCircle2 className="w-8 h-8 text-gray-700" />
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">퇴근하기</h1>
              <p className="text-gray-600">오늘 한 일을 간단히 기록해주세요</p>
            </div>

            <div className="mb-8">
              <label className="block text-lg font-semibold text-gray-900 mb-3">오늘의 업무 내용</label>
              <textarea
                value={workDone}
                onChange={(e) => setWorkDone(e.target.value)}
                placeholder="예) 고객 미팅, 문서 작업, 팀 회의 등"
                rows={6}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-duru-orange-500 focus:border-transparent resize-none"
              />
            </div>

            <button
              onClick={completeCheckOut}
              disabled={!workDone.trim()}
              className="w-full py-4 bg-gray-700 text-white rounded-lg font-bold text-lg hover:bg-gray-800 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              <CheckCircle2 className="w-5 h-5" />
              퇴근 완료
            </button>
          </div>
        </div>
      </div>
    );
  }

  // 완료 페이지
  if (step === 'complete') {
    return (
      <div className="min-h-screen bg-duru-ivory flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-duru-orange-100 text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
              <CheckCircle2 className="w-10 h-10 text-green-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-3">
              {attendanceType === 'checkin' ? '출근 완료!' : '퇴근 완료!'}
            </h1>
            <p className="text-gray-600 mb-8">
              {attendanceType === 'checkin'
                ? '좋은 하루 되세요!'
                : '오늘도 수고하셨습니다!'}
            </p>

            <div className="space-y-3">
              <button
                onClick={() => setStep('main')}
                className="w-full py-4 bg-duru-orange-500 text-white rounded-lg font-bold text-lg hover:bg-duru-orange-600 transition-colors"
              >
                메인으로 이동
              </button>
              <button
                onClick={onClose}
                className="w-full py-3 text-gray-600 hover:text-gray-900 transition-colors font-medium"
              >
                랜딩 페이지로 돌아가기
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default AttendanceApp;