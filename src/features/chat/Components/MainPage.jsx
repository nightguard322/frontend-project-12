import { ChannelsList } from "./ChannelList/ChannelsList"
import { ChatContainer } from "./ChannelList/ChatWindow"
import { useChatStore } from "../useChatStore"
import { useEffect } from "react"
// export const RegisterPage = () => {
export const MainPage = () => {
    const initSocket = useChatStore((state) => state.initSocket)
    useEffect(() => {
        initSocket()
    }, [])
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