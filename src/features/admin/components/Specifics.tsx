
import Categories from './Categories'
import TransmissionType from './TransmissionType'
import FuelType from './FuelType'
import DriveType from './DriveType'
import ColorOptions from './ColorOptions'

function Specifics() {
  return (
    <div>
        <h2 className='text-lg font-medium mb-3'>Specifications of vehicles</h2>
        <p className='mb-10 border-b border-b-gray-200 pb-3'>These are the specifications of the vehicles in your system,
            you can manage various type of specifications here.
        </p>
        <div className='flex flex-wrap gap-20'>
        <Categories />
        <TransmissionType />
        <FuelType />
        <DriveType />
        <ColorOptions />
        </div>
    </div>
  )
}

export default Specifics