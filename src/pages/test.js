import {
    Modal,
    Ripple,
    initTE,
  } from "tw-elements";
  
initTE({ Modal, Ripple });

const LoginPage = () => {
    return(
        <>
        <div className="w-full h-full bg-gray-100 pl-4 pr-4">
            <button
            type="button"
            class="inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
            data-te-toggle="modal1"
            data-te-target="#example"
            data-te-ripple-init
            data-te-ripple-color="light">
            Frame bottom
            </button>

            <div
            data-te-modal-init
            className="fixed left-0 top-0 z-[1055] hidden h-full w-full overflow-hidden outline-none"
            id="example1"
            tabindex="-1"
            aria-labelledby="exampleFrameBottomModalLabel"
            aria-hidden="true">
            <div data-te-modal-dialog-ref className="h-2/3 pointer-events-none absolute bottom-0 w-full translate-y-[50px] opacity-0 transition-all duration-300 ease-in-out">
                <div className="pointer-events-auto relative flex w-full h-full flex-col border-none bg-white bg-clip-padding shadow-lg outline-none">
                <div className="relative h-full p-5" data-te-modal-body-ref>

                {/** x svg 이미지 */}
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" class="w-6 h-6" data-te-modal-dismiss>
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>

                {/** 사진, 작물명, 병해충명, 학명 */}
                <div className = "w-full flex mb-4">

                    <div className = "h-24 w-24">
                        <img src = "https://cdn-icons-png.flaticon.com/128/877/877712.png"/>
                    </div>

                    <div className = "flex flex-col justify-evenly ml-4">
                        <div>작물명 : 토마토</div>
                        <div>병해충명 : 꽃노랑총채벌레</div>
                        <div>학명: Frankliniella occidentalisi</div>
                    </div>
                </div>
                    
                {/** 내용 */}
                <div className = "flex flex-col justify-around h-80">
                    <div>
                        <div className = "text-3xl font-bold mb-2">피해</div>
                        <p>황색 끈끈이트랩이나 흰색판을 이용한 타락법 등에 의한 예찰에 주의하고 피해가 나타나는 초기에 방제를 해야 효과적이다.</p>
                    </div>

                    <div>
                        <div className = "text-3xl font-bold mb-2">방제</div>
                        <p>황색 끈끈이트랩이나 흰색판을 이용한 타락법 등에 의한 예찰에 주의하고 피해가 나타나는 초기에 방제를 해야 효과적이다.</p>
                    </div>
                </div>

                {/** 버튼 */}
                <div className = "w-full flex justify-center fixed bottom-0 left-0 mb-7">
                    <button
                        type="button"
                        className="ml-2 inline-block rounded bg-[#10b981] px-4 pb-1.5 pt-2 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-[#10b981] hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-[#10b981] focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-[#10b981] active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]">
                        Learn more
                    </button>
                </div>
                    
                </div>
                </div>
            </div>
            </div>
        </div>
    </>
    )
}

export default LoginPage