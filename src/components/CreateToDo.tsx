import { useForm } from "react-hook-form";
import { useSetRecoilState, useRecoilValue } from "recoil";
import { categoryState, toDoState } from "../atoms";

interface IForm {
	toDo: string;
}

function CreateToDo() {
	const setToDos = useSetRecoilState(toDoState);
	const category = useRecoilValue(categoryState);
	const { register, handleSubmit, setValue } = useForm<IForm>();
	const onValid = ({ toDo }: IForm) => {
		setToDos((prev) => [...prev, { text: toDo, id: Date.now(), category }]);
		setValue("toDo", "");
	};
	return (
		<form onSubmit={handleSubmit(onValid)}>
			<input
				{...register("toDo", {
					required: "Please write a ToDo",
				})}
				placeholder="Write a to do"
			/>
			<button>Add</button>
		</form>
	);
}

export default CreateToDo;
