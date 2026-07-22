import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { ChatSection } from './components/ChatSection';
import { useGroqChat } from './hooks/useGroqChat';

const App = () => {
  const { messages, isLoading, error, sendMessage } = useGroqChat();

  return (
    <>
      <Header />
      <main className="main">
        <ChatSection
          messages={messages}
          isLoading={isLoading}
          error={error}
          onSubmit={sendMessage}
        />
      </main>
      <Footer />
    </>
  );
};

export default App;
