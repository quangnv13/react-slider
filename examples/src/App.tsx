import '@quangnv13/react-slider/dist/default.css';
import Default from './Default/Default';
import DefaultWithStep from './DefaultWithStep/DefaultWithStep';
import './index.css';
type Props = {};

export default function App({}: Props) {
  return (
    <div className="max-w-[1000px] py-2 px-5">
      <h1 className="text-gray-800 font-bold text-2xl">
        Accessible react slider demo
      </h1>
      <Default></Default>
      <DefaultWithStep></DefaultWithStep>
    </div>
  );
}
