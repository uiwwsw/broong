import icnBookmark from '$/icon/bookmark.svg';
import icnActiveBookmark from '$/icon/bookmark-active.svg';
import icnStar from '$/icon/star.svg';
import icnWon from '$/icon/won.svg';
import { TestResponse } from '!/test/domain';
type CardProps = TestResponse['recruits'][number];
const Card = ({ image, title, review, company, skills, bookmark, reward }: CardProps) => {
  return (
    <div className="border-gray-light relative inline-flex flex-col overflow-hidden rounded-xl border pb-3">
      <span className="absolute right-4 top-5">
        {bookmark ? <img src={icnBookmark} alt="북마크" /> : <img src={icnActiveBookmark} alt="북마크 취소" />}
      </span>
      <img className="block h-[180px]" src={image} alt={title} />
      <div className="flex flex-col px-[20px]">
        <div className="text-md py-[10px]">
          <h1 className="text-xl font-bold">{title}</h1>
          <p className="text-gray truncate text-sm">{review}</p>
        </div>
        <div className="border-t-gray-light border-t py-[12px]">
          <dl className="text-gray-dark flex items-center gap-1">
            <dt>
              <img width={24} height={24} src={company?.logo} alt={company?.name} />
            </dt>
            <dd className="truncate font-bold">{company?.name}</dd>
            <dd className="inline-flex items-center font-bold">
              <img src={icnStar} alt={`별이 ${company?.grade}개`} />
              {company?.grade}
            </dd>
            <dd className="text-gray">({company?.grade_count})</dd>
          </dl>
          <p className="mt-2">{skills?.join(', ')}</p>
        </div>
        {reward ? (
          <div className="border-t-gray-light text-gray-dark text-md flex items-center border-t pt-2 font-bold">
            <img width={26} height={26} src={icnWon} alt="원" />
            취업 축하금: {reward.toLocaleString()}
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Card;
