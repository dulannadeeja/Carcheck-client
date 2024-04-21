import React from 'react'
import Spec from './Spec'

function DriveType() {
  return (
    <>
    <Spec
    specType="driveType"
    specTypeName="Drive Type"
    title="Drive Type of vehicles"
    subline="This is the list of drive types of vehicles that are available in the system. this list of drive types are used to categorize the vehicles in the system and also used to filter the vehicles."
    addNewText="Is there a type of drive that is not in the list? You can add a new type to the list." />
    </>
  )
}

export default DriveType