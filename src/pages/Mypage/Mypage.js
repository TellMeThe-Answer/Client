import TopComponent from '../../components/MyPage/TopComponent'
import CheckComponent from '../../components/MyPage/CheckComponent'
import DiagnosisComponent from '../../components/MyPage/DiagnosisComponent'
import AccountComponent from '../../components/MyPage/AccountComponent'
import ServiceComponent from '../../components/MyPage/ServiceComponent'
import FooterComponent from '../../components/common/footer'

const MyPage = () => {
    return(
        <div className="container mx-auto w-full h-full bg-gray-100 pl-4 pr-4">
            <TopComponent/>
            <CheckComponent/>
            <DiagnosisComponent/>
            <AccountComponent/>
            <ServiceComponent/>
            <FooterComponent/>
        </div>
    )
}

export default MyPage