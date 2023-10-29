import SelectPlantComponent from '../../components/SelectPlant/SelectPlantComponent'
import SelectDescriptionComponent from '../../components/SelectPlant/SelectDescriptionComponent'
import MoveBackComponent from '../../components/common/MoveBackComponent'

const SelectPlantPage = () => {
    return(
        <div className="w-full bg-gray-100">
            <MoveBackComponent/>
            <SelectDescriptionComponent/>
            <SelectPlantComponent/>
        </div>
    )
}

export default SelectPlantPage