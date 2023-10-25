import Tray from "./Tray";
import Screen from "./Screen";
import Head from "./Head";
import Base from "./Base";

export default function Atm() {
  return (
    <div className="atm aspect-[10/20] h-80 xl:h-96 bg-gray-200 absolute left-1/2 bottom-20 xl:bottom-32 rounded-tl-xl rounded-tr-xl shadow">
      <Head>
        <Screen />
        <Tray />
      </Head>
      <Base />
    </div>
  );
}
