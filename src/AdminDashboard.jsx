import React, { useState } from 'react';
import { ArrowLeft, Users, Building2, TrendingUp, AlertCircle, DollarSign, FileText, Search, Bell, Calendar, UserCheck, Clock, ChevronRight, Edit, Eye, Download, Upload, MessageSquare, Filter, Save, X, Check, ChevronDown, ChevronUp, BarChart3, Printer, Lock, CheckCircle2, Mail, Phone, MapPin, User } from 'lucide-react';
import AdminWorkerDetail from './AdminWorkerDetail';
import CompanyDetail from './CompanyDetail';

const AdminDashboard = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState('dashboard'); // dashboard, companies, workers, workstats, notices, notifications, reports
  const [selectedMonth, setSelectedMonth] = useState('2026-01');
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [selectedWorker, setSelectedWorker] = useState(null);
  const [editingCell, setEditingCell] = useState(null); // {companyId, workerId, field}
  const [editValue, setEditValue] = useState('');
  const [expandedCompanies, setExpandedCompanies] = useState({});
  const [searchQuery, setSearchQuery] = useState('');
  const [workStatsSearchQuery, setWorkStatsSearchQuery] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date(2026, 0, 28)); // 2026-01-28
  const [selectedTimeSlot, setSelectedTimeSlot] = useState({}); // 회사별 오전/오후 선택
  const [printPreview, setPrintPreview] = useState(null); // {companyName, workers}
  const [editingPreviewCell, setEditingPreviewCell] = useState(null); // {workerId, field}
  const [previewEditValue, setPreviewEditValue] = useState('');
  const [showAddCompanyModal, setShowAddCompanyModal] = useState(false);
  const [addCompanyForm, setAddCompanyForm] = useState({
    companyName: '',
    businessNumber: '',
    address: '',
    contractStartDate: '',
    contactName: '',
    contactPhone: '',
    contactEmail: '',
    adminId: '',
  });
  const [addCompanyComplete, setAddCompanyComplete] = useState({});
  const [editingRevenue, setEditingRevenue] = useState(null); // {companyId: number}
  const [revenueEditValue, setRevenueEditValue] = useState('');
  const [selectedCompaniesForNotice, setSelectedCompaniesForNotice] = useState([]);
  const [noticeContent, setNoticeContent] = useState('');
  const [companySearchQuery, setCompanySearchQuery] = useState('');
  const [expandedNotices, setExpandedNotices] = useState(new Set());
  const [sentNotices, setSentNotices] = useState([
    {
      id: 1,
      date: '2026-02-02 14:30',
      companies: ['(주)두루빛 제조', '세종식품', '한빛포장', '그린팜', '참좋은케어'],
      content: '폭설로 인해 금일 출근이 제한됩니다.\n안전을 위해 자택 대기 바랍니다.',
      sender: '관리자'
    },
    {
      id: 2,
      date: '2026-01-28 09:15',
      companies: ['그린팜', '참좋은케어'],
      content: '2월 근무 일정표가 변경되었습니다.\n기업 관리자에게 확인 바랍니다.',
      sender: '관리자'
    }
  ]);
  const [selectedInquiry, setSelectedInquiry] = useState(null);
  const [inquiryList, setInquiryList] = useState([
    { id: 1, company: '(주)삼성전자', ceo: '홍길동', date: '2026-01-30', phone: '02-1234-5678', email: 'hong@samsung.com', summary: '장애인 고용 관련 상담을 받고 싶습니다.', content: '현재 장애인 고용 의무 비율 관련하여 채용 및 관리 프로세스 상담을 받고 싶습니다. 특히 제조 현장에 적합한 직무 배치 방안이 궁금합니다.' },
    { id: 2, company: '(주)현대자동차', ceo: '김철수', date: '2026-01-29', phone: '02-2345-6789', email: 'kim@hyundai.com', summary: '파견 근로자 배치 문의드립니다.', content: '울산 공장 내 경포장 라인에 장애인 근로자 파견을 검토하고 있습니다. 가능한 인원과 절차가 궁금합니다.' },
    { id: 3, company: '(주)LG전자', ceo: '박영희', date: '2026-01-28', phone: '02-3456-7890', email: 'park@lg.com', summary: '고용 장려금 컨설팅 요청합니다.', content: '장애인 고용 장려금 신청 절차와 두루빛터 서비스 연계 방안에 대해 상세히 알고 싶습니다.' },
    { id: 4, company: '(주)CJ대한통운', ceo: '이정호', date: '2026-01-27', phone: '02-4567-8901', email: 'lee@cj.com', summary: '물류센터 인력 배치 상담 요청합니다.', content: '경기도 이천 물류센터에 단순 분류 작업이 가능한 장애인 근로자 배치를 희망합니다.' },
    { id: 5, company: '(주)아모레퍼시픽', ceo: '서민지', date: '2026-01-26', phone: '02-5678-9012', email: 'seo@amore.com', summary: '사회공헌 연계 고용 프로그램 문의합니다.', content: 'ESG 경영 차원에서 장애인 고용과 연계한 사회공헌 프로그램을 기획 중입니다. 협업 가능 여부를 확인하고 싶습니다.' },
    { id: 6, company: '(주)롯데마트', ceo: '한상우', date: '2026-01-25', phone: '02-6789-0123', email: 'han@lotte.com', summary: '매장 내 직무 배치 가능 여부가 궁금합니다.', content: '서울 시내 매장에 장애인 근로자를 배치할 수 있는 직무가 있는지 상담받고 싶습니다.' },
  ]);
  const [companiesData, setCompaniesData] = useState([
    { id: 1, name: '(주)두루빛 제조', industry: '제조업', location: '서울 강남구', workers: 15, contractEnd: '2026-12-31', status: 'active', revenue: 4500000 },
    { id: 2, name: '세종식품', industry: '식품가공', location: '경기 성남시', workers: 12, contractEnd: '2026-03-15', status: 'expiring', revenue: 3600000 },
    { id: 3, name: '한빛포장', industry: '포장/물류', location: '인천 남동구', workers: 18, contractEnd: '2027-06-30', status: 'active', revenue: 5400000 },
    { id: 4, name: '그린팜', industry: '농업', location: '충남 천안시', workers: 8, contractEnd: '2026-02-28', status: 'expiring', revenue: 2400000 },
    { id: 5, name: '참좋은케어', industry: '서비스업', location: '서울 송파구', workers: 10, contractEnd: '2026-09-15', status: 'active', revenue: 3000000 },
  ]);

  const updateAddCompanyForm = (field, value) => {
    const newForm = { ...addCompanyForm, [field]: value };
    setAddCompanyForm(newForm);
    const newComplete = { ...addCompanyComplete };
    if (value.trim()) {
      newComplete[field] = true;
    } else {
      delete newComplete[field];
    }
    setAddCompanyComplete(newComplete);
  };

  const handleAddCompanySubmit = () => {
    const required = ['companyName', 'businessNumber', 'contractStartDate', 'contactName', 'contactPhone', 'adminId'];
    const allFilled = required.every(f => addCompanyForm[f].trim());
    if (!allFilled) return;
    setShowAddCompanyModal(false);
    setAddCompanyForm({ companyName: '', businessNumber: '', address: '', contractStartDate: '', contactName: '', contactPhone: '', contactEmail: '', adminId: '' });
    setAddCompanyComplete({});
  };

  // 더미 데이터
  const stats = {
    totalCompanies: 24,
    totalWorkers: 156,
    activeWorkers: 142,
    attendanceRate: 94.5,
    expiringContracts: 5,
    pendingIssues: 14,
    monthlyRevenue: 45600000,
    newInquiries: 8,
    pendingConsultations: 5
  };

  const startRevenueEdit = (companyId, currentRevenue) => {
    setEditingRevenue(companyId);
    setRevenueEditValue((currentRevenue / 10000).toString());
  };

  const saveRevenueEdit = (companyId) => {
    const newRevenue = parseFloat(revenueEditValue) * 10000;
    if (!isNaN(newRevenue) && newRevenue >= 0) {
      setCompaniesData(prev =>
        prev.map(company =>
          company.id === companyId ? { ...company, revenue: newRevenue } : company
        )
      );
    }
    setEditingRevenue(null);
    setRevenueEditValue('');
  };

  const cancelRevenueEdit = () => {
    setEditingRevenue(null);
    setRevenueEditValue('');
  };

  const workers = [
    { id: 1, name: '김민수', company: '(주)두루빛 제조', department: '제조부', disability: '지체장애 3급', status: 'working', phone: '010-1234-5678', contractEnd: '2026-12-31' },
    { id: 2, name: '이영희', company: '(주)두루빛 제조', department: '포장부', disability: '청각장애 2급', status: 'working', phone: '010-2345-6789', contractEnd: '2026-12-31' },
    { id: 3, name: '박철수', company: '세종식품', department: '생산부', disability: '시각장애 4급', status: 'working', phone: '010-3456-7890', contractEnd: '2026-03-15' },
    { id: 4, name: '정미라', company: '한빛포장', department: '품질관리', disability: '지체장애 2급', status: 'working', phone: '010-4567-8901', contractEnd: '2027-06-30' },
    { id: 5, name: '최동욱', company: '그린팜', department: '재배', disability: '발달장애 3급', status: 'absent', phone: '010-5678-9012', contractEnd: '2026-02-28' },
  ];

  const notifications = [
    { id: 1, type: 'contract', title: '세종식품 계약 만료 임박', message: '2026년 3월 15일 계약 만료 예정', priority: 'high', date: '2026-01-28' },
    { id: 2, type: 'document', title: '김민수 건강검진 만료', message: '건강검진 갱신 필요 (만료: 2026-02-10)', priority: 'medium', date: '2026-01-27' },
    { id: 3, type: 'attendance', title: '최동욱 장기 결근', message: '3일 연속 결근, 연락 필요', priority: 'high', date: '2026-01-26' },
    { id: 4, type: 'payment', title: '한빛포장 1월 정산 완료', message: '정산 금액: ₩5,400,000', priority: 'low', date: '2026-01-25' },
  ];

  const absenceAlerts = [
    { id: 1, name: '최동욱', company: '그린팜', date: '2026-01-26', status: '결근' },
    { id: 3, name: '정미라', company: '한빛포장', date: '2026-01-31', status: '결근' },
    { id: 5, name: '박철수', company: '세종식품', date: '2026-02-01', status: '결근' },
  ];


  // 오늘 날짜 출퇴근 데이터 (회사별, 시간대별로 그룹화)
  const [dailyAttendance, setDailyAttendance] = useState({
    '(주)두루빛 제조': {
      morning: [
        { id: 1, name: '김민수', department: '제조부', checkin: '09:00', checkout: '-', workContent: '', needsAttention: false },
        { id: 2, name: '이영희', department: '포장부', checkin: '09:05', checkout: '-', workContent: '', needsAttention: false },
      ],
      afternoon: [
        { id: 7, name: '김수진', department: '제조부', checkin: '14:00', checkout: '-', workContent: '', needsAttention: false },
        { id: 11, name: '박서준', department: '포장부', checkin: '14:05', checkout: '-', workContent: '', needsAttention: false },
      ]
    },
    '세종식품': {
      morning: [
        { id: 3, name: '박철수', department: '생산부', checkin: '09:00', checkout: '-', workContent: '', needsAttention: false },
        { id: 8, name: '이민호', department: '생산부', checkin: '-', checkout: '-', workContent: '', needsAttention: true },
      ],
      afternoon: [
        { id: 12, name: '최민지', department: '생산부', checkin: '13:00', checkout: '-', workContent: '', needsAttention: false },
      ]
    },
    '한빛포장': {
      morning: [
        { id: 4, name: '정미라', department: '품질관리', checkin: '09:10', checkout: '-', workContent: '', needsAttention: true },
        { id: 9, name: '박지영', department: '포장부', checkin: '09:00', checkout: '-', workContent: '', needsAttention: false },
      ],
      afternoon: [
        { id: 13, name: '이준호', department: '포장부', checkin: '14:00', checkout: '-', workContent: '', needsAttention: false },
        { id: 14, name: '김하은', department: '품질관리', checkin: '14:10', checkout: '-', workContent: '', needsAttention: false },
      ]
    },
    '그린팜': {
      morning: [
        { id: 5, name: '최동욱', department: '재배', checkin: '-', checkout: '-', workContent: '', needsAttention: true },
        { id: 10, name: '강태민', department: '재배', checkin: '09:00', checkout: '-', workContent: '', needsAttention: false },
      ],
      afternoon: [
        { id: 15, name: '윤서아', department: '재배', checkin: '13:30', checkout: '-', workContent: '', needsAttention: false },
      ]
    },
  });

  const startEdit = (companyName, workerId, field, currentValue) => {
    setEditingCell({ companyName, workerId, field });
    setEditValue(currentValue);
  };

  const saveEdit = (companyName, workerId, field, timeSlot) => {
    setDailyAttendance(prev => ({
      ...prev,
      [companyName]: {
        ...prev[companyName],
        [timeSlot]: prev[companyName][timeSlot].map(worker =>
          worker.id === workerId ? { ...worker, [field]: editValue, needsAttention: false } : worker
        )
      }
    }));
    setEditingCell(null);
    setEditValue('');
  };

  const cancelEdit = () => {
    setEditingCell(null);
    setEditValue('');
  };

  const toggleCompany = (companyName) => {
    setExpandedCompanies(prev => ({
      ...prev,
      [companyName]: !prev[companyName]
    }));
  };

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const days = ['일', '월', '화', '수', '목', '금', '토'];
    const dayOfWeek = days[date.getDay()];
    return `${year}년 ${month}월 ${day}일 (${dayOfWeek})`;
  };

  const changeDate = (offset) => {
    const newDate = new Date(selectedDate);
    newDate.setDate(newDate.getDate() + offset);
    setSelectedDate(newDate);
  };

  const getAttendanceStatus = (worker) => {
    if (worker.checkin === '-') return '출근 전';
    if (worker.checkout === '-') return '출근 중';
    if (worker.checkin > '09:00') return '지각';
    return '출근 완료';
  };

  const getStatusColor = (status) => {
    switch(status) {
      case '출근 완료': return 'bg-green-100 text-green-700';
      case '출근 중': return 'bg-blue-100 text-blue-700';
      case '지각': return 'bg-yellow-100 text-yellow-700';
      case '출근 전': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const filteredCompanies = Object.entries(dailyAttendance).filter(([companyName]) =>
    companyName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // 근무 통계 데이터 (월별 근무시간)
  const [monthlyWorkStats, setMonthlyWorkStats] = useState({
    '(주)두루빛 제조': [
      { id: 1, name: '김민수', department: '제조부', workSchedule: '월, 화, 수, 목, 금', totalHours: 176, avgHours: 8.0, workDays: 22, lateDays: 0 },
      { id: 2, name: '이영희', department: '포장부', workSchedule: '월, 화, 수, 목, 금', totalHours: 168, avgHours: 7.6, workDays: 22, lateDays: 1 },
      { id: 7, name: '김수진', department: '제조부', workSchedule: '화, 수, 목, 금, 토', totalHours: 172, avgHours: 7.8, workDays: 22, lateDays: 0 },
      { id: 16, name: '박영수', department: '포장부', workSchedule: '월, 화, 수, 목, 금', totalHours: 180, avgHours: 8.2, workDays: 22, lateDays: 0 },
      { id: 17, name: '최지현', department: '제조부', workSchedule: '월, 수, 금', totalHours: 170, avgHours: 7.7, workDays: 22, lateDays: 1 },
    ],
    '세종식품': [
      { id: 3, name: '박철수', department: '생산부', workSchedule: '월, 화, 수, 목, 금', totalHours: 180, avgHours: 8.2, workDays: 22, lateDays: 0 },
      { id: 8, name: '이민호', department: '생산부', workSchedule: '화, 수, 목, 금, 토', totalHours: 160, avgHours: 7.3, workDays: 22, lateDays: 3 },
    ],
    '한빛포장': [
      { id: 4, name: '정미라', department: '품질관리', workSchedule: '월, 화, 수, 목, 금', totalHours: 176, avgHours: 8.0, workDays: 22, lateDays: 2 },
      { id: 9, name: '박지영', department: '포장부', workSchedule: '월, 화, 목', totalHours: 175, avgHours: 8.0, workDays: 22, lateDays: 0 },
    ],
    '그린팜': [
      { id: 5, name: '최동욱', department: '재배', workSchedule: '월, 화, 수, 목, 금', totalHours: 140, avgHours: 6.4, workDays: 22, lateDays: 5 },
      { id: 10, name: '강태민', department: '재배', workSchedule: '화, 수, 목, 금, 토', totalHours: 176, avgHours: 8.0, workDays: 22, lateDays: 0 },
    ],
  });

  const handlePrint = (companyName) => {
    window.print();
  };

  const startWorkStatsEdit = (companyName, workerId, field, currentValue) => {
    setEditingPreviewCell({ companyName, workerId, field });
    setPreviewEditValue(currentValue.toString());
  };

  const saveWorkStatsEdit = () => {
    if (!editingPreviewCell) return;

    const { companyName, workerId, field } = editingPreviewCell;
    setMonthlyWorkStats(prev => ({
      ...prev,
      [companyName]: prev[companyName].map(worker =>
        worker.id === workerId ? { ...worker, [field]: Number(previewEditValue) } : worker
      )
    }));
    setEditingPreviewCell(null);
    setPreviewEditValue('');
  };

  const cancelWorkStatsEdit = () => {
    setEditingPreviewCell(null);
    setPreviewEditValue('');
  };

  const toggleCompanyForNotice = (companyId) => {
    setSelectedCompaniesForNotice(prev =>
      prev.includes(companyId)
        ? prev.filter(id => id !== companyId)
        : [...prev, companyId]
    );
  };

  const toggleAllCompaniesForNotice = () => {
    if (selectedCompaniesForNotice.length === companiesData.length) {
      setSelectedCompaniesForNotice([]);
    } else {
      setSelectedCompaniesForNotice(companiesData.map(c => c.id));
    }
  };

  const toggleNoticeExpand = (noticeId) => {
    setExpandedNotices(prev => {
      const newSet = new Set(prev);
      if (newSet.has(noticeId)) {
        newSet.delete(noticeId);
      } else {
        newSet.add(noticeId);
      }
      return newSet;
    });
  };

  const handleSendNotice = () => {
    if (selectedCompaniesForNotice.length === 0 || !noticeContent.trim()) {
      return;
    }

    // 선택된 회사 이름 배열 생성
    const selectedCompanyNames = companiesData
      .filter(c => selectedCompaniesForNotice.includes(c.id))
      .map(c => c.name);

    // 새 공지사항 기록 추가
    const newNotice = {
      id: Date.now(),
      date: new Date().toLocaleString('ko-KR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
      }).replace(/\. /g, '-').replace('.', ''),
      companies: selectedCompanyNames,
      content: noticeContent,
      sender: '관리자'
    };

    setSentNotices(prev => [newNotice, ...prev]);

    // 실제로는 여기서 API 호출
    console.log('공지사항 발송:', newNotice);

    // 초기화
    setSelectedCompaniesForNotice([]);
    setNoticeContent('');
    setCompanySearchQuery('');
    alert('공지사항이 성공적으로 발송되었습니다!');
  };

  // 상세보기 페이지 렌더링
  if (selectedWorker) {
    return <AdminWorkerDetail worker={selectedWorker} onClose={() => setSelectedWorker(null)} />;
  }

  if (selectedCompany) {
    return <CompanyDetail company={selectedCompany} onClose={() => setSelectedCompany(null)} />;
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
                <h1 className="text-2xl font-bold text-gray-900">두루빛터 관리자</h1>
                <p className="text-sm text-gray-600">통합 관리 시스템</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <Bell className="w-5 h-5 text-gray-600" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
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
          <div className="flex gap-8 overflow-x-auto">
            {[
              { id: 'dashboard', label: '대시보드', icon: TrendingUp },
              { id: 'companies', label: '회원사 관리', icon: Building2 },
              { id: 'workers', label: '근로자 관리', icon: Users },
              { id: 'workstats', label: '근무 통계', icon: BarChart3 },
              { id: 'notices', label: '공지사항', icon: MessageSquare },
              { id: 'notifications', label: '알림센터', icon: Bell },
              { id: 'reports', label: '리포트', icon: FileText }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 py-4 px-2 border-b-2 transition-colors whitespace-nowrap ${
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
                    <Building2 className="w-6 h-6 text-blue-600" />
                  </div>
                  <span className="text-xs text-green-600 font-semibold">+3 이번달</span>
                </div>
                <p className="text-sm text-gray-600 mb-1">전체 회원사</p>
                <p className="text-3xl font-bold text-gray-900">{stats.totalCompanies}개</p>
              </div>

              <div className="bg-white rounded-xl p-6 border border-duru-orange-200 bg-duru-orange-50">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-duru-orange-100 rounded-lg flex items-center justify-center">
                    <Users className="w-6 h-6 text-duru-orange-600" />
                  </div>
                  <span className="text-xs text-green-600 font-semibold">+12 이번달</span>
                </div>
                <p className="text-sm text-gray-600 mb-1">전체 근로자</p>
                <p className="text-3xl font-bold text-duru-orange-600">{stats.totalWorkers}명</p>
              </div>

              <div className="bg-white rounded-xl p-6 border border-green-200 bg-green-50">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <UserCheck className="w-6 h-6 text-green-600" />
                  </div>
                </div>
                <p className="text-sm text-gray-600 mb-1">근무 중</p>
                <p className="text-3xl font-bold text-green-600">{stats.activeWorkers}명</p>
              </div>

              <div className="bg-white rounded-xl p-6 border border-red-200 bg-red-50">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                    <AlertCircle className="w-6 h-6 text-red-600" />
                  </div>
                </div>
                <p className="text-sm text-gray-600 mb-1">긴급 알림</p>
                <p className="text-3xl font-bold text-red-600">{stats.pendingIssues}건</p>
              </div>
            </div>

            {/* 최근 알림 */}
            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  <Bell className="w-5 h-5 text-duru-orange-600" />
                  긴급 알림
                </h2>
                <button
                  onClick={() => setActiveTab('notifications')}
                  className="text-sm text-duru-orange-600 hover:text-duru-orange-700 font-semibold"
                >
                  전체보기 →
                </button>
              </div>
              <div className="space-y-3">
                {notifications.filter(n => n.priority === 'high').map(notif => (
                  <div key={notif.id} className="flex items-start gap-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                    <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <AlertCircle className="w-5 h-5 text-red-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-semibold text-gray-900">{notif.title}</span>
                        <span className="text-xs text-gray-500">{notif.date}</span>
                      </div>
                      <p className="text-sm text-gray-600">{notif.message}</p>
                    </div>
                    <button className="text-duru-orange-600 hover:text-duru-orange-700 font-semibold text-sm whitespace-nowrap">
                      처리하기
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* 회사별 출퇴근 현황 */}
            <div className="space-y-4">
              {/* 날짜 네비게이션 */}
              <div className="bg-white rounded-xl p-6 border border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                    <Clock className="w-6 h-6 text-duru-orange-600" />
                    출퇴근 현황 (회사별)
                  </h2>
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => changeDate(-1)}
                      className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                      title="이전 날짜"
                    >
                      <ChevronDown className="w-5 h-5 rotate-90" />
                    </button>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-5 h-5 text-duru-orange-600" />
                      <input
                        type="date"
                        value={selectedDate.toISOString().split('T')[0]}
                        onChange={(e) => setSelectedDate(new Date(e.target.value))}
                        className="px-4 py-2 border-2 border-duru-orange-500 rounded-lg bg-duru-orange-50 text-duru-orange-600 font-bold focus:outline-none focus:ring-2 focus:ring-duru-orange-500"
                      />
                    </div>
                    <button
                      onClick={() => changeDate(1)}
                      className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                      title="다음 날짜"
                    >
                      <ChevronDown className="w-5 h-5 -rotate-90" />
                    </button>
                  </div>
                </div>

                {/* 회사 검색 */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="회사명 검색..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-duru-orange-500"
                  />
                </div>
              </div>

              {/* 회사별 아코디언 */}
              {filteredCompanies.map(([companyName, companyData]) => {
                // 선택된 시간대 (기본값: morning)
                const currentTimeSlot = selectedTimeSlot[companyName] || 'morning';
                const companyWorkers = companyData[currentTimeSlot];

                const statusCounts = companyWorkers.reduce((acc, w) => {
                  const status = getAttendanceStatus(w);
                  acc[status] = (acc[status] || 0) + 1;
                  return acc;
                }, {});

                const isExpanded = expandedCompanies[companyName];

                // 전체 근로자 수 (오전 + 오후)
                const totalWorkers = companyData.morning.length + companyData.afternoon.length;
                const totalCheckedIn = [...companyData.morning, ...companyData.afternoon].filter(w => w.checkin !== '-').length;

                return (
                <div key={companyName} className="bg-white rounded-xl border border-gray-200">
                  <button
                    onClick={() => toggleCompany(companyName)}
                    className="w-full bg-gray-50 px-6 py-4 border-b border-gray-200 hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-1 hover:bg-gray-200 rounded transition-colors">
                          {isExpanded ? (
                            <ChevronDown className="w-5 h-5 text-gray-600" />
                          ) : (
                            <ChevronRight className="w-5 h-5 text-gray-600" />
                          )}
                        </div>
                        <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                          <Building2 className="w-5 h-5 text-duru-orange-600" />
                          {companyName}
                          <span className="text-sm font-normal text-gray-600 ml-2">
                            ({totalCheckedIn}/{totalWorkers}명 출근)
                          </span>
                        </h3>
                        {/* 오전/오후 토글 버튼 */}
                        <div
                          className="flex items-center bg-white border-2 border-duru-orange-200 rounded-lg overflow-hidden ml-3"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <button
                            onClick={() => setSelectedTimeSlot(prev => ({ ...prev, [companyName]: 'morning' }))}
                            className={`px-4 py-1.5 text-sm font-semibold transition-all ${
                              currentTimeSlot === 'morning'
                                ? 'bg-duru-orange-500 text-white'
                                : 'bg-white text-gray-600 hover:bg-duru-orange-50'
                            }`}
                          >
                            오전 ({companyData.morning.length}명)
                          </button>
                          <button
                            onClick={() => setSelectedTimeSlot(prev => ({ ...prev, [companyName]: 'afternoon' }))}
                            className={`px-4 py-1.5 text-sm font-semibold transition-all ${
                              currentTimeSlot === 'afternoon'
                                ? 'bg-duru-orange-500 text-white'
                                : 'bg-white text-gray-600 hover:bg-duru-orange-50'
                            }`}
                          >
                            오후 ({companyData.afternoon.length}명)
                          </button>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {Object.entries(statusCounts).map(([status, count]) => (
                          <span key={status} className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(status)}`}>
                            {status}: {count}명
                          </span>
                        ))}
                      </div>
                    </div>
                  </button>

                  {isExpanded && (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50 border-b border-gray-200">
                        <tr>
                          <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">이름</th>
                          <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">부서</th>
                          <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">상태</th>
                          <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">출근 시간</th>
                          <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">퇴근 시간</th>
                          <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">업무 내용</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {companyWorkers.map(worker => {
                          const status = getAttendanceStatus(worker);
                          return (
                          <tr
                            key={worker.id}
                            className={`hover:bg-gray-50 ${worker.needsAttention ? 'bg-yellow-50' : ''}`}
                          >
                            <td className="px-6 py-4">
                              <div className="flex items-center gap-2">
                                <span className="font-semibold text-gray-900">{worker.name}</span>
                                {worker.needsAttention && (
                                  <AlertCircle className="w-4 h-4 text-yellow-600" title="관리자 확인 필요" />
                                )}
                              </div>
                            </td>
                            <td className="px-6 py-4 text-gray-700">{worker.department}</td>
                            <td className="px-6 py-4">
                              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(status)}`}>
                                {status}
                              </span>
                            </td>
                            <td className="px-6 py-4">
                              {editingCell?.companyName === companyName &&
                               editingCell?.workerId === worker.id &&
                               editingCell?.field === 'checkin' ? (
                                <div className="flex items-center gap-2">
                                  <input
                                    type="time"
                                    value={editValue}
                                    onChange={(e) => setEditValue(e.target.value)}
                                    className="px-2 py-1 border border-duru-orange-500 rounded focus:outline-none focus:ring-2 focus:ring-duru-orange-500"
                                    autoFocus
                                  />
                                  <button
                                    onClick={() => saveEdit(companyName, worker.id, 'checkin', currentTimeSlot)}
                                    className="p-1 hover:bg-green-100 rounded"
                                  >
                                    <Check className="w-4 h-4 text-green-600" />
                                  </button>
                                  <button
                                    onClick={cancelEdit}
                                    className="p-1 hover:bg-red-100 rounded"
                                  >
                                    <X className="w-4 h-4 text-red-600" />
                                  </button>
                                </div>
                              ) : (
                                <div
                                  onClick={() => startEdit(companyName, worker.id, 'checkin', worker.checkin)}
                                  className="cursor-pointer hover:bg-gray-100 px-2 py-1 rounded inline-flex items-center gap-1"
                                >
                                  <span className={worker.checkin === '-' ? 'text-red-600 font-semibold' : 'text-gray-900'}>{worker.checkin}</span>
                                  <Edit className="w-3 h-3 text-gray-400" />
                                </div>
                              )}
                            </td>
                            <td className="px-6 py-4">
                              {editingCell?.companyName === companyName &&
                               editingCell?.workerId === worker.id &&
                               editingCell?.field === 'checkout' ? (
                                <div className="flex items-center gap-2">
                                  <input
                                    type="time"
                                    value={editValue}
                                    onChange={(e) => setEditValue(e.target.value)}
                                    className="px-2 py-1 border border-duru-orange-500 rounded focus:outline-none focus:ring-2 focus:ring-duru-orange-500"
                                    autoFocus
                                  />
                                  <button
                                    onClick={() => saveEdit(companyName, worker.id, 'checkout', currentTimeSlot)}
                                    className="p-1 hover:bg-green-100 rounded"
                                  >
                                    <Check className="w-4 h-4 text-green-600" />
                                  </button>
                                  <button
                                    onClick={cancelEdit}
                                    className="p-1 hover:bg-red-100 rounded"
                                  >
                                    <X className="w-4 h-4 text-red-600" />
                                  </button>
                                </div>
                              ) : (
                                <div
                                  onClick={() => startEdit(companyName, worker.id, 'checkout', worker.checkout)}
                                  className="cursor-pointer hover:bg-gray-100 px-2 py-1 rounded inline-flex items-center gap-1"
                                >
                                  <span className="text-gray-900">{worker.checkout}</span>
                                  <Edit className="w-3 h-3 text-gray-400" />
                                </div>
                              )}
                            </td>
                            <td className="px-6 py-4">
                              {editingCell?.companyName === companyName &&
                               editingCell?.workerId === worker.id &&
                               editingCell?.field === 'workContent' ? (
                                <div className="flex items-center gap-2">
                                  <input
                                    type="text"
                                    value={editValue}
                                    onChange={(e) => setEditValue(e.target.value)}
                                    placeholder="업무 내용 입력..."
                                    className="px-2 py-1 border border-duru-orange-500 rounded focus:outline-none focus:ring-2 focus:ring-duru-orange-500 w-full"
                                    autoFocus
                                  />
                                  <button
                                    onClick={() => saveEdit(companyName, worker.id, 'workContent', currentTimeSlot)}
                                    className="p-1 hover:bg-green-100 rounded flex-shrink-0"
                                  >
                                    <Check className="w-4 h-4 text-green-600" />
                                  </button>
                                  <button
                                    onClick={cancelEdit}
                                    className="p-1 hover:bg-red-100 rounded flex-shrink-0"
                                  >
                                    <X className="w-4 h-4 text-red-600" />
                                  </button>
                                </div>
                              ) : (
                                <div
                                  onClick={() => startEdit(companyName, worker.id, 'workContent', worker.workContent)}
                                  className="cursor-pointer hover:bg-gray-100 px-2 py-1 rounded inline-flex items-center gap-1 min-w-[200px]"
                                >
                                  <span className={`text-gray-600 ${!worker.workContent && 'italic'}`}>
                                    {worker.workContent || '업무 내용 없음'}
                                  </span>
                                  <Edit className="w-3 h-3 text-gray-400" />
                                </div>
                              )}
                            </td>
                          </tr>
                        );
                        })}
                      </tbody>
                    </table>
                  </div>
                  )}
                </div>
                );
              })}
            </div>
          </div>
        )}

        {activeTab === 'companies' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">회원사 관리</h2>
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="회사명 검색..."
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-duru-orange-500"
                  />
                </div>
                <button
                  onClick={() => setShowAddCompanyModal(true)}
                  className="px-4 py-2 bg-duru-orange-500 text-white rounded-lg font-semibold hover:bg-duru-orange-600 transition-colors"
                >
                  + 회원사 추가
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {companiesData.map(company => (
                <div key={company.id} className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-all">
                  <div className="flex items-center gap-3 mb-3">
                    <h3 className="text-xl font-bold text-gray-900">{company.name}</h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      company.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                    }`}>
                      {company.status === 'active' ? '계약중' : '만료임박'}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-gray-600">업종</p>
                      <p className="font-semibold text-gray-900">{company.industry}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">위치</p>
                      <p className="font-semibold text-gray-900">{company.location}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">근로자 수</p>
                      <p className="font-semibold text-gray-900">{company.workers}명</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">계약만료</p>
                      <p className="font-semibold text-gray-900">{company.contractEnd}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">월 정산액</p>
                      {editingRevenue === company.id ? (
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-semibold text-gray-700">₩</span>
                          <input
                            type="number"
                            value={revenueEditValue}
                            onChange={(e) => setRevenueEditValue(e.target.value)}
                            placeholder="0"
                            className="w-20 px-2 py-1 border-2 border-duru-orange-500 rounded-lg text-base font-bold text-blue-600 focus:outline-none focus:ring-2 focus:ring-duru-orange-500 text-right"
                            autoFocus
                          />
                          <span className="text-sm font-semibold text-gray-700">만</span>
                          <button
                            onClick={() => saveRevenueEdit(company.id)}
                            className="p-1 hover:bg-green-100 rounded transition-colors"
                          >
                            <Check className="w-4 h-4 text-green-600" />
                          </button>
                          <button
                            onClick={cancelRevenueEdit}
                            className="p-1 hover:bg-red-100 rounded transition-colors"
                          >
                            <X className="w-4 h-4 text-red-600" />
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => startRevenueEdit(company.id, company.revenue)}
                          className="group flex items-center gap-1 hover:bg-gray-50 rounded transition-colors -ml-2"
                        >
                          <p className="font-semibold text-blue-600">₩{(company.revenue / 10000).toFixed(0)}만</p>
                          <Edit className="w-3 h-3 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </button>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setSelectedCompany(company)}
                      className="px-4 py-2 bg-duru-orange-500 text-white rounded-lg font-semibold hover:bg-duru-orange-600 transition-colors flex items-center gap-2"
                    >
                      <Eye className="w-4 h-4" />
                      상세보기
                    </button>
                    <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors flex items-center gap-2">
                      <Edit className="w-4 h-4" />
                      수정
                    </button>
                    <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors flex items-center gap-2">
                      <MessageSquare className="w-4 h-4" />
                      연락
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'workers' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">근로자 관리</h2>
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="이름, 회사명 검색..."
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-duru-orange-500"
                  />
                </div>
                <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                  <Filter className="w-5 h-5 text-gray-600" />
                </button>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-200">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">이름</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">회사</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">부서</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">장애유형</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">계약만료</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">상태</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">관리</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {workers.map(worker => (
                      <tr key={worker.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-duru-orange-100 rounded-full flex items-center justify-center">
                              <span className="text-sm font-bold text-duru-orange-600">{worker.name[0]}</span>
                            </div>
                            <div>
                              <p className="font-semibold text-gray-900">{worker.name}</p>
                              <p className="text-sm text-gray-600">{worker.phone}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-gray-900">{worker.company}</td>
                        <td className="px-6 py-4 text-gray-900">{worker.department}</td>
                        <td className="px-6 py-4 text-gray-600">{worker.disability}</td>
                        <td className="px-6 py-4 text-gray-900">{worker.contractEnd}</td>
                        <td className="px-6 py-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            worker.status === 'working' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                          }`}>
                            {worker.status === 'working' ? '근무중' : '결근'}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <button
                            onClick={() => setSelectedWorker({...worker, position: worker.department, hireDate: worker.contractEnd.substring(0, 10), contractStart: '2025-06-01'})}
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

        {activeTab === 'workstats' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                <BarChart3 className="w-7 h-7 text-duru-orange-600" />
                근무 통계
              </h2>
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="회사명 검색..."
                    value={workStatsSearchQuery}
                    onChange={(e) => setWorkStatsSearchQuery(e.target.value)}
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-duru-orange-500 w-64"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-duru-orange-600" />
                  <input
                    type="month"
                    value={selectedMonth}
                    onChange={(e) => setSelectedMonth(e.target.value)}
                    className="px-4 py-2 border-2 border-duru-orange-500 rounded-lg bg-duru-orange-50 text-duru-orange-600 font-bold focus:outline-none focus:ring-2 focus:ring-duru-orange-500"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              {Object.entries(monthlyWorkStats)
                .filter(([companyName]) =>
                  companyName.toLowerCase().includes(workStatsSearchQuery.toLowerCase())
                )
                .map(([companyName, companyWorkers]) => {
                const totalEmployees = companyWorkers.length;
                const avgWorkHours = (companyWorkers.reduce((sum, w) => sum + w.totalHours, 0) / totalEmployees).toFixed(1);
                const avgWorkDays = (companyWorkers.reduce((sum, w) => sum + w.workDays, 0) / totalEmployees).toFixed(1);
                const isExpanded = expandedCompanies[companyName];

                return (
                  <div key={companyName} className="bg-white rounded-xl border border-gray-200 overflow-hidden print:break-inside-avoid">
                    <button
                      onClick={() => toggleCompany(companyName)}
                      className="w-full bg-gradient-to-r from-duru-orange-50 to-white px-6 py-5 border-b border-gray-200 hover:from-duru-orange-100 hover:to-duru-orange-50 transition-all"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="p-2 bg-white rounded-lg shadow-sm">
                            {isExpanded ? (
                              <ChevronDown className="w-5 h-5 text-duru-orange-600" />
                            ) : (
                              <ChevronRight className="w-5 h-5 text-duru-orange-600" />
                            )}
                          </div>
                          <div className="text-left">
                            <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2 mb-1">
                              <Building2 className="w-5 h-5 text-duru-orange-600" />
                              {companyName}
                            </h3>
                            <p className="text-sm text-gray-600">전체 {totalEmployees}명</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setPrintPreview({ companyName, workers: companyWorkers });
                            }}
                            className="px-4 py-2 bg-duru-orange-500 text-white rounded-lg font-semibold hover:bg-duru-orange-600 transition-colors flex items-center gap-2"
                          >
                            <Eye className="w-4 h-4" />
                            인쇄 프리뷰
                          </button>
                        </div>
                      </div>
                    </button>

                    {isExpanded && (
                      <div className="p-6">
                        <div className="mb-6 print:block hidden">
                          <h2 className="text-2xl font-bold text-center mb-2">{companyName} 월 근무 통계</h2>
                          <p className="text-center text-gray-600">{selectedMonth.split('-')[0]}년 {selectedMonth.split('-')[1]}월</p>
                        </div>
                        <div className="overflow-x-auto">
                          <table className="w-full border-collapse">
                            <thead className="bg-duru-orange-50">
                              <tr>
                                <th className="px-4 py-3 text-left text-sm font-bold text-gray-900 border border-gray-300">이름</th>
                                <th className="px-4 py-3 text-center text-sm font-bold text-gray-900 border border-gray-300">근무요일</th>
                                <th className="px-4 py-3 text-center text-sm font-bold text-gray-900 border border-gray-300">출근 일수</th>
                                <th className="px-4 py-3 text-center text-sm font-bold text-gray-900 border border-gray-300">총 근무시간</th>
                              </tr>
                            </thead>
                            <tbody>
                              {companyWorkers.map((worker, index) => (
                                <tr key={worker.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                  <td className="px-4 py-3 font-semibold text-gray-900 border border-gray-300">{worker.name}</td>
                                  <td className="px-4 py-3 text-center text-gray-700 border border-gray-300">{worker.workSchedule}</td>
                                  <td className="px-4 py-3 text-center text-gray-900 border border-gray-300">
                                    {editingPreviewCell?.companyName === companyName &&
                                     editingPreviewCell?.workerId === worker.id &&
                                     editingPreviewCell?.field === 'workDays' ? (
                                      <div className="flex items-center justify-center gap-2">
                                        <input
                                          type="number"
                                          value={previewEditValue}
                                          onChange={(e) => setPreviewEditValue(e.target.value)}
                                          className="w-20 px-2 py-1 border border-duru-orange-500 rounded focus:outline-none focus:ring-2 focus:ring-duru-orange-500 text-center"
                                          autoFocus
                                        />
                                        <button
                                          onClick={saveWorkStatsEdit}
                                          className="p-1 hover:bg-green-100 rounded"
                                        >
                                          <Check className="w-4 h-4 text-green-600" />
                                        </button>
                                        <button
                                          onClick={cancelWorkStatsEdit}
                                          className="p-1 hover:bg-red-100 rounded"
                                        >
                                          <X className="w-4 h-4 text-red-600" />
                                        </button>
                                      </div>
                                    ) : (
                                      <div
                                        onClick={() => startWorkStatsEdit(companyName, worker.id, 'workDays', worker.workDays)}
                                        className="cursor-pointer hover:bg-gray-100 px-2 py-1 rounded inline-flex items-center gap-1"
                                      >
                                        <span>{worker.workDays}일</span>
                                        <Edit className="w-3 h-3 text-gray-400" />
                                      </div>
                                    )}
                                  </td>
                                  <td className="px-4 py-3 text-center font-bold text-blue-600 border border-gray-300">
                                    {editingPreviewCell?.companyName === companyName &&
                                     editingPreviewCell?.workerId === worker.id &&
                                     editingPreviewCell?.field === 'totalHours' ? (
                                      <div className="flex items-center justify-center gap-2">
                                        <input
                                          type="number"
                                          value={previewEditValue}
                                          onChange={(e) => setPreviewEditValue(e.target.value)}
                                          className="w-20 px-2 py-1 border border-duru-orange-500 rounded focus:outline-none focus:ring-2 focus:ring-duru-orange-500 text-center"
                                          autoFocus
                                        />
                                        <button
                                          onClick={saveWorkStatsEdit}
                                          className="p-1 hover:bg-green-100 rounded"
                                        >
                                          <Check className="w-4 h-4 text-green-600" />
                                        </button>
                                        <button
                                          onClick={cancelWorkStatsEdit}
                                          className="p-1 hover:bg-red-100 rounded"
                                        >
                                          <X className="w-4 h-4 text-red-600" />
                                        </button>
                                      </div>
                                    ) : (
                                      <div
                                        onClick={() => startWorkStatsEdit(companyName, worker.id, 'totalHours', worker.totalHours)}
                                        className="cursor-pointer hover:bg-gray-100 px-2 py-1 rounded inline-flex items-center gap-1"
                                      >
                                        <span>{worker.totalHours}h</span>
                                        <Edit className="w-3 h-3 text-gray-400" />
                                      </div>
                                    )}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                            <tfoot className="bg-duru-orange-100 border-t-2 border-duru-orange-500">
                              <tr>
                                <td colSpan="2" className="px-4 py-3 font-bold text-gray-900 border border-gray-300">평균</td>
                                <td className="px-4 py-3 text-center font-bold text-gray-900 border border-gray-300">
                                  {avgWorkDays}일
                                </td>
                                <td className="px-4 py-3 text-center font-bold text-blue-600 border border-gray-300">
                                  {avgWorkHours}h
                                </td>
                              </tr>
                            </tfoot>
                          </table>
                        </div>
                        <div className="mt-8 pt-6 border-t-2 border-gray-300 print:block hidden">
                          <div className="grid grid-cols-2 gap-8 mb-6">
                            <div>
                              <p className="text-sm text-gray-600 mb-2">기업 (대표자)</p>
                              <div className="border-2 border-gray-300 rounded-lg p-6 h-24 flex items-center justify-center">
                                <p className="text-gray-400">(서명/인)</p>
                              </div>
                            </div>
                            <div>
                              <p className="text-sm text-gray-600 mb-2">두루빛터 (담당자)</p>
                              <div className="border-2 border-gray-300 rounded-lg p-6 h-24 flex items-center justify-center">
                                <p className="text-gray-400">(서명/인)</p>
                              </div>
                            </div>
                          </div>
                          <div className="flex justify-between text-sm text-gray-600 mt-4">
                            <div>발급일: {new Date().toLocaleDateString('ko-KR')}</div>
                            <div>두루빛터 중앙 통제 시스템</div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {activeTab === 'notices' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                <MessageSquare className="w-7 h-7 text-duru-orange-600" />
                공지사항 관리
              </h2>
            </div>

            {/* 공지사항 발송 섹션 */}
            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <Bell className="w-6 h-6 text-duru-orange-600" />
                새 공지사항 발송
              </h3>

              {/* 회사 선택 */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-base font-bold text-gray-900 flex items-center gap-2">
                    <Building2 className="w-5 h-5 text-duru-orange-600" />
                    발송 대상 회원사
                  </h4>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={toggleAllCompaniesForNotice}
                      className="px-4 py-2 bg-duru-orange-50 text-duru-orange-600 rounded-lg font-semibold hover:bg-duru-orange-100 transition-colors border border-duru-orange-200 text-sm"
                    >
                      {selectedCompaniesForNotice.length === companiesData.length ? '전체 해제' : '전체 선택'}
                    </button>
                  </div>
                </div>

                {/* 검색 바 */}
                <div className="relative mb-4">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="회사명으로 검색..."
                    value={companySearchQuery}
                    onChange={(e) => setCompanySearchQuery(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-duru-orange-500 focus:border-transparent placeholder:text-gray-400"
                  />
                </div>

                {/* 회사 목록 - 컴팩트한 체크박스 리스트 */}
                <div className="border-2 border-gray-200 rounded-lg max-h-72 overflow-y-auto">
                  {companiesData
                    .filter(company =>
                      company.name.toLowerCase().includes(companySearchQuery.toLowerCase()) ||
                      company.industry.toLowerCase().includes(companySearchQuery.toLowerCase()) ||
                      company.location.toLowerCase().includes(companySearchQuery.toLowerCase())
                    )
                    .map((company, index, array) => (
                      <label
                        key={company.id}
                        className={`flex items-center gap-3 px-4 py-3 cursor-pointer transition-colors ${
                          selectedCompaniesForNotice.includes(company.id)
                            ? 'bg-duru-orange-50'
                            : 'hover:bg-gray-50'
                        } ${index !== array.length - 1 ? 'border-b border-gray-200' : ''}`}
                      >
                        <input
                          type="checkbox"
                          checked={selectedCompaniesForNotice.includes(company.id)}
                          onChange={() => toggleCompanyForNotice(company.id)}
                          className="w-5 h-5 text-duru-orange-600 rounded focus:ring-duru-orange-500"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-gray-900 truncate">{company.name}</p>
                          <p className="text-sm text-gray-600 truncate">{company.industry} · {company.location}</p>
                        </div>
                        <div className="text-right flex-shrink-0">
                          <p className="text-sm font-semibold text-duru-orange-600">{company.workers}명</p>
                        </div>
                      </label>
                    ))
                  }
                  {companiesData.filter(company =>
                    company.name.toLowerCase().includes(companySearchQuery.toLowerCase()) ||
                    company.industry.toLowerCase().includes(companySearchQuery.toLowerCase()) ||
                    company.location.toLowerCase().includes(companySearchQuery.toLowerCase())
                  ).length === 0 && (
                    <div className="px-4 py-8 text-center text-gray-400">
                      검색 결과가 없습니다
                    </div>
                  )}
                </div>

                {/* 선택 요약 */}
                {selectedCompaniesForNotice.length > 0 && (
                  <div className="mt-4 bg-duru-orange-50 rounded-lg p-4 border border-duru-orange-200">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-semibold text-gray-900">선택된 회원사</p>
                      <p className="text-lg font-bold text-duru-orange-600">
                        {selectedCompaniesForNotice.length}개 회원사 · 총 {companiesData.filter(c => selectedCompaniesForNotice.includes(c.id)).reduce((sum, c) => sum + c.workers, 0)}명
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* 공지사항 작성 */}
              <div className="mb-6">
                <h4 className="text-base font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <Edit className="w-5 h-5 text-duru-orange-600" />
                  공지사항 내용
                </h4>
                <textarea
                  value={noticeContent}
                  onChange={(e) => setNoticeContent(e.target.value)}
                  placeholder="근로자들에게 전달할 공지사항을 작성해주세요.&#10;&#10;예)&#10;폭설로 인해 금일 출근이 제한됩니다.&#10;안전을 위해 자택 대기 바랍니다."
                  rows={8}
                  className="w-full px-5 py-4 border-2 border-gray-200 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-duru-orange-500 focus:border-transparent resize-none placeholder:text-gray-400 leading-relaxed"
                />
              </div>

              {/* 발송 버튼 */}
              <div className="flex items-center justify-end gap-3">
                <button
                  onClick={() => {
                    setSelectedCompaniesForNotice([]);
                    setNoticeContent('');
                    setCompanySearchQuery('');
                  }}
                  className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
                >
                  초기화
                </button>
                <button
                  onClick={handleSendNotice}
                  disabled={selectedCompaniesForNotice.length === 0 || !noticeContent.trim()}
                  className="px-8 py-3 bg-duru-orange-500 text-white rounded-lg font-bold text-lg hover:bg-duru-orange-600 transition-colors disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  <Bell className="w-5 h-5" />
                  발송하기
                </button>
              </div>
            </div>

            {/* 발송 기록 섹션 */}
            <div className="bg-white rounded-xl border border-gray-200">
              <div className="px-6 py-5 border-b border-gray-200">
                <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  <FileText className="w-6 h-6 text-duru-orange-600" />
                  발송 기록
                </h3>
              </div>

              <div className="divide-y divide-gray-200">
                {sentNotices.length === 0 ? (
                  <div className="px-6 py-12 text-center">
                    <MessageSquare className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                    <p className="text-gray-400">발송한 공지사항이 없습니다</p>
                  </div>
                ) : (
                  sentNotices.map((notice) => {
                    const isExpanded = expandedNotices.has(notice.id);
                    const displayedCompanies = isExpanded ? notice.companies : notice.companies.slice(0, 3);

                    return (
                      <div key={notice.id} className="px-6 py-5 hover:bg-gray-50 transition-colors">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <span className="text-sm font-semibold text-duru-orange-600">{notice.date}</span>
                              <span className="text-sm text-gray-500">발송자: {notice.sender}</span>
                            </div>
                            <div className="flex items-center gap-2 flex-wrap mb-3">
                              <span className="text-sm font-semibold text-gray-700">발송 대상:</span>
                              {displayedCompanies.map((company, idx) => (
                                <span key={idx} className="inline-flex items-center px-2.5 py-1 bg-gray-100 text-gray-700 rounded-md text-sm font-medium">
                                  {company}
                                </span>
                              ))}
                              {notice.companies.length > 3 && (
                                <button
                                  onClick={() => toggleNoticeExpand(notice.id)}
                                  className="inline-flex items-center px-2.5 py-1 bg-duru-orange-100 text-duru-orange-700 rounded-md text-sm font-semibold hover:bg-duru-orange-200 transition-colors"
                                >
                                  {isExpanded ? '접기' : `+${notice.companies.length - 3}개 더보기`}
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                          <p className="text-gray-900 whitespace-pre-line leading-relaxed">{notice.content}</p>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'notifications' && (
          <div className="space-y-5">
            <h2 className="text-2xl font-bold text-gray-900">알림 센터</h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* 좌측: 장애인 근로자 결근 알림 */}
              <div className="bg-white rounded-xl border border-gray-200">
                <div className="px-6 py-5 border-b border-gray-100">
                  <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                    <AlertCircle className="w-5 h-5 text-duru-orange-500" />
                    장애인 근로자 결근 알림
                  </h3>
                </div>
                <div className="divide-y divide-gray-100">
                  {absenceAlerts.length > 0 ? absenceAlerts.map(alert => (
                    <div key={alert.id} className="px-6 py-3.5 flex items-center gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-bold text-gray-900">{alert.name}</span>
                          <span className={`px-2 py-0.5 rounded text-xs font-semibold ${
                            alert.status === '결근' ? 'bg-red-50 text-red-600' : 'bg-orange-50 text-orange-600'
                          }`}>
                            {alert.status}
                          </span>
                        </div>
                        <p className="text-sm text-gray-500">{alert.company} · {alert.date}</p>
                      </div>
                      <button
                        onClick={() => {
                          if (alert.name === '최동욱') {
                            const worker = workers.find(w => w.name === '최동욱');
                            if (worker) setSelectedWorker({...worker, position: worker.department, hireDate: worker.contractEnd.substring(0, 10), contractStart: '2025-06-01'});
                          }
                        }}
                        className="px-4 py-2 rounded-lg border border-duru-orange-300 bg-duru-orange-50 text-duru-orange-600 hover:bg-duru-orange-100 text-sm font-semibold whitespace-nowrap transition-colors"
                      >
                        확인하기
                      </button>
                    </div>
                  )) : (
                    <div className="py-16 text-center text-gray-400 text-sm">
                      현재 확인할 알림이 없습니다.
                    </div>
                  )}
                </div>
              </div>

              {/* 우측: 신규 기업 문의 알림 */}
              <div className="bg-white rounded-xl border border-gray-200">
                <div className="px-6 py-5 border-b border-gray-100">
                  <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                    <FileText className="w-5 h-5 text-gray-400" />
                    신규 기업 문의 알림
                  </h3>
                  <p className="text-sm text-gray-400 mt-1">홈페이지를 통해 접수된 신규 기업 문의입니다.</p>
                </div>
                <div className="divide-y divide-gray-100">
                  {inquiryList.length > 0 ? inquiryList.map(inq => (
                    <div key={inq.id} className="px-6 py-3.5 flex items-center gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-bold text-gray-900">{inq.company}</span>
                          <span className="px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-500">신규 문의</span>
                        </div>
                        <p className="text-sm text-gray-500">대표: {inq.ceo} · {inq.date}</p>
                        <p className="text-sm text-gray-400 mt-0.5 truncate">{inq.summary}</p>
                      </div>
                      <button
                        onClick={() => setSelectedInquiry(inq)}
                        className="px-4 py-2 rounded-lg bg-duru-orange-500 hover:bg-duru-orange-600 text-white text-sm font-semibold whitespace-nowrap transition-colors"
                      >
                        문의 확인
                      </button>
                    </div>
                  )) : (
                    <div className="py-16 text-center text-gray-400 text-sm">
                      현재 확인할 알림이 없습니다.
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* 문의 상세 모달 */}
            {selectedInquiry && (
              <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50" onClick={() => setSelectedInquiry(null)}>
                <div className="bg-white rounded-xl w-full max-w-lg mx-4 shadow-xl" onClick={e => e.stopPropagation()}>
                  <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between">
                    <h3 className="text-lg font-bold text-gray-900">기업 문의 상세</h3>
                    <button onClick={() => setSelectedInquiry(null)} className="text-gray-400 hover:text-gray-600">
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                  <div className="px-6 py-6">
                    <h4 className="text-sm font-semibold text-gray-500 mb-3">기업 정보</h4>
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div>
                        <p className="text-xs text-gray-400 mb-1">기업명</p>
                        <p className="text-base font-bold text-gray-900">{selectedInquiry.company}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-400 mb-1">대표자</p>
                        <p className="text-base text-gray-900">{selectedInquiry.ceo}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-400 mb-1">전화번호</p>
                        <p className="text-base text-gray-900">{selectedInquiry.phone}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-400 mb-1">이메일</p>
                        <p className="text-base text-gray-900">{selectedInquiry.email}</p>
                      </div>
                    </div>
                    <div className="border-t border-gray-100 pt-5">
                      <h4 className="text-sm font-semibold text-gray-500 mb-2">문의 내용</h4>
                      <p className="text-base text-gray-800 leading-relaxed whitespace-pre-line">{selectedInquiry.content}</p>
                      <p className="text-xs text-gray-400 mt-3">접수일: {selectedInquiry.date}</p>
                    </div>
                  </div>
                  <div className="px-6 py-5 border-t border-gray-100 space-y-2">
                    <button
                      onClick={() => {
                        setInquiryList(prev => prev.filter(i => i.id !== selectedInquiry.id));
                        setSelectedInquiry(null);
                      }}
                      className="w-full py-3 bg-duru-orange-500 hover:bg-duru-orange-600 text-white rounded-lg text-base font-bold transition-colors"
                    >
                      상담 완료
                    </button>
                    <p className="text-xs text-gray-400 text-center">상담이 완료된 문의는 알림 센터에서 자동 제거됩니다.</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'reports' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">리포트</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl p-6 border border-gray-200">
                <h3 className="text-lg font-bold text-gray-900 mb-4">문서 템플릿</h3>
                <div className="space-y-2">
                  {['근로계약서', '출근확인서', '경력증명서', '개인정보 동의서', '장애인 고용계획서'].map(doc => (
                    <button
                      key={doc}
                      className="w-full flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <span className="font-semibold text-gray-900">{doc}</span>
                      <Download className="w-5 h-5 text-gray-600" />
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 border border-gray-200">
                <h3 className="text-lg font-bold text-gray-900 mb-4">통계 리포트</h3>
                <div className="space-y-2">
                  {['월별 출근율 리포트', '회사별 정산 리포트', '장애유형별 통계', '지역별 배치 현황', '계약 현황 리포트'].map(report => (
                    <button
                      key={report}
                      className="w-full flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <span className="font-semibold text-gray-900">{report}</span>
                      <Eye className="w-5 h-5 text-gray-600" />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 인쇄 프리뷰 모달 */}
      {printPreview && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900">인쇄 프리뷰</h2>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    window.print();
                  }}
                  className="px-4 py-2 bg-duru-orange-500 text-white rounded-lg font-semibold hover:bg-duru-orange-600 transition-colors flex items-center gap-2"
                >
                  <Printer className="w-4 h-4" />
                  인쇄
                </button>
                <button
                  onClick={() => setPrintPreview(null)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-gray-600" />
                </button>
              </div>
            </div>

            <div className="p-8" id="print-content">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-center mb-2">{printPreview.companyName} 월 근무 통계</h2>
                <p className="text-center text-gray-600">{selectedMonth.split('-')[0]}년 {selectedMonth.split('-')[1]}월</p>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead className="bg-duru-orange-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-sm font-bold text-gray-900 border border-gray-300">이름</th>
                      <th className="px-4 py-3 text-center text-sm font-bold text-gray-900 border border-gray-300">근무요일</th>
                      <th className="px-4 py-3 text-center text-sm font-bold text-gray-900 border border-gray-300">출근 일수</th>
                      <th className="px-4 py-3 text-center text-sm font-bold text-gray-900 border border-gray-300">총 근무시간</th>
                    </tr>
                  </thead>
                  <tbody>
                    {printPreview.workers.map((worker, index) => (
                      <tr key={worker.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                        <td className="px-4 py-3 font-semibold text-gray-900 border border-gray-300">{worker.name}</td>
                        <td className="px-4 py-3 text-center text-gray-700 border border-gray-300">{worker.workSchedule}</td>
                        <td className="px-4 py-3 text-center text-gray-900 border border-gray-300">{worker.workDays}일</td>
                        <td className="px-4 py-3 text-center font-bold text-blue-600 border border-gray-300">{worker.totalHours}h</td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot className="bg-duru-orange-100 border-t-2 border-duru-orange-500">
                    <tr>
                      <td colSpan="2" className="px-4 py-3 font-bold text-gray-900 border border-gray-300">평균</td>
                      <td className="px-4 py-3 text-center font-bold text-gray-900 border border-gray-300">
                        {(printPreview.workers.reduce((sum, w) => sum + w.workDays, 0) / printPreview.workers.length).toFixed(1)}일
                      </td>
                      <td className="px-4 py-3 text-center font-bold text-blue-600 border border-gray-300">
                        {(printPreview.workers.reduce((sum, w) => sum + w.totalHours, 0) / printPreview.workers.length).toFixed(1)}h
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>

              <div className="mt-8 pt-6 border-t-2 border-gray-300">
                <div className="grid grid-cols-2 gap-8 mb-6">
                  <div>
                    <p className="text-sm text-gray-600 mb-2">기업 (대표자)</p>
                    <div className="border-2 border-gray-300 rounded-lg p-6 h-24 flex items-center justify-center">
                      <p className="text-gray-400">(서명/인)</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-2">두루빛터 (담당자)</p>
                    <div className="border-2 border-gray-300 rounded-lg p-6 h-24 flex items-center justify-center">
                      <p className="text-gray-400">(서명/인)</p>
                    </div>
                  </div>
                </div>
                <div className="flex justify-between text-sm text-gray-600 mt-4">
                  <div>발급일: {new Date().toLocaleDateString('ko-KR')}</div>
                  <div>두루빛터 중앙 통제 시스템</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 회원사 추가 모달 */}
      {showAddCompanyModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center">
          <div className="absolute inset-0 bg-black/40" onClick={() => setShowAddCompanyModal(false)} />
          <div className="relative bg-white rounded-2xl w-full max-w-lg mx-4 max-h-[90vh] overflow-y-auto shadow-xl">
            {/* 모달 헤더 */}
            <div className="sticky top-0 bg-white rounded-t-2xl border-b border-gray-200 px-6 py-5 flex items-center justify-between z-10">
              <div>
                <h2 className="text-lg font-bold text-gray-900">회원사 추가</h2>
                <p className="text-xs text-gray-500 mt-0.5">새로운 회원사 정보를 입력해주세요</p>
              </div>
              <button
                onClick={() => setShowAddCompanyModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>

            <div className="px-6 py-5 space-y-5">
              {/* 섹션 1: 회사 기본 정보 */}
              <div className="bg-gray-50 rounded-xl p-5 border border-gray-200">
                <h3 className="text-sm font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-duru-orange-500" />
                  회사 기본 정보
                </h3>
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      회사명 <span className="text-duru-orange-500">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="예: (주)두루빛 제조"
                        value={addCompanyForm.companyName}
                        onChange={(e) => updateAddCompanyForm('companyName', e.target.value)}
                        className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-duru-orange-500 focus:border-transparent placeholder:text-gray-400"
                      />
                      {addCompanyComplete.companyName && (
                        <CheckCircle2 className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-green-500" />
                      )}
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      사업자등록번호 <span className="text-duru-orange-500">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="000-00-00000"
                        value={addCompanyForm.businessNumber}
                        onChange={(e) => updateAddCompanyForm('businessNumber', e.target.value)}
                        className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-duru-orange-500 focus:border-transparent placeholder:text-gray-400"
                      />
                      {addCompanyComplete.businessNumber && (
                        <CheckCircle2 className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-green-500" />
                      )}
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      주소
                    </label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type="text"
                        placeholder="사업장 주소 입력"
                        value={addCompanyForm.address}
                        onChange={(e) => updateAddCompanyForm('address', e.target.value)}
                        className="w-full pl-9 pr-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-duru-orange-500 focus:border-transparent placeholder:text-gray-400"
                      />
                      {addCompanyComplete.address && (
                        <CheckCircle2 className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-green-500" />
                      )}
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      계약 시작일 <span className="text-duru-orange-500">*</span>
                    </label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type="date"
                        value={addCompanyForm.contractStartDate}
                        onChange={(e) => updateAddCompanyForm('contractStartDate', e.target.value)}
                        className="w-full pl-9 pr-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-duru-orange-500 focus:border-transparent text-gray-700"
                      />
                      {addCompanyComplete.contractStartDate && (
                        <CheckCircle2 className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-green-500" />
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* 섹션 2: 인사 담당자 정보 */}
              <div className="bg-gray-50 rounded-xl p-5 border border-gray-200">
                <h3 className="text-sm font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <User className="w-4 h-4 text-duru-orange-500" />
                  인사 담당자 정보
                </h3>
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      담당자명 <span className="text-duru-orange-500">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="담당자 이름"
                        value={addCompanyForm.contactName}
                        onChange={(e) => updateAddCompanyForm('contactName', e.target.value)}
                        className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-duru-orange-500 focus:border-transparent placeholder:text-gray-400"
                      />
                      {addCompanyComplete.contactName && (
                        <CheckCircle2 className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-green-500" />
                      )}
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      연락처 <span className="text-duru-orange-500">*</span>
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type="tel"
                        placeholder="010-0000-0000"
                        value={addCompanyForm.contactPhone}
                        onChange={(e) => updateAddCompanyForm('contactPhone', e.target.value)}
                        className="w-full pl-9 pr-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-duru-orange-500 focus:border-transparent placeholder:text-gray-400"
                      />
                      {addCompanyComplete.contactPhone && (
                        <CheckCircle2 className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-green-500" />
                      )}
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      이메일
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type="email"
                        placeholder="email@company.com"
                        value={addCompanyForm.contactEmail}
                        onChange={(e) => updateAddCompanyForm('contactEmail', e.target.value)}
                        className="w-full pl-9 pr-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-duru-orange-500 focus:border-transparent placeholder:text-gray-400"
                      />
                      {addCompanyComplete.contactEmail && (
                        <CheckCircle2 className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-green-500" />
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* 섹션 3: 기업 관리자 계정 설정 */}
              <div className="bg-gray-50 rounded-xl p-5 border border-gray-200">
                <h3 className="text-sm font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Lock className="w-4 h-4 text-duru-orange-500" />
                  기업 관리자 계정 설정
                </h3>
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      관리자 아이디 <span className="text-duru-orange-500">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="로그인에 사용할 아이디"
                        value={addCompanyForm.adminId}
                        onChange={(e) => updateAddCompanyForm('adminId', e.target.value)}
                        className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-duru-orange-500 focus:border-transparent placeholder:text-gray-400"
                      />
                      {addCompanyComplete.adminId && (
                        <CheckCircle2 className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-green-500" />
                      )}
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 flex items-center gap-1.5 bg-white rounded-lg px-3 py-2 border border-gray-200">
                    <Lock className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
                    초기 비밀번호는 자동 생성되어 담당자 이메일로 발송됩니다.
                  </p>
                </div>
              </div>
            </div>

            {/* 모달 푸터 */}
            <div className="sticky bottom-0 bg-white rounded-b-2xl border-t border-gray-200 px-6 py-4 flex gap-3">
              <button
                onClick={() => setShowAddCompanyModal(false)}
                className="flex-1 py-3 border border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-colors text-sm"
              >
                취소
              </button>
              <button
                onClick={handleAddCompanySubmit}
                disabled={!['companyName', 'businessNumber', 'contractStartDate', 'contactName', 'contactPhone', 'adminId'].every(f => addCompanyForm[f].trim())}
                className="flex-[2] py-3 bg-duru-orange-500 text-white rounded-xl font-semibold hover:bg-duru-orange-600 transition-colors text-sm disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                <Check className="w-4 h-4" />
                회원사 추가 완료
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;