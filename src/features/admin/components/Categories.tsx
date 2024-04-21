
import Spec from "./Spec";

function Categories() {
  return (
    <>
    <Spec 
    specType="categories" 
    specTypeName="Category" 
    title="Category of vehicles" 
    subline="This is the list of categories of vehicles that are available in the system. this list of categories are used to categorize the vehicles in the system and also used to filter the vehicles." 
    addNewText="Is there a category that is not in the list? You can add a new category to the list." />
    </>
  );
}

export default Categories;
