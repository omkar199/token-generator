import { useState } from 'react'
import { FaCloudUploadAlt } from 'react-icons/fa'
import { useAccount, useWalletClient } from 'wagmi'
import Web3 from 'web3'
import { factory_abi } from '../constant/factory_abi'

const factory_address = '0x44B8ceB5edD92309fe4BEeD378a8a2F685F9792B'

const Main = () => {
  const { data } = useWalletClient()
  const { address, isConnected, chain, chainId } = useAccount()

  console.log('🚀 ~ Main ~ address:', address, isConnected, chain, chainId)
  const [txAddress, setTxAddress] = useState('')
  const [chainName, setChainName] = useState('Sepolia')
  const [name, setName] = useState('')
  const [symbol, setSymbol] = useState('')
  const [decimal, setDecimal] = useState('18')
  const [supply, setSupply] = useState("")
  const [image, setImage] = useState(null)

  console.log('🚀 ~ Main ~ image:', image)

  // const [description, setDescription] = useState('');

  const deployToken = async () => {
    try {
      const web3 = new Web3(data)
      const account = await web3.eth.requestAccounts()
      const buyAddress = account[0]
      const gasPrice = (await web3.eth.getGasPrice()).toString()
      const ContractInstance = new web3.eth.Contract(
        factory_abi,
        factory_address
      )
      const estimateGas = await ContractInstance.methods
        .createToken(name, symbol, web3.utils.toWei(supply, 'ether'), buyAddress)
        .estimateGas({
          from: buyAddress,
        })

      const tx = await ContractInstance.methods
        .createToken(name, symbol, web3.utils.toWei(supply, 'ether'), buyAddress)
        .send({
          from: buyAddress,
          gas: estimateGas.toString(),
          gasPrice: gasPrice,
        })
      setTxAddress(tx?.events?.TokenCreated?.returnValues?.tokenAddress) // Set transaction address to state
      console.log(tx?.events?.TokenCreated)
      return tx
    } catch (error) {
      console.error('Error deploying token:', error) // Error handling
      alert('An error occurred while deploying the token. Please try again.') // User feedback
    }
  }

  return (
    <div>
      <div className='h-screen flex flex-col md:flex-row'>
        <div className='form shadow-2xl'>
          <div className='flex w-full'>
            <div className='flex flex-col w-full  bg-transparent	 m-2'>
              <label
                htmlFor='chain'
                className='block mb-2 text-sm font-medium text-white dark:text-white'
              >
                Chain
              </label>
              <select
                id='countries'
                value={chainName}
                onChange={(e) => setChainName(e.target.value)}
                className=' border bg-transparent	 border-gray-300 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
              >
                <option value='Sepolia'>Sepolia</option>
                <option value='Base'>Base</option>
                <option value='Polygon'>Polygon</option>
                <option value='BNB'>BNB</option>
                <option value='Arbitrum'>Arbitrum</option>
              </select>
            </div>
          </div>
          <div className='flex w-full'>
            <div className='w-full m-2'>
              <label
                htmlFor='name'
                className='block mb-2 text-sm font-medium text-white dark:text-white'
              >
                Name
              </label>
              <input
                type='text'
                id='name'
                value={name}
                onChange={(e) => setName(e.target.value)}
                className='bg-transparent	border border-gray-300 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                placeholder='Bitcoin'
                required
              />
            </div>

            <div className='w-full  m-2'>
              <label
                htmlFor='Symbol'
                className='block mb-2 text-sm font-medium text-white dark:text-white'
              >
                Symbol
              </label>
              <input
                type='text'
                id='Symbol'
                value={symbol}
                onChange={(e) => setSymbol(e.target.value)}
                className='bg-transparent	border border-gray-300 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                placeholder='BTC'
                required
              />
            </div>
          </div>
          <div className='flex w-full'>
            <div className='w-full m-2'>
              <label
                htmlFor='Decimal'
                className='block mb-2 text-sm font-medium text-white dark:text-white'
              >
                Decimal
              </label>
              <input
                type='text'
                id='Decimal'
                value={decimal}
                onChange={(e) => setDecimal(e.target.value)}
                className='bg-transparent	border border-gray-300 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                placeholder='18'
                required
              />
            </div>

            <div className='w-full  m-2'>
              <label
                htmlFor='Supply'
                className='block mb-2 text-sm font-medium text-white dark:text-white'
              >
                Supply
              </label>
              <input
                type='text'
                id='Supply'
                value={supply}
                onChange={(e) => setSupply(e.target.value)}
                className='bg-transparent	border border-gray-300 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                placeholder='1000000'
                required
              />
            </div>
          </div>
          {/* <div className='flex w-full'>
            <div className='w-full  m-2'>
              <label
                htmlFor='Description'
                className='block mb-2 text-sm font-medium text-white dark:text-white'
              >
                Description
              </label>
              <input
                type='text'
                id='Description'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className='bg-transparent	border border-gray-300 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                placeholder='Description about token'
                required
              />
            </div>
          </div> */}
          <div className='flex w-full flex-col border-gray-300'>
            <div className='w-full p-2 border-gray-300'>
              <label
                htmlFor='Token-image'
                className='block mb-2 text-sm font-medium text-white border-gray-300 dark:text-white'
              >
                Token Image
              </label>
              <form
                action='#'
                className='relative w-full h-24 bg-transparent border-gray-300 rounded-lg shadow-inner'
                onDrop={(e) => {
                  e.preventDefault() // Prevent default behavior
                  const files = e.dataTransfer.files
                  if (files.length > 0) {
                    setImage(files[0]) // Set the image
                  }
                }}
                onDragOver={(e) => e.preventDefault()} // Prevent default behavior to allow drop
              >
                <input
                  type='file'
                  id='file-upload'
                  className='hidden'
                  onChange={(e) => setImage(e.target.files[0])}
                />
                <label
                  htmlFor='file-upload'
                  className='z-20 border-gray-300 flex flex-col-reverse items-center justify-center w-full h-full cursor-pointer'
                >
                  <p className='z-10 text-xs font-light mt-4 text-center text-white'>
                    Drag & Drop your files here
                  </p>
                  <FaCloudUploadAlt className='text-white w-9 h-8' />
                </label>
              </form>
              {image && ( // Show image preview if image is set
                <img
                  src={URL.createObjectURL(image)}
                  alt='Preview'
                  className='mt-2 mx-auto w-10 h-10 border border-gray-300 rounded-lg'
                />
              )}
            </div>
          </div>
          <div className='w-full  p-2'>
            <button className='glassmorphism-btn ' onClick={deployToken}>
              Mint Token
            </button>
            {txAddress && ( // Show link if txAddress is set
              <div className='mt-2 w-full '> 
              <a
                href={`https://sepolia.etherscan.io/token/${txAddress}`}
                target='_blank'
                rel='noopener noreferrer'
                className='text-white underline mx-auto text-center'
              >
                View on Sepolia Scan
              </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Main
