const CardList = (props: { title: string; completed: boolean }) => {
  return (
    <div className="card w-96 border">
      <div className="card-body">
        <div className="form-control">
          <label className="label cursor-pointer">
            <span className="label-text ml-2">{props.title}</span>
            <input
              type="checkbox"
              defaultChecked={props.completed}
              className="checkbox checkbox-primary"
            />
          </label>
        </div>
      </div>
    </div>
  );
};

export default CardList;
