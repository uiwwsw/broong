import Validator from '@/Validator';
import Base from './_Base';
import Input from '@/Input';
const Main = () => {
  const test = (e: any) => {
    console.log(e, 2);
  };
  return (
    <Base title="회원가입" backgroundColor="gray">
      <Input
        onChange={test}
        placeholder="이름을 입력해주세요"
        componentName="inp"
        themeColor="secondary"
        themeSize="md"
      />
      <Validator validate={(val) => val.length === 3}>
        <Input
          onChange={test}
          placeholder="이름을 입력해주세요"
          componentName="inp"
          themeColor="secondary"
          themeSize="md"
        />
      </Validator>
    </Base>
  );
};

export default Main;
