import SubmitButton from "@/components/submit-button";
import { insertUserAction } from "./actions";

export default function CreateUserForm() {
  return (
    <form action={insertUserAction}>
      <input required type="text" placeholder="Your name" name="name" />
      <input
        required
        type="email"
        placeholder="your-email@gmail.com"
        name="email"
      />
      <SubmitButton>Create</SubmitButton>
    </form>
  );
}
