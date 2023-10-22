import SelectPlantComponent from '../../components/SelectPlant/SelectPlantComponent'
import SelectDescriptionComponent from '../../components/SelectPlant/SelectDescriptionComponent'
import SelectTopComponent from '../../components/SelectPlant/SelectTopComponent'

const SelectPlantPage = () => {
    return(
        <div className="w-full h-full bg-gray-100">
            <SelectTopComponent/>
            <SelectDescriptionComponent/>
            <SelectPlantComponent/>
        </div>
    )
}

export default SelectPlantPage