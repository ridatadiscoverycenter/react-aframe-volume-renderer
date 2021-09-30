import Header from "./Header";
import VolumeViewer from "./VolumeViewer";
import Instructions from "./Instructions";
import Footer from "./Footer";


export default function Layout(props) {
  return (
    <div id="visualizer">
      <Header />
      <VolumeViewer />
      <Instructions />
      <Footer />
    </div>
  );
}
