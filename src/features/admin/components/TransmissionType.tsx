import React from 'react'
import Spec from './Spec'

function TransmissionType() {
  return (
    <>
    <Spec 
    specType="transmission" 
    specTypeName="Transmission Type" 
    title="Transmission Type of vehicles" 
    subline="This is the list of transmission types of vehicles that are available in the system. this list of transmission types are used to categorize the vehicles in the system and also used to filter the vehicles." 
    addNewText="Is there a type of transmission that is not in the list? You can add a new type to the list." />
    </>
  )
}

export default TransmissionType