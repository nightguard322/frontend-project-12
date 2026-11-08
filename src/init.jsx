import debug from "debug";
import i18next from "i18next";
import { I18nextProvider, initReactI18next } from "react-i18next";
import { useChatStore } from "./features/chat/useChatStore.jsx";
import { useAuthStore } from './features/auth/useAuthStore.jsx';

import App from "./components/App";
import resources from "./locales/index.jsx"

const logSocket = debug("chat:socket");

// Сокет приходит параметром, открывает его точка входа. Внешний ресурс тем
// самым остаётся на стороне того, кто запускает приложение, и подменить его
// можно снаружи, ничего не меняя внутри.
const init = async (socket) => {
  useAuthStore.setState({ token: null, username: null, isAuthenticated: false });
  const i18n = i18next.createInstance();

  await i18n.use(initReactI18next).init({
    initImmediate: false,
    resources,
    fallbackLng: "ru",
  });

  // Обработчики событий сокета живут здесь, вне реакта. Это уровень
  // инициализации приложения, и по шагам проекта их станет больше.
    socket.on('newMessage', (data) => useChatStore.getState().addMessage(data));
    socket.on('newChannel', (channel) => useChatStore.getState().addChannel(channel))
    socket.on('removeChannel', (id) => useChatStore.getState().removeChannel(id))
    socket.on('renameChannel', (channel) => useChatStore.getState().updateChannel(channel));

  return (
    <div data-vitest="true">
      <I18nextProvider i18n={i18n}>
        <App />
      </I18nextProvider>
    </div>
  );
};

export default init;