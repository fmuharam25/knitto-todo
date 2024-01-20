import { useAddTodoMutation } from "@/services/todoApi";

const FormInput = () => {
  const [addTodo, { isLoading }] = useAddTodoMutation();

  function handleSubmit(event: any) {
    event.preventDefault();
    addTodo({
      title: event.target["title"].value,
      userId: Math.random(),
      completed: false,
    });
    event.target.reset();
  }

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <div className="flex gap-x-3">
        <input
          type="text"
          id="title"
          name="title"
          placeholder="Type here"
          className="input input-bordered input-primary w-72"
        />
        <button className="btn btn-primary text-white" disabled={isLoading}>
          Submit
        </button>
        {isLoading && " Loading..."}
      </div>
    </form>
  );
};

export default FormInput;
