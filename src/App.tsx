import Button from '@/Button';
import Sample from '@/Sample';
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'

const App = () => {
  return (
    <>
      <Sample onChange={(d) => console.log(d)} max={15} />
      <br />
      <Button className="btn">dawdawdad</Button>
      <br />
      <Button className="btn">dawdawdad</Button>
      <br />
      <div>
        <Button className="btn btn--primary">dawdawdad</Button>
        <Button className="btn btn--secondary">dawdawdad</Button>
      </div>
    </>
  );
};

export default App;
