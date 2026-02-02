import React, { useState } from 'react';
import { ArrowLeft, Users, UserCheck, UserX, Clock, Calendar, TrendingUp, FileText, Search, ChevronLeft, ChevronRight, Download, Upload, Eye, X, Plus, Check, CheckCircle2, Hash, Lock, ChevronDown, Phone, Shield, Heart, Briefcase } from 'lucide-react';
import EmployeeDetail from './EmployeeDetail';

const CompanyDashboard = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState('dashboard'); // dashboard, employees, attendance, stats
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [currentMonth, setCurrentMonth] = useState(new Date(2026, 0, 1)); // 2026년 1월
  const [selectedDate, setSelectedDate] = useState(new Date(2026, 0, 28)); // 2026년 1월 28일
  const [selectedCalendarDate, setSelectedCalendarDate] = useState(null); // 캘린더에서 선택한 날짜
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [scheduleForm, setScheduleForm] = useState({
    workType: ''
  });
  const [showAddWorkerModal, setShowAddWorkerModal] = useState(false);
  const [addWorkerForm, setAddWorkerForm] = useState({
    name: '',
    ssn: '',
    phone: '',
    gender: '',
    emergencyName: '',
    emergencyRelation: '',
    emergencyPhone: '',
    disabilityType: '',
    disabilityGrade: '',
    disabilitySeverity: '',
    hireDate: '',
    recognitionDate: '',
    workDays: [],
    workStartTime: '',
    workerId: '',
  });
  const [addWorkerComplete, setAddWorkerComplete] = useState({});

  const updateAddWorkerForm = (field, value) => {
    const newForm = { ...addWorkerForm, [field]: value };
    setAddWorkerForm(newForm);
    const newComplete = { ...addWorkerComplete };
    if (field === 'workDays') {
      // 배열인 경우, 최소 1개 이상 선택되어야 함
      if (value && Array.isArray(value) && value.length > 0) {
        newComplete[field] = true;
      } else {
        delete newComplete[field];
      }
    } else if (value && value.toString().trim()) {
      newComplete[field] = true;
    } else {
      delete newComplete[field];
    }
    setAddWorkerComplete(newComplete);
  };

  const addWorkerRequired = ['name', 'ssn', 'phone', 'gender', 'emergencyName', 'emergencyRelation', 'emergencyPhone', 'disabilityType', 'disabilityGrade', 'disabilitySeverity', 'hireDate', 'recognitionDate', 'workDays', 'workStartTime', 'workerId'];

  const handleAddWorkerSubmit = () => {
    const allFilled = addWorkerRequired.every(f => {
      if (f === 'workDays') {
        return addWorkerForm[f] && Array.isArray(addWorkerForm[f]) && addWorkerForm[f].length > 0;
      }
      return addWorkerForm[f] && addWorkerForm[f].toString().trim();
    });
    if (!allFilled) return;
    setShowAddWorkerModal(false);
    setAddWorkerForm({ name: '', ssn: '', phone: '', gender: '', emergencyName: '', emergencyRelation: '', emergencyPhone: '', disabilityType: '', disabilityGrade: '', disabilitySeverity: '', hireDate: '', recognitionDate: '', workDays: [], workStartTime: '', workerId: '' });
    setAddWorkerComplete({});
  };

  const disabilityTypes = [
    '지체장애', '뇌병변장애', '시각장애', '청각장애', '언어장애',
    '지적장애', '정신장애', '자폐성장애', '신장장애', '심장장애',
    '호흡기장애', '간장애', '안면장애', '장루·요루장애', '간질장애'
  ];

  // 더미 데이터
  const employees = [
    { id: 1, name: '김민수', department: '제조부', status: 'checkin', checkinTime: '09:00', checkoutTime: null },
    { id: 2, name: '이영희', department: '포장부', status: 'checkin', checkinTime: '09:15', checkoutTime: null },
    { id: 3, name: '박철수', department: '제조부', status: 'checkout', checkinTime: '09:00', checkoutTime: '18:00' },
    { id: 4, name: '정미라', department: '품질관리부', status: 'checkin', checkinTime: '08:45', checkoutTime: null },
    { id: 5, name: '최동욱', department: '포장부', status: 'absent', checkinTime: null, checkoutTime: null },
  ];

  const todayStats = {
    total: 15,
    checkin: 12,
    checkout: 3,
    absent: 0,
    attendanceRate: 100
  };

  // 날짜별 출퇴근 기록 데이터 (더미 데이터)
  const getDailyAttendance = (date) => {
    const dateStr = date.toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' });

    // 더미 데이터 - 실제로는 서버에서 해당 날짜 데이터를 가져옴
    if (date.getDate() === 28 && date.getMonth() === 0 && date.getFullYear() === 2026) {
      return [
        { id: 1, name: '김민수', department: '제조부', checkinTime: '09:00', checkoutTime: '-', status: 'checkin', workDone: '' },
        { id: 2, name: '이영희', department: '포장부', checkinTime: '09:15', checkoutTime: '-', status: 'checkin', workDone: '' },
        { id: 3, name: '박철수', department: '제조부', checkinTime: '09:00', checkoutTime: '-', status: 'checkin', workDone: '' },
        { id: 4, name: '정미라', department: '품질관리부', checkinTime: '08:45', checkoutTime: '-', status: 'checkin', workDone: '' },
        { id: 5, name: '최동욱', department: '포장부', checkinTime: '-', checkoutTime: '-', status: 'pending', workDone: '' },
      ];
    } else if (date.getDate() === 27 && date.getMonth() === 0 && date.getFullYear() === 2026) {
      return [
        { id: 1, name: '김민수', department: '제조부', checkinTime: '09:05', checkoutTime: '18:10', status: 'checkout', workDone: '제품 검수 및 정리' },
        { id: 2, name: '이영희', department: '포장부', checkinTime: '09:00', checkoutTime: '18:00', status: 'checkout', workDone: '포장 작업' },
        { id: 3, name: '박철수', department: '제조부', checkinTime: '09:00', checkoutTime: '18:05', status: 'checkout', workDone: '조립 라인 관리' },
        { id: 4, name: '정미라', department: '품질관리부', checkinTime: '08:50', checkoutTime: '18:00', status: 'checkout', workDone: '품질 검사 및 보고서 작성' },
        { id: 5, name: '최동욱', department: '포장부', checkinTime: null, checkoutTime: null, status: 'absent', workDone: '' },
      ];
    } else if (date.getDate() === 26 && date.getMonth() === 0 && date.getFullYear() === 2026) {
      return [
        { id: 1, name: '김민수', department: '제조부', checkinTime: '09:00', checkoutTime: '17:55', status: 'checkout', workDone: '재고 정리' },
        { id: 2, name: '이영희', department: '포장부', checkinTime: '09:10', checkoutTime: '18:00', status: 'checkout', workDone: '배송 준비' },
        { id: 3, name: '박철수', department: '제조부', checkinTime: '09:00', checkoutTime: '18:00', status: 'checkout', workDone: '기계 점검' },
        { id: 4, name: '정미라', department: '품질관리부', checkinTime: '09:00', checkoutTime: '18:10', status: 'checkout', workDone: '최종 검수' },
        { id: 5, name: '최동욱', department: '포장부', checkinTime: '09:15', checkoutTime: '18:05', status: 'checkout', workDone: '포장 작업' },
      ];
    } else {
      return [
        { id: 1, name: '김민수', department: '제조부', checkinTime: '09:00', checkoutTime: '18:00', status: 'checkout', workDone: '일반 업무' },
        { id: 2, name: '이영희', department: '포장부', checkinTime: '09:00', checkoutTime: '18:00', status: 'checkout', workDone: '일반 업무' },
        { id: 3, name: '박철수', department: '제조부', checkinTime: '09:00', checkoutTime: '18:00', status: 'checkout', workDone: '일반 업무' },
      ];
    }
  };

  const dailyAttendance = getDailyAttendance(selectedDate);

  const goToPreviousDay = () => {
    const newDate = new Date(selectedDate);
    newDate.setDate(newDate.getDate() - 1);
    setSelectedDate(newDate);
  };

  const goToNextDay = () => {
    const newDate = new Date(selectedDate);
    newDate.setDate(newDate.getDate() + 1);
    setSelectedDate(newDate);
  };

  // 근로자 상세보기가 선택되면 EmployeeDetail 컴포넌트 표시
  if (selectedEmployee) {
    return <EmployeeDetail employee={selectedEmployee} onClose={() => setSelectedEmployee(null)} />;
  }

  return (
    <div className="min-h-screen bg-duru-ivory">
      {/* 헤더 */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-5 h-5 text-gray-600" />
              </button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">기업 관리자</h1>
                <p className="text-sm text-gray-600">(주)두루빛 제조</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-600">2026년 1월 28일</span>
              <div className="w-10 h-10 bg-duru-orange-100 rounded-full flex items-center justify-center">
                <span className="text-sm font-bold text-duru-orange-600">관</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* 탭 네비게이션 */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-8">
            {[
              { id: 'dashboard', label: '대시보드', icon: TrendingUp },
              { id: 'employees', label: '근로자 관리', icon: Users },
              { id: 'attendance', label: '근무일정관리', icon: Clock },
              { id: 'stats', label: '통계', icon: Calendar }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 py-4 px-2 border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? 'border-duru-orange-500 text-duru-orange-600'
                    : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
              >
                <tab.icon className="w-5 h-5" />
                <span className="font-semibold">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 메인 컨텐츠 */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            {/* 통계 카드 */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white rounded-xl p-6 border border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Users className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
                <p className="text-sm text-gray-600 mb-1">전체 근로자</p>
                <p className="text-3xl font-bold text-gray-900">{todayStats.total}명</p>
              </div>

              <div className="bg-white rounded-xl p-6 border border-duru-orange-200 bg-duru-orange-50">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-duru-orange-100 rounded-lg flex items-center justify-center">
                    <UserCheck className="w-6 h-6 text-duru-orange-600" />
                  </div>
                </div>
                <p className="text-sm text-gray-600 mb-1">출근</p>
                <p className="text-3xl font-bold text-duru-orange-600">{todayStats.checkin}명</p>
              </div>

              <div className="bg-white rounded-xl p-6 border border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                    <Clock className="w-6 h-6 text-gray-600" />
                  </div>
                </div>
                <p className="text-sm text-gray-600 mb-1">퇴근</p>
                <p className="text-3xl font-bold text-gray-900">{todayStats.checkout}명</p>
              </div>

              <div className="bg-white rounded-xl p-6 border border-green-200 bg-green-50">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-green-600" />
                  </div>
                </div>
                <p className="text-sm text-gray-600 mb-1">출근율</p>
                <p className="text-3xl font-bold text-green-600">{todayStats.attendanceRate}%</p>
              </div>
            </div>

            {/* 날짜별 출퇴근 기록 */}
            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                    <FileText className="w-5 h-5 text-duru-orange-600" />
                    출퇴근 기록
                  </h2>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={goToPreviousDay}
                      className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      <ChevronLeft className="w-5 h-5 text-gray-600" />
                    </button>
                    <span className="text-base font-semibold text-gray-900 min-w-[180px] text-center">
                      {selectedDate.toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric', weekday: 'short' })}
                    </span>
                    <button
                      onClick={goToNextDay}
                      className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      <ChevronRight className="w-5 h-5 text-gray-600" />
                    </button>
                  </div>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">이름</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">부서</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">출근</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">퇴근</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">상태</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">업무 내용</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {dailyAttendance.map(record => (
                      <tr key={record.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-duru-orange-100 rounded-full flex items-center justify-center">
                              <span className="text-xs font-bold text-duru-orange-600">{record.name[0]}</span>
                            </div>
                            <span className="font-semibold text-gray-900">{record.name}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-gray-600">{record.department}</td>
                        <td className="px-6 py-4 text-gray-900">{record.checkinTime || '-'}</td>
                        <td className="px-6 py-4 text-gray-900">{record.checkoutTime || '-'}</td>
                        <td className="px-6 py-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            record.status === 'checkin' ? 'bg-duru-orange-100 text-duru-orange-700' :
                            record.status === 'checkout' ? 'bg-gray-200 text-gray-700' :
                            record.status === 'absent' ? 'bg-red-100 text-red-700' :
                            record.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                            'bg-gray-200 text-gray-700'
                          }`}>
                            {record.status === 'checkin' ? '출근 완료' : record.status === 'checkout' ? '퇴근 완료' : record.status === 'absent' ? '결근' : record.status === 'pending' ? '출근 전' : '정상'}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-gray-600 text-sm max-w-xs truncate">
                          {record.workDone || '-'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'employees' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">근로자 관리</h2>
              <button
                onClick={() => setShowAddWorkerModal(true)}
                className="px-4 py-2 bg-duru-orange-500 text-white rounded-lg font-semibold hover:bg-duru-orange-600 transition-colors"
              >
                + 근로자 추가
              </button>
            </div>

            <div className="bg-white rounded-xl border border-gray-200">
              <div className="p-4 border-b border-gray-200">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="이름, 부서로 검색..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-duru-orange-500"
                  />
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">이름</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">부서</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">출근 시간</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">퇴근 시간</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">상태</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">관리</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {employees.map(emp => (
                      <tr key={emp.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-duru-orange-100 rounded-full flex items-center justify-center">
                              <span className="text-xs font-bold text-duru-orange-600">{emp.name[0]}</span>
                            </div>
                            <span className="font-semibold text-gray-900">{emp.name}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-gray-600">{emp.department}</td>
                        <td className="px-6 py-4 text-gray-900">{emp.checkinTime || '-'}</td>
                        <td className="px-6 py-4 text-gray-900">{emp.checkoutTime || '-'}</td>
                        <td className="px-6 py-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            emp.status === 'checkin' ? 'bg-duru-orange-100 text-duru-orange-700' :
                            emp.status === 'checkout' ? 'bg-gray-200 text-gray-700' :
                            'bg-red-100 text-red-700'
                          }`}>
                            {emp.status === 'checkin' ? '출근' : emp.status === 'checkout' ? '퇴근' : '결근'}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <button
                            onClick={() => setSelectedEmployee(emp)}
                            className="text-duru-orange-600 hover:text-duru-orange-700 font-semibold text-sm"
                          >
                            상세보기
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'attendance' && (
          <div className="space-y-6">
            {/* 근무 일정 관리 */}
            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">근무 일정 관리</h2>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1))}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <ChevronLeft className="w-5 h-5 text-gray-600" />
                  </button>
                  <span className="text-lg font-semibold text-gray-900 min-w-[120px] text-center">
                    {currentMonth.getFullYear()}년 {currentMonth.getMonth() + 1}월
                  </span>
                  <button
                    onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1))}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <ChevronRight className="w-5 h-5 text-gray-600" />
                  </button>
                </div>
              </div>

              {/* 캘린더 그리드 */}
              <div className="grid grid-cols-7 gap-3">
                {/* 요일 헤더 */}
                {['일', '월', '화', '수', '목', '금', '토'].map((day, idx) => (
                  <div key={day} className={`text-center font-bold py-3 text-base ${
                    idx === 0 ? 'text-red-600' : idx === 6 ? 'text-blue-600' : 'text-gray-900'
                  }`}>
                    {day}
                  </div>
                ))}

                {/* 날짜 셀 */}
                {(() => {
                  const year = currentMonth.getFullYear();
                  const month = currentMonth.getMonth();
                  const firstDay = new Date(year, month, 1).getDay();
                  const lastDate = new Date(year, month + 1, 0).getDate();
                  const cells = [];

                  // 더미 일정 데이터 - 28일 이전 평일은 채워져있고, 29일 이후는 빈칸 (파란 계열로 통일)
                  const schedules = {
                    '2': { workType: '제품 조립', startTime: '09:00', endTime: '18:00', workers: 7, color: 'bg-blue-50 border-blue-300' },
                    '3': { workType: '포장 작업', startTime: '09:00', endTime: '17:00', workers: 6, color: 'bg-sky-50 border-sky-300' },
                    '5': { workType: '제품 조립', startTime: '09:00', endTime: '18:00', workers: 8, color: 'bg-blue-50 border-blue-300' },
                    '6': { workType: '재고 정리', startTime: '10:00', endTime: '16:00', workers: 5, color: 'bg-cyan-50 border-cyan-300' },
                    '7': { workType: '품질 검사', startTime: '09:00', endTime: '18:00', workers: 8, color: 'bg-blue-50 border-blue-300' },
                    '8': { workType: '제품 조립', startTime: '09:00', endTime: '18:00', workers: 7, color: 'bg-sky-50 border-sky-300' },
                    '9': { workType: '배송 준비', startTime: '09:00', endTime: '17:00', workers: 4, color: 'bg-cyan-50 border-cyan-300' },
                    '10': { workType: '포장 작업', startTime: '09:00', endTime: '17:00', workers: 6, color: 'bg-blue-50 border-blue-300' },
                    '12': { workType: '제품 검수', startTime: '09:00', endTime: '18:00', workers: 7, color: 'bg-sky-50 border-sky-300' },
                    '13': { workType: '재고 정리', startTime: '10:00', endTime: '16:00', workers: 5, color: 'bg-cyan-50 border-cyan-300' },
                    '14': { workType: '기계 점검', startTime: '13:00', endTime: '17:00', workers: 3, color: 'bg-blue-50 border-blue-300' },
                    '15': { workType: '제품 조립', startTime: '09:00', endTime: '18:00', workers: 8, color: 'bg-sky-50 border-sky-300' },
                    '16': { workType: '품질 검사', startTime: '09:00', endTime: '18:00', workers: 7, color: 'bg-cyan-50 border-cyan-300' },
                    '17': { workType: '포장 작업', startTime: '09:00', endTime: '17:00', workers: 6, color: 'bg-blue-50 border-blue-300' },
                    '19': { workType: '제품 조립', startTime: '09:00', endTime: '18:00', workers: 8, color: 'bg-sky-50 border-sky-300' },
                    '20': { workType: '제품 검수', startTime: '09:00', endTime: '18:00', workers: 8, color: 'bg-cyan-50 border-cyan-300' },
                    '21': { workType: '배송 준비', startTime: '09:00', endTime: '17:00', workers: 5, color: 'bg-blue-50 border-blue-300' },
                    '22': { workType: '재고 정리', startTime: '10:00', endTime: '16:00', workers: 4, color: 'bg-sky-50 border-sky-300' },
                    '23': { workType: '제품 조립', startTime: '09:00', endTime: '18:00', workers: 7, color: 'bg-cyan-50 border-cyan-300' },
                    '24': { workType: '포장 작업', startTime: '09:00', endTime: '17:00', workers: 6, color: 'bg-blue-50 border-blue-300' },
                    '26': { workType: '품질 검사', startTime: '09:00', endTime: '18:00', workers: 7, color: 'bg-sky-50 border-sky-300' },
                    '27': { workType: '품질 검사', startTime: '09:00', endTime: '18:00', workers: 8, color: 'bg-cyan-50 border-cyan-300' },
                    '28': { workType: '제품 조립', startTime: '09:00', endTime: '18:00', workers: 7, color: 'bg-blue-50 border-blue-300' },
                  };

                  // 이전 달 빈 셀
                  for (let i = 0; i < firstDay; i++) {
                    cells.push(<div key={`empty-${i}`} className="min-h-[120px]"></div>);
                  }

                  // 현재 달 날짜
                  for (let date = 1; date <= lastDate; date++) {
                    const dayOfWeek = new Date(year, month, date).getDay();
                    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
                    const isToday = date === 28 && month === 0 && year === 2026;
                    const schedule = schedules[date];

                    cells.push(
                      <div
                        key={date}
                        onClick={() => {
                          const clickedDate = new Date(year, month, date);
                          setSelectedCalendarDate(clickedDate);
                          setShowScheduleModal(true);
                        }}
                        className={`min-h-[120px] border-2 rounded-lg p-3 transition-all hover:shadow-lg cursor-pointer ${
                          isToday ? 'ring-2 ring-duru-orange-500' : ''
                        } ${
                          isWeekend ? 'bg-gray-50 border-gray-200' :
                          schedule ? schedule.color : 'bg-white border-gray-200 hover:border-duru-orange-300'
                        }`}
                      >
                        <div className="flex flex-col h-full">
                          <div className="flex items-center justify-between mb-2">
                            <span className={`text-lg font-bold ${
                              dayOfWeek === 0 ? 'text-red-600' :
                              dayOfWeek === 6 ? 'text-blue-600' :
                              'text-gray-900'
                            }`}>
                              {date}
                            </span>
                            {schedule && (
                              <span className="text-xs bg-white px-2 py-0.5 rounded-full font-semibold text-gray-700 border">
                                {schedule.workers}명
                              </span>
                            )}
                          </div>

                          {schedule && (
                            <div className="flex-1 flex flex-col gap-1">
                              <p className="text-sm font-bold text-gray-900 line-clamp-2">{schedule.workType}</p>
                              <div className="flex items-center gap-1 text-xs text-gray-600">
                                <Clock className="w-3 h-3" />
                                <span>{schedule.startTime} - {schedule.endTime}</span>
                              </div>
                            </div>
                          )}

                          {!schedule && !isWeekend && (
                            <div className="flex-1 flex items-center justify-center">
                              <Plus className="w-6 h-6 text-gray-400" />
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  }

                  return cells;
                })()}
              </div>
            </div>

            {/* 일정 요약 */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl p-6 border border-gray-200">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <FileText className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">이번 달 작업</p>
                    <p className="text-2xl font-bold text-gray-900">15개</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 border border-gray-200">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <Users className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">평균 투입 인원</p>
                    <p className="text-2xl font-bold text-gray-900">6명</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 border border-gray-200">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-duru-orange-100 rounded-lg flex items-center justify-center">
                    <Clock className="w-6 h-6 text-duru-orange-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">평균 근무 시간</p>
                    <p className="text-2xl font-bold text-gray-900">8시간</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'stats' && (
          <div className="bg-white rounded-xl p-8 border border-gray-200 text-center">
            <TrendingUp className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">통계 및 리포트</h3>
            <p className="text-gray-600">월별/주별 출근율과 근무시간 통계를 확인할 수 있습니다.</p>
          </div>
        )}
      </div>

      {/* 근로자 추가 모달 */}
      {showAddWorkerModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center">
          <div className="absolute inset-0 bg-black/40" onClick={() => setShowAddWorkerModal(false)} />
          <div className="relative bg-white rounded-2xl w-full max-w-lg mx-4 max-h-[90vh] overflow-y-auto shadow-xl">
            {/* 모달 헤더 */}
            <div className="sticky top-0 bg-white rounded-t-2xl border-b border-gray-200 px-6 py-5 flex items-center justify-between z-10">
              <div>
                <h2 className="text-lg font-bold text-gray-900">근로자 추가</h2>
                <p className="text-xs text-gray-500 mt-0.5">근로자 기본 정보를 입력해주세요</p>
              </div>
              <button
                onClick={() => setShowAddWorkerModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>

            <div className="px-6 py-5 space-y-5">
              {/* 섹션 1: 기본 인적 정보 */}
              <div className="bg-gray-50 rounded-xl p-5 border border-gray-200">
                <h3 className="text-sm font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Users className="w-4 h-4 text-duru-orange-500" />
                  기본 인적 정보
                </h3>
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      이름 <span className="text-duru-orange-500">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="근로자 이름"
                        value={addWorkerForm.name}
                        onChange={(e) => updateAddWorkerForm('name', e.target.value)}
                        className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-duru-orange-500 focus:border-transparent placeholder:text-gray-400"
                      />
                      {addWorkerComplete.name && (
                        <CheckCircle2 className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-green-500" />
                      )}
                    </div>
                  </div>

                  {/* 민감 정보 영역 */}
                  <div className="bg-amber-50/60 rounded-lg p-3 space-y-3 border border-amber-200/60">
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">
                        주민등록번호 <span className="text-duru-orange-500">*</span>
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          placeholder="000000-0000000"
                          value={addWorkerForm.ssn}
                          onChange={(e) => updateAddWorkerForm('ssn', e.target.value)}
                          className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-duru-orange-500 focus:border-transparent placeholder:text-gray-400 bg-white"
                        />
                        {addWorkerComplete.ssn && (
                          <CheckCircle2 className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-green-500" />
                        )}
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">
                        성별 <span className="text-duru-orange-500">*</span>
                      </label>
                      <div className="flex gap-2">
                        {['남', '여'].map((g) => (
                          <button
                            key={g}
                            onClick={() => updateAddWorkerForm('gender', g)}
                            className={`flex-1 py-2.5 rounded-lg text-sm font-semibold transition-colors border ${
                              addWorkerForm.gender === g
                                ? 'bg-duru-orange-500 text-white border-duru-orange-500'
                                : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                            }`}
                          >
                            {g}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      휴대폰 번호 <span className="text-duru-orange-500">*</span>
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type="tel"
                        placeholder="010-0000-0000"
                        value={addWorkerForm.phone}
                        onChange={(e) => updateAddWorkerForm('phone', e.target.value)}
                        className="w-full pl-9 pr-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-duru-orange-500 focus:border-transparent placeholder:text-gray-400"
                      />
                      {addWorkerComplete.phone && (
                        <CheckCircle2 className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-green-500" />
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* 섹션 2: 비상 연락처 정보 */}
              <div className="bg-gray-50 rounded-xl p-5 border border-gray-200">
                <h3 className="text-sm font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Heart className="w-4 h-4 text-duru-orange-500" />
                  비상 연락처 정보
                </h3>
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      비상 연락처 이름 <span className="text-duru-orange-500">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="보호자 / 비상연락 대상자"
                        value={addWorkerForm.emergencyName}
                        onChange={(e) => updateAddWorkerForm('emergencyName', e.target.value)}
                        className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-duru-orange-500 focus:border-transparent placeholder:text-gray-400"
                      />
                      {addWorkerComplete.emergencyName && (
                        <CheckCircle2 className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-green-500" />
                      )}
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      근로자와의 관계 <span className="text-duru-orange-500">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="부모, 보호자 등"
                        value={addWorkerForm.emergencyRelation}
                        onChange={(e) => updateAddWorkerForm('emergencyRelation', e.target.value)}
                        className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-duru-orange-500 focus:border-transparent placeholder:text-gray-400"
                      />
                      {addWorkerComplete.emergencyRelation && (
                        <CheckCircle2 className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-green-500" />
                      )}
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      비상 연락처 전화번호 <span className="text-duru-orange-500">*</span>
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type="tel"
                        placeholder="010-0000-0000"
                        value={addWorkerForm.emergencyPhone}
                        onChange={(e) => updateAddWorkerForm('emergencyPhone', e.target.value)}
                        className="w-full pl-9 pr-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-duru-orange-500 focus:border-transparent placeholder:text-gray-400"
                      />
                      {addWorkerComplete.emergencyPhone && (
                        <CheckCircle2 className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-green-500" />
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* 섹션 3: 장애 정보 */}
              <div className="bg-gray-50 rounded-xl p-5 border border-gray-200">
                <h3 className="text-sm font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Shield className="w-4 h-4 text-duru-orange-500" />
                  장애 정보
                </h3>
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      장애 유형 <span className="text-duru-orange-500">*</span>
                    </label>
                    <div className="relative">
                      <select
                        value={addWorkerForm.disabilityType}
                        onChange={(e) => updateAddWorkerForm('disabilityType', e.target.value)}
                        className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-duru-orange-500 focus:border-transparent appearance-none bg-white text-gray-700"
                      >
                        <option value="">장애 유형 선택</option>
                        {disabilityTypes.map((type) => (
                          <option key={type} value={type}>{type}</option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      장애 등급 <span className="text-duru-orange-500">*</span>
                    </label>
                    <div className="flex gap-2">
                      {[1, 2, 3, 4, 5, 6].map((grade) => (
                        <button
                          key={grade}
                          onClick={() => updateAddWorkerForm('disabilityGrade', grade.toString())}
                          className={`flex-1 py-2.5 rounded-lg text-sm font-semibold transition-colors border ${
                            addWorkerForm.disabilityGrade === grade.toString()
                              ? 'bg-duru-orange-500 text-white border-duru-orange-500'
                              : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                          }`}
                        >
                          {grade}급
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      중증 / 경증 <span className="text-duru-orange-500">*</span>
                    </label>
                    <div className="flex gap-2">
                      {['중증', '경증'].map((s) => (
                        <button
                          key={s}
                          onClick={() => updateAddWorkerForm('disabilitySeverity', s)}
                          className={`flex-1 py-2.5 rounded-lg text-sm font-semibold transition-colors border ${
                            addWorkerForm.disabilitySeverity === s
                              ? s === '중증'
                                ? 'bg-red-500 text-white border-red-500'
                                : 'bg-blue-500 text-white border-blue-500'
                              : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                          }`}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* 섹션 4: 근무 및 인정 정보 */}
              <div className="bg-gray-50 rounded-xl p-5 border border-gray-200">
                <h3 className="text-sm font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Briefcase className="w-4 h-4 text-duru-orange-500" />
                  근무 및 인정 정보
                </h3>
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      입사일 <span className="text-duru-orange-500">*</span>
                    </label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type="date"
                        value={addWorkerForm.hireDate}
                        onChange={(e) => updateAddWorkerForm('hireDate', e.target.value)}
                        className="w-full pl-9 pr-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-duru-orange-500 focus:border-transparent text-gray-700"
                      />
                      {addWorkerComplete.hireDate && (
                        <CheckCircle2 className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-green-500" />
                      )}
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      장애인 인정일 <span className="text-duru-orange-500">*</span>
                    </label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type="date"
                        value={addWorkerForm.recognitionDate}
                        onChange={(e) => updateAddWorkerForm('recognitionDate', e.target.value)}
                        className="w-full pl-9 pr-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-duru-orange-500 focus:border-transparent text-gray-700"
                      />
                      {addWorkerComplete.recognitionDate && (
                        <CheckCircle2 className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-green-500" />
                      )}
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-2">
                      근무 요일 <span className="text-duru-orange-500">*</span>
                    </label>
                    <div className="grid grid-cols-7 gap-2 mb-3">
                      {['월', '화', '수', '목', '금', '토', '일'].map((day) => {
                        const isSelected = addWorkerForm.workDays.includes(day);
                        return (
                          <button
                            key={day}
                            type="button"
                            onClick={() => {
                              const newWorkDays = isSelected
                                ? addWorkerForm.workDays.filter(d => d !== day)
                                : [...addWorkerForm.workDays, day];
                              updateAddWorkerForm('workDays', newWorkDays);
                            }}
                            className={`py-2.5 rounded-lg text-sm font-semibold transition-colors border ${
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
                    {addWorkerComplete.workDays && (
                      <div className="flex items-center gap-1 text-xs text-green-600 mb-3">
                        <CheckCircle2 className="w-3 h-3" />
                        <span>{addWorkerForm.workDays.join(', ')} 선택됨</span>
                      </div>
                    )}
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      출근 시간 <span className="text-duru-orange-500">*</span>
                    </label>
                    <div className="relative">
                      <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type="time"
                        value={addWorkerForm.workStartTime}
                        onChange={(e) => updateAddWorkerForm('workStartTime', e.target.value)}
                        className="w-full pl-9 pr-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-duru-orange-500 focus:border-transparent text-gray-700"
                      />
                      {addWorkerComplete.workStartTime && (
                        <CheckCircle2 className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-green-500" />
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* 섹션 5: 근로자 고유 번호 설정 */}
              <div className="bg-duru-orange-50 rounded-xl p-5 border border-duru-orange-200">
                <h3 className="text-sm font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Hash className="w-4 h-4 text-duru-orange-500" />
                  근로자 고유 번호 설정
                </h3>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    근로자 고유 번호 <span className="text-duru-orange-500">*</span>
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-duru-orange-400" />
                    <input
                      type="text"
                      placeholder="관리자가 부여하는 고유 번호"
                      value={addWorkerForm.workerId}
                      onChange={(e) => updateAddWorkerForm('workerId', e.target.value)}
                      className="w-full pl-9 pr-3 py-2.5 border border-duru-orange-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-duru-orange-500 focus:border-transparent placeholder:text-gray-400 bg-white"
                    />
                    {addWorkerComplete.workerId && (
                      <CheckCircle2 className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-green-500" />
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* 모달 푸터 */}
            <div className="sticky bottom-0 bg-white rounded-b-2xl border-t border-gray-200 px-6 py-4 flex gap-3">
              <button
                onClick={() => setShowAddWorkerModal(false)}
                className="flex-1 py-3 border border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-colors text-sm"
              >
                취소
              </button>
              <button
                onClick={handleAddWorkerSubmit}
                disabled={!addWorkerRequired.every(f => addWorkerForm[f] && addWorkerForm[f].toString().trim())}
                className="flex-[2] py-3 bg-duru-orange-500 text-white rounded-xl font-semibold hover:bg-duru-orange-600 transition-colors text-sm disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                <Check className="w-4 h-4" />
                근로자 추가 완료
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 일정 등록 모달 */}
      {showScheduleModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 max-w-lg w-full">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-gray-900">근무 일정 등록</h3>
              <button
                onClick={() => {
                  setShowScheduleModal(false);
                  setScheduleForm({ workType: '' });
                }}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            {selectedCalendarDate && (
              <p className="text-gray-600 mb-6">
                {selectedCalendarDate.toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' })}
              </p>
            )}

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">근무 내용</label>
                <textarea
                  value={scheduleForm.workType}
                  onChange={(e) => setScheduleForm({ ...scheduleForm, workType: e.target.value })}
                  placeholder="해당 날짜의 근무 내용을 입력하세요..."
                  rows={8}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-duru-orange-500 resize-none"
                />
              </div>
            </div>

            <div className="flex gap-3 mt-8">
              <button
                onClick={() => {
                  setShowScheduleModal(false);
                  setScheduleForm({ workType: '' });
                }}
                className="flex-1 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
              >
                취소
              </button>
              <button
                onClick={() => {
                  // 실제로는 서버에 저장
                  console.log('일정 저장:', { date: selectedCalendarDate, ...scheduleForm });
                  setShowScheduleModal(false);
                  setScheduleForm({ workType: '' });
                }}
                disabled={!scheduleForm.workType.trim()}
                className="flex-1 py-3 bg-duru-orange-500 text-white rounded-lg font-semibold hover:bg-duru-orange-600 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                저장
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CompanyDashboard;