# deepseek-ai-react

## 🚀 React Wrapper for DeepSeek AI API

`deepseek-ai-react` is a lightweight React package that provides seamless integration with DeepSeek AI, allowing developers to interact with the DeepSeek API effortlessly.

## 📦 Installation

To install the package, run:

```sh
npm install deepseek-ai-react
```

Or with Yarn:

```sh
yarn add deepseek-ai-react
```

## 🔧 Setup & Usage
### **2️⃣ Using in a React Project**
For React projects, wrap your app with `DeepSeekProvider` to manage the API key and configuration globally.

```tsx
import React from "react";
import { DeepSeekProvider, useDeepSeekAPI } from "deepseek-ai-react";

const DeepSeekComponent = () => {
  const { data, loading, error, callDeepSeek } = useDeepSeekAPI();

  return (
    <div>
      <button onClick={() => callDeepSeek("chatCompletion", { messages: [{ role: "user", content: "Tell me a joke" }] })}>
        Ask DeepSeek AI
      </button>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {data && <p>Response: {data.choices[0].message.content}</p>}
    </div>
  );
};

const App = () => (
  <DeepSeekProvider apiKey="your-api-key-here" model="deepseek-chat-v2">
    <DeepSeekComponent />
  </DeepSeekProvider>
);

export default App;
```

## 📌 API Methods

### **`chatCompletion(messages, model?)`**
Generate responses using DeepSeek AI’s chat model.

```ts
const response = await deepseek.chatCompletion([
  { role: "user", content: "What is AI?" }
], "deepseek-chat-v2");
```

### **`edit(input, instruction)`**
Modify text using DeepSeek AI’s editing capabilities.

```ts
const response = await deepseek.edit("Fix grammar mistakes", "Correct the text");
```

### **`search(query)`**
Perform a search query using DeepSeek AI.

```ts
const response = await deepseek.search("Latest AI trends");
```

## 🛠 Configuration
You can configure API settings inside `DeepSeekProvider`:

```tsx
<DeepSeekProvider apiKey="your-api-key" model="deepseek-chat-v2" baseURL="https://api.deepseek.com">
  <YourApp />
</DeepSeekProvider>
```

## 🌎 Contributing
Contributions are welcome! Feel free to open issues or submit pull requests.

## 📄 License
This project is licensed under the MIT License.

