import "./App.css";
import Card from "./components/core/Card";
import TodoContainer from "./components/ToDoContainer";

function App() {
  return (
    <Card>
      <h1>To-Do Project</h1>
      <TodoContainer />
    </Card>
  );
}

export default App;
