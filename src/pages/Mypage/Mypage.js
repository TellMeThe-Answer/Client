import TopComponent from '../../components/MyPage/TopComponent'
import CheckComponent from '../../components/MyPage/CheckComponent'
import DiagnosisComponent from '../../components/MyPage/DiagnosisComponent'
import AccountComponent from '../../components/MyPage/AccountComponent'
import ServiceComponent from '../../components/MyPage/ServiceComponent'

const MyPage = () => {
    return(
        <div className="w-full h-full bg-gray-50 pl-4 pr-4">
            <TopComponent/>
            <CheckComponent/>
            <DiagnosisComponent/>
            <AccountComponent/>
            <ServiceComponent/>
        </div>
    )
}

export default MyPage