import { insertUserAction } from "./actions";

export default function CreateUserForm() {
  return (
    <form action={insertUserAction}>
      <input type="text" placeholder="Your Name" name="name" />
      <input type="email" placeholder="your-email@gmail.com" name="email" />
      <button>Insert</button>
    </form>
  );
}
