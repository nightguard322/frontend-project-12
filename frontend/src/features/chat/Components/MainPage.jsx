import { ChannelsList } from "./ChannelList/ChannelsList"
import { ChatContainer } from "./ChannelList/ChatWindow"
// export const RegisterPage = () => {
export const MainPage = () => {
    return (
        <div className="row border  mx-5">
            <div className="col-3 px-0">
                <ChannelsList/>
            </div>
            <div className="col-9 px-0">
                <ChatContainer />
            </div>
        </div>
    )
}