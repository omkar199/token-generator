import './App.css';

import '@rainbow-me/rainbowkit/styles.css';
import {
  darkTheme,
  getDefaultConfig,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import { WagmiProvider } from 'wagmi';

import { mainnet, polygon, optimism, arbitrum, base ,sepolia} from 'wagmi/chains';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import Main from './components/Main';
import { ConnectBtn } from './components/ConnectBtn';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
// import Animation from './components/Animation';
// import AnimationOne from './components/AnimationOne';

const config = getDefaultConfig({
  appName: 'token-gen',
  projectId: 'YOUR_PROJECT_ID',
  chains: [mainnet, polygon, optimism, arbitrum, base,sepolia ],
  ssr: true, // If your dApp uses server side rendering (SSR)
});

const queryClient = new QueryClient();
const App = () => {
  const [isDeviceOrientation, setIsDeviceOrientation] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleMouseMove = (e) => {
      const container = document.getElementById('main-background');
      const x = -e.clientX / 5;
      const y = -e.clientY / 5;
      container.style.backgroundPositionX = `${x}px`;
      container.style.backgroundPositionY = `${y}px`;
    };

    const handleDeviceOrientation = (e) => {
      const container = document.getElementById('main-background');
      container.style.backgroundPositionX = `${e.gamma / 3}px`;
      container.style.backgroundPositionY = `${e.beta / 3}px`;
    };

    const checkDeviceOrientation = () => {
      setIsDeviceOrientation(window.DeviceOrientationEvent !== undefined);
    };

    checkDeviceOrientation();

    if (!isDeviceOrientation) {
      window.addEventListener('mousemove', handleMouseMove);
    } else {
      window.addEventListener('deviceorientation', handleDeviceOrientation);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('deviceorientation', handleDeviceOrientation);
    };
  }, [isDeviceOrientation]);

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider coolMode theme={darkTheme()}>
          <div className='p-4 main-background bg-indigo-600'>
            <div className='relative shadow-lg px-3 py-3 bg-none backdrop-blur-lg rounded-lg'>
              <nav className='flex flex-col md:flex-row justify-between'>
                <div className='w-full md:w-[200px] flex items-center justify-between'>
                  <p className='text-2xl text-white font-bold flex'>
                    Token <span className='text-white ml-2'>Generator</span>
                  </p>
                </div>
                <div className='flex items-center gap-3 w-full md:w-auto'>
                  <div className='navLinks duration-500 absolute md:static md:w-auto w-full md:h-auto h-[85vh] flex md:items-center gap-[1.5vw] top-[100%] left-[-100%] px-5 md:py-0 py-5'>
                    <ul className='flex md:flex-row flex-col md:items-center md:gap-[2vw] gap-8'>
                      <li className={`relative max-w-fit pr-3 md:pr-0 py-1 text-white after:bg-indigo-600 after:absolute after:h-1 after:w-0 after:bottom-0 after:left-0 hover:after:w-full after:transition-all after:duration-300 ${location.pathname === '/' ? 'font-bold' : ''}`}>
                        <a href='#'>Create token</a>
                      </li>
                      <li className='relative max-w-fit pr-3 md:pr-0 py-1 text-white after:bg-indigo-600 after:absolute after:h-1 after:w-0 after:bottom-0 after:left-0 hover:after:w-full after:transition-all after:duration-300'>
                        <a href='#'>Request Faucet</a>
                      </li>
                    </ul>
                  </div>
                  <div className='flex items-center gap-2'>
                    <ConnectBtn />
                  </div>
                </div>
              </nav>
            </div>
            <div className='flex flex-wrap justify-center'>
              <nav className='flex flex-col shadow-lg px-3 py-3 bg-none backdrop-blur-lg rounded-lg mt-5 h-fit w-full md:w-1/4'>
                <ul className='flex flex-col gap-4 text-center md:text-left'>
                  <li className={`relative w-full py-2 px-4 text-white hover:bg-[rgba(255,255,255,0.3)] hover:border-[rgba(255,255,255,0.5)] `}>
                    <a href='#'>Token generator</a>
                  </li>
                  <li className='relative w-full  py-2 px-4 text-white hover:bg-[rgba(255,255,255,0.3)] hover:border-[rgba(255,255,255,0.5)] '>
                    <a href='#'>Tax Token</a>
                  </li>
                  <li className='relative w-full  py-2 px-4 text-white hover:bg-[rgba(255,255,255,0.3)] hover:border-[rgba(255,255,255,0.5)] '>
                    <a href='#'>Manage Token</a>
                  </li>
                  <li className='relative w-full  py-2 px-4 text-white hover:bg-[rgba(255,255,255,0.3)] hover:border-[rgba(255,255,255,0.5)] '>
                    <a href='#'>Token List</a>
                  </li>
                </ul>
              </nav>
              <div className='flex justify-center items-center w-full md:w-3/4'>
                <Main />
              </div>
            </div>
          </div>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};

export default App;
