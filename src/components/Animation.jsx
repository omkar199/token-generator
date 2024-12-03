import Lottie from 'react-lottie';
import animationData from '../assets/Animation2.json';

const Animation = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };
  return (
    <div>
      <Lottie options={defaultOptions} height={400} width={400} />
    </div>
  );
};

export default Animation;
