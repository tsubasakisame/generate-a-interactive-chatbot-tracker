interface User {
  id: number;
  name: string;
  chatHistory: string[];
}

interface Chatbot {
  id: number;
  name: string;
  responses: { [key: string]: string };
}

class ChatbotTracker {
  private users: User[];
  private chatbots: Chatbot[];

  constructor() {
    this.users = [];
    this.chatbots = [];
  }

  addUser(id: number, name: string) {
    this.users.push({ id, name, chatHistory: [] });
  }

  addChatbot(id: number, name: string, responses: { [key: string]: string }) {
    this.chatbots.push({ id, name, responses });
  }

  startConversation(userId: number, chatbotId: number) {
    const user = this.users.find((user) => user.id === userId);
    const chatbot = this.chatbots.find((chatbot) => chatbot.id === chatbotId);

    if (!user || !chatbot) {
      throw new Error("User or chatbot not found");
    }

    console.log(`Conversation started between ${user.name} and ${chatbot.name}`);

    return {
      async sendMessage(message: string) {
        const response = chatbot.responses[message.toLowerCase()] || "I didn't understand that";
        user.chatHistory.push(`User: ${message}`);
        user.chatHistory.push(`Chatbot: ${response}`);
        console.log(`Chatbot responded: ${response}`);
      },
      async getChatHistory() {
        return user.chatHistory;
      },
    };
  }
}

const tracker = new ChatbotTracker();

tracker.addUser(1, "John Doe");
tracker.addChatbot(1, "HelpBot", {
  hello: "Hi, how can I help you?",
  goodbye: "Goodbye, have a nice day!",
  default: "I didn't understand that",
});

const conversation = tracker.startConversation(1, 1);

conversation.sendMessage("Hello");
conversation.sendMessage("Goodbye");
console.log(conversation.getChatHistory());