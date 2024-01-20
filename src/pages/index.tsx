import CardList from "@/components/CardList";
import Pagination from "@/components/Pagination";
import {
  Todo,
  getRunningQueriesThunk,
  getTodos,
  useGetTodosQuery,
} from "@/services/todoApi";
import FormInput from "@/components/FormInput";
import { wrapper } from "@/redux/store";
import { useState } from "react";
import { useAppDispatch } from "@/redux/hooks";

export default function Home({ init }: any) {
  const [currentPage, setCurrentPage] = useState(1);
  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };
  const startData = currentPage === 1 ? 0 : currentPage * 10 - 10;
 
  const {
    data: todos,
    isLoading,
    isError,
  } = useGetTodosQuery({ initialData: init.data, start: startData, limit: 10 });
 
  if (isError) {
    return <p>Error fetching todos</p>;
  }

  return (
    <main>
      <header className="text-center">
        <h1 className="prose-xl">TODO LIST APP</h1>
      </header>
      <section className="container mx-auto">
        <div className="flex items-center justify-center my-10">
          <div className="flex-row items-center justify-center">
            <FormInput />
            <div className="overflow-y-auto h-[500px] mt-4">
              {isLoading
                ? "Loading"
                : todos &&
                  todos.map((todo: Todo, idx: number) => {
                    return (
                      <div key={idx} className="my-2">
                        <CardList
                          title={todo.title}
                          completed={todo.completed}
                        />
                      </div>
                    );
                  })}
            </div>

            <div className="flex justify-center items-center mt-4">
              <Pagination
                paginate={paginate}
                current={currentPage}
                
              />
            </div>
          </div>
        </div>
      </section>
      <footer className="text-center">#created for Knitto test</footer>
    </main>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    store.dispatch(getTodos.initiate({start:0,limit:10}));
    await Promise.all(store.dispatch(getRunningQueriesThunk()));
    const init = store.getState().api.queries['getTodos({"limit":10,"start":0})'];
    return {
      props: {
        init,
      },
    };
  }
);
