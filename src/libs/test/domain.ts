const test = {
  id: 1248509,
  bookmark: false,
  image:
    'https://jpassets.jobplanet.co.kr/production/uploads/job/posting_cover_image/file/74551/cropped_medium_cropped_medium_%EC%9D%B4%EC%82%BC%EC%98%A4%EA%B5%AC.png',
  title: '해외사업팀 팀원',
  occupation_names: {
    level1: ['기획/경영'],
    level2: ['사업 기획'],
  },
  annual: {
    type: [1, 2],
    years: 1,
    preferential: false,
    annual_text: ['신입', '1년 이상'],
  },
  skills: ['전략기획', '해외', '사업기획'],
  appeal: '아침/점심 제공, 반반차 사용',
  matching_keyword: '',
  review: '22년 연매출 600억 달성, 창립후 4년간 1,000% 성장',
  reward: 2000000,
  reward_text: '200만원',
  job_applicant_type: 'user',
  fee: '7%',
  company: {
    id: 373169,
    logo: 'https://jpassets.jobplanet.co.kr/production/uploads/company/logo/373169/thumb_230209_%EC%9D%B4%EC%82%BC%EC%98%A4%EA%B5%AC%20%EB%A1%9C%EA%B3%A0.png',
    name: '(주)이삼오구',
    grade: 3.6,
    grade_count: 16,
    ratings: [
      {
        type: '사내문화',
        rating: 4,
      },
      {
        type: '복지/급여',
        rating: 3.9,
      },
      {
        type: '경영진',
        rating: 3.4,
      },
    ],
  },
  created_at: '2023-05-23',
  updated_at: '2023-05-23',
};

export interface TestResponse {
  recruits: (typeof test)[];
  total_count: number;
}
