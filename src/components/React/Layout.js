import Header from './Header';
import Visualizer from './Visualizer';
import Footer from './Footer'
import Information from './Information';

export default function Layout(props) {
  return (
    <div id="visualizer">
      <Header />
      <Visualizer />
      <Information />
      <Footer />
    </div>
  );
}
