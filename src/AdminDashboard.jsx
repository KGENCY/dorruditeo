import React, { useState } from 'react';
import { ArrowLeft, Users, Building2, TrendingUp, AlertCircle, DollarSign, FileText, Search, Bell, Calendar, UserCheck, Clock, ChevronRight, Edit, Eye, Download, Upload, MessageSquare, Filter } from 'lucide-react';
import AdminWorkerDetail from './AdminWorkerDetail';
import CompanyDetail from './CompanyDetail';

const AdminDashboard = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState('dashboard'); // dashboard, companies, workers, contracts, notifications, reports
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [selectedWorker, setSelectedWorker] = useState(null);

  // 더미 데이터
  const stats = {
    totalCompanies: 24,
    totalWorkers: 156,
    activeWorkers: 142,
    attendanceRate: 94.5,
    expiringContracts: 5,
    pendingIssues: 3,
    monthlyRevenue: 45600000
  };

  const companies = [
    { id: 1, name: '(주)두루빛 제조', industry: '제조업', location: '서울 강남구', workers: 15, contractEnd: '2026-12-31', status: 'active', revenue: 4500000 },
    { id: 2, name: '세종식품', industry: '식품가공', location: '경기 성남시', workers: 12, contractEnd: '2026-03-15', status: 'expiring', revenue: 3600000 },
    { id: 3, name: '한빛포장', industry: '포장/물류', location: '인천 남동구', workers: 18, contractEnd: '2027-06-30', status: 'active', revenue: 5400000 },
    { id: 4, name: '그린팜', industry: '농업', location: '충남 천안시', workers: 8, contractEnd: '2026-02-28', status: 'expiring', revenue: 2400000 },
    { id: 5, name: '참좋은케어', industry: '서비스업', location: '서울 송파구', workers: 10, contractEnd: '2026-09-15', status: 'active', revenue: 3000000 },
  ];

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
              { id: 'contracts', label: '계약/정산', icon: DollarSign },
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

            {/* 빠른 통계 */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl p-6 border border-gray-200">
                <h3 className="text-lg font-bold text-gray-900 mb-4">출근 현황</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">오늘 출근율</span>
                    <span className="text-2xl font-bold text-duru-orange-600">{stats.attendanceRate}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-duru-orange-500 h-2 rounded-full" style={{ width: `${stats.attendanceRate}%` }}></div>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">출근: {stats.activeWorkers}명</span>
                    <span className="text-gray-600">결근: {stats.totalWorkers - stats.activeWorkers}명</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 border border-gray-200">
                <h3 className="text-lg font-bold text-gray-900 mb-4">계약 현황</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">만료 임박</span>
                    <span className="text-2xl font-bold text-red-600">{stats.expiringContracts}건</span>
                  </div>
                  <div className="text-sm text-gray-600">
                    <p>• 3개월 이내 만료: 3건</p>
                    <p>• 1개월 이내 만료: 2건</p>
                  </div>
                  <button className="text-duru-orange-600 hover:text-duru-orange-700 font-semibold text-sm">
                    전체보기 →
                  </button>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 border border-gray-200">
                <h3 className="text-lg font-bold text-gray-900 mb-4">이번 달 정산</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">총 금액</span>
                    <span className="text-2xl font-bold text-blue-600">₩{(stats.monthlyRevenue / 10000).toFixed(0)}만</span>
                  </div>
                  <div className="text-sm text-gray-600">
                    <p>• 정산 완료: 20개사</p>
                    <p>• 정산 대기: 4개사</p>
                  </div>
                  <button className="text-duru-orange-600 hover:text-duru-orange-700 font-semibold text-sm">
                    상세보기 →
                  </button>
                </div>
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

            {/* 최근 활동 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl p-6 border border-gray-200">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-duru-orange-600" />
                  신규 회원사
                </h3>
                <div className="space-y-3">
                  {companies.slice(0, 3).map(company => (
                    <div key={company.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                      <div>
                        <p className="font-semibold text-gray-900">{company.name}</p>
                        <p className="text-sm text-gray-600">{company.industry} · {company.location}</p>
                      </div>
                      <ChevronRight className="w-5 h-5 text-gray-400" />
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 border border-gray-200">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Users className="w-5 h-5 text-duru-orange-600" />
                  신규 근로자
                </h3>
                <div className="space-y-3">
                  {workers.slice(0, 3).map(worker => (
                    <div key={worker.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                      <div>
                        <p className="font-semibold text-gray-900">{worker.name}</p>
                        <p className="text-sm text-gray-600">{worker.company} · {worker.department}</p>
                      </div>
                      <ChevronRight className="w-5 h-5 text-gray-400" />
                    </div>
                  ))}
                </div>
              </div>
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
                <button className="px-4 py-2 bg-duru-orange-500 text-white rounded-lg font-semibold hover:bg-duru-orange-600 transition-colors">
                  + 회원사 추가
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {companies.map(company => (
                <div key={company.id} className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-all">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <h3 className="text-xl font-bold text-gray-900">{company.name}</h3>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          company.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                        }`}>
                          {company.status === 'active' ? '계약중' : '만료임박'}
                        </span>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
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
                    <div className="text-right ml-4">
                      <p className="text-sm text-gray-600 mb-1">월 정산액</p>
                      <p className="text-2xl font-bold text-blue-600">₩{(company.revenue / 10000).toFixed(0)}만</p>
                    </div>
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
                <button className="px-4 py-2 bg-duru-orange-500 text-white rounded-lg font-semibold hover:bg-duru-orange-600 transition-colors">
                  + 근로자 추가
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

        {activeTab === 'contracts' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">계약 및 정산 관리</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl p-6 border border-gray-200">
                <h3 className="text-lg font-bold text-gray-900 mb-4">이번 달 정산</h3>
                <p className="text-3xl font-bold text-blue-600 mb-2">₩{(stats.monthlyRevenue / 10000).toFixed(0)}만</p>
                <p className="text-sm text-gray-600">정산 완료: 20개사</p>
              </div>
              <div className="bg-white rounded-xl p-6 border border-gray-200">
                <h3 className="text-lg font-bold text-gray-900 mb-4">미수금</h3>
                <p className="text-3xl font-bold text-red-600 mb-2">₩320만</p>
                <p className="text-sm text-gray-600">4개사 미납</p>
              </div>
              <div className="bg-white rounded-xl p-6 border border-gray-200">
                <h3 className="text-lg font-bold text-gray-900 mb-4">계약 현황</h3>
                <p className="text-3xl font-bold text-duru-orange-600 mb-2">{stats.expiringContracts}건</p>
                <p className="text-sm text-gray-600">3개월 내 만료</p>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <h3 className="text-xl font-bold text-gray-900 mb-4">회사별 정산 내역</h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">회사명</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">근로자 수</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">정산 금액</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">정산 상태</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">문서</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {companies.map(company => (
                      <tr key={company.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 font-semibold text-gray-900">{company.name}</td>
                        <td className="px-6 py-4 text-gray-900">{company.workers}명</td>
                        <td className="px-6 py-4 text-gray-900">₩{(company.revenue / 10000).toFixed(0)}만</td>
                        <td className="px-6 py-4">
                          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700">
                            완료
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <button className="text-duru-orange-600 hover:text-duru-orange-700 font-semibold text-sm flex items-center gap-2">
                            <Download className="w-4 h-4" />
                            세금계산서
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

        {activeTab === 'notifications' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">알림 센터</h2>

            <div className="space-y-3">
              {notifications.map(notif => (
                <div
                  key={notif.id}
                  className={`p-4 rounded-lg border ${
                    notif.priority === 'high' ? 'bg-red-50 border-red-200' :
                    notif.priority === 'medium' ? 'bg-yellow-50 border-yellow-200' :
                    'bg-gray-50 border-gray-200'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                      notif.priority === 'high' ? 'bg-red-100' :
                      notif.priority === 'medium' ? 'bg-yellow-100' :
                      'bg-gray-100'
                    }`}>
                      {notif.type === 'contract' && <FileText className={`w-5 h-5 ${notif.priority === 'high' ? 'text-red-600' : 'text-yellow-600'}`} />}
                      {notif.type === 'document' && <Upload className={`w-5 h-5 ${notif.priority === 'high' ? 'text-red-600' : 'text-yellow-600'}`} />}
                      {notif.type === 'attendance' && <AlertCircle className="w-5 h-5 text-red-600" />}
                      {notif.type === 'payment' && <DollarSign className="w-5 h-5 text-gray-600" />}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-semibold text-gray-900">{notif.title}</span>
                        <span className="text-xs text-gray-500">{notif.date}</span>
                        <span className={`px-2 py-0.5 rounded text-xs font-semibold ${
                          notif.priority === 'high' ? 'bg-red-100 text-red-700' :
                          notif.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                          'bg-gray-100 text-gray-700'
                        }`}>
                          {notif.priority === 'high' ? '긴급' : notif.priority === 'medium' ? '중요' : '일반'}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600">{notif.message}</p>
                    </div>
                    <button className="text-duru-orange-600 hover:text-duru-orange-700 font-semibold text-sm whitespace-nowrap">
                      처리하기
                    </button>
                  </div>
                </div>
              ))}
            </div>
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
    </div>
  );
};

export default AdminDashboard;