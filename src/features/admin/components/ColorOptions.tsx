import React from 'react'
import Spec from './Spec'

function ColorOptions() {
  return (
    <>
    <Spec 
    specType="colorOptions"
    specTypeName="Color option"
    title="Colors for Exterior and Interior"
    subline="This is the list of colors of vehicles that are available in the system. this list of colors are used to categorize the vehicles in the system and also used to filter the vehicles."
    addNewText="Is there a color that is not in the list? You can add a new color to the list." />
    </>
  )
}

export default ColorOptions